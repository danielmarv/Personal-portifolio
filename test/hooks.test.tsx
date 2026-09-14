import { renderHook, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

interface MediaListener {
  (event: MediaQueryListEvent): void;
}

/** Minimal matchMedia stand-in, since jsdom does not implement it. */
function stubMatchMedia(matches: boolean) {
  const listeners = new Set<MediaListener>();

  const media = {
    matches,
    addEventListener: (_type: string, listener: MediaListener) => {
      listeners.add(listener);
    },
    removeEventListener: (_type: string, listener: MediaListener) => {
      listeners.delete(listener);
    },
  };

  window.matchMedia = (() => media) as unknown as typeof window.matchMedia;

  return {
    emit(next: boolean): void {
      media.matches = next;
      for (const listener of listeners) {
        listener({ matches: next } as MediaQueryListEvent);
      }
    },
    get listenerCount(): number {
      return listeners.size;
    },
  };
}

describe('useReducedMotion', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should report true when the visitor asks for reduced motion', async () => {
    stubMatchMedia(true);
    const { useReducedMotion } = await import('@/lib/use-reduced-motion');

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it('should report false when the visitor has no motion preference', async () => {
    stubMatchMedia(false);
    const { useReducedMotion } = await import('@/lib/use-reduced-motion');

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it('should follow the preference when it changes while the page is open', async () => {
    const media = stubMatchMedia(false);
    const { useReducedMotion } = await import('@/lib/use-reduced-motion');

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);

    act(() => media.emit(true));
    expect(result.current).toBe(true);
  });

  it('should remove its listener on unmount', async () => {
    const media = stubMatchMedia(false);
    const { useReducedMotion } = await import('@/lib/use-reduced-motion');

    const { unmount } = renderHook(() => useReducedMotion());
    expect(media.listenerCount).toBe(1);

    unmount();
    expect(media.listenerCount).toBe(0);
  });
});

describe('useWebGLSupport', () => {
  beforeEach(() => {
    // The module caches its probe result, so each case needs a fresh copy.
    vi.resetModules();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should report true when a WebGL context can be created', async () => {
    const loseContext = vi.fn();
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      getExtension: () => ({ loseContext }),
    } as unknown as RenderingContext);

    const { useWebGLSupport } = await import('@/lib/webgl');
    const { result } = renderHook(() => useWebGLSupport());

    expect(result.current).toBe(true);
  });

  it('should release the probe context so it does not count against the browser limit', async () => {
    const loseContext = vi.fn();
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      getExtension: () => ({ loseContext }),
    } as unknown as RenderingContext);

    const { useWebGLSupport } = await import('@/lib/webgl');
    renderHook(() => useWebGLSupport());

    expect(loseContext).toHaveBeenCalledTimes(1);
  });

  it('should report false when no context is available', async () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);

    const { useWebGLSupport } = await import('@/lib/webgl');
    const { result } = renderHook(() => useWebGLSupport());

    expect(result.current).toBe(false);
  });

  it('should report false rather than throwing when the probe itself fails', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(() => {
      throw new Error('context creation blocked');
    });

    const { useWebGLSupport } = await import('@/lib/webgl');
    const { result } = renderHook(() => useWebGLSupport());

    expect(result.current).toBe(false);
    expect(console.warn).toHaveBeenCalled();
  });

  it('should probe only once even across several components', async () => {
    const getContext = vi
      .spyOn(HTMLCanvasElement.prototype, 'getContext')
      .mockReturnValue({ getExtension: () => null } as unknown as RenderingContext);

    const { useWebGLSupport } = await import('@/lib/webgl');
    renderHook(() => useWebGLSupport());
    renderHook(() => useWebGLSupport());

    expect(getContext).toHaveBeenCalledTimes(1);
  });
});
