/**
 * The type scale, evaluated at the widths the brief names.
 *
 * ── What this closes ──────────────────────────────────────────────────────
 *
 * The brief gives six sizes as a desktop/mobile pair: h1 64/40, h2 44/32,
 * h3 24/20, body 18/16, small 14, eyebrow 12. The tokens in app/globals.css
 * express those as `clamp(min, intercept + slope*vw, max)`, and a clamp is
 * easy to get subtly wrong: a slope off by a tenth of a vw misses the
 * desktop end by two pixels, which nobody notices and nobody can defend.
 *
 * This parses the six clamps straight out of the stylesheet, evaluates each
 * at 375, 768, 1024 and 1440, and fails the build if the 768 value is not the
 * mobile end or the 1440 value is not the desktop end.
 *
 * It also enforces the floor the brief sets in the QA section: nothing on the
 * site is smaller than 14px, with ONE exception, the 12px mono eyebrow, which
 * the brief names explicitly.
 *
 * Run from `npm run build`. Needs no browser and no built output.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const css = readFileSync(join(ROOT, 'app/globals.css'), 'utf8');

const ROOT_PX = 16;

/** `clamp(2.5rem, 0.7857rem + 3.5714vw, 4rem)` or a bare length. */
function parse(name) {
  const decl = css.match(new RegExp(`--${name}:\\s*([^;]+);`));
  if (!decl) {
    console.error(`check-type-scale: FAILED. --${name} is not declared in app/globals.css.`);
    process.exit(1);
  }
  const value = decl[1].trim();

  const len = (s) => {
    const m = s.trim().match(/^(-?[\d.]+)(rem|px)$/);
    if (!m) return null;
    return m[2] === 'rem' ? parseFloat(m[1]) * ROOT_PX : parseFloat(m[1]);
  };

  const flat = len(value);
  if (flat !== null) return () => flat;

  const c = value.match(/^clamp\(([^,]+),([^,]+),([^)]+)\)$/);
  if (!c) {
    console.error(`check-type-scale: FAILED. --${name} is neither a length nor a clamp: ${value}`);
    process.exit(1);
  }
  const min = len(c[1]);
  const max = len(c[3]);
  const pref = c[2].trim();
  const pm = pref.match(/^(-?[\d.]+)(rem|px)\s*\+\s*(-?[\d.]+)vw$/);
  if (min === null || max === null || !pm) {
    console.error(`check-type-scale: FAILED. --${name} clamp terms unparsed: ${value}`);
    process.exit(1);
  }
  const intercept = pm[2] === 'rem' ? parseFloat(pm[1]) * ROOT_PX : parseFloat(pm[1]);
  const slope = parseFloat(pm[3]) / 100;
  return (vw) => Math.min(Math.max(intercept + slope * vw, min), max);
}

const WIDTHS = [375, 768, 1024, 1440];

/* `mobile` is the value required at 768 and below; `desktop` the value
   required at 1440 and above. Straight from the brief. */
const SCALE = [
  { token: 'fs-h1', mobile: 40, desktop: 64 },
  { token: 'fs-h2', mobile: 32, desktop: 44 },
  { token: 'fs-h3', mobile: 20, desktop: 24 },
  { token: 'fs-body', mobile: 16, desktop: 18 },
  { token: 'fs-small', mobile: 14, desktop: 14 },
  { token: 'fs-eyebrow', mobile: 12, desktop: 12 },
];

const TOLERANCE = 0.6; /* px. Rounding in the rem-to-px conversion, nothing more. */
const failures = [];

console.log(`  ${'token'.padEnd(12)}${WIDTHS.map((w) => String(w).padStart(8)).join('')}   required`);
for (const row of SCALE) {
  const at = parse(row.token);
  const values = WIDTHS.map(at);
  console.log(
    `  ${row.token.padEnd(12)}${values.map((v) => v.toFixed(1).padStart(8)).join('')}   ${row.mobile}/${row.desktop}`,
  );

  const [w375, w768, , w1440] = values;
  if (Math.abs(w768 - row.mobile) > TOLERANCE) {
    failures.push(`--${row.token} is ${w768.toFixed(1)}px at 768, should be ${row.mobile}px`);
  }
  if (Math.abs(w375 - row.mobile) > TOLERANCE) {
    failures.push(`--${row.token} is ${w375.toFixed(1)}px at 375, should floor at ${row.mobile}px`);
  }
  if (Math.abs(w1440 - row.desktop) > TOLERANCE) {
    failures.push(`--${row.token} is ${w1440.toFixed(1)}px at 1440, should be ${row.desktop}px`);
  }
  /* The floor. The eyebrow is the one documented exception. */
  const floor = row.token === 'fs-eyebrow' ? 12 : 14;
  const smallest = Math.min(...values);
  if (smallest < floor - TOLERANCE) {
    failures.push(`--${row.token} reaches ${smallest.toFixed(1)}px, below the ${floor}px floor`);
  }
}

/* Line heights and the measure, which the brief also fixes. */
const LITERALS = [
  { token: 'lh-heading', want: '1.1' },
  { token: 'lh-body', want: '1.6' },
  { token: 'tracking-eyebrow', want: '0.15em' },
  { token: 'measure', want: '65ch' },
  { token: 'header-h', want: '72px' },
];
for (const l of LITERALS) {
  const m = css.match(new RegExp(`--${l.token}:\\s*([^;]+);`));
  const got = m ? m[1].trim() : '(absent)';
  if (got !== l.want) failures.push(`--${l.token} is ${got}, should be ${l.want}`);
}

/* The one section padding token, at both ends. */
{
  const all = [...css.matchAll(/--section-py:\s*([^;]+);/g)].map((m) => m[1].trim());
  if (all.join(',') !== '4rem,6rem') {
    failures.push(
      `--section-py should be declared exactly twice, 4rem then 6rem (py-16 / py-24); found: ${all.join(', ') || '(none)'}`,
    );
  }
}

if (failures.length) {
  console.error(`\ncheck-type-scale: FAILED.\n${failures.map((f) => `  ${f}`).join('\n')}`);
  process.exit(1);
}
console.log(
  'check-type-scale: six sizes hit their mobile end at 768 and their desktop end at 1440;\n' +
    '                  nothing below 14px but the 12px mono eyebrow; line heights, measure,\n' +
    '                  header height and the one section padding all as specified.',
);
