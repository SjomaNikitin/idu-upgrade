window.hideVisualLoader = function hideVisualLoader() {
	const documentElement = document.documentElement;
	if (documentElement.classList.contains("idu-ready") ||
		documentElement.classList.contains("idu-loader-fading")) {
		return;
	}

	const loaderStartedAt = Number(window.__iduLoaderStartedAt);
	const loaderDuration = Number.isFinite(loaderStartedAt)
		? performance.now() - loaderStartedAt
		: 0;
	const finishLoading = () => {
		documentElement.classList.add("idu-ready");
		documentElement.classList.remove("idu-loader-fading");
		document.getElementById("loader")?.remove();
	};

	if (loaderDuration < 1000) {
		finishLoading();
		return;
	}

	documentElement.classList.add("idu-loader-fading");
	window.setTimeout(finishLoading, 500);
}
