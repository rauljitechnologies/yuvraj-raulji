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
 * `--primary` (#C8102E) on `--ink` (#0E0E10) measures 3.4:1. That is legal for
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
const INK = token('ink');
const PAPER = token('off-white');
const MUTED = token('muted');
const LINE = token('line');
const INK_SURFACE = token('ink-surface');
const INK_LINE = token('ink-line');
const INK_MUTED = token('ink-muted');
const PAPER_CARD = '#ffffff';
const SECONDARY_PAPER = '#3a3a42';
const SECONDARY_INK = '#c9c9d1';
const INK_ELEVATED = '#1f1f24';
const WHITE = '#ffffff';

/* Every pair the site renders. `min` is the floor that pair has to clear.
   Three scopes now, not two: the paper page, the two ink bands cut into it,
   and the whole page in dark mode (which shares the ink values, with a band
   lifting to --ink-surface so it stays a band). */
const PAIRS = [
  /* ── Paper: the page ── */
  { fg: INK, bg: PAPER, min: 4.5, name: '--text on --bg (paper)' },
  { fg: SECONDARY_PAPER, bg: PAPER, min: 4.5, name: '--text-secondary on --bg (paper)' },
  { fg: MUTED, bg: PAPER, min: 4.5, name: '--text-muted on --bg (paper)' },
  { fg: over(INK, PAPER, 0.6), bg: PAPER, min: 4.5, name: '--text-faint on --bg (paper)' },
  { fg: PRIMARY, bg: PAPER, min: 4.5, name: '--accent on --bg (paper), small text' },

  /* ── Paper: a card on it. White, so a card is lighter than its ground. ── */
  { fg: INK, bg: PAPER_CARD, min: 4.5, name: '--text on --surface (paper card)' },
  { fg: SECONDARY_PAPER, bg: PAPER_CARD, min: 4.5, name: '--text-secondary on --surface (paper card)' },
  { fg: MUTED, bg: PAPER_CARD, min: 4.5, name: '--text-muted on --surface (paper card)' },
  { fg: PRIMARY, bg: PAPER_CARD, min: 4.5, name: '--accent on --surface (paper card), small text' },

  /* ── Ink: the hero band, the closing band, and dark mode ── */
  { fg: PAPER, bg: INK, min: 4.5, name: '--text on --bg (ink)' },
  { fg: SECONDARY_INK, bg: INK, min: 4.5, name: '--text-secondary on --bg (ink)' },
  { fg: INK_MUTED, bg: INK, min: 4.5, name: '--text-muted on --bg (ink)' },
  { fg: over(PAPER, INK, 0.58), bg: INK, min: 4.5, name: '--text-faint on --bg (ink)' },
  { fg: BRIGHT, bg: INK, min: 4.5, name: '--accent-bright on --bg (ink), small text' },
  /* The one pair allowed under 4.5. See the note at the top of this file:
     #C8102E on ink is 3.4:1, which is legal for a fill, a rule, an icon and
     24px+ display text, and illegal for a label. The brief restricts the
     accent to exactly those uses on the dark side. */
  { fg: PRIMARY, bg: INK, min: 3.0, name: '--accent on --bg (ink), large text and non-text only' },

  /* ── Ink: a card on it ── */
  { fg: PAPER, bg: INK_SURFACE, min: 4.5, name: '--text on --surface (ink card)' },
  { fg: INK_MUTED, bg: INK_SURFACE, min: 4.5, name: '--text-muted on --surface (ink card)' },
  { fg: BRIGHT, bg: INK_SURFACE, min: 4.5, name: '--accent-bright on --surface (ink card)' },

  /* ── Dark mode: an ink BAND lifts to --ink-surface, and its cards to
       --surface-elevated, so both pairs have to hold one step lighter. ── */
  { fg: PAPER, bg: INK_ELEVATED, min: 4.5, name: '--text on a band card (dark mode)' },
  { fg: INK_MUTED, bg: INK_ELEVATED, min: 4.5, name: '--text-muted on a band card (dark mode)' },
  { fg: BRIGHT, bg: INK_ELEVATED, min: 4.5, name: '--accent-bright on a band card (dark mode)' },

  /* ── Fills ── */
  { fg: PAPER_CARD, bg: PRIMARY, min: 4.5, name: 'white on an --accent fill (primary button)' },

  /* ── Non-text: the hairline against each ground. WCAG 1.4.11 does not
       require 3:1 of a decorative divider, so these are the weaker floors
       the design intends rather than a legal minimum. They exist to catch a
       hairline becoming invisible, which is what happened once when the
       border tokens compiled to nothing and fell back to preflight grey. ── */
  { fg: LINE, bg: PAPER, min: 1.05, name: '--border on --bg (paper)' },
  { fg: INK_LINE, bg: INK, min: 1.1, name: '--border on --bg (ink)' },
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
