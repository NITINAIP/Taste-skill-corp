# แผนแบ่งงาน

สามเฟส เรียงตามไฟล์ที่ใช้ร่วมกัน ไม่ใช่ตามความสำคัญ
เฟส 2 เท่านั้นที่รันขนานกันได้

---

## PHASE 0 - ตั้งต้น (เสร็จแล้ว)

| # | งาน | ผู้ทำ | ผลลัพธ์ |
|---|---|---|---|
| 0.1 | ติดตั้ง taste-skill | orchestrator | `.claude/skills/` 13 skills + `INSTALL-NOTES.md` |
| 0.2 | Design read + dials + tokens | design-director | `docs/DESIGN-BRIEF.md` |
| 0.3 | ผังทีมและกติกา | design-director | `docs/AGENT-TEAM.md`, `.claude/agents/*.md` |
| 0.4 | scaffold Next 16 + Tailwind v4 | ui-foundation | `src/`, `package.json` |

---

## PHASE 1 - foundation (ทำคนเดียว บล็อกทุกคน)

**ผู้ทำ: `ui-foundation`**

| # | งาน | เกณฑ์ผ่าน |
|---|---|---|
| 1.1 | ติดตั้ง dependency ทั้งหมด | radix primitives, `motion`, `@phosphor-icons/react`, `react-hook-form`, `zod`, `@hookform/resolvers`, `next-themes`, `class-variance-authority`, `clsx`, `tailwind-merge`, `tw-animate-css` อยู่ใน `package.json` และ `npm ls` ไม่มี unmet |
| 1.2 | design token ใน `globals.css` | ทุก token ใน DESIGN-BRIEF §3 อยู่ใน `@theme` ครบ ทั้ง light และ dark ไม่มี token ไหนถูกนิยามเฉพาะใน media query |
| 1.3 | ฟอนต์ | Anuphan + IBM Plex Sans Thai ผ่าน `next/font/google` มี `display: swap` และ subset ไทย ไม่มี `<link>` ไป Google Fonts |
| 1.4 | vendor shadcn/ui | button, card, accordion, tabs, table, input, textarea, label, select, checkbox, radio-group, badge, separator, sheet, dialog, form, avatar, skeleton, sonner, tooltip - ทุกตัวเปลี่ยนไอคอนเป็น Phosphor แล้ว และ radius/shadow/สี มาจาก token ไม่ใช่ค่า default |
| 1.5 | media layer | `src/lib/media.ts` + `scripts/generate-placeholders.mjs` + ไฟล์ SVG ใน `public/media/` สลับโหมดด้วย `NEXT_PUBLIC_IMAGE_MODE` ได้จริง |
| 1.6 | โลโก้แบรนด์ + monogram พันธมิตร | SVG inline component เดียว ใช้ได้ทั้ง light และ dark |
| 1.7 | shell: header + nav + footer | nav บรรทัดเดียวที่ `lg` สูงไม่เกิน 80px มี mobile sheet ปุ่มสลับธีมทำงานจริง footer มีเลขใบอนุญาตและ disclosure |
| 1.8 | `Section` + `SectionHeading` primitive | คุมระยะห่างและ eyebrow ที่เดียว เพื่อให้ QA นับ eyebrow ได้แบบกลไก |

**ส่งมอบ:** `npm run build` ผ่าน หน้าเปล่าที่มี header/footer render ได้

---

## PHASE 1.5 - content (ทำคนเดียว บล็อกเฟส 2)

**ผู้ทำ: `content-th`**

| # | ไฟล์ | เนื้อหา |
|---|---|---|
| 1.5.1 | `src/content/company.ts` | ชื่อบริษัท ที่อยู่ เลขใบอนุญาต ทุนจดทะเบียน ช่องทางติดต่อ เวลาทำการ สาขา พร้อม mock banner |
| 1.5.2 | `src/content/products.ts` | 8 ผลิตภัณฑ์ แต่ละตัวมี slug, หมวด, สรุป, ความคุ้มครองหลัก, ข้อยกเว้น, เอกสารที่ต้องใช้, FAQ, ช่วงเบี้ยโดยประมาณ (ระบุว่า mock) |
| 1.5.3 | `src/content/motor-tiers.ts` | ตารางเทียบ ชั้น 1 / 2+ / 3+ / 3 ต่อรายการความคุ้มครอง |
| 1.5.4 | `src/content/about.ts` | เรื่องราวบริษัท timeline วิสัยทัศน์ พันธกิจ ผู้บริหาร |
| 1.5.5 | `src/content/agent.ts` | เหตุผลที่ควรสมัคร ตารางค่าคอมมิชชั่นต่อสายผลิตภัณฑ์ คุณสมบัติ ขั้นตอน FAQ |
| 1.5.6 | `src/content/testimonials.ts` | 3 เสียงลูกค้า ชื่อจริงจัง อาชีพ จังหวัด ยาวไม่เกิน 3 บรรทัด |
| 1.5.7 | `src/content/media.ts` | ประกาศ slot ภาพทุกอันพร้อม brief ของภาพจริงที่ต้องถ่าย |

**เกณฑ์ผ่าน:** `grep -rn '—\|–' src/content/` ว่าง ทุก export มี type ไม่มีคำ slop ตาม DESIGN-BRIEF §8

---

## PHASE 2 - หน้าเว็บ (ขนานกัน 4 ตัว)

ไฟล์ไม่ทับกันเลย ทุกตัวอ่าน `src/components/ui`, `src/components/site`, `src/content` อย่างเดียว

| Agent | Route | Section | เกณฑ์ผ่านเฉพาะตัว |
|---|---|---|---|
| `page-home` | `/` | 8 section ตาม §9 | hero อยู่ใน viewport แรก, eyebrow ไม่เกิน 2, bento 5 ช่องพอดี 5 รายการ, มีภาพจริงอย่างน้อย 3 slot |
| `page-corporate` | `/about`, `/contact` | 6 + 4 section | timeline เป็นรางแนวตั้ง, เลขใบอนุญาตแสดงชัด, ฟอร์มติดต่อมี state ครบ, ไม่มี split header |
| `page-products` | `/products`, `/products/[slug]` | index + 8 detail | `generateStaticParams` ครบทุก slug, ตารางเป็น `<table>` จริงมี caption, ตารางเทียบชั้นไม่ใช่ progress bar, ข้อยกเว้นอยู่ใน accordion |
| `page-agent` | `/agent`, `/agent/apply` | 7 section + ฟอร์ม | ฟอร์มมี checksum เลขบัตรประชาชน 13 หลักจริง, มี idle/submitting/success/error ครบ, ไม่มี placeholder แทน label |

**ห้ามทั้ง 4 ตัว:** แก้ไฟล์นอก scope, ติดตั้ง package, เขียน copy ใหม่แทน `src/content`

---

## PHASE 3 - QA (ทำคนเดียว)

**ผู้ทำ: `qa-preflight`**

รัน Section 14 ทั้ง matrix แบบกลไก แล้วแก้ที่พบ ปิดท้ายด้วย
`npm run typecheck && npm run lint && npm run build` ต้องผ่านทั้งสาม

รายการที่ต้องรันเป็นคำสั่งจริง ไม่ใช่ความรู้สึก อยู่ใน `.claude/agents/qa-preflight.md`

---

## สิ่งที่ยังต้องมีก่อนขึ้นจริง

อยู่ใน `docs/ASSETS-NEEDED.md` สรุปสั้น ๆ คือ ภาพถ่ายจริง โลโก้บริษัทจริง
ข้อมูลบริษัทจริงแทน mock ใน `src/content/company.ts` และ endpoint รับใบสมัครนายหน้าจริง
