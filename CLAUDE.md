# อารักษ์ โบรกเกอร์ - corporate site

Next.js 16 (App Router, RSC) + Tailwind v4 + vendored shadcn/ui. Thai-language
corporate site for a fictional licensed general-insurance broker.

## Before you change any UI

1. `Skill(design-taste-frontend)` - the taste-skill is the design authority.
2. `docs/DESIGN-BRIEF.md` - this project's resolution of that skill. Tokens, type
   scale, motion policy, layout-family map per page, locked CTA labels.
3. `docs/AGENT-TEAM.md` - who owns which files, if you are running as a subagent.

Section 14 of the skill is the definition of done, not a suggestion.

## The rules that break this codebase fastest

- **Amber never takes white text.** `bg-brand` pairs with `text-brand-foreground`.
  White on `#e8940c` is 2.6:1.
- **`bg-accent` is not the brand colour.** It is shadcn's subtle hover surface.
  Brand amber is `bg-brand`.
- **Thai type never uses `leading-none`, `leading-tight` or `tracking-tight`.**
  Thai stacks vowels and tone marks above the line. Display minimum is
  `leading-[1.25]`, body is `leading-[1.75]`.
- **Zero em-dashes and en-dashes in anything a user can see.**
  `grep -rn '—\|–' src/` must come back empty.
- **One icon family.** Everything imports from `@/components/icons` (Phosphor,
  weight regular). No `lucide-react`, no hand-rolled SVG icon paths. The two
  hand-authored SVGs that exist on purpose are `site/logo.tsx` and
  `site/partner-mark.tsx`.
- **Eyebrows only through `<SectionHeading eyebrow="...">`**, capped at
  `ceil(sectionCount / 3)` per page.
- **`min-h-[100dvh]`, never `h-screen`.**
- **CTA labels are locked in `src/lib/nav.ts`.** Import `quoteCta` and
  `recruitCta`. Do not write a second label for the same intent.

## Layout

```
src/app/(site)/          routes, wrapped in header + footer
src/components/ui/       vendored shadcn/ui, already re-tuned to our tokens
src/components/site/     shell: header, footer, logo, Section, SectionHeading, Reveal
src/components/sections/ per-page section components
src/content/             every Thai string and data record. All copy lives here.
src/lib/                 utils, nav config, media layer
```

## Commands

```
npm run dev        next dev
npm run build      production build
npm run typecheck  tsc --noEmit
npm run lint       eslint
npm run media      regenerate /public/media placeholders from src/content/media.ts
```

## Images

`ui.shadcn.com`, `picsum.photos`, `images.unsplash.com` and `cdn.simpleicons.org`
are blocked by the network policy this project was built under. shadcn components
are therefore vendored from `raw.githubusercontent.com` rather than installed with
the CLI, and images run through `src/lib/media.ts`:

- default: committed SVG compositions in `/public/media`
- `NEXT_PUBLIC_IMAGE_MODE=remote`: seeded `picsum.photos` photography

Real photography still to source is in `docs/ASSETS-NEEDED.md`.

## Data

Everything in `src/content/` is mock data, including licence numbers, addresses,
phone numbers and premium figures. Files carry a banner saying so. Replace before
launch.
