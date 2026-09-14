/**
 * Open-source contribution ledger.
 *
 * Counts are merged pull requests authored by `danielmarv` into repositories
 * owned by someone else, as reported by the GitHub search API
 * (`author:danielmarv type:pr is:merged -user:danielmarv`). Related GitHub
 * owners that belong to the same programme are grouped into one row.
 */

export interface ContributionGroup {
  readonly id: string;
  readonly organisation: string;
  readonly summary: string;
  /** GitHub owners aggregated into this row. */
  readonly owners: readonly string[];
  readonly merged: number;
  readonly href: string;
  /** Marks work for a recognised upstream open-source foundation or programme. */
  readonly upstream: boolean;
}

export const contributions: readonly ContributionGroup[] = [
  {
    id: 'bugema',
    organisation: 'Bugema University',
    summary:
      'University web platform and campus publishing systems — the long-running ' +
      'engagement where most of my production hours were spent.',
    owners: ['webbuniv', 'webbunivAdmin'],
    merged: 366,
    href: 'https://github.com/webbuniv',
    upstream: false,
  },
  {
    id: 'open-elements',
    organisation: 'Open Elements',
    summary:
      'Company platform, the S3-compatible object store, a Spring webhook service ' +
      'and internal finance tooling, plus the public website and Decap proxy.',
    owners: ['OpenElements', 'OpenElementsLabs'],
    merged: 147,
    href: 'https://github.com/OpenElements',
    upstream: true,
  },
  {
    id: 'clycites',
    organisation: 'ClyCites',
    summary:
      'Agricultural market intelligence for Ugandan cooperatives — API, price ' +
      'monitoring service and the operator frontend.',
    owners: ['ClyCites'],
    merged: 79,
    href: 'https://github.com/ClyCites',
    upstream: false,
  },
  {
    id: 'hiero',
    organisation: 'Hiero (LF Decentralized Trust)',
    summary:
      'Ledger SDKs in Python and Swift, the project website, contributor analytics ' +
      'and x402 payment experiments.',
    owners: ['hiero-ledger', 'hiero-hackers'],
    merged: 78,
    href: 'https://github.com/hiero-ledger',
    upstream: true,
  },
  {
    id: 'agrichub',
    organisation: 'AgricHub',
    summary: 'Agricultural e-market: storefront, platform services and the API behind them.',
    owners: ['AgricHub'],
    merged: 62,
    href: 'https://github.com/AgricHub',
    upstream: false,
  },
  {
    id: 'job-portal',
    organisation: 'Job portal',
    summary: 'Recruitment platform built with a small distributed team.',
    owners: ['TroyMoses'],
    merged: 38,
    href: 'https://github.com/TroyMoses/job-portal',
    upstream: false,
  },
  {
    id: 'airqo',
    organisation: 'AirQo',
    summary:
      'Frontend for the air-quality monitoring network measuring pollution across ' +
      'African cities.',
    owners: ['airqo-platform'],
    merged: 35,
    href: 'https://github.com/airqo-platform',
    upstream: true,
  },
  {
    id: 'gsolved',
    organisation: 'GSolved',
    summary: 'SACCO management and clinic systems for Ugandan institutions.',
    owners: ['Gsolved', 'GSolved-Solutions'],
    merged: 22,
    href: 'https://github.com/Gsolved',
    upstream: false,
  },
  {
    id: 'community',
    organisation: 'Community projects',
    summary:
      'Biometric attendance research, an e-commerce application and assorted ' +
      'smaller collaborations.',
    owners: ['richarddushime', 'manishdait', 'housekonnect', 'chaynHQ'],
    merged: 12,
    href: 'https://github.com/danielmarv',
    upstream: false,
  },
  {
    id: 'badging',
    organisation: 'CHAOSS Badging',
    summary: 'Diversity, equity and inclusion badging for open-source events.',
    owners: ['badging'],
    merged: 3,
    href: 'https://github.com/badging',
    upstream: true,
  },
  {
    id: 'adoptium',
    organisation: 'Eclipse Adoptium',
    summary: 'The Adoptium website — the distribution point for Eclipse Temurin.',
    owners: ['adoptium'],
    merged: 2,
    href: 'https://github.com/adoptium',
    upstream: true,
  },
] as const;

/** Total merged pull requests across every group. */
export const totalMerged: number = contributions.reduce((sum, group) => sum + group.merged, 0);

/** Largest single group, used to scale the ledger bars. */
export const peakMerged: number = Math.max(...contributions.map((group) => group.merged));
