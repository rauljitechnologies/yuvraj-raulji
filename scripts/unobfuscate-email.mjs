/**
 * Stops Cloudflare rewriting the contact address out of the exported HTML.
 *
 * ── The problem ─────────────────────────────────────────────────────────────
 *
 * Cloudflare's Email Address Obfuscation is on for this zone. It rewrites every
 * `mailto:` in the HTML response to `/cdn-cgi/l/email-protection#<hex>` and
 * replaces the visible address with the string "[email protected]", then
 * restores both client-side with an injected script.
 *
 * The site's own source is correct: it emits real `mailto:` links. The rewrite
 * happens at the edge, after the build, so no amount of fixing the components
 * changes what a crawler receives. What a crawler receives is a site whose
 * secondary call to action ("Start a conversation") points at a Cloudflare
 * internal path, and whose contact address does not appear in the body at all.
 * The address is already published in the Person schema and in llms.txt, so the
 * obfuscation protects nothing and costs the site its most important answer.
 *
 * ── Why a post-build pass and not a component ───────────────────────────────
 *
 * Cloudflare skips anything between `<!--email_off-->` and `<!--/email_off-->`.
 * Emitting those from React means `dangerouslySetInnerHTML` at every one of the
 * twelve-odd places an address is rendered, each wrapped in an element that did
 * not exist before, which risks the flex and grid layouts around them for no
 * benefit. Two comments per file does the same job, cannot affect layout
 * because comments render nothing, and covers pages that do not exist yet.
 *
 * ── If this file ever looks unnecessary ─────────────────────────────────────
 *
 * It is unnecessary the moment Email Address Obfuscation is switched off in the
 * Cloudflare dashboard, under Scrape Shield. That is the better fix and this is
 * the one available from the repository. Deleting this should be accompanied by
 * checking that a real `mailto:` survives to the served HTML.
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = process.env.EXPORT_DIR || 'out';
const OPEN = '<!--email_off-->';
const CLOSE = '<!--/email_off-->';

async function* htmlFiles(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* htmlFiles(p);
    else if (e.name.endsWith('.html')) yield p;
  }
}

let touched = 0;
let skipped = 0;

for await (const file of htmlFiles(ROOT)) {
  const html = await readFile(file, 'utf8');

  /* Already processed, or no body to wrap. Both are no-ops rather than
     errors: this script has to be safe to run twice. */
  if (html.includes(OPEN)) {
    skipped++;
    continue;
  }
  const open = html.indexOf('>', html.indexOf('<body'));
  const close = html.lastIndexOf('</body>');
  if (open === -1 || close === -1 || close < open) {
    skipped++;
    continue;
  }

  const next =
    html.slice(0, open + 1) + OPEN + html.slice(open + 1, close) + CLOSE + html.slice(close);
  await writeFile(file, next, 'utf8');
  touched++;
}

console.log(`email_off: wrapped ${touched} file(s), skipped ${skipped}`);
