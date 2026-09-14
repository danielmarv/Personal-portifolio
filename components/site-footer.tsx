import { profile } from '@/content/profile';
import { ui } from '@/content/site';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-hairline border-t">
      <div className="container-page text-ink-faint flex flex-col gap-4 py-10 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>{ui.copyright(year, profile.name)}</p>
        <p>{ui.builtWith}</p>
      </div>
    </footer>
  );
}
