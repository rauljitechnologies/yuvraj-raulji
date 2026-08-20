'use client';

import { useSyncExternalStore } from 'react';

/**
 * Which object the visitor is pointing at, shared by the DOM and the WebGL tree.
 *
 * React context does not cross the react-three-fiber root: the Canvas renders
 * through a separate reconciler, so a provider outside it is invisible to
 * components inside it. Rather than bridging the context (which re-renders the
 * whole 3D tree on every hover), hover lives in this external store and both
 * sides subscribe to it. Pointing at a 3D object lights its DOM entry, and
 * pointing at the DOM entry lights the object, with one shared source of truth.
 */

let current: string | null = null;
const listeners = new Set<() => void>();

export function setHover(id: string | null): void {
  if (current === id) return;
  current = id;
  listeners.forEach((fn) => fn());
}

export function getHover(): string | null {
  return current;
}

function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function useHover(): string | null {
  return useSyncExternalStore(subscribe, getHover, () => null);
}
