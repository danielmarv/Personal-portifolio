import Image from 'next/image';

import portrait from '@/public/profile.jpg';

import { profile } from '@/content/profile';

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="container-page py-24 md:py-32">
      <hr aria-hidden className="aurora-rule mb-10 w-28 border-0" />
      <h2 id="about-heading" className="text-title text-ink max-w-3xl font-extrabold text-balance">
        Consensus is a boring word for something that matters.
      </h2>

      <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          {/* The portrait is the one bright object on the page, so it gets a
              frame and a little aurora behind it rather than floating loose. */}
          <figure className="relative">
            <div
              aria-hidden
              className="bg-aurora-green/12 absolute -inset-6 -z-10 rounded-[2rem] blur-3xl"
            />
            <div className="border-hairline relative overflow-hidden rounded-3xl border">
              <Image
                src={portrait}
                alt={profile.name}
                placeholder="blur"
                sizes="(min-width: 1024px) 24rem, 80vw"
                className="h-auto w-full object-cover"
              />
              {/* Softens the cut from a bright photograph into a dark page. */}
              <div
                aria-hidden
                className="from-void/70 pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t to-transparent"
              />
            </div>
          </figure>

          <p className="text-ink-muted mt-8 text-sm">{profile.availability}</p>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          {profile.bio.map((paragraph, index) => (
            <p
              key={paragraph.slice(0, 32)}
              className={
                index === 0 ? 'text-lead text-ink text-pretty' : 'text-ink-dim mt-6 text-pretty'
              }
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
