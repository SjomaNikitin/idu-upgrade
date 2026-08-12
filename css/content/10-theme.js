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
		window.trackIduUsage?.("theme_changed", {
			view: "custom",
			theme: chooseTheme,
		});

		document.documentElement.setAttribute("data-theme", chooseTheme);
		localStorage.setItem("theme", chooseTheme);
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
		document.documentElement.setAttribute("data-theme", theme);
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
