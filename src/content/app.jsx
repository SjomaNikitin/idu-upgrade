// src/content/app.jsx
import { h, render } from "preact";
import { Header } from "./components/header.jsx";
import { MainContent } from "./components/mainContent.jsx";
import { Footer } from "./components/footer.jsx";

window.replaceHeader = function replaceHeader(data = {}) {
	const oldHeader = document.querySelector("#top");
	if (!oldHeader) return false;
	const semesterScope = data.semesterScope || null;
	const searchElement = window.location.pathname === "/"
		? document.querySelector("#unique-id26")
		: null;
	searchElement?.remove();
	let accountHref
	if (document.querySelector("#account")) {
		accountHref = document.querySelector("#account").children[0].href;
	} else {
		accountHref = "/";
	}
	const mountPoint = document.createElement("div");
	mountPoint.id = "idu-header-root";
	oldHeader.replaceWith(mountPoint);
	if (window.location.pathname !== "/users/sign_in") {
		render(
			<Header
				accountHref={accountHref}
				messagesHref={data.messagesUrl || ''}
				semesterScope={semesterScope}
				searchElement={searchElement}
			/>,
			mountPoint
		);
	}

	return true;
};

window.replaceMainContent = function replaceMainContent(data) {
	const oldMainContent = document.getElementById("content");
	if (!oldMainContent) return false;

	oldMainContent.innerHTML = "";
	render(<MainContent data={data}/>, oldMainContent);

	return true;
};

window.replaceFooter = function replaceFooter() {
	const oldFooter = document.getElementById("footer");
	const mountPoint = document.createElement("footer");
	mountPoint.id = "footer";

	if (oldFooter) {
		oldFooter.replaceWith(mountPoint);
	} else {
		document.body.append(mountPoint);
	}

	if (window.location.pathname === "/users/sign_in") {
		render(<Footer/>, mountPoint);
	}

	render(<Footer/>, mountPoint);
	return true;
};
