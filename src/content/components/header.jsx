// src/content/components/Header.jsx
import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

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

export function Header({accountHref, messagesHref, semesterScope, searchElement}) {
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

	if (window.location.pathname === "/") {
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
					<MessagesButton href={messagesHref} size={svgSize}/>

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
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 808 261" width="80" height="40">
						<path d="M691.47 0.07C700.14 0.07 708.81 0.07 717.48 0.07C720.42 1.82 732.59 2.15 737 3.21C750.79 6.53 764.3 11.74 775.75 20.3C782.61 25.42 788.83 31.93 793.3 39.22C797.19 45.56 800.64 52.39 802.07 59.75C803.83 68.85 804.97 78.1 803.83 87.43C799.92 119.18 772.23 147.09 748.67 166.9C738.36 175.58 728.03 184.25 717.78 193.02C715.23 195.19 707.95 199.32 707.89 202.73C740.78 202.87 773.68 203.01 806.58 203.15C806.63 221.46 806.67 239.77 806.72 258.08C741.81 258.04 676.89 258 611.98 257.96C611.1 254.4 611.7 250.05 611.7 246.34C611.7 238.1 611.7 229.85 611.7 221.6C611.7 218.08 610.43 211.56 611.98 208.39C613.17 205.97 617.61 203.53 619.72 201.87C626.67 196.43 633.19 190.43 640.09 184.94C661.12 168.2 681.65 150.72 702.23 133.44C715.21 122.54 730.59 111.33 735.73 94.45C744.47 65.7 714.72 44.03 688.84 56.34C680.5 60.3 675.36 67.97 673.2 76.72C672.46 79.72 673.18 83.99 671.52 86.57C650.02 86.43 628.53 86.3 607.04 86.17C605.28 81.28 607.84 70.8 608.81 65.62C613.74 39.35 633.07 18.18 657.56 8.25C664.45 5.46 672.08 3 679.48 2.04C681.71 1.75 690.31 1.18 691.47 0.07ZM0.07 3.4C22.9 3.46 45.74 3.51 68.57 3.56C68.63 88.4 68.69 173.24 68.76 258.08C45.86 258.14 22.97 258.21 0.07 258.27C0.07 173.31 0.07 88.36 0.07 3.4ZM101.93 257.94C101.93 173.15 101.93 88.35 101.93 3.56C124.11 2.54 146.56 3.5 168.77 3.5C209.91 3.5 247.36 2.32 281.77 28.31C342.17 73.93 341.9 186.62 282.66 232.97C244.98 262.46 198.43 258.23 153.26 258.23C141.66 258.23 130.05 258.23 118.45 258.23C113.35 258.23 106.84 259.28 101.93 257.94ZM481.43 261.16C472.48 261.16 463.53 261.16 454.58 261.16C452.83 259.67 449.05 260.29 446.77 259.96C440.31 259.02 433.84 257.8 427.56 256.06C411.23 251.54 393.93 242.77 382.39 230C356.96 201.88 358.5 175.35 358.5 139.42C358.5 114.54 358.5 89.66 358.5 64.78C358.5 50.67 358.5 36.55 358.5 22.43C358.5 17.68 357.27 8.11 358.85 3.98C381.69 3.98 404.52 3.98 427.36 3.98C428.68 7.59 427.69 13.12 427.69 16.98C427.69 26.77 427.69 36.55 427.69 46.33C427.69 79.32 427.69 112.3 427.69 145.29C427.69 154.38 426.85 163.97 429.13 172.84C433.7 190.65 450.17 201.06 467.85 201.48C486.63 201.92 502.53 190.52 507.78 172.53C510.13 164.46 509.07 155.29 509.07 146.97C509.07 114.54 509.07 82.11 509.07 49.69C509.07 39.48 509.07 29.28 509.07 19.08C509.07 14.33 508.21 8.6 509.29 3.98C532.06 3.85 554.82 3.71 577.59 3.58C579.56 7.01 578.17 20.37 578.17 24.95C578.17 43.4 578.17 61.85 578.17 80.3C578.17 100.84 578.17 121.39 578.17 141.93C578.17 156.26 579.69 171.65 576.75 185.75C571.84 209.27 558.79 229.81 538.33 242.93C526.9 250.25 514.21 255.12 501 258.05C496.85 258.97 484.04 259.7 481.43 261.16ZM171 199.26C176.86 200.42 183.75 199.49 189.74 199.49C207.86 199.49 226.52 198.59 240.65 185.92C248.18 179.18 251.97 168.69 254.22 159.19C258.9 139.42 258.96 114.9 252.21 95.64C249.5 87.93 245.47 79.78 238.91 74.53C224.75 63.2 206.37 62.12 188.9 62.12C183.05 62.12 176.79 61.5 171 62.29C171 107.94 171 153.6 171 199.26Z" fill="currentColor" fill-rule="evenodd" stroke="currentColor" stroke-width="0.25" stroke-linejoin="round"/>
					</svg>
				</a>
				<HeaderActions
					accountHref={accountHref}
					size={svgSize}
					searchOpen={searchOpen}
					onSearchToggle={toggleSearch}
					searchAvailable={Boolean(searchElement)}
				/>
				<SearchPopup open={searchOpen} onClose={() => setSearchOpen(false)} searchElement={searchElement}/>
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
						<a href={accountHref} className="header-panel-link" aria-label="Konto">
							<svg width={svgSize} height={svgSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</a>
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
						<a href="/users/sign_out" className="header-panel-link" onClick={() => localStorage.setItem("autoLogin", "no")}>
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
				<label htmlFor="idu-semester-id">Wybierz semestr</label>
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
