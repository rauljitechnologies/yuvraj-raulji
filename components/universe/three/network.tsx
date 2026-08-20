'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { C, POINT_SPRITE_FS } from './palette';

/**
 * A node network that assembles itself as you scroll, then collapses into a
 * single core.
 *
 * Both scroll-driven states are shader uniforms rather than CPU work: `uConnect`
 * reveals each edge in a pre-baked order, `uCompress` pulls every node toward
 * the origin. Nothing is rebuilt per frame, so the same component carries the
 * 180-node phone version and the 900-node desktop one at the same cost per
 * frame on the CPU side.
 */

const NODE_VERT = /* glsl */ `
  attribute float aScale;
  attribute float aSeed;

  uniform float uTime;
  uniform float uSize;
  uniform float uCompress;
  uniform float uBreathe;

  varying float vFade;
  varying float vHot;

  void main() {
    vec3 p = position;
    float s = aSeed * 6.2831853;
    p += vec3(sin(uTime * 0.4 + s), cos(uTime * 0.33 + s * 1.6), sin(uTime * 0.27 + s * 2.1)) * uBreathe;
    p = mix(p, vec3(0.0), uCompress);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float dist = -mv.z;

    /*
      Two limits, both of which the ambient field already applies and this
      shader was missing. The stage carries the network to within a few units
      of the lens by the end of its section, and at that distance the
      perspective term alone gives sprites two hundred pixels across: a dozen
      of them, additive, saturate to white and swallow the copy sitting on top.
      The near fade dissolves nodes as they pass the camera instead of letting
      them fill the frame, and the clamp is the backstop.
    */
    vFade = smoothstep(180.0, 30.0, dist) * smoothstep(1.0, 9.0, dist);
    vHot = aSeed;

    gl_PointSize = min(uSize * aScale * (300.0 / max(dist, 0.001)) * (1.0 + uCompress * 1.4), 34.0);
    gl_Position = projectionMatrix * mv;
  }
`;

const NODE_FRAG = /* glsl */ `
  uniform vec3 uAccent;
  uniform vec3 uBright;
  uniform float uOpacity;

  varying float vFade;
  varying float vHot;

  ${POINT_SPRITE_FS}

  void main() {
    float a = sprite(gl_PointCoord) * vFade * uOpacity;
    if (a <= 0.001) discard;
    vec3 col = mix(uAccent, uBright, smoothstep(0.4, 0.95, vHot));
    gl_FragColor = vec4(col, a);
  }
`;

const LINE_VERT = /* glsl */ `
  attribute float aOrder;
  attribute float aEnd;
  attribute float aSeed;

  uniform float uTime;
  uniform float uConnect;
  uniform float uCompress;
  uniform float uFlow;

  varying float vAlpha;

  void main() {
    vec3 p = mix(position, vec3(0.0), uCompress);

    // Edges appear in a stable pre-baked order, so the network assembles the
    // same way every time rather than shimmering at random.
    float appear = smoothstep(aOrder, aOrder + 0.14, uConnect);

    // A packet of energy runs the length of each edge.
    float head = fract(uTime * 0.34 + aSeed);
    float d = abs(aEnd - head);
    d = min(d, 1.0 - d);
    float energy = exp(-d * d * 90.0) * uFlow;

    vAlpha = appear * (0.13 + energy);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const LINE_FRAG = /* glsl */ `
  uniform vec3 uAccent;
  uniform float uOpacity;
  varying float vAlpha;

  void main() {
    float a = vAlpha * uOpacity;
    if (a <= 0.002) discard;
    gl_FragColor = vec4(uAccent, a);
  }
`;

/** Scratch vector for the core's distance test; reused so the frame allocates nothing. */
const CORE_POS = new THREE.Vector3();

export interface NetworkProps {
  nodes: number;
  links: number;
  radius?: number;
  /** 0 to 1: how much of the network has wired itself up. */
  connect?: number;
  /** 0 to 1: collapse into the central core. */
  compress?: number;
  opacity?: number;
  /**
   * Scroll-driven equivalents of the three above. Anything that changes every
   * frame arrives by ref so the 3D tree is never re-rendered for it.
   */
  connectRef?: { current: number };
  compressRef?: { current: number };
  opacityRef?: { current: number };
  /** Brightness of the travelling energy packets. */
  flow?: number;
  breathe?: number;
  pointSize?: number;
  /** Show the glowing core the network compresses into. */
  core?: boolean;
  motion?: number;
}

export function Network({
  nodes,
  links,
  radius = 13,
  connect = 1,
  compress = 0,
  opacity = 1,
  connectRef,
  compressRef,
  opacityRef,
  flow = 1,
  breathe = 0.35,
  pointSize = 15,
  core = false,
  motion = 1,
}: NetworkProps) {
  const nodeMat = useRef<THREE.ShaderMaterial>(null);
  const lineMat = useRef<THREE.ShaderMaterial>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const camera = useThree((s) => s.camera);

  const { nodeGeo, lineGeo } = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const nodePos = new Float32Array(nodes * 3);
    const nodeScale = new Float32Array(nodes);
    const nodeSeed = new Float32Array(nodes);

    for (let i = 0; i < nodes; i++) {
      // Fibonacci-ish shell with radial jitter: an even skin, not a solid ball,
      // so the interior stays readable when the camera is inside it.
      const u = Math.random();
      const v = Math.random();
      const theta = u * Math.PI * 2;
      const phi = Math.acos(2 * v - 1);
      const r = radius * (0.55 + Math.pow(Math.random(), 0.6) * 0.45);
      const p = new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta) * 0.72,
        r * Math.cos(phi),
      );
      pts.push(p);
      nodePos.set([p.x, p.y, p.z], i * 3);
      nodeScale[i] = 0.5 + Math.random() * 1.5;
      nodeSeed[i] = Math.random();
    }

    const ng = new THREE.BufferGeometry();
    ng.setAttribute('position', new THREE.BufferAttribute(nodePos, 3));
    ng.setAttribute('aScale', new THREE.BufferAttribute(nodeScale, 1));
    ng.setAttribute('aSeed', new THREE.BufferAttribute(nodeSeed, 1));
    ng.boundingSphere = new THREE.Sphere(new THREE.Vector3(), radius * 1.6);

    // Edge selection: nearest-neighbour candidates, capped. Sorting the pairs by
    // length and taking the shortest gives a graph that looks structural rather
    // than like a ball of wool.
    const pairs: { a: number; b: number; d: number }[] = [];
    const attempts = Math.min(links * 8, nodes * 14);
    for (let k = 0; k < attempts; k++) {
      const a = (Math.random() * nodes) | 0;
      const b = (Math.random() * nodes) | 0;
      if (a === b) continue;
      const d = pts[a].distanceTo(pts[b]);
      if (d > radius * 0.55) continue;
      pairs.push({ a, b, d });
    }
    pairs.sort((x, y) => x.d - y.d);
    const chosen = pairs.slice(0, links);

    const n = chosen.length;
    const linePos = new Float32Array(n * 6);
    const order = new Float32Array(n * 2);
    const end = new Float32Array(n * 2);
    const seed = new Float32Array(n * 2);

    chosen.forEach((pair, i) => {
      const a = pts[pair.a];
      const b = pts[pair.b];
      linePos.set([a.x, a.y, a.z, b.x, b.y, b.z], i * 6);
      // Shorter edges wire up first: the network densifies from the inside out.
      const o = i / Math.max(n - 1, 1);
      order[i * 2] = o;
      order[i * 2 + 1] = o;
      end[i * 2] = 0;
      end[i * 2 + 1] = 1;
      const s = Math.random();
      seed[i * 2] = s;
      seed[i * 2 + 1] = s;
    });

    const lg = new THREE.BufferGeometry();
    lg.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
    lg.setAttribute('aOrder', new THREE.BufferAttribute(order, 1));
    lg.setAttribute('aEnd', new THREE.BufferAttribute(end, 1));
    lg.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    lg.boundingSphere = new THREE.Sphere(new THREE.Vector3(), radius * 1.6);

    return { nodeGeo: ng, lineGeo: lg };
  }, [nodes, links, radius]);

  const nodeUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: pointSize },
      uCompress: { value: 0 },
      uBreathe: { value: breathe },
      uAccent: { value: C.accent },
      uBright: { value: C.accentBright },
      uOpacity: { value: 1 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const lineUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uConnect: { value: 0 },
      uCompress: { value: 0 },
      uFlow: { value: 1 },
      uAccent: { value: C.accentBright },
      uOpacity: { value: 1 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useFrame((_, delta) => {
    const dt = delta * motion;
    const nowConnect = connectRef ? connectRef.current : connect;
    const nowCompress = compressRef ? compressRef.current : compress;
    const nowOpacity = opacityRef ? opacityRef.current : opacity;

    if (nodeMat.current) {
      const u = nodeMat.current.uniforms;
      u.uTime.value += dt;
      u.uCompress.value = nowCompress;
      u.uOpacity.value = nowOpacity;
      u.uSize.value = pointSize;
      u.uBreathe.value = breathe;
    }
    if (lineMat.current) {
      const u = lineMat.current.uniforms;
      u.uTime.value += dt;
      u.uConnect.value = nowConnect;
      u.uCompress.value = nowCompress;
      u.uFlow.value = flow;
      u.uOpacity.value = nowOpacity;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += dt * 0.035;
      groupRef.current.rotation.x = Math.sin(performance.now() * 0.00012) * 0.12;
    }
    if (coreRef.current) {
      coreRef.current.scale.setScalar(0.001 + nowCompress * nowCompress * 2.6);
      const m = coreRef.current.material as THREE.MeshBasicMaterial;
      /*
        The stage carries the core through the lens on its way out of the
        section, and an additive solid you are standing inside is not a glowing
        core, it is a flat red screen with the next section's copy stranded on
        top of it. Dissolving it over the last few units keeps the collapse
        readable and hands the frame back before the camera arrives.
      */
      coreRef.current.getWorldPosition(CORE_POS);
      const near = THREE.MathUtils.smoothstep(CORE_POS.distanceTo(camera.position), 4.5, 13);
      m.opacity = nowCompress * nowOpacity * near;
    }
  });

  return (
    <group ref={groupRef}>
      <points geometry={nodeGeo} frustumCulled={false}>
        <shaderMaterial
          ref={nodeMat}
          uniforms={nodeUniforms}
          vertexShader={NODE_VERT}
          fragmentShader={NODE_FRAG}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments geometry={lineGeo} frustumCulled={false}>
        <shaderMaterial
          ref={lineMat}
          uniforms={lineUniforms}
          vertexShader={LINE_VERT}
          fragmentShader={LINE_FRAG}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {core ? (
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1, 3]} />
          <meshBasicMaterial
            color={C.accentBright}
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ) : null}
    </group>
  );
}
