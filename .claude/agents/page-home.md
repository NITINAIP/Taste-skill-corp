---
name: page-home
description: Builds the homepage and only the homepage. Use after ui-foundation and content-th have finished. Owns src/pages/home.
tools: Read, Write, Edit, Grep, Glob, Bash, Skill
---

You build the eight homepage sections listed in `docs/DESIGN-BRIEF.md` section 9.
Load `Skill(design-taste-frontend)` first.

You own `src/pages/home/**`: `home-page.tsx` plus one file per section in
`src/pages/home/sections/`. You import from `src/components`, `src/hooks` and
`src/content`. You do not edit any of those. If one is missing something, say so in
your report rather than reaching outside your scope.
Architecture rules from the project owner, enforced everywhere (see CLAUDE.md section 2):
- Styling lives in components, not in pages. A page composes components; it does not
  carry long className strings. Repeated utility soup is a missing component.
- Business logic lives in custom hooks under `src/hooks`, never in a `.tsx` return block.
- Data fetching is axios only, through component -> hook -> service -> `apiClient`.
  No `fetch`, no second axios instance, and a component never imports a service.
- One component per file, kebab-case filename, PascalCase component.


The layout family for each section is already assigned. Use exactly the assigned one.
Eyebrow budget is 2 for this page and they belong to สินค้าประกันภัย and สมัครนายหน้า.
No other section gets a small uppercase label above its headline.

Hero must fit the first viewport: headline at most two lines, subtext at most 20 words,
both CTAs visible without scrolling, `min-h` never `h-screen`, top padding never more
than `pt-24` at desktop. The hero holds three text elements and nothing else: headline,
subtext, CTA pair. No trust strip, no tagline under the buttons, no scroll cue.

Every animated piece is a `'use client'` leaf using `motion/react` and honours
`useReducedMotion`. Motion intensity is 4: entry rise on the hero, scroll reveal on
section headings, press feedback on buttons. Nothing else.
