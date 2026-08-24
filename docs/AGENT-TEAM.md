# ทีม Agent สำหรับโปรเจกต์นี้

โครงสร้างทีมออกแบบรอบข้อจำกัดเดียวที่สำคัญที่สุดของการรัน agent หลายตัวพร้อมกัน:
**agent สองตัวต้องไม่แตะไฟล์เดียวกัน** ทุก role ด้านล่างจึงถูกนิยามด้วย *ไฟล์ที่เป็นเจ้าของ*
ไม่ใช่แค่ "หน้าที่" และ phase ถูกจัดเรียงให้ไฟล์ที่ใช้ร่วมกัน (tokens, layout shell, content)
เสร็จก่อนที่ agent ที่ทำงานขนานกันจะเริ่ม

นิยาม agent จริงอยู่ที่ `.claude/agents/*.md` (Claude Code subagent format)
ไฟล์นี้คือแผนผังทีมและกติกาการส่งงาน

---

## 1. ผังทีม

```
                        ┌──────────────────────────┐
                        │  design-director         │  เจ้าของ taste-skill
                        │  DESIGN-BRIEF.md         │  ตัดสินเรื่อง design ทุกข้อ
                        └────────────┬─────────────┘
                                     │ brief + dials + tokens
                        ┌────────────▼─────────────┐
   PHASE 1 (ทำคนเดียว)  │  ui-foundation           │  scaffold, tokens, shadcn,
                        │  ไฟล์ที่ทุกคนใช้ร่วมกัน      │  fonts, icons, nav, footer
                        └────────────┬─────────────┘
                                     │ unblocks everyone
              ┌──────────────────────┼──────────────────────┐
              │                      │                      │
   ┌──────────▼─────────┐ ┌──────────▼─────────┐ ┌─────────▼──────────┐
   │ content-th         │ │ (รอ content)       │ │ (รอ content)       │
   │ src/content/**     │ │                    │ │                    │
   └──────────┬─────────┘ └────────────────────┘ └────────────────────┘
              │ ข้อมูลไทยทั้งหมดพร้อม
   ┌──────────┴───────────────────────────────────────────────┐
   │  PHASE 2 - ทำขนานกัน 4 ตัว ไฟล์ไม่ทับกัน                     │
   │                                                            │
   │  page-home         src/app/(site)/page.tsx + sections/home │
   │  page-corporate    src/app/(site)/about, /contact          │
   │  page-products     src/app/(site)/products/**              │
   │  page-agent        src/app/(site)/agent/**                 │
   └──────────┬─────────────────────────────────────────────────┘
              │
   ┌──────────▼─────────┐
   │ qa-preflight       │  taste-skill §14 แบบกลไก + build + a11y
   │ อ่านทุกไฟล์ แก้ได้ทุกไฟล์ │  รันคนเดียว ไม่ขนานกับใคร
   └────────────────────┘
```

---

## 2. Role และไฟล์ที่เป็นเจ้าของ

| Agent | หน้าที่ | เป็นเจ้าของไฟล์ | อ่านได้ (ห้ามแก้) |
|---|---|---|---|
| **design-director** | อ่าน brief ของลูกค้า ตั้ง design read + dials + token + layout-family map ตัดสินข้อขัดแย้งเรื่องดีไซน์ ไม่เขียนโค้ดหน้าเว็บ | `docs/DESIGN-BRIEF.md`, `docs/ASSETS-NEEDED.md` | ทั้ง repo |
| **ui-foundation** | Next+Tailwind v4 config, design token ใน `globals.css`, ฟอนต์, vendor shadcn/ui + เปลี่ยนไอคอนเป็น Phosphor, media layer, nav, footer, primitives ที่ใช้ร่วม | `src/app/layout.tsx`, `src/app/globals.css`, `src/components/ui/**`, `src/components/site/**`, `src/lib/**`, `next.config.ts`, `scripts/**` | `docs/**` |
| **content-th** | ข้อมูลและ copy ภาษาไทยทั้งหมด ความคุ้มครองจริงของประกันแต่ละประเภท ค่าคอมมิชชั่น FAQ ชื่อคนจริง ๆ ไม่ใช่ placeholder | `src/content/**` | `docs/**`, `src/lib/**` |
| **page-home** | 8 section ของหน้าแรกตาม layout-family map | `src/app/(site)/page.tsx`, `src/components/sections/home/**` | `src/components/ui/**`, `src/content/**` |
| **page-corporate** | ประวัติบริษัท + ติดต่อเรา | `src/app/(site)/about/**`, `src/app/(site)/contact/**`, `src/components/sections/corporate/**` | เหมือนกัน |
| **page-products** | index + รายละเอียดสินค้าประกันภัยรายตัว ตารางความคุ้มครอง ตารางเทียบชั้น 1/2+/3+/3 | `src/app/(site)/products/**`, `src/components/sections/products/**` | เหมือนกัน |
| **page-agent** | หน้าสมัครนายหน้า + ฟอร์มสมัคร RHF/Zod พร้อม state ครบ | `src/app/(site)/agent/**`, `src/components/sections/agent/**`, `src/lib/schemas/agent-application.ts` | เหมือนกัน |
| **qa-preflight** | รัน pre-flight §14 แบบกลไก (นับ eyebrow, grep em-dash, ตรวจ layout family ซ้ำ, ตรวจ CTA ซ้ำ intent, contrast), `npm run build`, `typecheck`, `lint`, ตรวจ responsive แก้ที่พบได้เลย | แก้ได้ทุกไฟล์ เฉพาะเพื่อปิด finding | - |

---

## 3. กติกาที่ทุก agent ต้องทำตาม

1. **โหลด skill ก่อนเขียน UI ทุกครั้ง** `Skill(design-taste-frontend)` แล้วอ่าน
   `docs/DESIGN-BRIEF.md` ห้ามเดา token สีหรือฟอนต์เอง
2. **ห้ามแตะไฟล์ที่ไม่ได้เป็นเจ้าของ** ถ้าต้องการให้แก้ไฟล์ของ role อื่น
   ให้เขียนคำขอไว้ใน report แทน ห้ามแก้เอง
3. **ห้ามติดตั้ง dependency เอง** ถ้าขาด ให้รายงาน `ui-foundation` เป็นคนติดตั้ง
   (skill 3.F: ตรวจ `package.json` ก่อน import ทุกครั้ง)
4. **ห้ามส่งงานที่มี `—` หรือ `–`** โผล่ในข้อความที่ผู้ใช้เห็น เช็คด้วย
   `grep -rn '—\|–' src/` ก่อนบอกว่าเสร็จ
5. **ห้าม `// TODO` หรือ `...` แทนโค้ดจริง** (skill `full-output-enforcement`)
   section ที่สร้างต้อง render ได้จริงทั้งหมด
6. **จบงานต้องรัน `npm run typecheck`** และรายงานผลตามจริง ถ้าพังต้องบอก
7. **รายงานกลับด้วยฟอร์แมตเดียวกัน** (ข้อ 4 ด้านล่าง)

---

## 4. ฟอร์แมตรายงานส่งงาน

```
DONE
- ไฟล์ที่สร้าง/แก้: <รายการเต็ม>
- section ที่ทำ + layout family ที่ใช้ของแต่ละอัน
- eyebrow ที่ใช้: <จำนวน> จากโควตา <จำนวน>
- typecheck: pass | fail + ข้อความ
- em-dash scan: clean | พบที่ไหน

NEEDS
- ขอให้ role อื่นแก้อะไร (ถ้ามี)
- dependency ที่ขาด (ถ้ามี)

RISK
- อะไรที่อาจไม่ผ่าน pre-flight §14 และเพราะอะไร
```

---

## 5. ทำไมแบ่งแบบนี้

- **`ui-foundation` ต้องเสร็จก่อนเสมอ** เพราะเป็นเจ้าของไฟล์ที่ทุกหน้าต้อง import
  ถ้าปล่อยให้ทำขนานกัน จะได้ปุ่มสามแบบและสีน้ำเงินสามเฉด ซึ่งชน
  Colour Consistency Lock และ Shape Consistency Lock ของ skill ตรง ๆ
- **`content-th` แยกจากคนทำหน้า** เพราะกฎ copy ของ skill (ห้าม em-dash,
  ห้ามชื่อ placeholder, ห้ามตัวเลขปลอมแบบเจาะจง) บังคับง่ายกว่ามากเมื่อ copy
  ทุกบรรทัดอยู่ในโฟลเดอร์เดียว และทำให้เปลี่ยนไปใช้ข้อมูลบริษัทจริงได้ในที่เดียว
- **หน้าเว็บแบ่งตาม route ไม่ใช่ตาม component** เพราะ layout-family map ผูกกับหน้า
  กฎ "ห้ามใช้ layout family ซ้ำ" บังคับได้ก็ต่อเมื่อคนเดียวเห็นทั้งหน้า
- **`qa-preflight` ห้ามรันขนานกับใคร** เพราะมันแก้ไฟล์ข้าม role ได้
  ถ้ามีคนแก้อยู่พร้อมกันจะทับกัน
