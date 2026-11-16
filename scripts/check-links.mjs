/**
 * Internal link check, against the exported site.
 *
 * Every href on every exported page is resolved to a file in `out/`. A link
 * that resolves to nothing is a 404 a visitor will actually hit, and on a
 * static export there is no server-side redirect to catch it.
 *
 * In-page fragments are checked too: `#contact-form` is only useful if an
 * element with that id exists on the page carrying the link, and a dead
 * anchor is invisible in testing because the browser simply does nothing.
 *
 * Images are checked too, `src` and every `srcSet` candidate. A missing image
 * does not throw: the browser falls back or shows nothing, and on a `srcSet`
 * cut it falls back silently to another cut, which is a failure that survives
 * for months. Six case covers ship a 640 and a 960 alongside the full file,
 * and nothing before this verified that a seventh case would.
 *
 * External links, mailto:, tel: and wa.me are listed, never fetched. A build
 * gate that depends on someone else's uptime is a gate that fails for reasons
 * that are not your fault.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const OUT = process.argv[2] ?? 'out';

function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const full = join(dir, e);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (e.endsWith('.html')) out.push(full);
  }
  return out;
}

const pageRoute = (f) => {
  const rel = relative(OUT, f).split(sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`;
  return `/${rel.replace(/\.html$/, '')}/`;
};

/** Does this site-relative path exist as an exported file? */
function resolves(p) {
  const clean = p.split('#')[0].split('?')[0];
  if (clean === '/' || clean === '') return existsSync(join(OUT, 'index.html'));
  const base = join(OUT, clean.replace(/^\//, ''));
  return (
    existsSync(join(base, 'index.html')) ||
    existsSync(base) ||
    existsSync(`${base.replace(/\/$/, '')}.html`)
  );
}

const files = walk(OUT);
const broken = [];
const deadAnchors = [];
const missingImages = [];
const external = new Set();

for (const f of files) {
  const html = readFileSync(f, 'utf8');
  const route = pageRoute(f);
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

  /* Every image source, including each candidate in a srcSet. A srcSet entry
     is "<url> <descriptor>", so the url is the part before the space. */
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    const srcs = [];
    const src = tag.match(/\ssrc="([^"]*)"/);
    if (src) srcs.push(src[1]);
    const set = tag.match(/\ssrcset="([^"]*)"/i);
    if (set) {
      for (const part of set[1].split(',')) {
        const url = part.trim().split(/\s+/)[0];
        if (url) srcs.push(url);
      }
    }
    for (const u of srcs) {
      if (!u || !u.startsWith('/') || u.startsWith('//')) continue;
      if (!existsSync(join(OUT, decodeURIComponent(u).replace(/^\//, '')))) {
        missingImages.push(`${route}  ->  ${u}`);
      }
    }
  }

  for (const m of html.matchAll(/<a[^>]+href="([^"]*)"/g)) {
    const href = m[1];
    if (!href || href === '#') continue;
    if (/^(mailto:|tel:|sms:|data:)/i.test(href)) continue;
    if (/^https?:\/\//i.test(href)) { external.add(href.split('?')[0]); continue; }

    if (href.startsWith('#')) {
      const id = decodeURIComponent(href.slice(1));
      if (!ids.has(id)) deadAnchors.push(`${route}  ->  ${href}`);
      continue;
    }
    if (!href.startsWith('/')) continue; // relative; none authored on this site
    if (!resolves(href)) broken.push(`${route}  ->  ${href}`);
  }
}

const uniq = (a) => [...new Set(a)].sort();

if (broken.length) {
  console.error(`\nFAIL  ${uniq(broken).length} internal link(s) resolve to nothing:`);
  for (const b of uniq(broken)) console.error(`        ${b}`);
}
if (missingImages.length) {
  console.error(`\nFAIL  ${uniq(missingImages).length} image source(s) do not exist in ${OUT}:`);
  for (const i of uniq(missingImages)) console.error(`        ${i}`);
  console.error(`\n      A missing srcSet cut does not error in a browser, it falls back`);
  console.error(`      silently to another cut, so this is the only place it is visible.`);
}
if (deadAnchors.length) {
  console.error(`\nFAIL  ${uniq(deadAnchors).length} in-page anchor(s) point at no element:`);
  for (const d of uniq(deadAnchors)) console.error(`        ${d}`);
}

console.log(`\ncheck-links: ${files.length} pages scanned, links and image sources resolved.`);
console.log(`             ${uniq(external).length} distinct external destinations (not fetched):`);
for (const e of uniq(external)) console.log(`               ${e}`);

process.exit(broken.length || deadAnchors.length || missingImages.length ? 1 : 0);
