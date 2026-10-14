// Add the packaged stylesheet as a real file so its load and cascade order are
// visible in DevTools. Do not add it while the original IDU view is enabled.
let originalViewEnabled = false;
try {
	originalViewEnabled = localStorage.getItem("iduOriginalView") === "true";
} catch {}

if (!originalViewEnabled) {
	const stylesheetId = "idu-extension-styles";
	const stylesheetUrl = chrome.runtime.getURL("styles.css");
	let headObserver;
	let documentObserver;

	const createStylesheet = () => {
		const link = document.createElement("link");
		link.id = stylesheetId;
		link.rel = "stylesheet";
		link.href = stylesheetUrl;
		link.dataset.iduExtension = "true";
		link.addEventListener("error", () => {
			console.error("IDU Upgrade stylesheet was blocked or failed to load", stylesheetUrl);
		});
		return link;
	};

	const ensureStylesheet = ({ moveToEnd = false } = {}) => {
		if (!document.head) return null;

		let link = document.getElementById(stylesheetId);
		if (!link) link = createStylesheet();
		if (!link.isConnected || (moveToEnd && link !== document.head.lastElementChild)) {
			document.head.appendChild(link);
		}
		return link;
	};

	const observeHead = () => {
		if (!document.head) return false;
		ensureStylesheet();
		if (!headObserver) {
			headObserver = new MutationObserver(() => {
				if (!document.getElementById(stylesheetId)) ensureStylesheet({ moveToEnd: true });
			});
			headObserver.observe(document.head, { childList: true });
		}
		documentObserver?.disconnect();
		return true;
	};

	if (!observeHead()) {
		documentObserver = new MutationObserver(observeHead);
		documentObserver.observe(document.documentElement, { childList: true, subtree: true });
	}

	const placeStylesAfterWebsiteStyles = () => ensureStylesheet({ moveToEnd: true });
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", placeStylesAfterWebsiteStyles, { once: true });
	} else {
		placeStylesAfterWebsiteStyles();
	}
	window.addEventListener("load", placeStylesAfterWebsiteStyles, { once: true });

	// A restored back/forward-cache document does not fire DOMContentLoaded again.
	window.addEventListener("pageshow", (event) => {
		if (event.persisted) placeStylesAfterWebsiteStyles();
	});
}
