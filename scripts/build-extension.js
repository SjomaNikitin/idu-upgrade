import { build, transform } from 'esbuild';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const outputDirectory = 'extension';
const javascriptOutput = `${outputDirectory}/content.js`;
const cssOutput = `${outputDirectory}/styles.css`;

// These classic scripts share one global scope. Keep this order synchronized
// with the worker and release builds.
const contentScripts = [
	'css/content/00-globals.js',
	'css/content/10-theme.js',
	'css/content/15-visualloader.js',
	'css/content/20-mobile.js',
	'css/content/25-login.js',
	'css/content/28-extracter.js',
	'css/content/29-image-replace.js',
	'css/content/30-bootstrap.js',
];

async function buildJavascript() {
	const preactBuild = await build({
		entryPoints: ['src/content/app.jsx'],
		bundle: true,
		format: 'iife',
		globalName: 'IduPreactApp',
		platform: 'browser',
		target: ['chrome109', 'edge109'],
		write: false,
		sourcemap: 'inline',
		minify: false,
		legalComments: 'none',
		jsxFactory: 'h',
	});

	const classicScripts = await Promise.all(
		contentScripts.map((file) => readFile(file, 'utf8')),
	);
	const source = [
		classicScripts.slice(0, 3).join('\n;\n'),
		preactBuild.outputFiles[0].text,
		classicScripts.slice(3).join('\n;\n'),
	].join('\n;\n');
	const result = await transform(source, {
		loader: 'js',
		target: ['chrome109', 'edge109'],
		minify: false,
		legalComments: 'none',
	});

	await writeFile(javascriptOutput, result.code);
}

async function buildCss() {
	const source = await readFile('css/styles.css', 'utf8');
	const result = await transform(source, {
		loader: 'css',
		target: ['chrome109', 'edge109'],
		minify: false,
		legalComments: 'none',
	});

	await writeFile(cssOutput, result.code);
}

export async function buildExtension() {
	await mkdir(outputDirectory, { recursive: true });
	await Promise.all([buildJavascript(), buildCss()]);

	const [{ size: javascriptBytes }, { size: cssBytes }] = await Promise.all([
		stat(javascriptOutput),
		stat(cssOutput),
	]);
	console.log(`Built ${javascriptOutput} (${javascriptBytes} bytes)`);
	console.log(`Built ${cssOutput} (${cssBytes} bytes)`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
	buildExtension().catch((error) => {
		console.error(error);
		process.exitCode = 1;
	});
}
