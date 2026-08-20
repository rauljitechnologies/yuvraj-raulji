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
        surface: 'var(--surface)',
        elevated: 'var(--surface-elevated)',
        line: 'var(--border)',
        'line-strong': 'var(--border-strong)',
        ink: 'var(--text)',
        'ink-secondary': 'var(--text-secondary)',
        'ink-muted': 'var(--text-muted)',
        'ink-faint': 'var(--text-faint)',
        // Routed through the channel-only vars so alpha modifiers such as
        // `border-accent/30` actually compile — see the note in globals.css.
        accent: 'rgb(var(--accent-rgb) / <alpha-value>)',
        'accent-bright': 'rgb(var(--accent-bright-rgb) / <alpha-value>)',
        'accent-soft': 'var(--accent-soft)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',

        // Legacy aliases — do not use in new code
        bg: '#050505',
        bg2: '#0d0d0d',
        red: '#e50920',
        rv: '#f0263c',
      },
      fontFamily: {
        display: ['var(--font-display)', '"Bebas Neue"', 'sans-serif'],
        // Kept as an alias so any `font-bebas` still in a template resolves to
        // the display face rather than silently falling back to the system
        // stack. The site now sets all display type in Bebas Neue.
        bebas: ['var(--font-display)', '"Bebas Neue"', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        // Kept as an alias so any `font-grotesk` still in a template resolves to
        // the body face rather than silently falling back to the system stack.
        grotesk: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
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
      maxWidth: { shell: 'var(--container)' },
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
    },
  },
  plugins: [],
};

export default config;
