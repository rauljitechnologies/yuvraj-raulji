/**
 * Colour contrast, measured against the palette rather than assumed.
 *
 * ── Why this is a script and not a comment ────────────────────────────────
 *
 * The token block in app/globals.css states a contrast ratio next to nearly
 * every colour it declares. Before this script those numbers were typed by
 * hand, and three of them were wrong by the time they were read: `--text-faint`
 * was documented as "decorative / large only" at 3.46:1 while ten components
 * used it for 10px labels, and the two `.yr-paper` reds were measured against
 * #ffffff on a scope whose ground had since become #f7f7f5.
 *
 * A ratio in a comment is a claim. This reads the hex values straight out of
 * the stylesheet, computes WCAG 2.x relative luminance, and fails the build if
 * any pair the site actually renders falls under its floor. The numbers in the
 * comments are now printed by the same code that checks them.
 *
 * ── The floors ────────────────────────────────────────────────────────────
 *
 *   4.5:1   any text under 24px, or under 18.66px bold  (WCAG 1.4.3 AA)
 *   3.0:1   text at or above 24px, and non-text UI borders (1.4.11)
 *
 * ── The one pair that is allowed to fail, and why it is listed ────────────
 *
 * `--primary` (#C8102E) on `--near-black` measures 3.37:1. That is legal for
 * a fill, a rule, an icon and display text, and illegal for a label, so it is
 * checked at the 3.0 floor and `--primary-bright` is checked at 4.5. The
 * brief names #C8102E as the primary and this is the arithmetic that follows
 * from it; the alternative was shipping a quiet accessibility bug.
 *
 * Run from `npm run build`. Needs no browser and no built output.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const css = readFileSync(join(ROOT, 'app/globals.css'), 'utf8');

/** Read a `--name: #rrggbb;` declaration out of the stylesheet. */
function token(name) {
  const m = css.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})\\s*;`));
  if (!m) {
    console.error(`check-contrast: FAILED. --${name} is not a hex token in app/globals.css.`);
    process.exit(1);
  }
  return m[1];
}

const lin = (c) => {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
};

/** WCAG 2.x relative luminance. */
function luminance(hex) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function ratio(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  const hi = Math.max(la, lb);
  const lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Alpha-composite a foreground over a ground, because four of the text tokens
 * are alpha ramps rather than hex. `--text-secondary` is
 * `rgb(var(--off-white-rgb) / 0.74)` and what a reader sees is that blended
 * over the ground, so that is what has to be measured.
 */
function over(hex, groundHex, alpha) {
  const h = hex.replace('#', '');
  const g = groundHex.replace('#', '');
  const mix = (i) => {
    const f = parseInt(h.slice(i * 2, i * 2 + 2), 16);
    const bg = parseInt(g.slice(i * 2, i * 2 + 2), 16);
    return Math.round(f * alpha + bg * (1 - alpha));
  };
  return `#${[0, 1, 2].map((i) => mix(i).toString(16).padStart(2, '0')).join('')}`;
}

const PRIMARY = token('primary');
const BRIGHT = token('primary-bright');
const DARK = token('near-black');
const LIGHT = token('off-white');
const G900 = token('grey-900');
const G500 = token('grey-500');
const G300 = token('grey-300');
const WHITE = '#ffffff';

/* Every pair the site renders. `min` is the floor that pair has to clear. */
const PAIRS = [
  /* ── Dark scope ── */
  { fg: LIGHT, bg: DARK, min: 4.5, name: '--text on --bg (dark)' },
  { fg: over(LIGHT, DARK, 0.74), bg: DARK, min: 4.5, name: '--text-secondary on --bg (dark)' },
  { fg: G300, bg: DARK, min: 4.5, name: '--text-muted on --bg (dark)' },
  { fg: over(LIGHT, DARK, 0.55), bg: DARK, min: 4.5, name: '--text-faint on --bg (dark)' },
  { fg: BRIGHT, bg: DARK, min: 4.5, name: '--accent-bright on --bg (dark), small text' },
  { fg: PRIMARY, bg: DARK, min: 3.0, name: '--accent on --bg (dark), large text and non-text' },
  { fg: LIGHT, bg: G900, min: 4.5, name: '--text on --surface (dark card)' },
  { fg: G300, bg: G900, min: 4.5, name: '--text-muted on --surface (dark card)' },
  { fg: BRIGHT, bg: G900, min: 4.5, name: '--accent-bright on --surface (dark card)' },

  /* ── Light scope ── */
  { fg: DARK, bg: LIGHT, min: 4.5, name: '--text on --bg (light)' },
  { fg: over(DARK, LIGHT, 0.76), bg: LIGHT, min: 4.5, name: '--text-secondary on --bg (light)' },
  { fg: G500, bg: LIGHT, min: 4.5, name: '--text-muted on --bg (light)' },
  { fg: over(DARK, LIGHT, 0.62), bg: LIGHT, min: 4.5, name: '--text-faint on --bg (light)' },
  { fg: PRIMARY, bg: LIGHT, min: 4.5, name: '--accent-bright on --bg (light), small text' },
  /* The light scope's card ground is `rgb(var(--near-black-rgb) / 0.03)`
     rather than a hex, so it is composited here the same way the text ramps
     are. Every card on an off-white band sets its eyebrow on it. */
  { fg: DARK, bg: over(DARK, LIGHT, 0.03), min: 4.5, name: '--text on --surface (light card)' },
  { fg: G500, bg: over(DARK, LIGHT, 0.03), min: 4.5, name: '--text-muted on --surface (light card)' },
  { fg: PRIMARY, bg: over(DARK, LIGHT, 0.03), min: 4.5, name: '--accent-bright on --surface (light card)' },

  /* ── Fills ── */
  { fg: WHITE, bg: PRIMARY, min: 4.5, name: 'white on an --accent fill (primary button)' },

  /* ── Non-text: the hairline against both grounds (WCAG 1.4.11 does not
       require 3:1 of a decorative divider, so this is the weaker 1.4 floor
       the design intends rather than a legal minimum. It is here to catch a
       hairline becoming invisible, which is what happened when the border
       tokens briefly compiled to nothing and fell back to preflight grey.) ── */
  { fg: over(G500, DARK, 0.4), bg: DARK, min: 1.3, name: '--border on --bg (dark)' },
  { fg: over(G500, LIGHT, 0.32), bg: LIGHT, min: 1.2, name: '--border on --bg (light)' },
];

const rows = PAIRS.map((p) => ({ ...p, got: ratio(p.fg, p.bg) }));
const failed = rows.filter((r) => r.got < r.min);

for (const r of rows) {
  const mark = r.got < r.min ? 'FAIL' : '    ';
  console.log(`  ${mark} ${r.got.toFixed(2).padStart(6)}:1  (min ${r.min})  ${r.name}`);
}

if (failed.length) {
  console.error(
    `\ncheck-contrast: FAILED. ${failed.length} pair(s) below their floor.\n` +
      'Change the token in app/globals.css, not the floor here.',
  );
  process.exit(1);
}
console.log(`check-contrast: ${rows.length} pairs, all above their floor.`);
