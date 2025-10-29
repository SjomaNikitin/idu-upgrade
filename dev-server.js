import express from 'express';
import worker from './src/worker.js';

const app = express();
const PORT = process.env.PORT || 8787;

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
  }

  return new Request(url, init);
}

app.use(async (req, res) => {
  try {
    const request = toWebRequest(req);
    const env = { ...process.env };
    const cfResponse = await worker.fetch(request, env, {});

    res.status(cfResponse.status);
    cfResponse.headers.forEach((value, key) => {
      if (key.toLowerCase() === 'content-encoding') return; // avoid restricted headers
      res.setHeader(key, value);
    });

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

app.listen(PORT, () => {
  console.log(`Dev server listening on http://localhost:${PORT}`);
});
