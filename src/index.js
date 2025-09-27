/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import * as cheerio from 'cheerio'

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

		if (url.pathname === "/my-styles.css") {
			const css = `
@media screen and (orientation: portrait) {
\tbody[path="/users/sign_in"] #container {
\t\twidth: 100%;
\t\theight: 100%;
\t\tleft: 0;
\t\ttop: 0;
\t\tmargin-top: 0;
\t\tmargin-left: 0;
\t\tz-index: -1;
\t}
\tbody[path="/users/sign_in"] .module{
\t\tposition: absolute;
\t\ttop: 50%;
\t\ttransform: translateY(-50%);
\t\twidth: 100%;
\t\tdisplay: grid;
\t\tplace-items: center;
\t}
\tbody[path="/users/sign_in"] label{
\t\tfont-size: 3rem;
\t}
\tbody[path="/users/sign_in"] input{
\t\tfont-size: 2rem;
\t\twidth: 50%;
\t\tpadding: 1rem 1rem;
\t}
\tbody[path="/users/sign_in"] .field{
\t\tdisplay: flex;
\t\tjustify-content: center;
\t\twidth: 750px;
\t\theight: 100px;
\t\tgap: 10rem;
\t\talign-items: center;
\t}
\tbody[path="/users/sign_in"] .remember-me{
\t\tfont-size: 2rem;
\t\tmargin-left: 0;
\t\tdisplay: flex;
\t\tjustify-content: center;
\t\twidth: 750px;
\t\theight: 100px;
\t\talign-items: center;
\t}
\tbody[path="/users/sign_in"] .remember-me input{
\t\twidth: 10%;
\t\theight: 25%;
\t}
\tbody[path="/users/sign_in"] .actions{
\t\tdisplay: flex;
\t\tjustify-content: center;
\t\twidth: 750px;
\t\theight: 100px;
\t\tgap: 10rem;
\t\talign-items: center;
\t}
\tbody[path="/users/sign_in"] div.actions input{
\t\tmargin: 0;
\t}
\tbody[path="/users/sign_in"] form{
\t\tjustify-content: center;
\t\tdisplay: grid;
\t\tplace-items: center;
\t\tmargin: 0;
\t\tpadding: 0;
\t\twidth: 750px;
\t\tborder: black solid 2px;
\t\tborder-radius: 20px;
\t}
\tbody[path="/users/sign_in"] html{
\t\tfont-size: 16px;
\t}
\tbody[path="/users/sign_in"]{
\t\toverflow: hidden;
\t}
\tbody[path="/users/sign_in"] h1{
\t\tfont-size: 3rem;
\t\ttext-align: center;
\t}
\tbody[path="/users/sign_in"] label[for="nothing"]{
\t\tdisplay: none;
\t}
\tbody[path="/users/sign_in"] #password-recovery{
\t\twidth: 750px;
\t\theight: 150px;
\t\tpadding-left: 0;
\t\tdisplay: grid;
\t\tplace-items: center;
\t}
\tbody[path="/users/sign_in"] a{
\t\tfont-size: 2rem;
\t}
\tbody[path="/users/sign_in"] .idu-notice{
\t\tfont-size: 0.75rem;
\t\topacity: 1;
\t\tanimation: fadeAway 1s ease forwards;
\t\tanimation-delay: 2s;
\t}

\t@keyframes fadeAway {
\t\tto {
\t\t\topacity: 0;
\t\t}
\t}
\tbody[path="/users/sign_in"] #top{
\t\theight: 100px;
\t\tdisplay: flex;
\t\talign-items: center;
\t}
\tbody[path="/users/sign_in"] #language{
\t\tpadding: 0;
\t}
\tbody[path="/users/sign_in"] img{
\t\twidth: 150px;
\t\theight: auto;
\t}
}
`;
// 			let res = await fetch('http://localhost:3002/styles.css',);
// 			let css = await res.text();
			return new Response(css, {
				headers: {
					"content-type": "text/css; charset=utf-8",
					"cache-control": "public, max-age=3600"
				}
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

		const ct = resp.headers.get("content-type") || "";
		if (!ct.includes("text/html")) return resp;

		const cssHref = "/my-styles.css"; // or an absolute URL

		// Stream-inject <link> into <head> and return the transformed *original* response
		return new HTMLRewriter()
			.on("body", {
				element(el) {
					el.setAttribute("path", path);
					el.append(`\n<link rel="stylesheet" href=/my-styles.css />\n`, { html: true });
				}
			})
			.transform(resp);
		// return resp;
	}
};




