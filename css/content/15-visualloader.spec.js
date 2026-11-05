import { readFileSync } from "node:fs";
import vm from "node:vm";
import { expect, it, vi } from "vitest";

const script = readFileSync(new URL("./15-visualloader.js", import.meta.url), "utf8");

function openDashboard(storage, reducedMotion = false, platform = "android") {
	const classes = new Set(["idu-loading"]);
	const header = {
		animate: vi.fn(),
		classList: { add: vi.fn(), remove: vi.fn() },
		querySelector: () => null,
	};
	const widgets = Array.from({ length: 3 }, () => ({ animate: vi.fn() }));
	const window = {
		location: { pathname: "/" },
		addEventListener: vi.fn(),
		requestAnimationFrame: vi.fn(),
		__iduLoaderStartedAt: 1,
		__iduVisualLoaderTimeoutId: 1,
		clearTimeout: vi.fn(),
		matchMedia: () => ({ matches: reducedMotion }),
	};
	const document = {
		addEventListener: vi.fn(),
		documentElement: { dataset: { appPlatform: platform }, style: {}, classList: {
			add: name => classes.add(name),
			remove: (...names) => names.forEach(name => classes.delete(name)),
			contains: name => classes.has(name),
		} },
		getElementById: id => id === "idu-header-root" ? header : null,
		querySelectorAll: () => widgets,
	};
	vm.runInNewContext(script, { window, document, performance: { now: () => 2000 },
		localStorage: { getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value) },
	});
	window.hideVisualLoader();
	return { window, document, classes, elements: [header, ...widgets] };
}

it("hands off a slow load to one ordered dashboard entrance", () => {
	const storage = new Map();
	const page = openDashboard(storage);
	expect(page.classes).toEqual(new Set(["idu-ready"]));
	expect(page.window.clearTimeout).toHaveBeenCalledWith(1);
	page.window.hideVisualLoader();
	const delays = page.elements.map(element => {
		expect(element.animate).toHaveBeenCalledOnce();
		return element.animate.mock.calls[0][1].delay;
	});
	expect(delays).toEqual([0, 45, 90, 135]);
	expect(page.elements[0].classList.add).toHaveBeenCalledWith("idu-dashboard-entering");
	expect(page.elements[0].classList.remove).toHaveBeenCalledWith("idu-dashboard-entering");
	expect(openDashboard(storage).elements[0].animate).toHaveBeenCalledOnce();
});

it("reveals the dashboard immediately for reduced motion", () => {
	const page = openDashboard(new Map(), true);
	expect(page.classes.has("idu-ready")).toBe(true);
	for (const element of page.elements) expect(element.animate).not.toHaveBeenCalled();
});

it("holds the iOS loader through load and a visible paint before starting the entrance", () => {
	const { document, window, classes, elements } = openDashboard(new Map(), false, "ios");
	expect(document.documentElement.style.backgroundColor).toContain("--idu-loader-color");
	expect(classes.has("idu-loading")).toBe(true);
	document.hidden = true;
	window.addEventListener.mock.calls[0][1]();
	expect(window.requestAnimationFrame).not.toHaveBeenCalled();
	document.hidden = false;
	document.addEventListener.mock.calls[0][1]();
	window.requestAnimationFrame.mock.calls[0][0]();
	expect(elements[0].animate).not.toHaveBeenCalled();
	window.requestAnimationFrame.mock.calls[1][0]();
	expect(classes.has("idu-ready")).toBe(true);
	expect(elements[0].animate).toHaveBeenCalledOnce();
});
