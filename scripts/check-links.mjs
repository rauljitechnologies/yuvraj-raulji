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
const external = new Set();

for (const f of files) {
  const html = readFileSync(f, 'utf8');
  const route = pageRoute(f);
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

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
if (deadAnchors.length) {
  console.error(`\nFAIL  ${uniq(deadAnchors).length} in-page anchor(s) point at no element:`);
  for (const d of uniq(deadAnchors)) console.error(`        ${d}`);
}

console.log(`\ncheck-links: ${files.length} pages scanned.`);
console.log(`             ${uniq(external).length} distinct external destinations (not fetched):`);
for (const e of uniq(external)) console.log(`               ${e}`);

process.exit(broken.length || deadAnchors.length ? 1 : 0);
