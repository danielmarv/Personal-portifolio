/**
 * Technical stack, grouped by the layer it occupies rather than by logo.
 * `primary` marks the tools reached for by default.
 */

export interface StackItem {
  readonly name: string;
  readonly primary: boolean;
}

export interface StackGroup {
  readonly id: string;
  readonly title: string;
  readonly note: string;
  readonly items: readonly StackItem[];
}

export const stack: readonly StackGroup[] = [
  {
    id: 'languages',
    title: 'Languages',
    note: 'TypeScript for most things; Python and Java where the ecosystem is stronger.',
    items: [
      { name: 'TypeScript', primary: true },
      { name: 'JavaScript', primary: true },
      { name: 'Python', primary: true },
      { name: 'Java', primary: false },
      { name: 'Swift', primary: false },
      { name: 'Rust', primary: false },
      { name: 'Go', primary: false },
      { name: 'Solidity', primary: false },
      { name: 'SQL', primary: true },
    ],
  },
  {
    id: 'backend',
    title: 'Services and APIs',
    note: 'REST first, with queues and workers where the work outlives the request.',
    items: [
      { name: 'Node.js', primary: true },
      { name: 'NestJS', primary: true },
      { name: 'Express', primary: true },
      { name: 'Spring Boot', primary: false },
      { name: 'FastAPI', primary: false },
      { name: 'Flask', primary: false },
      { name: 'Socket.IO', primary: false },
      { name: 'BullMQ', primary: false },
    ],
  },
  {
    id: 'data',
    title: 'Data',
    note: 'Relational by default. Schema migrations are part of the feature, not an afterthought.',
    items: [
      { name: 'PostgreSQL', primary: true },
      { name: 'Prisma', primary: true },
      { name: 'PostGIS', primary: false },
      { name: 'Redis', primary: true },
      { name: 'MongoDB', primary: false },
      { name: 'MySQL', primary: false },
    ],
  },
  {
    id: 'ledger',
    title: 'Distributed ledger',
    note: 'Consensus as a durability primitive — for records that must outlive their issuer.',
    items: [
      { name: 'Hedera Consensus Service', primary: true },
      { name: 'Hedera Token Service', primary: false },
      { name: 'Hiero SDKs', primary: true },
      { name: 'W3C Verifiable Credentials', primary: true },
      { name: 'DIDs', primary: true },
      { name: 'OID4VCI / OID4VP', primary: false },
      { name: 'Foundry', primary: false },
    ],
  },
  {
    id: 'frontend',
    title: 'Interfaces',
    note: 'Enough web and Android to ship the whole product, not just the API behind it.',
    items: [
      { name: 'React', primary: true },
      { name: 'Next.js', primary: true },
      { name: 'Tailwind CSS', primary: true },
      { name: 'shadcn/ui', primary: false },
      { name: 'TanStack Query', primary: false },
      { name: 'Android', primary: true },
      { name: 'Three.js', primary: false },
    ],
  },
  {
    id: 'platform',
    title: 'Platform',
    note: 'Containers, orchestration, pipelines and S3-compatible storage.',
    items: [
      { name: 'Docker', primary: true },
      { name: 'Podman', primary: true },
      { name: 'Kubernetes', primary: true },
      { name: 'GitHub Actions', primary: true },
      { name: 'Turborepo', primary: true },
      { name: 'pnpm workspaces', primary: true },
      { name: 'Linux', primary: true },
      { name: 'S3', primary: true },
    ],
  },
] as const;
