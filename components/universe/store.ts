'use client';

import type { SceneId } from '../../lib/universe';

/**
 * Mutable frame state shared between the smooth-scroll driver, the WebGL scene
 * and the DOM overlays.
 *
 * This is deliberately a plain mutable object rather than React state. The
 * scene reads it inside useFrame at 60fps; routing that through React would
 * re-render the whole tree every frame. Only coarse, low-frequency facts
 * (which section is active, whether the intro has finished) go through React,
 * via the provider below.
 */

export interface SceneRect {
  top: number;
  height: number;
}

export interface UniverseState {
  /** Smoothed scroll offset in px, from Lenis when it is running. */
  scrollY: number;
  /** 0 at the top of the document, 1 at the bottom. */
  progress: number;
  vh: number;
  vw: number;
  /** Measured layout box of every `[data-scene]` section. */
  rects: Partial<Record<SceneId, SceneRect>>;
  /** Pointer in normalized device coords, already damped. */
  pointer: { x: number; y: number };
  /** Raw pointer, updated straight from the event. */
  pointerRaw: { x: number; y: number };
  /** 0 to 1 across the founder intro timeline. */
  intro: number;
  /** 0 to 1 as the video frame dissolves into the particle field. */
  dissolve: number;
  /** True once the intro has handed over to the hero headline. */
  introDone: boolean;
  reducedMotion: boolean;
  /** Index of the scene nearest the viewport centre. */
  active: number;
  /** Set by the hovered 3D object so DOM panels can follow, and vice versa. */
  hovered: string | null;
}

export const U: UniverseState = {
  scrollY: 0,
  progress: 0,
  vh: 1,
  vw: 1,
  rects: {},
  pointer: { x: 0, y: 0 },
  pointerRaw: { x: 0, y: 0 },
  intro: 0,
  dissolve: 0,
  introDone: false,
  reducedMotion: false,
  active: 0,
  hovered: null,
};

/**
 * Local progress through one section: 0 when the section's top edge reaches the
 * viewport centre, 1 when its bottom edge does. Values outside [0, 1] mean the
 * section is above or below the centre line, which the modules use to fade
 * themselves in and out, so the range is not clamped here.
 *
 * Returns a large negative number for sections that have not been measured yet,
 * which keeps their modules parked off-screen instead of flashing at the origin
 * on the first frame.
 */
export function sceneProgress(id: SceneId): number {
  const r = U.rects[id];
  if (!r || r.height <= 0) return -999;
  return (U.scrollY + U.vh * 0.5 - r.top) / r.height;
}

/** Smoothstep-style 0→1→0 window, 1 while the section owns the viewport. */
export function sceneWindow(id: SceneId, fade = 0.45): number {
  const t = sceneProgress(id);
  if (t < -998) return 0;
  const d = Math.abs(t - 0.5);
  const edge = 0.5 + fade;
  if (d >= edge) return 0;
  if (d <= 0.5) return 1;
  const k = 1 - (d - 0.5) / fade;
  return k * k * (3 - 2 * k);
}

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/** Frame-rate independent damping. */
export function damp(current: number, target: number, lambda: number, dt: number): number {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}
