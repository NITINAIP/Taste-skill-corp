import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"
import { usePageMeta } from "@/hooks/use-page-meta"

export default function HomePage() {
  usePageMeta({ title: "นายหน้าประกันภัยที่อยู่ข้างคุณ", description: "เปรียบเทียบความคุ้มครองจากบริษัทประกันคู่สัญญา แล้วดูแลคุณต่อจนจบเคลม" })

  return (
    <Section>
      <SectionHeading as="h1" title="นายหน้าประกันภัยที่อยู่ข้างคุณ" lead="เปรียบเทียบความคุ้มครองจากบริษัทประกันคู่สัญญา แล้วดูแลคุณต่อจนจบเคลม" />
    </Section>
  )
}
