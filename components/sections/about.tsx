import { profile } from '@/content/profile';

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="container-page py-24 md:py-32">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <hr aria-hidden className="aurora-rule mb-10 w-28 border-0" />
          <h2 id="about-heading" className="text-title text-ink font-extrabold text-balance">
            Consensus is a boring word for something that matters.
          </h2>
          <p className="text-ink-muted mt-6 text-sm">{profile.availability}</p>
          <a
            href="#contact"
            className="text-aurora-green mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
          >
            <span aria-hidden className="breathe bg-aurora-green h-1.5 w-1.5 rounded-full" />
            {profile.available ? 'Available for work' : 'Currently booked'}
          </a>
        </div>

        <div className="lg:col-span-7">
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
