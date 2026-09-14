import { metrics, profile } from '@/content/profile';
import { ui } from '@/content/site';
import { formatCount } from '@/lib/utils';

import { NetworkCanvas } from './network-canvas';

export function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col justify-end overflow-hidden pt-28 pb-0">
      {/* Aurora wash. Also the fallback when WebGL is unavailable. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20">
        <div className="bg-aurora-violet/18 absolute top-[-18%] right-[-10%] h-[42rem] w-[42rem] rounded-full blur-[130px]" />
        <div className="bg-aurora-cyan/14 absolute top-[14%] right-[16%] h-[30rem] w-[30rem] rounded-full blur-[120px]" />
        <div className="bg-aurora-green/10 absolute bottom-[-14%] left-[-8%] h-[34rem] w-[34rem] rounded-full blur-[130px]" />
      </div>

      {/* The network. Offset right on wide screens so it sits beside the
          headline rather than behind it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-55 lg:left-[42%] lg:opacity-100"
      >
        <NetworkCanvas />
      </div>

      {/* Scrim so the headline stays legible where it overlaps the network. */}
      <div
        aria-hidden
        className="from-void via-void/70 to-void/10 lg:from-void lg:via-void/35 pointer-events-none absolute inset-0 -z-10 bg-linear-to-t lg:bg-linear-to-r lg:to-transparent"
      />

      <div className="container-page relative flex flex-1 flex-col justify-end pb-10">
        <div className="max-w-4xl">
          <p
            className="rise text-ink-muted flex items-center gap-3 font-mono text-xs tracking-wide"
            style={{ animationDelay: '80ms' }}
          >
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="breathe bg-aurora-green absolute inline-flex h-full w-full rounded-full" />
            </span>
            {profile.location}
            <span className="bg-hairline h-px w-8" aria-hidden />
            {profile.role}
          </p>

          <h1
            className="rise text-display text-ink mt-6 max-w-[16ch] font-extrabold text-balance"
            style={{ animationDelay: '160ms' }}
          >
            {profile.headline}
          </h1>

          <p
            className="rise text-lead text-ink-dim mt-7 max-w-xl text-pretty"
            style={{ animationDelay: '280ms' }}
          >
            {profile.standfirst}
          </p>

          <div
            className="rise mt-9 flex flex-wrap items-center gap-4"
            style={{ animationDelay: '380ms' }}
          >
            <a
              href="#open-source"
              className="bg-ink text-void hover:bg-aurora-green rounded-full px-7 py-3.5 text-sm font-semibold transition-colors"
            >
              Read the ledger
            </a>
            <a
              href="#contact"
              className="border-hairline text-ink hover:border-aurora-green/60 hover:text-aurora-green rounded-full border px-7 py-3.5 text-sm font-semibold transition-colors"
            >
              Get in touch
            </a>
          </div>
        </div>

        {/* Instrument strip: the four figures a reader can verify themselves. */}
        <dl
          className="fade-in border-hairline mt-14 grid grid-cols-2 border-t sm:grid-cols-4"
          style={{ animationDelay: '620ms' }}
        >
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className="border-hairline border-b py-6 pr-5 sm:border-b-0 sm:border-l sm:px-6 sm:first:border-l-0 sm:first:pl-0"
            >
              <dt className="sr-only">{metric.label}</dt>
              <dd>
                <span className="text-ink block text-4xl font-extrabold tracking-tight tabular-nums sm:text-5xl">
                  {formatCount(metric.value)}
                </span>
                <span className="text-ink-dim mt-2 block text-sm font-medium">{metric.label}</span>
                <span className="text-ink-faint mt-1 block text-xs">{metric.detail}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="sr-only">{ui.networkCaption}</p>
    </section>
  );
}
