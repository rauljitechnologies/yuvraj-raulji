/**
 * Keyword coverage, against the exported site.
 *
 * ── What this closes ───────────────────────────────────────────────────────
 *
 * lib/content-map.ts enforces three rules: one primary keyword per page, every
 * row points at a real route, every route has a row. All three are about the
 * map's internal consistency. None of them looks at the page.
 *
 * So a row could claim a query the page never mentions, and nothing noticed.
 * When this check was first run, six did. /experience/ claimed "ecommerce
 * consultant experience" and contained neither "ecommerce" nor "consultant".
 * /ai-commerce/ claimed "ai commerce consultant" and was the one hub of eleven
 * that never used the word. /work/manufacturing/ claimed "manufacturer website
 * case study" on a page that said site rather than website throughout.
 *
 * A row like that is worse than no row: the map is the thing the build trusts
 * to prove two pages are not competing, and a row describing a page that does
 * not exist cannot prove anything.
 *
 * ── What it does and does not enforce ─────────────────────────────────────
 *
 * The hard rule is a floor, not a target: **every word of a page's primary
 * keyword has to appear somewhere on that page** — title, description, H1 or
 * body text, in any order, in any sentence. That is the least a page can do
 * and still be said to be about its own query.
 *
 * It deliberately stops there. CONTENT-PRINCIPLES.md is explicit that there
 * are no forced keywords on this site and no unnecessary exact-match
 * repetition, so this script does not require the phrase verbatim, does not
 * require it in the H1, and does not require it in the title. Those are
 * printed as numbers to read, never as conditions to pass. Six percent of
 * pages carry their primary keyword verbatim in the H1, and on a site whose
 * H1s are written as sentences that is the correct number rather than a
 * finding.
 *
 * Secondary keywords are reported and not enforced for the same reason: they
 * are a record of the queries a page is written to catch, not a checklist the
 * copy owes.
 *
 * ── Why the title cannibalisation list is a report ────────────────────────
 *
 * A title carrying another page's exact primary keyword is a real signal, and
 * it is also legitimately common here: /services/shopify-development/ and
 * /shopify/ are supposed to share the word Shopify. Printing it lets someone
 * read the list; failing on it would fail the build for the site working as
 * designed.
 *
 * Run from `npm run build`, after check-links, against `out/`.
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const OUT = process.argv[2] ?? 'out';

/* The map is TypeScript and this is a plain Node script, so it is loaded
   through jiti, which is a declared devDependency for exactly this. Reading
   the map rather than a copy of it is the point: a checker with its own list
   of keywords is a second source of truth and drifts from the first. */
const jiti = require('jiti')(join(ROOT, 'scripts/check-keywords.mjs'), { interopDefault: true });
const { CONTENT_MAP } = jiti(join(ROOT, 'lib/content-map.ts'));

/** Visible text, lowercased, entities resolved, whitespace collapsed. */
const text = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;|&apos;|&rsquo;|&lsquo;/g, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

/* Hyphens are resolved both ways rather than one: the copy writes eCommerce
   and the articles write e-commerce, and "magento-shopify" has to satisfy a
   keyword written as two words. Collapsing and splitting both, then taking the
   union, means neither spelling is a miss. */
/* British copy, American keywords. The copy on this site writes optimisation,
   personalisation and modernisation; the keyword rows write the z. Equating
   the two is not a nicety: without it /headless-commerce/optimization/ reads
   as a page that never mentions optimisation. */
const zed = (s) => s.replace(/is(ation|ations|ed|es|e|ing)\b/g, 'iz$1').replace(/yse\b/g, 'yze');

/* A slash is resolved like a hyphen, so "A/B testing" satisfies "ab testing"
   and "ERP/CRM" satisfies either half. */
const forms = (s) => {
  const base = [s.replace(/[-/]/g, ''), s.replace(/[-/]/g, ' ')];
  return [...new Set([...base, ...base.map(zed)])];
};
/* A dot is a word character here so that "next.js" survives tokenising, which
   means a word at the end of a sentence arrives as "consultant." and has to be
   trimmed or it never matches. Both forms are kept: the trimmed one for prose,
   the untrimmed one for a keyword that genuinely carries punctuation. */
const tokens = (s) => {
  const set = new Set();
  for (const form of forms(s)) {
    for (const w of form.split(/[^a-z0-9.+]+/)) {
      if (!w) continue;
      set.add(w);
      const trimmed = w.replace(/^[.+]+|[.+]+$/g, '');
      if (trimmed) set.add(trimmed);
    }
  }
  return set;
};

/* Not content words. "for" in "ecommerce technical partner for agencies"
   is satisfied by any page in any language and carries no information. */
const STOP = new Set(['a', 'an', 'and', 'for', 'in', 'of', 'or', 'the', 'to', 'vs', 'with']);
const contentWords = (kw) => [...tokens(kw)].filter((w) => !STOP.has(w));

const hasPhrase = (hay, kw) => forms(kw.toLowerCase()).some((f) => forms(hay).some((h) => h.includes(f)));

function page(url) {
  const file = url === '/' ? join(OUT, 'index.html') : join(OUT, url.replace(/^\//, ''), 'index.html');
  if (!existsSync(file)) return null;
  const html = readFileSync(file, 'utf8');
  const grab = (re) => {
    const m = html.match(re);
    return m ? text(m[1]) : '';
  };
  const title = grab(/<title>([\s\S]*?)<\/title>/i);
  const description = grab(/<meta name="description" content="([^"]*)"/i);
  const h1 = grab(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const body = grab(/<main[^>]*>([\s\S]*?)<\/main>/i);
  return { title, description, h1, body, all: `${title} ${description} ${h1} ${body}` };
}

const rows = [];
const missingPages = [];
for (const row of CONTENT_MAP) {
  const p = page(row.url);
  if (!p) {
    missingPages.push(row.url);
    continue;
  }
  const present = tokens(p.all);
  const absent = contentWords(row.primaryKeyword).filter((w) => !present.has(w));
  rows.push({
    ...row,
    p,
    absent,
    inTitle: hasPhrase(p.title, row.primaryKeyword),
    inH1: hasPhrase(p.h1, row.primaryKeyword),
    inDescription: hasPhrase(p.description, row.primaryKeyword),
    inBody: hasPhrase(p.body, row.primaryKeyword),
    secondaryHit: row.secondaryKeywords.filter((k) => hasPhrase(p.all, k)),
    /* Word level, which is the number worth reading. A page covering a query
       in its own words rather than in the query's words is this site working
       as intended; a page missing the words altogether cannot be said to
       cover it at all. */
    secondarySupported: row.secondaryKeywords.filter((k) =>
      contentWords(k).every((w) => present.has(w)),
    ),
  });
}

/* ── The one hard rule ───────────────────────────────────────────── */
const failures = rows.filter((r) => r.absent.length);

if (missingPages.length) {
  console.error(`\ncheck-keywords: FAILED. ${missingPages.length} mapped route(s) were not exported:`);
  for (const url of missingPages) console.error(`  ${url}`);
  process.exit(1);
}

if (failures.length) {
  console.error(`\ncheck-keywords: FAILED. ${failures.length} page(s) do not contain their own primary keyword:\n`);
  for (const r of failures) {
    console.error(`  ${r.url}  [${r.pageType}]`);
    console.error(`      claims:  "${r.primaryKeyword}"`);
    console.error(`      missing: ${r.absent.map((w) => JSON.stringify(w)).join(', ')}`);
    console.error(`      title:   ${r.p.title}`);
  }
  console.error(`\n  Either the page should say what it claims, or the row in lib/content-map.ts`);
  console.error(`  is describing a page that does not exist. Both are real answers; pick one.`);
  console.error(`  Do not pad the copy to pass this: CONTENT-PRINCIPLES.md section 3 is the`);
  console.error(`  rule that outranks it.\n`);
  process.exit(1);
}

/* ── Everything else is a number to read ─────────────────────────
   Four lines by default, because a build gate that prints thirty is a build
   gate people stop reading. `--verbose` prints the lists behind the numbers. */
const verbose = process.argv.includes('--verbose');
const n = rows.length;
const count = (f) => rows.filter(f).length;
const secTotal = rows.reduce((a, r) => a + r.secondaryKeywords.length, 0);
const secHit = rows.reduce((a, r) => a + r.secondaryHit.length, 0);
const secSupported = rows.reduce((a, r) => a + r.secondarySupported.length, 0);
const wordByWord = rows.filter((r) => !r.inTitle && !r.inDescription && !r.inH1 && !r.inBody);

console.log(`check-keywords: ${n} mapped pages, every primary keyword present on its own page.`);
console.log(
  `                verbatim placement, reported not enforced: title ${count((r) => r.inTitle)}, ` +
    `description ${count((r) => r.inDescription)}, H1 ${count((r) => r.inH1)}, body ${count((r) => r.inBody)}.`,
);
console.log(
  `                ${wordByWord.length} carry the primary word by word rather than as the phrase.`,
);
console.log(
  `                secondary keywords, words present ${secSupported}/${secTotal} ` +
    `(${Math.round((secSupported / secTotal) * 100)}%), exact phrase ${secHit}. Not enforced.`,
);

if (verbose) {
  console.log('\n  Primary keyword never appears as the phrase, only word by word:');
  for (const r of wordByWord) console.log(`    ${r.url}  "${r.primaryKeyword}"`);

  /* Not "absent as a phrase", which is most of them and is fine, but absent
     word by word: a row the page cannot support in any wording. Each one is
     either a copy gap or a row describing a page that was never written. */
  console.log('\n  Secondary keywords the page cannot support, word by word:');
  for (const r of rows) {
    const miss = r.secondaryKeywords.filter((k) => !r.secondarySupported.includes(k));
    if (miss.length) console.log(`    ${r.url}  ${miss.map((k) => JSON.stringify(k)).join(', ')}`);
  }

  /* A title carrying another page's exact primary keyword. Printed only here,
     and never a failure: /services/shopify-development/ and /shopify/ are
     meant to share the word Shopify, so most of this list is the site working
     as designed. The rule that actually prevents cannibalisation is the
     one-primary-keyword-per-page gate in lib/content-map.ts. */
  const borrowed = [];
  for (const r of rows) {
    for (const other of rows) {
      if (other !== r && hasPhrase(r.p.title, other.primaryKeyword)) {
        borrowed.push(`    ${r.url} carries "${other.primaryKeyword}" (${other.url})`);
      }
    }
  }
  console.log(`\n  Titles containing another page's primary keyword (${borrowed.length}):`);
  for (const line of borrowed) console.log(line);
}
