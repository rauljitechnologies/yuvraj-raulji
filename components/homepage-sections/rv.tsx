import type { ReactNode } from 'react';
import type { Variants } from 'motion/react';
import { Reveal, RevealGroup, RevealItem } from '../ui/reveal';

/**
 * Thin wrappers over the shared scroll-reveal primitives that stamp a marker
 * class onto every animated element.
 *
 * Why the marker exists: Motion serialises its `initial` state into the markup
 * during the server render, so a reveal arrives in the HTML as
 * `style="opacity:0;transform:translateY(24px)"`. That is correct for the
 * hydrated page and correct for crawlers, which read the DOM and index text
 * regardless of its opacity. It is wrong for a reader with JavaScript disabled,
 * who would get a blank page.
 *
 * `.yr-rv` gives the `<noscript>` block on the homepage one selector to switch
 * all of it back on. The rule needs `!important` because it is overriding an
 * inline style, and it costs nothing for everyone else: the block is inert
 * whenever scripting is available.
 *
 * These stay server components. They render a client component, which creates
 * the boundary at the wrapper rather than pulling a section into the bundle.
 */

const MARK = 'yr-rv';

export function Rv({
  children,
  className = '',
  variants,
  delay,
  as,
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  as?: 'div' | 'li' | 'section' | 'span';
}) {
  return (
    <Reveal className={`${MARK} ${className}`} variants={variants} delay={delay} as={as}>
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
  as?: 'div' | 'ul' | 'ol' | 'section';
}) {
  return (
    <RevealGroup className={`${MARK} ${className}`} each={each} delayChildren={delayChildren} as={as}>
      {children}
    </RevealGroup>
  );
}

export function RvItem({
  children,
  className = '',
  variants,
  as,
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  as?: 'div' | 'li' | 'article';
}) {
  return (
    <RevealItem className={`${MARK} ${className}`} variants={variants} as={as}>
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
