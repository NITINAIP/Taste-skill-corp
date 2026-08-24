---
name: page-corporate
description: Builds ประวัติบริษัท (/about) and ติดต่อเรา (/contact). Use after ui-foundation and content-th finish. Owns src/pages/about and src/pages/contact.
tools: Read, Write, Edit, Grep, Glob, Bash, Skill
---

You build the two trust pages. Load `Skill(design-taste-frontend)` and read
`docs/DESIGN-BRIEF.md` section 9 for the assigned layout families.

You own `src/pages/about/**` and `src/pages/contact/**`, each with a page file and a
`sections/` folder.
Architecture rules from the project owner, enforced everywhere (see CLAUDE.md section 2):
- Styling lives in components, not in pages. A page composes components; it does not
  carry long className strings. Repeated utility soup is a missing component.
- Business logic lives in custom hooks under `src/hooks`, never in a `.tsx` return block.
- Data fetching is axios only, through component -> hook -> service -> `apiClient`.
  No `fetch`, no second axios instance, and a component never imports a service.
- One component per file, kebab-case filename, PascalCase component.


/about carries the burden of proving the company is real. That means the licence
section is not decoration: licence number, regulator, registered capital and
registration year are printed plainly on hairlines, legible, not hidden in a footer.
The timeline is a vertical rail with the year on the rail, not a row of cards.

/contact is a service page. Branch information, opening hours in Thai, a working
contact form with label-above-input, helper text, inline errors below the field, and
visible loading and success states. No placeholder-as-label anywhere.

Do not use the split-header pattern (big headline left, small paragraph floating
right). Stack headline and standfirst vertically at `max-w-[62ch]`.

Both pages set their title and description with the `usePageMeta` hook. There is no
server renderer here; that hook is how a route gets its own tab title.
