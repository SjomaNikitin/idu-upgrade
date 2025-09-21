/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// import * as cheerio from 'cheerio'

export function manipulateWithMainPage(html) {
	const $ = cheerio.load(html);
	$('title').text('LABUBU');
	return $.html();
}

export function substringBeforeFirst(str, substr) {
	const index = str.indexOf(substr);
	if (index >= 0)
		return str.substring(0, index);
	else
		return str;
}

export default {
	async fetch(request) {
		const url = new URL(request.url);
		const path = url.pathname;
		const needsBody = request.method !== 'GET' && request.method !== 'HEAD';
		const body = needsBody ? await request.arrayBuffer() : undefined;
		let res = await fetch('https://s35.idu.edu.pl' + path, {
			method: request.method,
			headers: request.headers,
			body: body,
			credentials: request.credentials,
			mode: request.mode,
			redirect: 'manual'
		});

		const resp = new Response(await res.body, res);

		// Rewrite Location to be relative to your Worker
		const loc = resp.headers.get('Location');
		if (loc) {
			const newLoc = loc
				.replace('https://s35.idu.edu.pl', url.origin)
				.replace('https://www.idu.edu.pl', url.origin); // handles relative/absolute
			resp.headers.set('Location', newLoc);
		}
		console.log('Location: ' + resp.headers.get('Location'));
		let setCookies = resp.headers.get('Set-Cookie');
		if (setCookies) {
			setCookies = setCookies
				.replace('domain=.idu.edu.pl', 'domain=' + url.hostname)
				.replace('domain=.idu.edu.pl', 'domain=' + url.hostname);

			resp.headers.set('Set-Cookie', setCookies);
		}

		return resp;
		// return res;
	}
};




