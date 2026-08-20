'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { useEffect, useRef, type ReactNode } from 'react';
import type { SceneId } from '../../lib/universe';

/**
 * DOM primitives for the 3D homepage.
 *
 * The rule this file exists to enforce: all copy is real, selectable, crawlable
 * HTML sitting above the canvas. The WebGL layer never renders a word of it.
 * That is what keeps the page indexable and usable with a screen reader while
 * still looking like a 3D environment.
 *
 * Sections are `pointer-events: none` so the canvas underneath can receive
 * hover; controls opt back in. See the `.u-section` rules in globals.css.
 */

let registered = false;
function ensureGsap() {
  if (registered || typeof window === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;

  /*
    Triggers are created while web fonts are still loading, so every start
    position is computed against a layout that is about to change. Without a
    refresh once things settle, a group whose trigger point moved above the
    viewport never fires and its content stays at opacity 0 forever, which is
    the worst possible failure mode for body copy.
  */
  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener('load', refresh);
  if (document.fonts?.ready) void document.fonts.ready.then(refresh);
  window.setTimeout(refresh, 1200);
}

/* ═══════════════════════════════════════════════════════════════
   SceneSection — one DOM section, bound to one 3D stage by id.
   ═══════════════════════════════════════════════════════════════ */

export function SceneSection({
  id,
  scene,
  children,
  className = '',
  labelledBy,
  /** Taller sections give their 3D module more camera travel. */
  tall = false,
}: {
  id?: string;
  scene: SceneId;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
  tall?: boolean;
}) {
  return (
    <section
      id={id}
      data-scene={scene}
      aria-labelledby={labelledBy}
      className={`u-section ${tall ? 'u-section--tall' : ''} ${className}`}
    >
      <div className="u-shell">{children}</div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Reveal — scroll-driven entrance.
   ═══════════════════════════════════════════════════════════════ */

export function Reveal({
  children,
  className = '',
  /** Seconds of delay before this group starts. */
  delay = 0,
  /** Per-child stagger. Children are the direct element children. */
  stagger = 0.08,
  y = 34,
  as: Tag = 'div',
  enabled = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  y?: number;
  as?: 'div' | 'ul' | 'ol';
  /**
   * Gate for content that is hidden when the page loads. The hero is covered
   * by the founder intro for the first ten seconds; building its trigger
   * immediately means the entrance plays behind the intro and the copy simply
   * appears when the intro lifts, having already used up its reveal.
   */
  enabled?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(el.children, { opacity: 1, y: 0 });
      return;
    }

    ensureGsap();
    const targets = Array.from(el.children);
    if (!targets.length) return;

    const anim = gsap.from(targets, {
      opacity: 0,
      y,
      duration: 0.9,
      delay,
      stagger,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: el,
        // Fires as the group crosses the lower third, which lines up with the
        // moment its 3D module has finished arriving.
        start: 'top 82%',
        once: true,
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      /*
        `kill()` on its own abandons the tween wherever it happens to be and
        leaves that frame's values stamped inline, so a group torn down while it
        was fading in stays half transparent for the rest of the session. That
        is the same failure the refresh above exists to avoid, arriving by a
        different route. `revert()` hands the elements back to the stylesheet.
      */
      anim.revert();
    };
  }, [delay, stagger, y, enabled]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}

/** Word-by-word masked reveal for display headings. */
export function SplitHeading({
  text,
  className = '',
  as: Tag = 'h2',
  id,
  accentFrom,
  enabled = true,
}: {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
  id?: string;
  /** Word index from which the accent colour takes over. */
  accentFrom?: number;
  /** See the note on Reveal's `enabled`. */
  enabled?: boolean;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const words = text.split(' ');

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    ensureGsap();
    const spans = el.querySelectorAll('.u-word > span');
    const anim = gsap.from(spans, {
      yPercent: 116,
      duration: 1.05,
      stagger: 0.045,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 86%', once: true },
    });

    return () => {
      anim.scrollTrigger?.kill();
      // See the note in Reveal: a killed word tween would leave the heading
      // sitting outside its own clipping box.
      anim.revert();
    };
  }, [text, enabled]);

  return (
    <Tag ref={ref as never} id={id} className={`u-display ${className}`}>
      {words.map((w, i) => (
        // The space lives outside the clipping box: inside it, the trailing
        // space collapses and the heading reads as one run-on word to a screen
        // reader and to text selection.
        <span key={`${w}-${i}`}>
          <span className={`u-word ${accentFrom !== undefined && i >= accentFrom ? 'is-accent' : ''}`}>
            <span>{w}</span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Controls
   ═══════════════════════════════════════════════════════════════ */

type CTAProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'ghost';
  className?: string;
  external?: boolean;
  'aria-label'?: string;
};

export function CTA({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  external = false,
  ...rest
}: CTAProps) {
  const cls = `u-cta u-cta--${variant} ${className}`;

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
        <span>{children}</span>
      </a>
    );
  }
  if (href && href.startsWith('#')) {
    // The href stays real so the link works without JavaScript and is
    // crawlable; the handler only upgrades the jump to a smooth one.
    return (
      <a
        href={href}
        className={cls}
        onClick={
          onClick
            ? (e) => {
                e.preventDefault();
                onClick();
              }
            : undefined
        }
        {...rest}
      >
        <span>{children}</span>
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} className={cls} {...rest}>
        <span>{children}</span>
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls} {...rest}>
      <span>{children}</span>
    </button>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="u-eyebrow">
      <span aria-hidden="true" className="u-eyebrow-rule" />
      {children}
    </p>
  );
}
