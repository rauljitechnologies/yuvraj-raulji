import type { ReactNode } from 'react';

/**
 * Scroll reveal. CSS transition plus one IntersectionObserver, no library.
 *
 * ══════════════════════════════════════════════════════════════════════════
 * WHY THIS IS NOT MOTION ANY MORE
 * ══════════════════════════════════════════════════════════════════════════
 *
 * These three components were `motion.div` wrappers with `whileInView` and a
 * variant set from lib/motion.ts. That worked and cost 192 KB of JavaScript on
 * the homepage, plus a `'use client'` boundary on every section that used it,
 * to fade elements up by 24px as they enter the viewport. Measured against the
 * brief's Performance 90+ target, Motion was the second largest item in
 * "reduce unused JavaScript" after the enquiry modal.
 *
 * Nothing here needed the library. The whole surface in use across the site
 * was: fade up, stagger a group, delay one element. No caller passed a custom
 * variant, no reveal was interruptible, nothing was draggable or spring-driven
 * and nothing read scroll progress. That is a CSS transition and a class.
 *
 * ── What replaced it ─────────────────────────────────────────────────────
 *
 *   .yr-rv        the hidden state and the transition, in app/globals.css
 *   .yr-in        added by the observer when the element enters the viewport
 *   .yr-rv-group  sets the per-child stagger from --rv-each
 *
 * The observer is eight lines of raw script in app/layout.tsx, next to the
 * failsafe that was already there. It is `unobserve`d on first intersection,
 * so a revealed element costs nothing afterwards, which is what `once: true`
 * did before.
 *
 * ── These are server components now ──────────────────────────────────────
 *
 * That is the second half of the win. `Reveal` had to be a client component
 * because `useReducedMotion()` is a hook; reduced motion is a media query, so
 * CSS answers it directly in globals.css and no JavaScript needs to know. The
 * homepage's nine sections are now server components all the way down, and
 * the only client code the page ships is the nav's scroll state and the
 * WhatsApp button.
 *
 * ── Why the stagger is nth-child and not an index prop ───────────────────
 *
 * The group does not know its children's order without cloning them, and
 * cloning to inject an index would make every caller's children opaque to
 * React's reconciler for the sake of a number CSS can already count. The
 * delays are generated for the first 24 children in globals.css, which is
 * more than any group on the site has.
 */

export function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  /** Seconds. */
  delay?: number;
  as?: 'div' | 'li' | 'section' | 'span';
}) {
  return (
    <Tag
      className={`yr-rv ${className}`}
      style={delay ? ({ '--rv-delay': `${delay}s` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}

/**
 * Staggers its children. The group itself is not hidden — only the items are,
 * which is what the Motion version did too (its parent variant set no
 * properties, it only orchestrated the children).
 */
export function RevealGroup({
  children,
  className = '',
  each = 0.07,
  delayChildren = 0,
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  /** Seconds between children. */
  each?: number;
  /** Seconds before the first child. */
  delayChildren?: number;
  as?: 'div' | 'ul' | 'ol' | 'dl' | 'section';
}) {
  return (
    <Tag
      className={`yr-rv-group ${className}`}
      style={
        {
          '--rv-each': `${each}s`,
          ...(delayChildren ? { '--rv-dc': `${delayChildren}s` } : null),
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}

/** Child of `RevealGroup`. Its delay comes from the parent's stagger. */
export function RevealItem({
  children,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article';
}) {
  return <Tag className={`yr-rv ${className}`}>{children}</Tag>;
}
