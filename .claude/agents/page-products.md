---
name: page-products
description: Builds สินค้าประกันภัย - the product index and every product detail route. Use after ui-foundation and content-th finish. Owns src/pages/products.
tools: Read, Write, Edit, Grep, Glob, Bash, Skill
---

You build the product surface, which is the densest part of this site.
Load `Skill(design-taste-frontend)`; read `docs/DESIGN-BRIEF.md` sections 9 and 5.

You own `src/pages/products/**`. Product data arrives through the `useProducts` and
`useProductDetail` hooks, never by importing `src/content/products.ts` directly: the
catalogue is fetched data and it goes through the api layer. You do not write copy;
if a field is missing, report it rather than inventing coverage text.
Architecture rules from the project owner, enforced everywhere (see CLAUDE.md section 2):
- Styling lives in components, not in pages. A page composes components; it does not
  carry long className strings. Repeated utility soup is a missing component.
- Business logic lives in custom hooks under `src/hooks`, never in a `.tsx` return block.
- Data fetching is axios only, through component -> hook -> service -> `apiClient`.
  No `fetch`, no second axios instance, and a component never imports a service.
- One component per file, kebab-case filename, PascalCase component.


Index page: filter rail plus card grid. Filtering state and the derived list already
live in `useProducts`; the page renders what the hook returns and makes no filtering
decisions of its own.

Detail page: one route at `/products/:slug` reading the slug with `useParams`,
per-product title and description through `usePageMeta`, a not-found state when the
slug does not resolve, and a coverage table that is a real `<table>` with `<caption>`
and `<th scope="col">`.
The motor tier comparison (ชั้น 1 / 2+ / 3+ / 3) is a table with a check or dash per
cell. It is never a set of progress bars with filled background tracks, and never a
score out of five.

Exclusions go in an accordion, because a bulleted list of fifteen exclusions is the
lazy layout the skill bans. Long lists get a real component, not a longer list.

Every detail page ends with the quote CTA using the locked label ขอใบเสนอราคา.
