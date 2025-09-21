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
	$('title').text("LABUBU")
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
		console.log(url.pathname);
		if (path === "/") {
			const res = await fetch("https://idu.edu.pl/", {
				"credentials": "include",
				"headers": {
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:142.0) Gecko/20100101 Firefox/142.0",
					"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
					"Accept-Language": "pl,en-US;q=0.7,en;q=0.3",
					"Upgrade-Insecure-Requests": "1",
					redirect: "manual"
				},
				"method": "GET",
				"mode": "cors"
			});
			const html = await res.text();
			const $ = cheerio.load(html);
			const title = $("title").text();
			console.log(title)
			console.log(res.url)
			const updatedHTML = manipulateWithMainPage(html);
			return new Response(updatedHTML, {
				status: 200,
				headers: {
					"Content-Type": "text/html; charset=UTF-8"
				}
			});

		} else

			if (path === "/users/sign_in" && request.method === "POST") {
				const bodyToUse = await request.text();
				const standardHeaders = {
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:143.0) Gecko/20100101 Firefox/143.0",
					"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
					"Accept-Language": "en,pl;q=0.5",
					"Upgrade-Insecure-Requests": "1",
					"Sec-Fetch-Dest": "document",
					"Sec-Fetch-Mode": "navigate",
					"Sec-Fetch-Site": "same-origin",
					"Sec-Fetch-User": "?1",
					"Priority": "u=0, i",
				};

				let res = await fetch("https://www.idu.edu.pl/users/sign_in", {
					method: "POST",
					redirect: "manual",
					credentials: "include",
					headers: {
						...standardHeaders,
						"Content-Type": "application/x-www-form-urlencoded",
					},
					referrer: "https://www.idu.edu.pl/users/sign_in",
					body: bodyToUse
				});
				const convertedCookie = substringBeforeFirst(res.headers.get('Set-Cookie'), ";");
				res = await fetch( "https://www.idu.edu.pl/", {
					credentials: "include",
					redirect: "manual",
					headers: {
						...standardHeaders,
						Cookie: convertedCookie
					},
					method: "GET",
				});
				if (res.status == 302) {
					res = await fetch( res.headers.get("Location"), {
						credentials: "include",
						redirect: "manual",
						headers: {
							...standardHeaders,
							Cookie: convertedCookie
						},
						method: "GET",
					});
				}
				console.log(res.url)
				console.log(bodyToUse)


				const formatedHTML = await res.text()
				const updatedHTML = manipulateWithMainPage(formatedHTML);
				return new Response(updatedHTML, {
					status: 200,
					headers: {
						"Content-Type": "text/html; charset=UTF-8",
						"Set-Cookie": convertedCookie
					}
				});
			}
			else {
				console.log("sended file")
				let res = await fetch("https://www.idu.edu.pl" + path, {redirect: "follow", headers: {Cookie: request.headers.get("Cookie")}});
				return res;
			}
			// if (path === "/assets/common_print.css"){
			// 	console.log("path asks for css_print")
			// 	const upstream = await fetch("https://idu.edu.pl/assets/common_print.css?1757934545", {
			// 		redirect: "follow",
			// 	});
			//
			// 	if (!upstream.ok) {
			// 		return new Response(`Upstream error ${upstream.status}`, { status: upstream.status });
			// 	}
			//
			// 	// You can just return the upstream Response as-is:
			// 	return upstream;
			// }
		return new Response("OK", { status: 200 });
	}
};

function joinSetCookie(sc) {
	if (!sc) return "";
	// split multiple Set-Cookie values (Cloudflare often flattens to one header)
	return sc
		.split(/,(?=\s*[A-Za-z0-9!#$%&'*+\-.^_`|~]+=)/g)
		.map(s => s.trim().split(";")[0])   // keep only name=value
		.filter(Boolean)
		.join("; ");
}



