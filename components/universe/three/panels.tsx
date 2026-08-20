'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { getHover, setHover } from '../hover';
import { U, damp } from '../store';
import { C } from './palette';
import { useStage } from './stage';

/**
 * Empty glass panels for the editorial section: the article text itself is real
 * DOM, because headlines that only exist as WebGL are invisible to search and
 * to screen readers. These are the surfaces the copy floats against, and they
 * respond to the same hover state the DOM cards drive.
 */

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */ `
  uniform float uHover;
  uniform float uFade;
  uniform vec2  uAspect;
  uniform vec3  uAccent;
  uniform vec3  uBright;
  uniform float uTime;
  varying vec2 vUv;

  float sdRoundBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }

  void main() {
    vec2 p = (vUv - 0.5) * uAspect;
    float d = sdRoundBox(p, uAspect * 0.5, 0.3);
    float inside = 1.0 - smoothstep(-0.01, 0.01, d);
    if (inside <= 0.001) discard;

    // Glass: a faint vertical gradient, warmer toward the top edge.
    float grad = smoothstep(0.0, 1.0, vUv.y);
    vec3 col = mix(vec3(0.035, 0.028, 0.031), uAccent * 0.14, grad);
    col += uAccent * 0.05 * uHover;

    float border = 1.0 - smoothstep(0.0, 0.03, abs(d));
    col += mix(uAccent, uBright, uHover) * border * (0.45 + uHover * 1.4);

    // Slow diagonal sheen.
    float sheen = smoothstep(0.45, 0.5, fract((vUv.x + vUv.y) * 0.5 - uTime * 0.03));
    col += uBright * sheen * 0.035;

    float alpha = inside * uFade * (0.62 + uHover * 0.3);
    gl_FragColor = vec4(col, alpha);
  }
`;

export interface PanelSeat {
  id: string;
  position: [number, number, number];
  size: [number, number];
  tilt?: number;
}

function Panel({ seat, interactive, motion }: { seat: PanelSeat; interactive: boolean; motion: number }) {
  const stage = useStage();
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const hover = useRef(0);

  const uniforms = useMemo(
    () => ({
      uHover: { value: 0 },
      uFade: { value: 1 },
      uAspect: { value: new THREE.Vector2(seat.size[0], seat.size[1]) },
      uAccent: { value: C.accent },
      uBright: { value: C.accentBright },
      uTime: { value: 0 },
    }),
    [seat.size],
  );

  useFrame((_, delta) => {
    const m = mesh.current;
    if (!m) return;
    const dt = Math.min(delta, 0.1);
    const t = performance.now() * 0.001;

    hover.current = damp(hover.current, getHover() === seat.id ? 1 : 0, 8, dt);
    const h = hover.current;

    m.position.set(
      seat.position[0] + Math.sin(t * 0.35 + seat.position[0]) * 0.28 * motion,
      seat.position[1] + Math.cos(t * 0.3 + seat.position[1]) * 0.3 * motion,
      seat.position[2] + h * 3.4,
    );
    m.rotation.set(
      -U.pointer.y * 0.06 * motion,
      (seat.tilt ?? 0) * (1 - h * 0.7) + U.pointer.x * 0.08 * motion,
      Math.sin(t * 0.25 + seat.position[1]) * 0.014 * motion,
    );
    m.scale.setScalar(1 + h * 0.08);

    if (mat.current) {
      mat.current.uniforms.uHover.value = h;
      mat.current.uniforms.uTime.value = t;
      mat.current.uniforms.uFade.value = stage.w;
    }
  });

  const handlers = interactive
    ? {
        onPointerOver: (e: { stopPropagation: () => void }) => {
          e.stopPropagation();
          setHover(seat.id);
          document.body.classList.add('is-pointing');
        },
        onPointerOut: () => {
          if (getHover() === seat.id) setHover(null);
          document.body.classList.remove('is-pointing');
        },
      }
    : {};

  return (
    <mesh ref={mesh} {...handlers}>
      <planeGeometry args={[seat.size[0], seat.size[1]]} />
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={VERT}
        fragmentShader={FRAG}
        transparent
        depthWrite={false}
        toneMapped={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export function GlassPanels({
  ids,
  interactive,
  motion = 1,
}: {
  ids: string[];
  interactive: boolean;
  motion?: number;
}) {
  const seats = useMemo<PanelSeat[]>(
    () =>
      ids.map((id, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        return {
          id,
          position: [(col - 1) * 7.6, row === 0 ? 2.6 : -3.0, -i * 2.4],
          size: [6.2, 4.0],
          tilt: (col - 1) * -0.22,
        };
      }),
    [ids],
  );

  return (
    <group>
      {seats.map((seat) => (
        <Panel key={seat.id} seat={seat} interactive={interactive} motion={motion} />
      ))}
    </group>
  );
}
