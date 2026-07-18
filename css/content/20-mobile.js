
function addSnow(el) {
	const snow = document.createElement("img");
	snow.src = "https://sajmik.b-cdn.net/TopSnow.PNG";
	snow.className = "top-snow"
	el.prepend(snow);
	const value = Math.random() < 0.5 ? 0 : 1;
	if (value) {
		snow.style.transform = "translate(-50%, -75%) scaleX(-1)";
	}
}

function removeUnwantedLinks(container) {
	// List of link texts to remove (case-insensitive)
	const removeTexts = ["zadania domowe", "forum", "tematy lekcji", "oceny", "obecności"];

	container.querySelectorAll("a").forEach(a => {
		const text = a.textContent.trim().toLowerCase();
		if (removeTexts.includes(text)) {
			// Remove the link, and also remove nearby ",", "-" or extra spaces
			const prev = a.previousSibling;
			const next = a.nextSibling;

			// Clean comma or hyphen before the link
			if (prev && prev.nodeType === 3) prev.textContent = prev.textContent.replace(/[,\-\s]+$/, "");

			// Remove link
			a.remove();

			// Clean hanging punctuation after the link
			if (next && next.nodeType === 3) next.textContent = next.textContent.replace(/^[,\-\s]+/, "");
		}
	});
}


function linkifyUrls(root = document.body) {
	const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
	const urlRegex = /https?:\/\/[^\s<>"']+/g;
	const nodes = [];
	while (walker.nextNode()) nodes.push(walker.currentNode);
	nodes.forEach(node => {
		if (node.parentElement.tagName === "A") return;
		const text = node.textContent;
		if (!urlRegex.test(text)) return;
		urlRegex.lastIndex = 0;
		const frag = document.createDocumentFragment();
		let last = 0, match;
		while ((match = urlRegex.exec(text)) !== null) {
			if (match.index > last) frag.appendChild(document.createTextNode(text.slice(last, match.index)));
			const a = document.createElement("a");
			a.href = match[0];
			a.textContent = match[0];
			a.target = "_blank";
			a.rel = "noopener noreferrer";
			a.style.cssText = "color:blue !important;text-decoration:underline;pointer-events:all;";
			frag.appendChild(a);
			last = match.index + match[0].length;
		}
		if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
		node.parentElement.replaceChild(frag, node);
	});
}

function makeModulesShorter(module) {
	const moduleMaxHeight = "500px";
	module.style.maxHeight = moduleMaxHeight;
	module.classList.add("shorted-container");
	const gradientShadow = document.createElement("div");
	gradientShadow.classList.add("shorted-container-gradient");
	module.lastElementChild.appendChild(gradientShadow);
	const gradientTxt = document.createElement("a")
	gradientShadow.appendChild(gradientTxt);
	gradientTxt.innerText = "Show All";
	gradientTxt.onclick = () => {
		if (gradientShadow.style.display === "none") {
			gradientShadow.style.display = "flex"
			module.style.maxHeight = moduleMaxHeight;
		} else {
			gradientShadow.style.display = "none"
			module.style.maxHeight = "none";
			const hideEl = module.querySelector(".hide-me")

			function hideHandler() {
				gradientShadow.style.display = "flex";
				module.style.maxHeight = moduleMaxHeight;
			}

			if (hideEl) {
				hideEl.removeEventListener("click", hideHandler); // ensures no duplicate
				hideEl.addEventListener("click", hideHandler);
			}
		}
	}

}
