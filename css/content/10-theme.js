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

function loadWebsiteTheme(chooseTheme) {
	if (chooseTheme) {

		document.documentElement.setAttribute("data-theme", chooseTheme);
		localStorage.setItem("theme", chooseTheme);
		changeIDULogo()
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
		changeIDULogo()
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

function addThemeElement() {
	const elemCont = document.createElement("div");
	elemCont.className = "theme-settings-container";
	const topContainer = document.querySelector("#visual");
	if (topContainer) {
		document.body.append(elemCont);
	}
	const mainElement = document.createElement("div");
	mainElement.className = "main-theme-settings-element";
	elemCont.appendChild(mainElement);
	mainElement.addEventListener("click", () => {
		mainElement.classList.toggle("big");
	});
	let svgSize = "38px";
	let color = getComputedStyle(root).getPropertyValue('--main-text-color').trim();
	elemCont.insertAdjacentHTML("beforeend", `
		<svg fill=${color} width=${svgSize} height=${svgSize} viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
    <path d="M517.257 1127.343c72.733 0 148.871 36.586 221.274 107.45 87.455 110.418 114.922 204.135 81.632 278.296-72.733 162.274-412.664 234.897-618.666 259.178 34.609-82.62 75.15-216.88 75.15-394.645 0-97.123 66.47-195.455 157.88-233.689 26.698-11.097 54.494-16.59 82.73-16.59Zm229.404-167.109c54.055 28.895 106.462 65.371 155.133 113.494l13.844 15.6c28.016 35.378 50.649 69.987 70.425 104.155-29.554 26.259-59.878 52.737-90.75 79.545-18.898-35.488-43.069-71.964-72.843-109.319l-4.285-4.834c-48.342-47.683-99.43-83.39-151.727-107.011 26.368-30.653 53.066-61.196 80.203-91.63Zm1046.49-803.133c7.801 7.8 18.129 21.754 16.92 52.187-6.043 155.683-284.338 494.405-740.509 909.266-19.995-32.302-41.969-64.822-67.788-97.453l-22.523-25.27c-49.22-48.671-101.408-88.883-156.012-121.074 350.588-385.855 728.203-734.356 910.254-741.828 30.983-.109 44.497 9.01 59.658 24.172Zm126.678 56.472c2.087-53.615-14.832-99.98-56.142-141.29-34.28-34.279-81.962-51.198-134.588-49.11-304.554 12.414-912.232 683.377-1179.54 996.17-53.616-5.383-106.682 2.088-157.441 23.402-132.61 55.263-225.339 193.038-225.339 334.877 0 268.517-103.935 425.737-104.923 427.275L0 1896.747l110.307-6.153c69.217-3.735 681.29-45.375 810.165-332.46 24.39-54.604 29.225-113.163 15.93-175.239 374.32-321.802 972.11-879.71 983.427-1169.322" fill-rule="currentColor"/>
		</svg>
		`)

	const themeElementsContainer = document.createElement("div");
	themeElementsContainer.className = "theme-settings-grid-container";
	mainElement.appendChild(themeElementsContainer);
	for (let i = 0; i < 4; i++) {
		const themeOptionContainer = document.createElement("div");
		themeOptionContainer.className = "theme-option-container";
		themeElementsContainer.appendChild(themeOptionContainer);
		const themeOptionElem = document.createElement("div");
		themeOptionElem.className = "theme-option-elem";
		themeOptionContainer.appendChild(themeOptionElem);
		themeOptionContainer.style.backgroundColor = themePresets[i].bc;
		themeOptionElem.style.backgroundColor = themePresets[i].mc;
		themeOptionContainer.addEventListener("click", () => {
			loadWebsiteTheme(themePresets[i].name);
		})
		const themeNameElement = document.createElement("p");
		themeNameElement.className = "theme-name";
		themeNameElement.innerHTML = themePresets[i].name;
		themeNameElement.style.color = themePresets[i].mc;
		themeOptionContainer.appendChild(themeNameElement);
	}
}

