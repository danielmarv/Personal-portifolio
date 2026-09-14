'use client';

import { Canvas } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

import { useReducedMotion } from '@/lib/use-reduced-motion';
import { useWebGLSupport } from '@/lib/webgl';

import { ConsensusScene } from './consensus-scene';
import { Starfield } from './starfield';

/**
 * WebGL host for the hero network.
 *
 * Renders nothing on the server, and nothing at all where WebGL is
 * unavailable — the CSS aurora behind it carries the hero on its own.
 */
export function NetworkCanvas() {
  const enabled = useWebGLSupport();
  const reducedMotion = useReducedMotion();
  const pointer = useRef({ x: 0, y: 0 });

  // Tracked on the window rather than the canvas, so parallax keeps responding
  // while the cursor is over the headline.
  useEffect(() => {
    if (!enabled || reducedMotion) return;

    const onPointerMove = (event: PointerEvent): void => {
      pointer.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      };
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, [enabled, reducedMotion]);

  if (!enabled) return null;

  return (
    <Canvas
      aria-hidden="true"
      className="h-full w-full"
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 10.5], fov: 42 }}
      onCreated={({ gl }) => gl.setClearAlpha(0)}
      // Reduced motion renders a single settled frame instead of a loop.
      frameloop={reducedMotion ? 'demand' : 'always'}
    >
      <Starfield reducedMotion={reducedMotion} />
      <ConsensusScene reducedMotion={reducedMotion} pointer={pointer} />
    </Canvas>
  );
}
