// Pure grid-layout helpers for the widget dashboard.
//
// The grid (.widgets-grid) has 4 columns and uses the default CSS grid
// auto-placement (`grid-auto-flow: row`): widgets are placed in DOM order,
// each one at the next spot after the previous widget that fits it.
// layoutGrid() reproduces that placement in JS, so a drag can try many
// possible orders and pick the best one before touching the page.

export const GRID_COLUMNS = 4;

/**
 * @param {{id: string, w: number, h: number}[]} items in DOM order
 * @returns {{placements: Map<string, {col: number, row: number, w: number, h: number}>, rows: number, gaps: number}}
 */
export function layoutGrid(items, columns = GRID_COLUMNS) {
	const occupied = [];
	const isFree = (row, col, w, h) => {
		for (let r = row; r < row + h; r++) {
			const line = occupied[r];
			if (!line) continue;
			for (let c = col; c < col + w; c++) {
				if (line[c]) return false;
			}
		}
		return true;
	};
	const fill = (row, col, w, h) => {
		for (let r = row; r < row + h; r++) {
			occupied[r] ||= new Array(columns).fill(false);
			for (let c = col; c < col + w; c++) occupied[r][c] = true;
		}
	};

	const placements = new Map();
	// CSS grid "sparse" auto-placement cursor: it only ever moves forward.
	let row = 0;
	let col = 0;
	for (const item of items) {
		const w = Math.min(Math.max(1, item.w | 0), columns);
		const h = Math.max(1, item.h | 0);
		for (;;) {
			if (col + w > columns) {
				row++;
				col = 0;
				continue;
			}
			if (isFree(row, col, w, h)) break;
			col++;
		}
		fill(row, col, w, h);
		placements.set(item.id, { col, row, w, h });
		col += w;
	}

	return { placements, rows: occupied.length, gaps: countGaps(occupied, columns) };
}

// Empty cells with any widget further down the page, i.e. visible holes.
// Free cells on the very last row are just the end of the grid.
function countGaps(occupied, columns) {
	let gaps = 0;
	for (let r = 0; r < occupied.length - 1; r++) {
		for (let c = 0; c < columns; c++) {
			if (!occupied[r]?.[c]) gaps++;
		}
	}
	return gaps;
}

function moveTo(list, item, index) {
	const rest = list.filter((other) => other !== item);
	rest.splice(index, 0, item);
	return rest;
}

/**
 * Picks the new widget order while one widget is being dragged.
 *
 * Candidates: the dragged widget inserted at every index, and each of those
 * "repaired" by also moving one other widget if that closes a hole (e.g. the
 * small widget that would be left alone in its row follows along). Each is
 * laid out and scored:
 *   - distance from the dragged widget's slot to where it's being held
 *   - + a penalty per empty cell left in the grid
 *   - + a penalty for moving another widget, larger the further it moves
 *   - - a small bonus for the current order, so it doesn't flicker
 * All distances are in grid cells.
 *
 * @param {{id: string, w: number, h: number}[]} items current order
 * @param {string} draggedId
 * @param {{x: number, y: number}} target where the dragged widget's centre is, in grid units
 * @returns {string[] | null} new order of ids, or null to keep the current one
 */
export function pickDropOrder(items, draggedId, target, options = {}) {
	const {
		gapPenalty = 1,
		repairPenalty = 0.35,
		repairDistancePenalty = 0.08,
		stickiness = 0.35,
	} = options;
	const dragged = items.find((item) => item.id === draggedId);
	if (!dragged) return null;

	const currentKey = items.map((item) => item.id).join('|');
	const current = layoutGrid(items).placements;
	let best = null;

	const consider = (order, repaired) => {
		const { placements, gaps } = layoutGrid(order);
		const slot = placements.get(draggedId);
		let score = Math.hypot(slot.col + slot.w / 2 - target.x, slot.row + slot.h / 2 - target.y);
		score += gaps * gapPenalty;
		if (repaired) {
			const before = current.get(repaired.id);
			const after = placements.get(repaired.id);
			score += repairPenalty + repairDistancePenalty * Math.hypot(after.col - before.col, after.row - before.row);
		}
		const key = order.map((item) => item.id).join('|');
		if (key === currentKey) score -= stickiness;
		if (!best || score < best.score - 1e-6) best = { score, key, order, gaps };
		return gaps;
	};

	for (let index = 0; index < items.length; index++) {
		const order = moveTo(items, dragged, index);
		const gaps = consider(order, null);
		if (gaps === 0) continue;
		// Try closing the hole by moving one other widget somewhere else.
		for (const other of order) {
			if (other === dragged) continue;
			for (let j = 0; j < order.length; j++) {
				if (order[j] === other) continue;
				consider(moveTo(order, other, j), other);
			}
		}
	}

	if (!best || best.key === currentKey) return null;
	return best.order.map((item) => item.id);
}

export function getWidgetSpan(el) {
	const w = Number(/(?:^|\s)w(\d+)(?:\s|$)/.exec(el.className)?.[1]) || 2;
	const h = Number(/(?:^|\s)h(\d+)(?:\s|$)/.exec(el.className)?.[1]) || 2;
	return { w, h };
}
