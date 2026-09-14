import { stack } from '@/content/stack';
import { sections } from '@/content/site';

import { SectionHeading } from '../ui/section-heading';

export function StackSection() {
  return (
    <section id="stack" aria-labelledby="stack-heading" className="container-page py-24 md:py-32">
      <SectionHeading
        id="stack-heading"
        heading={sections.stack.heading}
        standfirst={sections.stack.standfirst}
      />

      <div className="bg-hairline mt-14 grid gap-px overflow-hidden md:grid-cols-2 xl:grid-cols-3">
        {stack.map((group) => (
          <section key={group.id} className="bg-void p-7 lg:p-9">
            <h3 className="text-ink text-lg font-bold">{group.title}</h3>
            <p className="text-ink-muted mt-2 text-sm text-pretty">{group.note}</p>
            <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2.5">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className={
                    item.primary ? 'text-ink text-sm font-medium' : 'text-ink-faint text-sm'
                  }
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
