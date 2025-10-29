// In release builds, `CSS_TEXT` is injected by esbuild define.
/* global CSS_TEXT */

const isWorkerRuntime = typeof WebSocketPair !== 'undefined' && typeof caches !== 'undefined';

async function getCssText() {
  if (typeof CSS_TEXT === 'string') return CSS_TEXT;
  if (!isWorkerRuntime) {
    try {
      const fs = await import('node:fs/promises');
      const path = await import('node:path');
      const cssPath = path.resolve(process.cwd(), 'css/styles.css');
      return await fs.readFile(cssPath, 'utf8');
    } catch (e) {
      return '/* failed to read css/styles.css in dev */';
    }
  }
  return '';
}

function htmlPage() {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Hello</title>
    <link rel="stylesheet" href="/css/styles.css" />
  </head>
  <body>
    <main>
      <h1>hello world 3</h1>
      <p>This is served by the same Worker handler in dev and in production.</p>
    </main>
  </body>
</html>`;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/css/styles.css') {
      const css = await getCssText();
      return new Response(css, {
        status: 200,
        headers: {
          'content-type': 'text/css; charset=utf-8',
          'cache-control': 'no-store',
        },
      });
    }

    if (url.pathname === '/' || url.pathname === '') {
      return new Response(htmlPage(), {
        status: 200,
        headers: { 'content-type': 'text/html; charset=utf-8' },
      });
    }

    return new Response('hello world', {
      status: 200,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    });
  },
};
