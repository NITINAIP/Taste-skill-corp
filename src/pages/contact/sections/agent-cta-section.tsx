import { Link } from "react-router-dom"

import { Reveal } from "@/components/common/reveal"
import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"
import { Button } from "@/components/ui/button"
import { recruitCta } from "@/lib/nav"

/**
 * Section 4: the recruit band.
 *
 * One CTA, with the locked label, on the navy surface. Anyone who reached the
 * bottom of the contact page without filling the form is either looking for a
 * branch or looking for work, and the branches are directly above.
 */
export function AgentCtaSection() {
  return (
    <Section surface="primary">
      <Reveal>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            onDark
            title="สนใจทำงานเป็นนายหน้าประกันวินาศภัย"
            lead="เรารับสมัครนายหน้าทั้งแบบเต็มเวลาและแบบเสริมรายได้ มีการอบรม ติวสอบใบอนุญาต และระบบเทียบเบี้ยให้ใช้ออกใบเสนอราคาเอง"
          />
          <Button asChild variant="brand" size="lg" className="shrink-0">
            <Link to={recruitCta.href}>{recruitCta.label}</Link>
          </Button>
        </div>
      </Reveal>
    </Section>
  )
}
