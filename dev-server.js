import express from 'express';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { Readable } from 'node:stream';
import worker from './src/worker.js';

const app = express();
const PORT = process.env.PORT || 8787;
const contentAppEntry = 'src/content/app.jsx';
const contentAppOutfile = 'css/content/generated/18-app.js';
const hopByHopHeaders = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
]);

async function buildContentApp() {
  const { build } = await import('esbuild');
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

app.get('/healthz', (_req, res) => {
  res.status(200).type('text').send('ok');
});

function toWebRequest(req) {
  const proto = req.headers['x-forwarded-proto'] || req.protocol || 'http';
  const host = req.headers['x-forwarded-host'] || req.headers.host || `localhost:${PORT}`;
  const url = `${proto}://${host}${req.originalUrl}`;

  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers)) {
    if (typeof v === 'undefined') continue;
    if (hopByHopHeaders.has(k.toLowerCase())) continue;
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
    const omittedResponseHeaders = new Set([
      ...hopByHopHeaders,
      'content-encoding',
      'content-length',
    ]);
    cfResponse.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      if (omittedResponseHeaders.has(lowerKey)) return;
      if (lowerKey === 'set-cookie' && setCookies.length > 0) return;
      res.setHeader(key, value);
    });
    if (setCookies.length > 0) res.setHeader('set-cookie', setCookies);

    if (cfResponse.body) {
      const responseStream = Readable.fromWeb(cfResponse.body);
      responseStream.on('error', (streamError) => {
        console.error(streamError);
        if (res.headersSent) res.destroy(streamError);
        else res.status(500).end();
      });
      responseStream.pipe(res);
    } else {
      res.end();
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

if (process.env.NODE_ENV !== 'production') {
  await buildContentApp();
}

app.listen(PORT, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Built ${contentAppOutfile}`);
  }
  console.log(`Dev server listening on http://localhost:${PORT}`);
});
