interface LogoProps {
  readonly className?: string;
  /** Unique suffix for the gradient id, so several marks can share a page. */
  readonly idSuffix?: string;
}

/**
 * The mark: an N drawn as a four-node graph.
 *
 * Left stroke, diagonal and right stroke are the edges; the corners are nodes.
 * It is the same idea as the hero — a name that is also a network — and it
 * still reads at 16px because the letterform carries it.
 */
export function Logo({ className, idSuffix = 'mark' }: LogoProps) {
  const gradientId = `logo-aurora-${idSuffix}`;

  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient
          id={gradientId}
          x1="8"
          y1="26"
          x2="24"
          y2="6"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3DDC97" />
          <stop offset="0.5" stopColor="#2BC0E4" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>

      {/* Edges: left stroke, diagonal, right stroke. */}
      <path
        d="M9 7.5V24.5M9 7.5L23 24.5M23 7.5V24.5"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Nodes at each corner. */}
      <circle cx="9" cy="7.5" r="3" fill={`url(#${gradientId})`} />
      <circle cx="23" cy="7.5" r="2.25" fill={`url(#${gradientId})`} />
      <circle cx="9" cy="24.5" r="2.25" fill={`url(#${gradientId})`} />
      <circle cx="23" cy="24.5" r="3" fill={`url(#${gradientId})`} />
    </svg>
  );
}
