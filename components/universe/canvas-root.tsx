'use client';

import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import { useUniverse } from './provider';
import { Scene } from './three/scene';

/**
 * The single WebGL surface the whole page is rendered against.
 *
 * It is fixed behind the document rather than sliced into per-section canvases:
 * one context, one camera, one continuous world. Sections scroll over it and
 * push it around through the shared frame state.
 *
 * The component is only mounted once the browser is idle (see UniverseHome),
 * and its module is fetched lazily, so the hero's text, the navigation and the
 * case studies are complete and interactive before a single byte of three.js
 * has executed. The world then fades in underneath them.
 */
export function CanvasRoot() {
  const { profile, active } = useUniverse();

  return (
    <div
      className="u-canvas"
      aria-hidden="true"
      // The scene is decoration for content that is fully present in the DOM.
      // Screen readers and search engines get the text; this gets the atmosphere.
    >
      <Canvas
        dpr={profile.dpr}
        gl={{
          antialias: profile.antialias,
          alpha: false,
          powerPreference: 'high-performance',
          // Kept on: the post-processing chain wants a depth attachment even
          // though every material in the scene writes transparently.
          depth: true,
          stencil: false,
        }}
        camera={{ fov: 58, near: 0.1, far: 320, position: [0, 0, 12] }}
        // Pointer events only reach objects that opt in; the rest of the page
        // must stay clickable through the canvas.
        style={{ pointerEvents: profile.interactive ? 'auto' : 'none' }}
        frameloop="always"
      >
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 60, 260]} />

        <Scene profile={profile} active={active} />

        {profile.bloom ? (
          <EffectComposer enableNormalPass={false}>
            {/*
              Threshold sits above the ambient field so the glow lands on the
              bright accents and the energy lines, not on every dust mote. It
              was raised, and the intensity cut, because bloom is what turned a
              network of discrete red nodes into a continuous red wash: the copy
              sits directly on that wash, and no amount of scrim behind the type
              rescues a background that is spreading its own light sideways.
            */}
            <Bloom
              intensity={0.52}
              luminanceThreshold={0.34}
              luminanceSmoothing={0.28}
              mipmapBlur
              radius={0.62}
            />
            <Vignette offset={0.28} darkness={0.62} eskil={false} />
          </EffectComposer>
        ) : null}
      </Canvas>
    </div>
  );
}
