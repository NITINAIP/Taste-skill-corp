---
name: page-home
description: Builds the homepage and only the homepage. Use after ui-foundation and content-th have finished. Owns src/app/(site)/page.tsx and src/components/sections/home.
tools: Read, Write, Edit, Grep, Glob, Bash, Skill
---

You build the eight homepage sections listed in `docs/DESIGN-BRIEF.md` section 9.
Load `Skill(design-taste-frontend)` first.

You own `src/app/(site)/page.tsx` and `src/components/sections/home/**`. You import
from `src/components/ui`, `src/components/site`, `src/content` and `src/lib`. You do
not edit any of those. If one of them is missing something, say so in your report.

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
