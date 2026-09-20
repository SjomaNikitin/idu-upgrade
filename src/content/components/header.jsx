// src/content/components/Header.jsx
import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import {
	getSelectedScheduleYear,
	SCHEDULE_YEAR_OPTIONS,
	selectScheduleYear,
} from "../scheduleYear.js";

function MessagesButton({ href, size }) {
	if (!href) return null;

	return (
		<a href={href} className="header-icon-button" aria-label="Wiadomości">
			<svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M4 18L9 12M20 18L15 12M3 8L10.225 12.8166C10.8665 13.2443 11.1872 13.4582 11.5339 13.5412C11.8403 13.6147 12.1597 13.6147 12.4661 13.5412C12.8128 13.4582 13.1335 13.2443 13.775 12.8166L21 8M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</a>
	);
}

function HeaderActions({ accountHref, size, searchOpen, onSearchToggle, searchAvailable }) {
	return (
		<div className="header-actions">
			{searchAvailable && <button
				type="button"
				className={`header-icon-button header-search-button ${searchOpen ? "active" : ""}`}
				aria-label="Szukaj"
				aria-expanded={searchOpen}
				aria-controls="header-search-popup"
				onClick={onSearchToggle}
			>
				<svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</button>}
			<a href={accountHref} className="header-icon-button" aria-label="Konto">
				<svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</a>
		</div>
	);
}

function SearchPopup({ open, onClose, searchElement }) {
	const contentRef = useRef(null);

	useEffect(() => {
		if (!searchElement || !contentRef.current) return undefined;

		contentRef.current.appendChild(searchElement);
		const replaceImageSize = () => {
			searchElement.querySelectorAll("#users_search_result img").forEach((image) => {
				["src", "srcset"].forEach((attribute) => {
					const value = image.getAttribute(attribute);
					if (value?.includes("/mini/")) {
						image.setAttribute(attribute, value.replaceAll("/mini/", "/profile/"));
					}
				});
			});
		};

		replaceImageSize();
		const resultsObserver = new MutationObserver(replaceImageSize);
		resultsObserver.observe(searchElement, {
			attributes: true,
			attributeFilter: ["src", "srcset"],
			childList: true,
			subtree: true,
		});

		return () => resultsObserver.disconnect();
	}, [searchElement]);

	useEffect(() => {
		if (!open) return undefined;

		const handleKeyDown = (event) => {
			if (event.key === "Escape") onClose();
		};
		document.addEventListener("keydown", handleKeyDown);

		const focusFrame = window.requestAnimationFrame(() => {
			searchElement?.querySelector("#search_profile_by_name")?.focus();
		});

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			window.cancelAnimationFrame(focusFrame);
		};
	}, [open, onClose, searchElement]);

	if (!searchElement) return null;

	return (
		<section
			id="header-search-popup"
			className={`header-search-popup ${open ? "open" : ""}`}
			role="dialog"
			aria-modal="false"
			aria-label="Wyszukiwanie użytkowników"
			aria-hidden={!open}
		>
			<div className="header-search-popup-heading">
				<h2>Wyszukaj użytkownika</h2>
				<button type="button" className="header-search-close" onClick={onClose} aria-label="Zamknij wyszukiwanie">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
					</svg>
				</button>
			</div>
			<div ref={contentRef} className="header-search-content"></div>
		</section>
	);
}

export function Header({accountHref, messagesHref, semesterScope, searchElement, isMockData = false}) {
	const headerRef = useRef(null);
	let color = getComputedStyle(root).getPropertyValue('--idu-logo').trim();
	let currentTheme = localStorage.getItem("theme");
	let svgSize = 28;
	let menuStrokeWidth = 4;
	let panelIconStrokeWidth = 2.5;
	let panelIconColor = "currentColor";
	let actionIconStrokeWidth = 2.2;
	let [editMode, setEditMode] = useState(false);
	if (currentTheme === "Ocean") {
		color = "#7EEACC"
	} else if (currentTheme === "Besties") {
		color = "#851A36"
	} else if (currentTheme === "Dzaga") {
		color = "#5B3119"
	} else if (currentTheme === "Default") {
		color = "#0B5F5D"
	}
	const [menuOpen, setMenuOpen] = useState(false);
	const [settingsOpen, setSettingsOpen] = useState(false)
	const [searchOpen, setSearchOpen] = useState(false);
	useEffect(() => {
		const header = headerRef.current;
		const stickyHeader = header?.parentElement?.id === "idu-header-root"
			? header.parentElement
			: header;
		if (!stickyHeader) return undefined;

		let lastScrollY = Math.max(window.scrollY || window.pageYOffset || 0, 0);
		let animationFrame = null;
		const scrollThreshold = 6;
		const topRevealPoint = 12;

		const updateHeader = () => {
			const currentScrollY = Math.max(window.scrollY || window.pageYOffset || 0, 0);
			const scrollDelta = currentScrollY - lastScrollY;

			if (editMode) {
				lastScrollY = currentScrollY;
			} else if (currentScrollY <= topRevealPoint || menuOpen || settingsOpen || searchOpen) {
				stickyHeader.classList.remove("is-scroll-hidden");
				lastScrollY = currentScrollY;
			} else if (scrollDelta > scrollThreshold) {
				stickyHeader.classList.add("is-scroll-hidden");
				lastScrollY = currentScrollY;
			} else if (scrollDelta < -scrollThreshold) {
				stickyHeader.classList.remove("is-scroll-hidden");
				lastScrollY = currentScrollY;
			}

			animationFrame = null;
		};

		const handleScroll = () => {
			if (animationFrame === null) {
				animationFrame = window.requestAnimationFrame(updateHeader);
			}
		};

		stickyHeader.classList.toggle("is-edit-hidden", editMode);
		if (editMode) {
			stickyHeader.classList.remove("is-scroll-hidden");
		} else if (menuOpen || settingsOpen || searchOpen) {
			stickyHeader.classList.remove("is-scroll-hidden");
		}

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", handleScroll);
			if (animationFrame !== null) {
				window.cancelAnimationFrame(animationFrame);
			}
		};
	}, [editMode, menuOpen, searchOpen, settingsOpen]);

	function openSettings () {
		setSettingsOpen(true);
		setMenuOpen(false);
		setSearchOpen(false);
	}
	function toggleSearch () {
		setMenuOpen(false);
		setSettingsOpen(false);
		setSearchOpen((open) => !open);
	}
	window.switchEditMode = function switchEditMode () {
		window.editMode = !editMode;
		const widgets = document.querySelectorAll(".widget");
		if (editMode) {
			document.body.classList.remove('edit-mode');
			for (let i=0; i < widgets.length; i++) {
				widgets[i].classList.remove('edit-mode');
			}
			let editBlock = document.querySelector("div.edit-block");
			if (editBlock) {document.body.removeChild(editBlock);}
		} else {
			document.body.classList.add('edit-mode');
			for (let i=0; i < widgets.length; i++) {
				widgets[i].classList.add('edit-mode');
			}
			let editBlock = document.createElement("div");
			editBlock.classList.add('edit-block');
			editBlock.addEventListener("click", function () {window.switchEditMode()})
			editBlock.innerHTML = "<svg width={svgSize} height={svgSize} viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"currentColor\" d=\"M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z\"/></svg>"
			document.body.appendChild(editBlock);
		}
		window.dispatchEvent(new Event('idu-edit-mode-change'));
		setEditMode(!editMode);
	}

	if (window.location.pathname === "/" || isMockData) {
		return (
			<header ref={headerRef} id="top" className="idu-custom-header">
				<div className="header-menu">
					<a
						className="header-menu-button"
						onClick={() => {
							setSearchOpen(false);
							setMenuOpen(!menuOpen);
						}}
					>
						<svg width={svgSize} height={svgSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</a>
					{!isMockData && <MessagesButton href={messagesHref} size={svgSize}/>}

					<div className={`header-menu-panel ${menuOpen ? "open" : ""}`}>
						<a onClick={() => openSettings()} className="header-panel-link">
							<svg width={svgSize} height={svgSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								<path d="M12.9046 3.06005C12.6988 3 12.4659 3 12 3C11.5341 3 11.3012 3 11.0954 3.06005C10.7942 3.14794 10.5281 3.32808 10.3346 3.57511C10.2024 3.74388 10.1159 3.96016 9.94291 4.39272C9.69419 5.01452 9.00393 5.33471 8.36857 5.123L7.79779 4.93281C7.3929 4.79785 7.19045 4.73036 6.99196 4.7188C6.70039 4.70181 6.4102 4.77032 6.15701 4.9159C5.98465 5.01501 5.83376 5.16591 5.53197 5.4677C5.21122 5.78845 5.05084 5.94882 4.94896 6.13189C4.79927 6.40084 4.73595 6.70934 4.76759 7.01551C4.78912 7.2239 4.87335 7.43449 5.04182 7.85566C5.30565 8.51523 5.05184 9.26878 4.44272 9.63433L4.16521 9.80087C3.74031 10.0558 3.52786 10.1833 3.37354 10.3588C3.23698 10.5141 3.13401 10.696 3.07109 10.893C3 11.1156 3 11.3658 3 11.8663C3 12.4589 3 12.7551 3.09462 13.0088C3.17823 13.2329 3.31422 13.4337 3.49124 13.5946C3.69158 13.7766 3.96395 13.8856 4.50866 14.1035C5.06534 14.3261 5.35196 14.9441 5.16236 15.5129L4.94721 16.1584C4.79819 16.6054 4.72367 16.829 4.7169 17.0486C4.70875 17.3127 4.77049 17.5742 4.89587 17.8067C5.00015 18.0002 5.16678 18.1668 5.5 18.5C5.83323 18.8332 5.99985 18.9998 6.19325 19.1041C6.4258 19.2295 6.68733 19.2913 6.9514 19.2831C7.17102 19.2763 7.39456 19.2018 7.84164 19.0528L8.36862 18.8771C9.00393 18.6654 9.6942 18.9855 9.94291 19.6073C10.1159 20.0398 10.2024 20.2561 10.3346 20.4249C10.5281 20.6719 10.7942 20.8521 11.0954 20.94C11.3012 21 11.5341 21 12 21C12.4659 21 12.6988 21 12.9046 20.94C13.2058 20.8521 13.4719 20.6719 13.6654 20.4249C13.7976 20.2561 13.8841 20.0398 14.0571 19.6073C14.3058 18.9855 14.9961 18.6654 15.6313 18.8773L16.1579 19.0529C16.605 19.2019 16.8286 19.2764 17.0482 19.2832C17.3123 19.2913 17.5738 19.2296 17.8063 19.1042C17.9997 18.9999 18.1664 18.8333 18.4996 18.5001C18.8328 18.1669 18.9994 18.0002 19.1037 17.8068C19.2291 17.5743 19.2908 17.3127 19.2827 17.0487C19.2759 16.8291 19.2014 16.6055 19.0524 16.1584L18.8374 15.5134C18.6477 14.9444 18.9344 14.3262 19.4913 14.1035C20.036 13.8856 20.3084 13.7766 20.5088 13.5946C20.6858 13.4337 20.8218 13.2329 20.9054 13.0088C21 12.7551 21 12.4589 21 11.8663C21 11.3658 21 11.1156 20.9289 10.893C20.866 10.696 20.763 10.5141 20.6265 10.3588C20.4721 10.1833 20.2597 10.0558 19.8348 9.80087L19.5569 9.63416C18.9478 9.26867 18.6939 8.51514 18.9578 7.85558C19.1262 7.43443 19.2105 7.22383 19.232 7.01543C19.2636 6.70926 19.2003 6.40077 19.0506 6.13181C18.9487 5.94875 18.7884 5.78837 18.4676 5.46762C18.1658 5.16584 18.0149 5.01494 17.8426 4.91583C17.5894 4.77024 17.2992 4.70174 17.0076 4.71872C16.8091 4.73029 16.6067 4.79777 16.2018 4.93273L15.6314 5.12287C14.9961 5.33464 14.3058 5.0145 14.0571 4.39272C13.8841 3.96016 13.7976 3.74388 13.6654 3.57511C13.4719 3.32808 13.2058 3.14794 12.9046 3.06005Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</a>
						<a href="/users/sign_out" className="header-panel-link" onClick={() => localStorage.setItem("autoLogin", "no")}>
							<svg xmlns="http://www.w3.org/2000/svg" width={svgSize} height={svgSize} viewBox="0 0 24 24">
								<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 4.001H5v14a2 2 0 0 0 2 2h8m1-5l3-3m0 0l-3-3m3 3H9"/>
							</svg>
						</a>
					</div>
				</div>
				<a className="header-logo-link" href="/">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 832 258" version="1.1" width="80" height="40">
						<path d="M 4.442264185219603e-16 127.50336318009782 L 8.884528370439206e-16 255.00672636019564 18.25 254.5946365131115 C 28.2875 254.36798709721523, 43.8125 254.1414736661712, 52.75 254.0912733330137 L 69 254 69 187.41666666666669 C 68.99999999999999 134.6026024292965, 69.25849691669517 120.91633575133558, 70.25 121.23470377840198 C 70.9375 121.45545752318974, 77.60476526233184 130.60545752318973, 85.0661450274041 141.56803711173532 C 92.52752479247636 152.5306167002809, 106.02752479247636 172.1840222145816, 115.0661450274041 185.24227158795915 C 124.10476526233185 198.3005209613367, 135.775 215.3340852032082, 141 223.09463656989584 C 146.225 230.85518793658346, 153.2 240.87116572200185, 156.5 245.35236498193666 L 162.5 253.5 169.5 254.03301972304186 C 173.35 254.32618057071488, 186.2875 254.37994173364996, 198.25 254.15248897400872 L 219.99999999999997 253.73893850193372 220 126.86946925096686 L 220 0 185.5 0 L 151 0 151 66.58333333333334 C 150.99999999999997 119.39978068570436, 150.74154782263523 133.08275473240886, 149.75 132.76082788097028 C 149.0625 132.5376165488373, 139.18681971122487 118.66261654883728, 127.80404380272192 101.92749454763695 C 116.42126789421897 85.19237254643663, 100.67277709234165 62.050000000000004, 92.80739757632784 50.5 C 84.94201806031404 38.949999999999996, 74.03653265220467 22.8625, 68.57298555830702 14.749999999999996 L 58.639263569402196 -5.152559361016735e-15 29.319631784701098 -2.5762796805083674e-15 L 0 0 4.442264185219603e-16 127.50336318009782 M 253.24616927715664 126.75 L 253.5 253.5 287.75 253.76312763208597 L 322 254.0262552641719 322 127.01312763208595 L 322 0 287.49616927715664 0 L 252.9923385543133 0 253.24616927715664 126.75 M 355 127.0508074670434 L 355 254.1016149340868 414.75 253.75673209390072 C 467.50076126868305 253.4522495438033, 475.6128496727617 253.19820929936276, 484 251.5880813037217 C 538.1720971582944 241.18836187412177, 572.8360800607534 201.78887914538916, 578.1346915463548 144.5935052853935 C 585.4218623799811 65.93281062160901, 546.4312901231319 12.230295437541265, 474.25658246845353 1.5200542649791045 C 466.06083330714245 0.3038602136302022, 453.11725011682375 -2.264688205756696e-15, 409.50658246845353 -1.258090848504585e-15 L 355 0 355 127.0508074670434 M 612 84.42764051533362 C 612 173.02986108713245, 612.1988213946098 177.756437353249, 616.5646330579402 192.94255319628314 C 628.8031886503783 235.51335956872128, 671.1344060164514 259.303400532705, 729.7747378576067 256.56635610820956 C 782.3578872142126 254.11203139260658, 816.3731671212864 230.05916275552062, 827.7723653597332 187.2703201063262 L 830.3752358476826 177.5 830.7281901031254 88.75 L 831.0811443585683 -5.551126064388396e-17 796.5405721792841 -2.775563032194198e-17 L 762 0 761.9881311246135 82.25 C 761.9782959682911 150.40655074026574, 761.7310134415899 165.42144863629616, 760.5449792427468 169.87761543952854 C 757.7682282554591 180.31042216842684, 749.0092627437555 190.34757490482326, 738.4203408270337 195.23088058474812 C 734.1715683795617 197.19029201384586, 731.862141803173 197.5, 721.5 197.5 C 710.0599744714854 197.5, 709.1966804946121 197.35217471960394, 703 194.33217100942585 C 692.5058801692167 189.2177745431928, 686.2626810404083 182.2975726923929, 682.6546714000524 171.78062688474526 C 680.5734102486462 165.71398268954235, 680.5 163.9668375934266, 680.5 120.5 C 680.5 95.75, 680.3875 58.5125, 680.25 37.75 L 680 0 646 0 L 612 0 612 84.42764051533362 M 471 60.56519809810713 C 498.17174703629604 67.68481427721672, 509.830467426046 87.0493035265728, 509.9683158192803 125.28941375142983 C 510.1082286962731 164.10222623730783, 499.768242065242 184.23129849049934, 475.36629225207685 192.64991017611612 C 467.96445532117605 195.20352541418586, 466.215798636529 195.38904378699917, 445.75 195.7919599538735 L 424 196.2201585687995 424 126.96688523595328 L 424 57.71361190310709 444.25 58.28783102742102 C 458.50889719602026 58.692163445276876, 466.42307003584534 59.36593827208571, 471 60.56519809810713" stroke="none" fill="currentColor" fill-rule="evenodd" data-fill-layer-id="trace-color"/>
					</svg>
				</a>
				{!isMockData && <HeaderActions
					accountHref={accountHref}
					size={svgSize}
					searchOpen={searchOpen}
					onSearchToggle={toggleSearch}
					searchAvailable={Boolean(searchElement)}
				/>}
				{!isMockData && <SearchPopup open={searchOpen} onClose={() => setSearchOpen(false)} searchElement={searchElement}/>}
				<Settings open={settingsOpen} setOpen={setSettingsOpen} semesterScope={semesterScope}/>
			</header>
		);
	} else {
		return (
			<header ref={headerRef} id="top" className="idu-custom-header mini">
				<div className="header-menu">
					<a
						className="header-menu-button"
						onClick={() => setMenuOpen(!menuOpen)}
					>
						<svg width={svgSize} height={svgSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</a>
					<a onClick={() => window.open("/", "_self")} className="header-home-icon-button" aria-label="Strona główna">
						<svg width={svgSize} height={svgSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M5 9.77746V16.2C5 17.8802 5 18.7203 5.32698 19.362C5.6146 19.9265 6.07354 20.3854 6.63803 20.673C7.27976 21 8.11984 21 9.8 21H14.2C15.8802 21 16.7202 21 17.362 20.673C17.9265 20.3854 18.3854 19.9265 18.673 19.362C19 18.7203 19 17.8802 19 16.2V5.00002M21 12L15.5668 5.96399C14.3311 4.59122 13.7133 3.90484 12.9856 3.65144C12.3466 3.42888 11.651 3.42893 11.0119 3.65159C10.2843 3.90509 9.66661 4.59157 8.43114 5.96452L3 12M14 21V15H10V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</a>

					<div className={`header-menu-panel ${menuOpen ? "open" : ""}`}>
						{!window.location.pathname.includes("students") && (
							<a href={accountHref} className="header-panel-link" aria-label="Konto">
								<svg width={svgSize} height={svgSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
							</a>
						)}
						<a href={"/internal_messages"} className="header-panel-link">
							<svg width={svgSize} height={svgSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M4 18L9 12M20 18L15 12M3 8L10.225 12.8166C10.8665 13.2443 11.1872 13.4582 11.5339 13.5412C11.8403 13.6147 12.1597 13.6147 12.4661 13.5412C12.8128 13.4582 13.1335 13.2443 13.775 12.8166L21 8M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</a>
						<a onClick={() => openSettings()} className="header-panel-link">
							<svg width={svgSize} height={svgSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								<path d="M12.9046 3.06005C12.6988 3 12.4659 3 12 3C11.5341 3 11.3012 3 11.0954 3.06005C10.7942 3.14794 10.5281 3.32808 10.3346 3.57511C10.2024 3.74388 10.1159 3.96016 9.94291 4.39272C9.69419 5.01452 9.00393 5.33471 8.36857 5.123L7.79779 4.93281C7.3929 4.79785 7.19045 4.73036 6.99196 4.7188C6.70039 4.70181 6.4102 4.77032 6.15701 4.9159C5.98465 5.01501 5.83376 5.16591 5.53197 5.4677C5.21122 5.78845 5.05084 5.94882 4.94896 6.13189C4.79927 6.40084 4.73595 6.70934 4.76759 7.01551C4.78912 7.2239 4.87335 7.43449 5.04182 7.85566C5.30565 8.51523 5.05184 9.26878 4.44272 9.63433L4.16521 9.80087C3.74031 10.0558 3.52786 10.1833 3.37354 10.3588C3.23698 10.5141 3.13401 10.696 3.07109 10.893C3 11.1156 3 11.3658 3 11.8663C3 12.4589 3 12.7551 3.09462 13.0088C3.17823 13.2329 3.31422 13.4337 3.49124 13.5946C3.69158 13.7766 3.96395 13.8856 4.50866 14.1035C5.06534 14.3261 5.35196 14.9441 5.16236 15.5129L4.94721 16.1584C4.79819 16.6054 4.72367 16.829 4.7169 17.0486C4.70875 17.3127 4.77049 17.5742 4.89587 17.8067C5.00015 18.0002 5.16678 18.1668 5.5 18.5C5.83323 18.8332 5.99985 18.9998 6.19325 19.1041C6.4258 19.2295 6.68733 19.2913 6.9514 19.2831C7.17102 19.2763 7.39456 19.2018 7.84164 19.0528L8.36862 18.8771C9.00393 18.6654 9.6942 18.9855 9.94291 19.6073C10.1159 20.0398 10.2024 20.2561 10.3346 20.4249C10.5281 20.6719 10.7942 20.8521 11.0954 20.94C11.3012 21 11.5341 21 12 21C12.4659 21 12.6988 21 12.9046 20.94C13.2058 20.8521 13.4719 20.6719 13.6654 20.4249C13.7976 20.2561 13.8841 20.0398 14.0571 19.6073C14.3058 18.9855 14.9961 18.6654 15.6313 18.8773L16.1579 19.0529C16.605 19.2019 16.8286 19.2764 17.0482 19.2832C17.3123 19.2913 17.5738 19.2296 17.8063 19.1042C17.9997 18.9999 18.1664 18.8333 18.4996 18.5001C18.8328 18.1669 18.9994 18.0002 19.1037 17.8068C19.2291 17.5743 19.2908 17.3127 19.2827 17.0487C19.2759 16.8291 19.2014 16.6055 19.0524 16.1584L18.8374 15.5134C18.6477 14.9444 18.9344 14.3262 19.4913 14.1035C20.036 13.8856 20.3084 13.7766 20.5088 13.5946C20.6858 13.4337 20.8218 13.2329 20.9054 13.0088C21 12.7551 21 12.4589 21 11.8663C21 11.3658 21 11.1156 20.9289 10.893C20.866 10.696 20.763 10.5141 20.6265 10.3588C20.4721 10.1833 20.2597 10.0558 19.8348 9.80087L19.5569 9.63416C18.9478 9.26867 18.6939 8.51514 18.9578 7.85558C19.1262 7.43443 19.2105 7.22383 19.232 7.01543C19.2636 6.70926 19.2003 6.40077 19.0506 6.13181C18.9487 5.94875 18.7884 5.78837 18.4676 5.46762C18.1658 5.16584 18.0149 5.01494 17.8426 4.91583C17.5894 4.77024 17.2992 4.70174 17.0076 4.71872C16.8091 4.73029 16.6067 4.79777 16.2018 4.93273L15.6314 5.12287C14.9961 5.33464 14.3058 5.0145 14.0571 4.39272C13.8841 3.96016 13.7976 3.74388 13.6654 3.57511C13.4719 3.32808 13.2058 3.14794 12.9046 3.06005Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</a>
						<a href="/users/sign_out" className="header-panel-link" onClick={() => {localStorage.setItem("autoLogin", "no"); window.open("/users/sign_out", "_self")}}>
							<svg xmlns="http://www.w3.org/2000/svg" width={svgSize} height={svgSize} viewBox="0 0 24 24">
								<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 4.001H5v14a2 2 0 0 0 2 2h8m1-5l3-3m0 0l-3-3m3 3H9"/>
							</svg>
						</a>
					</div>
				</div>
				<Settings open={settingsOpen} setOpen={setSettingsOpen} semesterScope={semesterScope}/>
			</header>
		);
	}

}

export function Settings ({ open, setOpen, semesterScope }) {
	let svgSize = 36;
	return (
		<div className={`settings-container ${open ? "open" : ""}`}>
			<div className="settings-content">
				<section className="settings-section">
					<h2>Motyw</h2>
					<SettingsDots />
				</section>
				<ScheduleYearForm />
				{semesterScope ? <SemesterScopeForm semesterScope={semesterScope}/> : null}
				<section className="settings-section">
					<h2>Widok</h2>
					<button
						type="button"
						className="settings-original-view-button"
						onClick={() => window.setIduOriginalView(true)}
					>
						Pokaż oryginalną stronę
					</button>
				</section>
			</div>
			<a className={"header-icon-button-settings"} onClick={() => setOpen(false)}>
				<svg width={svgSize} height={svgSize} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"/></svg>
			</a>
		</div>
	);
}

export function ScheduleYearForm() {
	const [selectedYear, setSelectedYear] = useState(getSelectedScheduleYear);

	return (
		<section className="settings-section">
			<h2>Rocznik</h2>
			<form className="schedule-year-form" onSubmit={(event) => event.preventDefault()}>
				<select
					id="idu-schedule-year"
					aria-label="Rocznik"
					value={selectedYear}
					onChange={(event) => {
						setSelectedYear(selectScheduleYear(event.currentTarget.value));
					}}
				>
					{SCHEDULE_YEAR_OPTIONS.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</form>
		</section>
	);
}

export function SemesterScopeForm({ semesterScope }) {
	const storageKey = 'iduSemesterScope';
	const storedValue = localStorage.getItem(storageKey) || '';
	const hasOption = (value) => semesterScope.options.some((option) => option.value === value);
	const initialValue = semesterScope.selectedValue && hasOption(semesterScope.selectedValue)
		? semesterScope.selectedValue
		: hasOption(storedValue) ? storedValue : '';
	const [selectedValue, setSelectedValue] = useState(initialValue);

	return (
		<section className="settings-section">
			<h2>Semestr</h2>
			<form
				className="semester-scope-form"
				action={semesterScope.action}
				method="post"
				acceptCharset="UTF-8"
			>
				{semesterScope.hiddenFields.map((field) => (
					<input key={field.name} type="hidden" name={field.name} value={field.value}/>
				))}
				<select
					id="idu-semester-id"
					name="semester_id"
					value={selectedValue}
					onChange={(event) => {
						const select = event.currentTarget;
						localStorage.setItem(storageKey, select.value);
						setSelectedValue(select.value);
						select.form?.submit();
					}}
				>
					{semesterScope.options.map((option) => (
						<option key={option.value || 'empty'} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</form>
		</section>
	);
}

export function SettingsDots() {
	const themes = ["Default", "Ocean", "Dzaga", "Besties"];
	const dots = ["#99EADB", "#242A32", "#DBA67A", "#F6CCCD"];

	const currentTheme = localStorage.getItem("theme") || "Default";
	const [selectedDot, setSelectedDot] = useState(
		Math.max(0, themes.indexOf(currentTheme))
	);

	return (
		<div className="settings-dots">
			{dots.map((color, index) => (
				<button
					key={index}
					type="button"
					className={`settings-dot ${selectedDot === index ? "active" : ""}`}
					style={{ backgroundColor: color }}
					onClick={() => {
						setSelectedDot(index);
						window.loadWebsiteTheme(themes[index]);
					}}
				/>
			))}
		</div>
	);
}
