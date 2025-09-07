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
	const $ = cheerio.load(html)
	console.log('title: ' + $('title').text());
	$('title').text("LABUBU")
	$('input[name="commit"]').attr("onclick", "window.open('https://www.youtube.com/')")
	return $.html();
}

export default {
	async fetch(request) {
		const url = new URL(request.url);
		const path = url.pathname;
		const cookieHeader = request.headers.get("Cookie") || "";

		if (path === "/") {
			const res = await fetch("https://idu.edu.pl/", {
				"credentials": "include",
				"headers": {
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:142.0) Gecko/20100101 Firefox/142.0",
					"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
					"Accept-Language": "pl,en-US;q=0.7,en;q=0.3",
					"Upgrade-Insecure-Requests": "1",
					"Cookie": cookieHeader,
				},
				"method": "GET",
				"mode": "cors"
			});
			console.log(res.url)
			const formatedHTML = await res.text()
			const updatedHTML = manipulateWithMainPage(formatedHTML);
			return new Response(updatedHTML, {
				status: 200,
				headers: {
					"Content-Type": "text/html; charset=UTF-8"
				}
			});

		}

		return new Response("OK", { status: 200 });
	}
};


