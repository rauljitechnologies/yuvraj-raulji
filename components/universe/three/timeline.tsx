'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { getHover } from '../hover';
import { damp } from '../store';
import { C } from './palette';
import { useStage } from './stage';

/**
 * A glowing line running away into the world, with a marker at each milestone.
 *
 * The line draws itself as the section scrolls: `uProgress` is the scroll
 * position, and the shader keeps a hot head at the drawing edge with a cooler
 * trail behind it. Markers light as the head reaches them, so the timeline
 * reads as being travelled rather than merely displayed.
 */

const LINE_VERT = /* glsl */ `
  attribute float aT;
  varying float vT;
  void main() {
    vT = aT;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const LINE_FRAG = /* glsl */ `
  uniform float uProgress;
  uniform float uFade;
  uniform vec3  uAccent;
  uniform vec3  uBright;
  varying float vT;

  void main() {
    float drawn = step(vT, uProgress);
    // Hot head at the drawing edge, cooling into the trail behind it.
    float head = exp(-pow((uProgress - vT) * 26.0, 2.0));
    float a = drawn * (0.26 + head * 0.9) * uFade;
    if (a <= 0.004) discard;
    gl_FragColor = vec4(mix(uAccent, uBright, head), a);
  }
`;

export interface TimelineMarker {
  id: string;
  /** 0 to 1 along the line. */
  at: number;
}

export function TimelinePath({
  markers,
  motion = 1,
}: {
  markers: TimelineMarker[];
  motion?: number;
}) {
  const stage = useStage();
  const lineMat = useRef<THREE.ShaderMaterial>(null);
  const group = useRef<THREE.Group>(null);

  /** The path itself: a lazy S-curve receding into the world. */
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-7.5, -4.2, 26),
        new THREE.Vector3(-2.6, -1.4, 8),
        new THREE.Vector3(3.2, 1.1, -10),
        new THREE.Vector3(-1.8, 3.0, -28),
        new THREE.Vector3(5.6, 5.2, -46),
      ]),
    [],
  );

  const lineGeo = useMemo(() => {
    const SEGMENTS = 420;
    const pos = new Float32Array((SEGMENTS + 1) * 3);
    const t = new Float32Array(SEGMENTS + 1);
    for (let i = 0; i <= SEGMENTS; i++) {
      const k = i / SEGMENTS;
      const p = curve.getPointAt(k);
      pos.set([p.x, p.y, p.z], i * 3);
      t[i] = k;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aT', new THREE.BufferAttribute(t, 1));
    return g;
  }, [curve]);

  const markerPositions = useMemo(
    () => markers.map((m) => curve.getPointAt(Math.min(Math.max(m.at, 0), 1))),
    [markers, curve],
  );

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uFade: { value: 1 },
      uAccent: { value: C.accent },
      uBright: { value: C.accentBright },
    }),
    [],
  );

  useFrame(() => {
    if (lineMat.current) {
      lineMat.current.uniforms.uProgress.value = Math.min(Math.max(stage.t * 1.15 - 0.05, 0), 1);
      lineMat.current.uniforms.uFade.value = stage.w;
    }
    if (group.current) {
      group.current.rotation.y = Math.sin(performance.now() * 0.0002) * 0.05 * motion;
    }
  });

  return (
    <group ref={group}>
      <line>
        <primitive object={lineGeo} attach="geometry" />
        <shaderMaterial
          ref={lineMat}
          uniforms={uniforms}
          vertexShader={LINE_VERT}
          fragmentShader={LINE_FRAG}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </line>

      {markers.map((m, i) => (
        <Marker key={m.id} id={m.id} position={markerPositions[i]} at={m.at} motion={motion} />
      ))}
    </group>
  );
}

function Marker({
  id,
  position,
  at,
  motion,
}: {
  id: string;
  position: THREE.Vector3;
  at: number;
  motion: number;
}) {
  const stage = useStage();
  const ring = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);
  const lit = useRef(0);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const head = Math.min(Math.max(stage.t * 1.15 - 0.05, 0), 1);
    // Lit once the drawing head has passed, brightest while it is nearby or
    // while the matching DOM panel is hovered.
    const passed = head >= at ? 1 : 0;
    const near = Math.exp(-Math.pow((head - at) * 9, 2));
    const hovered = getHover() === id ? 1 : 0;
    lit.current = damp(lit.current, Math.max(passed * 0.45 + near * 0.55, hovered), 7, dt);

    const t = performance.now() * 0.001;
    if (ring.current) {
      ring.current.rotation.z += dt * 0.5 * motion;
      ring.current.scale.setScalar(0.7 + lit.current * 0.55);
      (ring.current.material as THREE.MeshBasicMaterial).opacity = lit.current * stage.w;
    }
    if (core.current) {
      const pulse = 1 + Math.sin(t * 2.4 + at * 9) * 0.12 * lit.current;
      core.current.scale.setScalar(pulse * (0.5 + lit.current * 0.7));
      (core.current.material as THREE.MeshBasicMaterial).opacity = (0.35 + lit.current * 0.65) * stage.w;
    }
  });

  return (
    <group position={position}>
      <mesh ref={core}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshBasicMaterial color={C.accentBright} transparent opacity={0.6} toneMapped={false} />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.62, 0.012, 8, 64]} />
        <meshBasicMaterial color={C.accentBright} transparent opacity={0} toneMapped={false} />
      </mesh>
    </group>
  );
}
