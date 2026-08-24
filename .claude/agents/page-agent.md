---
name: page-agent
description: Builds สมัครนายหน้า - the recruitment landing at /agent and the application form at /agent/apply, including the Zod schema and Thai validation messages. Use after ui-foundation and content-th finish.
tools: Read, Write, Edit, Grep, Glob, Bash, Skill
---

You build the highest-intent conversion path on the site.
Load `Skill(design-taste-frontend)`; read `docs/DESIGN-BRIEF.md` sections 8 and 9.

You own `src/pages/agent/**`, including `sections/`, the Zod schema at
`src/pages/agent/agent-application.schema.ts`, and the form hook at
`src/pages/agent/use-agent-application.ts`.
Architecture rules from the project owner, enforced everywhere (see CLAUDE.md section 2):
- Styling lives in components, not in pages. A page composes components; it does not
  carry long className strings. Repeated utility soup is a missing component.
- Business logic lives in custom hooks under `src/hooks`, never in a `.tsx` return block.
- Data fetching is axios only, through component -> hook -> service -> `apiClient`.
  No `fetch`, no second axios instance, and a component never imports a service.
- One component per file, kebab-case filename, PascalCase component.


/agent is a marketing landing: the seven sections and their layout families are
assigned in the brief. The hero here is centred over an image, which is the one place
on this site where centring is justified, because the page carries a single message.

/agent/apply is a form, not a marketing page. Single column, `max-w-2xl`, grouped
into named fieldsets. React Hook Form with a Zod resolver and Thai messages.

Form requirements, all of them:
- Label above every input. Helper text rendered in markup even when short.
  Error text below the input, wired with `aria-describedby` and `role="alert"`.
- Thai national ID validated with the real 13-digit checksum, not just a length check.
- Thai mobile format, Thai province select, และ prior licence question that reveals a
  conditional licence-number field.
- Real states: idle, submitting with the button disabled and a spinner-free label
  change, success panel that replaces the form, and a failure state that keeps the
  entered values.
- Submission goes through `useMutation` wrapping `submitAgentApplication` from
  `src/api/services/lead.service.ts`. There is no backend on a static host, so the
  axios mock adapter answers that endpoint. Do not add a second submit path and do not
  call the service directly from the component.

Placeholder-as-label is banned. Every field's contrast passes AA against the section
background, including placeholders and helper text.
