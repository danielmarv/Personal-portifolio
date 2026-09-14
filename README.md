# Ntege Daniel Marvin — portfolio

Personal site for [Ntege Daniel Marvin](https://github.com/danielmarv), software
engineer in Kampala, Uganda. Built with Next.js 16, React 19 and Tailwind CSS 4,
with a WebGL consensus network in the hero.

## The hero

The hero renders a live gossip network rather than a decorative particle field.
Sixty-six nodes sit on a Fibonacci sphere, each connected to its three nearest
peers; messages travel the edges continuously, and every few seconds a consensus
round starts at a random node and propagates outward by breadth-first hop
distance, turning each node green as finality reaches it.

The graph maths lives in [`lib/network.ts`](lib/network.ts), free of three.js and
React so the topology can be unit-tested on its own — including the property that
the generated graph is always fully connected, since a disconnected node would
never light up.

Where a visitor prefers reduced motion, the settled state is baked directly into
the geometry buffers and the render loop never starts. Where WebGL is
unavailable, the canvas is not mounted at all and the CSS aurora carries the
hero on its own.

## Content

All copy and data live under [`content/`](content/) — profile, contribution
ledger, timeline and stack — so text is never hardcoded in a component and
translations can be added without touching the UI.

The contribution figures come from the GitHub search API and can be reproduced:

```
author:danielmarv type:pr is:merged -user:danielmarv
```

Tests in [`test/content.test.ts`](test/content.test.ts) assert that the ledger
still sums to the number shown in the hero, so the two cannot drift apart.

## Getting started

Requires Node 24 (see [`.nvmrc`](.nvmrc)) and pnpm.

```bash
nvm use          # or: fnm use
corepack enable  # picks up the pnpm version from package.json
pnpm install
pnpm dev
```

The site runs at http://localhost:3000.

## Commands

| Command              | What it does                         |
| -------------------- | ------------------------------------ |
| `pnpm dev`           | Development server                   |
| `pnpm build`         | Production build (standalone output) |
| `pnpm start`         | Serve the production build           |
| `pnpm lint`          | ESLint                               |
| `pnpm typecheck`     | TypeScript, no emit                  |
| `pnpm test`          | Vitest, single run                   |
| `pnpm test:coverage` | Vitest with coverage thresholds      |
| `pnpm format`        | Prettier                             |

## Stack

- **Next.js 16** — App Router, Turbopack, `output: 'standalone'` for containers
- **React 19** — pinned to the 19.2 line, which is what React Three Fiber 9
  declares support for
- **Tailwind CSS 4** — CSS-first theme in [`app/globals.css`](app/globals.css),
  with the full semantic token set so shadcn/ui components drop in unchanged
- **React Three Fiber / three.js** — custom point and line shaders, no helper
  library
- **TypeScript 6** — strict, with `noUncheckedIndexedAccess`. Held at 6.x
  because typescript-eslint does not yet support the 7.0 compiler API
- **Vitest** — unit tests with a 70% coverage floor

## Deployment

Set `NEXT_PUBLIC_SITE_URL` to the canonical origin so metadata, the sitemap and
`robots.txt` resolve correctly. Every route is static, so the site can be served
from any Node host.

`next.config.ts` sets `output: 'standalone'`, which emits a self-contained server
in `.next/standalone`. Next does **not** copy the static assets into it, so a
container build has to do that itself:

```dockerfile
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
CMD ["node", "server.js"]
```

For a local production preview, `pnpm start` is enough — it prints a warning
about the standalone setting and then serves the build normally.

## Accessibility

Audited with axe-core at desktop and mobile widths — zero violations across
WCAG 2.1 A and AA plus best-practice rules. Motion respects
`prefers-reduced-motion`, focus is visible throughout, and the hero canvas is
hidden from assistive technology with a text description in its place.
