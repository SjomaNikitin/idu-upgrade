window.hideVisualLoader = function hideVisualLoader() {
	document.documentElement.classList.add("idu-ready");
	document.getElementById("loader")?.remove();
}
