import { describe, expect, it } from 'vitest';

import { contributions, peakMerged, totalMerged } from '@/content/contributions';
import { metrics, profile, socials } from '@/content/profile';
import { projects } from '@/content/projects';
import { stack } from '@/content/stack';
import { timeline } from '@/content/timeline';

describe('contributions ledger', () => {
  it('should sum the group counts into the advertised total', () => {
    const expected = contributions.reduce((sum, group) => sum + group.merged, 0);
    expect(totalMerged).toBe(expected);
  });

  it('should match the merged pull request figure shown in the hero metrics', () => {
    const headline = metrics.find((metric) => metric.id === 'merged');
    expect(headline?.value).toBe(totalMerged);
  });

  it('should expose the largest group as the bar scale', () => {
    expect(peakMerged).toBe(Math.max(...contributions.map((group) => group.merged)));
  });

  it('should be ordered from most to fewest merged pull requests', () => {
    const counts = contributions.map((group) => group.merged);
    expect([...counts].sort((a, b) => b - a)).toEqual(counts);
  });

  it('should give every group a unique id and at least one GitHub owner', () => {
    const ids = contributions.map((group) => group.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const group of contributions) {
      expect(group.owners.length).toBeGreaterThan(0);
    }
  });

  it('should count the distinct owners reported in the hero metrics', () => {
    const owners = new Set(contributions.flatMap((group) => group.owners));
    const headline = metrics.find((metric) => metric.id === 'orgs');
    expect(owners.size).toBe(headline?.value);
  });
});

describe('projects', () => {
  it('should give every project a unique id', () => {
    const ids = projects.map((project) => project.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('should point every project at a GitHub repository over HTTPS', () => {
    for (const project of projects) {
      expect(project.href.startsWith('https://github.com/')).toBe(true);
    }
  });

  it('should mark exactly four projects as featured', () => {
    expect(projects.filter((project) => project.featured)).toHaveLength(4);
  });

  it('should describe a stack for every project', () => {
    for (const project of projects) {
      expect(project.stack.length).toBeGreaterThan(0);
    }
  });
});

describe('profile', () => {
  it('should use an https or mailto scheme for every social link', () => {
    for (const social of socials) {
      expect(/^(https:\/\/|mailto:)/.test(social.href)).toBe(true);
    }
  });

  it('should route the email link to the address shown on the page', () => {
    const email = socials.find((social) => social.id === 'email');
    expect(email?.href).toBe(`mailto:${profile.email}`);
  });

  it('should give every metric a label and a positive value', () => {
    for (const metric of metrics) {
      expect(metric.value).toBeGreaterThan(0);
      expect(metric.label.length).toBeGreaterThan(0);
    }
  });
});

describe('timeline', () => {
  it('should give every entry a unique id', () => {
    const ids = timeline.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('should list at least one contribution per entry', () => {
    for (const entry of timeline) {
      expect(entry.contributions.length).toBeGreaterThan(0);
    }
  });

  it('should mark the current roles as ongoing', () => {
    expect(timeline.filter((entry) => entry.ongoing).length).toBeGreaterThan(0);
  });
});

describe('stack', () => {
  it('should give every group a unique id and at least one item', () => {
    const ids = stack.map((group) => group.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const group of stack) {
      expect(group.items.length).toBeGreaterThan(0);
    }
  });

  it('should not repeat a tool across groups', () => {
    const names = stack.flatMap((group) => group.items.map((item) => item.name));
    expect(new Set(names).size).toBe(names.length);
  });
});

describe('site chrome', () => {
  it('should render the copyright line for the given year and name', async () => {
    const { ui } = await import('@/content/site');
    expect(ui.copyright(2026, 'Ntege Daniel Marvin')).toBe('© 2026 Ntege Daniel Marvin');
  });

  it('should point every navigation item at an in-page anchor', async () => {
    const { nav } = await import('@/content/site');
    for (const item of nav) {
      expect(item.href.startsWith('#')).toBe(true);
    }
  });
});
