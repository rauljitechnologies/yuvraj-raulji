import * as THREE from 'three';

/**
 * The scene palette is the existing Yuvraj Raulji brand palette, nothing else.
 *
 * `--accent` #e50920 and `--accent-bright` #f0263c are lifted straight from
 * app/globals.css; #8c0816 is the deep crimson already used in the old hero's
 * radial wash. White and the near-black page background complete it. There is
 * no blue or purple anywhere in the 3D environment: every glow, line, particle,
 * rim light and emissive surface resolves to one of these five values.
 */

export const BRAND = {
  accent: '#e50920',
  accentBright: '#f0263c',
  deep: '#8c0816',
  ink: '#f5f5f2',
  bg: '#050505',
} as const;

export const C = {
  accent: new THREE.Color(BRAND.accent),
  accentBright: new THREE.Color(BRAND.accentBright),
  deep: new THREE.Color(BRAND.deep),
  ink: new THREE.Color(BRAND.ink),
  bg: new THREE.Color(BRAND.bg),
};

/**
 * Distance between scene anchors along the camera path, in world units. One
 * DOM section maps to one segment, so this is the constant that sets how fast
 * the world goes past.
 */
export const SEGMENT = 42;

/** Shared shader chunk: a soft circular point sprite with a hot core. */
export const POINT_SPRITE_FS = /* glsl */ `
  float sprite(vec2 uv) {
    float d = length(uv - 0.5) * 2.0;
    if (d > 1.0) discard;
    float edge = 1.0 - smoothstep(0.0, 1.0, d);
    return edge * edge;
  }
`;
