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
					<svg className="header-logo" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 75" width="100" height="32">
						<path d="M0 0 C27.11111111 0 27.11111111 0 36.3125 6.25 C43.01477426 13.10814111 44.28837728 20.68188086 44.3190918 29.99975586 C44.17553983 37.69136285 42.38122426 45.26760454 37.6875 51.5 C26.47705734 61.92831875 16.25130168 59 0 59 C0 39.53 0 20.06 0 0 Z M12 9 C12 22.86 12 36.72 12 51 C20.70565579 50.36888152 20.70565579 50.36888152 27 46 C32.46135334 38.47313482 32.59520724 31.02730988 32 22 C30.82103747 16.29502031 27.59613457 13.25559532 23 10 C19.26213521 8.57836298 19.26213521 8.57836298 12 9 Z " fill={color} transform="translate(43,7)"/>
						<path d="M0 0 C3.96 0 7.92 0 12 0 C12.00410889 1.33699951 12.00821777 2.67399902 12.01245117 4.05151367 C12.03424542 9.01853836 12.08853883 13.98477123 12.15258789 18.95141602 C12.17576522 21.09977624 12.19016297 23.24825004 12.19555664 25.39672852 C12.20484791 28.48786173 12.24584351 31.57720912 12.29296875 34.66796875 C12.2890361 35.62648239 12.28510345 36.58499603 12.28105164 37.57255554 C12.38213016 42.20659503 12.47613492 44.32470224 15.3918457 48.08325195 C18.18217732 50.13388319 19.5444055 51 23 51 C27.04234961 49.70644812 28.60049458 48.73265351 30.64770508 44.97827148 C32.43217602 40.48664698 32.47620984 36.13055762 32.51171875 31.34765625 C32.52966995 30.44752304 32.54762115 29.54738983 32.56611633 28.61997986 C32.61995245 25.76753309 32.65402888 22.91525107 32.6875 20.0625 C32.72069668 18.11911783 32.7551885 16.17575733 32.79101562 14.23242188 C32.87566341 9.48840064 32.94260136 4.744426 33 0 C36.63 0 40.26 0 44 0 C44.09924314 6.54699332 44.17164631 13.09354394 44.21972656 19.64111328 C44.23978046 21.86612582 44.26703065 24.09108607 44.30175781 26.31591797 C44.35054934 29.52324365 44.37303162 32.72986951 44.390625 35.9375 C44.41127014 36.92427734 44.43191528 37.91105469 44.45318604 38.92773438 C44.45516041 45.07304735 43.6745456 49.93592685 40 55 C34.22596433 59.59566104 29.49629138 60.22538854 22.3125 60.3125 C21.53455078 60.34150391 20.75660156 60.37050781 19.95507812 60.40039062 C14.20196873 60.46276796 9.76372678 59.31892109 5 56 C1.09633418 51.19548822 -0.130206 47.39498358 -0.11352539 41.32324219 C-0.11341209 39.94226349 -0.11341209 39.94226349 -0.11329651 38.53338623 C-0.10813522 37.54783752 -0.10297394 36.56228882 -0.09765625 35.546875 C-0.0962413 34.53151672 -0.09482635 33.51615845 -0.09336853 32.47003174 C-0.08777516 29.22999108 -0.07522385 25.99001975 -0.0625 22.75 C-0.05748414 20.55208433 -0.05292139 18.35416758 -0.04882812 16.15625 C-0.0378079 10.77080666 -0.02054778 5.38541508 0 0 Z " fill={color} transform="translate(94,7)"/>
						<path d="M0 0 C3.94211019 3.10336334 5.31134915 5.48402546 6.390625 10.359375 C7.72546791 23.61881461 -4.0914371 37.85590565 -11.0625 48.3125 C-4.1325 48.6425 2.7975 48.9725 9.9375 49.3125 C9.9375 51.9525 9.9375 54.5925 9.9375 57.3125 C-2.9325 57.3125 -15.8025 57.3125 -29.0625 57.3125 C-27.93749179 51.68745897 -27.93749179 51.68745897 -26.09375 48.81640625 C-25.6915625 48.1819458 -25.289375 47.54748535 -24.875 46.89379883 C-24.441875 46.22759521 -24.00875 45.5613916 -23.5625 44.875 C-23.1190625 44.17850342 -22.675625 43.48200684 -22.21875 42.7644043 C-19.99023635 39.27166814 -17.72997867 35.79973527 -15.46875 32.328125 C-15.06333984 31.70349365 -14.65792969 31.0788623 -14.24023438 30.43530273 C-13.12430377 28.71999896 -11.99989485 27.01021967 -10.875 25.30078125 C-7.7622039 20.16869286 -6.50105204 16.37613795 -7.0625 10.3125 C-7.96007556 8.16469923 -7.96007556 8.16469923 -10.0625 7.3125 C-14.11169215 7.38612168 -16.2751588 7.5251588 -19.1875 10.4375 C-19.80625 11.05625 -20.425 11.675 -21.0625 12.3125 C-24.52836985 12.3125 -25.78433395 11.56059405 -28.375 9.25 C-28.931875 8.610625 -29.48875 7.97125 -30.0625 7.3125 C-29.40334272 4.67587087 -28.72418551 2.83093401 -26.546875 1.125 C-18.63632381 -3.55254331 -8.3515074 -4.27369248 0 0 Z " fill={color} transform="translate(174.0625,8.6875)"/>
						<path d="M0 0 C3.63 0 7.26 0 11 0 C11 19.47 11 38.94 11 59 C7.04 59 3.08 59 -1 59 C-1.02255549 51.45501411 -1.04091769 43.91004069 -1.05181217 36.36502934 C-1.05703989 32.86191115 -1.0641355 29.35881715 -1.07543945 25.85571289 C-1.08834206 21.83219159 -1.09322912 17.80869586 -1.09765625 13.78515625 C-1.10539818 11.88987938 -1.10539818 11.88987938 -1.11329651 9.95631409 C-1.11337204 8.795186 -1.11344757 7.63405792 -1.11352539 6.43774414 C-1.11685631 4.8955294 -1.11685631 4.8955294 -1.12025452 3.32215881 C-1 1 -1 1 0 0 Z " fill={color} transform="translate(21,7)"/>
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
