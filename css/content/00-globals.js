// ===== Christmas theme =====
// In December the "Default" theme is replaced by the Christmas theme, every
// year, based on the device's local date. The user's saved choice stays
// "Default", so on 1 January everything goes back to normal on its own.
//
// This file can run twice on one page, so the flag lives inside the function.
window.isChristmasSeason = function () {
	// DEV ONLY: true shows the Christmas theme right now, whatever the date.
	// >>> Set CHRISTMAS_FORCE_ON to false before `npm run publish`. <<<
	const CHRISTMAS_FORCE_ON = true;
	return CHRISTMAS_FORCE_ON || new Date().getMonth() === 11; // 11 = December
};
// Maps the saved theme to the one actually shown on the page.
window.resolveIduTheme = function (theme) {
	if ((!theme || theme === "Default") && window.isChristmasSeason()) return "Christmas";
	return theme;
};

// This used to be injected into <head> by the proxy. Keep it at the start of
// the browser bundle so direct WKWebView navigation establishes loader state
// before the rest of the page and application initialize.
window.__iduOriginalView = false;
try {
	window.__iduOriginalView = localStorage.getItem("iduOriginalView") === "true";
} catch {}

if (window.__iduOriginalView) {
	document.documentElement?.classList.add("idu-original-view", "idu-ready");
} else {
	// Storage can throw (for example in sandboxed documents). Register the
	// deadline independently, before any theme reads or application bootstrap.
	if (window.__iduVisualLoaderTimeoutId === undefined &&
		!document.documentElement?.classList.contains("idu-ready")) {
		window.__iduLoaderStartedAt = performance.now();
		window.__iduVisualLoaderTimeoutId = window.setTimeout(() => {
			document.documentElement?.classList.add("idu-ready");
			document.documentElement?.classList.remove("idu-loading", "idu-loader-fading");
			document.getElementById("loader")?.remove();
			window.__iduVisualLoaderTimeoutId = undefined;
		}, window.location?.pathname === "/" ? 8000 : 1000);
		document.documentElement?.classList.add("idu-loading");
	}
	try {
		const storedTheme = window.resolveIduTheme(localStorage.getItem("theme"));
		if (storedTheme) document.documentElement.setAttribute("data-theme", storedTheme);
		const storedIosSafeTop = localStorage.getItem("iduIosSafeTop");
		const storedSafeTop = Number(storedIosSafeTop);
		if (
			storedIosSafeTop !== null &&
			Number.isFinite(storedSafeTop) &&
			storedSafeTop >= 0 &&
			storedSafeTop <= 200
		) {
			document.documentElement.style.setProperty("--ios-safe-top", `${storedSafeTop}px`);
		}
	} catch {}
}

let themePresets = [
	{ bc: "rgb(255, 255, 255)", mc: "rgb(0, 0, 0)", name: "Default" },
	{ bc: "rgb(157,190,187)", mc: "rgb(244,233,205)", name: "Dzaga" },
	{ bc: "rgb(19, 35, 44)", mc: "rgb(42, 69, 75)", name: "Ocean" },
	{ bc: "rgb(255, 169, 185)", mc: "rgb(255, 226, 223)", name: "Besties" }
]
const iduOriginalViewStorageKey = "iduOriginalView";

window.isIduOriginalViewEnabled = function isIduOriginalViewEnabled() {
	try {
		return localStorage.getItem(iduOriginalViewStorageKey) === "true";
	} catch {
		return false;
	}
};

window.setIduOriginalView = function setIduOriginalView(enabled) {
	try {
		if (enabled) {
			localStorage.setItem(iduOriginalViewStorageKey, "true");
		} else {
			localStorage.removeItem(iduOriginalViewStorageKey);
		}
	} finally {
		window.location.reload();
	}
};

if (window.isIduOriginalViewEnabled()) {
	window.__iduOriginalView = true;
	document.documentElement.removeAttribute("data-theme");
	document.body?.removeAttribute("path");
	document.getElementById("idu-custom-styles")?.remove();
	document.getElementById("idu-custom-viewport")?.remove();
	document.getElementById("idu-loader-critical")?.remove();
	document.documentElement.classList.remove("idu-original-view", "idu-ready", "idu-loading", "idu-loader-fading");
}

const root = document.documentElement;
let bgCanvas;
let XmasTheme = false;
