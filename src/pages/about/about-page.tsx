import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"
import { usePageMeta } from "@/hooks/use-page-meta"

export default function AboutPage() {
  usePageMeta({ title: "ประวัติบริษัท", description: "เส้นทางของบริษัท วิสัยทัศน์ ใบอนุญาต และทีมผู้บริหาร" })

  return (
    <Section>
      <SectionHeading as="h1" title="ประวัติบริษัท" lead="เส้นทางของบริษัท วิสัยทัศน์ ใบอนุญาต และทีมผู้บริหาร" />
    </Section>
  )
}
