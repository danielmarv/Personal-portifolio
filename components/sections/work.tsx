import { ArrowUpRight } from 'lucide-react';

import { featuredProjects, otherProjects, type Project } from '@/content/projects';
import { sections } from '@/content/site';

import { SectionHeading } from '../ui/section-heading';

function FeaturedProject({ project }: { readonly project: Project }) {
  return (
    <article className="group border-hairline grid gap-8 border-t py-12 lg:grid-cols-12 lg:gap-12 lg:py-16">
      <div className="lg:col-span-3">
        <p className="text-ink-faint font-mono text-xs">{project.repo}</p>
        <p className="text-aurora-green mt-3 text-sm font-medium">{project.domain}</p>
        <p className="text-ink-faint mt-1 text-sm">{project.year}</p>
      </div>

      <div className="lg:col-span-9">
        <h3 className="text-heading text-ink font-extrabold tracking-tight">
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="hover:text-aurora-green inline-flex items-start gap-2 transition-colors"
          >
            {project.name}
            <ArrowUpRight
              aria-hidden
              className="text-ink-faint group-hover:text-aurora-green mt-1 h-5 w-5 shrink-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </h3>

        <p className="text-lead text-ink mt-3 font-medium text-pretty">{project.tagline}</p>
        <p className="text-ink-dim mt-5 max-w-2xl text-pretty">{project.description}</p>

        <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="text-ink-dim flex gap-3 text-sm">
              <span aria-hidden className="bg-aurora-green mt-2 h-1 w-1 shrink-0 rounded-full" />
              {highlight}
            </li>
          ))}
        </ul>

        <ul className="mt-7 flex flex-wrap gap-2">
          {project.stack.map((tool) => (
            <li
              key={tool}
              className="border-hairline text-ink-muted rounded-md border px-2.5 py-1 font-mono text-xs"
            >
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function Work() {
  return (
    <section id="work" aria-labelledby="work-heading" className="container-page py-24 md:py-32">
      <SectionHeading
        id="work-heading"
        heading={sections.work.heading}
        standfirst={sections.work.standfirst}
      />

      <div className="mt-14">
        {featuredProjects.map((project) => (
          <FeaturedProject key={project.id} project={project} />
        ))}
      </div>

      <h3 className="text-ink-muted mt-16 mb-2 text-sm font-semibold tracking-wide">
        {sections.work.more}
      </h3>
      <ul className="border-hairline border-t">
        {otherProjects.map((project) => (
          <li key={project.id}>
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="group border-hairline hover:bg-surface/40 grid gap-2 border-b py-6 transition-colors sm:grid-cols-12 sm:items-baseline sm:gap-6 sm:px-3"
            >
              <span className="text-ink group-hover:text-aurora-green text-base font-semibold transition-colors sm:col-span-3">
                {project.name}
              </span>
              <span className="text-ink-dim text-sm sm:col-span-6">{project.tagline}</span>
              <span className="text-ink-faint font-mono text-xs sm:col-span-3 sm:text-right">
                {project.stack.slice(0, 3).join(' / ')}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
