'use client';

import Lenis from 'lenis';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { SCENES, type SceneId } from '../../lib/universe';
import { detectTier, downgrade, profileFor, type QualityProfile, type Tier } from './quality';
import { U, clamp01, damp } from './store';

/**
 * Owns everything that ticks: smooth scroll, section measurement, pointer
 * damping, active-section tracking and the runtime performance guard.
 *
 * One rAF loop drives all of it. The WebGL scene runs its own loop (r3f's) and
 * only reads `U`, so the two never fight over ownership of the frame.
 */

interface UniverseAPI {
  profile: QualityProfile;
  active: number;
  activeId: SceneId;
  /** True once the founder intro has finished or been skipped. */
  introDone: boolean;
  markIntroDone: () => void;
  /** Replays the founder intro from the top. */
  replayIntro: () => void;
  /** Incremented on every replay so the intro component can reset. */
  replayKey: number;
  hovered: string | null;
  setHovered: (id: string | null) => void;
  scrollTo: (target: string) => void;
  reducedMotion: boolean;
}

const Ctx = createContext<UniverseAPI | null>(null);

export function useUniverse(): UniverseAPI {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useUniverse must be used inside <UniverseProvider>');
  return ctx;
}

const INTRO_SEEN_KEY = 'yr:intro-seen';

/**
 * Whether the intro should be treated as already over, resolved for the very
 * first render rather than in an effect.
 *
 * This mirrors the pre-paint script in the root layout that sets
 * `intro-pending`, and it must be decided before the first commit: flipping the
 * flag true → false afterwards tore down the hero's entrance animations in the
 * same tick they were created, and an abandoned GSAP `from` tween leaves its
 * opacity stamped on the element, so the H1 stayed invisible for the rest of
 * the session. Nothing here changes the markup, so the static HTML and the
 * hydrated tree still agree.
 */
function resolveIntroDone(): boolean {
  if (typeof window === 'undefined') return true;
  let seen = false;
  try {
    seen = sessionStorage.getItem(INTRO_SEEN_KEY) === '1';
  } catch {
    seen = false;
  }
  return seen || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function UniverseProvider({ children }: { children: React.ReactNode }) {
  const [tier, setTier] = useState<Tier>('medium');
  const [active, setActive] = useState(0);
  const [hovered, setHoveredState] = useState<string | null>(null);
  const [introDone, setIntroDone] = useState(resolveIntroDone);
  const [replayKey, setReplayKey] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const lenisRef = useRef<Lenis | null>(null);
  const tierRef = useRef<Tier>('medium');

  /* ── tier + reduced motion, resolved once on the client ─────────────── */
  useEffect(() => {
    /*
      The page is one continuous camera move, so being dropped back into the
      middle of it on reload is disorienting: the browser restores a scroll
      offset, the intro starts playing over the technology section, and the
      camera snaps to wherever that offset happens to land. A deep link with a
      hash is still honoured; only the "restore where you were" behaviour goes.
    */
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    if (!window.location.hash) window.scrollTo(0, 0);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    U.reducedMotion = reduced;
    setReducedMotion(reduced);

    const t = detectTier();
    tierRef.current = t;
    setTier(t);

    // Intro plays once per browsing session, never on every scroll. The flag
    // itself was already resolved by `resolveIntroDone` for the first render;
    // this only carries the same answer into the shared frame state.
    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_SEEN_KEY) === '1';
    } catch {
      seen = false;
    }
    if (seen || reduced) document.documentElement.classList.remove('intro-pending');
    if (!seen && !reduced) {
      U.intro = 0;
      U.introDone = false;
    } else {
      U.intro = 1;
      U.dissolve = 1;
      U.introDone = true;
    }
  }, []);

  /* ── measurement ─────────────────────────────────────────────────────── */
  const measure = useCallback(() => {
    U.vh = window.innerHeight;
    U.vw = window.innerWidth;
    const docTop = window.scrollY;
    for (const id of SCENES) {
      const el = document.querySelector<HTMLElement>(`[data-scene="${id}"]`);
      if (!el) continue;
      const box = el.getBoundingClientRect();
      U.rects[id] = { top: box.top + docTop, height: box.height };
    }
  }, []);

  /* ── smooth scroll ───────────────────────────────────────────────────── */
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      // Native scrolling only. `U.scrollY` still needs feeding.
      const onScroll = () => {
        U.scrollY = window.scrollY;
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }

    const lenis = new Lenis({
      /*
        Continuous damping, not a timed animation per input.

        `duration` + `easing` restarts a fixed-length eased tween on every wheel
        event, and an eased tween decelerates to a stop: one notch of the wheel
        glided for over a second and then settled, so a page of full-height
        sections moved in discrete hops and read as slide-to-slide scrolling
        rather than as scrolling. `lerp` instead damps the current offset toward
        the target every frame, so held or repeated input accumulates smoothly
        and the page never comes to rest between one screen and the next. The
        value is the per-frame fraction: lower is heavier, higher is snappier.
      */
      lerp: 0.085,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      // Native scroll on touch: Lenis' touch emulation fights momentum
      // scrolling on iOS and makes the page feel heavier, not smoother.
      syncTouch: false,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      U.scrollY = scroll;
    });

    /*
      The enquiry modal and the mobile menu lock scrolling by putting
      `is-locked` on <html>, which sets `overflow: hidden`. Lenis scrolls by
      setting scrollTop programmatically and is entirely unaffected by that, so
      without this the world keeps travelling behind an open modal. Watching the
      class rather than wiring a prop keeps the two overlay owners (UIProvider
      and the nav) from both needing to know Lenis exists.
    */
    const root = document.documentElement;
    const syncLock = () => {
      if (root.classList.contains('is-locked')) lenis.stop();
      else lenis.start();
    };
    syncLock();
    const lockObserver = new MutationObserver(syncLock);
    lockObserver.observe(root, { attributes: true, attributeFilter: ['class'] });

    return () => {
      lockObserver.disconnect();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* ── the single rAF loop ─────────────────────────────────────────────── */
  useEffect(() => {
    measure();

    let raf = 0;
    let last = performance.now();
    let activeSeen = -1;

    // Performance guard: if we spend 90 consecutive frames over budget, drop a
    // tier. Deliberately slow to trigger so a single GC pause cannot demote a
    // capable machine.
    let slowFrames = 0;
    let downgraded = false;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;

      lenisRef.current?.raf(now);

      const max = Math.max(document.documentElement.scrollHeight - U.vh, 1);
      U.progress = clamp01(U.scrollY / max);

      // Pointer damping. Lambda is low enough that the camera glides rather
      // than tracking the cursor one-to-one, which is what makes it read as
      // premium instead of twitchy.
      U.pointer.x = damp(U.pointer.x, U.pointerRaw.x, 3.2, dt);
      U.pointer.y = damp(U.pointer.y, U.pointerRaw.y, 3.2, dt);

      // Active section: the one whose measured box contains the viewport centre.
      const centre = U.scrollY + U.vh * 0.5;
      let idx = 0;
      for (let i = 0; i < SCENES.length; i++) {
        const r = U.rects[SCENES[i]];
        if (!r) continue;
        if (centre >= r.top && centre < r.top + r.height) {
          idx = i;
          break;
        }
        if (centre >= r.top) idx = i;
      }
      U.active = idx;
      if (idx !== activeSeen) {
        activeSeen = idx;
        setActive(idx);
      }

      if (!downgraded && tierRef.current !== 'static') {
        if (dt > 0.032) slowFrames++;
        else slowFrames = Math.max(0, slowFrames - 1);
        if (slowFrames > 90) {
          downgraded = true;
          const next = downgrade(tierRef.current);
          tierRef.current = next;
          setTier(next);
        }
      }
    };

    raf = requestAnimationFrame(tick);

    const onResize = () => measure();
    const onPointer = (e: PointerEvent) => {
      U.pointerRaw.x = (e.clientX / window.innerWidth) * 2 - 1;
      U.pointerRaw.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onLeave = () => {
      U.pointerRaw.x = 0;
      U.pointerRaw.y = 0;
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    // Sections change height as fonts and images land.
    const ro = new ResizeObserver(() => measure());
    ro.observe(document.body);
    const settle = window.setTimeout(measure, 600);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('pointerleave', onLeave);
      ro.disconnect();
      window.clearTimeout(settle);
    };
  }, [measure]);

  const markIntroDone = useCallback(() => {
    U.introDone = true;
    setIntroDone(true);
    // Hands the hero back to the copy. Set by the pre-paint script in the root
    // layout; cleared here and nowhere else.
    document.documentElement.classList.remove('intro-pending');
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, '1');
    } catch {
      /* private mode: the intro simply replays next session */
    }
  }, []);

  const replayIntro = useCallback(() => {
    U.intro = 0;
    U.dissolve = 0;
    U.introDone = false;
    setIntroDone(false);
    document.documentElement.classList.add('intro-pending');
    setReplayKey((k) => k + 1);
    lenisRef.current?.scrollTo(0, { immediate: false });
    if (U.reducedMotion) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const setHovered = useCallback((id: string | null) => {
    U.hovered = id;
    setHoveredState(id);
  }, []);

  const scrollTo = useCallback((target: string) => {
    const el = document.querySelector<HTMLElement>(target);
    if (!el) return;
    if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: -10 });
    else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const value = useMemo<UniverseAPI>(
    () => ({
      profile: profileFor(tier),
      active,
      activeId: SCENES[active] ?? SCENES[0],
      introDone,
      markIntroDone,
      replayIntro,
      replayKey,
      hovered,
      setHovered,
      scrollTo,
      reducedMotion,
    }),
    [tier, active, introDone, markIntroDone, replayIntro, replayKey, hovered, setHovered, scrollTo, reducedMotion],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
