import { ArrowUpRight } from 'lucide-react';

import { profile, socials } from '@/content/profile';
import { sections } from '@/content/site';

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden py-24 md:py-36"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-aurora-green/10 absolute bottom-[-58%] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full blur-[150px]" />
        <div className="bg-aurora-violet/10 absolute bottom-[-48%] left-[18%] h-[24rem] w-[24rem] rounded-full blur-[140px]" />
      </div>

      <div className="container-page">
        <hr aria-hidden className="aurora-rule mb-10 w-28 border-0" />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 id="contact-heading" className="text-title text-ink font-extrabold text-balance">
              {sections.contact.heading}
            </h2>
            <p className="text-lead text-ink-dim mt-6 max-w-xl text-pretty">
              {sections.contact.standfirst}
            </p>

            <a
              href={`mailto:${profile.email}`}
              className="bg-ink text-void hover:bg-aurora-green mt-10 inline-flex items-center gap-3 rounded-full px-8 py-4 font-semibold transition-colors"
            >
              {sections.contact.action}
              <ArrowUpRight aria-hidden className="h-4 w-4" />
            </a>

            <p className="text-ink-muted mt-5 font-mono text-sm">{profile.email}</p>
          </div>

          <ul className="lg:col-span-5 lg:pt-4">
            {socials.map((social) => (
              <li key={social.id}>
                <a
                  href={social.href}
                  {...(social.id === 'email' ? {} : { target: '_blank', rel: 'noreferrer' })}
                  className="group border-hairline flex items-baseline justify-between gap-6 border-t py-5 last:border-b"
                >
                  <span className="text-ink group-hover:text-aurora-green text-base font-semibold transition-colors">
                    {social.label}
                  </span>
                  <span className="text-ink-muted font-mono text-xs">{social.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
