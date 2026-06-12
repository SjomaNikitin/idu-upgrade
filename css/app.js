import express from "express";
import path from "path";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";

const app = express();
const port = 3002;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contentScripts = [
	"content/00-globals.js",
	"content/10-theme.js",
	"content/15-visualloader.js",
	"content/20-mobile.js",
	"content/25-login.js",
	"content/30-bootstrap.js"
];

// Serve CSS file explicitly
app.get("/styles.css", (req, res) => {
	res.type("text/css");
	res.sendFile(path.join(__dirname, "styles.css"));
});

app.get("/content.js", async (req, res) => {
	res.type("application/javascript");
	const scripts = await Promise.all(
		contentScripts.map((file) => readFile(path.join(__dirname, file), "utf8"))
	);
	res.send(scripts.join(""));
});

app.listen(port, () => {
	console.log(`CSS server running at http://localhost:${port}/styles.css`);
});
