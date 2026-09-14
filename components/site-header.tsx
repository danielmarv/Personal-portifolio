'use client';

import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { profile } from '@/content/profile';
import { nav, ui } from '@/content/site';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on Escape, and stop the page scrolling behind it.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
        scrolled && 'border-hairline bg-void/80 border-b backdrop-blur-xl',
      )}
    >
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <a
          href="#main"
          className="group text-ink flex items-center gap-3 text-sm font-semibold tracking-tight"
        >
          <span
            aria-hidden
            className="border-hairline bg-surface text-aurora-green group-hover:border-aurora-green/50 grid h-9 w-9 place-items-center rounded-lg border font-mono text-xs transition-colors"
          >
            {profile.initials}
          </span>
          <span className="sr-only sm:not-sr-only">{profile.shortName}</span>
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="text-ink-dim hover:text-ink text-sm transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="border-hairline text-ink hover:border-aurora-green/60 hover:text-aurora-green hidden rounded-full border px-5 py-2.5 text-sm font-medium transition-colors sm:inline-block"
          >
            {profile.email}
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? ui.menuClose : ui.menuOpen}
            className="border-hairline text-ink grid h-10 w-10 place-items-center rounded-lg border md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Sections"
          className="border-hairline bg-void/95 border-t backdrop-blur-xl md:hidden"
        >
          <ul className="container-page flex flex-col py-4">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-hairline/60 text-ink block border-b py-4 text-lg font-medium"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${profile.email}`}
                onClick={() => setOpen(false)}
                className="text-aurora-green block py-4 font-mono text-sm"
              >
                {profile.email}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
