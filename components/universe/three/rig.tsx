'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { SCENES, type SceneId } from '../../../lib/universe';
import { U, damp } from '../store';
import { SEGMENT } from './palette';

/**
 * The camera walks a single continuous path through the world. Scroll does not
 * cut between scenes; it advances a floating-point position along that path, so
 * section 3 is literally 3 × SEGMENT further into the world than section 0.
 *
 * The float index is derived from the *measured DOM sections* rather than raw
 * page progress. That matters: sections differ in height, and deriving the path
 * position from page progress alone would make the camera arrive early at tall
 * sections and late at short ones, which is exactly the drift that makes
 * scroll-linked 3D feel unmoored from its own copy.
 */
export function journeyIndex(): number {
  const centre = U.scrollY + U.vh * 0.5;
  let idx = 0;
  for (let i = 0; i < SCENES.length; i++) {
    const r = U.rects[SCENES[i] as SceneId];
    if (!r || r.height <= 0) continue;
    if (centre < r.top) break;
    const t = (centre - r.top) / r.height;
    idx = i + Math.min(Math.max(t, 0), 1);
  }
  return idx;
}

/** World-space anchor for a scene, on the camera path. */
export function anchorZ(index: number): number {
  return -index * SEGMENT;
}

/** Lateral wander of the path, so the journey curves instead of running straight. */
export function pathX(i: number): number {
  return Math.sin(i * 0.85) * 3.4 + Math.sin(i * 0.31 + 1.2) * 1.6;
}

export function pathY(i: number): number {
  return Math.cos(i * 0.62) * 2.0 + Math.sin(i * 0.24) * 0.9;
}

export function CameraRig({ motion }: { motion: number }) {
  const camera = useThree((s) => s.camera);
  const look = useRef(new THREE.Vector3());
  const pos = useRef({ x: 0, y: 0, z: 0 });
  const ready = useRef(false);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const i = journeyIndex();

    // Target point on the path, plus a small pointer-driven offset. The offset
    // is intentionally understated: enough that the world acknowledges the
    // cursor, not so much that it swims.
    const tx = pathX(i) * motion + U.pointer.x * 1.7 * motion;
    const ty = pathY(i) * motion + U.pointer.y * 1.0 * motion;
    const tz = anchorZ(i) + 12;

    if (!ready.current) {
      pos.current = { x: tx, y: ty, z: tz };
      ready.current = true;
    }

    // Z tracks scroll tightly so the world stays locked to the copy; X and Y
    // lag, which is what produces the drifting, hand-held camera feel.
    pos.current.x = damp(pos.current.x, tx, 3.0, dt);
    pos.current.y = damp(pos.current.y, ty, 3.0, dt);
    pos.current.z = damp(pos.current.z, tz, 12.0, dt);
    camera.position.set(pos.current.x, pos.current.y, pos.current.z);

    // Look further down the path than the camera currently is, so turns are
    // anticipated rather than reacted to.
    const ahead = i + 0.55;
    look.current.set(
      pathX(ahead) * motion * 0.7 + U.pointer.x * 0.9 * motion,
      pathY(ahead) * motion * 0.7 + U.pointer.y * 0.55 * motion,
      anchorZ(ahead) - 6,
    );
    camera.lookAt(look.current);

    // A touch of roll. Without it the path reads as a dolly on rails.
    camera.rotation.z += Math.sin(i * 0.5) * 0.045 * motion;
  });

  return null;
}
