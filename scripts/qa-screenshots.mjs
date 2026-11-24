/**
 * QA screenshots at the four widths in the brief, plus the automated checks
 * that a screenshot cannot make for you.
 *
 * The site is `output: 'export'`, so there is no server to boot: this serves
 * ./out as static files on an ephemeral port and drives a real Chromium over
 * it. That is the same bytes a visitor gets, which is the point — a dev-server
 * screenshot would be measuring Next's dev overlay as much as the page.
 *
 * Three things are asserted per width, because all three were in the brief and
 * none of them is visible in a PNG:
 *
 *   overflow   document.scrollWidth vs the viewport. The brief names
 *              scrollWidth explicitly, so it is read rather than eyeballed.
 *   type floor nothing below 14px except the 12px mono eyebrow, which the
 *              brief exempts by specifying it at 12.
 *   overlap    the header is sticky and 72px tall, so the one overlap that
 *              matters is whether anything the reader needs sits under it at
 *              scroll-top. Checked against the hero's first heading.
 *
 * Usage: node scripts/qa-screenshots.mjs [--url http://host] [--page /path]
 */
import { createServer } from 'node:http';
import { gzipSync } from 'node:zlib';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { chromium } from 'playwright';

/* The guideline's four test widths. 1024 was here; 1280 replaced it,
   because that is where the redesign's nav and bento grids change. */
const WIDTHS = [375, 768, 1280, 1440];
const OUT_DIR = 'qa-screenshots';
const ROOT = 'out';

/* Which routes get shot. The homepage is the brief's subject; the four
   relocation targets are included because the brief moved content onto them
   and a page that received content is exactly where a new overflow appears. */
const PAGES = [
  ['home', '/'],
  /* The five relocation targets from the brief: content moved onto these, and
     a page that received content is where a new overflow appears. */
  ['services', '/services/'],
  ['about', '/about/'],
  ['ai', '/ai/'],
  ['expertise', '/expertise/'],
  ['how-we-work', '/how-we-work/'],
  ['faq', '/faq/'],
  /* One instance of each remaining template, so the type floor is checked on
     every layout rather than on the six pages above. */
  ['service-detail', '/services/magento-development/'],
  ['work-index', '/work/'],
  ['case-study', '/work/fashion-d2c/'],
  ['insights-index', '/insights/'],
  ['contact', '/contact/'],
  ['resume', '/resume/'],
  ['pricing', '/pricing/'],
  ['experience', '/experience/'],
];

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
      let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      let file = join(root, normalize(p).replace(/^(\.\.[/\\])+/, ''));
      if (p.endsWith('/')) file = join(file, 'index.html');
      else if (!extname(file) && existsSync(`${file}.html`)) file = `${file}.html`;
      else if (!extname(file) && existsSync(join(file, 'index.html'))) file = join(file, 'index.html');
      let body = await readFile(file);
      const headers = { 'content-type': MIME[extname(file)] ?? 'application/octet-stream' };
      /* Compressed, because the host compresses. See the note in
         scripts/lighthouse.mjs. */
      if (/\.(html|css|js|svg|json|xml|txt)$/.test(file)) {
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

/* Runs in the page. Returns the three findings for this width. */
const AUDIT = () => {
  const vw = window.innerWidth;
  const EXEMPT_PX = 12; /* the mono eyebrow the brief specifies at 12px */

  const overflow = {
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    innerWidth: vw,
  };

  /* Elements wider than the viewport, which is what actually causes the bar. */
  const wide = [];
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none') continue;
    if (r.right > vw + 1 || r.left < -1) {
      /* An element can hang outside the viewport without causing a scrollbar
         if something above it clips. Decorative glows are positioned at
         negative offsets on purpose, so walk the ancestors and only report a
         box that nothing clips: that is the box that actually moves
         document.scrollWidth. */
      let clipped = false;
      for (let a = el.parentElement; a && a !== document.documentElement; a = a.parentElement) {
        const ax = getComputedStyle(a).overflowX;
        if (ax === 'hidden' || ax === 'clip' || ax === 'auto' || ax === 'scroll') { clipped = true; break; }
      }
      if (clipped) continue;
      if (cs.overflowX === 'auto' || cs.overflowX === 'scroll' || cs.overflowX === 'hidden') continue;
      wide.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.className || '').toString().slice(0, 90),
        left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width),
      });
    }
  }

  /* Text below the 14px floor. Only elements with their own text node. */
  const small = [];
  for (const el of document.querySelectorAll('body *')) {
    const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (!own) continue;
    /* `sr-only` text is clipped to a 1px box and never painted; its font-size
       is not something a reader can be asked to read, so the 14px floor does
       not apply to it. */
    if (el.closest('.sr-only')) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none') continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    const px = parseFloat(cs.fontSize);
    if (px < 14 - 0.01 && Math.abs(px - EXEMPT_PX) > 0.01) {
      small.push({
        tag: el.tagName.toLowerCase(), px: +px.toFixed(2),
        cls: (el.className || '').toString().slice(0, 70),
        text: (el.textContent || '').trim().slice(0, 50),
      });
    }
  }

  /* Is anything hidden under the sticky header at scroll-top? */
  const header = document.querySelector('header');
  const hdr = header ? header.getBoundingClientRect() : null;
  let hidden = null;
  if (hdr) {
    const h1 = document.querySelector('h1');
    if (h1) {
      const hr = h1.getBoundingClientRect();
      hidden = { headerHeight: Math.round(hdr.height), h1Top: Math.round(hr.top), clear: hr.top >= hdr.bottom - 1 };
    }
  }

  return { overflow, wide, small, hidden };
};

const server = await serve(ROOT);
const base = `http://127.0.0.1:${server.address().port}`;
await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const findings = [];

for (const [name, route] of PAGES) {
  for (const w of WIDTHS) {
    const ctx = await browser.newContext({
      viewport: { width: w, height: 900 },
      deviceScaleFactor: 2,
      reducedMotion: 'reduce', /* so the scroll-reveals are settled, not mid-fade */
    });
    const page = await ctx.newPage();
    await page.goto(`${base}${route}`, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    /* Reveals are IntersectionObserver-driven; walk the page so they fire,
       then come back to the top for the above-the-fold assertions. */
    await page.evaluate(async () => {
      const step = window.innerHeight;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(250);

    const res = await page.evaluate(AUDIT);
    findings.push({ page: name, route, width: w, ...res });

    await page.screenshot({ path: join(OUT_DIR, `${name}-${w}.png`), fullPage: true });
    await ctx.close();
  }
}

await browser.close();
server.close();

/* ── Report ── */
let fail = 0;
const lines = [];
for (const f of findings) {
  const bar = f.overflow.scrollWidth > f.overflow.clientWidth + 1;
  const tag = `${f.page} @ ${f.width}`;
  if (bar) { fail++; lines.push(`OVERFLOW  ${tag}: scrollWidth ${f.overflow.scrollWidth} > clientWidth ${f.overflow.clientWidth}`); }
  for (const e of f.wide) { fail++; lines.push(`  wide     ${tag}: <${e.tag}> ${e.left}..${e.right} (${e.width}px) ${e.cls}`); }
  for (const s of f.small) { fail++; lines.push(`SMALLTEXT ${tag}: <${s.tag}> ${s.px}px "${s.text}" ${s.cls}`); }
  if (f.hidden && !f.hidden.clear) { fail++; lines.push(`UNDERHDR  ${tag}: h1 top ${f.hidden.h1Top} under ${f.hidden.headerHeight}px header`); }
}

await writeFile(join(OUT_DIR, 'report.json'), JSON.stringify(findings, null, 2));

console.log(`qa-screenshots: ${findings.length} shots in ${OUT_DIR}/ (${PAGES.length} pages x ${WIDTHS.length} widths)`);
for (const f of findings.filter((x) => x.page === 'home')) {
  console.log(`  home @ ${String(f.width).padStart(4)}  scrollWidth ${f.overflow.scrollWidth}  client ${f.overflow.clientWidth}  header ${f.hidden?.headerHeight ?? '?'}px  h1 clear: ${f.hidden?.clear}`);
}
if (lines.length) { console.log('\n' + lines.join('\n')); }
console.log(fail === 0 ? '\nqa-screenshots: no overflow, no overlap, no text below 14px.' : `\nqa-screenshots: ${fail} finding(s).`);
process.exit(fail === 0 ? 0 : 1);
