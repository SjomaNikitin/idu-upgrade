import { build, transform } from 'esbuild';
import { mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';

const outputDirectory = 'dist';
const javascriptOutput = `${outputDirectory}/content.js`;
const cssOutput = `${outputDirectory}/styles.css`;

// These are classic browser scripts and intentionally share one global scope.
// Keep their order in sync with the order used by the development server.
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
  // Bundle Preact and all JSX imports without creating an intermediate file.
  const preactBuild = await build({
    entryPoints: ['src/content/app.jsx'],
    bundle: true,
    format: 'iife',
    globalName: 'IduPreactApp',
    platform: 'browser',
    target: ['safari15'],
    write: false,
    sourcemap: false,
    minify: true,
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
    target: ['safari15'],
    minify: true,
    legalComments: 'none',
  });

  await writeFile(javascriptOutput, result.code);
}

async function buildCss() {
  const source = await readFile('css/styles.css', 'utf8');
  const result = await transform(source, {
    loader: 'css',
    target: ['safari15'],
    minify: true,
    legalComments: 'none',
  });

  await writeFile(cssOutput, result.code);
}

async function main() {
  // A release directory is self-contained and always has exactly two assets.
  await rm(outputDirectory, { recursive: true, force: true });
  await mkdir(outputDirectory, { recursive: true });

  await Promise.all([buildJavascript(), buildCss()]);

  const [{ size: javascriptBytes }, { size: cssBytes }] = await Promise.all([
    stat(javascriptOutput),
    stat(cssOutput),
  ]);

  console.log(`Built ${javascriptOutput} (${javascriptBytes} bytes)`);
  console.log(`Built ${cssOutput} (${cssBytes} bytes)`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
