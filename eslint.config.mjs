import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

/**
 * ESLint, in flat-config form.
 *
 * Next 16 defaults `@next/eslint-plugin-next` to flat config and removed the
 * `next lint` command, so this is a plain `eslint` run wired into the `lint`
 * script rather than something the framework drives.
 *
 * ── No FlatCompat ─────────────────────────────────────────────────────────
 *
 * The first version of this file wrapped `eslint-config-next` in
 * `@eslint/eslintrc`'s `FlatCompat`, which is the documented bridge for
 * legacy shareable configs. At version 16 it is not one: `eslint-config-next`
 * exports native flat-config arrays from `./core-web-vitals` and
 * `./typescript`. Running them through the compat layer threw
 * `TypeError: Converting circular structure to JSON` from the legacy config
 * validator, because the flat config's `plugins` object is self-referential
 * and the eslintrc validator tries to `JSON.stringify` it. They are spread
 * directly now, which is both correct and simpler.
 *
 * ── The ignore list ───────────────────────────────────────────────────────
 *
 * `out/` and `.next*` are build output. `google-apps-script/` is Apps Script,
 * not browser or Node JavaScript: it runs in Google's own runtime with its own
 * globals (`SpreadsheetApp`, `Utilities`, `Session`), and linting it against a
 * web config reports every one of them as undefined. It is deployed by clasp,
 * never bundled by Next, so it is genuinely out of scope.
 */
const config = [
  {
    ignores: [
      'out/**',
      '.next/**',
      '.next-*/**',
      'node_modules/**',
      'node_modules.nosync/**',
      'google-apps-script/**',
      'content/**',
      'public/**',
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      /**
       * The site is a static export with `images: { unoptimized: true }`, so
       * `next/image` provides no optimisation here, and the homepage hero
       * deliberately uses a raw `<img>` with a hand-written `srcSet`: it is
       * the LCP element and it needs `fetchPriority="high"` plus two specific
       * cuts, which hero.tsx documents at length. The rule's advice is sound
       * on a server-rendered site and inapplicable on this one, so it warns
       * rather than errors and is not silenced at the call site, where the
       * disable comment would be noise in every future diff.
       */
      '@next/next/no-img-element': 'warn',
    },
  },
];

export default config;
