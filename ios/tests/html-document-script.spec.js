import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import vm from "node:vm";

// Exercise the actual guard used by every iOS document-start script.
const swift = readFileSync(new URL("../IDU2/IDU2/HTMLDocumentScript.swift", import.meta.url), "utf8");
const template = swift.split('"""')[1];
const wrap = source => template.replace('\\(source)', () => source);

describe("iOS document customization", () => {
	it.each(["application/pdf", "image/png", "image/jpeg", "text/plain", "video/mp4", "application/octet-stream"])(
		"leaves %s previews untouched without accessing storage", contentType => {
			const context = vm.createContext({
				document: { contentType },
				get localStorage() { throw new Error("Preview storage must not be accessed"); },
			});
			expect(() => vm.runInContext(wrap("localStorage.getItem('theme'); throw new Error('UI injected');"), context)).not.toThrow();
		});

	it.each(["text/html", "application/xhtml+xml"])("runs the shared bundle on %s pages", contentType => {
		const context = vm.createContext({ document: { contentType }, window: {} });
		vm.runInContext(wrap(`
			let theme = 'Ocean';
			function readTheme() { return theme; }
			window.loadWebsiteTheme = () => readTheme();
		`), context);
		expect(context.window.loadWebsiteTheme()).toBe("Ocean");
		// Classic-script functions remain available to the website's handlers.
		expect(vm.runInContext("readTheme()", context)).toBe("Ocean");
	});
});
