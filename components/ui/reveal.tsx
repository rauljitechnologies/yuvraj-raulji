'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';
import type { ReactNode } from 'react';
import { fadeUp, reducedVariants, staggerChildren, viewportOnce } from '../../lib/motion';

/**
 * Scroll-reveal wrapper. The single place `whileInView` is configured, so every
 * section reveals at the same threshold with the same easing.
 *
 * When prefers-reduced-motion is set, variants collapse to an opacity fade —
 * content still renders, it just stops moving. Nothing is ever hidden.
 */
export function Reveal({
  children,
  variants = fadeUp,
  delay = 0,
  className = '',
  as = 'div',
}: {
  children: ReactNode;
  variants?: Variants;
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'span';
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={reduced ? reducedVariants : variants}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Orchestrates a staggered group. Children must be <Reveal> or motion elements
 * using the same hidden/visible state names.
 */
export function RevealGroup({
  children,
  className = '',
  each = 0.07,
  delayChildren = 0,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  each?: number;
  delayChildren?: number;
  as?: 'div' | 'ul' | 'ol' | 'section';
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={reduced ? reducedVariants : staggerChildren(each, delayChildren)}
    >
      {children}
    </MotionTag>
  );
}

/** Child item for RevealGroup — inherits the parent's stagger timing. */
export function RevealItem({
  children,
  variants = fadeUp,
  className = '',
  as = 'div',
}: {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  as?: 'div' | 'li' | 'article';
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag className={className} variants={reduced ? reducedVariants : variants}>
      {children}
    </MotionTag>
  );
}
