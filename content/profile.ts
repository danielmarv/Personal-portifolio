/**
 * Single source of truth for identity and contact details.
 * All user-facing strings live under `content/` so translations can be added
 * later without touching components.
 */

export interface SocialLink {
  readonly id: string;
  readonly label: string;
  readonly handle: string;
  readonly href: string;
}

export interface Metric {
  readonly id: string;
  readonly value: number;
  readonly label: string;
  readonly detail: string;
}

export const profile = {
  name: 'Ntege Daniel Marvin',
  shortName: 'Daniel Ntege',
  initials: 'ND',
  role: 'Software Engineer',
  focus: 'Backend systems, distributed ledgers and developer tooling',
  organisation: 'Open Elements',
  organisationUrl: 'https://open-elements.com',
  location: 'Kampala, Uganda',
  timezone: 'Africa/Kampala',
  email: 'danientege785@gmail.com',
  available: true,
  availability: 'Open to backend, platform and open-source engineering work.',

  /** Hero statement. Two sentences, no adjectives that a reader cannot verify. */
  headline: 'I build the systems that keep records honest.',
  standfirst:
    'Backend and platform engineer working on distributed-ledger infrastructure, ' +
    'agricultural intelligence and public-interest software from Kampala. ' +
    'Most of what I build ends up in someone else’s repository.',

  bio: [
    'I work on the unglamorous half of software: the APIs, schemas, queues and ' +
      'consensus plumbing that decide whether a product can be trusted at scale. ' +
      'Day to day that means TypeScript and Node on the surface, PostgreSQL and ' +
      'Prisma underneath, and Hedera’s consensus service when a record has to ' +
      'outlive the company that wrote it.',
    'Most of my output is open source. I contribute to the Hiero ledger SDKs, ' +
      'the Open Elements platform, Adoptium and AirQo’s air-quality tooling, and ' +
      'I maintain ClyCites — a market intelligence platform for Ugandan farmer ' +
      'cooperatives that started as a university project and did not stop.',
    'I studied Software Engineering at Bugema University and joined Open Elements ' +
      'as a developer, where I work across Java and TypeScript services, ' +
      'S3-compatible storage and the tooling that keeps open-source projects moving.',
  ],
} as const;

export const socials: readonly SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    handle: 'danielmarv',
    href: 'https://github.com/danielmarv',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'Ntege Daniel',
    href: 'https://www.linkedin.com/in/ntege-daniela85486242',
  },
  {
    id: 'x',
    label: 'X',
    handle: 'danielmarvin785',
    href: 'https://twitter.com/danielmarvin785',
  },
  {
    id: 'email',
    label: 'Email',
    handle: 'danientege785@gmail.com',
    href: 'mailto:danientege785@gmail.com',
  },
] as const;

/**
 * Headline metrics. Every figure here is countable from the public GitHub API
 * so a sceptical reader can reproduce it.
 */
export const metrics: readonly Metric[] = [
  {
    id: 'merged',
    value: 844,
    label: 'merged pull requests',
    detail: 'into repositories I do not own',
  },
  {
    id: 'repos',
    value: 58,
    label: 'repositories',
    detail: 'shipped to across the ecosystem',
  },
  {
    id: 'orgs',
    value: 18,
    label: 'organisations and accounts',
    detail: 'from Hiero and Adoptium to AirQo',
  },
  {
    id: 'public',
    value: 116,
    label: 'public repositories',
    detail: 'authored under danielmarv',
  },
] as const;
