'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

import { createRandom } from '@/lib/network';

const STAR_COUNT = 520;

interface StarfieldProps {
  readonly reducedMotion: boolean;
}

/** A sparse, slowly drifting star shell behind the network. */
export function Starfield({ reducedMotion }: StarfieldProps) {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors, sizes } = useMemo(() => {
    const random = createRandom(41);
    const positions = new Float32Array(STAR_COUNT * 3);
    const colors = new Float32Array(STAR_COUNT * 3);
    const sizes = new Float32Array(STAR_COUNT);

    const tint = new THREE.Color();

    for (let i = 0; i < STAR_COUNT; i += 1) {
      // Distribute on a shell well outside the network.
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      const radius = 9 + random() * 12;

      positions[i * 3] = Math.sin(phi) * Math.cos(theta) * radius;
      positions[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * radius;
      positions[i * 3 + 2] = Math.cos(phi) * radius;

      // Mostly cold white, with a few picking up the aurora ramp.
      const roll = random();
      if (roll > 0.9) tint.set('#8b5cf6');
      else if (roll > 0.78) tint.set('#3ddc97');
      else tint.set('#b9c4e8');

      tint.toArray(colors, i * 3);
      sizes[i] = 0.4 + random() * 1.4;
    }

    return { positions, colors, sizes };
  }, []);

  useFrame((_, delta) => {
    if (reducedMotion || !ref.current) return;
    ref.current.rotation.y += delta * 0.006;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        transparent
        opacity={0.55}
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
