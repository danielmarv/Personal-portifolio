'use client';

import { useSyncExternalStore } from 'react';

/** Cached so the store snapshot stays referentially stable across renders. */
let cached: boolean | undefined;

/** Probe for a usable WebGL implementation without holding the context open. */
function detect(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const context =
      canvas.getContext('webgl2') ??
      canvas.getContext('webgl') ??
      canvas.getContext('experimental-webgl');

    if (!context) return false;

    // Release the probe context immediately so it does not count against the
    // browser's per-page context limit.
    const lose = (context as WebGLRenderingContext).getExtension('WEBGL_lose_context');
    lose?.loseContext();
    return true;
  } catch (error: unknown) {
    console.warn('WebGL detection failed; falling back to the static hero', error);
    return false;
  }
}

function getSnapshot(): boolean {
  cached ??= detect();
  return cached;
}

/** Capability, not state — it never changes for the life of the document. */
function subscribe(): () => void {
  return () => {};
}

/**
 * Whether this browser can render the hero network.
 *
 * Reports `false` on the server and during the first paint, so the WebGL canvas
 * only ever mounts on a client that can actually run it.
 */
export function useWebGLSupport(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
