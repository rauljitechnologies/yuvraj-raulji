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
        accent: 'var(--accent)',
        'accent-bright': 'var(--accent-bright)',
        'accent-soft': 'var(--accent-soft)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',

        // Legacy aliases — do not use in new code
        bg: '#060606',
        bg2: '#0d0d0d',
        red: '#c8102e',
        rv: '#e8192c',
      },
      fontFamily: {
        bebas: ['var(--font-bebas)', '"Bebas Neue"', 'sans-serif'],
        grotesk: ['var(--font-grotesk)', '"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
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
      spacing: { gutter: 'var(--gutter)', section: 'var(--section-y)' },
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
