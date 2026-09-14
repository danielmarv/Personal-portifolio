/**
 * Career timeline. Date ranges are derived from the first and last merged pull
 * request in each organisation's repositories, so they reflect shipped work
 * rather than contract dates.
 */

export interface TimelineEntry {
  readonly id: string;
  readonly role: string;
  readonly organisation: string;
  readonly period: string;
  readonly ongoing: boolean;
  readonly summary: string;
  readonly contributions: readonly string[];
  readonly href?: string;
}

export const timeline: readonly TimelineEntry[] = [
  {
    id: 'open-elements',
    role: 'Software Engineer',
    organisation: 'Open Elements',
    period: 'April 2025 — present',
    ongoing: true,
    summary:
      'Building and maintaining platform services across Java and TypeScript — ' +
      'object storage, event ingestion and the systems the business runs on.',
    contributions: [
      'Proved out OES, the S3-compatible object storage service, against real consumer workloads — multipart uploads, presigned URLs, versioning, object versions and ranged reads',
      'Built a Spring-based GitHub webhook service for event-driven automation',
      'Shipped the internal finance platform, server and frontend',
    ],
    href: 'https://open-elements.com',
  },
  {
    id: 'hiero',
    role: 'SDK Maintainer and Contributor',
    organisation: 'Hiero — LF Decentralized Trust',
    period: 'February 2026 — present',
    ongoing: true,
    summary:
      'Maintaining and extending the multi-language ledger SDKs behind Hiero, the ' +
      'Linux Foundation project underpinning Hedera and compatible networks.',
    contributions: [
      'Maintain and extend the Python and Swift SDKs for on-ledger assets and smart contracts',
      'Work on the Technology Compatibility Kit runner that holds every SDK to one conformance suite',
      'Built contributor analytics tracking activity and diversity across the organisation',
    ],
    href: 'https://github.com/hiero-ledger',
  },
  {
    id: 'clycites',
    role: 'Founder and Maintainer',
    organisation: 'ClyCites',
    period: 'February 2024 — present',
    ongoing: true,
    summary:
      'An agricultural market intelligence platform for Ugandan farmer groups, ' +
      'cooperatives and agri-buyers, built and maintained end to end.',
    contributions: [
      'Designed the API, price-monitoring service and operator frontend',
      'Rebuilt the platform onto a strict-mode TypeScript monorepo with NestJS and Next.js',
    ],
    href: 'https://github.com/ClyCites',
  },
  {
    id: 'bugema',
    role: 'Web Platform Developer',
    organisation: 'Bugema University',
    period: 'May 2024 — October 2025',
    ongoing: false,
    summary:
      'Primary developer on the university web platform and its campus publishing ' +
      'systems — the engagement behind the largest share of my merged work.',
    contributions: [
      '366 merged pull requests across the university platform and blog',
      'Built and maintained the public site, admin tooling and editorial workflow',
    ],
    href: 'https://github.com/webbuniv',
  },
  {
    id: 'airqo',
    role: 'Frontend Contributor',
    organisation: 'AirQo',
    period: 'May 2023 — April 2025',
    ongoing: false,
    summary:
      'Frontend work for the air-quality monitoring network measuring pollution ' +
      'across African cities.',
    contributions: [
      'Interface work for the monitoring and analytics platform',
      'My first sustained contribution to a public-interest open-source project',
    ],
    href: 'https://github.com/airqo-platform',
  },
] as const;

export interface Education {
  readonly qualification: string;
  readonly institution: string;
  readonly detail: string;
}

export const education: Education = {
  qualification: 'BSc Software Engineering',
  institution: 'Bugema University',
  detail: 'Kampala, Uganda',
} as const;
