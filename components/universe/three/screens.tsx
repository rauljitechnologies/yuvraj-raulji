'use client';

import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import type { WorkItem } from '../../../lib/universe';
import { getHover, setHover } from '../hover';
import { U, damp } from '../store';
import { C } from './palette';
import { useStage } from './stage';

/**
 * The case-study gallery: real project covers mounted in floating device frames
 * that the camera flies through, rather than a row of cards.
 *
 * Each frame is a single quad. The rounded corners, the chrome bar, the inner
 * shadow and the brand border are all one signed-distance shader, so a screen
 * costs one draw call instead of the six meshes it would take to build the same
 * frame out of geometry.
 */

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uHasMap;
  uniform float uHover;
  uniform float uFade;
  uniform vec2  uAspect;   // plane size, for a corner radius that stays circular
  uniform vec3  uAccent;
  uniform vec3  uBright;
  uniform float uTime;

  varying vec2 vUv;

  // Signed distance to a rounded box centred on the origin.
  float sdRoundBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }

  void main() {
    vec2 p = (vUv - 0.5) * uAspect;
    // "half" is a reserved word in GLSL ES; naming it that compiles nowhere.
    vec2 halfSize = uAspect * 0.5;
    float radius = 0.22;

    float d = sdRoundBox(p, halfSize, radius);
    float inside = 1.0 - smoothstep(-0.012, 0.012, d);
    if (inside <= 0.001) discard;

    // Chrome bar across the top: a device frame, not a floating photo.
    float barH = 0.055;
    float inBar = step(vUv.y, 1.0) * step(1.0 - barH, vUv.y);

    // Image occupies everything below the bar, cover-fitted.
    float imgTop = 1.0 - barH;
    vec2 iuv = vec2(vUv.x, vUv.y / imgTop);
    vec3 col = uHasMap > 0.5 ? texture2D(uMap, iuv).rgb : vec3(0.05, 0.03, 0.035);

    // Grade toward the brand, and lift the whole panel on hover.
    float luma = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(col, mix(uAccent * 0.4, uBright, luma), 0.16);
    col *= 0.62 + uHover * 0.46;

    // Vignette so the panel has body rather than reading as a flat sticker.
    float vig = 1.0 - smoothstep(0.35, 1.0, length((vUv - 0.5) * 1.6));
    col *= 0.72 + vig * 0.38;

    col = mix(col, vec3(0.035, 0.03, 0.032), inBar);
    // Three window dots in the chrome bar.
    if (inBar > 0.5) {
      for (int i = 0; i < 3; i++) {
        vec2 dot0 = vec2(0.022 + float(i) * 0.019, 1.0 - barH * 0.5);
        float dd = length((vUv - dot0) * vec2(uAspect.x / uAspect.y, 1.0));
        col = mix(col, uAccent * (0.6 + float(i) * 0.2), 1.0 - smoothstep(0.004, 0.007, dd));
      }
    }

    // Brand border, brighter under the pointer.
    float border = 1.0 - smoothstep(0.0, 0.035, abs(d));
    col += mix(uAccent, uBright, uHover) * border * (0.5 + uHover * 1.5);

    // A slow specular sweep across the glass.
    float sweep = smoothstep(0.0, 0.06, abs(fract(vUv.x * 0.5 - vUv.y * 0.35 - uTime * 0.06) - 0.5) * 2.0 - 0.94);
    col += uBright * sweep * 0.12 * (0.3 + uHover);

    gl_FragColor = vec4(col, inside * uFade);
  }
`;

const W = 8.2;
const H = 5.1;

function Screen({
  item,
  slot,
  count,
  interactive,
  motion,
}: {
  item: WorkItem;
  slot: number;
  count: number;
  interactive: boolean;
  motion: number;
}) {
  const stage = useStage();
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const hover = useRef(0);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    let alive = true;
    const loader = new THREE.TextureLoader();
    loader.load(item.img, (t) => {
      if (!alive) {
        t.dispose();
        return;
      }
      t.colorSpace = THREE.SRGBColorSpace;
      t.minFilter = THREE.LinearMipmapLinearFilter;
      t.generateMipmaps = true;
      setTexture(t);
    });
    return () => {
      alive = false;
    };
  }, [item.img]);

  useEffect(() => () => texture?.dispose(), [texture]);

  const uniforms = useMemo(
    () => ({
      uMap: { value: null as THREE.Texture | null },
      uHasMap: { value: 0 },
      uHover: { value: 0 },
      uFade: { value: 1 },
      uAspect: { value: new THREE.Vector2(W, H) },
      uAccent: { value: C.accent },
      uBright: { value: C.accentBright },
      uTime: { value: 0 },
    }),
    [],
  );

  // Alternating corridor: screens stagger left and right and recede, so the
  // camera flies between them instead of past a flat wall of thumbnails.
  const base = useMemo<[number, number, number]>(() => {
    const side = slot % 2 === 0 ? -1 : 1;
    return [side * 6.4, ((slot % 3) - 1) * 2.0, -slot * 11 + (count - 1) * 2.2];
  }, [slot, count]);

  useFrame((_, delta) => {
    const m = mesh.current;
    if (!m) return;
    const dt = Math.min(delta, 0.1);
    const t = performance.now() * 0.001;

    hover.current = damp(hover.current, getHover() === item.id ? 1 : 0, 8, dt);
    const h = hover.current;

    m.position.set(
      base[0] + Math.sin(t * 0.4 + slot) * 0.3 * motion,
      base[1] + Math.cos(t * 0.33 + slot * 1.7) * 0.34 * motion,
      base[2] + h * 4.2,
    );
    // Angled inward toward the corridor centre line, then straightened on hover
    // so the panel presents itself when you point at it.
    const yaw = (base[0] > 0 ? -0.34 : 0.34) * (1 - h * 0.8);
    m.rotation.set(
      Math.sin(t * 0.3 + slot) * 0.03 * motion - U.pointer.y * 0.05 * motion,
      yaw + U.pointer.x * 0.06 * motion,
      Math.sin(t * 0.22 + slot * 2) * 0.012 * motion,
    );
    m.scale.setScalar(1 + h * 0.1);

    if (mat.current) {
      const u = mat.current.uniforms;
      u.uHover.value = h;
      u.uTime.value = t;
      u.uFade.value = stage.w;
      if (texture && u.uHasMap.value < 0.5) {
        u.uMap.value = texture;
        u.uHasMap.value = 1;
      }
    }
  });

  const handlers = interactive
    ? {
        onPointerOver: (e: { stopPropagation: () => void }) => {
          e.stopPropagation();
          setHover(item.id);
          document.body.classList.add('is-pointing');
        },
        onPointerOut: () => {
          if (getHover() === item.id) setHover(null);
          document.body.classList.remove('is-pointing');
        },
        onClick: (e: { stopPropagation: () => void }) => {
          e.stopPropagation();
          // Opened synchronously inside the gesture so it is not treated as a
          // popup. The zoom that follows plays out behind the new tab.
          window.open(item.url, '_blank', 'noopener,noreferrer');
        },
      }
    : {};

  return (
    <mesh ref={mesh} {...handlers}>
      <planeGeometry args={[W, H]} />
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

export function WorkScreens({
  items,
  interactive,
  motion = 1,
}: {
  items: WorkItem[];
  interactive: boolean;
  motion?: number;
}) {
  return (
    <group>
      {items.map((item, i) => (
        <Screen
          key={item.id}
          item={item}
          slot={i}
          count={items.length}
          interactive={interactive}
          motion={motion}
        />
      ))}
    </group>
  );
}
