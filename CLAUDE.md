# อารักษ์ โบรกเกอร์ - corporate website

Thai-language corporate site for a licensed general-insurance broker.
**React 19 + Vite + TypeScript + Tailwind v4 + shadcn/ui**, deployed as a static
SPA to GitHub Pages by `.github/workflows/deploy.yml`.

---

## 1. Read these before changing anything

| When | Read |
|---|---|
| any UI work | `Skill(design-taste-frontend)` then `docs/DESIGN-BRIEF.md` |
| working as a subagent | `docs/AGENT-TEAM.md` for file ownership |
| adding a page or section | `docs/DESIGN-BRIEF.md` section 9, the layout-family map |
| before saying "done" | taste-skill section 14, the pre-flight matrix |

The design brief is not advisory. It records decisions that were made once, with
reasons, so they do not get re-litigated per component.

---

## 2. Architecture

```
src/
  main.tsx                 entry: fonts, global css, root render
  App.tsx                  providers + router
  routes.tsx               route table, one lazy chunk per page, routePaths helper

  api/                     TRANSPORT. The only layer that knows HTTP exists.
    client.ts              the single axios instance, interceptors, error mapping
    api-error.ts           ApiError + Thai user-facing messages
    endpoints.ts           every path in one object
    mock-adapter.ts        axios adapter serving the two write endpoints locally
    services/              one file per domain, returns domain objects

  hooks/                   BUSINESS LOGIC. No JSX in this folder.
    use-async-resource.ts  the one read-state machine
    use-mutation.ts        the one write-state machine
    use-products.ts        catalogue filtering, ordering, empty detection
    use-product-detail.ts  detail + tier-comparison rules
    use-company.ts         company, branches, partners
    use-site-content.ts    home / about / agent / testimonials
    use-page-meta.ts       per-route title and description
    use-theme.ts           theme state
    use-scroll-restoration.ts

  components/
    ui/                    vendored shadcn/ui, already re-tuned to our tokens
    common/                shared building blocks: Section, SectionHeading,
                           Reveal, AppImage, Prose, AsyncBoundary, Logo,
                           PartnerMark, ThemeToggle, RouteFallback
    layout/                RootLayout, SiteHeader, SiteFooter

  pages/                   COMPOSITION ONLY. One folder per route.
    <route>/<route>-page.tsx        the page, assembles sections
    <route>/sections/*.tsx          that page's sections

  content/                 every Thai string and data record, typed
  providers/               ThemeProvider
  lib/                     utils (cn), nav config, media resolver
  styles/globals.css       design tokens and base styles
```

### The four layering rules

These came from the project owner and are not negotiable.

**1. Styling lives in components, not in pages.**
A page file composes components. It must not carry long `className` strings or
repeat the same utility soup on every route. If you find yourself writing the
same six classes twice, that is a component. Variants belong in `cva` on the
component, not in conditional class strings at the call site.

*The check:* open any file in `src/pages/`. If a line has more than about four
utility classes on a presentational element, it belongs in `src/components/`.

**2. Business logic lives in custom hooks, not in UI.**
Filtering, sorting, deriving, validating, submitting, deciding what "empty"
means: all of that is a hook in `src/hooks/`. Components receive resolved values
and render them. A component may hold UI-only state such as "is this sheet
open"; it may not hold domain state.

*The check:* no `.filter(`, `.sort(`, `.reduce(`, or arithmetic on domain data
inside a `.tsx` return block.

**3. Data fetching is axios only, and it is layered.**
`fetch`, `XMLHttpRequest`, and second axios instances are all banned. The chain
is exactly:

```
component  ->  hook  ->  service  ->  apiClient (axios)  ->  HTTP
```

A component never imports a service. A service never imports React. Skipping a
link in that chain is the thing this rule exists to prevent.

**4. One component, one file, named for what it is.**
Files are kebab-case, components are PascalCase, and a file exports one main
component plus its tightly-coupled parts (`Card`, `CardHeader`, ...).

### Static content vs fetched data

Both exist on purpose and the boundary is:

- **`src/content/*`** is build-time copy. The header, footer and nav read it
  directly, because chrome that appears on every page should not depend on a
  network round trip.
- **The api layer** serves domain data: products, tier matrix, home / about /
  agent content, testimonials, and lead submission. Pages read it through hooks.

`scripts/build-api.mjs` generates `public/api/*.json` from `src/content`, so both
paths have one source of truth. Point `VITE_API_BASE_URL` at a real service and
the api layer stops using those files, with no change in `src/api` or `src/hooks`.

---

## 3. Commands

```
npm run dev        vite dev server on :5173
npm run build      build-api  ->  tsc -b  ->  vite build  ->  dist/
npm run preview    serve dist/ locally
npm run typecheck  tsc -b
npm run lint       eslint
npm run api        regenerate public/api/*.json from src/content
npm run media      regenerate public/media/*.svg placeholders
```

## 4. Environment

| Variable | Default | Effect |
|---|---|---|
| `VITE_BASE_PATH` | `/` | Public base path. The deploy workflow sets `/<repo>/` for GitHub Pages. |
| `VITE_API_BASE_URL` | `<base>api` | Point at a real backend to replace the generated JSON. |
| `VITE_IMAGE_MODE` | `placeholder` | `remote` switches images to seeded picsum photography. |

## 5. Deployment

`.github/workflows/deploy.yml` builds on push to `main` and publishes `dist/` to
GitHub Pages. Two details that are easy to lose:

- `VITE_BASE_PATH` is injected at build time; the router uses
  `import.meta.env.BASE_URL` as its `basename`, so both stay in sync.
- `dist/404.html` is a copy of `index.html`. GitHub Pages has no rewrite rules,
  so without it a hard refresh on `/products/motor` returns a real 404.

`.github/workflows/ci.yml` runs lint, typecheck, build, and three mechanical
design checks (em-dash scan, Thai leading, `h-screen`) on every PR.

---

## 6. The rules that break this codebase fastest

- **Amber never takes white text.** `bg-brand` pairs with `text-brand-foreground`.
  White on `#e8940c` is 2.6:1 and fails AA. This is the single most likely
  accessibility regression on this site.
- **`bg-accent` is not the brand colour.** It is shadcn's subtle hover surface.
  Brand amber is `bg-brand`.
- **Thai type never uses `leading-none`, `leading-tight` or `tracking-tight`.**
  Thai stacks vowels above the line and tone marks above those, and descends
  below it. Display minimum `leading-[1.25]`, body `leading-[1.75]`. CI fails on
  these class names anywhere in `src/`, comments included, so reword a comment
  rather than weakening the check.
  Upstream shadcn ships `leading-none` on `Label`, `DialogTitle` and friends
  because it was written for Latin. **Every newly vendored primitive must be
  swept for it before it is committed.**
- **Zero em-dashes and en-dashes** anywhere a reader can see. CI fails on this.
- **One icon family.** Everything imports from `@/components/icons` (Phosphor,
  weight regular). No `lucide-react`, no hand-rolled SVG icon paths. The two
  hand-authored SVGs that exist on purpose are `common/logo.tsx` and
  `common/partner-mark.tsx`.
- **Eyebrows only through `<SectionHeading eyebrow="...">`**, capped at
  `ceil(sectionCount / 3)` per page.
- **`min-h-[100dvh]`, never `h-screen`.** CI fails on this.
- **CTA labels are locked** in `src/lib/nav.ts`. Import `quoteCta` and
  `recruitCta`. Never write a second label for the same intent.
- **Never ship a shadcn component in its default state.** Radius, colour, shadow
  and type come from our tokens.

---

## 7. Environment constraints this project was built under

Worth knowing before you wonder why something is unusual:

- `ui.shadcn.com` is blocked by network policy, so the shadcn CLI cannot fetch
  components. The 21 primitives in `src/components/ui/` were vendored from
  `raw.githubusercontent.com/shadcn-ui/ui` and had their `lucide-react` imports
  rewritten to Phosphor. Add new ones the same way; there is a mapping table in
  `docs/DESIGN-BRIEF.md` section 6.
- `picsum.photos`, `images.unsplash.com` and `cdn.simpleicons.org` are blocked,
  and no image-generation tool is available. Hence the two-mode media layer.
- Google Fonts is reachable, but fonts are self-hosted through `@fontsource`
  anyway, because the taste-skill bans a production `<link>` to Google Fonts.

## 8. Data

Everything in `src/content/` is mock data, including licence numbers, addresses,
phone numbers and premium figures. Files carry a banner saying so. See
`docs/ASSETS-NEEDED.md` for the full list of what must be replaced before launch.
