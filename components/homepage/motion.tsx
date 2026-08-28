'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useState, type ReactNode } from 'react';
import { EASE_OUT, viewportOnce } from '../../lib/motion';

/**
 * Motion used by the homepage. Three components, transform and opacity only,
 * every one of them reduced-motion aware.
 *
 * There is no scroll hijacking anywhere on this page: nothing here reads the
 * wheel, and the only scroll-linked value is the hero parallax offset. The rest
 * is `whileInView`, which is an IntersectionObserver.
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
}) {
  const reduced = useReducedMotion();

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
              className={`block ${strong ? 'yr-display__strong' : 'yr-display__soft'} ${
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
              {text}
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
      className={className}
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
      className={`block h-px w-full origin-left bg-[var(--rule)] ${className}`}
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
