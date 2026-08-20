'use client';

/**
 * Device tiering for the WebGL scene.
 *
 * The brief asks for a dedicated mobile experience rather than a shrunk desktop
 * one, and for automatic degradation on weak hardware. Everything the scene
 * scales (particle counts, DPR, post-processing, camera travel) reads from the
 * single object returned here, so there is one place to tune and one place to
 * look when something is slow.
 */

export type Tier = 'high' | 'medium' | 'low' | 'static';

export interface QualityProfile {
  tier: Tier;
  /** Renderer pixel ratio ceiling. */
  dpr: [number, number];
  /** Hero / ambient particle count. */
  particles: number;
  /** Neural network node count. */
  nodes: number;
  /** Connecting line segments drawn between nearby particles. */
  links: number;
  bloom: boolean;
  /** Multiplier on all camera travel and parallax. */
  motion: number;
  /** Whether 3D objects respond to hover / raycasting. */
  interactive: boolean;
  /** Antialiasing on the drawing buffer. */
  antialias: boolean;
}

const PROFILES: Record<Tier, Omit<QualityProfile, 'tier'>> = {
  high: {
    dpr: [1, 1.8],
    particles: 4200,
    nodes: 900,
    links: 700,
    bloom: true,
    motion: 1,
    interactive: true,
    antialias: true,
  },
  medium: {
    dpr: [1, 1.4],
    particles: 2000,
    nodes: 420,
    links: 320,
    bloom: true,
    motion: 0.85,
    interactive: true,
    antialias: false,
  },
  low: {
    dpr: [1, 1.2],
    particles: 900,
    nodes: 180,
    links: 120,
    bloom: false,
    motion: 0.55,
    interactive: false,
    antialias: false,
  },
  /** prefers-reduced-motion, or no WebGL at all. */
  static: {
    dpr: [1, 1.25],
    particles: 420,
    nodes: 90,
    links: 60,
    bloom: false,
    motion: 0,
    interactive: false,
    antialias: false,
  },
};

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export function detectTier(): Tier {
  if (typeof window === 'undefined') return 'medium';
  if (!hasWebGL()) return 'static';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'static';

  const nav = navigator as Navigator & { deviceMemory?: number };
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const narrow = window.innerWidth < 768;

  if (cores <= 4 || memory <= 4) return 'low';
  if (coarse || narrow) return 'medium';
  if (cores >= 8 && memory >= 8) return 'high';
  return 'medium';
}

export function profileFor(tier: Tier): QualityProfile {
  return { tier, ...PROFILES[tier] };
}

/**
 * Runtime downgrade. The scene samples frame time and calls this when it has
 * been consistently below target, so a device that tiers as `high` but thermally
 * throttles still ends up somewhere it can hold 60fps.
 */
export function downgrade(tier: Tier): Tier {
  if (tier === 'high') return 'medium';
  if (tier === 'medium') return 'low';
  return 'low';
}
