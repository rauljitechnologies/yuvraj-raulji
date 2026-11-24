/**
 * Horizontal overflow, measured on the exported HTML.
 *
 * ── What this closes, and why it needs a script ───────────────────────────
 *
 * The brief asks for no horizontal scroll anywhere on the page, checked
 * against `document.scrollWidth`. The audit found that reading
 * `document.scrollWidth` in a browser on this site would have answered
 * "fine" while the page overflowed, because two ancestors suppress it:
 * `overflow-x-hidden` on <body> in app/layout.tsx and `[overflow-x:clip]` on
 * the homepage wrapper. Both hide the scrollbar; neither prevents the
 * overflow, and `clip` additionally stops the overflow contributing to
 * `scrollWidth` at all.
 *
 * So a browser check against those two classes is a check that cannot fail.
 * This works the other way round: it reads the exported HTML and fails on the
 * PATTERNS that cause horizontal overflow, which is the thing that can be
 * verified without a browser and the thing that actually regresses.
 *
 * ── The four patterns ─────────────────────────────────────────────────────
 *
 * 1. `overflow-x-auto` or `overflow-x-scroll` on an element with no scrollbar
 *    suppression. This is exactly what the case-study carousel was: the only
 *    such scroller on the site that did not carry `.scrollbar-hide`,
 *    `.yr-rail`, `.yr-scroll-x` or the inline triple, so Windows and Linux
 *    Chrome painted a permanent 15px bar inside the section.
 *
 * 2. A fixed pixel width wider than the narrowest viewport the brief tests,
 *    375px, without a `max-w-full` beside it. A `w-[480px]` card in a
 *    one-column grid is 105px of overflow on a phone.
 *
 * 3. `w-screen` / `100vw` anywhere inside the container. `100vw` includes the
 *    classic scrollbar width on a desktop browser, so an element set to it
 *    inside a page that already has a vertical scrollbar overflows by 15px.
 *
 * 4. An `sr-only` element inside an `overflow-x` scroller. Tailwind's
 *    `sr-only` is `position:absolute`, so without a positioned ancestor it
 *    resolves its containing block to the page and lands at its static
 *    position. The note on `RuleLink` in
 *    components/homepage-sections/primitives.tsx records this giving the
 *    homepage 1,250px of horizontal scroll on a phone, drawn with nothing in
 *    it. That is why the carousel is gone and why this is checked.
 *
 * ── Scope ─────────────────────────────────────────────────────────────────
 *
 * The pages the brief covers: the homepage and the three routes created for
 * the sections that moved off it. `--all` scans all 94 and prints the backlog
 * on the 85 routes that predate the redesign, which is a separate piece of
 * work rather than something this check should quietly pass.
 *
 * As of this commit the backlog is two patterns, both on the platform and
 * expertise pages: a `w-[380px]` card inside a `-mx-4 overflow-x-auto` rail
 * (5px over the 375 test width, and inside a scroller, so it is a finding
 * rather than a break), and an `sr-only` inside a comparison table's
 * scroller, which is the same shape as the bug that gave the old homepage
 * 1,250px of phantom scroll.
 *
 * Run from `npm run build`, against `out/`.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const OUT = process.argv[2] ?? 'out';

if (!existsSync(OUT)) {
  console.error(`check-overflow: FAILED. ${OUT}/ does not exist. Run next build first.`);
  process.exit(1);
}

function pages(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === '_next') continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) pages(full, out);
    else if (name.endsWith('.html')) out.push(full);
  }
  return out;
}

const SUPPRESSED = [
  'scrollbar-hide',
  'yr-rail',
  'yr-scroll-x',
  '[scrollbar-width:none]',
  'scrollbar-width:none',
];

const ALL = process.argv.includes('--all');

/* The pages held to the rule. Exported paths, as `page` is computed below. */
const SCOPE = new Set(['/', '/ai/', '/faq/', '/how-we-work/']);

const files = pages(OUT).filter((f) => {
  if (ALL) return true;
  const page = '/' + relative(OUT, f).replace(/index\.html$/, '').replace(/\.html$/, '/');
  return SCOPE.has(page);
});
const problems = [];

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const page = '/' + relative(OUT, file).replace(/index\.html$/, '').replace(/\.html$/, '/');

  /* ── 1. an unsuppressed horizontal scroller ──
     A WIDE TABLE IS EXEMPT, and the exemption is the point rather than a
     loophole. A comparison table that is genuinely wider than a phone has to
     scroll, and on a table a visible scrollbar is correct: it is the only
     affordance telling the reader there are more columns. Eleven platform
     pages carry one.

     What the rule is actually for is a scroller used as a LAYOUT: a row of
     cards a reader is expected to swipe, where the scrollbar lands in the
     middle of a section and the content past the second card is found only by
     someone who already decided to look. That was the case-study carousel. */
  for (const m of html.matchAll(/class="([^"]*\boverflow-x-(?:auto|scroll)\b[^"]*)"/g)) {
    const cls = m[1];
    if (SUPPRESSED.some((s) => cls.includes(s))) continue;
    const subtree = html.slice(m.index, m.index + 3000);
    if (subtree.includes('<table')) continue;
    problems.push({
      page,
      rule: 'unsuppressed-scroller',
      detail: cls.length > 110 ? cls.slice(0, 110) + '…' : cls,
    });
  }

  /* ── 2. a fixed width wider than 375px with no max-w-full ──
     Exempt inside a horizontal scroller: a rail's whole job is to hold
     children wider than the viewport, and the scroller contains them. The
     rule is for a fixed-width element in normal flow, which is the one that
     pushes the page itself wider. */
  for (const m of html.matchAll(/class="([^"]*)"/g)) {
    const cls = m[1];
    if (cls.includes('max-w-full')) continue;
    for (const w of cls.matchAll(/(?:^|\s)(?:min-)?w-\[(\d+)px\]/g)) {
      if (Number(w[1]) <= 375) continue;
      const before = html.slice(Math.max(0, m.index - 2500), m.index);
      if (/overflow-x-(?:auto|scroll)/.test(before)) continue;
      /*
         Exempt an out-of-flow element whose nearest ancestor both positions
         AND clips. The footer's decorative red glow is a 380px circle at
         `absolute -left-24 -top-32` inside a `relative overflow-hidden` band:
         out of flow, clipped by the band, and contributing nothing to the
         page's width. Without this the check reported it on all 94 pages,
         which is a false positive that would have trained someone to ignore
         the rule.

         The exemption is narrow on purpose. `absolute` alone is NOT enough:
         an absolute child of an UNCLIPPED ancestor is exactly the sr-only bug
         rule 4 below exists for.
      */
      if (/\babsolute\b|\bfixed\b/.test(cls) && /relative[^"]*overflow-(?:hidden|clip)|overflow-(?:hidden|clip)[^"]*relative/.test(before)) {
        continue;
      }
      problems.push({ page, rule: 'fixed-width-over-375', detail: w[0].trim() });
    }
  }

  /* ── 3. w-screen or a raw 100vw width ── */
  for (const m of html.matchAll(/class="[^"]*\b(w-screen|w-\[100vw\])\b[^"]*"/g)) {
    problems.push({ page, rule: 'viewport-width', detail: m[1] });
  }

  /* ── 4. sr-only inside a horizontal scroller, with no positioned ancestor
       between them. Approximated by looking for an `overflow-x` element whose
       markup reaches an `sr-only` before it closes, with no `relative` or
       `absolute` in between. It is an approximation and it is the cheap half
       of a real bug that has already happened once. ── */
  /*
     `auto|scroll` only, NOT `clip|hidden`.

     The first version matched all four, which meant it matched
     `overflow-x-hidden` on <body> on every page, and the first `sr-only` after
     that is the header's skip link — so it reported all 94 pages. `clip` and
     `hidden` cannot produce a scrollbar from an escaped absolute child in the
     first place; only a real scroller can, which is the bug that happened.
  */
  const scrollers = [...html.matchAll(/class="[^"]*overflow-x-(?:auto|scroll)[^"]*"/g)];
  for (const s of scrollers) {
    const window_ = html.slice(s.index, s.index + 3000);
    const sr = window_.indexOf('sr-only');
    if (sr === -1) continue;
    const between = window_.slice(0, sr);
    if (/class="[^"]*\b(relative|absolute|fixed|sticky)\b/.test(between)) continue;
    problems.push({
      page,
      rule: 'unpositioned-sr-only-in-scroller',
      detail: 'sr-only with no positioned ancestor inside an overflow-x element',
    });
  }
}

if (problems.length) {
  const byRule = new Map();
  for (const p of problems) {
    const key = `${p.rule}`;
    if (!byRule.has(key)) byRule.set(key, []);
    byRule.get(key).push(p);
  }
  const LABEL = {
    'unsuppressed-scroller':
      'overflow-x scroller with a visible scrollbar. Add `scrollbar-hide`, or make it a grid.',
    'fixed-width-over-375':
      'Fixed width wider than the 375px test viewport, with no `max-w-full` beside it.',
    'viewport-width':
      '100vw includes the scrollbar width on desktop. Use `w-full` inside the container.',
    'unpositioned-sr-only-in-scroller':
      'sr-only is position:absolute; inside an overflow-x element it needs a positioned ancestor or it escapes and adds page width.',
  };
  console.error(`check-overflow: FAILED. ${problems.length} finding(s).\n`);
  for (const [rule, list] of byRule) {
    console.error(`  ${LABEL[rule]}`);
    const seen = new Set();
    for (const p of list) {
      const k = `${p.page} ${p.detail}`;
      if (seen.has(k)) continue;
      seen.add(k);
      if (seen.size > 20) break;
      console.error(`    ${p.page}  ${p.detail}`);
    }
    if (list.length > 20) console.error(`    … ${list.length} total occurrences`);
    console.error('');
  }
  process.exit(1);
}

console.log(
  `check-overflow: ${files.length} page(s)${ALL ? '' : ' in scope'}, no horizontal-overflow patterns.` +
    (ALL ? '' : ' Run with --all for the backlog.'),
);
