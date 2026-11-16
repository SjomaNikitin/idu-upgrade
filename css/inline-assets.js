// The stylesheet is injected into idu.edu.pl (and loaded by the iOS/Android
// WebViews), so relative asset URLs would resolve against the school site.
// Every build therefore embeds `url("assets/...")` references from
// css/styles.css as data URIs. `readAsset` receives the path relative to css/
// (e.g. "assets/loader.webp") and returns its bytes.
const mimeTypes = {
	webp: 'image/webp',
	gif: 'image/gif',
	png: 'image/png',
	jpg: 'image/jpeg',
	jpeg: 'image/jpeg',
	svg: 'image/svg+xml',
};

const assetUrlPattern = /url\(\s*(["']?)(assets\/[^"')\s]+)\1\s*\)/g;

export async function inlineCssAssets(css, readAsset) {
	const paths = [...new Set([...css.matchAll(assetUrlPattern)].map((match) => match[2]))];
	const dataUris = new Map();
	await Promise.all(paths.map(async (assetPath) => {
		const extension = assetPath.split('.').pop().toLowerCase();
		const mimeType = mimeTypes[extension];
		if (!mimeType) throw new Error(`Unsupported CSS asset type: ${assetPath}`);
		const bytes = await readAsset(assetPath);
		dataUris.set(assetPath, `data:${mimeType};base64,${Buffer.from(bytes).toString('base64')}`);
	}));
	return css.replace(assetUrlPattern, (_, _quote, assetPath) => `url("${dataUris.get(assetPath)}")`);
}
