const iosHeaderHeightStorageKey = "iduIosHeaderHeight";
const iosSafeTopStorageKey = "iduIosSafeTop";

window.captureIosHeaderHeight = function captureIosHeaderHeight() {
	const headerRoot = document.getElementById("idu-header-root");
	const headerContent = headerRoot?.querySelector(".idu-custom-header");
	if (!headerRoot || !headerContent || window.__iduIosHeaderHeightCaptureStarted) return;

	window.__iduIosHeaderHeightCaptureStarted = true;

	const saveHeaderHeight = () => {
		if (document.documentElement.getAttribute("data-app-platform") !== "ios") return false;

		const headerHeight = headerRoot.offsetHeight;
		const contentHeight = headerContent.offsetHeight;
		const safeTop = headerHeight - contentHeight;
		if (headerHeight <= 0 || safeTop <= 0 || safeTop > 200) return false;

		try {
			localStorage.setItem(iosHeaderHeightStorageKey, String(headerHeight));
			localStorage.setItem(iosSafeTopStorageKey, String(safeTop));
		} catch {
			return false;
		}

		return true;
	};

	// Refresh the website-owned values on every page load. The first measurement
	// may use the value restored by the critical loader; the observers below
	// overwrite it again if iOS supplies a different safe-area value afterward.
	saveHeaderHeight();

	if (typeof ResizeObserver !== "undefined") {
		const resizeObserver = new ResizeObserver(saveHeaderHeight);
		resizeObserver.observe(headerRoot);
	}

	if (typeof MutationObserver !== "undefined") {
		const styleObserver = new MutationObserver(saveHeaderHeight);
		styleObserver.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["style", "data-app-platform"],
		});
	}
};

window.hideVisualLoader = function hideVisualLoader() {
	window.captureIosHeaderHeight?.();

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
