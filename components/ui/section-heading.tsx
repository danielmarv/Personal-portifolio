interface SectionHeadingProps {
  readonly id: string;
  readonly heading: string;
  readonly standfirst: string;
  readonly aside?: React.ReactNode;
}

/**
 * Shared section opener: a rule carrying the aurora ramp, the heading, and a
 * short standfirst. Consistent across every section so the page reads as one
 * document rather than a stack of unrelated blocks.
 */
export function SectionHeading({ id, heading, standfirst, aside }: SectionHeadingProps) {
  return (
    <div className="border-hairline border-t pt-10">
      <hr aria-hidden className="aurora-rule -mt-10 mb-10 w-28 border-0" />
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h2 id={id} className="text-title text-ink font-extrabold text-balance">
            {heading}
          </h2>
          <p className="text-lead text-ink-dim mt-5 text-pretty">{standfirst}</p>
        </div>
        {aside ? <div className="shrink-0">{aside}</div> : null}
      </div>
    </div>
  );
}
