import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="container-page flex min-h-svh flex-col items-start justify-center py-24">
      <hr aria-hidden className="aurora-rule mb-10 w-28 border-0" />
      <h1 className="text-title text-ink font-extrabold">This page does not exist.</h1>
      <p className="text-lead text-ink-dim mt-5 max-w-md">
        The link may be out of date, or the page may have moved.
      </p>
      <Link
        href="/"
        className="bg-ink text-void hover:bg-aurora-green mt-10 rounded-full px-7 py-3.5 text-sm font-semibold transition-colors"
      >
        Back to the start
      </Link>
    </main>
  );
}
