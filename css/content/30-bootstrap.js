const iduOriginalViewEnabled = window.isIduOriginalViewEnabled?.() === true;

if (!iduOriginalViewEnabled) {
	window.loadWebsiteTheme();
}

let svgSize = "60%";
window.addEventListener("DOMContentLoaded", function () {
	if (iduOriginalViewEnabled) {
		if (window.location.pathname === "/") {
			const content = document.getElementById("content");
			if (content && !document.getElementById("idu-restore-custom-view")) {
				const restoreButton = document.createElement("button");
				restoreButton.id = "idu-restore-custom-view";
				restoreButton.type = "button";
				restoreButton.textContent = "Przywróć widok IDU2";
				restoreButton.addEventListener("click", () => window.setIduOriginalView(false));
				restoreButton.style.padding = "16px";
				restoreButton.style.marginLeft = "16px";
				restoreButton.style.borderRadius = "16px";
				content.prepend(restoreButton);
			}
		}
		window.hideVisualLoader?.();
		return;
	}

	const mockData = window.__IDU_MOCK_DATA;
	const shouldWaitForAutoLogin =
		localStorage.getItem("autoLogin") === "yes" &&
		localStorage.getItem("login") &&
		localStorage.getItem("password") &&
		window.location.pathname === "/users/sign_in" &&
		!mockData;

	try {
		if (window.innerWidth < window.innerHeight || mockData) {
		const pageData = mockData || {
			homeworkUrl: extractHomeWorkUrl(),
			reviewsUrl: extractReviewsUrl(),
			messagesUrl: extractMessagesUrl(),
			attendance: extractAttendance(document.querySelector("#unique-id15")),
			news: extractNews(document.querySelector("#unique-id14")),
			grades: extractGrades(document.querySelector("#unique-id12")),
			subjects: extractSubjects(document.querySelector("#unique-id192")),
			schedule: getScheduleLessons(),
			subjectAnnouncements: extractSubjectAnnouncements(document.querySelector("#unique-id11")),
			semesterScope: extractSemesterScope()
		};
		if (
			window.webkit &&
			window.webkit.messageHandlers &&
			window.webkit.messageHandlers.iduScheduleSync
		) {
			window.webkit.messageHandlers.iduScheduleSync.postMessage({
				updatedAt: new Date().toISOString(),
				schedule: pageData.schedule
			});
			console.log("Synced schedule to app");
		}
		if (!document.querySelector("a[href='/justify_absence_requests/new']")) {
			const customHeaderLoaded = typeof replaceHeader === "function" && replaceHeader(pageData);
			console.log("Custom header loaded:", customHeaderLoaded)
			const customFooterLoaded = typeof replaceFooter === "function" && replaceFooter();
			console.log("Custom footer loaded:", customFooterLoaded)
			if (window.location.pathname === "/" || mockData) {
				const customContentLoaded = typeof replaceMainContent === "function" && replaceMainContent(pageData)
				console.log("Custom content loaded:", customContentLoaded)
			}
		} else {
			const customHeaderLoaded = typeof replaceHeader === "function" && replaceHeader(pageData);
			console.log("Custom header loaded:", customHeaderLoaded)
			const customFooterLoaded = typeof replaceFooter === "function" && replaceFooter();
			console.log("Custom footer loaded:", customFooterLoaded)
			const news = document.querySelector("div.module:has(div#unique-id1)");
			const lastContainer = document.querySelector("#content:last-child");
			if (news && lastContainer) {
				news.parentElement.removeChild(news);
				lastContainer.appendChild(news);
			}
		}

		if (document.getElementById("top-selection")) {
			document.getElementById("top-selection").style.display = "none";
		}
		if (document.getElementById("breadcrumbs")) {
			document.getElementById("breadcrumbs").style.display = "none";

		}

		const loginNotice = document.querySelector("div.notice");
		if (loginNotice) {
			loginNotice.parentElement.removeChild(loginNotice);
		}

		const firstSection = document.querySelector("#unique-id192");
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
		upgradeNewsPage()
		linkifyUrls()
		replaceImages()

		}
	} finally {
		if (!shouldWaitForAutoLogin) {
			window.hideVisualLoader?.();
			console.log("Loaded");
		}
	}
})
