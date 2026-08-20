'use client';

import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  FOUNDER_PORTRAIT,
  getFounderMedia,
  subscribeFounderMedia,
  type FounderMode,
} from '../founder-media';
import { U } from '../store';
import { C } from './palette';

/**
 * The founder frame: a circular pane of the real footage, suspended in the
 * world behind a glass rim, which at the end of the intro shatters into
 * particles that fly out and join the surrounding ecosystem.
 *
 * The dissolve is one geometry, not a video-to-particle conversion pass: a disc
 * of points that samples the same texture in its vertex shader, so each particle
 * carries the colour of the pixel it came from. The pane and the particles cross
 * fade against each other, which is what sells it as the image breaking apart
 * rather than one thing fading into a different thing.
 */

const DISC_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const DISC_FRAG = /* glsl */ `
  uniform sampler2D uMap;
  uniform vec2  uUvScale;
  uniform vec2  uUvOffset;
  uniform float uReveal;
  uniform float uDissolve;
  uniform float uTime;
  uniform vec3  uAccent;
  uniform vec3  uBright;
  uniform float uHasMap;

  varying vec2 vUv;

  void main() {
    vec2 c = vUv - 0.5;
    float r = length(c) * 2.0;
    if (r > 1.0) discard;

    vec2 uv = (vUv - 0.5) * uUvScale + 0.5 + uUvOffset;
    vec3 col = uHasMap > 0.5 ? texture2D(uMap, uv).rgb : vec3(0.06);

    // Brand grade: lift the highlights toward the bright accent and let the
    // shadows fall to the deep accent, so the footage belongs to this palette
    // instead of sitting on top of it as a foreign rectangle.
    float luma = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(col, mix(uAccent * 0.55, uBright, luma), 0.20);

    // Rim: a hot brand edge where the pane meets the world.
    float rim = smoothstep(0.72, 1.0, r);
    col += uBright * rim * 0.55;

    // Feathered edge, never a hard circular cut.
    float mask = 1.0 - smoothstep(0.86, 1.0, r);

    // Reveal wipes outward from the centre as the frame forms.
    float reveal = smoothstep(r - 0.35, r, uReveal * 1.35);

    // Scanline breathing, very low amplitude. Reads as a live feed.
    float scan = 0.97 + 0.03 * sin(vUv.y * 420.0 + uTime * 2.2);

    float a = mask * reveal * (1.0 - uDissolve) * scan;
    if (a <= 0.003) discard;
    gl_FragColor = vec4(col, a);
  }
`;

const DUST_VERT = /* glsl */ `
  attribute float aSeed;
  attribute vec3 aDir;

  uniform sampler2D uMap;
  uniform vec2  uUvScale;
  uniform vec2  uUvOffset;
  uniform float uDissolve;
  uniform float uTime;
  uniform float uSize;
  uniform float uHasMap;

  varying vec3  vCol;
  varying float vAlpha;

  void main() {
    // Radius of this point on the disc, in 0..1, drives when it lets go: the
    // outer edge disintegrates first and the face holds longest.
    float r = length(position.xy) / 3.4;
    float lag = smoothstep(0.0, 1.0, uDissolve * 1.9 - (1.0 - r) * 0.75 - aSeed * 0.25);

    vec3 p = position + aDir * lag * (7.0 + aSeed * 26.0);
    p.z += lag * (2.0 + aSeed * 9.0);
    p.x += sin(uTime * 0.6 + aSeed * 14.0) * lag * 1.6;
    p.y += cos(uTime * 0.5 + aSeed * 11.0) * lag * 1.6;

    vec2 uv = (position.xy / 6.8 + 0.5 - 0.5) * uUvScale + 0.5 + uUvOffset;
    vec3 src = uHasMap > 0.5 ? texture2D(uMap, uv).rgb : vec3(0.5, 0.06, 0.11);
    vCol = src;

    // Bright at release, gone by the time it reaches the ecosystem.
    vAlpha = smoothstep(0.0, 0.15, lag) * (1.0 - smoothstep(0.45, 1.0, lag));

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = uSize * (1.0 + aSeed) * (300.0 / max(-mv.z, 0.001));
    gl_Position = projectionMatrix * mv;
  }
`;

const DUST_FRAG = /* glsl */ `
  uniform vec3 uBright;
  varying vec3  vCol;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    if (d > 1.0) discard;
    float s = 1.0 - smoothstep(0.0, 1.0, d);
    float a = s * s * vAlpha;
    if (a <= 0.003) discard;
    // Push the released pixels toward the brand accent as they travel, so the
    // debris resolves into the ecosystem's own colour.
    vec3 col = mix(vCol, uBright, 0.45);
    gl_FragColor = vec4(col, a);
  }
`;

const RADIUS = 3.4;
const DUST_COUNT_HIGH = 9000;

/**
 * `reveal` and `dissolve` are read from the shared frame state rather than
 * passed as props: they change every frame during the intro, and routing them
 * through React would re-render the 3D tree sixty times a second for two
 * numbers that only the shader consumes.
 */
export function FounderFrame({
  dust = DUST_COUNT_HIGH,
  motion = 1,
}: {
  dust?: number;
  motion?: number;
}) {
  const discMat = useRef<THREE.ShaderMaterial>(null);
  const dustMat = useRef<THREE.ShaderMaterial>(null);
  const group = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);

  const [mode, setMode] = useState<FounderMode>('none');
  const textureRef = useRef<THREE.Texture | null>(null);

  /* ── texture: video when available, still portrait otherwise ─────────── */
  useEffect(() => {
    let disposed = false;

    const apply = () => {
      const media = getFounderMedia();
      if (disposed) return;

      if (media.mode === 'video' && media.video) {
        const t = new THREE.VideoTexture(media.video);
        t.colorSpace = THREE.SRGBColorSpace;
        t.minFilter = THREE.LinearFilter;
        t.magFilter = THREE.LinearFilter;
        textureRef.current?.dispose();
        textureRef.current = t;
        setMode('video');
        return;
      }

      if (media.mode === 'portrait') {
        new THREE.TextureLoader().load(FOUNDER_PORTRAIT, (t) => {
          if (disposed) return;
          t.colorSpace = THREE.SRGBColorSpace;
          textureRef.current?.dispose();
          textureRef.current = t;
          setMode('portrait');
        });
      }
    };

    apply();
    const unsub = subscribeFounderMedia(apply);
    return () => {
      disposed = true;
      unsub();
      textureRef.current?.dispose();
      textureRef.current = null;
    };
  }, []);

  /* ── dust geometry ───────────────────────────────────────────────────── */
  const dustGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(dust * 3);
    const dir = new Float32Array(dust * 3);
    const seed = new Float32Array(dust);

    for (let i = 0; i < dust; i++) {
      // sqrt keeps the sampling uniform over area rather than clumping at the
      // centre, which would leave the outer ring visibly bald.
      const r = Math.sqrt(Math.random()) * RADIUS;
      const a = Math.random() * Math.PI * 2;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      pos.set([x, y, 0], i * 3);

      const d = new THREE.Vector3(x, y, 0).normalize();
      d.x += (Math.random() - 0.5) * 0.55;
      d.y += (Math.random() - 0.5) * 0.55;
      d.z = Math.random() * 0.5 - 0.1;
      d.normalize();
      dir.set([d.x, d.y, d.z], i * 3);
      seed[i] = Math.random();
    }

    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aDir', new THREE.BufferAttribute(dir, 3));
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 60);
    return g;
  }, [dust]);

  const shared = useMemo(
    () => ({
      uMap: { value: null as THREE.Texture | null },
      uUvScale: { value: new THREE.Vector2(1, 1) },
      uUvOffset: { value: new THREE.Vector2(0, 0) },
      uHasMap: { value: 0 },
      uTime: { value: 0 },
    }),
    [],
  );

  const discUniforms = useMemo(
    () => ({
      ...shared,
      uReveal: { value: 0 },
      uDissolve: { value: 0 },
      uAccent: { value: C.accent },
      uBright: { value: C.accentBright },
    }),
    [shared],
  );

  const dustUniforms = useMemo(
    () => ({
      ...shared,
      uDissolve: { value: 0 },
      uSize: { value: 5.5 },
      uBright: { value: C.accentBright },
    }),
    [shared],
  );

  useFrame((_, delta) => {
    const dt = delta * motion;
    const tex = textureRef.current;
    const reveal = U.intro;
    const dissolve = U.dissolve;

    if (tex) {
      shared.uMap.value = tex;
      shared.uHasMap.value = 1;

      // Cover-fit: crop the long axis instead of squashing the subject. A face
      // stretched to a square is the single most obvious tell of a video that
      // was dropped into a shape it was not shot for.
      const img = tex.image as { videoWidth?: number; videoHeight?: number; width?: number; height?: number } | null;
      const w = img?.videoWidth || img?.width || 0;
      const h = img?.videoHeight || img?.height || 0;
      if (w && h) {
        const aspect = w / h;
        if (aspect >= 1) shared.uUvScale.value.set(1 / aspect, 1);
        else shared.uUvScale.value.set(1, aspect);
        // Bias the crop upward: heads sit above the centre of frame.
        shared.uUvOffset.value.set(0, mode === 'portrait' ? 0.06 : 0.04);
      }
    } else {
      shared.uHasMap.value = 0;
    }

    shared.uTime.value += dt;
    if (discMat.current) {
      discMat.current.uniforms.uReveal.value = reveal;
      discMat.current.uniforms.uDissolve.value = dissolve;
    }
    if (dustMat.current) {
      dustMat.current.uniforms.uDissolve.value = dissolve;
    }

    if (group.current) {
      // Slight parallax against the pointer, plus an idle float. The frame is
      // an object in the world, so it must not sit perfectly still.
      const t = performance.now() * 0.001;
      group.current.position.x = U.pointer.x * 0.55 * motion;
      group.current.position.y = U.pointer.y * 0.38 * motion + Math.sin(t * 0.6) * 0.12 * motion;
      group.current.rotation.y = U.pointer.x * 0.10 * motion;
      group.current.rotation.x = -U.pointer.y * 0.07 * motion;
      group.current.rotation.z = Math.sin(t * 0.35) * 0.012 * motion;
    }

    const ringFade = reveal * (1 - dissolve);
    if (ringA.current) {
      ringA.current.rotation.z += dt * 0.14;
      (ringA.current.material as THREE.MeshBasicMaterial).opacity = ringFade * 0.85;
      ringA.current.scale.setScalar(0.94 + reveal * 0.06);
    }
    if (ringB.current) {
      ringB.current.rotation.z -= dt * 0.07;
      (ringB.current.material as THREE.MeshBasicMaterial).opacity = ringFade * 0.28;
    }
  });

  return (
    <group ref={group}>
      {/* Footage pane */}
      <mesh>
        <circleGeometry args={[RADIUS, 96]} />
        <shaderMaterial
          ref={discMat}
          uniforms={discUniforms}
          vertexShader={DISC_VERT}
          fragmentShader={DISC_FRAG}
          transparent
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Glass rim */}
      <mesh ref={ringA}>
        <torusGeometry args={[RADIUS * 1.045, 0.028, 12, 160]} />
        <meshBasicMaterial color={C.accentBright} transparent opacity={0} toneMapped={false} />
      </mesh>
      <mesh ref={ringB}>
        <torusGeometry args={[RADIUS * 1.17, 0.012, 8, 160]} />
        <meshBasicMaterial color={C.accent} transparent opacity={0} toneMapped={false} />
      </mesh>

      {/* The pane, as particles */}
      <points geometry={dustGeo} frustumCulled={false}>
        <shaderMaterial
          ref={dustMat}
          uniforms={dustUniforms}
          vertexShader={DUST_VERT}
          fragmentShader={DUST_FRAG}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </points>
    </group>
  );
}
