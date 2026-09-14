/**
 * Geometry and graph helpers for the hero's consensus network.
 *
 * Kept free of three.js and React so the topology can be unit-tested on its own.
 */

export interface Vec3 {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export interface NetworkEdge {
  /** Index of the lower-numbered endpoint. */
  readonly a: number;
  /** Index of the higher-numbered endpoint. */
  readonly b: number;
}

export interface NetworkGraph {
  readonly nodes: readonly Vec3[];
  readonly edges: readonly NetworkEdge[];
}

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

/**
 * Distribute `count` points near-uniformly over a sphere using the golden-angle
 * spiral. Far more even than random sampling, which clumps.
 */
export function fibonacciSphere(count: number, radius: number): Vec3[] {
  if (count <= 0) return [];

  const points: Vec3[] = [];
  for (let i = 0; i < count; i += 1) {
    // y walks linearly from +1 to -1; the radius of each ring follows from it.
    const y = count === 1 ? 0 : 1 - (i / (count - 1)) * 2;
    const ringRadius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = GOLDEN_ANGLE * i;

    points.push({
      x: Math.cos(theta) * ringRadius * radius,
      y: y * radius,
      z: Math.sin(theta) * ringRadius * radius,
    });
  }

  return points;
}

function squaredDistance(a: Vec3, b: Vec3): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return dx * dx + dy * dy + dz * dz;
}

/**
 * Connect every node to its `neighbours` nearest peers, de-duplicated so each
 * undirected edge appears exactly once with `a < b`.
 */
export function buildEdges(nodes: readonly Vec3[], neighbours: number): NetworkEdge[] {
  if (nodes.length < 2 || neighbours < 1) return [];

  const seen = new Set<number>();
  const edges: NetworkEdge[] = [];

  for (let i = 0; i < nodes.length; i += 1) {
    const origin = nodes[i];
    if (!origin) continue;

    const ranked = nodes
      .map((node, index) => ({ index, distance: squaredDistance(origin, node) }))
      .filter((candidate) => candidate.index !== i)
      .sort((left, right) => left.distance - right.distance)
      .slice(0, neighbours);

    for (const candidate of ranked) {
      const a = Math.min(i, candidate.index);
      const b = Math.max(i, candidate.index);
      const key = a * nodes.length + b;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({ a, b });
    }
  }

  return edges;
}

/** Adjacency list keyed by node index. */
export function buildAdjacency(nodeCount: number, edges: readonly NetworkEdge[]): number[][] {
  const adjacency: number[][] = Array.from({ length: nodeCount }, () => []);

  for (const edge of edges) {
    adjacency[edge.a]?.push(edge.b);
    adjacency[edge.b]?.push(edge.a);
  }

  return adjacency;
}

/**
 * Breadth-first hop count from `source` to every node. Unreachable nodes get
 * `Infinity`. This drives the consensus wave: a node lights up when the round
 * reaches its hop distance, so the pulse spreads the way gossip actually does.
 */
export function hopDepths(
  nodeCount: number,
  adjacency: readonly (readonly number[])[],
  source: number,
): number[] {
  const depths = new Array<number>(nodeCount).fill(Number.POSITIVE_INFINITY);
  if (source < 0 || source >= nodeCount) return depths;

  depths[source] = 0;
  const queue: number[] = [source];

  for (let head = 0; head < queue.length; head += 1) {
    const current = queue[head];
    if (current === undefined) continue;

    const currentDepth = depths[current] ?? Number.POSITIVE_INFINITY;
    for (const next of adjacency[current] ?? []) {
      if ((depths[next] ?? Number.POSITIVE_INFINITY) <= currentDepth + 1) continue;
      depths[next] = currentDepth + 1;
      queue.push(next);
    }
  }

  return depths;
}

/** Build the full hero topology in one call. */
export function createNetwork(nodeCount: number, radius: number, neighbours: number): NetworkGraph {
  const nodes = fibonacciSphere(nodeCount, radius);
  return { nodes, edges: buildEdges(nodes, neighbours) };
}

/**
 * Deterministic pseudo-random generator (mulberry32). A fixed seed keeps the
 * server and client render identical, which matters for hydration.
 */
export function createRandom(seed: number): () => number {
  let state = seed >>> 0;

  return function next(): number {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
