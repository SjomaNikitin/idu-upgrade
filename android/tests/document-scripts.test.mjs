import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const asset = name => readFileSync(new URL(`../app/src/main/assets/${name}`, import.meta.url), 'utf8');
const css = 'body::before { content: "quoted \\ text </style>"; }';

function page({ ready = true, subframe = false } = {}) {
    const events = new Map();
    const observers = [];
    const element = tag => ({
        tag, children: [], attributes: {},
        classList: { add() {} },
        style: { setProperty() {} },
        setAttribute(key, value) { this.attributes[key] = value; },
        appendChild(child) {
            this.children = this.children.filter(existing => existing !== child);
            this.children.push(child);
            child.parentElement = this;
        },
    });
    const document = {
        documentElement: null, head: null, body: null,
        createElement: element,
        getElementById(id) { return this.head?.children.find(child => child.id === id) ?? null; },
        addEventListener(name, callback) {
            if (!events.has(name)) events.set(name, []);
            events.get(name).push(callback);
        },
    };
    const window = { location: { pathname: '/users/sign_in' } };
    window.top = subframe ? {} : window;
    const context = vm.createContext({
        document, window, console: { info() {} },
        MutationObserver: class {
            constructor(callback) { this.callback = callback; }
            observe() { observers.push(this); this.active = true; }
            disconnect() { this.active = false; }
        },
    });
    const mutate = () => observers.slice().forEach(observer => { if (observer.active) observer.callback(); });
    const createRoot = () => { document.documentElement = element('html'); mutate(); };
    const createBody = () => { document.head = element('head'); document.body = element('body'); mutate(); };
    if (ready) { createRoot(); createBody(); }
    return {
        document, window, context, createRoot, createBody, mutate,
        run(source) { vm.runInContext(`if (window === window.top) {\n${source}\n}`, context); },
        domReady() { events.get('DOMContentLoaded')?.forEach(callback => callback()); },
    };
}

function install(p, content) {
    p.run(asset('platform-bootstrap.js'));
    p.run(asset('install-styles.js').replace('__IDU_CSS_LITERAL__', () => JSON.stringify(css)));
    p.run(asset('run-content.js').replace('__IDU_CONTENT_SOURCE__', () => content));
}

test('bootstrap and styles precede content; custom CSS moves after site CSS before app DOM-ready work', () => {
    const p = page();
    install(p, `
        window.platformAtStart = document.documentElement.attributes['data-app-platform'];
        window.stylesAtStart = document.getElementById('idu-custom-styles').textContent;
        document.addEventListener('DOMContentLoaded', () => {
            window.lastStyle = document.head.children.at(-1).id;
        });
    `);
    assert.equal(p.window.platformAtStart, 'android');
    assert.equal(p.window.stylesAtStart, css);
    p.document.head.appendChild({ id: 'site-styles' });
    p.domReady();
    assert.equal(p.window.lastStyle, 'idu-custom-styles');
    assert.equal(p.document.body.attributes.path, '/users/sign_in');
});

test('document-start before HTML exists waits only for the root and executes content once', () => {
    const p = page({ ready: false });
    install(p, `window.runs = (window.runs || 0) + 1;
        window.platformAtStart = document.documentElement.attributes['data-app-platform'];`);
    assert.equal(p.window.runs, undefined);
    p.createRoot();
    assert.equal(p.window.runs, 1);
    assert.equal(p.window.platformAtStart, 'android');
    p.createBody();
    p.mutate();
    p.domReady();
    assert.equal(p.window.runs, 1);
    assert.equal(p.document.getElementById('idu-custom-styles').textContent, css);
    assert.equal(p.document.head.children.filter(child => child.id === 'idu-custom-styles').length, 1);
    assert.equal(p.document.head.children.filter(child => child.id === 'idu-custom-viewport').length, 1);
});

test('same-origin subframes receive no bootstrap, styles, or content', () => {
    const p = page({ subframe: true });
    install(p, 'window.contentRan = true;');
    assert.equal(p.window.contentRan, undefined);
    assert.equal(p.document.documentElement.attributes['data-app-platform'], undefined);
    assert.equal(p.document.head.children.length, 0);
});

test('new page documents each receive the same injection sequence', () => {
    for (let index = 0; index < 3; index++) {
        const p = page();
        install(p, "window.stylesPresent = !!document.getElementById('idu-custom-styles');");
        assert.equal(p.window.stylesPresent, true);
    }
});
