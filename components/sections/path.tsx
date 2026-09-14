import { education, timeline } from '@/content/timeline';
import { sections } from '@/content/site';

import { SectionHeading } from '../ui/section-heading';

export function Path() {
  return (
    <section id="path" aria-labelledby="path-heading" className="container-page py-24 md:py-32">
      <SectionHeading
        id="path-heading"
        heading={sections.path.heading}
        standfirst={sections.path.standfirst}
      />

      <ol className="mt-14">
        {timeline.map((entry) => (
          <li
            key={entry.id}
            className="border-hairline grid gap-6 border-t py-10 lg:grid-cols-12 lg:gap-12 lg:py-12"
          >
            <div className="lg:col-span-4">
              <p className="text-ink-muted flex items-center gap-2.5 font-mono text-xs">
                {entry.ongoing && (
                  <span aria-hidden className="breathe bg-aurora-green h-1.5 w-1.5 rounded-full" />
                )}
                {entry.period}
              </p>
              <h3 className="text-ink mt-3 text-xl font-bold">{entry.role}</h3>
              {entry.href ? (
                <a
                  href={entry.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink-dim decoration-hairline hover:text-aurora-green hover:decoration-aurora-green mt-1 inline-block text-sm underline underline-offset-4 transition-colors"
                >
                  {entry.organisation}
                </a>
              ) : (
                <p className="text-ink-dim mt-1 text-sm">{entry.organisation}</p>
              )}
            </div>

            <div className="lg:col-span-8">
              <p className="text-ink-dim max-w-2xl text-pretty">{entry.summary}</p>
              <ul className="mt-6 space-y-2.5">
                {entry.contributions.map((contribution) => (
                  <li key={contribution} className="text-ink-muted flex gap-3 text-sm">
                    <span aria-hidden className="bg-ink-faint mt-2 h-1 w-1 shrink-0 rounded-full" />
                    {contribution}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}

        <li className="border-hairline grid gap-6 border-t py-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="text-ink-muted font-mono text-xs">Education</p>
            <h3 className="text-ink mt-3 text-xl font-bold">{education.qualification}</h3>
            <p className="text-ink-dim mt-1 text-sm">{education.institution}</p>
          </div>
          <p className="text-ink-muted text-sm lg:col-span-8">{education.detail}</p>
        </li>
      </ol>
    </section>
  );
}
