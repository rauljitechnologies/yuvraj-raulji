import type { Config } from 'tailwindcss';

/**
 * REDESIGN V2 — the utility layer over the token set.
 *
 * ── The one rule ───────────────────────────────────────────────────────────
 *
 * Every value here resolves to a custom property declared in the `:root`
 * block of app/globals.css. Nothing in this file states a colour, a font
 * family, a type size or a section padding of its own, so there is exactly
 * one place any of those four things can be changed.
 *
 * ── What `theme` vs `theme.extend` means here ─────────────────────────────
 *
 * `colors`, `fontFamily`, `fontSize`, `spacing`, `borderRadius` and
 * `maxWidth` are declared OUTSIDE `extend`, which replaces Tailwind's
 * defaults rather than adding to them. That is deliberate and it is what
 * makes the design system strict instead of advisory:
 *
 *   `bg-red-500`, `text-slate-400`, `font-sans`, `text-2xl`, `p-7`,
 *   `rounded-2xl` and `max-w-prose` no longer compile.
 *
 * Before this, the full default palette and the full default 35-step spacing
 * scale were both available alongside the tokens, and the homepage used 38
 * distinct ad-hoc vertical spacing values as a result. A design system that
 * leaves the alternative compiling is a suggestion.
 *
 * `screens`, `keyframes`, `animation`, `zIndex`, `boxShadow` and
 * `transitionTimingFunction` stay inside `extend`, because for those the
 * defaults are additive rather than competing.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    /* ── COLOUR ───────────────────────────────────────────────────────────
       Six palette values and the semantic names over them. `transparent`,
       `current`, `inherit`, `white` and `black` are kept: the first three are
       not colours, and white/black are needed for text on a primary fill and
       for mask stops.

       `<alpha-value>` wiring: a Tailwind v3 colour whose value is a bare
       `var()` cannot take an alpha modifier, so every colour an alpha
       modifier is used against is routed through its channel-only token
       (`--primary-rgb` and friends). That is why `border-accent/30`,
       `text-ink/70` and `bg-ground/85` compile. */
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',
      white: '#ffffff',
      black: '#000000',

      /* The palette, by its own name. Use these when the colour is the point
         (a red rule, the off-white plate) rather than the role. */
      primary: 'rgb(var(--primary-rgb) / <alpha-value>)',
      'primary-bright': 'rgb(var(--primary-bright-rgb) / <alpha-value>)',
      'primary-deep': 'var(--primary-deep)',
      'near-black': 'rgb(var(--near-black-rgb) / <alpha-value>)',
      'off-white': 'rgb(var(--off-white-rgb) / <alpha-value>)',
      'grey-900': 'var(--grey-900)',
      'grey-500': 'rgb(var(--grey-500-rgb) / <alpha-value>)',
      'grey-300': 'var(--grey-300)',

      /* The roles. Use these for anything that has to invert correctly
         between the dark and the light band — which is most things. Inside a
         `.theme-light` section `bg-ground` paints off-white and `text-ink`
         paints near-black, with no class change at the call site. */
      ground: 'rgb(var(--bg-rgb) / <alpha-value>)',
      surface: 'var(--surface)',
      elevated: 'var(--surface-elevated)',
      line: 'var(--border)',
      'line-strong': 'var(--border-strong)',
      ink: 'rgb(var(--text-rgb) / <alpha-value>)',
      'ink-secondary': 'var(--text-secondary)',
      'ink-muted': 'var(--text-muted)',
      'ink-faint': 'var(--text-faint)',
      accent: 'rgb(var(--accent-rgb) / <alpha-value>)',
      'accent-bright': 'rgb(var(--accent-bright-rgb) / <alpha-value>)',
      'accent-deep': 'var(--accent-deep)',
      'accent-soft': 'var(--accent-soft)',
      error: 'var(--error)',

      /* Legacy aliases. Do not use in new code; each resolves to a role
         above, so none of them can drift. Removed as their last call site
         goes. */
      bg: 'var(--bg)',
      bg2: 'var(--surface)',
      red: 'var(--accent)',
      rv: 'var(--accent-bright)',
    },

    /* ── TYPE FACES ───────────────────────────────────────────────────────
       Three roles. `display`, `manrope`, `serif`, `bebas` and `grotesk` are
       the names 400+ existing call sites use; each is aliased to the role it
       was doing, which is what let Manrope and Newsreader be removed without
       touching those call sites. */
    fontFamily: {
      heading: ['var(--font-heading)'],
      body: ['var(--font-body)'],
      mono: ['var(--font-mono)'],

      /* Aliases. */
      sans: ['var(--font-body)'],
      display: ['var(--font-heading)'],
      serif: ['var(--font-heading)'],
      bebas: ['var(--font-heading)'],
      manrope: ['var(--font-body)'],
      grotesk: ['var(--font-body)'],
    },

    /* ── TYPE SCALE ───────────────────────────────────────────────────────
       Six sizes, each paired with the line height it is always set at, so
       `text-h1` carries 1.1 and `text-body` carries 1.6 without a second
       class. The eyebrow carries its tracking too, for the same reason.

       `text-xs` through `text-9xl` are gone. Every `text-[13px]`,
       `text-[clamp(34px,4.6vw,68px)]` and `text-[.60rem]` on the site is
       therefore a compile-visible exception rather than an invisible one, and
       the 14px floor the brief sets is enforceable. */
    fontSize: {
      h1: ['var(--fs-h1)', { lineHeight: 'var(--lh-heading)', letterSpacing: 'var(--tracking-h1)' }],
      h2: ['var(--fs-h2)', { lineHeight: 'var(--lh-heading)', letterSpacing: 'var(--tracking-h2)' }],
      h3: ['var(--fs-h3)', { lineHeight: 'var(--lh-heading)' }],
      body: ['var(--fs-body)', { lineHeight: 'var(--lh-body)' }],
      small: ['var(--fs-small)', { lineHeight: 'var(--lh-body)' }],
      eyebrow: [
        'var(--fs-eyebrow)',
        { lineHeight: '1.3', letterSpacing: 'var(--tracking-eyebrow)' },
      ],
    },

    /* ── SHAPE ────────────────────────────────────────────────────────────
       One card radius. `rounded`, `rounded-md` and `rounded-lg` all resolve
       to the same 8px so the three names left in the templates cannot
       produce three different cards. */
    borderRadius: {
      none: '0',
      DEFAULT: 'var(--radius)',
      sm: 'var(--r-sm)',
      md: 'var(--radius)',
      lg: 'var(--radius)',
      xl: 'var(--radius)',
      '2xl': 'var(--r-2xl)',
      full: 'var(--r-full)',
    },

    /* ── MEASURE AND WIDTH ────────────────────────────────────────────────
       `shell` is the 1200px container; `measure` is the 65ch prose cap.
       Both come from the token set, so a page cannot be 1400px wide by
       writing `max-w-[1400px]` without that showing up in a diff. */
    maxWidth: {
      none: 'none',
      0: '0',
      full: '100%',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
      shell: 'var(--container)',
      measure: 'var(--measure)',
      /* Narrower measures, for a lede or a card paragraph that should break
         before 65ch. Still `ch`, so they stay face-relative. */
      'measure-sm': '45ch',
      'measure-md': '55ch',
    },

    extend: {
      /* ── SPACING ────────────────────────────────────────────────────────
         The eight steps the brief allows for a component gap are exactly
         Tailwind's own 1 / 2 / 3 / 4 / 6 / 8 / 12 / 16 keys:

           gap-1   4px     gap-6   24px
           gap-2   8px     gap-8   32px
           gap-3  12px     gap-12  48px
           gap-4  16px     gap-16  64px

         so the rule needs no new keys, it needs the OTHER keys not to be
         used. This is an `extend` rather than a replacement, deliberately,
         and the reason is worth writing down:

         Tailwind derives width, height, inset, translate and flex-basis from
         the same `spacing` scale as padding, margin and gap. Replacing the
         scale to delete `py-7` also deletes `w-11`, `h-9`, `top-24` and
         `size-5`, which are sizes rather than spacing choices and which 1,300
         call sites across 89 routes depend on. The homepage would have been
         strict and the other 88 routes would have been broken.

         So the eight-step rule is enforced where the brief asks for it — on
         the homepage — by `scripts/check-design-system.mjs`, which fails the
         build on a padding, margin or gap utility outside the eight steps in
         any homepage file. A rule a script checks is a rule; a rule in a
         comment is a preference. The same script enforces the 14px type
         floor and the no-raw-colour rule on the same files.

         `section`, `gutter` and `header` are the three layout tokens.
         `section` is the ONE section padding value: 64px on a phone, 96px
         from md, declared once in app/globals.css. */
      spacing: {
        section: 'var(--section-py)',
        gutter: 'var(--container-px)',
        header: 'var(--header-h)',
        'header-sm': 'var(--header-h-scrolled)',
      },
      boxShadow: {
        'header-rule': 'var(--shadow-header-rule)',
        card: 'var(--shadow-card)',
        lifted: 'var(--shadow-lifted)',
        accent: 'var(--shadow-accent)',
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
        inout: 'var(--ease-inout)',
      },
      zIndex: {
        sticky: '40',
        header: '50',
        modal: '90',
        toast: '100',
      },
      /* `lg` is 1024 and `xl` is 1280, which are two of the four widths the
         brief requires nothing to overflow at; `2xl` is 1440, the third.
         `nav` at 1100px is the one addition: it is where the header swaps
         from the link row to the hamburger, and it is a named breakpoint
         rather than an arbitrary value so the bar and the menu button can
         never be told different numbers. */
      screens: {
        xs: '390px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        /* The nav breakpoint. 1100px until the guideline moved the hamburger
           to "below 768px only", which is `md`; it is kept as its own name
           because ~20 class names across the header compile against it and
           the name says what it is for. */
        nav: '768px',
        xl: '1280px',
        '2xl': '1440px',
      },
      /**
       * Ambient loops carried over from the original design canvas. These are
       * decorative and infinite, so they are CSS rather than Motion: Motion is
       * reserved for the scroll-triggered reveals, which need to know about the
       * viewport. Every consumer is `aria-hidden` or purely visual.
       *
       * `prefers-reduced-motion` is honoured globally in app/globals.css, which
       * collapses animation-duration for the whole document, so none of these
       * need their own media query.
       */
      keyframes: {
        'yr-dash': {
          '0%': { strokeDashoffset: '620' },
          '55%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '-620' },
        },
        'yr-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'yr-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.15' },
        },
        'yr-sweep': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
      },
      animation: {
        'yr-dash': 'yr-dash 7s linear infinite',
        'yr-dash-slow': 'yr-dash 12s linear infinite',
        'yr-float': 'yr-float 9s ease-in-out infinite',
        'yr-blink': 'yr-blink 2.6s ease-in-out infinite',
        'yr-sweep': 'yr-sweep 2.4s var(--ease-out) both',
      },
    },
  },
  plugins: [],
};

export default config;
