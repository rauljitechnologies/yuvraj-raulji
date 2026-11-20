import type { Config } from 'tailwindcss';

/**
 * Token → utility mapping. Source of truth for the values themselves is the
 * :root block in app/globals.css (see design-system/yuvraj-raulji/MASTER.md).
 * `bg`/`bg2`/`red`/`rv` are kept as aliases so pre-existing sections keep
 * compiling while they are migrated section by section.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Semantic tokens
        // Routed through the channel-only var so `text-ground/60` and the
        // hairlines on the white bands compile. Same reason as `ink` below.
        ground: 'rgb(var(--bg-rgb) / <alpha-value>)',
        surface: 'var(--surface)',
        elevated: 'var(--surface-elevated)',
        line: 'var(--border)',
        'line-strong': 'var(--border-strong)',
        ink: 'rgb(var(--text-rgb) / <alpha-value>)',
        'ink-secondary': 'var(--text-secondary)',
        'ink-muted': 'var(--text-muted)',
        'ink-faint': 'var(--text-faint)',
        // Routed through the channel-only vars so alpha modifiers such as
        // `border-accent/30` actually compile — see the note in globals.css.
        accent: 'rgb(var(--accent-rgb) / <alpha-value>)',
        'accent-bright': 'rgb(var(--accent-bright-rgb) / <alpha-value>)',
        'accent-deep': 'var(--accent-deep)',
        'accent-soft': 'var(--accent-soft)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',

        // Legacy aliases — do not use in new code. Routed through the tokens
        // rather than repeating hex values, so the Phase 1 palette reaches the
        // pages that still carry these classes.
        bg: 'var(--bg)',
        bg2: 'var(--surface)',
        red: 'var(--accent)',
        rv: 'var(--accent-bright)',
      },
      fontFamily: {
        /*
         * One sans face under every name it is already called by.
         *
         * Three sans families were loaded until the typography was
         * consolidated: Manrope on the content pages (356 uses), Space
         * Grotesk in the chrome (28), and Inter as the document default (1).
         * The header and footer were therefore set in a different face from
         * the page they sat on. See the note in app/layout.tsx for the counts
         * and the reasoning.
         *
         * `display`, `body` and `manrope` all resolve to Manrope now. The
         * names are kept because the utilities stay meaningful: `font-display`
         * is still where a heading declares itself, it is simply no longer a
         * different family. `bebas` and `grotesk` remain as aliases for the
         * same reason they always were, and both are now down to zero uses in
         * templates.
         */
        display: ['var(--font-display)', 'Manrope', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        manrope: ['var(--font-manrope)', 'Manrope', 'system-ui', 'sans-serif'],
        bebas: ['var(--font-display)', 'Manrope', 'system-ui', 'sans-serif'],
        grotesk: ['var(--font-body)', 'Manrope', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        display: 'var(--fs-display)',
        h2: 'var(--fs-h2)',
        h3: 'var(--fs-h3)',
        'body-lg': 'var(--fs-body-lg)',
        label: 'var(--fs-label)',
      },
      borderRadius: {
        sm: 'var(--r-sm)',
        md: 'var(--r-md)',
        lg: 'var(--r-lg)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        lifted: 'var(--shadow-lifted)',
        accent: 'var(--shadow-accent)',
      },
      maxWidth: { shell: 'var(--container)', measure: '62ch' },
      spacing: {
        gutter: 'var(--gutter)',
        section: 'var(--section-y)',
        // Semantic vertical rhythm — see the block in globals.css for what
        // each step is for. Use these rather than a numeric step for any
        // gap that separates content; the numeric scale stays available for
        // one-off optical corrections.
        hair: 'var(--sp-hair)',
        tight: 'var(--sp-tight)',
        item: 'var(--sp-item)',
        block: 'var(--sp-block)',
        head: 'var(--sp-head)',
        grid: 'var(--sp-grid)',
        tail: 'var(--sp-tail)',
        card: 'var(--sp-card)',
        /* Section padding, the same value `.yr-section` uses in home.css.
           The homepage sections are plain <section> elements with their own
           bands rather than `.yr-section`, and each invented its own: four
           different `lg:py` values across seven variants, stepping at
           breakpoints where the rest of the site scales fluidly. */
        pad: 'var(--pad-y)',
        'pad-tall': 'var(--pad-y-tall)',
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
      screens: {
        xs: '390px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
      /**
       * Ambient loops carried over from the homepage design canvas. These are
       * decorative and infinite, so they are CSS rather than Framer Motion:
       * Motion is reserved for the scroll-triggered reveals, which need to know
       * about the viewport. Every consumer is `aria-hidden` or purely visual.
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
        // Travels exactly half the track; the track renders its content twice,
        // so the wrap is invisible.
        'yr-marquee': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
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
        'yr-marquee': 'yr-marquee 34s linear infinite',
        'yr-blink': 'yr-blink 2.6s ease-in-out infinite',
        'yr-sweep': 'yr-sweep 2.4s var(--ease-out) both',
      },
    },
  },
  plugins: [],
};

export default config;
