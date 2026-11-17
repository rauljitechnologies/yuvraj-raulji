'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useState, type ReactNode } from 'react';
import { EASE_OUT, viewportOnce } from '../../lib/motion';

/**
 * Motion used by the homepage and by every interior page's body. Transform and
 * opacity only, every component reduced-motion aware.
 *
 * There is no scroll hijacking anywhere: nothing here reads the wheel, and the
 * only scroll-linked value is the hero parallax offset. The rest is
 * `whileInView`, which is an IntersectionObserver.
 *
 * ── The `yr-rv` marker ────────────────────────────────────────────────────
 *
 * Every animated element here carries it. Motion serialises its `initial`
 * state into the server render, so a reveal ships as `opacity:0` and is
 * cleared after hydration; with scripting off it is never cleared and the
 * content stays invisible.
 *
 * The marker gives the `<noscript>` block one selector to switch all of it
 * back on. It was only on the wrappers in components/homepage-sections/rv.tsx,
 * which the homepage uses, so the homepage degraded correctly and the other 86
 * routes did not: measured against the exported HTML with JavaScript disabled,
 * a service page had 56 invisible content elements and /about/ had 45. The
 * marker is now on these three too, and `Page` renders the same `<noscript>`
 * the homepage does. See NO_SCRIPT_REVEAL_CSS.
 */

/**
 * Display headline. Each authored line rises out of its own clipped box, one
 * after the next, which is why the lines arrive as separate strings from the
 * content model rather than as one string with <br> in it.
 *
 * A line may be a plain string or `{ text, accent }`. `accent` paints that one
 * line in the primary red, which is legal here and only here: the accent is
 * 3.93:1 on the page ground, so it is restricted to text at or above 24px and
 * every headline this component renders is far above it.
 *
 * The visible text is split across several elements, so the heading carries an
 * explicit aria-label with the whole sentence: without it a screen reader
 * announces the lines as separate fragments.
 */
export type DisplayLine = string | { text: string; accent?: boolean };

const lineText = (l: DisplayLine) => (typeof l === 'string' ? l : l.text);

export function Lines({
  lines,
  as: Tag = 'h2',
  id,
  className = '',
  size = '2',
  strongFrom,
  delay = 0,
  instant = false,
}: {
  lines: readonly DisplayLine[];
  as?: 'h1' | 'h2' | 'p' | 'div';
  id?: string;
  className?: string;
  size?: '1' | '2' | '3' | 'statement';
  /**
   * Index of the line the sentence turns on. That line and everything after it
   * take the solid 600; the lines before it stay light and a shade back.
   * Defaults to the last line, which is where a headline usually lands.
   *
   * This replaces `softFrom`, which ran the other way: it dropped the trailing
   * lines to the faint tone, so an interior headline faded out exactly where
   * the homepage leans in.
   */
  strongFrom?: number;
  delay?: number;
  /**
   * Paint immediately, from CSS, with no JavaScript in the path.
   *
   * ── Why this exists ──────────────────────────────────────────────────────
   *
   * Motion serialises its `initial` state into the server render, so a heading
   * arrives in the exported HTML as `opacity:0` and is only cleared once the
   * bundle has downloaded, hydrated, and an IntersectionObserver has fired.
   * Below the fold that is exactly right, because the reader has to scroll to
   * reach it.
   *
   * Above the fold it is not. Measured on a throttled mobile profile (Slow 4G,
   * 4x CPU) against the exported site, the first viewport of every interior
   * page painted empty and its text became visible at 4.4 seconds, because the
   * 137KB bundle had to arrive first. That text is the Largest Contentful
   * Paint on those pages, so LCP was 4.4s against a 2.5s "good" threshold, on
   * a page with no images at all. It also meant the whole first screen was
   * invisible with scripting off.
   *
   * With `instant` the lines are plain spans carrying `.yr-enter`, the
   * CSS-only reveal in app/globals.css. The animation starts when the
   * stylesheet is parsed, so the heading is painted and complete about half a
   * second after first paint, needs no hydration, and cannot get stuck if the
   * bundle never lands. The note above `@keyframes yr-enter` makes the same
   * argument; this is the hook that lets a heading use it.
   *
   * Use it for the first screen. Leave it off everywhere else: it fires on
   * load, so an element 4000px down the page would have finished animating
   * long before anyone saw it.
   */
  instant?: boolean;
}) {
  const reduced = useReducedMotion();

  /* The CSS path. No motion component, so nothing here depends on the bundle.
     The per-line stagger is the same 0.09s the motion path uses, applied as an
     animation delay instead of a transition delay. */
  if (instant) {
    return (
      <Tag
        id={id}
        aria-label={lines.map(lineText).join(' ')}
        className={`yr-display yr-display--${size} ${className}`}
      >
        {lines.map((line, i) => {
          const text = lineText(line);
          const accent = typeof line !== 'string' && line.accent;
          const strong = i >= (strongFrom ?? lines.length - 1);
          return (
            <span key={text} aria-hidden="true" className="yr-linemask">
              <span
                className={`yr-enter block ${strong ? 'yr-display__strong' : 'yr-display__soft'} ${
                  accent ? 'yr-display__accent' : ''
                }`}
                style={{ animationDelay: `${delay + i * 0.09}s` }}
              >
                {/* The trailing space is load-bearing; see the note below. */}
                {text}{' '}
              </span>
            </span>
          );
        })}
      </Tag>
    );
  }

  return (
    <Tag
      id={id}
      aria-label={lines.map(lineText).join(' ')}
      className={`yr-display yr-display--${size} ${className}`}
    >
      {lines.map((line, i) => {
        const text = lineText(line);
        const accent = typeof line !== 'string' && line.accent;
        const strong = i >= (strongFrom ?? lines.length - 1);
        return (
          <span key={text} aria-hidden="true" className="yr-linemask">
            <motion.span
              className={`yr-rv block ${strong ? 'yr-display__strong' : 'yr-display__soft'} ${
                accent ? 'yr-display__accent' : ''
              }`}
              initial={reduced ? { opacity: 0 } : { y: '105%', opacity: 0 }}
              whileInView={reduced ? { opacity: 1 } : { y: '0%', opacity: 1 }}
              viewport={viewportOnce}
              transition={
                reduced
                  ? { duration: 0.01 }
                  : { duration: 0.85, ease: EASE_OUT, delay: delay + i * 0.09 }
              }
            >
              {/*
                The trailing space is deliberate and load-bearing.

                Each line is its own element, so the heading's text nodes
                concatenate with nothing between them: "How we think about it"
                followed by "matters more." read as "itmatters more." in the
                served HTML. A browser hides that because the spans are block
                boxes, but anything reading the markup without laying it out,
                which is most AI crawlers and every social scraper, sees the
                glued form. The space costs nothing visually and separates the
                lines for them.
              */}
              {text}{' '}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}

/** Fade and rise. The workhorse for everything that is not a headline. */
export function Rise({
  children,
  delay = 0,
  y = 22,
  className = '',
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'p' | 'span';
}) {
  const reduced = useReducedMotion();
  const M = motion[as];

  return (
    <M
      className={`yr-rv ${className}`}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={reduced ? { duration: 0.01 } : { duration: 0.62, ease: EASE_OUT, delay }}
    >
      {children}
    </M>
  );
}

/**
 * A horizontal hairline that draws itself in. Used to separate the parts of a
 * section without adding another border that is simply there on load.
 */
export function DrawRule({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  const reduced = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className={`yr-rv block h-px w-full origin-left bg-[var(--rule)] ${className}`}
      initial={reduced ? { opacity: 1 } : { scaleX: 0 }}
      whileInView={reduced ? { opacity: 1 } : { scaleX: 1 }}
      viewport={viewportOnce}
      transition={reduced ? { duration: 0.01 } : { duration: 1, ease: EASE_OUT, delay }}
    />
  );
}

/**
 * Adds a class the first time the element enters the viewport, and never
 * removes it. The CSS keyframe animations in app/home.css hang off that class,
 * which is how a diagram that lives 4000px down the page draws itself when it
 * is reached rather than while it is still out of sight.
 *
 * `onViewportEnter` is the same IntersectionObserver `whileInView` uses, so
 * this costs one observer and no scroll listener.
 */
export function InView({
  children,
  className = '',
  activeClassName,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  activeClassName: string;
  as?: 'div' | 'li' | 'span';
}) {
  const [seen, setSeen] = useState(false);
  const M = motion[as];

  return (
    <M
      className={`${className} ${seen ? activeClassName : ''}`}
      viewport={viewportOnce}
      onViewportEnter={() => setSeen(true)}
    >
      {children}
    </M>
  );
}
