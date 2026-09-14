'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

import {
  buildAdjacency,
  createNetwork,
  createRandom,
  hopDepths,
  type NetworkGraph,
} from '@/lib/network';

const NODE_COUNT = 66;
const NEIGHBOURS = 3;
const RADIUS = 2.75;

/** Seconds a consensus round takes to travel one hop across the graph. */
const HOP_SECONDS = 0.16;
/** Seconds between consensus rounds. */
const ROUND_INTERVAL = 6.5;
/** How long a node stays lit after the round reaches it. */
const FLASH_DECAY = 1.15;

const GOSSIP_COUNT = 34;

const COLOR_IDLE = new THREE.Color('#5b8cf0');
const COLOR_GOSSIP = new THREE.Color('#2bc0e4');
const COLOR_FINAL = new THREE.Color('#3ddc97');
const COLOR_EDGE = new THREE.Color('#3a6fd0');

const glowVertexShader = /* glsl */ `
  attribute float size;
  attribute float intensity;
  varying vec3 vColor;
  varying float vIntensity;
  uniform float uPixelRatio;

  void main() {
    vColor = color;
    vIntensity = intensity;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * uPixelRatio * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const glowFragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vIntensity;

  void main() {
    // Soft radial falloff, with a hotter core as intensity rises.
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float halo = smoothstep(0.5, 0.0, d);
    float core = smoothstep(0.24, 0.0, d);
    float alpha = halo * 0.5 + core * 0.85;
    gl_FragColor = vec4(vColor * (0.55 + vIntensity * 1.5), alpha * (0.35 + vIntensity * 0.75));
  }
`;

/**
 * Gossip messages in flight, split by who may touch them.
 *
 * The geometry attributes are handed to React during render, so they are
 * memoised; the simulation scalars are rewritten every frame, so they live in
 * a ref. Keeping the two apart is what lets the frame loop mutate freely
 * without writing to a value React considers immutable.
 */
interface GossipBuffers {
  readonly positions: Float32Array;
  readonly colors: Float32Array;
  readonly sizes: Float32Array;
  readonly intensity: Float32Array;
}

interface GossipSimulation {
  readonly edgeIndex: Int32Array;
  readonly progress: Float32Array;
  readonly speed: Float32Array;
  readonly reversed: Uint8Array;
  readonly random: () => number;
}

function createGossipBuffers(): GossipBuffers {
  const buffers: GossipBuffers = {
    positions: new Float32Array(GOSSIP_COUNT * 3),
    colors: new Float32Array(GOSSIP_COUNT * 3),
    sizes: new Float32Array(GOSSIP_COUNT),
    intensity: new Float32Array(GOSSIP_COUNT),
  };

  for (let i = 0; i < GOSSIP_COUNT; i += 1) {
    buffers.sizes[i] = 0.24;
    buffers.intensity[i] = 0.9;
    COLOR_GOSSIP.toArray(buffers.colors, i * 3);
  }

  return buffers;
}

function createGossipSimulation(edgeCount: number): GossipSimulation {
  const random = createRandom(19);
  const simulation: GossipSimulation = {
    edgeIndex: new Int32Array(GOSSIP_COUNT),
    progress: new Float32Array(GOSSIP_COUNT),
    speed: new Float32Array(GOSSIP_COUNT),
    reversed: new Uint8Array(GOSSIP_COUNT),
    random,
  };

  for (let i = 0; i < GOSSIP_COUNT; i += 1) {
    simulation.edgeIndex[i] = Math.floor(random() * edgeCount);
    simulation.progress[i] = random();
    simulation.speed[i] = 0.35 + random() * 0.5;
    simulation.reversed[i] = random() > 0.5 ? 1 : 0;
  }

  return simulation;
}

interface StaticBuffers {
  readonly nodePositions: Float32Array;
  readonly nodeColors: Float32Array;
  readonly nodeSizes: Float32Array;
  readonly nodeIntensity: Float32Array;
  readonly edgePositions: Float32Array;
  readonly edgeColors: Float32Array;
}

/**
 * Build the geometry attributes once. When motion is reduced these are seeded
 * with the settled, fully-confirmed state so a single render already looks
 * right without the frame loop ever running.
 */
function createBuffers(graph: NetworkGraph, reducedMotion: boolean): StaticBuffers {
  const nodePositions = new Float32Array(graph.nodes.length * 3);
  const nodeColors = new Float32Array(graph.nodes.length * 3);
  const nodeSizes = new Float32Array(graph.nodes.length);
  const nodeIntensity = new Float32Array(graph.nodes.length);

  const random = createRandom(7);
  const restingNode = reducedMotion ? COLOR_FINAL : COLOR_IDLE;

  graph.nodes.forEach((node, index) => {
    nodePositions[index * 3] = node.x;
    nodePositions[index * 3 + 1] = node.y;
    nodePositions[index * 3 + 2] = node.z;

    restingNode.toArray(nodeColors, index * 3);
    // A few nodes read as larger validators, so the graph is not uniform.
    nodeSizes[index] = random() > 0.85 ? 0.62 : 0.34;
    nodeIntensity[index] = reducedMotion ? 0.55 : 0.26;
  });

  const edgePositions = new Float32Array(graph.edges.length * 6);
  const edgeColors = new Float32Array(graph.edges.length * 6);
  const restingEdge = reducedMotion
    ? new THREE.Color().copy(COLOR_FINAL).multiplyScalar(0.5)
    : COLOR_EDGE;

  graph.edges.forEach((edge, index) => {
    const from = graph.nodes[edge.a];
    const to = graph.nodes[edge.b];
    if (!from || !to) return;

    edgePositions.set([from.x, from.y, from.z, to.x, to.y, to.z], index * 6);
    restingEdge.toArray(edgeColors, index * 6);
    restingEdge.toArray(edgeColors, index * 6 + 3);
  });

  return { nodePositions, nodeColors, nodeSizes, nodeIntensity, edgePositions, edgeColors };
}

interface ConsensusSceneProps {
  /** When true the simulation is frozen at a settled, fully-confirmed state. */
  readonly reducedMotion: boolean;
  /** Pointer position in normalised device coordinates, for parallax. */
  readonly pointer: React.RefObject<{ x: number; y: number }>;
}

export function ConsensusScene({ reducedMotion, pointer }: ConsensusSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Points>(null);
  const gossipRef = useRef<THREE.Points>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);

  const nodeMaterialRef = useRef<THREE.ShaderMaterial>(null);

  // Values React renders with: memoised, never written to directly.
  const graph = useMemo(() => createNetwork(NODE_COUNT, RADIUS, NEIGHBOURS), []);
  const adjacency = useMemo(() => buildAdjacency(graph.nodes.length, graph.edges), [graph]);
  const buffers = useMemo(() => createBuffers(graph, reducedMotion), [graph, reducedMotion]);
  const gossipBuffers = useMemo(() => createGossipBuffers(), []);
  const uniforms = useMemo(() => ({ uPixelRatio: { value: 1 } }), []);

  // Values only the frame loop touches: refs, so mutation is sanctioned.
  const gossip = useRef(createGossipSimulation(graph.edges.length));
  const scratch = useRef(new THREE.Color());
  const round = useRef({
    depths: hopDepths(graph.nodes.length, adjacency, 0),
    startedAt: 0,
  });

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime;
    const group = groupRef.current;

    // Track the renderer's pixel ratio so point sizes survive a resize or a
    // move between displays of different density. Written through the material
    // instance, which both point clouds share.
    const material = nodeMaterialRef.current;
    if (material) {
      material.uniforms.uPixelRatio!.value = state.gl.getPixelRatio();
    }

    if (group) {
      if (!reducedMotion) {
        group.rotation.y += delta * 0.075;
        group.rotation.x = Math.sin(elapsed * 0.18) * 0.08;
      }

      // Parallax: the network leans toward the cursor, then eases back.
      const target = pointer.current;
      group.position.x += (target.x * 0.28 - group.position.x) * 0.045;
      group.position.y += (-target.y * 0.2 - group.position.y) * 0.045;
    }

    // The settled state is already baked into the buffers; nothing to animate.
    if (reducedMotion) return;

    const nodeGeometry = nodesRef.current?.geometry;
    const edgeGeometry = edgesRef.current?.geometry;
    if (!nodeGeometry || !edgeGeometry) return;

    const nodeColorAttr = nodeGeometry.getAttribute('color') as THREE.BufferAttribute;
    const nodeIntensityAttr = nodeGeometry.getAttribute('intensity') as THREE.BufferAttribute;
    const edgeColorAttr = edgeGeometry.getAttribute('color') as THREE.BufferAttribute;
    const nodeColors = nodeColorAttr.array as Float32Array;
    const edgeColors = edgeColorAttr.array as Float32Array;
    const colour = scratch.current;

    // Start a new consensus round from a random node.
    if (elapsed - round.current.startedAt > ROUND_INTERVAL) {
      const source = Math.floor(Math.random() * graph.nodes.length);
      round.current = {
        depths: hopDepths(graph.nodes.length, adjacency, source),
        startedAt: elapsed,
      };
    }

    const sinceRound = elapsed - round.current.startedAt;

    // Nodes: an idle shimmer, overlaid with the confirmation flash as the round
    // reaches each hop distance.
    for (let i = 0; i < graph.nodes.length; i += 1) {
      const shimmer = 0.26 + Math.sin(elapsed * 1.6 + i * 0.9) * 0.08;
      const depth = round.current.depths[i] ?? Number.POSITIVE_INFINITY;
      const sinceReached = sinceRound - depth * HOP_SECONDS;

      const flash =
        Number.isFinite(depth) && sinceReached >= 0 ? Math.exp(-sinceReached / FLASH_DECAY) : 0;

      nodeIntensityAttr.setX(i, shimmer + flash * 0.95);
      colour.copy(COLOR_IDLE).lerp(COLOR_FINAL, Math.min(1, flash * 1.4));
      colour.toArray(nodeColors, i * 3);
    }

    // Edges brighten once both endpoints have confirmed.
    for (let i = 0; i < graph.edges.length; i += 1) {
      const edge = graph.edges[i];
      if (!edge) continue;

      const depthA = round.current.depths[edge.a] ?? Number.POSITIVE_INFINITY;
      const depthB = round.current.depths[edge.b] ?? Number.POSITIVE_INFINITY;
      const reachedAt = Math.max(depthA, depthB) * HOP_SECONDS;
      const sinceReached = sinceRound - reachedAt;

      const flash =
        Number.isFinite(reachedAt) && sinceReached >= 0
          ? Math.exp(-sinceReached / (FLASH_DECAY * 0.8))
          : 0;

      colour
        .copy(COLOR_EDGE)
        .lerp(COLOR_FINAL, Math.min(1, flash * 1.2))
        .multiplyScalar(0.42 + flash * 0.9);

      colour.toArray(edgeColors, i * 6);
      colour.toArray(edgeColors, i * 6 + 3);
    }

    nodeColorAttr.needsUpdate = true;
    nodeIntensityAttr.needsUpdate = true;
    edgeColorAttr.needsUpdate = true;

    // Gossip messages travel their edge, then hop to a new one.
    const gossipGeometry = gossipRef.current?.geometry;
    if (!gossipGeometry) return;

    const positionAttr = gossipGeometry.getAttribute('position') as THREE.BufferAttribute;
    const intensityAttr = gossipGeometry.getAttribute('intensity') as THREE.BufferAttribute;
    const flight = gossip.current;

    for (let i = 0; i < GOSSIP_COUNT; i += 1) {
      const advanced = (flight.progress[i] ?? 0) + delta * (flight.speed[i] ?? 0.4);

      if (advanced >= 1) {
        flight.progress[i] = 0;
        flight.edgeIndex[i] = Math.floor(flight.random() * graph.edges.length);
        flight.reversed[i] = flight.random() > 0.5 ? 1 : 0;
        flight.speed[i] = 0.35 + flight.random() * 0.5;
      } else {
        flight.progress[i] = advanced;
      }

      const edge = graph.edges[flight.edgeIndex[i] ?? 0];
      if (!edge) continue;

      const forward = flight.reversed[i] === 0;
      const from = graph.nodes[forward ? edge.a : edge.b];
      const to = graph.nodes[forward ? edge.b : edge.a];
      if (!from || !to) continue;

      const t = flight.progress[i] ?? 0;
      positionAttr.setXYZ(
        i,
        from.x + (to.x - from.x) * t,
        from.y + (to.y - from.y) * t,
        from.z + (to.z - from.z) * t,
      );
      // Fade in and out so messages appear to depart and arrive.
      intensityAttr.setX(i, Math.sin(t * Math.PI) * 1.1);
    }

    positionAttr.needsUpdate = true;
    intensityAttr.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <lineSegments ref={edgesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[buffers.edgePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[buffers.edgeColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[buffers.nodePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[buffers.nodeColors, 3]} />
          <bufferAttribute attach="attributes-size" args={[buffers.nodeSizes, 1]} />
          <bufferAttribute attach="attributes-intensity" args={[buffers.nodeIntensity, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={nodeMaterialRef}
          vertexShader={glowVertexShader}
          fragmentShader={glowFragmentShader}
          uniforms={uniforms}
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {!reducedMotion && (
        <points ref={gossipRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[gossipBuffers.positions, 3]} />
            <bufferAttribute attach="attributes-color" args={[gossipBuffers.colors, 3]} />
            <bufferAttribute attach="attributes-size" args={[gossipBuffers.sizes, 1]} />
            <bufferAttribute attach="attributes-intensity" args={[gossipBuffers.intensity, 1]} />
          </bufferGeometry>
          <shaderMaterial
            vertexShader={glowVertexShader}
            fragmentShader={glowFragmentShader}
            uniforms={uniforms}
            vertexColors
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}
    </group>
  );
}
