chrome.runtime.onMessage.addListener((message, sender) => {
	if (message?.type !== "idu-insert-custom-styles" || sender.tab?.id === undefined) return;

	const target = { tabId: sender.tab.id };
	if (sender.frameId !== undefined) target.frameIds = [sender.frameId];

	chrome.scripting.insertCSS({
		target,
		files: ["styles.css"],
	}).catch((error) => {
		console.warn("IDU Upgrade could not insert its development stylesheet", error);
	});
});
