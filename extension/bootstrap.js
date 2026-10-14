// Manifest CSS cannot be removed by page JavaScript. Ask the extension service
// worker to add it only when the customized view is active, before page paint.
let originalViewEnabled = false;
try {
	originalViewEnabled = localStorage.getItem("iduOriginalView") === "true";
} catch {}

if (!originalViewEnabled) {
	chrome.runtime.sendMessage({ type: "idu-insert-custom-styles" });
}
