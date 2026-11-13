// Shared motion helpers for the widget grid (drag-and-drop animations).

export const REFLOW_DURATION = 380;
export const REFLOW_EASING = 'cubic-bezier(0.2, 0.8, 0.2, 1)';
export const DROP_DURATION = 420;
// Slight overshoot so the widget "lands" and settles instead of stopping dead.
export const DROP_EASING = 'cubic-bezier(0.2, 0.9, 0.25, 1.12)';

export function prefersReducedMotion() {
	try {
		return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;
	} catch {
		return false;
	}
}

function getTranslate(el) {
	const transform = getComputedStyle(el).transform;
	if (!transform || transform === 'none') return { x: 0, y: 0 };
	try {
		const matrix = new DOMMatrixReadOnly(transform);
		return { x: matrix.m41, y: matrix.m42 };
	} catch {
		return { x: 0, y: 0 };
	}
}

// Viewport rect of `el` where it will sit once every running reflow
// animation (translate on it or its ancestors inside the grid) has finished.
export function getSettledRect(el) {
	const rect = el.getBoundingClientRect();
	let dx = 0;
	let dy = 0;
	let node = el;
	while (node && node !== document.body && !node.classList?.contains('widgets-grid')) {
		const { x, y } = getTranslate(node);
		dx += x;
		dy += y;
		node = node.parentElement;
	}
	return {
		left: rect.left - dx,
		top: rect.top - dy,
		right: rect.right - dx,
		bottom: rect.bottom - dy,
		width: rect.width,
		height: rect.height,
	};
}
