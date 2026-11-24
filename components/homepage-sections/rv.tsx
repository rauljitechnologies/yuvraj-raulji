import type { ReactNode } from 'react';
import { Reveal, RevealGroup, RevealItem } from '../ui/reveal';

/**
 * Thin wrappers over the shared scroll-reveal primitives that stamp a marker
 * class onto every animated element.
 *
 * Why the marker exists: a reveal is hidden by the `.yr-rv` rule in
 * app/globals.css until an IntersectionObserver adds `.yr-in`. That is correct
 * for a scripted browser and correct for crawlers, which read the DOM and
 * index text regardless of its opacity. It is wrong for a reader with
 * JavaScript disabled, who would get a blank page.
 *
 * `.yr-rv` gives the `<noscript>` block one selector to switch all of it back
 * on, and the layout's failsafe script one selector to sweep. The rule needs
 * `!important` because both are overriding a class, and it costs nothing for
 * everyone else: the noscript block is inert whenever scripting is available.
 *
 * Everything here is a server component, including what it renders. The
 * reveal used to be a Motion client component; see components/ui/reveal.tsx
 * for why it is not any more.
 */

const MARK = 'yr-rv';

export function Rv({
  children,
  className = '',
  delay,
  as,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'li' | 'section' | 'span';
}) {
  return (
    <Reveal className={`${MARK} ${className}`} delay={delay} as={as}>
      {children}
    </Reveal>
  );
}

export function RvGroup({
  children,
  className = '',
  each,
  delayChildren,
  as,
}: {
  children: ReactNode;
  className?: string;
  each?: number;
  delayChildren?: number;
  as?: 'div' | 'ul' | 'ol' | 'dl' | 'section';
}) {
  /*
     NO `MARK` here, deliberately. The group orchestrates its children; it is
     not itself a reveal. Stamping `yr-rv` on it made every child's visibility
     depend on the GROUP intersecting first as well as itself, which is a
     double gate on a container that is often taller than the viewport, and it
     nested two opacity transitions. Measured before this: the services grid
     reported 7 reveal elements for 6 cards, problems 7 for 6, insights 4 for
     3 and the stat strip 6 for 5 — the extra one in each case being the
     container.
  */
  return (
    <RevealGroup className={className} each={each} delayChildren={delayChildren} as={as}>
      {children}
    </RevealGroup>
  );
}

export function RvItem({
  children,
  className = '',
  as,
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article';
}) {
  return (
    <RevealItem className={`${MARK} ${className}`} as={as}>
      {children}
    </RevealItem>
  );
}

/**
 * Above-the-fold entrance. Same look as `Rv`, no JavaScript.
 *
 * `Rv` hides its content in the server-rendered HTML and waits for hydration
 * plus an IntersectionObserver before showing it, which is correct below the
 * fold and wrong in the first screen: until the bundle runs, the hero is
 * painted and empty. This renders the element visible-by-default and animates
 * it in from CSS, so the first screen cannot depend on JavaScript arriving.
 *
 * Not a client component, and it carries no `.yr-rv` marker, so the noscript
 * failsafe and the in-viewport sweep both leave it alone.
 */
export function Eager({
  children,
  className = '',
  delay,
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  /** Seconds, to stagger a group by hand. */
  delay?: number;
  as?: 'div' | 'span';
}) {
  return (
    <Tag
      className={`yr-enter ${className}`}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}

/**
 * The stylesheet that undoes the hidden state when scripting is off. Rendered
 * inside `<noscript>` by the homepage, so it never reaches a scripted browser.
 */
export const NO_SCRIPT_REVEAL_CSS = `.${MARK}{opacity:1!important;transform:none!important}`;
