export interface NavItem {
  readonly id: string;
  readonly label: string;
  readonly href: string;
}

export const nav: readonly NavItem[] = [
  { id: 'open-source', label: 'Open source', href: '#open-source' },
  { id: 'path', label: 'Path', href: '#path' },
  { id: 'stack', label: 'Stack', href: '#stack' },
  { id: 'contact', label: 'Contact', href: '#contact' },
] as const;

export const sections = {
  openSource: {
    heading: 'The ledger',
    standfirst:
      'Every merged pull request I have authored into a repository I do not own, ' +
      'grouped by the organisation that received it. The numbers come straight ' +
      'from the GitHub API — you can run the query yourself.',
    query: 'author:danielmarv type:pr is:merged -user:danielmarv',
    upstreamLabel: 'Upstream',
    upstreamLegend: 'Marked rows are upstream open-source foundations and programmes.',
  },
  path: {
    heading: 'Path',
    standfirst:
      'Dates are taken from the first and last merged pull request in each ' +
      'organisation, so they track shipped work rather than contract dates.',
  },
  stack: {
    heading: 'Stack',
    standfirst: 'What I reach for, and why.',
  },
  contact: {
    heading: 'Get in touch',
    standfirst:
      'I read everything that arrives. If you are building infrastructure that ' +
      'has to be trusted, I would like to hear about it.',
    action: 'Send an email',
  },
} as const;

export const ui = {
  skipToContent: 'Skip to content',
  menuOpen: 'Open menu',
  menuClose: 'Close menu',
  viewRepository: 'View repository',
  viewOnGitHub: 'View on GitHub',
  mergedPullRequests: 'merged pull requests',
  heroScrollHint: 'Scroll',
  networkCaption: 'A gossip network reaching consensus — the primitive underneath most of my work.',
  networkPaused: 'Animation paused — reduced motion is enabled.',
  copyright: (year: number, name: string): string => `© ${year} ${name}`,
  builtWith: 'Built with Next.js, React Three Fiber and Tailwind CSS.',
} as const;
