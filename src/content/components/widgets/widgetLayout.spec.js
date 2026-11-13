import { describe, expect, it } from 'vitest';
import { layoutGrid, pickDropOrder } from './widgetLayout.js';

const W = (id, w, h) => ({ id, w, h });
const slotOf = (items, order, id) => {
	const byId = new Map(items.map((item) => [item.id, item]));
	return layoutGrid(order.map((x) => byId.get(x))).placements.get(id);
};

describe('layoutGrid (matches CSS grid sparse auto-placement)', () => {
	it('packs widgets row by row', () => {
		const { placements, gaps } = layoutGrid([W('a', 4, 1), W('b', 2, 1), W('c', 2, 1)]);
		expect(placements.get('b')).toMatchObject({ col: 0, row: 1 });
		expect(placements.get('c')).toMatchObject({ col: 2, row: 1 });
		expect(gaps).toBe(0);
	});

	it('leaves a hole when a wide widget follows a lone small one', () => {
		const { placements, gaps } = layoutGrid([W('s', 2, 1), W('wide', 4, 2), W('s2', 2, 1)]);
		expect(placements.get('wide')).toMatchObject({ col: 0, row: 1 });
		// The cursor never goes back, so s2 does not fill the hole at (2,0).
		expect(placements.get('s2')).toMatchObject({ col: 0, row: 3 });
		expect(gaps).toBe(2);
	});

	it('fills the space under a short widget next to a tall one', () => {
		const { placements, gaps } = layoutGrid([W('tall', 2, 2), W('s1', 2, 1), W('s2', 2, 1)]);
		expect(placements.get('s2')).toMatchObject({ col: 2, row: 1 });
		expect(gaps).toBe(0);
	});
});

describe('pickDropOrder', () => {
	const items = [W('a', 4, 1), W('b', 2, 1), W('c', 2, 1), W('d', 4, 2), W('e', 4, 1)];

	it('keeps the order when held over its own slot', () => {
		expect(pickDropOrder(items, 'b', { x: 1, y: 1.5 })).toBeNull();
	});

	it('swaps two small widgets in a row when aimed at the other side', () => {
		const order = pickDropOrder(items, 'b', { x: 3, y: 1.5 });
		expect(slotOf(items, order, 'b')).toMatchObject({ col: 2, row: 1 });
	});

	it('moves a wide widget to the top when held there', () => {
		const order = pickDropOrder(items, 'd', { x: 2, y: 1 });
		expect(order[0]).toBe('d');
	});

	it('brings the partner along instead of leaving a hole', () => {
		// Dragging b to the bottom would leave c alone with a 2x1 hole; c
		// follows so the pair stays together at the bottom.
		const order = pickDropOrder(items, 'b', { x: 1, y: 5.5 });
		expect(slotOf(items, order, 'b').row).toBeGreaterThanOrEqual(4);
		expect(layoutGrid(order.map((id) => items.find((x) => x.id === id))).gaps).toBe(0);
	});

	it('lands a small widget where it is aimed even in a crowded grid', () => {
		const grid = [W('g', 4, 2), W('s', 4, 1), W('p', 2, 1), W('q', 2, 1), W('n', 4, 2), W('t', 4, 1)];
		// Aim q at the top-left corner.
		const order = pickDropOrder(grid, 'q', { x: 1, y: 0.5 });
		expect(slotOf(grid, order, 'q')).toMatchObject({ row: 0 });
		expect(layoutGrid(order.map((id) => grid.find((x) => x.id === id))).gaps).toBe(0);
	});
});
