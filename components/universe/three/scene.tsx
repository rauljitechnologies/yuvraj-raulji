'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import {
  COMMERCE_NODES,
  INSIGHT_SLUGS,
  MILESTONES,
  ORBIT_ITEMS,
  SCENES,
  TECH_ORBITERS,
  WORK_ITEMS,
} from '../../../lib/universe';
import type { QualityProfile } from '../quality';
import { U, clamp01, sceneProgress, sceneWindow } from '../store';
import { FounderFrame } from './founder-frame';
import { Network } from './network';
import { CommerceCluster, OrbitSystem, TechPlanet } from './objects';
import { GlassPanels } from './panels';
import { ParticleField } from './particles';
import { CameraRig } from './rig';
import { WorkScreens } from './screens';
import { LazyScene, Stage } from './stage';
import { TimelinePath } from './timeline';

/**
 * The world.
 *
 * One camera, one continuous path, eleven stages hung along it. Modules mount
 * only when their section is within one step of the viewport, and every
 * scroll-driven value reaches the shaders through refs written by a single
 * `Driver` component, so scrolling the page never triggers a React render
 * inside the Canvas.
 */

interface Refs {
  ambientOpacity: { current: number };
  converge: { current: number };
  philConnect: { current: number };
  philOpacity: { current: number };
  aiConnect: { current: number };
  aiCompress: { current: number };
  aiOpacity: { current: number };
  coreScale: { current: number };
}

/** Writes every per-frame value the modules read. Renders nothing. */
function Driver({ refs, motion }: { refs: Refs; motion: number }) {
  useFrame(() => {
    // Ambient field thins out where the copy needs to carry the moment: the
    // founder statement is nearly black on purpose, and the contact scene is
    // the field itself collapsing, so it must not also be dimmed.
    const statement = sceneWindow('statement', 0.35);
    const contactW = sceneWindow('contact', 0.5);
    refs.ambientOpacity.current = 1 - statement * 0.62;

    // Convergence: the whole universe drawn into one point across the final
    // section. Squared so it starts slowly and finishes fast.
    const ct = clamp01(sceneProgress('contact'));
    refs.converge.current = contactW > 0 ? ct * ct * 0.92 : 0;

    // Philosophy: loose dust that wires itself into a structured network.
    const pt = clamp01(sceneProgress('philosophy'));
    refs.philConnect.current = clamp01((pt - 0.08) * 1.7);
    refs.philOpacity.current = sceneWindow('philosophy', 0.4);

    // Intelligence: the network densifies, then compresses into the core over
    // the last third of the section.
    const it = clamp01(sceneProgress('intelligence'));
    refs.aiConnect.current = clamp01(it * 1.9);
    refs.aiCompress.current = clamp01((it - 0.62) / 0.34);
    refs.aiOpacity.current = sceneWindow('intelligence', 0.4);

    void motion;
  });
  return null;
}

export function Scene({ profile, active }: { profile: QualityProfile; active: number }) {
  const motion = profile.motion;
  const interactive = profile.interactive;

  const refs = useMemo<Refs>(
    () => ({
      ambientOpacity: { current: 1 },
      converge: { current: 0 },
      philConnect: { current: 0 },
      philOpacity: { current: 0 },
      aiConnect: { current: 0 },
      aiCompress: { current: 0 },
      aiOpacity: { current: 0 },
      coreScale: { current: 0 },
    }),
    [],
  );

  const idx = (id: (typeof SCENES)[number]) => SCENES.indexOf(id);

  return (
    <>
      <CameraRig motion={motion} />
      <Driver refs={refs} motion={motion} />

      {/* Ambient light is decorative only: every material in the scene is
          unlit or additive, so this exists purely to keep any future standard
          material from rendering black. */}
      <ambientLight intensity={0.6} />

      {/* The ecosystem the whole journey happens inside. It spans the full
          camera path, which is why it is not owned by any one section. */}
      {/*
        The volume is a long, narrow corridor rather than a cube. A cube spreads
        the same particle budget so thin that the field reads as a handful of
        stray dots near the lens and nothing at all in the distance; keeping it
        close to the camera path concentrates the density where the camera
        actually travels.
      */}
      <ParticleField
        count={profile.particles}
        size={[104, 68, 520]}
        center={[0, 0, -230]}
        pointSize={profile.tier === 'high' ? 7 : 9}
        opacityRef={refs.ambientOpacity}
        convergeRef={refs.converge}
        core={[0, 0, -430]}
        motion={Math.max(motion, 0.15)}
      />

      {/* ── 00 Hero: the founder frame, floating in the field ───────────── */}
      <LazyScene scene="hero" index={idx('hero')} active={active}>
        {/* Offset into the column the hero layout reserves for it, so the
            frame sits beside the headline instead of behind it. */}
        <Stage scene="hero" depth={13.5} drift={22} offset={[6.2, 0.2]} motion={motion}>
          <FounderFrame dust={profile.tier === 'high' ? 9000 : profile.tier === 'medium' ? 4000 : 1500} motion={motion} />
        </Stage>
      </LazyScene>

      {/* ── 01 Philosophy: dust assembling into structure ───────────────── */}
      <LazyScene scene="philosophy" index={idx('philosophy')} active={active}>
        <Stage scene="philosophy" depth={16} drift={26} motion={motion}>
          <Network
            nodes={Math.round(profile.nodes * 0.45)}
            links={Math.round(profile.links * 0.5)}
            radius={11}
            connectRef={refs.philConnect}
            opacityRef={refs.philOpacity}
            flow={0.5}
            breathe={0.5}
            motion={motion}
          />
        </Stage>
      </LazyScene>

      {/* ── 02 Commerce: interactive technology objects ─────────────────── */}
      <LazyScene scene="commerce" index={idx('commerce')} active={active}>
        <Stage scene="commerce" depth={15} drift={30} motion={motion}>
          <CommerceCluster nodes={COMMERCE_NODES} interactive={interactive} motion={motion} />
        </Stage>
      </LazyScene>

      {/* ── 03 Intelligence: the neural network and its core ────────────── */}
      <LazyScene scene="intelligence" index={idx('intelligence')} active={active}>
        <Stage scene="intelligence" depth={17} drift={24} motion={motion}>
          <Network
            nodes={profile.nodes}
            links={profile.links}
            radius={14}
            connectRef={refs.aiConnect}
            compressRef={refs.aiCompress}
            opacityRef={refs.aiOpacity}
            flow={1.4}
            breathe={0.28}
            pointSize={13}
            core
            motion={motion}
          />
        </Stage>
      </LazyScene>

      {/* ── 04 Expertise: the orbit ─────────────────────────────────────── */}
      <LazyScene scene="expertise" index={idx('expertise')} active={active}>
        <Stage scene="expertise" depth={19} drift={22} motion={motion}>
          <OrbitSystem items={ORBIT_ITEMS} interactive={interactive} motion={motion} />
        </Stage>
      </LazyScene>

      {/* ── 05 Work: the corridor of case studies ──────────────────────── */}
      <LazyScene scene="work" index={idx('work')} active={active}>
        <Stage scene="work" depth={20} drift={78} motion={motion}>
          <WorkScreens items={WORK_ITEMS} interactive={interactive} motion={motion} />
        </Stage>
      </LazyScene>

      {/* ── 06 Technology: the planet ───────────────────────────────────── */}
      <LazyScene scene="technology" index={idx('technology')} active={active}>
        <Stage scene="technology" depth={21} drift={26} billboard={false} motion={motion}>
          <PlanetHolder motion={motion}>
            <TechPlanet orbiters={TECH_ORBITERS} motion={motion} />
          </PlanetHolder>
        </Stage>
      </LazyScene>

      {/* ── 07 Experience: the timeline ─────────────────────────────────── */}
      <LazyScene scene="experience" index={idx('experience')} active={active}>
        <Stage scene="experience" depth={14} drift={30} motion={motion}>
          <TimelinePath
            markers={MILESTONES.map((m, i) => ({
              id: `milestone-${i}`,
              at: MILESTONES.length > 1 ? i / (MILESTONES.length - 1) : 0,
            }))}
            motion={motion}
          />
        </Stage>
      </LazyScene>

      {/* ── 08 Insights: floating editorial glass ───────────────────────── */}
      <LazyScene scene="insights" index={idx('insights')} active={active}>
        <Stage scene="insights" depth={19} drift={30} motion={motion}>
          <GlassPanels ids={INSIGHT_SLUGS.map((s) => `insight-${s}`)} interactive={interactive} motion={motion} />
        </Stage>
      </LazyScene>

      {/* 09 Statement has no module by design: the ambient field is dimmed
          and the typography carries the section alone.
          10 Contact is the ambient field converging, driven above. */}
      <LazyScene scene="contact" index={idx('contact')} active={active}>
        <Stage scene="contact" depth={22} drift={16} motion={motion}>
          <ConvergenceCore convergeRef={refs.converge} />
        </Stage>
      </LazyScene>
    </>
  );
}

/** Keeps the planet upright while the stage handles its distance. */
function PlanetHolder({ children, motion }: { children: React.ReactNode; motion: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y = U.pointer.x * 0.2 * motion;
    ref.current.rotation.x = -U.pointer.y * 0.12 * motion;
  });
  return <group ref={ref}>{children}</group>;
}

/**
 * The single glowing object every particle in the universe collapses into.
 * Scale is driven by the same converge value the ambient field uses, so the
 * core grows exactly as fast as the field arrives.
 */
function ConvergenceCore({ convergeRef }: { convergeRef: { current: number } }) {
  const inner = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const c = convergeRef.current;
    const t = performance.now() * 0.001;
    if (inner.current) {
      inner.current.scale.setScalar(0.001 + c * c * 2.1 * (1 + Math.sin(t * 2) * 0.04));
      inner.current.rotation.y += delta * 0.4;
      inner.current.rotation.x += delta * 0.18;
      (inner.current.material as THREE.MeshBasicMaterial).opacity = Math.min(c * 1.4, 1);
    }
    if (halo.current) {
      /*
        Sized to stay an object in the frame. The stage holds this fourteen
        units from the lens at its closest, where anything past about five
        units of radius stops reading as a halo and becomes a red field behind
        the contact copy and the footer.
      */
      halo.current.scale.setScalar(0.001 + c * 5);
      (halo.current.material as THREE.MeshBasicMaterial).opacity = c * 0.18;
    }
  });

  return (
    <group>
      <mesh ref={inner}>
        <icosahedronGeometry args={[1, 4]} />
        <meshBasicMaterial color="#f0263c" transparent opacity={0} toneMapped={false} />
      </mesh>
      <mesh ref={halo}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial color="#e50920" transparent opacity={0} depthWrite={false} toneMapped={false} />
      </mesh>
    </group>
  );
}
