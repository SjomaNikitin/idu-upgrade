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
		const path = url.pathname;
		const needsBody = request.method !== 'GET' && request.method !== 'HEAD';
		const body = needsBody ? await request.arrayBuffer() : undefined;

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

		let res = await fetch('https://s35.idu.edu.pl' + path, {
			method: request.method,
			headers: request.headers,
			body: body,
			credentials: request.credentials,
			mode: request.mode,
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
		let setCookies = resp.headers.get('Set-Cookie');
		if (setCookies) {
			setCookies = setCookies
				.replace('domain=.idu.edu.pl', 'domain=' + url.hostname)
				.replace('domain=.idu.edu.pl', 'domain=' + url.hostname);

			resp.headers.set('Set-Cookie', setCookies);
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
