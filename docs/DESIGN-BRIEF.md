# DESIGN BRIEF - อารักษ์ อินชัวรันส์ โบรกเกอร์

Authority: `.claude/skills/design-taste-frontend` (taste-skill v2).
This document is the project-level resolution of that skill. Where this file and
the skill disagree, this file wins only because it is the skill applied to *this*
brief. Section 14 of the skill (FINAL PRE-FLIGHT CHECK) is the definition of done.

---

## 0. Design Read (skill 0.B)

> **Reading this as:** corporate marketing site for a licensed Thai general-insurance
> broker, for retail policy buyers and prospective commission agents, with a
> trust-first Thai financial-services language, leaning toward shadcn/ui on
> Tailwind v4 with a navy + amber token set and restrained, motivated motion.

**Stack:** React 19 + Vite + TypeScript, react-router, Tailwind v4, vendored
shadcn/ui, Motion for animation, axios for every network call. Shipped as a
static SPA to GitHub Pages. There is no server at runtime, which is why the api
layer reads generated JSON and the two write endpoints are served by an axios
mock adapter until `VITE_API_BASE_URL` points somewhere real.

**Architecture rules set by the project owner** (full detail in `CLAUDE.md`
section 2): styling lives in components not in pages, business logic lives in
custom hooks not in UI, data fetching is axios only through
component -> hook -> service -> client, and one component per file.

Three audiences, in priority order:

1. **ผู้ซื้อประกัน (retail)** - lands from search or an ad, wants to know what is covered
   and what it costs. Needs product clarity and a visible quote CTA.
2. **ผู้สมัครนายหน้า (recruit)** - wants commission structure, qualifications, and how long
   the licence process takes. This is the highest-intent conversion on the site.
3. **ผู้ซื้อองค์กร / SME** - wants to see the company is real, licensed, and has been
   around. Served by the company-history page.

**Quiet constraints that override aesthetics:** this is a regulated financial
service. Licence numbers, disclosure, and legible small print outrank visual
flair. Nothing on the page may imply a guarantee of payout or a price the broker
cannot honour.

---

## 1. Dials (skill 1)

```
DESIGN_VARIANCE:  5
MOTION_INTENSITY: 4
VISUAL_DENSITY:   5
```

Reasoning, not baseline:

- **VARIANCE 5** - the skill puts "trust-first / regulated" at 3-4. This is a
  commercial site competing for consumer attention, not a government service, so
  +1. Enough to break centre-bias and use asymmetric composition; not enough for
  editorial chaos.
- **MOTION 4** - above 3, so the page must actually move (skill: "motion claimed,
  motion shown"). Entry rise on hero, scroll reveal on section headings, tactile
  press on CTAs. No scroll hijack, no pinning, no physics.
- **DENSITY 5** - insurance content is genuinely information-dense. Coverage
  tables and tier comparison are the product. Airy layouts would hide the value.

---

## 2. Brand

| Field | Value |
|---|---|
| Legal name | บริษัท อารักษ์ อินชัวรันส์ โบรกเกอร์ จำกัด |
| Short name | อารักษ์ โบรกเกอร์ |
| Latin | ARAK Insurance Broker |
| Meaning | อารักษ์ = ผู้ปกป้องคุ้มครอง. Ties directly to what a broker sells. |
| Mark | Wordmark + shield-derived monogram "อ" in a rounded square, single colour. |
| Tagline | นายหน้าประกันภัยที่อยู่ข้างคุณ |

**This is a fictional brand.** Every licence number, address, phone number and
partner-insurer name in `src/content/` is mock data and is marked as such in that
file's header. Swap `src/content/company.ts` to go live. Do not ship mock licence
numbers to production.

---

## 3. Colour (skill 4.2 - one accent, locked page-wide)

Navy carries trust and does the structural work. Amber is the single accent and
appears only on primary action and on the one number per section that matters.

### Light (default)

| Token | Hex | Use |
|---|---|---|
| `--background` | `#F6F8FB` | page |
| `--card` | `#FFFFFF` | panels, product cards |
| `--foreground` | `#0E1B2C` | body text (navy-tinted near-black, never `#000`) |
| `--muted-foreground` | `#5A6B80` | secondary text. Passes AA on both `--background` and `--card`. |
| `--primary` | `#0F2A4A` | navy 900. Solid buttons, dark bands, headings. |
| `--primary-foreground` | `#FFFFFF` | 13.8:1 on primary |
| `--brand` | `#E8940C` | amber 500. Primary CTA fill only. `--accent` is left with shadcn's own meaning, a subtle hover surface, so vendored primitives do not turn a menu hover into a CTA. |
| `--brand-foreground` | `#0B1727` | 7.0:1 on brand |
| `--border` | `#DFE5EE` | hairlines |
| `--ring` | `#1D4B80` | focus ring, 3px offset 2px |

### Dark

| Token | Hex |
|---|---|
| `--background` | `#081524` |
| `--card` | `#0F2036` |
| `--foreground` | `#E7EDF5` |
| `--muted-foreground` | `#9BADC4` |
| `--primary` | `#5B9BE0` (navy has nothing to sit on in dark, so the solid lightens; `--primary-foreground` goes dark) |
| `--primary-foreground` | `#06111D` |
| `--brand` | `#F4A927` |
| `--border` | `rgba(231,237,245,0.12)` |

### Hard colour rules

- **Amber CTA never takes white text.** `#FFFFFF` on `#E8940C` is 2.6:1 and fails
  AA. Amber fill always pairs with `--accent-foreground` navy. This is the single
  easiest way to break this page; check every button.
- **No third hue.** No green "success" band, no red "urgent" band, no teal badge.
  Semantic states use navy/amber + weight + iconography. The one exception is
  inline form validation, which may use a single desaturated red `#B3261E`
  (light) / `#F2B8B5` (dark) for error text and ring, because a11y requires
  error to be distinguishable and it never appears as decoration.
- **No gradients as decoration.** A gradient is allowed only as an image scrim
  (navy 950 to transparent) so text stays readable over a photo.
- **Page Theme Lock (skill 4.11).** One theme for the whole page. Dark navy full-bleed
  *bands* inside a light page are allowed and are part of the system; they use
  `--primary` as their surface and keep the same accent. A band is not a theme flip.

---

## 4. Typography

Thai first. The Latin defaults the model reaches for do not have real Thai cuts,
and the Thai fonts the model reaches for are the Thai equivalent of Inter.

| Role | Family | Weights |
|---|---|---|
| Display / headings | **Anuphan** (Cadson Demak, Google Fonts, Thai + Latin) | 500, 600, 700 |
| Body / UI | **IBM Plex Sans Thai** | 400, 500, 600 |

Loaded through `next/font/google` only. Never a `<link>` to Google Fonts (skill 3.A).

**Banned as defaults for this project:** `Kanit`, `Prompt`, `Sarabun`, `Mitr`,
`Noto Sans Thai`, `Inter`, `Fraunces`, `Instrument Serif`. Kanit and Prompt are
to Thai what Inter is to Latin: the tell that nobody chose a typeface.

### Thai line-height rule (project-specific, not in the upstream skill)

Thai stacks vowels above and tone marks above those, and descends below the
baseline. `leading-none` and `leading-tight` clip them.

- Display Thai: **`leading-[1.25]` minimum.** Never `leading-none`.
- Body Thai: **`leading-[1.75]`**.
- Tracking: Thai does not take negative tracking. `tracking-tight` on a Thai
  headline is a bug. Latin-only strings may use `tracking-tight`.

### Scale

| Role | Classes |
|---|---|
| h1 | `text-[2.25rem] md:text-5xl lg:text-[3.25rem] font-semibold leading-[1.25]` |
| h2 | `text-3xl md:text-4xl font-semibold leading-[1.3]` |
| h3 | `text-xl md:text-2xl font-semibold leading-[1.4]` |
| body | `text-base leading-[1.75] text-muted-foreground max-w-[62ch]` |
| small | `text-sm leading-[1.7]` |

---

## 5. Shape lock (skill 4.4)

One documented rule, applied everywhere:

```
--radius: 0.75rem
cards, panels, images, tables .......... 12px  (rounded-xl)
buttons, inputs, selects ............... 10px  (rounded-[10px])
badges, pills, avatars ................. full  (rounded-full)
nothing on this site is square-cornered
```

Shadows: tinted to navy, never black. `shadow-[0_1px_2px_rgba(14,27,44,0.06),0_8px_24px_-12px_rgba(14,27,44,0.18)]`.
Cards are used only where elevation means something (a product you can click).
Static content groups with `border` or `divide-y`, not with a card.

---

## 6. Icons

`@phosphor-icons/react`, **weight `regular`** globally, size 20 for inline / 24 for
feature. One family, no exceptions. shadcn primitives ship with `lucide-react`
imports; those are rewritten to Phosphor when the component is vendored. No
hand-rolled SVG icon paths anywhere (skill 3.C / 9.E).

Phosphor equivalents used when patching shadcn source:

| lucide | phosphor |
|---|---|
| `ChevronDownIcon` | `CaretDown` |
| `ChevronUpIcon` | `CaretUp` |
| `ChevronRightIcon` | `CaretRight` |
| `ChevronLeftIcon` | `CaretLeft` |
| `CheckIcon` | `Check` |
| `XIcon` | `X` |
| `CircleIcon` | `Circle` (weight `fill`) |
| `MinusIcon` | `Minus` |

---

## 7. Motion policy (MOTION_INTENSITY 4)

Library: `motion/react`. Every animated component is a `'use client'` leaf.
Every animation must answer "what does this communicate" in one sentence.

| Move | Where | Communicates |
|---|---|---|
| rise 16px + fade, 0.5s `easeOut` | hero copy block, once on mount | hierarchy: read this first |
| `whileInView` rise 20px + fade, `once: true`, stagger 0.06 | section heading + first row of each section | storytelling: content arrives as you reach it |
| `-translate-y-px` on hover, `scale-[0.98]` on `:active` | every button and card link | feedback: this is pressable |
| height auto accordion | FAQ | state transition |

**Banned here:** scroll hijack, pinned sections, horizontal pan, parallax,
infinite pulses, typewriter, custom cursors, more than one marquee on a page.
`prefers-reduced-motion` is honoured through `useReducedMotion()` in every
animated leaf; reduced motion renders the final state immediately, never a
half-animation.

---

## 8. Copy locks

### CTA intent (skill 4.5 - one label per intent, site-wide)

| Intent | The only allowed label |
|---|---|
| quote | **ขอใบเสนอราคา** |
| recruit | **สมัครเป็นนายหน้า** |
| call | **โทร 02 xxx xxxx** (footer and contact page only) |

Banned as duplicates of the above: เช็คเบี้ยประกัน, คำนวณเบี้ย, รับข้อเสนอ, ขอราคา,
เริ่มต้นใช้งาน, ร่วมงานกับเรา, สมัครตัวแทน, สนใจสมัคร.

### Thai copy rules

- **Zero em-dash (`—`) and zero en-dash (`–`) anywhere visible** (skill 9.G).
  Thai copy has no reason to use them at all. Use ` - ` or restructure.
- No English filler verbs transliterated into Thai marketing slop
  ("ยกระดับ", "ไร้รอยต่อ", "ปลดล็อกศักยภาพ", "โซลูชันครบวงจร", "ตอบโจทย์ทุกไลฟ์สไตล์").
- Numbers are either real, or mock and labelled in the content file. No invented
  precision like "ลูกค้าไว้วางใจ 99.7%".
- Names in testimonials are realistic Thai names with a real-sounding occupation
  and province. No "คุณสมชาย ใจดี" placeholder-grade names.
- Every claim a licensed broker cannot legally make is out: no "รับประกันจ่ายทุกเคลม",
  no "ถูกที่สุดในประเทศ".

---

## 9. Section layout-family map

The skill bans reusing a layout family and caps consecutive image+text splits at
2. Families are assigned up front so no two agents pick the same one.

### `/` home - 8 sections, eyebrow budget 2

| # | Section | Layout family | Eyebrow |
|---|---|---|---|
| 1 | Hero | asymmetric split 7/5, copy left, photo right, scrim | no |
| 2 | พันธมิตรบริษัทประกัน | logo wall, marks only, no labels | no |
| 3 | สินค้าประกันภัย | bento, 5 items 5 cells, 1 large + 4, >=2 cells carry an image | **yes** |
| 4 | ทำไมต้องอารักษ์ | full-bleed navy stat band, 4 figures, no cards, no progress bars | no |
| 5 | ขั้นตอนการเคลม | horizontal step flow with connector, verb labels only | no |
| 6 | สมัครนายหน้า | full-bleed CTA band with photo, single CTA | **yes** |
| 7 | เสียงจากลูกค้า | quote grid, 3 quotes max 3 lines each | no |
| 8 | คำถามที่พบบ่อย | accordion, 6 items | no |

### `/about` ประวัติบริษัท - 6 sections, eyebrow budget 2

| # | Section | Layout family |
|---|---|---|
| 1 | Page header | left-aligned header, one line of standfirst, no split header |
| 2 | เรื่องราวของเรา | two-column prose + portrait, single instance |
| 3 | เส้นทางของบริษัท | vertical timeline, year on the rail |
| 4 | วิสัยทัศน์และพันธกิจ | 2-cell asymmetric panel, navy surface |
| 5 | ใบอนุญาตและการกำกับดูแล | definition list on hairlines, licence numbers in the open |
| 6 | ทีมผู้บริหาร | portrait grid, 4 people |

### `/products` - index + detail

Index: filter rail + card grid (family: filtered grid). Detail pages:
header, coverage table, tier comparison (motor only), exclusions accordion,
related products, quote CTA. **The tier comparison is a real table**, not a
scoring bar with a filled track (skill bans those).

### `/agent` สมัครนายหน้า - 7 sections, eyebrow budget 2

| # | Section | Layout family |
|---|---|---|
| 1 | Hero | centred over image, this is a single-message landing so centre is justified |
| 2 | รายได้และค่าคอมมิชชั่น | commission table by product line |
| 3 | สิ่งที่คุณจะได้รับ | 4-cell bento with icon + figure |
| 4 | คุณสมบัติผู้สมัคร | two-column checklist |
| 5 | ขั้นตอนการสมัคร | numbered rail, verb labels |
| 6 | คำถามที่พบบ่อย | accordion |
| 7 | ฟอร์มสมัคร link band | full-bleed CTA |

`/agent/apply` is a form page, not a marketing page: single column, max-w-2xl,
label above input, helper text present, error below input, no placeholder-as-label.

### Section files

Each page owns `src/pages/<route>/sections/*.tsx`, one file per section, and the
page file composes them in order. A page file that contains layout markup instead
of composed sections is the thing the owner's first architecture rule forbids.

### `/contact` - header, branch cards, form, hours strip.

---

## 10. Imagery (skill 4.8, adapted to this environment)

**No image-generation tool is available in this environment, and
`picsum.photos`, `images.unsplash.com` and `cdn.simpleicons.org` are all blocked
by the network egress policy.** Building the page text-only is not acceptable
(the skill calls that incomplete work), and div-based fake screenshots are
banned outright.

The resolution is a two-mode media layer:

- `src/lib/media.ts` exposes `photo(slot)`. `VITE_IMAGE_MODE=remote`
  returns a `picsum.photos` seeded URL; the default `placeholder` returns a local
  seeded SVG from `/public/media/`. Components never call it directly; they use
  `<AppImage slot="..." alt="..." />`.
- `scripts/generate-placeholders.mjs` emits those SVGs: deterministic geometric
  compositions in the brand palette, correct aspect ratio per slot. They read as
  art direction, not as grey boxes, and they are honest - none of them pretends
  to be a photograph or a product screenshot.
- Every slot is declared once in `src/content/media.ts` with the real photo brief
  next to it, so swapping in real photography is a content edit.

Partner-insurer marks are generated monograms (skill: "make up the brand name,
make up the SVG mark"), single-colour, working on light and dark. **Logo wall
carries marks only. No category labels under them.**

Photography still needed before this goes live is listed in `docs/ASSETS-NEEDED.md`.

---

## 11. Accessibility floor

- Every interactive target >= 44px on touch.
- Focus visible everywhere, `--ring` at 3px with 2px offset. Never `outline: none`
  without a replacement.
- Form: label above input, `aria-describedby` wired to helper and error, error
  announced with `role="alert"`.
- Coverage tables use real `<table>` with `<caption>` and `<th scope>`.
- Contrast AA minimum for everything including placeholder text and helper text.
- Thai `lang="th"` on `<html>`, correct `hreflang` if English is added later.
