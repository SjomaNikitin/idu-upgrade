window.loadWebsiteTheme()
let svgSize = "60%";
window.addEventListener("DOMContentLoaded", function () {
	if (window.innerWidth < window.innerHeight) {
		const gradesData = extractGrades(document.querySelector("#unique-id12"));
		const subjectsData = extractSubjects(document.querySelector("#unique-id192"));
		const scheduleData = getScheduleLessons();
		const subjectAnnouncements = extractSubjectAnnouncements(document.querySelector("#unique-id11"));
		const news = extractNews(document.querySelector("#unique-id14"));
		const attendance = extractAttendance(document.querySelector("#unique-id15"));
		const reviewsHref = extractReviewsUrl();
		const customHeaderLoaded = typeof replaceHeader === "function" && replaceHeader();
		console.log("Custom header loaded:", customHeaderLoaded)
		if (window.location.pathname === "/") {
			const customContentLoaded = typeof replaceMainContent === "function" && replaceMainContent({reviewsUrl: reviewsHref,attendance: attendance, news: news, grades: gradesData, subjects: subjectsData, schedule: scheduleData, subjectAnnouncements: subjectAnnouncements})
			console.log("Custom content loaded:", customContentLoaded)

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

		linkifyUrls()

		if (localStorage.getItem("autoLogin") === "yes" && window.location.pathname === "/users/sign_in") {

		} else {
			document.getElementById("loader").remove();
			console.log("Loaded");
		}
	}
})





