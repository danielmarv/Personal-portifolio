/** Selected work. Every entry links to a public repository. */

export interface Project {
  readonly id: string;
  readonly name: string;
  readonly repo: string;
  readonly tagline: string;
  readonly description: string;
  /** What makes the engineering interesting, in the author's own terms. */
  readonly highlights: readonly string[];
  readonly stack: readonly string[];
  readonly href: string;
  readonly year: string;
  readonly domain: string;
  readonly featured: boolean;
}

export const projects: readonly Project[] = [
  {
    id: 'prooflayer',
    name: 'ProofLayer',
    repo: 'danielmarv/edufy',
    tagline: 'Credentials that survive the institution that issued them.',
    description:
      'A credential platform that anchors proofs to the Hedera Consensus Service. ' +
      'Institutions issue tamper-evident certificates, holders keep them in a ' +
      'portfolio they control, and any third party can verify one in real time — ' +
      'from a QR code, a PDF or an API call, without asking the issuer for permission.',
    highlights: [
      'HCS proof anchoring with independent, offline-checkable verification',
      'W3C Verifiable Credentials, did:web issuer identity and SD-JWT VC',
      'OID4VCI and OID4VP issuance and presentation flows',
      'Scalable revocation status lists with HCS continuity',
    ],
    stack: ['TypeScript', 'Next.js', 'Prisma', 'PostgreSQL', 'Hedera HCS', 'HTS'],
    href: 'https://github.com/danielmarv/edufy',
    year: '2026',
    domain: 'Digital trust',
    featured: true,
  },
  {
    id: 'agentguard',
    name: 'AgentGuard',
    repo: 'danielmarv/AgentGuard',
    tagline: 'A policy firewall for autonomous payments.',
    description:
      'AI agents increasingly need to pay for the APIs they call. AgentGuard lets ' +
      'them settle x402-protected requests on Hedera without ever holding ' +
      'unrestricted wallet access: every payment is evaluated against programmable ' +
      'policy before a key is touched.',
    highlights: [
      'Per-transaction ceilings, rolling daily budgets and approved-token lists',
      'Recipient and service-domain allowlists',
      'Human-approval thresholds for anything above a configured limit',
      'Built against Coinbase’s x402 payment protocol',
    ],
    stack: ['TypeScript', 'Hedera', 'x402', 'Node.js'],
    href: 'https://github.com/danielmarv/AgentGuard',
    year: '2026',
    domain: 'Agent infrastructure',
    featured: true,
  },
  {
    id: 'safegrid',
    name: 'SafeGrid',
    repo: 'danielmarv/SafeGrid',
    tagline: 'Public safety coordination for Uganda and East Africa.',
    description:
      'A coordination layer connecting citizens, first responders, institutions and ' +
      'government authorities around incident reporting and emergency response. ' +
      'Geospatial from the ground up, with real-time dispatch and an explicit ' +
      'stance that it supplements — never replaces — official emergency services.',
    highlights: [
      'PostGIS-backed incident geography and responder routing',
      'Real-time dispatch over Socket.IO with BullMQ job orchestration',
      'Turborepo monorepo spanning API, dashboard and public portal',
    ],
    stack: ['TypeScript', 'Express 5', 'PostgreSQL', 'PostGIS', 'Prisma', 'Redis', 'Next.js'],
    href: 'https://github.com/danielmarv/SafeGrid',
    year: '2026',
    domain: 'Civic technology',
    featured: true,
  },
  {
    id: 'clycites',
    name: 'ClyCites',
    repo: 'danielmarv/clycites-platform',
    tagline: 'Market intelligence for farmer cooperatives.',
    description:
      'Price discovery and cooperative management for Ugandan farmer groups and ' +
      'agri-buyers. Smallholders negotiate against buyers who know the market ' +
      'better than they do; ClyCites closes that gap with monitored prices and ' +
      'shared cooperative infrastructure.',
    highlights: [
      'Continuous price monitoring across regional markets',
      'Cooperative, produce and buyer matching services',
      'Strict-mode TypeScript monorepo on Node 24 and Turborepo',
    ],
    stack: ['TypeScript', 'NestJS', 'Next.js', 'PostgreSQL', 'Prisma', 'Redis', 'Zod'],
    href: 'https://github.com/danielmarv/clycites-platform',
    year: '2026',
    domain: 'Agriculture',
    featured: true,
  },
  {
    id: 'afriledger',
    name: 'AfriLedger Capital',
    repo: 'danielmarv/AfriLedger',
    tagline: 'Capital markets infrastructure for Africa.',
    description:
      'Digital capital markets rails built on Hedera, with immutable audit logging ' +
      'through the consensus service and document custody in S3-compatible storage.',
    highlights: [
      'HCS-backed immutable audit trail',
      'JWT authentication with role-based access control',
    ],
    stack: ['TypeScript', 'Express', 'Next.js', 'PostgreSQL', 'Prisma', 'Hedera', 'MinIO'],
    href: 'https://github.com/danielmarv/AfriLedger',
    year: '2026',
    domain: 'Financial infrastructure',
    featured: false,
  },
  {
    id: 'staycore',
    name: 'StayCore',
    repo: 'danielmarv/staycore',
    tagline: 'Multi-tenant hotel operations, end to end.',
    description:
      'An enterprise hotel management platform covering front desk, folios, night ' +
      'audit, point of sale, inventory, procurement and recipe costing — with ' +
      'tenant, hotel and branch isolation enforced throughout.',
    highlights: [
      'Tenant/hotel/branch isolation across every module',
      'Full POS and inventory subsystems with recipe-level costing',
    ],
    stack: ['NestJS', 'Next.js', 'React', 'Prisma', 'PostgreSQL', 'Redis'],
    href: 'https://github.com/danielmarv/staycore',
    year: '2026',
    domain: 'Hospitality',
    featured: false,
  },
  {
    id: 'accrue',
    name: 'Accrue',
    repo: 'danielmarv/accrue',
    tagline: 'Staking rewards without the loop.',
    description:
      'A minimal ERC-20 staking system using the accumulated-reward-per-token ' +
      'pattern, so accounting stays O(1) no matter how many stakers join.',
    highlights: [
      'Synthetix-style reward accumulator — constant gas regardless of staker count',
      'Role-gated minting via OpenZeppelin AccessControl',
    ],
    stack: ['Solidity', 'Foundry', 'OpenZeppelin'],
    href: 'https://github.com/danielmarv/accrue',
    year: '2026',
    domain: 'Smart contracts',
    featured: false,
  },
  {
    id: 'oes-test',
    name: 'OES Test Lab',
    repo: 'danielmarv/oes-test',
    tagline: 'Does this object store actually work?',
    description:
      'A Next.js application that exercises Open Elements’ S3-compatible storage ' +
      'the way a real consumer would. No fixtures and no mocked responses — every ' +
      'operation on screen is a live call against the deployed endpoint.',
    highlights: [
      'Multipart uploads, presigned PUT/GET and real expiry testing',
      'Versioning, historical reads and ranged GETs',
    ],
    stack: ['TypeScript', 'Next.js', 'AWS SDK', 'S3'],
    href: 'https://github.com/danielmarv/oes-test',
    year: '2026',
    domain: 'Storage',
    featured: false,
  },
] as const;

export const featuredProjects: readonly Project[] = projects.filter((project) => project.featured);
export const otherProjects: readonly Project[] = projects.filter((project) => !project.featured);
