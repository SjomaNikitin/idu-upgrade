import { build } from 'esbuild';
import { readFile } from 'node:fs/promises';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const entry = 'src/worker.js';
const outfile = 'dist/worker.js';
const cssPath = 'css/styles.css';

async function main() {
  const css = await readFile(cssPath, 'utf8').catch(() => '');

  await mkdir(dirname(resolve(outfile)), { recursive: true });

  await build({
    entryPoints: [entry],
    outfile,
    bundle: true,
    format: 'esm',
    platform: 'neutral',
    target: ['es2022'],
    sourcemap: false,
    minify: false,
    legalComments: 'none',
    define: {
      CSS_TEXT: JSON.stringify(css),
    },
    banner: {
      js: `/* Built ${new Date().toISOString()} */`,
    },
  });

  console.log(`Built ${outfile}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
