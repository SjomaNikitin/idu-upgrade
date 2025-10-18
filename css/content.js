if (window.location.pathname === "/") {
	console.log("To hol szkolny :3")

	function replaceWithIcon(elem, icon, num = null){
		const cont = document.createElement("div");
		cont.classList.add("icon-container");
		cont.innerHTML = icon;
		const href = elem.querySelector("a").href;
		if (num != null) {
			const number = document.createElement("div");
			number.classList.add("notification-number");
			number.innerHTML = num;
			cont.appendChild(number);
		}
		elem.parentElement.appendChild(cont);
		elem.parentElement.removeChild(elem);
		cont.addEventListener("click", () => {
			window.location.href = href;
		})
	}

	let messagesEl = document.querySelector("#messages");
	let newsEl = document.querySelector("#news");
	let logOutEl = document.querySelector("#logout");
	let profileEl = document.querySelector("#account");
	let forumEl = document.querySelector("#forums_path");
	let templatesEl = document.querySelector("#templates");
	forumEl.parentElement.removeChild(forumEl);
	templatesEl.parentElement.removeChild(templatesEl);
	let svgSize = 70;
	replaceWithIcon(messagesEl, `
	<svg xmlns=http://www.w3.org/2000/svg" width=${svgSize} height=${svgSize} viewBox="0 0 24 24">
    <path fill="currentColor" d="m20.34 9.32l-14-7a3 3 0 0 0-4.08 3.9l2.4 5.37a1.06 1.06 0 0 1 0 .82l-2.4 5.37A3 3 0 0 0 5 22a3.14 3.14 0 0 0 1.35-.32l14-7a3 3 0 0 0 0-5.36Zm-.89 3.57l-14 7a1 1 0 0 1-1.35-1.3l2.39-5.37a2 2 0 0 0 .08-.22h6.89a1 1 0 0 0 0-2H6.57a2 2 0 0 0-.08-.22L4.1 5.41a1 1 0 0 1 1.35-1.3l14 7a1 1 0 0 1 0 1.78Z"/>
</svg>
	`, messagesEl.querySelector("strong").innerHTML);

	replaceWithIcon(newsEl, `
<svg xmlns="http://www.w3.org/2000/svg" width=${svgSize} height=${svgSize} viewBox="0 0 24 24">
    <path fill="currentColor" d="M4 8a8 8 0 1 1 16 0v4.697l2 3V20h-5.611a4.502 4.502 0 0 1-8.777 0H2v-4.303l2-3V8Zm5.708 12a2.5 2.5 0 0 0 4.584 0H9.708ZM12 2a6 6 0 0 0-6 6v5.303l-2 3V18h16v-1.697l-2-3V8a6 6 0 0 0-6-6Z"/>
</svg>
	`, newsEl.querySelector("strong").innerHTML);

	replaceWithIcon(profileEl, `
<svg xmlns="http://www.w3.org/2000/svg" width=${svgSize} height=${svgSize} viewBox="0 0 24 24">
    <g fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linejoin="round" d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/>
        <circle cx="12" cy="7" r="3"/>
    </g>
</svg>
	`);


	replaceWithIcon(logOutEl, `
<svg xmlns="http://www.w3.org/2000/svg" width=${svgSize} height=${svgSize} viewBox="0 0 24 24">
    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 4.001H5v14a2 2 0 0 0 2 2h8m1-5l3-3m0 0l-3-3m3 3H9"/>
</svg>
	`);

const tiptips = document.querySelectorAll("span.tiptip");
tiptips.forEach(tiptip => {
	if (tiptip.innerText[1] === "0") {
		tiptip.innerText = "(0) 7:55-8:40"
	}
	if (tiptip.innerText[1] === "1") {
		tiptip.innerText = "(1) 8:45-9:30"
	}
	if (tiptip.innerText[1] === "2") {
		tiptip.innerText = "(2) 9:35-10:20"
	}
	if (tiptip.innerText[1] === "3") {
		tiptip.innerText = "(3) 10:30-11:15"
	}
	if (tiptip.innerText[1] === "4") {
		tiptip.innerText = "(4) 11:25-12:10"
	}
	if (tiptip.innerText[1] === "5") {
		tiptip.innerText = "(5) 12:15-13:00"
	}
	if (tiptip.innerText[1] === "6") {
		tiptip.innerText = "(6) 13:10-13:55"
	}
	if (tiptip.innerText[1] === "7") {
		tiptip.innerText = "(7) 14:25-15:10"
	}
	if (tiptip.innerText[1] === "8") {
		tiptip.innerText = "(8) 15:15-16:00"
	}

})
}




