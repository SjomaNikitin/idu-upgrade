// src/content/components/tutorial.jsx
// First-run guided tour: dims the page, highlights the real Settings button,
// the "edit widgets" button, then lets the user try dragging and resizing a
// widget for real. One line per step. Shown once (iduTutorialSeen);
// "Powtórz samouczek" in Settings replays it.
import { h, render } from "preact";
import { useEffect, useLayoutEffect, useRef, useState } from "preact/hooks";

const SEEN_KEY = "iduTutorialSeen";
const REPLAY_KEY = "iduTutorialReplay";
const ROOT_ID = "idu-tour-root";
const EDGE = 16;
const GAP = 14;

function storageGet(key) {
	try { return localStorage.getItem(key); } catch { return null; }
}
function storageSet(key, value) {
	try { localStorage.setItem(key, value); } catch {}
}
function storageRemove(key) {
	try { localStorage.removeItem(key); } catch {}
}

// Parents get a different IDU home page, so the tour doesn't fit there.
// IDU writes idu.current_user = {"roles":["parent"]} into an inline script in
// <head>; the account link (/parents/<id>) is a second signal.
export function isParentAccount() {
	if (document.documentElement.dataset.iduRole === "parent") return true;
	if (document.querySelector('#account a[href^="/parents/"]')) return true;
	for (const script of document.querySelectorAll("script:not([src])")) {
		const match = script.textContent.match(/current_user\s*=\s*\{[^}]*"roles"\s*:\s*\[([^\]]*)\]/);
		if (match) return /"parent"/.test(match[1]) && !/"student"/.test(match[1]);
	}
	return false;
}

function isDashboard() {
	return Boolean(document.querySelector(".widgets-grid .widget")) && !isParentAccount();
}

function menuPanel() {
	return document.querySelector("#idu-header-root .header-menu-panel");
}

function setMenuOpen(open) {
	const panel = menuPanel();
	if (!panel || panel.classList.contains("open") === open) return;
	document.querySelector("#idu-header-root .header-menu-button")?.click();
}

function isVisible(element) {
	if (!element) return false;
	const rect = element.getBoundingClientRect();
	return rect.width > 0 && rect.height > 0;
}

function firstWidget() {
	const widgets = [...document.querySelectorAll(".widgets-grid .widget")];
	return widgets.find((widget) => isVisible(widget)) || null;
}

// The drag and resize steps stay on the same widget, even after it moves.
function tourWidget(session) {
	if (session.widgetId) {
		const widget = document.querySelector(`.widgets-grid .widget[data-widget-id="${session.widgetId}"]`);
		if (isVisible(widget)) return widget;
	}
	return firstWidget();
}

function enterEditMode(session) {
	setMenuOpen(false);
	if (!window.editMode && typeof window.switchEditMode === "function") {
		window.switchEditMode();
		session.enteredEditMode = true;
	}
	if (!session.widgetId) {
		session.widgetId = firstWidget()?.getAttribute("data-widget-id") || null;
	}
	const widget = tourWidget(session);
	if (widget) {
		const rect = widget.getBoundingClientRect();
		if (rect.top < 80 || rect.bottom > window.innerHeight - 200) {
			widget.scrollIntoView({ block: "center", behavior: "smooth" });
		}
	}
}

function leaveEditMode(session) {
	setMenuOpen(false);
	if (session.enteredEditMode && window.editMode) window.switchEditMode?.();
	session.enteredEditMode = false;
}

// Each step: one line of text, what to highlight, and what to set up first.
// "interactive" steps leave a hole in the overlay so the widget really works.
const STEPS = [
	{
		id: "settings",
		text: "Tu otworzysz Ustawienia, gdzie zmienisz rzeczy takie jak motyw, rocznik czy semestr.",
		prepare: () => setMenuOpen(true),
		target: () => document.querySelector("#idu-header-root .header-panel-settings"),
	},
	{
		id: "edit",
		text: "Tu włączysz edycję widżetów, żeby zmienić ich układ.",
		prepare: () => setMenuOpen(true),
		target: () => document.querySelector("#idu-header-root .header-panel-edit"),
	},
	{
		id: "drag",
		interactive: true,
		text: "Spróbuj złapać widżet za uchwyt u góry i przeciągnąć go.",
		doneText: "Świetnie! Tak zmieniasz kolejność widżetów.",
		prepare: enterEditMode,
		target: (session) => tourWidget(session),
		hint: (session) => tourWidget(session)?.querySelector(".widget-drag-handle"),
	},
	{
		id: "resize",
		interactive: true,
		text: "Spróbuj złapać róg widżetu i przeciągnąć go, żeby zmienić rozmiar.",
		doneText: "Super! Tak zmieniasz rozmiar widżetu.",
		prepare: enterEditMode,
		target: (session) => tourWidget(session),
		hint: (session) => tourWidget(session)?.querySelector(".resize-zone"),
	},
	{
		id: "done",
		text: "Gotowe! Samouczek powtórzysz w Ustawieniach.",
		prepare: leaveEditMode,
		target: () => null,
	},
];

function readRect(element, padding) {
	if (!isVisible(element)) return null;
	const rect = element.getBoundingClientRect();
	return {
		top: Math.round(rect.top - padding),
		left: Math.round(rect.left - padding),
		width: Math.round(rect.width + padding * 2),
		height: Math.round(rect.height + padding * 2),
	};
}

function sameRect(a, b) {
	if (!a || !b) return a === b;
	return a.top === b.top && a.left === b.left && a.width === b.width && a.height === b.height;
}

function px(rect) {
	return {
		top: `${rect.top}px`,
		left: `${rect.left}px`,
		width: `${Math.max(0, rect.width)}px`,
		height: `${Math.max(0, rect.height)}px`,
	};
}

// Four panels around the highlight: they swallow taps on the dimmed page but
// leave the highlighted widget usable.
function Blockers({ spot }) {
	if (!spot) return <div className="idu-tour-blocker" style={{ inset: 0 }}/>;
	const vw = window.innerWidth;
	const vh = window.innerHeight;
	const top = Math.max(0, spot.top);
	const bottom = Math.min(vh, spot.top + spot.height);
	const left = Math.max(0, spot.left);
	const right = Math.min(vw, spot.left + spot.width);
	return (
		<div className="idu-tour-blockers">
			<div className="idu-tour-blocker" style={px({ top: 0, left: 0, width: vw, height: top })}/>
			<div className="idu-tour-blocker" style={px({ top: bottom, left: 0, width: vw, height: vh - bottom })}/>
			<div className="idu-tour-blocker" style={px({ top, left: 0, width: left, height: bottom - top })}/>
			<div className="idu-tour-blocker" style={px({ top, left: right, width: vw - right, height: bottom - top })}/>
		</div>
	);
}

// Looping finger showing what to do: pull the widget by its handle, or pull
// its corner to resize it.
function Demo({ step, spot, hint }) {
	if (!spot || !hint) return null;
	const startX = hint.left + hint.width / 2;
	const startY = hint.top + hint.height / 2;
	const vw = window.innerWidth;
	const isWide = spot.width > vw * 0.6;

	if (step.id === "drag") {
		const towardsRight = spot.left + spot.width / 2 < vw / 2;
		const dx = isWide ? 0 : Math.round((towardsRight ? 1 : -1) * Math.min(70, spot.width * 0.18));
		const dy = Math.round(Math.min(48, spot.height * 0.3));
		return (
			<div className="idu-tour-demo" style={{ "--idu-tour-dx": `${dx}px`, "--idu-tour-dy": `${dy}px` }}>
				<div className="idu-tour-ghost" style={px({ top: spot.top + 6, left: spot.left + 6, width: spot.width - 12, height: spot.height - 12 })}/>
				<div className="idu-tour-handle-glow" style={{ top: `${startY}px`, left: `${startX}px` }}/>
				<div className="idu-tour-finger" style={{ top: `${startY}px`, left: `${startX}px` }}/>
			</div>
		);
	}

	// Resize: the corner sits bottom-right, or bottom-left when the widget
	// grows towards the left. Full-width widgets can only shrink.
	const cornerOnRight = startX > spot.left + spot.width / 2;
	// The grab area is bigger than the drawn corner; point at the corner itself.
	const cornerX = cornerOnRight ? hint.left + hint.width - 20 : hint.left + 20;
	const cornerY = hint.top + hint.height - 20;
	const grow = isWide ? -1 : 1;
	const amountX = Math.round(Math.min(80, spot.width * 0.3));
	const amountY = isWide ? 0 : Math.round(Math.min(60, spot.height * 0.4));
	const dx = (cornerOnRight ? 1 : -1) * grow * amountX;
	const dy = grow * amountY;
	const ghostStyle = {
		top: `${spot.top + 6}px`,
		"--idu-tour-w": `${spot.width - 12}px`,
		"--idu-tour-h": `${spot.height - 12}px`,
		"--idu-tour-gw": `${grow * amountX}px`,
		"--idu-tour-gh": `${dy}px`,
	};
	if (cornerOnRight) ghostStyle.left = `${spot.left + 6}px`;
	else ghostStyle.right = `${vw - (spot.left + spot.width - 6)}px`;
	return (
		<div className="idu-tour-demo" style={{ "--idu-tour-dx": `${dx}px`, "--idu-tour-dy": `${dy}px` }}>
			<div className="idu-tour-ghost idu-tour-ghost-resize" style={ghostStyle}/>
			<div className="idu-tour-corner-glow" style={{ top: `${cornerY}px`, left: `${cornerX}px` }}/>
			<div className="idu-tour-finger" style={{ top: `${cornerY}px`, left: `${cornerX}px` }}/>
		</div>
	);
}

function Tour({ onClose }) {
	const sessionRef = useRef({ enteredEditMode: false, widgetId: null });
	const cardRef = useRef(null);
	const spotRef = useRef(null);
	const [index, setIndex] = useState(0);
	const [spot, setSpot] = useState(null);
	const [hintRect, setHintRect] = useState(null);
	const [cardPos, setCardPos] = useState(null);
	const [interacting, setInteracting] = useState(false);
	const [tried, setTried] = useState(false);

	const step = STEPS[index];
	const isLast = index === STEPS.length - 1;
	spotRef.current = spot;

	function finish() {
		leaveEditMode(sessionRef.current);
		onClose();
	}

	function next() {
		if (isLast) finish();
		else setIndex((value) => value + 1);
	}

	useEffect(() => {
		setTried(false);
		setInteracting(false);
		step.prepare?.(sessionRef.current);
	}, [index]);

	// Follow the target every frame: menus slide in, widgets move and resize.
	useEffect(() => {
		let frame = 0;
		let lastSpot;
		let lastHint;
		const tick = () => {
			const session = sessionRef.current;
			const nextSpot = readRect(step.target(session), step.interactive ? 6 : 4);
			const nextHint = step.hint ? readRect(step.hint(session), 0) : null;
			if (!sameRect(nextSpot, lastSpot)) {
				lastSpot = nextSpot;
				setSpot(nextSpot);
			}
			if (!sameRect(nextHint, lastHint)) {
				lastHint = nextHint;
				setHintRect(nextHint);
			}
			frame = requestAnimationFrame(tick);
		};
		tick();
		return () => cancelAnimationFrame(frame);
	}, [index]);

	// While the user drags or resizes inside the highlight, fade the tour out
	// so they can see where the widget goes.
	useEffect(() => {
		if (!step.interactive) return undefined;
		let releaseTimer = null;
		let active = false;
		const inSpot = (event) => {
			const rect = spotRef.current;
			return rect &&
				event.clientX >= rect.left && event.clientX <= rect.left + rect.width &&
				event.clientY >= rect.top && event.clientY <= rect.top + rect.height;
		};
		const onDown = (event) => {
			if (!inSpot(event)) return;
			clearTimeout(releaseTimer);
			active = true;
			setInteracting(true);
		};
		const onUp = () => {
			if (!active) return;
			clearTimeout(releaseTimer);
			releaseTimer = setTimeout(() => {
				active = false;
				setInteracting(false);
				setTried(true);
			}, 350);
		};
		document.addEventListener("pointerdown", onDown, true);
		document.addEventListener("pointerup", onUp, true);
		document.addEventListener("pointercancel", onUp, true);
		return () => {
			clearTimeout(releaseTimer);
			document.removeEventListener("pointerdown", onDown, true);
			document.removeEventListener("pointerup", onUp, true);
			document.removeEventListener("pointercancel", onUp, true);
		};
	}, [index]);

	// Place the text card under the highlight, or above it when there is no room.
	useLayoutEffect(() => {
		const card = cardRef.current;
		if (!card) return;
		const vw = window.innerWidth;
		const vh = window.innerHeight;
		const cw = card.offsetWidth;
		const ch = card.offsetHeight;
		let top;
		let left;
		if (!spot) {
			top = (vh - ch) / 2;
			left = (vw - cw) / 2;
		} else {
			const below = spot.top + spot.height + GAP;
			const above = spot.top - GAP - ch;
			if (below + ch <= vh - EDGE) top = below;
			else if (above >= EDGE) top = above;
			else top = vh - ch - EDGE;
			left = spot.left + spot.width / 2 - cw / 2;
		}
		left = Math.min(Math.max(left, EDGE), vw - cw - EDGE);
		top = Math.min(Math.max(top, EDGE), vh - ch - EDGE);
		const nextPos = { top: Math.round(top), left: Math.round(left) };
		if (!cardPos || cardPos.top !== nextPos.top || cardPos.left !== nextPos.left) setCardPos(nextPos);
	});

	useEffect(() => {
		const onKey = (event) => {
			if (event.key === "Escape") finish();
			else if (event.key === "Enter" || event.key === "ArrowRight") next();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	});

	const spotStyle = spot ? px(spot) : { top: "50%", left: "50%", width: "0px", height: "0px" };
	const text = tried && step.doneText ? step.doneText : step.text;
	const classes = [
		"idu-tour",
		step.interactive ? "is-interactive" : "",
		interacting ? "is-interacting" : "",
	].join(" ");

	return (
		<div className={classes} role="dialog" aria-modal="true" aria-live="polite">
			<Blockers spot={step.interactive ? spot : null}/>
			<div
				className={`idu-tour-spot ${spot ? "has-target" : ""} ${step.interactive ? "is-widget" : ""}`}
				style={spotStyle}
			/>
			{step.interactive && !tried && !interacting && <Demo step={step} spot={spot} hint={hintRect}/>}
			<div
				ref={cardRef}
				className="idu-tour-card"
				style={cardPos ? { top: `${cardPos.top}px`, left: `${cardPos.left}px` } : { visibility: "hidden" }}
			>
				<div className="idu-tour-step">{index + 1} / {STEPS.length}</div>
				<p className="idu-tour-text">{text}</p>
				<div className="idu-tour-actions">
					{!isLast && (
						<button type="button" className="idu-tour-skip" onClick={finish}>Pomiń</button>
					)}
					<button type="button" className="idu-tour-next" onClick={next}>
						{isLast ? "Zaczynamy" : "Dalej"}
					</button>
				</div>
			</div>
		</div>
	);
}

function closeTutorial() {
	const root = document.getElementById(ROOT_ID);
	if (!root) return;
	render(null, root);
	root.remove();
	document.documentElement.classList.remove("idu-tour-open");
	window.dispatchEvent(new Event("idu-tutorial-closed"));
}

export function startTutorial() {
	if (document.getElementById(ROOT_ID) || !isDashboard()) return false;
	storageSet(SEEN_KEY, "1");
	storageRemove(REPLAY_KEY);
	window.scrollTo(0, 0);
	const root = document.createElement("div");
	root.id = ROOT_ID;
	document.body.appendChild(root);
	document.documentElement.classList.add("idu-tour-open");
	render(<Tour onClose={closeTutorial}/>, root);
	return true;
}

// "Powtórz samouczek": run it here on the dashboard, or go home and run it there.
export function replayTutorial() {
	if (isDashboard()) {
		setTimeout(startTutorial, 350);
		return;
	}
	storageSet(REPLAY_KEY, "1");
	window.location.href = "/";
}

// Called when the dashboard mounts. Waits for the loading screen to finish.
export function maybeStartTutorial() {
	if (storageGet(SEEN_KEY) && !storageGet(REPLAY_KEY)) return;
	const startedAt = Date.now();
	const tryStart = () => {
		const html = document.documentElement;
		const loading = html.classList.contains("idu-loading") || html.classList.contains("idu-loader-fading");
		if (loading && Date.now() - startedAt < 15000) {
			setTimeout(tryStart, 250);
			return;
		}
		setTimeout(startTutorial, 600);
	};
	tryStart();
}

window.startIduTutorial = startTutorial;
window.isIduParentAccount = isParentAccount;
