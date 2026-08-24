import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"
import { usePageMeta } from "@/hooks/use-page-meta"

export default function ProductsPage() {
  usePageMeta({ title: "สินค้าประกันภัย", description: "ประกันรถยนต์ สุขภาพ อัคคีภัย เดินทาง และประกันธุรกิจ เลือกดูความคุ้มครองของแต่ละแบบ" })

  return (
    <Section>
      <SectionHeading as="h1" title="สินค้าประกันภัย" lead="ประกันรถยนต์ สุขภาพ อัคคีภัย เดินทาง และประกันธุรกิจ เลือกดูความคุ้มครองของแต่ละแบบ" />
    </Section>
  )
}
