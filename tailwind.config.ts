import type { Config } from 'tailwindcss';

/**
 * Ported verbatim from the inline `tailwind.config` that the CDN build used,
 * so utility output is identical to the pre-conversion site.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#060606',
        bg2: '#0d0d0d',
        red: '#c8102e',
        rv: '#e8192c',
      },
      fontFamily: {
        bebas: ['var(--font-bebas)', '"Bebas Neue"', 'sans-serif'],
        grotesk: ['var(--font-grotesk)', '"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: { shell: '1400px' },
    },
  },
  plugins: [],
};

export default config;
