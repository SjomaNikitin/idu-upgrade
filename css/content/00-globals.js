let themePresets = [
	{ bc: "rgb(255, 255, 255)", mc: "rgb(0, 0, 0)", name: "Default" },
	{ bc: "rgb(157,190,187)", mc: "rgb(244,233,205)", name: "Dzaga" },
	{ bc: "rgb(19, 35, 44)", mc: "rgb(42, 69, 75)", name: "Ocean" },
	{ bc: "rgb(255, 169, 185)", mc: "rgb(255, 226, 223)", name: "Besties" }
]
const iduOriginalViewStorageKey = "iduOriginalView";
const iduAnalyticsPath = "/__idu/analytics";

window.trackIduUsage = function trackIduUsage(event, details = {}) {
	const payload = JSON.stringify({
		event,
		view: details.view || (window.isIduOriginalViewEnabled?.() ? "original" : "custom"),
		theme: details.theme || localStorage.getItem("theme") || "Default",
		path: window.location.pathname,
	});

	if (navigator.sendBeacon) {
		navigator.sendBeacon(iduAnalyticsPath, new Blob([payload], { type: "text/plain;charset=UTF-8" }));
		return;
	}

	fetch(iduAnalyticsPath, {
		method: "POST",
		body: payload,
		headers: { "content-type": "text/plain;charset=UTF-8" },
		keepalive: true,
	}).catch(() => {});
};

window.isIduOriginalViewEnabled = function isIduOriginalViewEnabled() {
	try {
		return localStorage.getItem(iduOriginalViewStorageKey) === "true";
	} catch {
		return false;
	}
};

window.setIduOriginalView = function setIduOriginalView(enabled) {
	try {
		window.trackIduUsage?.("view_changed", {
			view: enabled ? "original" : "custom",
		});
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
	document.documentElement.classList.remove("idu-original-view", "idu-ready", "idu-loader-fading");
}

const root = document.documentElement;
let bgCanvas;
let XmasTheme = false;
