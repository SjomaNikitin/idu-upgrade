import { expect, it } from "vitest";
import { readFileSync } from "node:fs";

it("uses the custom settings panel's exact close SVG path", () => {
    const header = readFileSync(new URL("../../src/content/components/header.jsx", import.meta.url), "utf8");
    const svg = readFileSync(new URL("../IDU2/IDU2/Assets.xcassets/PreviewClose.imageset/preview-close.svg", import.meta.url), "utf8");
    const path = svg.match(/\bd="([^"]+)"/)[1];
    expect(header.split("export function Settings (")[1]).toContain(`d="${path}"`);
    expect(svg).toContain('viewBox="0 0 1024 1024"');
});
