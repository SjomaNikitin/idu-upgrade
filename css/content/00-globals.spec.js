import { describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const globalsScript = readFileSync(new URL("./00-globals.js", import.meta.url), "utf8")
	.split("let themePresets")[0];
const workerSource = readFileSync(new URL("../../src/worker.js", import.meta.url), "utf8");
const proxyScript = workerSource.split('<script id="idu-theme-critical">')[1].split('</script>')[0];

function page({ storageBlocked = false, originalView = false, rootMissing = false } = {}) {
		const timers = [];
		const classes = new Set();
		const classList = {
			add: vi.fn((...names) => names.forEach(name => classes.add(name))),
			remove: vi.fn((...names) => names.forEach(name => classes.delete(name))),
			contains: name => classes.has(name),
		};
		const loader = { remove: vi.fn() };
		const window = {
			setTimeout: vi.fn((handler, delay) => {
				timers.push({ handler, delay });
				return timers.length;
			}),
		};
		const root = { classList, setAttribute: vi.fn(), style: { setProperty: vi.fn() } };
		const document = {
			documentElement: rootMissing ? null : root,
			getElementById: vi.fn(() => loader),
		};
		const context = vm.createContext({
			document,
			get localStorage() {
				if (storageBlocked) throw new Error("SecurityError: The operation is insecure.");
				return { getItem: key => key === "iduOriginalView" && originalView ? "true" : null };
			},
			performance: { now: vi.fn(() => 10) },
			window,
		});
		return { window, document, root, classList, loader, timers, context };
}

describe.each([["native bundle", globalsScript], ["proxy head", proxyScript]])("%s visual loader", (_, source) => {
	it.each([false, true])("expires after one second, including denied storage (%s)", storageBlocked => {
		const p = page({ storageBlocked });
		vm.runInContext(source, p.context);
		expect(p.classList.contains("idu-loading")).toBe(true);
		expect(p.window.setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
		p.timers[0].handler();
		expect(p.classList.contains("idu-ready")).toBe(true);
		expect(p.classList.contains("idu-loading")).toBe(false);
		expect(p.classList.contains("idu-loader-fading")).toBe(false);
		expect(p.loader.remove).toHaveBeenCalledOnce();
		expect(p.window.__iduVisualLoaderTimeoutId).toBeUndefined();
	});

	it("does not restart the deadline when the content bundle runs after the proxy bootstrap", () => {
		const p = page();
		vm.runInContext(source, p.context);
		vm.runInContext(globalsScript, p.context);
		expect(p.window.setTimeout).toHaveBeenCalledOnce();
		p.timers[0].handler();
		vm.runInContext(globalsScript, p.context);
		expect(p.window.setTimeout).toHaveBeenCalledOnce();
		expect(p.classList.contains("idu-loading")).toBe(false);
	});

	it("still dismisses the loader if the root is absent at document start", () => {
		const p = page({ rootMissing: true });
		vm.runInContext(source, p.context);
		p.document.documentElement = p.root;
		p.timers[0].handler();
		expect(p.classList.contains("idu-ready")).toBe(true);
	});

	it("leaves original-view mode uncovered", () => {
		const p = page({ originalView: true });
		vm.runInContext(source, p.context);
		expect(p.window.setTimeout).not.toHaveBeenCalled();
		expect(p.classList.contains("idu-loading")).toBe(false);
		expect(p.classList.contains("idu-ready")).toBe(true);
	});
});

describe("loader stylesheet", () => {
	it.each([
		["native", readFileSync(new URL("../styles.css", import.meta.url), "utf8")],
		["proxy", workerSource.split('<style id="idu-loader-critical">')[1].split('</style>')[0]],
	])("%s only creates the overlay when JavaScript opts in", (_, css) => {
		expect(css).not.toMatch(/html::(?:before|after)\s*\{/);
		expect(css).toContain("html.idu-loading::before");
		expect(css).toContain("html.idu-loading::after");
	});
});
