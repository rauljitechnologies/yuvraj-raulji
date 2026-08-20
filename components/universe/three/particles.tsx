'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { U } from '../store';
import { C, POINT_SPRITE_FS } from './palette';

/**
 * The ambient particle ecosystem: a large, slowly breathing volume of points in
 * the brand crimson, spanning the whole camera path so the world never feels
 * like it stops between sections.
 *
 * Points rather than instanced meshes because the count is in the thousands and
 * none of them need to be shaded, picked or lit. A single draw call, one
 * additive pass, no depth writes.
 */

const VERT = /* glsl */ `
  attribute float aScale;
  attribute float aSeed;
  attribute float aTone;

  uniform float uTime;
  uniform float uSize;
  uniform float uDrift;
  uniform vec2  uPointer;
  uniform float uConverge;
  uniform vec3  uCore;

  varying float vFade;
  varying float vTone;

  void main() {
    vec3 p = position;
    float s = aSeed * 6.2831853;

    // Three incommensurate frequencies: the field never visibly loops.
    p.x += sin(uTime * 0.21 + s) * uDrift;
    p.y += cos(uTime * 0.17 + s * 1.7) * uDrift;
    p.z += sin(uTime * 0.13 + s * 2.3) * uDrift * 0.7;

    // Pointer pushes the field: a shallow parallax that reads as depth.
    p.x += uPointer.x * (1.0 + aScale) * 0.9;
    p.y += uPointer.y * (1.0 + aScale) * 0.6;

    // Final section pulls the whole universe into one point.
    p = mix(p, uCore, uConverge * (0.55 + aSeed * 0.45));

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float dist = -mv.z;

    // Fade in from the far plane and out as points pass the lens, so nothing
    // ever pops in or smears across the camera.
    vFade = smoothstep(230.0, 70.0, dist) * smoothstep(1.0, 26.0, dist);
    vTone = aTone;

    // Capped. Without a ceiling, a particle passing within a few units of the
    // lens covers a quarter of the screen and the field reads as blobs rather
    // than dust: perspective point sizing has no natural upper bound.
    gl_PointSize = min(uSize * aScale * (170.0 / max(dist, 0.001)), 22.0);
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */ `
  uniform vec3 uAccent;
  uniform vec3 uBright;
  uniform vec3 uInk;
  uniform float uOpacity;

  varying float vFade;
  varying float vTone;

  ${POINT_SPRITE_FS}

  void main() {
    float a = sprite(gl_PointCoord) * vFade * uOpacity * 0.62;
    if (a <= 0.001) discard;

    // Most of the field is the deeper accent; a minority burns brighter and a
    // few read as white-hot, which is what stops a single-hue field looking flat.
    vec3 col = mix(uAccent * 0.75, uBright, smoothstep(0.45, 0.88, vTone));
    col = mix(col, uInk, smoothstep(0.94, 1.0, vTone));

    gl_FragColor = vec4(col, a);
  }
`;

export interface ParticleFieldProps {
  count: number;
  /** Box the points are scattered through, in world units. */
  size?: [number, number, number];
  /** World-space centre of the volume. */
  center?: [number, number, number];
  pointSize?: number;
  drift?: number;
  opacity?: number;
  /** 0 to 1, collapses the whole field toward `core`. */
  converge?: number;
  /**
   * Live converge/opacity sources. Scroll-driven values must not arrive as
   * props: that would mean a React render per frame. Anything that changes
   * every frame comes in through a ref the shader reads directly.
   */
  convergeRef?: { current: number };
  opacityRef?: { current: number };
  core?: [number, number, number];
  motion?: number;
}

export function ParticleField({
  count,
  size = [190, 110, 420],
  center = [0, 0, -210],
  pointSize = 13,
  drift = 1.6,
  opacity = 1,
  converge = 0,
  convergeRef,
  opacityRef,
  core = [0, 0, 0],
  motion = 1,
}: ParticleFieldProps) {
  const mat = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const scale = new Float32Array(count);
    const seed = new Float32Array(count);
    const tone = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Cube-root bias pulls points toward the path axis, so the volume has a
      // dense spine and a sparse halo instead of uniform television static.
      const rx = (Math.random() * 2 - 1);
      const ry = (Math.random() * 2 - 1);
      pos[i * 3] = center[0] + Math.sign(rx) * Math.pow(Math.abs(rx), 1.25) * size[0] * 0.5;
      pos[i * 3 + 1] = center[1] + Math.sign(ry) * Math.pow(Math.abs(ry), 1.25) * size[1] * 0.5;
      pos[i * 3 + 2] = center[2] + (Math.random() * 2 - 1) * size[2] * 0.5;

      scale[i] = 0.35 + Math.random() * Math.random() * 1.9;
      seed[i] = Math.random();
      tone[i] = Math.random();
    }

    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aScale', new THREE.BufferAttribute(scale, 1));
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    g.setAttribute('aTone', new THREE.BufferAttribute(tone, 1));
    g.boundingSphere = new THREE.Sphere(
      new THREE.Vector3(...center),
      Math.max(size[0], size[1], size[2]),
    );
    return g;
  }, [count, size, center]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: pointSize },
      uDrift: { value: drift },
      uPointer: { value: new THREE.Vector2() },
      uConverge: { value: converge },
      uCore: { value: new THREE.Vector3(...core) },
      uAccent: { value: C.accent },
      uBright: { value: C.accentBright },
      uInk: { value: C.ink },
      uOpacity: { value: opacity },
    }),
    // Uniform objects are mutated in useFrame; this memo only builds them once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useFrame((_, delta) => {
    const m = mat.current;
    if (!m) return;
    m.uniforms.uTime.value += delta * motion;
    m.uniforms.uPointer.value.set(U.pointer.x * motion, U.pointer.y * motion);
    m.uniforms.uConverge.value = convergeRef ? convergeRef.current : converge;
    m.uniforms.uOpacity.value = opacityRef ? opacityRef.current : opacity;
    m.uniforms.uSize.value = pointSize;
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={VERT}
        fragmentShader={FRAG}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
