# IDU Upgrade development extension

Run `npm run dev`, then load this directory as an unpacked extension:

1. Open `chrome://extensions` or `edge://extensions`.
2. Enable **Developer mode**.
3. Select **Load unpacked** and choose this `extension` directory.
4. Open the real IDU website and complete any Cloudflare challenge normally.

After changing files under `src/` or `css/`, restart `npm run dev` (or use
`npm run dev:watch`) and click **Reload** for this extension on the extensions
page. The generated `content.js` and `styles.css` files are intentionally not
committed.

The extension does not proxy authentication or modify the Cloudflare challenge.
It only injects this project's UI changes into the original IDU page.

When **Original IDU view** is enabled, the extension skips CSS injection during
the next page load. This prevents the custom mobile styles from flashing before
the original site styles appear.
