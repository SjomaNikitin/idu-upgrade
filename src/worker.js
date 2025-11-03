// In release builds, `CSS_TEXT` is injected by esbuild define.
/* global CSS_TEXT */
/* global JS_TEXT */

const isWorkerRuntime = typeof WebSocketPair !== 'undefined' && typeof caches !== 'undefined';

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
			const cssPath = path.resolve(process.cwd(), 'css/content.js');
			return await fs.readFile(cssPath, 'utf8');
		} catch (e) {
			return '/* failed to read css/content.js in dev */';
		}
	}
	return '';
}


export default {
  async fetch(request, env, ctx) {
		const url = new URL(request.url);
		let path = url.pathname;
		const needsBody = request.method !== 'GET' && request.method !== 'HEAD';
		const body = needsBody ? await request.arrayBuffer() : undefined;
		const headers = new Headers(request.headers);
		// Make sure browser cookies are forwarded to origin
		if (request.headers.get("cookie")) {
			headers.set("cookie", request.headers.get("cookie"));
		}

		if (url.pathname === '/my-styles.css') {
			const css = await getCssText();
			return new Response(css, {
				status: 200,
				headers: {
					'content-type': 'text/css; charset=utf-8',
					'cache-control': 'no-store',
				},
			});
		}

		if (url.pathname === '/content.js') {
			const js = await getJsText();
			return new Response(js, {
				status: 200,
				headers: {
					'content-type': 'application/javascript; charset=utf-8',
					'cache-control': 'no-store',
				},
			});
		}

		let res = await fetch('https://s35.idu.edu.pl' + path + url.search, {
			method: request.method,
			headers: Object.fromEntries(
				[...headers].filter(([key]) => key.toLowerCase() !== 'host' && key.toLowerCase() !== 'accept-encoding')
			),
			body,
			redirect: 'manual'
		});


		// Clone upstream response into a mutable Response
		const resp = new Response(res.body, {
			status: res.status,
			statusText: res.statusText,
			headers: new Headers(res.headers),
		});

		// Rewrite Location to be relative to your Worker
		const loc = resp.headers.get('Location');
		if (loc) {
			const newLoc = loc
				.replace('https://s35.idu.edu.pl', url.origin)
				.replace('https://www.idu.edu.pl', url.origin); // handles relative/absolute
			resp.headers.set('Location', newLoc);
		}
		// Rewrite Set-Cookie domains and preserve multiple cookies
		const cookieHeaders = [];
		resp.headers.forEach((value, key) => {
			if (key.toLowerCase() === 'set-cookie') cookieHeaders.push(value);
		});
		if (cookieHeaders.length > 0) {
			resp.headers.delete('Set-Cookie');
			for (let cookie of cookieHeaders) {
				let rewritten = cookie
					.replace(/domain=\.?idu\.edu\.pl/gi, 'Domain=' + url.hostname)
					.replace(/domain=\.?s35\.idu\.edu\.pl/gi, 'Domain=' + url.hostname);
				resp.headers.append('Set-Cookie', rewritten);
			}
		}

		const ct = resp.headers.get("content-type") || "";
		if (!ct.includes("text/html")) return resp;
		resp.headers.delete('Content-Security-Policy-Report-Only');
		// Set a more permissive CSP to allow third-party connections
		resp.headers.set(
			'Content-Security-Policy',
			"default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:; " +
			"connect-src 'self' https:; " +
			"img-src 'self' https: data: blob:; " +
			"script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; " +
			"style-src 'self' 'unsafe-inline' https:;"
		);
		// If running on Cloudflare (HTMLRewriter available), do streaming rewrite
		if (typeof HTMLRewriter !== 'undefined') {
			return new HTMLRewriter()
				.on("head", {
					element(el) {
						el.append(`<meta content="user-scalable=no">`, { html: true });
					}
				})
				.on("body", {
					element(el) {
						el.setAttribute("path", path);
						el.append(`\n<link rel=\"stylesheet\" href=\"/my-styles.css\" />\n\n<script type=\"module\" src=\"/content.js\"></script>\n`, { html: true });
					}
				})
				.transform(resp);
		}

		// Fallback for Node dev: parse and modify HTML with cheerio
		const html = await resp.text();
		const { load } = await import('cheerio');
		const $ = load(html);
		if (path.includes("subjects")){path = "/subjects"}
		$('head').append('<meta content="user-scalable=no">');
		$('body').attr('path', path);
		$('body').append('\n<link rel="stylesheet" href="/my-styles.css" />\n\n<script type="module" src="/content.js"></script>\n');

		const newHtml = $.html();
		const newHeaders = new Headers(resp.headers);
		newHeaders.set('content-type', 'text/html; charset=utf-8');
		newHeaders.delete('content-length');
		newHeaders.delete('content-encoding');
		return new Response(newHtml, { status: resp.status, statusText: resp.statusText, headers: newHeaders });
		// return resp;
  },
};
