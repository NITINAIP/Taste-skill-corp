import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"
import { usePageMeta } from "@/hooks/use-page-meta"

export default function ProductDetailPage() {
  usePageMeta({ title: "รายละเอียดความคุ้มครอง", description: "ความคุ้มครอง ข้อยกเว้น และเอกสารที่ต้องใช้" })

  return (
    <Section>
      <SectionHeading as="h1" title="รายละเอียดความคุ้มครอง" lead="ความคุ้มครอง ข้อยกเว้น และเอกสารที่ต้องใช้" />
    </Section>
  )
}
