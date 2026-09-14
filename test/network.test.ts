import { describe, expect, it } from 'vitest';

import {
  buildAdjacency,
  buildEdges,
  createNetwork,
  createRandom,
  fibonacciSphere,
  hopDepths,
  type Vec3,
} from '@/lib/network';

function magnitude(point: Vec3): number {
  return Math.sqrt(point.x ** 2 + point.y ** 2 + point.z ** 2);
}

describe('fibonacciSphere', () => {
  it('should return the requested number of points', () => {
    expect(fibonacciSphere(64, 2)).toHaveLength(64);
  });

  it('should return an empty array when the count is zero or negative', () => {
    expect(fibonacciSphere(0, 2)).toEqual([]);
    expect(fibonacciSphere(-5, 2)).toEqual([]);
  });

  it('should place every point on the sphere of the requested radius', () => {
    for (const point of fibonacciSphere(48, 3)) {
      expect(magnitude(point)).toBeCloseTo(3, 5);
    }
  });

  it('should place a single point at the equator rather than dividing by zero', () => {
    const [only] = fibonacciSphere(1, 2);
    expect(only).toBeDefined();
    expect(Number.isNaN(only?.x ?? Number.NaN)).toBe(false);
    expect(only?.y).toBe(0);
  });
});

describe('buildEdges', () => {
  it('should emit each undirected edge exactly once with a < b', () => {
    const nodes = fibonacciSphere(20, 2);
    const edges = buildEdges(nodes, 3);

    const keys = edges.map((edge) => `${edge.a}-${edge.b}`);
    expect(new Set(keys).size).toBe(keys.length);
    for (const edge of edges) {
      expect(edge.a).toBeLessThan(edge.b);
    }
  });

  it('should never connect a node to itself', () => {
    for (const edge of buildEdges(fibonacciSphere(16, 2), 4)) {
      expect(edge.a).not.toBe(edge.b);
    }
  });

  it('should return no edges when there are fewer than two nodes', () => {
    expect(buildEdges(fibonacciSphere(1, 2), 3)).toEqual([]);
    expect(buildEdges([], 3)).toEqual([]);
  });

  it('should return no edges when no neighbours are requested', () => {
    expect(buildEdges(fibonacciSphere(10, 2), 0)).toEqual([]);
  });

  it('should connect the only possible pair when given two nodes', () => {
    const edges = buildEdges(fibonacciSphere(2, 1), 3);
    expect(edges).toEqual([{ a: 0, b: 1 }]);
  });
});

describe('buildAdjacency', () => {
  it('should list both endpoints of every edge', () => {
    const adjacency = buildAdjacency(3, [
      { a: 0, b: 1 },
      { a: 1, b: 2 },
    ]);

    expect(adjacency[0]).toEqual([1]);
    expect(adjacency[1]).toEqual([0, 2]);
    expect(adjacency[2]).toEqual([1]);
  });

  it('should give every node an entry even when it has no edges', () => {
    expect(buildAdjacency(3, [])).toEqual([[], [], []]);
  });
});

describe('hopDepths', () => {
  it('should report the shortest hop count from the source to each node', () => {
    const edges = [
      { a: 0, b: 1 },
      { a: 1, b: 2 },
      { a: 2, b: 3 },
      { a: 0, b: 3 },
    ];
    const depths = hopDepths(4, buildAdjacency(4, edges), 0);

    expect(depths).toEqual([0, 1, 2, 1]);
  });

  it('should report Infinity for nodes in a disconnected component', () => {
    const depths = hopDepths(3, buildAdjacency(3, [{ a: 0, b: 1 }]), 0);
    expect(depths[2]).toBe(Number.POSITIVE_INFINITY);
  });

  it('should return all-Infinity when the source index is out of range', () => {
    const depths = hopDepths(3, buildAdjacency(3, [{ a: 0, b: 1 }]), 9);
    expect(depths.every((depth) => depth === Number.POSITIVE_INFINITY)).toBe(true);
  });
});

describe('createNetwork', () => {
  it('should produce a fully connected graph for the hero configuration', () => {
    const { nodes, edges } = createNetwork(66, 2.6, 3);
    const depths = hopDepths(nodes.length, buildAdjacency(nodes.length, edges), 0);

    // A disconnected node would never light up during a consensus round.
    expect(depths.every((depth) => Number.isFinite(depth))).toBe(true);
  });

  it('should reference only valid node indices', () => {
    const { nodes, edges } = createNetwork(30, 2, 3);
    for (const edge of edges) {
      expect(edge.a).toBeGreaterThanOrEqual(0);
      expect(edge.b).toBeLessThan(nodes.length);
    }
  });
});

describe('createRandom', () => {
  it('should produce the same sequence for the same seed', () => {
    const first = createRandom(7);
    const second = createRandom(7);
    const draw = (next: () => number): number[] => [next(), next(), next()];

    expect(draw(first)).toEqual(draw(second));
  });

  it('should produce values within the unit interval', () => {
    const next = createRandom(123);
    for (let i = 0; i < 200; i += 1) {
      const value = next();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });

  it('should produce different sequences for different seeds', () => {
    expect(createRandom(1)()).not.toBe(createRandom(2)());
  });
});
