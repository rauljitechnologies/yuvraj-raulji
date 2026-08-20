'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { createContext, useContext, useMemo, useRef, type ReactNode } from 'react';
import * as THREE from 'three';
import type { SceneId } from '../../../lib/universe';
import { U, sceneProgress, sceneWindow } from '../store';

/**
 * A Stage is a group of objects that the camera approaches, holds in frame, and
 * then passes through as its section scrolls by.
 *
 * The alternative is parking objects at fixed world coordinates and hoping the
 * camera path frames them. It never quite does: section heights change with
 * viewport width and text wrapping, so the composition that looked right at
 * 1440px is off-centre at 1280px. Anchoring the group to the camera's own
 * forward vector and sliding it along that vector as the section scrolls keeps
 * the framing identical at every viewport, while still reading as a camera
 * flying through a world, because the group really is moving past the lens.
 *
 * Stages unmount their contents entirely when their section is out of range, so
 * only two or three scenes are ever in the draw call budget.
 */

export interface StageState {
  /** 0 to 1 across the section, 0.5 when it owns the viewport centre. */
  t: number;
  /** Visibility envelope, 1 while the section is in view. */
  w: number;
}

const StageCtx = createContext<StageState | null>(null);

export function useStage(): StageState {
  const ctx = useContext(StageCtx);
  return ctx ?? { t: 0.5, w: 1 };
}

const FORWARD = new THREE.Vector3();

export function Stage({
  scene,
  children,
  /** How far in front of the camera the group sits when the section is centred. */
  depth = 17,
  /** Total travel along the view axis across the section. Higher reads faster. */
  drift = 30,
  /**
   * World-space nudge applied at desktop widths, where the copy occupies one
   * column and the object belongs in the other. Below the breakpoint the copy
   * goes full width and the object returns to centre, so the offset has to be
   * viewport-dependent rather than baked in.
   */
  offset = [0, 0] as [number, number],
  /**
   * Extra section fraction on each side before the group is culled. Kept
   * short: at 0.5 a stage stays half-lit for a whole section either side of
   * its own, so three scenes are drawn on top of each other and the orbit's
   * spokes end up crossing the case studies.
   */
  fade = 0.22,
  /** Billboard the group to the camera. Off for objects with their own facing. */
  billboard = true,
  motion = 1,
}: {
  scene: SceneId;
  children: ReactNode;
  depth?: number;
  drift?: number;
  offset?: [number, number];
  fade?: number;
  billboard?: boolean;
  motion?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const camera = useThree((s) => s.camera);
  const state = useMemo<StageState>(() => ({ t: 0.5, w: 0 }), []);

  useFrame(() => {
    const g = group.current;
    if (!g) return;

    const w = sceneWindow(scene, fade);
    if (w <= 0.001) {
      state.w = 0;
      g.visible = false;
      return;
    }

    const t = sceneProgress(scene);
    state.t = t;

    FORWARD.set(0, 0, -1).applyQuaternion(camera.quaternion);
    const along = depth - (t - 0.5) * drift * motion;

    /*
      Every module scales its own opacity by `state.w`, so the section envelope
      is also where the near limit belongs. Drift carries a group to within a
      few units of the lens by the end of its section, and at that range a
      planet, a case-study screen or a glow plane stops being an object in a
      world and becomes a coloured wall with the next section's copy stranded on
      top of it. Dissolving over the last stretch keeps the fly-through and
      hands the frame back before the camera arrives.
    */
    const near = THREE.MathUtils.smoothstep(along, 4, 12);
    state.w = w * near;
    if (state.w <= 0.001) {
      g.visible = false;
      return;
    }
    g.visible = true;

    g.position.copy(camera.position).addScaledVector(FORWARD, along);
    if (U.vw >= 1024) {
      g.position.x += offset[0];
      g.position.y += offset[1];
    }

    if (billboard) g.quaternion.copy(camera.quaternion);
  });

  return (
    <group ref={group} visible={false}>
      <StageCtx.Provider value={state}>{children}</StageCtx.Provider>
    </group>
  );
}

/**
 * Mounts children only while the given section is anywhere near the viewport.
 * Stage handles per-frame visibility; this handles the React tree, so geometry
 * for distant scenes is never allocated in the first place.
 */
export function LazyScene({
  index,
  active,
  range = 1,
  children,
}: {
  /** Kept for readability at the call site: it names the section being gated. */
  scene: SceneId;
  index: number;
  active: number;
  range?: number;
  children: ReactNode;
}) {
  const near = Math.abs(index - active) <= range;
  return near ? <>{children}</> : null;
}
