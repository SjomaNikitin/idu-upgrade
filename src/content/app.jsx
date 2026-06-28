// src/content/app.jsx
import { h, render } from "preact";
import { Header } from "./components/header.jsx";
import { MainContent } from "./components/mainContent.jsx";

window.replaceHeader = function replaceHeader() {
	const oldHeader = document.querySelector("#top");
	if (!oldHeader) return false;
	let accountHref
	if (document.querySelector("#account")) {
		accountHref = document.querySelector("#account").children[0].href;
	} else {
		accountHref = "/";
	}
	const mountPoint = document.createElement("div");
	mountPoint.id = "idu-header-root";
	oldHeader.replaceWith(mountPoint);
	render(<Header accountHref={accountHref}/>, mountPoint);

	return true;
};

window.replaceMainContent = function replaceMainContent() {
	const oldMainContent = document.getElementById("content");
	if (!oldMainContent) return false;

	oldMainContent.innerHTML = "";
	render(<MainContent />, oldMainContent);

	return true;
};

