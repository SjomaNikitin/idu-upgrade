// In release builds, `CSS_TEXT` is injected by esbuild define.
/* global CSS_TEXT */
/* global JS_TEXT */
/* global RELEASE_BUILD */
import { buildExampleDashboardData } from './mockDashboardData.js';

const isWorkerRuntime = typeof WebSocketPair !== 'undefined' && typeof caches !== 'undefined';

const iduHostS35 = 's35.idu.edu.pl';
const contentScripts = [
	'css/content/00-globals.js',
	'css/content/10-theme.js',
	'css/content/15-visualloader.js',
	'css/content/generated/18-app.js',
	'css/content/20-mobile.js',
	'css/content/25-login.js',
	'css/content/28-extracter.js',
	'css/content/30-bootstrap.js',
];

const criticalLoaderHtml = `<script id="idu-theme-critical">
	try {
		const theme = localStorage.getItem("theme");
		if (theme) document.documentElement.setAttribute("data-theme", theme);
	} catch {}
</script>
<style id="idu-loader-critical">
	html {
		--idu-loader-color: #e5f8f2;
	}

	html[data-theme="Ocean"] {
		--idu-loader-color: #1a1f25;
	}

	html[data-theme="Dzaga"] {
		--idu-loader-color: #fcedd6;
	}

	html[data-theme="Besties"] {
		--idu-loader-color: #fdf6f0;
	}

	html::before {
		content: "";
		position: fixed;
		inset: 0;
		width: 100vw;
		height: 100dvh;
		z-index: 2147483647;
		background: var(--idu-loader-color);
	}

	html.idu-ready::before {
		display: none;
	}
</style>`;

async function getCssText() {
	if (typeof CSS_TEXT === 'string') return CSS_TEXT;
	if (!isWorkerRuntime) {
		try {
			const fs = await import('node:fs/promises');
			const path = await import('node:path');
			const cssPath = path.resolve(process.cwd(), 'css/styles.css');
			return await fs.readFile(cssPath, 'utf8');
		} catch (e) {
			return '/* failed to read css/styles.css in dev */';
		}
	}
	return '';
}

async function getJsText() {
	if (typeof JS_TEXT === 'string') return JS_TEXT;
	if (!isWorkerRuntime) {
		try {
			const fs = await import('node:fs/promises');
			const path = await import('node:path');
			const scripts = await Promise.all(
				contentScripts.map((file) => fs.readFile(path.resolve(process.cwd(), file), 'utf8'))
			);
			return scripts.join('\n;\n');
		} catch (e) {
			return '/* failed to read css/content/*.js in dev */';
		}
	}
	return '';
}

function replaceHost(url, newHost) {
	const urlObj = new URL(url);
	urlObj.protocol = 'https:';
	urlObj.hostname = newHost;
	urlObj.port = '';
	return urlObj.toString();
}

function renderCustomMainPage(data) {
	return `<!doctype html>
<html lang="pl">
<head>
	${criticalLoaderHtml}
	<meta charset="utf-8">
	<meta content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,shrink-to-fit=no" name="viewport">
	<title>IDU Demo</title>
	<link rel="stylesheet" href="/my-styles.css" />
	<script>window.__IDU_MOCK_DATA = ${JSON.stringify(data)};</script>
	<script type="module" src="/content.js"></script>
</head>
<body path="/">
	<div id="top"></div>
	<div id="content"></div>
</body>
</html>`;
}


export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		const path = url.pathname;

		if (path.endsWith('com.chrome.devtools.json')) {
			return new Response('', { status: 404 });
		}

		if (path === '/my-styles.css') {
			const css = await getCssText();
			return new Response(css, {
				status: 200,
				headers: {
					'content-type': 'text/css; charset=utf-8',
					'cache-control': 'no-store'
				}
			});
		}

		if (path === '/content.js') {
			const js = await getJsText();
			return new Response(js, {
				status: 200,
				headers: {
					'content-type': 'application/javascript; charset=utf-8',
					'cache-control': 'no-store'
				}
			});
		}

		const needsBody = request.method !== 'GET' && request.method !== 'HEAD';
		const headers = new Headers(request.headers);
		let body;
		if (needsBody) {
			body = await request.arrayBuffer();

			const contentType = headers.get('content-type') || '';
			if (contentType.includes('application/x-www-form-urlencoded')) {
				const text = new TextDecoder().decode(body);
				const params = new URLSearchParams(text);

					const login = params.get('user[login]');
					const password = params.get('user[password]');

					if (login === "AppleLogin" && password === "123") {
						return new Response(renderCustomMainPage(buildExampleDashboardData()), {
							status: 200,
							headers: {
								'content-type': 'text/html; charset=utf-8',
								'cache-control': 'no-store'
							}
						});
					}
			}
		}
		console.log('Request', request.method, url.pathname, url.search);
		const clonedHeaders = Object.fromEntries(
			[...headers]
		);
		clonedHeaders['host'] = iduHostS35;
		if (clonedHeaders['origin'])
			clonedHeaders['origin'] = replaceHost(clonedHeaders['origin'], iduHostS35);
		if (clonedHeaders['referer'])
			clonedHeaders['referer'] = replaceHost(clonedHeaders['referer'], iduHostS35);
		const requestUrl = replaceHost(request.url, iduHostS35);
		let res = await fetch(requestUrl, {
			method: request.method,
			headers: clonedHeaders,
			body,
			redirect: 'manual'
		});


		// Clone upstream response into a mutable Response
		const resp = new Response(res.body, {
			status: res.status,
			statusText: res.statusText,
			headers: new Headers(res.headers)
		});

		// Rewrite Location to be relative to your Worker
		const loc = resp.headers.get('Location');
		if (loc) {
			const newLoc = loc
				.replace('https://' + iduHostS35, url.origin)
				.replace('http://' + iduHostS35, url.origin)
				.replace('https://www.idu.edu.pl', url.origin)
				.replace('http://www.idu.edu.pl', url.origin); // handles relative/absolute
			console.log('Rewriting Location to', newLoc);
			resp.headers.set('Location', newLoc);
		}
		// Rewrite Set-Cookie domains and preserve multiple cookies
		const cookieHeaders = [];
		res.headers.forEach((value, key) => {
			if (key.toLowerCase() === 'set-cookie') cookieHeaders.push(value);
		});
		if (cookieHeaders.length > 0) {
			resp.headers.delete('Set-Cookie');
			for (let cookie of cookieHeaders) {
				const rewritten = cookie.replace(iduHostS35, url.hostname)
					.replace('.idu.edu.pl', url.hostname);
				resp.headers.append('Set-Cookie', rewritten);
			}
		}

		const ct = resp.headers.get('content-type') || '';
		if (!ct.includes('text/html')) return resp;
		resp.headers.delete('Content-Security-Policy-Report-Only');
		// Set a more permissive CSP to allow third-party connections
		resp.headers.set(
			'Content-Security-Policy',
			'default-src \'self\' \'unsafe-inline\' \'unsafe-eval\' https: data: blob:; ' +
			'connect-src \'self\' https:; ' +
			'img-src \'self\' https: data: blob:; ' +
			'script-src \'self\' \'unsafe-inline\' \'unsafe-eval\' https:; ' +
			'style-src \'self\' \'unsafe-inline\' https:;'
		);
		// TODO: I removed references to path in CSS selectors and therefore, we may not need this logic at all.
		const htmlPath = path; //path.includes('subjects') ? '/subjects' : path;
		// noinspection HtmlUnknownTarget
		const cssJsLinksHtml = '\n<link rel="stylesheet" href="/my-styles.css" />\n\n<script type="module" src="/content.js"></script>\n';
		const metaViewport = `<meta content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,shrink-to-fit=no" name="viewport">`;

		// If running on Cloudflare (HTMLRewriter available), do streaming rewrite
		if (typeof HTMLRewriter !== 'undefined') {
			return new HTMLRewriter()
				.on('head', {
					element(el) {
						el.prepend(criticalLoaderHtml, { html: true });
						el.append(metaViewport, { html: true });
						el.append(cssJsLinksHtml, { html: true });
					}
				})
				.on('body', {
					element(el) {
						el.setAttribute('path', htmlPath);
					}
				})
				.transform(resp);
		}

		// Fallback for Node dev: parse and modify HTML with cheerio
		// In release builds, this block is stripped by esbuild because RELEASE_BUILD is defined as true.
		if (!(typeof RELEASE_BUILD !== 'undefined' && RELEASE_BUILD)) {
			const html = await resp.text();
			const { load } = await import('cheerio');
			const $ = load(html);
			$('head').prepend(criticalLoaderHtml);
			$('head').append(metaViewport);
			$('head').append(cssJsLinksHtml);
			const $body = $('body');
			$body.attr('path', htmlPath);

			const newHtml = $.html();
			resp.headers.delete('content-length');
			resp.headers.delete('content-encoding');
			resp.headers.set('content-type', 'text/html; charset=utf-8');
			return new Response(newHtml, { status: resp.status, statusText: resp.statusText, headers: resp.headers });
		}

		// In release (or if cheerio path is disabled), just return the original response
		return resp;
	}
};
