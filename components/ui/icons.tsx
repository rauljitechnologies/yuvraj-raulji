import type { SVGProps } from 'react';

/**
 * The site's single icon system — see design-system/yuvraj-raulji/MASTER.md §6.
 *
 * Hand-rolled rather than pulled from a library: 13 icons do not justify a
 * dependency, and this guarantees one consistent grammar (24x24 box, 1.5 stroke,
 * round caps/joins, currentColor). Never mix in emoji, glyph characters or a
 * second icon set.
 *
 * Icons are decorative here — every one is paired with a visible text label, so
 * they carry aria-hidden and are skipped by screen readers.
 */

export type IconName =
  | 'strategy'
  | 'transformation'
  | 'architecture'
  | 'magento'
  | 'shopify'
  | 'headless'
  | 'web'
  | 'cms'
  | 'server'
  | 'performance'
  | 'seo'
  | 'analytics'
  | 'generative'
  | 'agentic';

type Props = SVGProps<SVGSVGElement> & { name: IconName; size?: number };

const paths: Record<IconName, React.ReactNode> = {
  // Compass / bearing — direction-setting
  strategy: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2.1 5-5 2.1 2.1-5z" />
    </>
  ),
  // Legacy block transforming into a modern one
  transformation: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="2" />
      <path d="M10 6.5h4.5a2 2 0 0 1 2 2V12M13.5 17.5H9a2 2 0 0 1-2-2V12" />
      <path d="m15 10.5 1.5 1.5 1.5-1.5M8.5 13.5 7 12l-1.5 1.5" />
    </>
  ),
  // Layered system blueprint
  architecture: (
    <>
      <path d="M12 3 3 7.5 12 12l9-4.5z" />
      <path d="m3 12 9 4.5L21 12M3 16.5 12 21l9-4.5" />
    </>
  ),
  // Modular commerce blocks
  magento: (
    <>
      <path d="M12 2.5 4 7v10l8 4.5 8-4.5V7z" />
      <path d="M12 21.5V12M12 12 4 7M12 12l8-5" />
    </>
  ),
  // Storefront / bag
  shopify: (
    <>
      <path d="M4.5 8h15l-1.2 11.2a2 2 0 0 1-2 1.8H7.7a2 2 0 0 1-2-1.8z" />
      <path d="M8.5 11V6.5a3.5 3.5 0 1 1 7 0V11" />
    </>
  ),
  // Decoupled front/back
  headless: (
    <>
      <rect x="3" y="4" width="8" height="7" rx="1.5" />
      <rect x="13" y="13" width="8" height="7" rx="1.5" />
      <path d="M11 7.5h3.5a2.5 2.5 0 0 1 2.5 2.5v3M13 16.5H9.5A2.5 2.5 0 0 1 7 14v-3" />
    </>
  ),
  // Code brackets
  web: (
    <>
      <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12" />
    </>
  ),
  // Content blocks in a managed layout — CMS, not a brand mark. A literal
  // WordPress/WooCommerce logo would break the stroke grammar and drag in
  // third-party trademarks.
  cms: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 9v11" />
      <path d="M12 12.5h6M12 16h4" />
    </>
  ),
  // Stacked racks
  server: (
    <>
      <rect x="3" y="4" width="18" height="6" rx="1.5" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" />
      <path d="M7 7h.01M7 17h.01M11 7h3M11 17h3" />
    </>
  ),
  // Gauge
  performance: (
    <>
      <path d="M20.5 17a9 9 0 1 0-17 0" />
      <path d="m14.5 10.5-3 4.5" />
      <circle cx="12" cy="17" r="1.2" />
    </>
  ),
  // Magnifier over rising trend
  seo: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 4.5 4.5" />
      <path d="m7.5 12 2-2.5 2 2 2.5-3" />
    </>
  ),
  // Measurement bars
  analytics: (
    <>
      <path d="M3 20h18" />
      <rect x="5" y="12" width="3.5" height="5" rx="1" />
      <rect x="10.25" y="7" width="3.5" height="10" rx="1" />
      <rect x="15.5" y="4" width="3.5" height="13" rx="1" />
    </>
  ),
  // Generative spark
  generative: (
    <>
      <path d="M12 3v3.5M12 17.5V21M3 12h3.5M17.5 12H21" />
      <path d="m6.3 6.3 2.2 2.2M15.5 15.5l2.2 2.2M17.7 6.3l-2.2 2.2M8.5 15.5l-2.2 2.2" />
      <circle cx="12" cy="12" r="3.2" />
    </>
  ),
  // Agent node planning across a workflow
  agentic: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M8.5 6h7M6.8 8.3l4 7.4M17.2 8.3l-4 7.4" />
    </>
  ),
};

export function Icon({ name, size = 24, ...rest }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}

/** Directional arrow used by CTAs. Shifts on hover via `group-hover:translate-x-1`. */
export function ArrowIcon({ size = 16, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
