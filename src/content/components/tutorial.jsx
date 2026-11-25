// src/content/components/tutorial.jsx
// First-run guided tour: dims the page, highlights the real Settings button,
// the "edit widgets" button and a widget's drag handle, one line per step.
// Shown once (iduTutorialSeen); "Powtórz samouczek" in Settings replays it.
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

function isDashboard() {
	return Boolean(document.querySelector(".widgets-grid .widget"));
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

// Each step: one line of text, what to highlight, and what to set up first.
const STEPS = [
	{
		id: "settings",
		text: "Tu otworzysz Ustawienia: motyw, rocznik i semestr.",
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
		text: "Złap widżet za uchwyt u góry i przeciągnij go w nowe miejsce.",
		prepare: (session) => {
			setMenuOpen(false);
			if (!window.editMode && typeof window.switchEditMode === "function") {
				window.switchEditMode();
				session.enteredEditMode = true;
			}
			const widget = firstWidget();
			if (widget) {
				const rect = widget.getBoundingClientRect();
				if (rect.top < 80 || rect.bottom > window.innerHeight - 160) {
					widget.scrollIntoView({ block: "center", behavior: "smooth" });
				}
			}
		},
		target: () => firstWidget(),
		handle: () => firstWidget()?.querySelector(".widget-drag-handle"),
	},
	{
		id: "done",
		text: "Gotowe! Samouczek powtórzysz w Ustawieniach.",
		prepare: (session) => {
			setMenuOpen(false);
			if (session.enteredEditMode && window.editMode) window.switchEditMode?.();
			session.enteredEditMode = false;
		},
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

function Tour({ onClose }) {
	const sessionRef = useRef({ enteredEditMode: false });
	const cardRef = useRef(null);
	const [index, setIndex] = useState(0);
	const [spot, setSpot] = useState(null);
	const [handleRect, setHandleRect] = useState(null);
	const [cardPos, setCardPos] = useState(null);

	const step = STEPS[index];
	const isLast = index === STEPS.length - 1;

	function finish() {
		const session = sessionRef.current;
		setMenuOpen(false);
		if (session.enteredEditMode && window.editMode) window.switchEditMode?.();
		session.enteredEditMode = false;
		onClose();
	}

	function next() {
		if (isLast) finish();
		else setIndex((value) => value + 1);
	}

	useEffect(() => {
		step.prepare?.(sessionRef.current);
	}, [index]);

	// Follow the target every frame: menus slide in and widgets may scroll.
	useEffect(() => {
		let frame = 0;
		// undefined (not null) so a step with no target still clears the old spot.
		let lastSpot;
		let lastHandle;
		const tick = () => {
			const target = step.target();
			const nextSpot = readRect(target, step.id === "drag" ? 6 : 4);
			const nextHandle = step.handle ? readRect(step.handle(), 0) : null;
			if (!sameRect(nextSpot, lastSpot)) {
				lastSpot = nextSpot;
				setSpot(nextSpot);
			}
			if (!sameRect(nextHandle, lastHandle)) {
				lastHandle = nextHandle;
				setHandleRect(nextHandle);
			}
			frame = requestAnimationFrame(tick);
		};
		tick();
		return () => cancelAnimationFrame(frame);
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
		const next = { top: Math.round(top), left: Math.round(left) };
		if (!cardPos || cardPos.top !== next.top || cardPos.left !== next.left) setCardPos(next);
	});

	useEffect(() => {
		const onKey = (event) => {
			if (event.key === "Escape") finish();
			else if (event.key === "Enter" || event.key === "ArrowRight") next();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	});

	const spotStyle = spot
		? { top: `${spot.top}px`, left: `${spot.left}px`, width: `${spot.width}px`, height: `${spot.height}px` }
		: { top: "50%", left: "50%", width: "0px", height: "0px" };

	// Drag demo: a finger presses the handle and pulls a ghost of the widget
	// a little way, looping.
	let dragDemo = null;
	if (step.id === "drag" && handleRect && spot) {
		const startX = handleRect.left + handleRect.width / 2;
		const startY = handleRect.top + handleRect.height / 2;
		// Keep the motion short so the ghost stays near the widget and off the card.
		const towardsRight = spot.left + spot.width / 2 < window.innerWidth / 2;
		const isWide = spot.width > window.innerWidth * 0.6;
		const dx = isWide ? 0 : Math.round((towardsRight ? 1 : -1) * Math.min(70, spot.width * 0.18));
		const dy = Math.round(Math.min(48, spot.height * 0.3));
		const ghostWidth = spot.width - 12;
		const ghostHeight = spot.height - 12;
		dragDemo = (
			<div className="idu-tour-drag" style={{ "--idu-tour-dx": `${dx}px`, "--idu-tour-dy": `${dy}px` }}>
				<div
					className="idu-tour-ghost"
					style={{
						top: `${spot.top + 6}px`,
						left: `${spot.left + 6}px`,
						width: `${ghostWidth}px`,
						height: `${ghostHeight}px`,
					}}
				/>
				<div className="idu-tour-handle-glow" style={{ top: `${startY}px`, left: `${startX}px` }}/>
				<div className="idu-tour-finger" style={{ top: `${startY}px`, left: `${startX}px` }}/>
			</div>
		);
	}

	return (
		<div className="idu-tour" role="dialog" aria-modal="true" aria-live="polite">
			<div
				className={`idu-tour-spot ${spot ? "has-target" : ""} ${step.id === "drag" ? "is-widget" : ""}`}
				style={spotStyle}
			/>
			{dragDemo}
			<div
				ref={cardRef}
				className="idu-tour-card"
				style={cardPos ? { top: `${cardPos.top}px`, left: `${cardPos.left}px` } : { visibility: "hidden" }}
			>
				<div className="idu-tour-step">{index + 1} / {STEPS.length}</div>
				<p className="idu-tour-text">{step.text}</p>
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
