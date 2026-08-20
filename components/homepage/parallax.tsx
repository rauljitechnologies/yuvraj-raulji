'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef, type ReactNode } from 'react';

/**
 * Scroll parallax for a single element.
 *
 * `useScroll` with a target subscribes to that element's position rather than
 * to the document, so the value is already normalised and nothing here reads
 * scrollY or measures layout on every frame. The output drives `y`, which
 * motion writes as a transform, so the whole effect stays on the compositor.
 *
 * Returns the children unwrapped in a plain div when reduced motion is set;
 * the element still renders, it just holds still.
 */
export function Parallax({
  children,
  /** Total travel in pixels across the element's full pass through the viewport. */
  distance = 60,
  className = '',
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance / 2, -distance / 2]);

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ y, willChange: 'transform' }} className={className}>
      {children}
    </motion.div>
  );
}
