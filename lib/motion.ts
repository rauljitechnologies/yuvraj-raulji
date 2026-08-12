import type { Transition, Variants } from 'motion/react';

/**
 * Centralized motion configuration — see design-system/yuvraj-raulji/MASTER.md §5.
 * Components import these variants; they never define their own easing or durations.
 * One easing family, three duration levels. Transform + opacity only.
 */

export const EASE_OUT = [0.16, 1, 0.3, 1] as const; // Expo-out, entrances
export const EASE_INOUT = [0.65, 0, 0.35, 1] as const; // state changes

/** Level 1 — micro-interactions (hover, icon shift, border). */
export const DUR_MICRO = 0.2;
/** Level 2 — component animation (stagger, tabs, modal, stats). */
export const DUR_COMPONENT = 0.38;
/** Level 3 — hero entrance, scroll storytelling. */
export const DUR_STORY = 0.9;

export const transition = (duration = DUR_COMPONENT): Transition => ({
  duration,
  ease: EASE_OUT,
});

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition() },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transition() },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: transition() },
};

export const slideIn: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: transition() },
};

/** Masked editorial reveal for display headings. */
export const reveal: Variants = {
  hidden: { opacity: 0, y: '110%' },
  visible: { opacity: 1, y: '0%', transition: transition(DUR_STORY) },
};

/** SVG path draw — pair with pathLength on a <motion.path>. */
export const drawLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.2, ease: EASE_OUT }, opacity: { duration: 0.2 } },
  },
};

/** Parent orchestrator. Children must use a variant with the same state names. */
export const staggerChildren = (each = 0.07, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: each, delayChildren } },
});

/**
 * Reduced-motion fallback: same state names, opacity only, effectively instant.
 * Every animated component swaps to these when useReducedMotion() is true, so
 * content still appears — it just stops moving.
 */
export const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};

/**
 * Shared viewport config so every scroll reveal triggers at the same point.
 *
 * `amount` is a fraction of the *target's own height*, so a numeric threshold
 * silently breaks on tall containers: a 13-item grid ~2500px high would need
 * 625px visible at amount 0.25, which never happens in a 714px viewport until
 * the user has already scrolled past the top of the grid. 'some' fires as soon
 * as any part enters, which is correct for both short and tall targets.
 */
export const viewportOnce = { once: true, amount: 'some' } as const;
