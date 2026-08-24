import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"
import { usePageMeta } from "@/hooks/use-page-meta"

export default function AgentApplyPage() {
  usePageMeta({ title: "กรอกใบสมัครนายหน้า", description: "กรอกข้อมูลเพื่อให้ทีมรับสมัครติดต่อกลับ" })

  return (
    <Section>
      <SectionHeading as="h1" title="กรอกใบสมัครนายหน้า" lead="กรอกข้อมูลเพื่อให้ทีมรับสมัครติดต่อกลับ" />
    </Section>
  )
}
