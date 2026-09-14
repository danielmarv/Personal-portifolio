import { contributions, peakMerged, totalMerged } from '@/content/contributions';
import { sections, ui } from '@/content/site';
import { formatCount } from '@/lib/utils';

import { SectionHeading } from '../ui/section-heading';

export function OpenSource() {
  return (
    <section
      id="open-source"
      aria-labelledby="open-source-heading"
      className="container-page py-24 md:py-32"
    >
      <SectionHeading
        id="open-source-heading"
        heading={sections.openSource.heading}
        standfirst={sections.openSource.standfirst}
        aside={
          <div className="panel px-6 py-5">
            <span className="text-ink block text-5xl font-extrabold tracking-tight tabular-nums">
              {formatCount(totalMerged)}
            </span>
            <span className="text-ink-dim mt-1 block text-sm">{ui.mergedPullRequests}</span>
            <code className="text-ink-faint mt-4 block font-mono text-[0.6875rem] leading-relaxed">
              {sections.openSource.query}
            </code>
          </div>
        }
      />

      <ol className="mt-14">
        {contributions.map((group, index) => {
          const share = Math.max(4, Math.round((group.merged / peakMerged) * 100));

          return (
            <li key={group.id} className="border-hairline border-t last:border-b">
              <a
                href={group.href}
                target="_blank"
                rel="noreferrer"
                className="group hover:bg-surface/40 block py-7 transition-colors"
              >
                <div className="grid gap-x-6 gap-y-3 md:grid-cols-12 md:items-baseline">
                  <div className="md:col-span-4">
                    <h3 className="text-ink group-hover:text-aurora-green flex flex-wrap items-center gap-x-3 gap-y-1.5 text-lg font-semibold transition-colors">
                      {group.organisation}
                      {group.upstream && (
                        <span className="border-aurora-green/35 text-aurora-green/90 rounded-full border px-2 py-0.5 text-[0.6875rem] font-medium">
                          {sections.openSource.upstreamLabel}
                        </span>
                      )}
                    </h3>
                    <p className="text-ink-faint mt-1 font-mono text-xs">
                      {group.owners.map((owner) => `@${owner}`).join(' ')}
                    </p>
                  </div>

                  <p className="text-ink-dim text-sm text-pretty md:col-span-6">{group.summary}</p>

                  <p className="text-ink text-lg font-semibold tabular-nums md:col-span-2 md:text-right">
                    {formatCount(group.merged)}
                    <span className="sr-only"> {ui.mergedPullRequests}</span>
                  </p>
                </div>

                {/* Bar length is proportional to the largest group, so the shape
                    of the record is legible at a glance. */}
                <div aria-hidden className="mt-5 h-0.5 w-full">
                  <div
                    className="ledger-bar from-aurora-green via-aurora-cyan to-aurora-violet h-0.5 rounded-full bg-linear-to-r"
                    style={{
                      width: `${share}%`,
                      animationDelay: `${index * 70}ms`,
                    }}
                  />
                </div>
              </a>
            </li>
          );
        })}
      </ol>

      <p className="text-ink-faint mt-6 flex items-center gap-2.5 text-xs">
        <span aria-hidden className="border-aurora-green/50 h-2 w-2 rounded-full border" />
        {sections.openSource.upstreamLegend}
      </p>
    </section>
  );
}
