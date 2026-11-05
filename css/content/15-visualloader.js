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

// The native iOS web view is transparent. Give the document canvas the
// loader color independently of the fixed overlay and animated layers.
if (window.location.pathname === "/" && !window.__iduOriginalView &&
	document.documentElement?.dataset?.appPlatform === "ios") {
	document.documentElement.style.backgroundColor = "var(--idu-loader-color, #e5f8f2)";
}

let dashboardRevealed = false;
let dashboardHandoffScheduled = false;

function afterIosDashboardPaint(callback) {
	const waitForPaint = () => {
		if (document.hidden) {
			document.addEventListener("visibilitychange", waitForPaint, { once: true });
			return;
		}
		window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
			if (document.hidden) waitForPaint();
			else callback();
		}));
	};

	if (document.readyState === "complete") waitForPaint();
	else window.addEventListener("load", waitForPaint, { once: true });
}

function revealDashboard(header, widgets) {
	if (dashboardRevealed) return;
	dashboardRevealed = true;
	if (!header.animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

	const now = Date.now();
	try {
		const key = "iduDashboardEntranceAt";
		const elapsed = now - Number(localStorage.getItem(key));
		if (elapsed >= 0 && elapsed < 150_000) return;
		localStorage.setItem(key, String(now));
	} catch {
		return;
	}

	header.classList.add("idu-dashboard-entering");

	// Grid auto-placement follows DOM order, including the user's saved layout.
	const animations = [header, ...widgets].map((element, index) =>
		element.animate([
			{ opacity: 0, translate: "0 -24px" },
			{ opacity: 1, translate: "0 0" },
		], {
			duration: 400,
			delay: index * 45,
			easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
			fill: "backwards",
		})
	);

	const restoreHeaderGlass = () => header.classList.remove("idu-dashboard-entering");
	const finalAnimation = animations[animations.length - 1];
	if (finalAnimation?.finished) {
		finalAnimation.finished.then(restoreHeaderGlass, restoreHeaderGlass);
	} else {
		restoreHeaderGlass();
	}
}

window.hideVisualLoader = function hideVisualLoader() {
	window.captureIosHeaderHeight?.();

	const documentElement = document.documentElement;
	const loaderStartedAt = Number(window.__iduLoaderStartedAt);
	const loaderDuration = Number.isFinite(loaderStartedAt)
		? performance.now() - loaderStartedAt
		: 0;
	const finishLoading = () => {
		if (window.__iduVisualLoaderTimeoutId !== undefined) {
			window.clearTimeout(window.__iduVisualLoaderTimeoutId);
			window.__iduVisualLoaderTimeoutId = undefined;
		}
		documentElement.classList.add("idu-ready");
		documentElement.classList.remove("idu-loading", "idu-loader-fading");
		document.getElementById("loader")?.remove();
	};

	// Wait for the custom dashboard to mount, then remove the spinner and
	// reveal the cards in the same paint over the matching theme background.
	if (window.location.pathname === "/" || window.__IDU_MOCK_DATA) {
		const header = document.getElementById("idu-header-root");
		const widgets = document.querySelectorAll("#content .widgets-grid > .widget");
		if (header && widgets.length) {
			if (dashboardHandoffScheduled) return;
			dashboardHandoffScheduled = true;
			const reveal = () => {
				finishLoading();
				revealDashboard(header, widgets);
			};
			if (documentElement.dataset?.appPlatform === "ios" &&
				documentElement.classList.contains("idu-loading")) {
				afterIosDashboardPaint(() => {
					// If the safety deadline already exposed the page, leave it visible.
					if (documentElement.classList.contains("idu-loading")) reveal();
				});
			} else if (documentElement.dataset?.appPlatform !== "ios" ||
				!documentElement.classList.contains("idu-ready")) {
				reveal();
			}
			return;
		}
	}

	if (documentElement.classList.contains("idu-ready") ||
		documentElement.classList.contains("idu-loader-fading")) {
		return;
	}

	if (loaderDuration < 500) {
		finishLoading();
		return;
	}

	documentElement.classList.add("idu-loader-fading");
	window.setTimeout(finishLoading, 500);
}

// Never leave the login form hidden indefinitely when auto-login, network
// activity, or page initialization does not complete as expected.
if (window.location.pathname === "/users/sign_in") {
	window.setTimeout(() => {
		const documentElement = document.documentElement;
		if (
			!documentElement.classList.contains("idu-ready") &&
			!documentElement.classList.contains("idu-loader-fading")
		) {
			console.info("[IDU2] Login loader exceeded 5 seconds; fading it out");
			window.hideVisualLoader();
		}
	}, 100);
}
