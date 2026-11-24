/**
 * The design-system rules that Tailwind cannot enforce on its own.
 *
 * ── Why a script ──────────────────────────────────────────────────────────
 *
 * tailwind.config.ts enforces most of the system by REPLACING Tailwind's
 * defaults rather than extending them: `bg-red-500`, `text-2xl` and
 * `rounded-3xl` do not compile. Three rules cannot be enforced that way, and
 * all three are in the brief:
 *
 * 1. THE EIGHT-STEP GAP SCALE. Tailwind derives width, height, inset,
 *    translate and flex-basis from the same `spacing` scale as padding,
 *    margin and gap, so replacing the scale to forbid `py-7` also forbids
 *    `w-11` and `h-9`, which are sizes rather than spacing choices and which
 *    1,300 call sites across 88 other routes depend on. The eight steps are
 *    4 8 12 16 24 32 48 64, which are Tailwind's own 1/2/3/4/6/8/12/16 keys,
 *    so the rule is "do not use the others" and that is a lint, not a config.
 *
 * 2. ARBITRARY VALUES. `text-[13px]`, `p-[38px]` and `bg-[#f5f3ee]` always
 *    compile, by design: an arbitrary value is Tailwind's escape hatch and it
 *    cannot be switched off. The homepage had 38 distinct ad-hoc vertical
 *    spacing values and eight hardcoded band colours when this redesign
 *    started.
 *
 * 3. THE 14px TYPE FLOOR. The six scale steps are safe by construction
 *    (scripts/check-type-scale.mjs proves it), so the only way to go under
 *    the floor is an arbitrary size, which is rule 2.
 *
 * ── Scope: the files the brief covers ────────────────────────────────────
 *
 * The homepage, the chrome that ships on every route, the design-system
 * components themselves, and the sections relocated off the homepage. Not the
 * other 85 routes: those predate the system, they still compile because the
 * legacy token aliases resolve, and migrating 450 arbitrary font sizes across
 * them is a separate piece of work that this check makes visible rather than
 * silently permits. `npm run check:ds -- --all` prints the backlog.
 *
 * Run from `npm run build`, against the source. No built output needed.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const ALL = process.argv.includes('--all');

/** The files held to the system. */
const SCOPE = [
  'app/page.tsx',
  'app/ai/page.tsx',
  'app/faq/page.tsx',
  'app/how-we-work/page.tsx',
  'components/ui/index.tsx',
  'components/relocated.tsx',
  'components/chrome/nav.tsx',
  'components/chrome/whatsapp-float.tsx',
  'components/homepage-sections/hero.tsx',
  'components/homepage-sections/sections.tsx',
];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.next' || name === 'out' || name.startsWith('.')) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.tsx$/.test(name)) out.push(relative(ROOT, full));
  }
  return out;
}

const files = ALL
  ? walk(join(ROOT, 'app')).concat(walk(join(ROOT, 'components')))
  : SCOPE;

/* The eight allowed steps, as Tailwind keys. `px`, `0`, `auto` and `full` are
   structural rather than spacing choices and are allowed everywhere. */
const ALLOWED_STEPS = new Set(['0', 'px', 'auto', 'full', '1', '2', '3', '4', '6', '8', '12', '16']);
/* Plus the three layout tokens, which ARE the system. */
const ALLOWED_TOKENS = new Set(['section', 'gutter', 'header']);

/* Longest alternative first. Written `gap|gap-x` the alternation matched
   `gap` inside `gap-x-12`, left `x-12` as the step, and reported every
   two-axis gap on the page as off-scale. */
const SPACING_PROPS =
  '(?:px|py|pt|pr|pb|pl|mx|my|mt|mr|mb|ml|gap-x|gap-y|space-x|space-y|gap|p|m)';

/* A class in a className string, including its responsive and state prefixes. */
const CLASS_RE = /(?:^|[\s"'`{])((?:[a-z0-9-]+:)*)(!?)([a-z][a-z0-9-]*(?:-\[[^\]]+\])?)/g;

const problems = [];

for (const file of files) {
  let src;
  try {
    src = readFileSync(join(ROOT, file), 'utf8');
  } catch {
    problems.push({ file, line: 0, rule: 'missing', detail: 'file in SCOPE does not exist' });
    continue;
  }

  /*
     Comments are blanked before the file is scanned, and the reason is this
     repo specifically: every component documents the thing it replaced, so a
     doc comment legitimately contains `bg-[#f5f3ee]`, `py-14` and
     `text-[clamp(34px,4.9vw,76px)]` as the examples of what is no longer
     allowed. Scanning the comments made the explanation of a rule a
     violation of it.

     Blanked rather than removed, with newlines preserved, so the line numbers
     in a failure still point at the real line.
  */
  const blank = (m) => m.replace(/[^\n]/g, ' ');
  const stripped = src
    .replace(/\/\*[\s\S]*?\*\//g, blank)
    .replace(/(^|[^:])\/\/[^\n]*/g, (m, p1) => p1 + blank(m.slice(p1.length)));

  stripped.split('\n').forEach((code, i) => {
    const n = i + 1;

    /* ── Rule: no raw colour ── */
    for (const m of code.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) {
      problems.push({ file, line: n, rule: 'raw-colour', detail: m[0] });
    }
    for (const m of code.matchAll(/\brgba?\(\s*\d/g)) {
      problems.push({ file, line: n, rule: 'raw-colour', detail: `${m[0]}…) — use a token` });
    }

    /* ── Rule: no arbitrary font size ── */
    for (const m of code.matchAll(/\btext-\[[^\]]*(?:px|rem|em|clamp)[^\]]*\]/g)) {
      problems.push({ file, line: n, rule: 'arbitrary-type', detail: m[0] });
    }

    /* ── Rule: spacing from the eight steps only ── */
    for (const m of code.matchAll(CLASS_RE)) {
      const cls = m[3];
      const sp = cls.match(new RegExp(`^${SPACING_PROPS}-(.+)$`));
      if (!sp) continue;
      const step = sp[1];
      if (ALLOWED_STEPS.has(step) || ALLOWED_TOKENS.has(step)) continue;
      /* An arbitrary spacing value is its own, louder failure. */
      if (step.startsWith('[')) {
        problems.push({ file, line: n, rule: 'arbitrary-spacing', detail: cls });
      } else {
        problems.push({ file, line: n, rule: 'off-scale-spacing', detail: cls });
      }
    }
  });
}

if (problems.length) {
  const byRule = new Map();
  for (const p of problems) {
    if (!byRule.has(p.rule)) byRule.set(p.rule, []);
    byRule.get(p.rule).push(p);
  }
  const LABEL = {
    'raw-colour': 'Raw colour. Use a token from app/globals.css.',
    'arbitrary-type': 'Arbitrary font size. Use text-h1/h2/h3/body/small/eyebrow.',
    'arbitrary-spacing': 'Arbitrary spacing. Use 1/2/3/4/6/8/12/16 (4-64px).',
    'off-scale-spacing': 'Spacing off the eight-step scale (4 8 12 16 24 32 48 64).',
    missing: 'File listed in SCOPE is gone. Update the list.',
  };
  console.error(`check-design-system: FAILED. ${problems.length} violation(s).\n`);
  for (const [rule, list] of byRule) {
    console.error(`  ${LABEL[rule]}`);
    for (const p of list.slice(0, 30)) console.error(`    ${p.file}:${p.line}  ${p.detail}`);
    if (list.length > 30) console.error(`    … and ${list.length - 30} more`);
    console.error('');
  }
  process.exit(1);
}

console.log(
  `check-design-system: ${files.length} file(s) in scope, no raw colours, no arbitrary type sizes,\n` +
    '                     all padding/margin/gap on the eight-step scale.',
);
