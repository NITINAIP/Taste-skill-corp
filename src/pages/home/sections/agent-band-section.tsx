import { Link } from "react-router-dom"

import { AppImage } from "@/components/common/app-image"
import { Reveal } from "@/components/common/reveal"
import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"
import { Button } from "@/components/ui/button"
import { recruitCta } from "@/lib/nav"

/**
 * Layout family: full bleed CTA band, copy over a photograph.
 *
 * Deliberately not the hero's seven and five split. The photograph and the scrim
 * are pushed out to the viewport edges with a centred full width layer, so the
 * band bleeds while the copy stays on the page container.
 *
 * The scrim is fixed navy in both themes because it sits on top of a photograph,
 * which is the one gradient this project allows. White copy on it clears AA in
 * light and dark alike.
 */
const bleedClassName = "absolute inset-y-0 left-1/2 w-screen -translate-x-1/2"

const scrimClassName =
  "bg-[linear-gradient(180deg,rgba(11,23,39,0.93)_0%,rgba(11,23,39,0.88)_100%)] md:bg-[linear-gradient(90deg,rgba(11,23,39,0.95)_0%,rgba(11,23,39,0.88)_46%,rgba(11,23,39,0.5)_100%)]"

export function AgentBandSection() {
  return (
    <Section
      id="agent"
      surface="primary"
      className="relative isolate overflow-hidden py-20 md:py-28"
    >
      <AppImage
        slot="home-agent-band"
        alt="นายหน้ารุ่นใหม่นั่งคุยกับหัวหน้าทีมในมุมทำงานของออฟฟิศ"
        rounded={false}
        className={`${bleedClassName} -z-20`}
      />
      <span aria-hidden="true" className={`${bleedClassName} -z-10 ${scrimClassName}`} />

      <Reveal className="max-w-[36rem]">
        <SectionHeading
          onDark
          eyebrow="โอกาสสำหรับนายหน้า"
          title="สร้างรายได้จากงานนายหน้าประกันวินาศภัย"
          lead="เราดูแลตั้งแต่การเตรียมสอบใบอนุญาต ระบบเทียบเบี้ยที่ใช้งานจริง ไปจนถึงทีมสินไหมที่รับช่วงต่อเมื่อลูกค้าของคุณต้องเคลม"
        />
        <div className="mt-8">
          <Button asChild variant="brand" size="lg">
            <Link to={recruitCta.href}>{recruitCta.label}</Link>
          </Button>
        </div>
      </Reveal>
    </Section>
  )
}
