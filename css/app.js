import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3002;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve CSS file explicitly
app.get("/styles.css", (req, res) => {
	res.type("text/css");
	res.sendFile(path.join(__dirname, "styles.css"));
});

app.get("/content.js", (req, res) => {
	res.type("application/javascript");
	res.sendFile(path.join(__dirname, "content.js"));
});

app.listen(port, () => {
	console.log(`CSS server running at http://localhost:${port}/styles.css`);
});
