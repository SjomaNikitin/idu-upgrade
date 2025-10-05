if (window.location.pathname === "/") {
	console.log("To hol szkolny :3")

	let messagesEl = document.querySelector("#messages");
	let newsEl = document.querySelector("#news");
	let hrefs = [messagesEl.querySelector("a").href, newsEl.querySelector("a").href];
	let numberOfMessages = messagesEl.querySelector("strong").innerHTML;
	let numberOfNews = newsEl.querySelector("strong").innerHTML;
	let lastScrollTop = 0; // store last scroll position
	messagesEl.parentElement.removeChild(messagesEl);
	newsEl.parentElement.removeChild(newsEl);
	const messageContainer = document.createElement("div");
	const newsContainer = document.createElement("div");
	messageContainer.classList.add("message-container");
	newsContainer.classList.add("news-container");
	document.body.appendChild(messageContainer);
	document.body.appendChild(newsContainer);

	const messageSVG = `
	<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
    <path fill="currentColor" d="m20.34 9.32l-14-7a3 3 0 0 0-4.08 3.9l2.4 5.37a1.06 1.06 0 0 1 0 .82l-2.4 5.37A3 3 0 0 0 5 22a3.14 3.14 0 0 0 1.35-.32l14-7a3 3 0 0 0 0-5.36Zm-.89 3.57l-14 7a1 1 0 0 1-1.35-1.3l2.39-5.37a2 2 0 0 0 .08-.22h6.89a1 1 0 0 0 0-2H6.57a2 2 0 0 0-.08-.22L4.1 5.41a1 1 0 0 1 1.35-1.3l14 7a1 1 0 0 1 0 1.78Z"/>
</svg>
	`
	messageContainer.innerHTML = messageSVG;
	const messagesNumber = document.createElement("div");
	messagesNumber.classList.add("notification-number");
	messagesNumber.innerHTML = numberOfMessages;
	messageContainer.appendChild(messagesNumber);

	const newsSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
    <path fill="currentColor" d="M4 8a8 8 0 1 1 16 0v4.697l2 3V20h-5.611a4.502 4.502 0 0 1-8.777 0H2v-4.303l2-3V8Zm5.708 12a2.5 2.5 0 0 0 4.584 0H9.708ZM12 2a6 6 0 0 0-6 6v5.303l-2 3V18h16v-1.697l-2-3V8a6 6 0 0 0-6-6Z"/>
</svg>
	`
	newsContainer.innerHTML = newsSVG;
	const newsNumber = document.createElement("div");
	newsNumber.classList.add("notification-number");
	newsNumber.innerHTML = numberOfNews;
	newsContainer.appendChild(newsNumber);
	messageContainer.addEventListener("click", () => {
		window.location.href = hrefs[0];
	})
	newsContainer.addEventListener("click", () => {
		window.location.href = hrefs[1];
	})
	window.addEventListener("scroll", () => {
		const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

		if (currentScroll > lastScrollTop) {
			// 🧭 user scrolled down
			messageContainer.style.opacity = "0";
			newsContainer.style.opacity = "0";
		} else if (currentScroll < lastScrollTop) {
			// 🧭 user scrolled up
			messageContainer.style.opacity = "1";
			newsContainer.style.opacity = "1";
		}

		lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // avoid negative scroll
	});
}

