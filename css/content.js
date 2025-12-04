let themePresets = [
	{bc: "rgb(255,0,0)", mc: "rgb(56, 102, 65)", name: "Default"},
	{bc: "rgb(157,190,187)", mc: "rgb(244,233,205)", name: "Dzaga"},
	{bc: "rgb(19, 35, 44)", mc: "rgb(42, 69, 75)", name: "Ocean"},
	{bc: "rgb(255, 169, 185)", mc: "rgb(255, 226, 223)", name: "Besties"}
]
const root = document.documentElement;
let bgCanvas;
let XmasTheme = true;
function hideXmas(){
	document.querySelector("canvas.bg-canvas").parentElement.removeChild(document.querySelector("canvas.bg-canvas"));
	document.querySelector("img.xmas-top-image").parentElement.removeChild(document.querySelector("img.xmas-top-image"));
	const presentLines = document.querySelectorAll(".present-line");
	for (let i=0; i<presentLines.length; i++) {
		presentLines[i].parentElement.removeChild(presentLines[i]);
	}
	const topSnowEls = document.querySelectorAll(".top-snow");
	for (let i=0; i<topSnowEls.length; i++) {
		topSnowEls[i].parentElement.removeChild(topSnowEls[i]);
	}
	document.querySelector(".footer-snow").parentElement.removeChild(document.querySelector(".footer-snow"));
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

	return { start, stop};
}
	function update(newOptions = {}) {
		if (newOptions.amount !== undefined) options.amount = newOptions.amount;
		if (newOptions.speed !== undefined) options.speed = newOptions.speed;
		if (newOptions.size !== undefined) options.size = newOptions.size;
		makeFlakes();
	}

	function addVerticalPresentLine (module) {
	const ignorePathsList = ["/informations"]
		if (!ignorePathsList.includes(window.location.pathname)) {
			const line = document.createElement("div");
			line.className = "present-line";
			module.prepend(line);
			const button = module.querySelector(".hide-me");
			if (button) {
				button.addEventListener("click", () => {
					line.classList.toggle("hide-me");
				})
			}
		}

	}

	function xmasThemeLoader() {
		const bgCanvasContainer = document.createElement("div");
		bgCanvasContainer.className = "bg-canvas-container";
		document.body.prepend(bgCanvasContainer);
		bgCanvas = document.createElement("canvas");
		bgCanvas.className = "bg-canvas";
		bgCanvas.width = window.innerWidth;
		bgCanvas.height = "1400";
		// bgCanvas.height = "300";
		bgCanvasContainer.appendChild(bgCanvas);
		const bgCanvasSnow = Snowfall(bgCanvas);
		bgCanvasSnow.start();
		const topImage = document.createElement("img");
		topImage.className = "xmas-top-image";
		topImage.src = "https://sajmik.b-cdn.net/TopImageXmas.PNG"
		document.body.prepend(topImage);
		const modules = document.querySelectorAll(".module");
		const theme = localStorage.getItem("theme");
		for (let i=0; i<modules.length; i++) {
			addVerticalPresentLine(modules[i]);
			if (theme === "Default") {
				addSnow(modules[i]);
			}
		}
		addFooterSnow()
		bgCanvas.height = document.body.offsetHeight;
		const observer = new ResizeObserver(() => {
			console.log("Body height changed:", document.body.offsetHeight);
			bgCanvas.height = document.body.offsetHeight;
		});
		observer.observe(document.body);
	}

	function addFooterSnow () {
		const snow = document.createElement("img");
		snow.src = "https://sajmik.b-cdn.net/FooterSnow.PNG"
		snow.className = "footer-snow"
		const footer = document.querySelector("#footer");
		if (footer) {
			footer.prepend(snow);
		}

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
				}
			}
		} else {
			let theme = localStorage.getItem("theme");
			if (theme !== "Default" && document.querySelector("canvas.bg-canvas")) {
				hideXmas()
			}
			if (theme === "Default") {
				if (XmasTheme) {
					xmasThemeLoader();
				}
			}
			document.documentElement.setAttribute("data-theme", theme);
			changeIDULogo()
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
		let svgSize = (parseInt(mainElement.offsetWidth) - 20) + "px";
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

	function closeAllTabs() {
		const switches = document.querySelectorAll("a.hide-me")
		for (let i = 0; i < switches.length; i++) {
			switches[i].click();
		}
	}

	function changeIDULogo() {
		const logoContainer = document.querySelector("#logo");
		let color = getComputedStyle(root).getPropertyValue('--idu-logo').trim();
		let svg;
		let currentTheme = localStorage.getItem("theme");
		if (currentTheme === "Ocean") {
			color = "#91dba4"
		} else if (currentTheme === "Besties") {
			color = "#ffe2df"
		} else if (currentTheme === "Dzaga") {
			color = "#f4e9cd"
		} else {
			color = "#b82929"
			const customLogo = document.createElement("img");
			customLogo.className = "custom-logo-img";
			customLogo.src = "https://sajmik.b-cdn.net/Your_paragraph_text-removebg-preview.png";
			logoContainer.innerHTML = "";
			logoContainer.appendChild(customLogo);
		}

		svg = `
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="75">
<path d="M0 0 C27.11111111 0 27.11111111 0 36.3125 6.25 C43.01477426 13.10814111 44.28837728 20.68188086 44.3190918 29.99975586 C44.17553983 37.69136285 42.38122426 45.26760454 37.6875 51.5 C26.47705734 61.92831875 16.25130168 59 0 59 C0 39.53 0 20.06 0 0 Z M12 9 C12 22.86 12 36.72 12 51 C20.70565579 50.36888152 20.70565579 50.36888152 27 46 C32.46135334 38.47313482 32.59520724 31.02730988 32 22 C30.82103747 16.29502031 27.59613457 13.25559532 23 10 C19.26213521 8.57836298 19.26213521 8.57836298 12 9 Z " fill=${color} transform="translate(43,7)"/>
<path d="M0 0 C3.96 0 7.92 0 12 0 C12.00410889 1.33699951 12.00821777 2.67399902 12.01245117 4.05151367 C12.03424542 9.01853836 12.08853883 13.98477123 12.15258789 18.95141602 C12.17576522 21.09977624 12.19016297 23.24825004 12.19555664 25.39672852 C12.20484791 28.48786173 12.24584351 31.57720912 12.29296875 34.66796875 C12.2890361 35.62648239 12.28510345 36.58499603 12.28105164 37.57255554 C12.38213016 42.20659503 12.47613492 44.32470224 15.3918457 48.08325195 C18.18217732 50.13388319 19.5444055 51 23 51 C27.04234961 49.70644812 28.60049458 48.73265351 30.64770508 44.97827148 C32.43217602 40.48664698 32.47620984 36.13055762 32.51171875 31.34765625 C32.52966995 30.44752304 32.54762115 29.54738983 32.56611633 28.61997986 C32.61995245 25.76753309 32.65402888 22.91525107 32.6875 20.0625 C32.72069668 18.11911783 32.7551885 16.17575733 32.79101562 14.23242188 C32.87566341 9.48840064 32.94260136 4.744426 33 0 C36.63 0 40.26 0 44 0 C44.09924314 6.54699332 44.17164631 13.09354394 44.21972656 19.64111328 C44.23978046 21.86612582 44.26703065 24.09108607 44.30175781 26.31591797 C44.35054934 29.52324365 44.37303162 32.72986951 44.390625 35.9375 C44.41127014 36.92427734 44.43191528 37.91105469 44.45318604 38.92773438 C44.45516041 45.07304735 43.6745456 49.93592685 40 55 C34.22596433 59.59566104 29.49629138 60.22538854 22.3125 60.3125 C21.53455078 60.34150391 20.75660156 60.37050781 19.95507812 60.40039062 C14.20196873 60.46276796 9.76372678 59.31892109 5 56 C1.09633418 51.19548822 -0.130206 47.39498358 -0.11352539 41.32324219 C-0.11341209 39.94226349 -0.11341209 39.94226349 -0.11329651 38.53338623 C-0.10813522 37.54783752 -0.10297394 36.56228882 -0.09765625 35.546875 C-0.0962413 34.53151672 -0.09482635 33.51615845 -0.09336853 32.47003174 C-0.08777516 29.22999108 -0.07522385 25.99001975 -0.0625 22.75 C-0.05748414 20.55208433 -0.05292139 18.35416758 -0.04882812 16.15625 C-0.0378079 10.77080666 -0.02054778 5.38541508 0 0 Z " fill=${color} transform="translate(94,7)"/>
<path d="M0 0 C3.94211019 3.10336334 5.31134915 5.48402546 6.390625 10.359375 C7.72546791 23.61881461 -4.0914371 37.85590565 -11.0625 48.3125 C-4.1325 48.6425 2.7975 48.9725 9.9375 49.3125 C9.9375 51.9525 9.9375 54.5925 9.9375 57.3125 C-2.9325 57.3125 -15.8025 57.3125 -29.0625 57.3125 C-27.93749179 51.68745897 -27.93749179 51.68745897 -26.09375 48.81640625 C-25.6915625 48.1819458 -25.289375 47.54748535 -24.875 46.89379883 C-24.441875 46.22759521 -24.00875 45.5613916 -23.5625 44.875 C-23.1190625 44.17850342 -22.675625 43.48200684 -22.21875 42.7644043 C-19.99023635 39.27166814 -17.72997867 35.79973527 -15.46875 32.328125 C-15.06333984 31.70349365 -14.65792969 31.0788623 -14.24023438 30.43530273 C-13.12430377 28.71999896 -11.99989485 27.01021967 -10.875 25.30078125 C-7.7622039 20.16869286 -6.50105204 16.37613795 -7.0625 10.3125 C-7.96007556 8.16469923 -7.96007556 8.16469923 -10.0625 7.3125 C-14.11169215 7.38612168 -16.2751588 7.5251588 -19.1875 10.4375 C-19.80625 11.05625 -20.425 11.675 -21.0625 12.3125 C-24.52836985 12.3125 -25.78433395 11.56059405 -28.375 9.25 C-28.931875 8.610625 -29.48875 7.97125 -30.0625 7.3125 C-29.40334272 4.67587087 -28.72418551 2.83093401 -26.546875 1.125 C-18.63632381 -3.55254331 -8.3515074 -4.27369248 0 0 Z " fill=${color} transform="translate(174.0625,8.6875)"/>
<path d="M0 0 C3.63 0 7.26 0 11 0 C11 19.47 11 38.94 11 59 C7.04 59 3.08 59 -1 59 C-1.02255549 51.45501411 -1.04091769 43.91004069 -1.05181217 36.36502934 C-1.05703989 32.86191115 -1.0641355 29.35881715 -1.07543945 25.85571289 C-1.08834206 21.83219159 -1.09322912 17.80869586 -1.09765625 13.78515625 C-1.10539818 11.88987938 -1.10539818 11.88987938 -1.11329651 9.95631409 C-1.11337204 8.795186 -1.11344757 7.63405792 -1.11352539 6.43774414 C-1.11685631 4.8955294 -1.11685631 4.8955294 -1.12025452 3.32215881 C-1 1 -1 1 0 0 Z " fill=${color} transform="translate(21,7)"/>
</svg>
`;
		// Replace older <img> with SVG
		if (currentTheme !== "Default") {
			logoContainer.innerHTML = svg;
			logoContainer.style.scale = "80%";
		}
	}

	function addSnow(el){
		const snow = document.createElement("img");
		snow.src = "https://sajmik.b-cdn.net/TopSnow.PNG";
		snow.className = "top-snow"
		el.prepend(snow);
}



	function moveScheduleHigher(){
		const h3 = Array.from(document.querySelectorAll('h3'))
			.find(el => el.textContent.trim().includes("Aktualny plan"));

		if (h3) {
			const schedule = h3.parentElement; // or .closest('.your-container-class')
			const leftColumn = document.querySelector("div.left-column");
			schedule.parentElement.removeChild(schedule);
			leftColumn.appendChild(schedule);

		}
	}

	function replaceWithIcon(elem, icon, num = null) {
		if (window.innerWidth < window.innerHeight) {

			const cont = document.createElement("div");
			cont.classList.add("icon-container");
			cont.innerHTML = icon;
			const href = elem.querySelector("a").href;
			if (num != null && num > 0) {
				const number = document.createElement("div");
				number.classList.add("notification-number");
				number.innerHTML = num;
				cont.appendChild(number);
			}
			elem.parentElement.appendChild(cont);
			elem.parentElement.removeChild(elem);
			cont.addEventListener("click", () => {
				window.location.href = href;
			})
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

	loadWebsiteTheme()
	let svgSize = "60%";
	window.addEventListener("DOMContentLoaded", function() {
		if (window.innerWidth < window.innerHeight) {
			closeAllTabs()
			changeIDULogo()
			moveScheduleHigher()
			const firstSection = document.querySelector("#unique-id192");
			let forumEl = document.querySelector("#forums_path");
			let templatesEl = document.querySelector("#templates");
			if (forumEl) {
				forumEl.parentElement.removeChild(forumEl);
				templatesEl.parentElement.removeChild(templatesEl);
			}
			if (window.location.pathname === "/") {
				if (firstSection) {
					removeUnwantedLinks(firstSection);
				}
				if (document.querySelector("#unique-id14")){
					makeModulesShorter(document.querySelector("#unique-id14").parentElement);
				}

			}
			if (document.querySelector("input#user_login")) {
				document.querySelector("input#user_login").placeholder = "Login";
				document.querySelector("input#user_password").placeholder = "Password";
			}

			let messagesEl = document.querySelector("#messages");
			let newsEl = document.querySelector("#news");
			let logOutEl = document.querySelector("#logout");
			let profileEl = document.querySelector("#account");
			if (messagesEl) {
				replaceWithIcon(messagesEl, `
	<svg xmlns=http://www.w3.org/2000/svg" width=${svgSize} height=${svgSize} viewBox="0 0 24 24">
    <path fill="currentColor" d="m20.34 9.32l-14-7a3 3 0 0 0-4.08 3.9l2.4 5.37a1.06 1.06 0 0 1 0 .82l-2.4 5.37A3 3 0 0 0 5 22a3.14 3.14 0 0 0 1.35-.32l14-7a3 3 0 0 0 0-5.36Zm-.89 3.57l-14 7a1 1 0 0 1-1.35-1.3l2.39-5.37a2 2 0 0 0 .08-.22h6.89a1 1 0 0 0 0-2H6.57a2 2 0 0 0-.08-.22L4.1 5.41a1 1 0 0 1 1.35-1.3l14 7a1 1 0 0 1 0 1.78Z"/>
</svg>
	`, messagesEl.querySelector("strong").innerHTML);
				replaceWithIcon(newsEl, `
<svg xmlns="http://www.w3.org/2000/svg" width=${svgSize} height=${svgSize} viewBox="0 0 24 24">
    <path fill="currentColor" d="M4 8a8 8 0 1 1 16 0v4.697l2 3V20h-5.611a4.502 4.502 0 0 1-8.777 0H2v-4.303l2-3V8Zm5.708 12a2.5 2.5 0 0 0 4.584 0H9.708ZM12 2a6 6 0 0 0-6 6v5.303l-2 3V18h16v-1.697l-2-3V8a6 6 0 0 0-6-6Z"/>
</svg>
	`, newsEl.querySelector("strong").innerHTML);
				replaceWithIcon(profileEl, `
<svg xmlns="http://www.w3.org/2000/svg" width=${svgSize} height=${svgSize} viewBox="0 0 24 24">
    <g fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linejoin="round" d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/>
        <circle cx="12" cy="7" r="3"/>
    </g>
</svg>
	`);
				replaceWithIcon(logOutEl, `
<svg xmlns="http://www.w3.org/2000/svg" width=${svgSize} height=${svgSize} viewBox="0 0 24 24">
    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 4.001H5v14a2 2 0 0 0 2 2h8m1-5l3-3m0 0l-3-3m3 3H9"/>
</svg>
	`);
			}


			addThemeElement()


			const tiptips = document.querySelectorAll("span.tiptip");
			if (tiptips) {
				tiptips.forEach(tiptip => {
					if (tiptip.innerText[1] === "0") {
						tiptip.innerText = "(0) 7:55-8:40"
					}
					if (tiptip.innerText[1] === "1") {
						tiptip.innerText = "(1) 8:45-9:30"
					}
					if (tiptip.innerText[1] === "2") {
						tiptip.innerText = "(2) 9:35-10:20"
					}
					if (tiptip.innerText[1] === "3") {
						tiptip.innerText = "(3) 10:30-11:15"
					}
					if (tiptip.innerText[1] === "4") {
						tiptip.innerText = "(4) 11:25-12:10"
					}
					if (tiptip.innerText[1] === "5") {
						tiptip.innerText = "(5) 12:15-13:00"
					}
					if (tiptip.innerText[1] === "6") {
						tiptip.innerText = "(6) 13:10-13:55"
					}
					if (tiptip.innerText[1] === "7") {
						tiptip.innerText = "(7) 14:25-15:10"
					}
					if (tiptip.innerText[1] === "8") {
						tiptip.innerText = "(8) 15:15-16:00"
					}

				})
			}
		}
	})










