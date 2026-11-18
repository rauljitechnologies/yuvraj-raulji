/**
 * The redirect table, as a build gate.
 *
 * ── Why this exists ────────────────────────────────────────────────────────
 *
 * vercel.json is the only part of the routing that nothing checked. The
 * sitemap is checked against the exported pages, every internal link is
 * resolved against them, and the 54 redirect rules beside them were taken on
 * trust. The failures they can carry are all silent: a destination that was
 * renamed and now 404s, two rules claiming the same source, a rule shadowing a
 * page that exists, or a chain where one redirect lands on the source of
 * another and costs a second round trip.
 *
 * Google reported 12% of crawl requests hitting 404s on this site, which is
 * what the rules added on 19 Nov 2026 answer. A gate is what keeps the answer
 * true after the next rename.
 *
 * Run after `next build`, against `out/`.
 *
 * ── What is checked ────────────────────────────────────────────────────────
 *
 *   1. No two rules declare the same source.
 *   2. No source is also an exported page. A redirect wins over the
 *      filesystem on Vercel, so this is how a live page disappears.
 *   3. Every destination resolves: an exported page, or a pattern whose
 *      literal prefix is a real directory.
 *   4. No destination is also a source. That is a chain at best and a loop at
 *      worst, and both are avoidable by pointing the first rule at the final
 *      destination.
 *   5. Both spellings exist. `trailingSlash: true` means /x and /x/ are
 *      different requests, and a rule for one of them leaves the other 404ing.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const OUT = process.argv[2] ?? 'out';
const CONFIG = 'vercel.json';

function htmlFiles(dir) {
  const found = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) found.push(...htmlFiles(full));
    else if (entry.endsWith('.html')) found.push(full);
  }
  return found;
}

function toRoute(file) {
  const rel = relative(OUT, file).split(sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`;
  return `/${rel.replace(/\.html$/, '')}/`;
}

let redirects;
try {
  ({ redirects = [] } = JSON.parse(readFileSync(CONFIG, 'utf8')));
} catch (err) {
  console.error(`check-redirects: cannot read ${CONFIG}: ${err.message}`);
  process.exit(2);
}

let exported;
try {
  exported = new Set(htmlFiles(OUT).map(toRoute));
} catch {
  console.error(`check-redirects: no '${OUT}' directory. Run 'npx next build' first.`);
  process.exit(2);
}

/** `/x` and `/x/` are the same page to a reader and two requests to a server. */
const both = (p) => (p.endsWith('/') ? [p, p.slice(0, -1)] : [p, `${p}/`]);
const sources = new Set(redirects.map((r) => r.source));
const fail = [];

const seen = new Set();
for (const { source } of redirects) {
  if (seen.has(source)) fail.push(`duplicate source: ${source}`);
  seen.add(source);
}

for (const { source, destination } of redirects) {
  if (both(source).some((s) => exported.has(s))) {
    fail.push(`source shadows an exported page: ${source}`);
  }

  if (destination.includes(':')) {
    /* A pattern such as /work/:slug/. Only its literal prefix can be checked,
       and that is enough to catch the rename this gate is for. */
    const prefix = destination.slice(0, destination.indexOf(':'));
    if (![...exported].some((r) => r.startsWith(prefix))) {
      fail.push(`destination pattern matches no exported page: ${source} -> ${destination}`);
    }
  } else if (!exported.has(destination)) {
    fail.push(`destination does not exist: ${source} -> ${destination}`);
  }

  if (both(destination).some((d) => sources.has(d))) {
    fail.push(`destination is itself redirected (chain or loop): ${source} -> ${destination}`);
  }

  const [, other] = both(source);
  if (!source.includes(':') && !sources.has(other)) {
    fail.push(`only one spelling is handled: ${source} exists, ${other} does not`);
  }
}

if (fail.length) {
  console.error(`\nFAIL  ${fail.length} problem(s) in ${CONFIG}:`);
  for (const f of fail) console.error(`        ${f}`);
  process.exit(1);
}

console.log(
  `check-redirects: ${redirects.length} rules, destinations resolve, no chains, no shadowed pages.`,
);
