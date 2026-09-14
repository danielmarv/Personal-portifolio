'use client';

import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void): () => void {
  const media = window.matchMedia(QUERY);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

/**
 * The visitor's reduced-motion preference, kept in sync with the media query.
 *
 * The server snapshot is `true`, so the first paint is always the calm variant.
 * If the visitor has no preference, motion starts on hydration — the safe way
 * round, since a reader who asked for stillness never sees a frame of movement.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => true);
}
