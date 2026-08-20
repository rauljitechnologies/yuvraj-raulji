'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { CommerceNode, OrbitItem, TechOrbiter } from '../../../lib/universe';
import { getHover, setHover } from '../hover';
import { U, damp } from '../store';
import { C } from './palette';
import { useStage } from './stage';

/* ═══════════════════════════════════════════════════════════════
   Shared: a soft additive halo. One quad, one radial falloff.
   Cheaper and softer than bloom alone, and it survives on the low
   tier where post-processing is switched off entirely.
   ═══════════════════════════════════════════════════════════════ */

const GLOW_FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec2 vUv;
  void main() {
    float d = length(vUv - 0.5) * 2.0;
    float a = pow(max(1.0 - d, 0.0), 2.6) * uOpacity;
    if (a <= 0.002) discard;
    gl_FragColor = vec4(uColor, a);
  }
`;

const GLOW_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

function Glow({
  radius,
  color = C.accentBright,
  opacity = 0.5,
  opacityRef,
}: {
  radius: number;
  color?: THREE.Color;
  opacity?: number;
  /** Live opacity source, read every frame when supplied. */
  opacityRef?: { current: number };
}) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({ uColor: { value: color }, uOpacity: { value: opacity } }),
    [color, opacity],
  );

  useFrame(() => {
    if (mat.current && opacityRef) mat.current.uniforms.uOpacity.value = opacityRef.current;
  });

  return (
    <mesh>
      <planeGeometry args={[radius * 2, radius * 2]} />
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={GLOW_VERT}
        fragmentShader={GLOW_FRAG}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NodeObject — one interactive technology object.
   ═══════════════════════════════════════════════════════════════ */

function NodeObject({
  id,
  position,
  size,
  interactive,
  seed,
  motion,
  /** Multiplied into every animated response. */
  intensity = 1,
}: {
  id: string;
  position: [number, number, number];
  size: number;
  interactive: boolean;
  seed: number;
  motion: number;
  intensity?: number;
}) {
  const stage = useStage();
  const group = useRef<THREE.Group>(null);
  const solid = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);
  const glowOpacity = useRef(0);
  const hoverAmt = useRef(0);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(delta, 0.1);
    const t = performance.now() * 0.001;

    // Everything this object draws is scaled by its stage's visibility, so it
    // cross-fades with the neighbouring scenes instead of hard-cutting.
    const vis = stage.w * intensity;

    const target = getHover() === id ? 1 : 0;
    hoverAmt.current = damp(hoverAmt.current, target, 9, dt);
    const h = hoverAmt.current;

    // Idle: a slow orbital bob so the cluster is never static, plus a lift
    // toward the camera on hover. Depth is the affordance here, not colour.
    g.position.set(
      position[0] + Math.sin(t * 0.5 + seed * 5) * 0.22 * motion,
      position[1] + Math.cos(t * 0.42 + seed * 7) * 0.26 * motion,
      position[2] + h * 2.6,
    );
    g.scale.setScalar(size * (1 + h * 0.32));

    g.rotation.y += dt * (0.25 + h * 0.5) * motion;
    g.rotation.x += dt * 0.12 * motion;

    glowOpacity.current = (0.24 + h * 0.75) * vis;

    if (solid.current) {
      (solid.current.material as THREE.MeshBasicMaterial).opacity = (0.16 + h * 0.3) * vis;
    }
    if (wire.current) {
      (wire.current.material as THREE.MeshBasicMaterial).opacity = (0.55 + h * 0.45) * vis;
    }
  });

  const handlers = interactive
    ? {
        onPointerOver: (e: { stopPropagation: () => void }) => {
          e.stopPropagation();
          setHover(id);
          document.body.classList.add('is-pointing');
        },
        onPointerOut: () => {
          if (getHover() === id) setHover(null);
          document.body.classList.remove('is-pointing');
        },
      }
    : {};

  return (
    <group ref={group} {...handlers}>
      <mesh ref={solid}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color={C.accent} transparent opacity={0.16} depthWrite={false} />
      </mesh>
      <mesh ref={wire}>
        <icosahedronGeometry args={[1.02, 1]} />
        <meshBasicMaterial
          color={C.accentBright}
          wireframe
          transparent
          opacity={0.6}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <Glow radius={3.1} opacityRef={glowOpacity} />
      {/* Enlarged, invisible pick target: the visible object is small and
          fiddly to hit, and a hover affordance you have to aim for is worse
          than no hover affordance. */}
      {interactive ? (
        <mesh visible={false}>
          <sphereGeometry args={[2.1, 8, 8]} />
          <meshBasicMaterial />
        </mesh>
      ) : null}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════
   COMMERCE CLUSTER
   ═══════════════════════════════════════════════════════════════ */

export function CommerceCluster({
  nodes,
  interactive,
  motion = 1,
}: {
  nodes: CommerceNode[];
  interactive: boolean;
  motion?: number;
}) {
  const stage = useStage();
  const group = useRef<THREE.Group>(null);
  const lineMat = useRef<THREE.LineBasicMaterial>(null);

  /** Energy lines between every node and its two nearest neighbours. */
  const linkGeo = useMemo(() => {
    const pts: number[] = [];
    nodes.forEach((n, i) => {
      const dists = nodes
        .map((m, j) => ({ j, d: new THREE.Vector3(...n.pos).distanceTo(new THREE.Vector3(...m.pos)) }))
        .filter((x) => x.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);
      dists.forEach(({ j }) => {
        pts.push(...n.pos, ...nodes[j].pos);
      });
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, [nodes]);

  useFrame(() => {
    if (group.current) {
      // The cluster turns with the pointer, so moving the mouse walks around it.
      group.current.rotation.y = U.pointer.x * 0.22 * motion;
      group.current.rotation.x = -U.pointer.y * 0.14 * motion;
    }
    if (lineMat.current) lineMat.current.opacity = 0.18 * stage.w;
  });

  return (
    <group ref={group} scale={1.05}>
      <lineSegments geometry={linkGeo}>
        <lineBasicMaterial
          ref={lineMat}
          color={C.accent}
          transparent
          opacity={0.18}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {nodes.map((n, i) => (
        <NodeObject
          key={n.id}
          id={n.id}
          position={n.pos}
          size={n.size}
          seed={i / nodes.length}
          interactive={interactive}
          motion={motion}
        />
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EXPERTISE ORBIT
   A named centre with six orbiting disciplines. Scroll turns the orbit.
   ═══════════════════════════════════════════════════════════════ */

export function OrbitSystem({
  items,
  interactive,
  motion = 1,
}: {
  items: OrbitItem[];
  interactive: boolean;
  motion?: number;
}) {
  const stage = useStage();
  const ring = useRef<THREE.Group>(null);
  const centre = useRef<THREE.Group>(null);
  const centreGlow = useRef(0.6);
  const spokes = useRef<THREE.LineSegments>(null);

  const RADIUS = 7.4;

  const positions = useMemo(
    () =>
      items.map((_, i) => {
        const a = (i / items.length) * Math.PI * 2;
        return { a, x: Math.cos(a) * RADIUS, y: Math.sin(a) * RADIUS * 0.52 };
      }),
    [items],
  );

  const spokeGeo = useMemo(() => {
    const pts: number[] = [];
    positions.forEach((p) => pts.push(0, 0, 0, p.x, p.y, 0));
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, [positions]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    if (ring.current) {
      // Scroll position drives the orbit angle, so the ring is a scrubber the
      // visitor is already operating, not a decorative spinner.
      ring.current.rotation.z = (stage.t - 0.5) * Math.PI * 1.1 * motion + performance.now() * 0.00004 * motion;
      ring.current.rotation.x = -0.22 + U.pointer.y * 0.12 * motion;
      ring.current.rotation.y = U.pointer.x * 0.18 * motion;
    }
    if (centre.current) {
      centre.current.rotation.y += dt * 0.28 * motion;
      centre.current.rotation.x += dt * 0.1 * motion;
      const pulse = 0.55 + Math.sin(performance.now() * 0.0016) * 0.12;
      centreGlow.current = pulse * stage.w;
    }
    if (spokes.current) {
      (spokes.current.material as THREE.LineBasicMaterial).opacity = 0.14 * stage.w;
    }
  });

  return (
    <group ref={ring}>
      {/* Centre: Yuvraj Raulji. The label is DOM text in the section, not a
          texture, so it stays selectable and crawlable. */}
      <group ref={centre}>
        <mesh>
          <icosahedronGeometry args={[1.55, 2]} />
          <meshBasicMaterial color={C.accent} transparent opacity={0.22} depthWrite={false} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.62, 2]} />
          <meshBasicMaterial
            color={C.accentBright}
            wireframe
            transparent
            opacity={0.75}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </group>
      <Glow radius={7} opacityRef={centreGlow} />

      <lineSegments ref={spokes} geometry={spokeGeo}>
        <lineBasicMaterial
          color={C.accent}
          transparent
          opacity={0.14}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {items.map((item, i) => (
        <NodeObject
          key={item.num}
          id={`orbit-${item.num}`}
          position={[positions[i].x, positions[i].y, 0]}
          size={0.92}
          seed={i / items.length}
          interactive={interactive}
          motion={motion}
        />
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TECHNOLOGY PLANET
   ═══════════════════════════════════════════════════════════════ */

export function TechPlanet({
  orbiters,
  motion = 1,
}: {
  orbiters: TechOrbiter[];
  motion?: number;
}) {
  const stage = useStage();
  const planet = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);
  const rings = useRef<THREE.Group>(null);
  const glow = useRef(0.5);

  const RING_R = [5.4, 7.6, 9.9];

  const seats = useMemo(
    () =>
      orbiters.map((o, i) => {
        const sameRing = orbiters.filter((x) => x.ring === o.ring);
        const idx = sameRing.indexOf(o);
        const a = (idx / sameRing.length) * Math.PI * 2 + o.ring * 0.6;
        return { ring: o.ring, a, i };
      }),
    [orbiters],
  );

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const t = performance.now() * 0.001;

    const vis = stage.w;
    if (planet.current) {
      planet.current.rotation.y += dt * 0.09 * motion;
      planet.current.rotation.x = 0.2;
      (planet.current.material as THREE.MeshBasicMaterial).opacity = 0.38 * vis;
    }
    if (shell.current) {
      shell.current.rotation.y -= dt * 0.05 * motion;
      (shell.current.material as THREE.MeshBasicMaterial).opacity = 0.34 * vis;
    }
    if (rings.current) {
      rings.current.rotation.x = -0.42 + U.pointer.y * 0.1 * motion;
      rings.current.rotation.y = U.pointer.x * 0.16 * motion + (stage.t - 0.5) * 0.8 * motion;
      rings.current.children.forEach((child, i) => {
        child.rotation.z = t * (0.12 - i * 0.03) * motion + i * 0.7;
        child.traverse((o) => {
          const m = (o as THREE.Mesh).material as THREE.MeshBasicMaterial | undefined;
          if (m && 'opacity' in m) m.opacity = (m.userData.base ?? (m.userData.base = m.opacity)) * vis;
        });
      });
    }
    /*
      The planet's halo is a 20-unit plane a dozen units from the lens, so it
      covers more of the frame than anything else in the scene. At its old
      strength it tinted the whole viewport red, including the copy of the
      section arriving underneath it, which is the one thing the background is
      not allowed to do.
    */
    glow.current = (0.24 + Math.sin(t * 1.1) * 0.05) * stage.w;
  });

  return (
    <group>
      <mesh ref={planet}>
        <icosahedronGeometry args={[3.5, 3]} />
        <meshBasicMaterial color={C.deep} transparent opacity={0.5} depthWrite={false} />
      </mesh>
      <mesh ref={shell}>
        <icosahedronGeometry args={[3.62, 2]} />
        <meshBasicMaterial
          color={C.accentBright}
          wireframe
          transparent
          opacity={0.42}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <Glow radius={10} opacityRef={glow} />

      <group ref={rings}>
        {RING_R.map((r, ri) => (
          <group key={r}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[r, 0.012, 6, 128]} />
              <meshBasicMaterial
                color={C.accent}
                transparent
                opacity={0.3 - ri * 0.06}
                depthWrite={false}
                toneMapped={false}
              />
            </mesh>
            {seats
              .filter((s) => s.ring === ri)
              .map((s) => (
                <group
                  key={`${ri}-${s.i}`}
                  position={[Math.cos(s.a) * r, 0, Math.sin(s.a) * r]}
                >
                  <mesh>
                    <octahedronGeometry args={[0.34, 0]} />
                    <meshBasicMaterial color={C.accentBright} transparent opacity={0.9} toneMapped={false} />
                  </mesh>
                  <Glow radius={1.7} opacity={0.3} />
                </group>
              ))}
          </group>
        ))}
      </group>
    </group>
  );
}
