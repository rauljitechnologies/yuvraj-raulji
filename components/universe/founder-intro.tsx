'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { FOUNDER_LINE } from '../../lib/universe';
import {
  FOUNDER_PORTRAIT,
  FOUNDER_POSTER,
  FOUNDER_SOURCES,
  setFounderMedia,
} from './founder-media';
import { useUniverse } from './provider';
import { U } from './store';

/**
 * The founder introduction.
 *
 * Timeline, in the phases the brief lays out:
 *   0.0 – 1.8s  near darkness, the particle field resolving out of it
 *   1.8 – 3.6s  the glass frame forms and the footage fades up inside it
 *   3.6 – 8.4s  Yuvraj speaks one line to camera
 *   8.4 – 9.8s  the frame breaks into particles that join the ecosystem
 *
 * It plays once per session, never on scroll, and can be replayed from the
 * control in the hero. `sessionStorage` carries the "already seen" flag, so a
 * visitor moving between pages is not made to sit through it again.
 *
 * Two things about the video are worth stating plainly, because they are
 * constraints rather than choices:
 *
 * 1. It starts muted. Every browser blocks audible autoplay without a prior
 *    gesture, so a clip that depends on being heard would simply not play at
 *    all. The spoken line is therefore also rendered on screen, and a sound
 *    control is offered from the first frame.
 * 2. If no video file is present, the sequence still runs, using the existing
 *    portrait still in place of footage. Nothing here fabricates a founder
 *    clip; it renders whatever real asset is available.
 */

const T = {
  dark: 1800,
  frame: 3600,
  speak: 8400,
  dissolve: 9800,
} as const;

type Phase = 'idle' | 'dark' | 'frame' | 'speak' | 'dissolve' | 'done';

export function FounderIntro() {
  const { introDone, markIntroDone, replayKey, reducedMotion, profile } = useUniverse();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const [muted, setMuted] = useState(true);
  const [hasVideo, setHasVideo] = useState<boolean | null>(null);
  const rafRef = useRef(0);

  /** WebGL renders the frame unless the device cannot, in which case the DOM does. */
  const domFrame = profile.tier === 'static' || reducedMotion;

  /* ── source probing ──────────────────────────────────────────────────── */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    let settled = false;
    const useVideo = () => {
      if (settled) return;
      settled = true;
      setHasVideo(true);
      setFounderMedia({ video: v, mode: 'video', aspect: v.videoWidth / v.videoHeight || 16 / 9 });
    };
    const usePortrait = () => {
      if (settled) return;
      settled = true;
      setHasVideo(false);
      setFounderMedia({ video: null, mode: 'portrait', aspect: 1 });
    };

    v.addEventListener('loadeddata', useVideo);
    v.addEventListener('error', usePortrait);
    // A missing file on a static host can 404 quietly rather than firing an
    // error on the element, so the probe has its own deadline.
    const deadline = window.setTimeout(() => {
      if (v.readyState >= 2) useVideo();
      else usePortrait();
    }, 2500);

    return () => {
      v.removeEventListener('loadeddata', useVideo);
      v.removeEventListener('error', usePortrait);
      window.clearTimeout(deadline);
    };
  }, []);

  /* ── the sequence ────────────────────────────────────────────────────── */
  const run = useCallback(() => {
    const started = performance.now();
    const v = videoRef.current;

    if (v && hasVideo) {
      v.currentTime = 0;
      // Muted play is the only kind that is allowed to start on its own.
      v.muted = true;
      setMuted(true);
      void v.play().catch(() => {
        /* Blocked anyway: the sequence still runs, the frame just holds a still. */
      });
    }

    const tick = (now: number) => {
      const e = now - started;

      if (e < T.dark) {
        setPhase('dark');
        // Only the faintest hint of the frame during the darkness.
        U.intro = (e / T.dark) * 0.1;
      } else if (e < T.frame) {
        setPhase('frame');
        const k = (e - T.dark) / (T.frame - T.dark);
        U.intro = 0.1 + easeOutCubic(k) * 0.9;
      } else if (e < T.speak) {
        setPhase('speak');
        U.intro = 1;
        U.dissolve = 0;
      } else if (e < T.dissolve) {
        setPhase('dissolve');
        U.intro = 1;
        U.dissolve = easeInOutCubic((e - T.speak) / (T.dissolve - T.speak));
      } else {
        U.intro = 1;
        U.dissolve = 1;
        setPhase('done');
        markIntroDone();
        v?.pause();
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [hasVideo, markIntroDone]);

  useEffect(() => {
    // Wait until the source has been probed, so the first frame of the sequence
    // already knows whether it is showing footage or a still.
    if (hasVideo === null) return;
    if (introDone) {
      U.intro = 1;
      U.dissolve = 1;
      setPhase('done');
      return;
    }
    run();
    return () => cancelAnimationFrame(rafRef.current);
    // replayKey re-runs the sequence from the top.
  }, [hasVideo, introDone, replayKey, run]);

  const skip = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    U.intro = 1;
    U.dissolve = 1;
    setPhase('done');
    markIntroDone();
    videoRef.current?.pause();
  }, [markIntroDone]);

  const toggleSound = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    setMuted(next);
    if (!next) void v.play().catch(() => undefined);
  }, []);

  const playing = phase !== 'idle' && phase !== 'done';
  const speaking = phase === 'speak';

  return (
    <>
      {/*
        The element itself. In WebGL mode it is a decode target for the video
        texture, so it stays in the layout at 1px with zero opacity rather than
        display:none, which would stop some browsers decoding frames at all.
      */}
      <video
        ref={videoRef}
        className={domFrame ? 'u-intro-video is-dom' : 'u-intro-video'}
        playsInline
        muted={muted}
        preload="metadata"
        poster={FOUNDER_POSTER}
        crossOrigin="anonymous"
        aria-label={`Yuvraj Raulji: ${FOUNDER_LINE}`}
        controls={domFrame && phase === 'done'}
      >
        {FOUNDER_SOURCES.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>

      {/*
        Still-image frame for devices that are not running the 3D scene. It is
        shown only while the sequence is actually playing: the hero now carries
        a permanent portrait of its own, so leaving this one up afterwards put
        the same face on the page twice.
      */}
      {domFrame ? (
        <div className="u-portrait" data-visible={playing}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={FOUNDER_PORTRAIT} alt="Yuvraj Raulji" width={420} height={420} />
        </div>
      ) : null}

      {/* Curtain: holds the page black through the opening beat so the field
          resolves out of darkness rather than out of a half-drawn layout. */}
      <div className="u-curtain" data-on={playing} aria-hidden="true" />

      {/* The spoken line, on screen. Muted autoplay is the default state, so
          this is the only way the sentence actually reaches most visitors. */}
      <div className="u-caption" data-on={speaking} aria-hidden={!speaking}>
        <p>{FOUNDER_LINE}</p>
      </div>

      {playing ? (
        <div className="u-intro-controls">
          {hasVideo ? (
            <button type="button" onClick={toggleSound} className="u-chip">
              {muted ? 'Sound on' : 'Sound off'}
            </button>
          ) : null}
          <button type="button" onClick={skip} className="u-chip">
            Skip intro
          </button>
        </div>
      ) : null}
    </>
  );
}

const easeOutCubic = (k: number) => 1 - Math.pow(1 - k, 3);
const easeInOutCubic = (k: number) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
