import { Reveal } from "@/components/common/reveal"
import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"

/**
 * Index page header: left-aligned, headline and standfirst stacked.
 *
 * Deliberately not the split-header pattern, and deliberately a different family
 * from the detail-page header, which is a split with the product image.
 */
export function ProductsHeader() {
  return (
    <Section className="pb-8 md:pb-12">
      <Reveal>
        <SectionHeading
          as="h1"
          eyebrow="ประกันวินาศภัย"
          title="สินค้าประกันภัย"
          lead="ประกันรถยนต์ สุขภาพ อัคคีภัย เดินทาง และประกันธุรกิจ เลือกดูความคุ้มครองของแต่ละแบบ"
        />
      </Reveal>
    </Section>
  )
}
