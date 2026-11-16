/**
 * Route coverage, as a build gate.
 *
 * ── The hole this closes ───────────────────────────────────────────────────
 *
 * lib/content-map.ts already enforces three rules: one primary keyword per
 * page, every row points at a real route, and every route has a row. The third
 * is the one that matters, and it was weaker than it looked, because it checks
 * against `INDEXABLE_ROUTES`, which is a hand-maintained list in that same
 * file. A new page under app/ is therefore invisible to it: the route exists,
 * renders and deploys, and the gate never knows it was supposed to have a row.
 *
 * That was not theoretical. /remote-work/ and /resume/ were both built,
 * exported and served before either was added to the list, and every check in
 * the repo passed.
 *
 * This compares the pages that were actually EXPORTED against the pages the
 * sitemap claims. Both are build artifacts, so neither can be forgotten:
 *
 *   exported but not in the sitemap   a page no crawler will be told about
 *   in the sitemap but not exported   a sitemap entry that 404s
 *
 * Run after `next build`, against `out/`.
 *
 * ── Deliberate exclusions ──────────────────────────────────────────────────
 *
 * `404.html` is Next's error page and is not a route. Nothing else is
 * excluded: if a page should not be in the sitemap it should not be exported,
 * and if it must be both then it belongs in the ignore list below with a
 * reason next to it.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const OUT = process.argv[2] ?? 'out';

/** Pages that are exported on purpose and are not sitemap routes. */
const NOT_ROUTES = new Set([
  '/404/', // Next's error page.
  '/_not-found/', // The App Router's not-found boundary, from app/not-found.tsx.
]);

function htmlFiles(dir) {
  const found = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      found.push(...htmlFiles(full));
    } else if (entry.endsWith('.html')) {
      found.push(full);
    }
  }
  return found;
}

/** `out/about/index.html` becomes `/about/`; `out/404.html` becomes `/404/`. */
function toRoute(file) {
  const rel = relative(OUT, file).split(sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`;
  return `/${rel.replace(/\.html$/, '')}/`;
}

let sitemap;
try {
  sitemap = readFileSync(join(OUT, 'sitemap.xml'), 'utf8');
} catch {
  console.error(`check-routes: no ${OUT}/sitemap.xml. Run 'npx next build' first.`);
  process.exit(2);
}

const origin = (sitemap.match(/<loc>(https?:\/\/[^/]+)/) ?? [])[1] ?? '';
const listed = new Set(
  [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(origin, '') || '/'),
);

const exported = new Set(htmlFiles(OUT).map(toRoute).filter((r) => !NOT_ROUTES.has(r)));

const unmapped = [...exported].filter((r) => !listed.has(r)).sort();
const missing = [...listed].filter((r) => !exported.has(r)).sort();

if (unmapped.length) {
  console.error(`\nFAIL  ${unmapped.length} exported page(s) are not in the sitemap:`);
  for (const r of unmapped) console.error(`        ${r}`);
  console.error(`\n      Add each to INDEXABLE_ROUTES and give it a row in lib/content-map.ts,`);
  console.error(`      and add it to app/sitemap.ts. If it should not be indexed, it should`);
  console.error(`      not be exported either.`);
}

if (missing.length) {
  console.error(`\nFAIL  ${missing.length} sitemap entr(ies) were not exported and will 404:`);
  for (const r of missing) console.error(`        ${r}`);
}

if (unmapped.length || missing.length) process.exit(1);

console.log(`check-routes: ${exported.size} exported pages, all present in the sitemap.`);
