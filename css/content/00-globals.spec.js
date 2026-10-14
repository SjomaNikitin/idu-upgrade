import { describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const globalsScript = readFileSync(new URL("./00-globals.js", import.meta.url), "utf8")
	.split("let themePresets")[0];

describe("visual loader timeout", () => {
	it("removes the loader after one second on every customized page", () => {
		let timeoutHandler;
		const classList = { add: vi.fn(), remove: vi.fn() };
		const loader = { remove: vi.fn() };
		const window = {
			setTimeout: vi.fn((handler, delay) => {
				timeoutHandler = handler;
				return 1;
			}),
		};
		const document = {
			documentElement: { classList, setAttribute: vi.fn(), style: { setProperty: vi.fn() } },
			getElementById: vi.fn(() => loader),
		};

		vm.runInNewContext(globalsScript, {
			document,
			localStorage: { getItem: vi.fn(() => null) },
			performance: { now: vi.fn(() => 10) },
			window,
		});

		expect(window.setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
		timeoutHandler();
		expect(classList.add).toHaveBeenCalledWith("idu-ready");
		expect(classList.remove).toHaveBeenCalledWith("idu-loader-fading");
		expect(loader.remove).toHaveBeenCalledOnce();
	});
});
