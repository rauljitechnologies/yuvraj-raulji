'use client';

/**
 * Bridge between the DOM `<video>` element and the WebGL frame that renders it.
 *
 * The video tag has to live in the DOM: it is the only way to get a decodable
 * video source, honest autoplay behaviour, captions and a media element the
 * browser will hardware-decode. The *presentation* has to live in WebGL, because
 * the brief calls for the frame to float in the 3D world and then break into
 * particles. Those two trees are siblings, not parent and child, so they talk
 * through this module rather than through props.
 */

export type FounderMode = 'video' | 'portrait' | 'none';

export interface FounderMedia {
  video: HTMLVideoElement | null;
  /** `portrait` means no video file was found and the still is standing in. */
  mode: FounderMode;
  /** Intrinsic aspect of whatever source is being shown. */
  aspect: number;
}

const state: FounderMedia = { video: null, mode: 'none', aspect: 16 / 9 };
const listeners = new Set<() => void>();

export function getFounderMedia(): FounderMedia {
  return state;
}

export function setFounderMedia(patch: Partial<FounderMedia>): void {
  Object.assign(state, patch);
  listeners.forEach((fn) => fn());
}

export function subscribeFounderMedia(fn: () => void): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

/**
 * Where the founder clip is expected. Both formats are optional: if neither
 * resolves, the frame falls back to the existing portrait still and the intro
 * still plays as a cinematic reveal, just without motion footage.
 */
export const FOUNDER_SOURCES = [
  { src: '/assets/founder/yuvraj-intro.webm', type: 'video/webm' },
  { src: '/assets/founder/yuvraj-intro.mp4', type: 'video/mp4' },
] as const;

/**
 * Poster frame. Points at the existing portrait until a real first frame is
 * exported from the clip, so the element never requests a file that is not
 * there. Swap the path once `public/assets/founder/` has a poster in it.
 */
export const FOUNDER_POSTER = '/assets/yuvraj-raulji.jpg';
export const FOUNDER_PORTRAIT = '/assets/yuvraj-raulji.jpg';
