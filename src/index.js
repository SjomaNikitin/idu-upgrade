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
\ta, button, input, label, div {
\t\ttouch-action: manipulation;
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
\thtml{
\t\tfont-size: 16px;
\t}
\tbody{
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
\t\tfont-size: 1rem;
\t}
\tbody[path="/users/sign_in"] img{
\t\twidth: 150px;
\t\theight: auto;
\t}

\tbody[path="/"] #top{
\t\theight: 100px;
\t\tdisplay: flex;
\t\talign-items: center;
\t}
\tbody[path="/"] #language{
\t\tpadding: 0;
\t}
\tbody[path="/"] img{
\t\twidth: 150px;
\t\theight: auto;
\t}


\tbody[path="/"] .no-menu #content .left-column{
\t\twidth: 950px; !important;
\t}
\tbody[path="/"] .no-menu #content .right-column{
\t\twidth: 950px; !important;
\t}
\tbody[path="/"] h3{
\t\tfont-size: 3.5rem;
\t\tfont-weight: bold;
\t\ttext-align: center;
\t}
\t/*body[path="/"] div#account-actions{*/
\t/*\tfont-size: 1rem;*/
\t/*}*/
\tbody[path="/"] span.toggle-switch{
\t\tfont-size: 2rem;
\t}
\tbody[path="/"] div.module {
\t\tborder-width: 5px;
\t\tborder-style: solid;
\t\tborder-color: darkgray;
\t\tborder-radius: 15px;
\t\tmin-height: 100px;
\t\tbox-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
\t}
\tbody[path="/"] div.action-module div.action-button{
\t\twidth: 950px;
\t\tmargin-left: 0;
\t\tfont-size: 3rem;
\t\tpadding: 0;
\t\tmargin-bottom: 17px;
\t\tborder-radius: 15px;
\t\ttext-align: center;
\t\tbox-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);

\t}
\tbody[path="/"] div.double-column{
\t\tfont-size: 16px;
\t}
\tbody[path="/"] div.right-column{
\t\tfont-size: 16px;
\t}
\tbody[path="/"] #unique-id26{
\t\tfont-size: 2rem;
\t}
\tbody[path="/"] #unique-id26 form div.field label{
\t\twidth: 40%;
\t\tmargin: 0;
\t\tfont-size: 2.5rem;
\t}
\tbody[path="/"] #unique-id26 form div.field input{
\t\twidth: 40%;
\t\tmargin: 0;
\t\tfont-size: 2.5rem;
\t}
\tbody[path="/"] #unique-id26 form div.field{
\t\tdisplay: flex;             /* enable flex layout */
\t\tjustify-content: center;   /* center horizontally */
\t\talign-items: center;       /* center vertically (for single row height) */
\t\tflex-wrap: wrap;           /* allow items to wrap to next line if needed */
\t\tgap: 0px;                 /* optional spacing between items */
\t}
\tbody[path="/"] div.module:has(#unique-id26) {
\t\tdisplay: none;
\t}
\tbody[path="/"] div#top{
\t\tdisplay: block;
\t}
\tbody[path="/"] #top-selection {
\t\tdisplay: block;
\t\tmargin-top: 150px;
\t\tfont-size: 2rem;
\t}
\tbody[path="/"] #top-selection form {
\t\tdisplay: block;
\t\tfont-size: 2rem;
\t\tdisplay: flex;
\t\tjustify-content: center;   /* center horizontally */
\t\talign-items: center;       /* center vertically (for single row height) */
\t\tflex-wrap: wrap;           /* allow items to wrap to next line if needed */
\t\tgap: 0;
\t\twidth: 100%;
\t}
\tbody[path="/"] #top-selection form select{
\t\tfont-size: 2rem;
\t\twidth: 83%;
\t}
\tbody[path="/"] #top-selection form label{
\t\tmin-width: 17%;
\t\tpadding: 0;
\t\tmargin: 0;
\t}
\t#footer{
\t\tfont-size: 2rem;
\t}
\tbody[path="/"] div.schedule table img{
\t\tdisplay: none;
\t}
\tbody[path="/"] div.schedule table{
\t\tfont-size: 1rem;
\t}
\tbody[path="/"] div.schedule table span.subject{
\t\tfont-size: 1rem; !important;
\t\tfont-weight: bold;
\t}
\tbody[path="/"] div.schedule table span.location{
\t\tfont-size: 1rem; !important;
\t\tfont-weight: bold;
\t}
\tbody[path="/"] .icon-container svg{
\t\tvertical-align: middle;
\t\tgrid-area: 1 / 1;
\t}
\tbody[path="/"] .icon-container{
\t\twidth: 120px;
\t\theight: 120px;
\t\tbackground-color: rgba(255, 255, 255, 0.90);
\t\tborder-radius: 100px;
\t\tbox-shadow: 0px 8px 10px rgba(0, 0, 0, 0.3);
\t\ttransition: opacity 0.3s ease;
\t\tline-height: 120px;
\t\tdisplay: grid;
\t\tplace-items: center;
\t\talign-items: center;
\t}
\t#breadcrumbs{
\t\tfont-size: 2rem;
\t}
\t.notification-number{
\t\tgrid-area: 1 / 1;
\t\tjustify-self: end;  /* right side */
\t\talign-self: end;
\t\tfont-size: 2.5rem;
\t\theight: 3rem;
\t\twidth: 3rem;
\t\tline-height: 3rem;
\t\t/*color: #7c9ab7;*/
\t\tcolor: red;
\t\tfont-weight: bold;
\t\ttext-shadow: -0px 1px 5px rgba(0, 0, 0, 0.5);
\t}
\tbody[path="/"] #account-actions{
\t\tfont-size: 1.9rem;
\t\tdisplay: grid;
\t\theight: 150px;
\t\tgrid-auto-flow: column;         /* lays items out horizontally */
\t\tgap: 1rem;                      /* spacing between items */
\t\tjustify-content: center;        /* center the whole row horizontally */
\t\talign-items: center;
\t\tbox-shadow: 0px 8px 10px rgba(0, 0, 0, 0.3);
\t\tborder-radius: 15px;
\t\tpadding: 0 1rem;
\t}
\tbody[path="/"] div.module a{
\t\tfont-size: 3rem;
\t}
\tbody[path="/"] div.module span{
\t\tfont-size: 3rem;
\t}
\tbody[path="/"] tbody span a{
\t\tfont-size: 1rem; !important;
\t}
\tbody[path="/"] div.schedule{
\t\toverflow-x: auto !important;
\t}
\tbody[path="/"] .schedule table tbody tr td:first-child{
\t\tposition: sticky;
\t\tz-index: 10;
\t\tleft: -1px;
\t\tbackground: white;
\t\tborder-style: solid;
\t\tborder-color: white;
\t\tborder-width: 1px;
\t}
\tbody[path="/"] thead :nth-child(2){
\t\tfont-size: 3rem;
\t}
\tbody[path="/"] thead :first-child :first-child:not(div){
\t\tposition: sticky;
\t\tz-index: 10;
\t\tleft: 0;
\t\tbackground: #e8e8e8;
\t\tborder-style: solid;
\t\tborder-color: white;
\t\tborder-width: 1px;
\t}
\tbody[path="/"] thead :nth-child(2) :first-child:not(b){
\t\tposition: sticky;
\t\tz-index: 10;
\t\tleft: 0;
\t\tbackground: #e8e8e8;
\t\tborder-style: solid;
\t\tborder-color: white;
\t\tborder-width: 1px;
\t}
}

`;
			// let res = await fetch('http://localhost:3002/styles.css',);
			// let css = await res.text();
			return new Response(css, {
				headers: {
					"content-type": "text/css; charset=utf-8",
					"cache-control": "public, max-age=3600"
				}
			});
		}

		if (url.pathname === "/content.js") {
			const js = `
if (window.location.pathname === "/") {
\tconsole.log("To hol szkolny :3")

\tfunction replaceWithIcon(elem, icon, num = null){
\t\tconst cont = document.createElement("div");
\t\tcont.classList.add("icon-container");
\t\tcont.innerHTML = icon;
\t\tconst href = elem.querySelector("a").href;
\t\tif (num != null) {
\t\t\tconst number = document.createElement("div");
\t\t\tnumber.classList.add("notification-number");
\t\t\tnumber.innerHTML = num;
\t\t\tcont.appendChild(number);
\t\t}
\t\telem.parentElement.appendChild(cont);
\t\telem.parentElement.removeChild(elem);
\t\tcont.addEventListener("click", () => {
\t\t\twindow.location.href = href;
\t\t})
\t}

\tlet messagesEl = document.querySelector("#messages");
\tlet newsEl = document.querySelector("#news");
\tlet logOutEl = document.querySelector("#logout");
\tlet profileEl = document.querySelector("#account");
\tlet forumEl = document.querySelector("#forums_path");
\tlet templatesEl = document.querySelector("#templates");
\tforumEl.parentElement.removeChild(forumEl);
\ttemplatesEl.parentElement.removeChild(templatesEl);
\tlet svgSize = 70;
\treplaceWithIcon(messagesEl, \`
\t<svg xmlns=http://www.w3.org/2000/svg" width=\${svgSize} height=\${svgSize} viewBox="0 0 24 24">
    <path fill="currentColor" d="m20.34 9.32l-14-7a3 3 0 0 0-4.08 3.9l2.4 5.37a1.06 1.06 0 0 1 0 .82l-2.4 5.37A3 3 0 0 0 5 22a3.14 3.14 0 0 0 1.35-.32l14-7a3 3 0 0 0 0-5.36Zm-.89 3.57l-14 7a1 1 0 0 1-1.35-1.3l2.39-5.37a2 2 0 0 0 .08-.22h6.89a1 1 0 0 0 0-2H6.57a2 2 0 0 0-.08-.22L4.1 5.41a1 1 0 0 1 1.35-1.3l14 7a1 1 0 0 1 0 1.78Z"/>
</svg>
\t\`, messagesEl.querySelector("strong").innerHTML);

\treplaceWithIcon(newsEl, \`
<svg xmlns="http://www.w3.org/2000/svg" width=\${svgSize} height=\${svgSize} viewBox="0 0 24 24">
    <path fill="currentColor" d="M4 8a8 8 0 1 1 16 0v4.697l2 3V20h-5.611a4.502 4.502 0 0 1-8.777 0H2v-4.303l2-3V8Zm5.708 12a2.5 2.5 0 0 0 4.584 0H9.708ZM12 2a6 6 0 0 0-6 6v5.303l-2 3V18h16v-1.697l-2-3V8a6 6 0 0 0-6-6Z"/>
</svg>
\t\`, newsEl.querySelector("strong").innerHTML);

\treplaceWithIcon(profileEl, \`
<svg xmlns="http://www.w3.org/2000/svg" width=\${svgSize} height=\${svgSize} viewBox="0 0 24 24">
    <g fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linejoin="round" d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/>
        <circle cx="12" cy="7" r="3"/>
    </g>
</svg>
\t\`);


\treplaceWithIcon(logOutEl, \`
<svg xmlns="http://www.w3.org/2000/svg" width=\${svgSize} height=\${svgSize} viewBox="0 0 24 24">
    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 4.001H5v14a2 2 0 0 0 2 2h8m1-5l3-3m0 0l-3-3m3 3H9"/>
</svg>
\t\`);

const tiptips = document.querySelectorAll("span.tiptip");
tiptips.forEach(tiptip => {
\tif (tiptip.innerText[1] === "0") {
\t\ttiptip.innerText = "(0) 7:55-8:40"
\t}
\tif (tiptip.innerText[1] === "1") {
\t\ttiptip.innerText = "(1) 8:45-9:30"
\t}
\tif (tiptip.innerText[1] === "2") {
\t\ttiptip.innerText = "(2) 9:35-10:20"
\t}
\tif (tiptip.innerText[1] === "3") {
\t\ttiptip.innerText = "(3) 10:30-11:15"
\t}
\tif (tiptip.innerText[1] === "4") {
\t\ttiptip.innerText = "(4) 11:25-12:10"
\t}
\tif (tiptip.innerText[1] === "5") {
\t\ttiptip.innerText = "(5) 12:15-13:00"
\t}
\tif (tiptip.innerText[1] === "6") {
\t\ttiptip.innerText = "(6) 13:10-13:55"
\t}
\tif (tiptip.innerText[1] === "7") {
\t\ttiptip.innerText = "(7) 14:25-15:10"
\t}
\tif (tiptip.innerText[1] === "8") {
\t\ttiptip.innerText = "(8) 15:15-16:00"
\t}

})
}





`;
			// let res = await fetch('http://localhost:3002/content.js',);
			// let js = await res.text();
			return new Response(js, {
				headers: {
					"content-type": "application/javascript; charset=utf-8",
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
			.on("head", {
				element(el) {
					el.append(
						`<meta content="user-scalable=no">`,
						{ html: true }
					);
				}
			})
			.on("body", {
				element(el) {
					el.setAttribute("path", path);
					el.append(
						`\n<link rel="stylesheet" href="/my-styles.css" />\n
						<script type="module" src="/content.js"></script>
						`,

						{ html: true }
					);
				}
			})
			.transform(resp);
		// return resp;
	}
};




