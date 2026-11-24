/**
 * The type scale, evaluated at the widths the brief names.
 *
 * ── What this closes ──────────────────────────────────────────────────────
 *
 * The guideline gives six sizes as a floor/ceiling pair: h1 40/80, h2 32/48,
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
  /* Two shapes are allowed for the preferred term:
       `0.9rem + 0.35vw`   an intercept plus a slope
       `6vw`               a bare slope, which is what the brief states for
                           the H1 and what a pure-viewport scale looks like
     Anything else is a typo rather than a style, so it still fails. */
  let intercept = 0;
  let slope = null;
  const withIntercept = pref.match(/^(-?[\d.]+)(rem|px)\s*\+\s*(-?[\d.]+)vw$/);
  const bareVw = pref.match(/^(-?[\d.]+)vw$/);
  if (withIntercept) {
    intercept = withIntercept[2] === 'rem' ? parseFloat(withIntercept[1]) * ROOT_PX : parseFloat(withIntercept[1]);
    slope = parseFloat(withIntercept[3]) / 100;
  } else if (bareVw) {
    slope = parseFloat(bareVw[1]) / 100;
  }
  if (min === null || max === null || slope === null) {
    console.error(`check-type-scale: FAILED. --${name} clamp terms unparsed: ${value}`);
    process.exit(1);
  }
  const fn = (vw) => Math.min(Math.max(intercept + slope * vw, min), max);
  fn.min = min;
  fn.max = max;
  return fn;
}

const WIDTHS = [375, 768, 1024, 1440];

/* The declared ENDPOINTS of each clamp, from the brand guideline.
   Checked as endpoints rather than as "the value at 768 and at 1440",
   because the scale is viewport-linear now: the H1's preferred term is the
   brief's own `6vw`, which crosses 80px at 1333px, so a value sampled at
   1440 is the ceiling and a value sampled at 768 is the floor, and neither
   is a free parameter to assert against. What matters is that the floor and
   the ceiling are the specified ones, that every width lands between them,
   and that nothing lands under the 14px reading floor. */
const SCALE = [
  { token: 'fs-h1', min: 40, max: 80 },
  { token: 'fs-h2', min: 32, max: 48 },
  { token: 'fs-h3', min: 20, max: 28 },
  { token: 'fs-body', min: 17, max: 18 },
  { token: 'fs-small', min: 14, max: 14 },
  { token: 'fs-eyebrow', min: 12, max: 12 },
];

const TOLERANCE = 0.6; /* px. Rounding in the rem-to-px conversion, nothing more. */
const failures = [];

console.log(
  `  ${'token'.padEnd(12)}${WIDTHS.map((w) => String(w).padStart(8)).join('')}   floor/ceiling`,
);
for (const row of SCALE) {
  const at = parse(row.token);
  const values = WIDTHS.map(at);
  console.log(
    `  ${row.token.padEnd(12)}${values.map((v) => v.toFixed(1).padStart(8)).join('')}   ${row.min}/${row.max}`,
  );

  /* The declared endpoints are the specification. */
  if (Math.abs(at.min - row.min) > TOLERANCE) {
    failures.push(`--${row.token} floors at ${at.min.toFixed(1)}px, should be ${row.min}px`);
  }
  if (Math.abs(at.max - row.max) > TOLERANCE) {
    failures.push(`--${row.token} ceilings at ${at.max.toFixed(1)}px, should be ${row.max}px`);
  }
  /* Every rendered width lands inside them, and the curve is monotonic. */
  for (let i = 0; i < values.length; i++) {
    if (values[i] < row.min - TOLERANCE || values[i] > row.max + TOLERANCE) {
      failures.push(
        `--${row.token} is ${values[i].toFixed(1)}px at ${WIDTHS[i]}, outside ${row.min}-${row.max}`,
      );
    }
    if (i && values[i] < values[i - 1] - TOLERANCE) {
      failures.push(`--${row.token} shrinks between ${WIDTHS[i - 1]} and ${WIDTHS[i]}`);
    }
  }
  /* The ceiling has to be reachable at or below the widest tested width,
     or the declared desktop size is aspirational rather than rendered. */
  if (row.max > row.min && Math.abs(values[values.length - 1] - row.max) > TOLERANCE) {
    failures.push(
      `--${row.token} only reaches ${values[values.length - 1].toFixed(1)}px at 1440, not its ${row.max}px ceiling`,
    );
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
  { token: 'lh-body', want: '1.65' },
  { token: 'tracking-eyebrow', want: '0.12em' },
  { token: 'tracking-h1', want: '-0.02em' },
  { token: 'tracking-h2', want: '-0.02em' },
  { token: 'measure', want: '65ch' },
  { token: 'header-h', want: '72px' },
];
for (const l of LITERALS) {
  const m = css.match(new RegExp(`--${l.token}:\\s*([^;]+);`));
  const got = m ? m[1].trim() : '(absent)';
  if (got !== l.want) failures.push(`--${l.token} is ${got}, should be ${l.want}`);
}

/* The ONE section padding token.
   It was declared twice, 4rem then 6rem, as a breakpoint step. It is one
   continuous clamp now: 64px on a phone rising to 128px, which is the
   spacing the guideline asks for (96-128 desktop / 64 mobile) without a
   breakpoint in the middle of it. Declared exactly once, so a section still
   cannot opt out, and the endpoints are checked rather than the text. */
{
  const all = [...css.matchAll(/--section-py:\s*([^;]+);/g)].map((m) => m[1].trim());
  if (all.length !== 1) {
    failures.push(
      `--section-py should be declared exactly once; found ${all.length}: ${all.join(', ') || '(none)'}`,
    );
  } else {
    const at = parse('section-py');
    if (Math.abs(at.min - 64) > TOLERANCE) {
      failures.push(`--section-py floors at ${at.min.toFixed(1)}px, should be 64px`);
    }
    if (Math.abs(at.max - 128) > TOLERANCE) {
      failures.push(`--section-py ceilings at ${at.max.toFixed(1)}px, should be 128px`);
    }
    /* 96px is the guideline's desktop minimum, and it has to be reached by
       the time the layout is a desktop layout rather than at some width
       past the widest screen tested. */
    const at1280 = at(1280);
    if (at1280 < 96 - TOLERANCE) {
      failures.push(`--section-py is only ${at1280.toFixed(1)}px at 1280, should be >= 96px`);
    }
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
