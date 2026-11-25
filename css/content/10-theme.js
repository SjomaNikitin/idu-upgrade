function hideXmas() {
	document.querySelector("canvas.bg-canvas").parentElement.removeChild(document.querySelector("canvas.bg-canvas"));
	document.querySelector("img.xmas-top-image").parentElement.removeChild(document.querySelector("img.xmas-top-image"));
	const presentLines = document.querySelectorAll(".present-line");
	for (let i = 0; i < presentLines.length; i++) {
		presentLines[i].parentElement.removeChild(presentLines[i]);
	}
	const topSnowEls = document.querySelectorAll(".top-snow");
	for (let i = 0; i < topSnowEls.length; i++) {
		topSnowEls[i].parentElement.removeChild(topSnowEls[i]);
	}
	document.querySelector(".footer-snow").parentElement.removeChild(document.querySelector(".footer-snow"));
}

window.loadWebsiteTheme = function (chooseTheme) {
	if (chooseTheme) {

		document.documentElement.setAttribute("data-theme", window.resolveIduTheme(chooseTheme));
		localStorage.setItem("theme", chooseTheme);
		// The native app shares this preference across login and school domains.
		window.webkit?.messageHandlers?.iduThemeSync?.postMessage(chooseTheme);
		if (chooseTheme !== "Default" && document.querySelector("canvas.bg-canvas")) {
			hideXmas()
		}
		if (chooseTheme === "Default") {
			if (XmasTheme) {
				xmasThemeLoader();
				loadModuleDecorations()
			}
		}
	} else {
		let theme = localStorage.getItem("theme");
		if (theme === null) {
			localStorage.setItem("theme", "Default");
			theme = "Default";
		}
		if (theme !== "Default" && document.querySelector("canvas.bg-canvas")) {
			hideXmas()
		}
		document.documentElement.setAttribute("data-theme", window.resolveIduTheme(theme));
	}
}

function Snowfall(canvas, options = {}) {
	const ctx = canvas.getContext("2d");

	// Adjustable settings
	const amount = options.amount || 75;
	const speed = options.speed || 1;
	const size = options.size || [2, 4]; // min/max square size

	let flakes = [];
	let running = false;

	function resize() {

	}

	resize();
	window.addEventListener("resize", resize);

	function makeFlakes() {
		flakes = [];
		for (let i = 0; i < amount; i++) {
			flakes.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				w: Math.random() * (size[1] - size[0]) + size[0],
				h: Math.random() * (size[1] - size[0]) + size[0],
				vy: Math.random() * speed + speed * 0.5,
			});
		}
	}

	function draw() {
		if (!running) return;
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for (let flake of flakes) {
			ctx.fillStyle = "#FFFFFF";
			ctx.fillRect(flake.x, flake.y, flake.w, flake.h);

			flake.y += flake.vy;

			if (flake.y > canvas.height) {
				flake.y = -flake.h;
				flake.x = Math.random() * canvas.width;
			}
		}
		requestAnimationFrame(draw);
	}

	function start() {
		running = true;
		makeFlakes();
		draw();
	}

	function stop() {
		running = false;
	}

	return { start, stop };
}
function update(newOptions = {}) {
	if (newOptions.amount !== undefined) options.amount = newOptions.amount;
	if (newOptions.speed !== undefined) options.speed = newOptions.speed;
	if (newOptions.size !== undefined) options.size = newOptions.size;
	makeFlakes();
}

function addVerticalPresentLine(module) {
	const ignorePathsList = ["/informations"]
	if (!ignorePathsList.includes(window.location.pathname)) {
		const line = document.createElement("div");
		line.className = "present-line";
		module.prepend(line);
		let button = module.querySelector(".hide-me");
		if (!button) {
			button = module.querySelector(".show-me");
		}
		if (button) {
			button.addEventListener("click", () => {
				line.classList.toggle("hide-me");
			})
		} else {
			console.log("hide-me button for vertical present line not found");
		}
	}

}

function loadModuleDecorations() {
	const modules = document.querySelectorAll(".module");
	const theme = localStorage.getItem("theme");
	for (let i = 0; i < modules.length; i++) {
		if (theme === "Default") {
			addVerticalPresentLine(modules[i]);
			addSnow(modules[i]);
		}
	}
}

function xmasThemeLoader() {
	if (!XmasTheme) {
		return;
	}
	const bgCanvasContainer = document.createElement("div");
	bgCanvasContainer.className = "bg-canvas-container";
	document.body.prepend(bgCanvasContainer);
	bgCanvas = document.createElement("canvas");
	bgCanvas.className = "bg-canvas";
	bgCanvas.width = window.innerWidth;
	bgCanvas.height = "1400";
	bgCanvasContainer.appendChild(bgCanvas);
	const bgCanvasSnow = Snowfall(bgCanvas);
	bgCanvasSnow.start();
	const topImage = document.createElement("img");
	topImage.className = "xmas-top-image";
	topImage.src = "https://sajmik.b-cdn.net/TopImageXmas.PNG"
	document.body.prepend(topImage);
	addFooterSnow()
	if (window.location.pathname === "/users/sign_in") {
		bgCanvas.height = document.querySelector("#container").offsetHeight;
	} else {
		bgCanvas.height = document.body.offsetHeight;
		const observer = new ResizeObserver(() => {
			bgCanvas.height = document.body.offsetHeight;
		});
		observer.observe(document.body);
	}
}

function addFooterSnow() {
	const snow = document.createElement("img");
	snow.src = "https://sajmik.b-cdn.net/FooterSnow.PNG"
	snow.className = "footer-snow"
	const footer = document.querySelector("#footer");
	if (footer) {
		footer.prepend(snow);
	}

}

// ===== Christmas falling snow =====
// Small, slow, semi-transparent dots on a fixed canvas above the page. Only
// runs with the Christmas theme, never with "reduce motion", pauses while the
// tab is hidden, and can be turned off in Settings ("christmasSnowfall"=off).
window.isIduSnowfallEnabled = function () {
	try {
		return localStorage.getItem("christmasSnowfall") !== "off";
	} catch {
		return true;
	}
};

window.setIduSnowfallEnabled = function (enabled) {
	try {
		localStorage.setItem("christmasSnowfall", enabled ? "on" : "off");
	} catch {}
	window.updateIduSnowfall();
};

(function () {
	let canvas = null;
	let ctx = null;
	let flakes = [];
	let frame = null;
	let lastTime = 0;
	let width = 0;
	let height = 0;
	const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");

	function makeFlake(randomY) {
		return {
			x: Math.random() * width,
			y: randomY ? Math.random() * height : -4,
			r: 0.6 + Math.random() * 1.2,          // 0.6–1.8 px radius
			alpha: 0.2 + Math.random() * 0.55,      // random opacity
			vy: 12 + Math.random() * 22,            // px per second, slow
			drift: 6 + Math.random() * 10,          // sideways sway in px
			phase: Math.random() * Math.PI * 2,
			sway: 0.3 + Math.random() * 0.5,
		};
	}

	function resize() {
		if (!canvas) return;
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		width = window.innerWidth;
		height = window.innerHeight;
		canvas.width = Math.round(width * dpr);
		canvas.height = Math.round(height * dpr);
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		// Few flakes: about one per 9000 px² (≈35 on a phone), capped.
		const target = Math.min(70, Math.round((width * height) / 9000));
		while (flakes.length < target) flakes.push(makeFlake(true));
		flakes.length = target;
	}

	function draw(time) {
		frame = requestAnimationFrame(draw);
		const dt = Math.min((time - (lastTime || time)) / 1000, 0.05);
		lastTime = time;
		ctx.clearRect(0, 0, width, height);
		ctx.fillStyle = "#ffffff";
		for (const f of flakes) {
			f.y += f.vy * dt;
			f.phase += f.sway * dt;
			if (f.y - f.r > height) Object.assign(f, makeFlake(false));
			const x = f.x + Math.sin(f.phase) * f.drift;
			ctx.globalAlpha = f.alpha;
			ctx.beginPath();
			ctx.arc(x, f.y, f.r, 0, Math.PI * 2);
			ctx.fill();
		}
		ctx.globalAlpha = 1;
	}

	// Move the flakes with the page while scrolling, so the snow feels part of
	// the page instead of a layer stuck to the screen.
	let lastScrollY = window.scrollY || 0;
	function onScroll() {
		const scrollY = window.scrollY || 0;
		const delta = scrollY - lastScrollY;
		lastScrollY = scrollY;
		if (!delta || !flakes.length) return;
		for (const f of flakes) {
			f.y -= delta;
			// Wrap around so the screen never runs out of snow.
			if (f.y < -4) f.y += height + 8;
			else if (f.y > height + 4) f.y -= height + 8;
		}
	}

	function start() {
		if (!canvas) {
			canvas = document.createElement("canvas");
			canvas.className = "idu-snowfall";
			canvas.setAttribute("aria-hidden", "true");
			ctx = canvas.getContext("2d");
			document.body.appendChild(canvas);
			window.addEventListener("resize", resize);
			lastScrollY = window.scrollY || 0;
			window.addEventListener("scroll", onScroll, { passive: true });
			resize();
		}
		if (frame === null && !document.hidden) {
			lastTime = 0;
			frame = requestAnimationFrame(draw);
		}
	}

	function stop() {
		if (frame !== null) cancelAnimationFrame(frame);
		frame = null;
		if (canvas) {
			window.removeEventListener("resize", resize);
			window.removeEventListener("scroll", onScroll);
			canvas.remove();
			canvas = null;
			ctx = null;
			flakes = [];
		}
	}

	window.updateIduSnowfall = function () {
		if (!document.body) return;
		const shouldRun = !window.__iduOriginalView &&
			document.documentElement.getAttribute("data-theme") === "Christmas" &&
			window.isIduSnowfallEnabled() &&
			!reducedMotion?.matches;
		if (shouldRun) start();
		else stop();
	};

	document.addEventListener("visibilitychange", () => {
		if (!canvas) return;
		if (document.hidden) {
			if (frame !== null) cancelAnimationFrame(frame);
			frame = null;
		} else {
			start();
		}
	});
	reducedMotion?.addEventListener?.("change", () => window.updateIduSnowfall());
	new MutationObserver(() => window.updateIduSnowfall())
		.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", () => window.updateIduSnowfall());
	} else {
		window.updateIduSnowfall();
	}
})();

// ===== "Christmas theme is here" notice =====
// Shown once per device, the first time the app opens after this update.
// The key is written as soon as it shows, so a reload won't bring it back.
(function () {
	const seenKey = "christmasThemeNoticeSeen";

	function show() {
		try {
			if (localStorage.getItem(seenKey)) return;
			// Default-theme users get the Christmas theme automatically, so
			// only people on Ocean / Dzaga / Besties need telling.
			const savedTheme = localStorage.getItem("theme");
			if (!savedTheme || savedTheme === "Default") return;
		} catch {
			return;
		}
		if (window.__iduOriginalView || (window.location.pathname === "/users/sign_in" && !window.__IDU_MOCK_DATA)) return;
		const header = document.getElementById("idu-header-root") || document.querySelector(".idu-custom-header");
		if (!header) return;
		try {
			localStorage.setItem(seenKey, new Date().toISOString());
		} catch {}

		const notice = document.createElement("div");
		notice.className = "idu-xmas-notice";
		notice.setAttribute("role", "status");
		notice.innerHTML = `
			<svg class="idu-xmas-notice-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
				<path d="M12 2v20M4.9 6.5l14.2 11M4.9 17.5l14.2-11M9 3.5l3 2.5 3-2.5M9 20.5l3-2.5 3 2.5M2.8 9.6l3.9.9-1.3 3.7M21.2 14.4l-3.9-.9 1.3-3.7M2.8 14.4l3.9-.9-1.3-3.7M21.2 9.6l-3.9.9 1.3 3.7"/>
			</svg>
			<span class="idu-xmas-notice-text">Motyw świąteczny jest już dostępny!</span>
			<button type="button" class="idu-xmas-notice-close" aria-label="Zamknij">
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
			</button>`;
		const top = Math.max(header.getBoundingClientRect().bottom, 0);
		notice.style.top = `${top + 8}px`;
		document.body.appendChild(notice);

		let timer = null;
		const close = () => {
			clearTimeout(timer);
			notice.classList.remove("open");
			notice.classList.add("closing");
			setTimeout(() => notice.remove(), 300);
		};
		notice.querySelector(".idu-xmas-notice-close").addEventListener("click", close);
		requestAnimationFrame(() => requestAnimationFrame(() => notice.classList.add("open")));
		timer = setTimeout(close, 6000);
	}

	const start = () => setTimeout(show, 900); // after the header has been rendered
	if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
	else start();
})();
