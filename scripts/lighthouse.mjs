/**
 * Lighthouse on the exported homepage, against the brief's targets:
 * Performance 90+, Accessibility 95+, SEO 100.
 *
 * Serves ./out statically and audits that, for the same reason
 * scripts/qa-screenshots.mjs does: these are the bytes a visitor gets. A dev
 * server would score its own overlay and unminified bundles.
 *
 * Chrome comes from the Playwright install (PLAYWRIGHT_BROWSERS_PATH), so the
 * run does not depend on which Chrome the machine happens to have.
 *
 * Usage: node scripts/lighthouse.mjs [route ...]      (default: /)
 */
import { createServer } from 'node:http';
import { gzipSync } from 'node:zlib';
import { readFile, mkdir, writeFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { chromium } from 'playwright';

const ROOT = 'out';
const ROUTES = process.argv.slice(2).length ? process.argv.slice(2) : ['/'];
const TARGETS = { performance: 90, accessibility: 95, seo: 100 };

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ico': 'image/x-icon',
  '.xml': 'application/xml', '.txt': 'text/plain', '.avif': 'image/avif',
};

const GZIP_CACHE = new Map();

function serve(root) {
  const server = createServer(async (req, res) => {
    try {
      const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      let file = join(root, normalize(p).replace(/^(\.\.[/\\])+/, ''));
      if (p.endsWith('/')) file = join(file, 'index.html');
      else if (!extname(file) && existsSync(`${file}.html`)) file = `${file}.html`;
      else if (!extname(file) && existsSync(join(file, 'index.html'))) file = join(file, 'index.html');
      let body = await readFile(file);
      const headers = {
        'content-type': MIME[extname(file)] ?? 'application/octet-stream',
        /* The real host sets long cache lifetimes on hashed assets; without
           this Lighthouse reports an uncached-asset diagnostic that is an
           artefact of this harness rather than of the site. */
        'cache-control': /\.(js|css|woff2|png|jpe?g|webp|svg|avif)$/.test(file)
          ? 'public, max-age=31536000, immutable'
          : 'public, max-age=0, must-revalidate',
      };
      /*
       * Compress HTML, CSS, JS and SVG, because Vercel does.
       *
       * This is not a thumb on the scale, it is the removal of one. Lighthouse
       * models LCP and FCP from the transfer size it observes, and an
       * uncompressed harness made it model the homepage as ~800 KB of JS and
       * 70 KB of CSS crossing a 1.6 Mbit link. The same files are 14 KB and
       * ~230 KB gzipped, which is what a visitor actually downloads. Measured
       * without this, Performance read 76 against bytes the site never sends.
       *
       * woff2 and the raster images are already compressed formats and are
       * served as they are, which is also what the host does.
       */
      if (/\.(html|css|js|svg|json|xml|txt)$/.test(file)) {
        /*
         * Memoised. Compressing on every request burns CPU on the same
         * machine the browser is being CPU-throttled on, and Lighthouse
         * attributes the contention to the page: measured, a per-request
         * gzip put Total Blocking Time at 4,280 ms against 71 ms for the
         * identical build. The cache makes the cost a one-off per file.
         */
        let hit = GZIP_CACHE.get(file);
        if (!hit) {
          hit = gzipSync(body);
          GZIP_CACHE.set(file, hit);
        }
        body = hit;
        headers['content-encoding'] = 'gzip';
      }
      headers['content-length'] = body.length;
      res.writeHead(200, headers);
      res.end(body);
    } catch {
      res.writeHead(404, { 'content-type': 'text/plain' });
      res.end('not found');
    }
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
}

const server = await serve(ROOT);
const base = `http://127.0.0.1:${server.address().port}`;
await mkdir('qa-screenshots', { recursive: true });

/*
 * Pre-compress every text asset BEFORE Chrome starts.
 *
 * The cache alone was not enough: the first request for each file is inside
 * the measured load, so compressing ~800 KB of JS landed on the CPU while
 * Lighthouse was throttling the browser on the same cores, and it read the
 * contention as main-thread work. Total Blocking Time went 71 ms (no gzip)
 * -> 4,280 ms (gzip per request) -> 1,370 ms (gzip cached, cold) -> and this
 * is the run where the server is doing no work at all during the trace.
 */
async function prewarm(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await prewarm(full);
    else if (/\.(html|css|js|svg|json|xml|txt)$/.test(full)) {
      GZIP_CACHE.set(full, gzipSync(await readFile(full)));
    }
  }
}
await prewarm(ROOT);
console.log(`lighthouse: ${GZIP_CACHE.size} text assets pre-compressed`);

const chrome = await chromeLauncher.launch({
  chromePath: chromium.executablePath(),
  chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'],
});

let failed = 0;
for (const route of ROUTES) {
  const runnerResult = await lighthouse(
    `${base}${route}`,
    { port: chrome.port, output: ['json', 'html'], logLevel: 'error' },
    /* Mobile emulation and the default throttling: the brief's numbers are
       the ones a phone sees, which is the harder of the two and the one
       Search Console reports against. */
    undefined,
  );

  const cats = runnerResult.lhr.categories;
  const slug = route === '/' ? 'home' : route.replace(/^\/|\/$/g, '').replace(/\//g, '-');
  await writeFile(join('qa-screenshots', `lighthouse-${slug}.html`), runnerResult.report[1]);
  await writeFile(join('qa-screenshots', `lighthouse-${slug}.json`), runnerResult.report[0]);

  console.log(`\n${route}`);
  for (const key of ['performance', 'accessibility', 'best-practices', 'seo']) {
    const c = cats[key];
    if (!c) continue;
    const score = Math.round(c.score * 100);
    const target = TARGETS[key];
    const verdict = target === undefined ? '' : score >= target ? `  >= ${target} PASS` : `  < ${target} FAIL`;
    if (target !== undefined && score < target) failed++;
    console.log(`  ${c.title.padEnd(16)} ${String(score).padStart(3)}${verdict}`);
  }

  /* The audits worth printing when something is short of target. */
  const notable = Object.values(runnerResult.lhr.audits).filter(
    (a) => a.score !== null && a.score < 1 && a.scoreDisplayMode !== 'notApplicable' &&
      ['performance', 'accessibility', 'seo'].some((g) =>
        (cats[g]?.auditRefs ?? []).some((r) => r.id === a.id && r.weight > 0)),
  );
  if (notable.length) {
    console.log('  weighted audits below 1:');
    for (const a of notable) console.log(`    - ${a.id}: ${a.title}${a.displayValue ? ` (${a.displayValue})` : ''}`);
  }
}

await chrome.kill();
server.close();
console.log(failed === 0 ? '\nlighthouse: every target met.' : `\nlighthouse: ${failed} category/categories below target.`);
process.exit(failed === 0 ? 0 : 1);
