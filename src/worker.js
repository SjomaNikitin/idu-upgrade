// In release builds, `CSS_TEXT` is injected by esbuild define.
/* global CSS_TEXT */
/* global JS_TEXT */
/* global RELEASE_BUILD */
import { buildExampleDashboardData } from './mockDashboardData.js';

const isWorkerRuntime = typeof WebSocketPair !== 'undefined' && typeof caches !== 'undefined';

const iduBaseHost = 'idu.edu.pl';
const schoolCookieName = 'idu_school_prefix';
const schoolHostPattern = /^(s\d+)\.idu\.edu\.pl$/i;
const contentScripts = [
	'css/content/00-globals.js',
	'css/content/10-theme.js',
	'css/content/15-visualloader.js',
	'css/content/generated/18-app.js',
	'css/content/20-mobile.js',
	'css/content/25-login.js',
	'css/content/28-extracter.js',
	'css/content/29-image-replace.js',
	'css/content/30-bootstrap.js',
];

const criticalLoaderHtml = `<script id="idu-theme-critical">
	try {
		window.__iduOriginalView = localStorage.getItem("iduOriginalView") === "true";
		if (window.__iduOriginalView) {
			document.documentElement.classList.add("idu-original-view", "idu-ready");
		} else {
			window.__iduLoaderStartedAt = performance.now();
			const theme = localStorage.getItem("theme");
			if (theme) document.documentElement.setAttribute("data-theme", theme);
		}
	} catch {}
</script>
<style id="idu-loader-critical">
	html {
		--idu-loader-color: #e5f8f2;
		--idu-loader-spinner-color: #0b5f5d;
	}

	html[data-theme="Ocean"] {
		--idu-loader-color: #1a1f25;
		--idu-loader-spinner-color: #7eeacc;
	}

	html[data-theme="Dzaga"] {
		--idu-loader-color: #fcedd6;
		--idu-loader-spinner-color: #5b3119;
	}

	html[data-theme="Besties"] {
		--idu-loader-color: #fdf6f0;
		--idu-loader-spinner-color: #851a36;
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

	html::after {
		content: "";
		position: fixed;
		left: 50%;
		top: 50%;
		z-index: 2147483647;
		width: 48px;
		height: 48px;
		box-sizing: border-box;
		border: 4px solid rgba(128, 128, 128, 0.25);
		border-top-color: var(--idu-loader-spinner-color);
		border-radius: 50%;
		opacity: 0;
		transform: translate(-50%, -50%) rotate(0deg);
		animation:
			idu-loader-spinner-show 150ms ease 1s forwards,
			idu-loader-spinner-spin 750ms linear 1s infinite;
	}

	html.idu-ready::after {
		display: none;
	}

	html.idu-loader-fading::before {
		animation: idu-loader-fade-out 500ms ease forwards;
	}

	html.idu-loader-fading::after {
		animation: idu-loader-spinner-fade-out 500ms ease forwards;
	}

	@keyframes idu-loader-spinner-show {
		to { opacity: 1; }
	}

	@keyframes idu-loader-spinner-spin {
		to { transform: translate(-50%, -50%) rotate(360deg); }
	}

	@keyframes idu-loader-fade-out {
		from { opacity: 1; }
		to { opacity: 0; }
	}

	@keyframes idu-loader-spinner-fade-out {
		from {
			opacity: 1;
			transform: translate(-50%, -50%) rotate(0deg);
		}
		to {
			opacity: 0;
			transform: translate(-50%, -50%) rotate(180deg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		html::after {
			animation: idu-loader-spinner-show 150ms ease 1s forwards;
		}

		html.idu-loader-fading::before,
		html.idu-loader-fading::after {
			animation-duration: 1ms;
		}
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

function getCookie(cookieHeader, name) {
	if (!cookieHeader) return null;

	for (const cookie of cookieHeader.split(';')) {
		const separatorIndex = cookie.indexOf('=');
		if (separatorIndex === -1) continue;
		if (cookie.slice(0, separatorIndex).trim() !== name) continue;

		const value = cookie.slice(separatorIndex + 1).trim();
		try {
			return decodeURIComponent(value);
		} catch {
			return value;
		}
	}

	return null;
}

function removeCookie(cookieHeader, name) {
	if (!cookieHeader) return '';

	return cookieHeader
		.split(';')
		.filter((cookie) => {
			const separatorIndex = cookie.indexOf('=');
			return separatorIndex === -1 || cookie.slice(0, separatorIndex).trim() !== name;
		})
		.map((cookie) => cookie.trim())
		.filter(Boolean)
		.join('; ');
}

function normalizeSchoolPrefix(prefix) {
	return typeof prefix === 'string' && /^s\d+$/i.test(prefix)
		? prefix.toLowerCase()
		: null;
}

function schoolPrefixFromHost(hostname) {
	return hostname.match(schoolHostPattern)?.[1]?.toLowerCase() || null;
}

export function getUpstreamHost(request, path) {
	// Let IDU determine the school on every login attempt.
	if (path === '/users/sign_in') return iduBaseHost;

	const savedPrefix = normalizeSchoolPrefix(
		getCookie(request.headers.get('cookie'), schoolCookieName)
	);
	return savedPrefix ? `${savedPrefix}.idu.edu.pl` : iduBaseHost;
}

function rewriteIduLocation(location, upstreamUrl, workerUrl) {
	let redirectUrl;
	try {
		redirectUrl = new URL(location, upstreamUrl);
	} catch {
		return { location, schoolPrefix: null };
	}

	const schoolPrefix = schoolPrefixFromHost(redirectUrl.hostname);
	const isIduHost = schoolPrefix !== null ||
		redirectUrl.hostname === iduBaseHost ||
		redirectUrl.hostname === `www.${iduBaseHost}`;
	if (!isIduHost) return { location, schoolPrefix: null };

	redirectUrl.protocol = workerUrl.protocol;
	redirectUrl.hostname = workerUrl.hostname;
	redirectUrl.port = workerUrl.port;
	return { location: redirectUrl.toString(), schoolPrefix };
}

function schoolCookie(prefix, secure) {
	return `${schoolCookieName}=${prefix}; Path=/; Max-Age=31536000; SameSite=Lax; HttpOnly${secure ? '; Secure' : ''}`;
}

function renderCustomMainPage(data) {
	return `<!doctype html>
<html lang="pl">
<head>
	${criticalLoaderHtml}
	<meta charset="utf-8">
	<meta id="idu-custom-viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,shrink-to-fit=no" name="viewport">
	<title>IDU Demo</title>
	<link id="idu-custom-styles" rel="stylesheet" href="/my-styles.css" />
	<script>
		if (window.__iduOriginalView) {
			document.getElementById("idu-custom-styles")?.remove();
			document.getElementById("idu-custom-viewport")?.remove();
			document.getElementById("idu-loader-critical")?.remove();
		}
	</script>
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
		const upstreamHost = getUpstreamHost(request, path);
		const clonedHeaders = Object.fromEntries(
			[...headers]
		);
		clonedHeaders['host'] = upstreamHost;
		if (clonedHeaders['origin'])
			clonedHeaders['origin'] = replaceHost(clonedHeaders['origin'], upstreamHost);
		if (clonedHeaders['referer'])
			clonedHeaders['referer'] = replaceHost(clonedHeaders['referer'], upstreamHost);
		const upstreamCookies = removeCookie(clonedHeaders['cookie'], schoolCookieName);
		if (upstreamCookies) clonedHeaders['cookie'] = upstreamCookies;
		else delete clonedHeaders['cookie'];
		const requestUrl = replaceHost(request.url, upstreamHost);
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
		let discoveredSchoolPrefix = null;
		if (loc) {
			const rewritten = rewriteIduLocation(loc, requestUrl, url);
			discoveredSchoolPrefix = rewritten.schoolPrefix;
			console.log('Rewriting Location to', rewritten.location);
			resp.headers.set('Location', rewritten.location);
		}
		// Rewrite Set-Cookie domains and preserve multiple cookies
		let cookieHeaders = typeof res.headers.getSetCookie === 'function'
			? res.headers.getSetCookie()
			: [];
		if (cookieHeaders.length === 0) {
			res.headers.forEach((value, key) => {
				if (key.toLowerCase() === 'set-cookie') cookieHeaders.push(value);
			});
		}
		if (cookieHeaders.length > 0) {
			resp.headers.delete('Set-Cookie');
			for (let cookie of cookieHeaders) {
				const rewritten = cookie.replace(/;\s*domain=[^;]+/ig, '');
				resp.headers.append('Set-Cookie', rewritten);
			}
		}
		if (discoveredSchoolPrefix) {
			resp.headers.append(
				'Set-Cookie',
				schoolCookie(discoveredSchoolPrefix, url.protocol === 'https:')
			);
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
		const cssJsLinksHtml = `
<link id="idu-custom-styles" rel="stylesheet" href="/my-styles.css" />
<script>
	if (window.__iduOriginalView) {
		document.getElementById("idu-custom-styles")?.remove();
		document.getElementById("idu-custom-viewport")?.remove();
		document.getElementById("idu-loader-critical")?.remove();
	}
</script>
<script type="module" src="/content.js"></script>
`;
		const metaViewport = `<meta id="idu-custom-viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,shrink-to-fit=no" name="viewport">`;

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
