import express from 'express';
import { build } from 'esbuild';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import worker from './src/worker.js';

const app = express();
const PORT = process.env.PORT || 8787;
const contentAppEntry = 'src/content/app.jsx';
const contentAppOutfile = 'css/content/generated/18-app.js';

async function buildContentApp() {
  await mkdir(dirname(resolve(contentAppOutfile)), { recursive: true });

  await build({
    entryPoints: [contentAppEntry],
    outfile: contentAppOutfile,
    bundle: true,
    format: 'iife',
    platform: 'browser',
    target: ['es2022'],
    sourcemap: false,
    minify: false,
    legalComments: 'none',
    jsxFactory: 'h',
  });
}

function toWebRequest(req) {
  const proto = req.headers['x-forwarded-proto'] || req.protocol || 'http';
  const host = req.headers['x-forwarded-host'] || req.headers.host || `localhost:${PORT}`;
  const url = `${proto}://${host}${req.originalUrl}`;

  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers)) {
    if (typeof v === 'undefined') continue;
    if (Array.isArray(v)) {
      for (const vv of v) headers.append(k, vv);
    } else {
      headers.set(k, String(v));
    }
  }

  const init = {
    method: req.method,
    headers,
    redirect: 'follow',
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req; // stream body
    // Node/undici requires duplex: 'half' when a Readable stream body is provided
    init.duplex = 'half';
  }

  return new Request(url, init);
}

app.use(async (req, res) => {
  try {
    const request = toWebRequest(req);
    const env = { ...process.env };
    const cfResponse = await worker.fetch(request, env, {});

    res.status(cfResponse.status);
    const setCookies = typeof cfResponse.headers.getSetCookie === 'function'
      ? cfResponse.headers.getSetCookie()
      : [];
    cfResponse.headers.forEach((value, key) => {
      if (key.toLowerCase() === 'content-encoding') return; // avoid restricted headers
      if (key.toLowerCase() === 'set-cookie' && setCookies.length > 0) return;
      res.setHeader(key, value);
    });
    if (setCookies.length > 0) res.setHeader('set-cookie', setCookies);

    if (cfResponse.body) {
      const ab = await cfResponse.arrayBuffer();
      res.send(Buffer.from(ab));
    } else {
      res.end();
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

await buildContentApp();

app.listen(PORT, () => {
  console.log(`Built ${contentAppOutfile}`);
  console.log(`Dev server listening on http://localhost:${PORT}`);
});
