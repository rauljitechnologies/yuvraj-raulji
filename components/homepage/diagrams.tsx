import type { CSSProperties, ReactElement } from 'react';
import type { CommerceDiagram } from '../../lib/home';

/**
 * Six drawings, one per commerce module.
 *
 * These are not icons. Each one is a small diagram of the idea the module is
 * about: how the parts sit, what connects to what, which way the thing moves.
 * That is why they are hand-authored inline SVG rather than pulled from a set,
 * and why each differs in structure rather than in glyph.
 *
 * Every stroked shape carries `data-draw` and a `--dash`, which app/home.css
 * uses as both the dash array and the starting dash offset so the shape draws
 * itself once when the module scrolls into view.
 *
 * `--dash` must be at least the shape's own path length. A dash array shorter
 * than the path leaves the finished stroke visibly dashed rather than solid,
 * which is the one way this technique fails silently, so every value below is
 * the measured length rounded generously up. `--delay` then staggers them into
 * a legible order: the structure lands before the thing moving through it.
 */

const S = (dash: number, delay = 0): CSSProperties =>
  ({ '--dash': dash, '--delay': `${delay}s` }) as CSSProperties;

const base = {
  viewBox: '0 0 120 76',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
} as const;

/** Shopify: speed. Streaks compressing into a single forward vector. */
function Velocity() {
  return (
    <svg {...base}>
      <line data-draw style={S(64, 0)} x1="6" y1="22" x2="62" y2="22" opacity=".35" />
      <line data-draw style={S(86, 0.08)} x1="6" y1="38" x2="82" y2="38" opacity=".55" />
      <line data-draw style={S(54, 0.16)} x1="6" y1="54" x2="52" y2="54" opacity=".35" />
      <path data-draw style={S(58, 0.3)} d="M86 38h24m-9-9 9 9-9 9" />
      <circle data-pulse cx="110" cy="38" r="4" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Magento: composition. Modules nested inside a system boundary. */
function Modules() {
  return (
    <svg {...base}>
      <rect data-draw style={S(348, 0)} x="6" y="8" width="108" height="60" opacity=".3" />
      <rect data-draw style={S(108, 0.14)} x="16" y="18" width="30" height="20" />
      <rect data-draw style={S(94, 0.2)} x="16" y="44" width="30" height="14" opacity=".55" />
      <rect data-draw style={S(132, 0.26)} x="56" y="18" width="22" height="40" opacity=".55" />
      <rect data-draw style={S(124, 0.32)} x="88" y="18" width="18" height="40" />
      <line data-draw style={S(14, 0.42)} x1="46" y1="28" x2="56" y2="28" />
      <line data-draw style={S(14, 0.48)} x1="78" y1="38" x2="88" y2="38" />
      <circle data-pulse cx="97" cy="38" r="3.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Headless: one system, cut in two, still talking across the seam.
 *
 * The seam is the only stroke in the set that is meant to stay dashed, so it is
 * deliberately not a `data-draw` element: the CSS dash array would override its
 * own and turn it solid. It fades in with the module instead.
 */
function Split() {
  return (
    <svg {...base}>
      <rect data-draw style={S(184, 0)} x="6" y="14" width="40" height="48" opacity=".55" />
      <rect data-draw style={S(184, 0.08)} x="74" y="14" width="40" height="48" opacity=".55" />
      <line x1="60" y1="6" x2="60" y2="70" strokeDasharray="3 5" opacity=".4" />
      <path data-draw style={S(32, 0.28)} d="M46 30h28" />
      <path data-draw style={S(32, 0.36)} d="M74 46H46" />
      <circle data-pulse cx="60" cy="30" r="3.5" fill="currentColor" stroke="none" />
      <circle data-pulse cx="60" cy="46" r="3.5" fill="currentColor" stroke="none" opacity=".5" />
    </svg>
  );
}

/** AI commerce: a question in, a ranked answer out. */
function Query() {
  return (
    <svg {...base}>
      <rect data-draw style={S(258, 0)} x="6" y="8" width="108" height="16" opacity=".45" />
      <line data-draw style={S(30, 0.12)} x1="16" y1="16" x2="42" y2="16" opacity=".7" />
      <line data-draw style={S(76, 0.26)} x1="6" y1="40" x2="76" y2="40" strokeWidth="3.4" />
      <line data-draw style={S(52, 0.34)} x1="6" y1="52" x2="52" y2="52" opacity=".5" />
      <line data-draw style={S(36, 0.42)} x1="6" y1="63" x2="36" y2="63" opacity=".3" />
      <circle data-pulse cx="88" cy="40" r="4.5" fill="currentColor" stroke="none" />
      <path data-draw style={S(18, 0.5)} d="M98 40h12" opacity=".5" />
    </svg>
  );
}

/** Checkout: the narrowing, and the places people fall out of it. */
function Funnel() {
  return (
    <svg {...base}>
      <path data-draw style={S(330, 0)} d="M8 10h104L70 46v24l-20-8V46z" opacity=".5" />
      <line data-draw style={S(18, 0.26)} x1="30" y1="24" x2="16" y2="24" opacity=".8" />
      <line data-draw style={S(18, 0.32)} x1="90" y1="24" x2="104" y2="24" opacity=".8" />
      <line data-draw style={S(16, 0.38)} x1="48" y1="38" x2="34" y2="38" opacity=".55" />
      <circle data-pulse cx="60" cy="66" r="3.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Retention: the loop, closing. */
function Cycle() {
  return (
    <svg {...base}>
      <path data-draw style={S(96, 0)} d="M60 12a26 26 0 0 1 0 52" />
      <path data-draw style={S(96, 0.14)} d="M60 64a26 26 0 0 1 0-52" opacity=".45" />
      <path data-draw style={S(22, 0.34)} d="m54 16 6-4 4 6" />
      <path data-draw style={S(22, 0.4)} d="m66 60-6 4-4-6" opacity=".55" />
      <circle data-pulse cx="60" cy="38" r="5" fill="currentColor" stroke="none" />
      <circle data-draw style={S(96, 0.5)} cx="60" cy="38" r="14" opacity=".28" />
    </svg>
  );
}

const MAP: Record<CommerceDiagram, () => ReactElement> = {
  velocity: Velocity,
  modules: Modules,
  split: Split,
  query: Query,
  funnel: Funnel,
  cycle: Cycle,
};

/**
 * The diagram is decorative: the module's label, its three beats and its note
 * already carry the meaning in text, so repeating it in an SVG title would only
 * make a screen reader say everything twice.
 */
export function Diagram({ kind }: { kind: CommerceDiagram }) {
  const Drawing = MAP[kind];
  return <Drawing />;
}
