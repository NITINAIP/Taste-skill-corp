# taste-skill (installed)

Source: https://github.com/Leonxlnx/taste-skill
Commit: ccbc15639c97057cbfcf32ecebc38ef716e4bb37 (2026-08-24)
License: MIT (see LICENSE-taste-skill)

Installed as project-level Claude Code skills. Directory names were renamed to
match each SKILL.md `name:` frontmatter so Claude Code discovers them cleanly.

| Directory | Upstream folder | What it is |
|---|---|---|
| design-taste-frontend | skills/taste-skill | v2 anti-slop frontend skill. The primary skill for this project. |
| design-taste-frontend-v1 | skills/taste-skill-v1 | previous version, kept for reference |
| gpt-taste | skills/gpt-tasteskill | condensed taste rules |
| image-to-code | skills/image-to-code-skill | screenshot / mockup to code |
| imagegen-frontend-web | skills/imagegen-frontend-web | one art-directed reference image per web section |
| imagegen-frontend-mobile | skills/imagegen-frontend-mobile | same, mobile |
| brandkit | skills/brandkit | brand-guideline board generation |
| redesign-existing-projects | skills/redesign-skill | audit-first redesign protocol |
| high-end-visual-design | skills/soft-skill | soft / premium visual language |
| minimalist-ui | skills/minimalist-skill | minimalist direction |
| industrial-brutalist-ui | skills/brutalist-skill | brutalist direction |
| stitch-design-taste | skills/stitch-skill | Stitch-style design taste |
| full-output-enforcement | skills/output-skill | bans truncated / placeholder output |

Usage in this project: `design-taste-frontend` is the design authority for every
UI change. Section 14 (FINAL PRE-FLIGHT CHECK) is the definition of done.
