window.loadWebsiteTheme()
let svgSize = "60%";
window.addEventListener("DOMContentLoaded", function () {
	if (window.innerWidth < window.innerHeight) {

		addNextLessonBanner()
		const customHeaderLoaded = typeof replaceHeader === "function" && replaceHeader()
		console.log("Custom header loaded:", customHeaderLoaded)
		closeAllTabs()
		moveScheduleHigher()
		moveGradesHigher()
		const firstSection = document.querySelector("#unique-id192");
		let forumEl = document.querySelector("#forums_path");
		let templatesEl = document.querySelector("#templates");
		if (forumEl) {
			forumEl.parentElement.removeChild(forumEl);
			templatesEl.parentElement.removeChild(templatesEl);
		}
		if (XmasTheme) {
			loadModuleDecorations()
		}
		if (window.location.pathname === "/") {
			if (firstSection) {
				removeUnwantedLinks(firstSection);
			}
			if (document.querySelector("#unique-id14")) {
				makeModulesShorter(document.querySelector("#unique-id14").parentElement);
			}

		}
		if (document.querySelector("input#user_login")) {
			document.querySelector("input#user_login").placeholder = "Login";
			document.querySelector("input#user_password").placeholder = "Password";
		}

		linkifyUrls()


		const tiptips = document.querySelectorAll("span.tiptip");
		if (tiptips) {
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
		if (localStorage.getItem("autoLogin") === "yes" && window.location.pathname === "/users/sign_in") {

		} else {
			document.getElementById("loader").remove();
			console.log("Loaded");
		}
	}
})





