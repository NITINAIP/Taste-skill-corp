import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"
import { usePageMeta } from "@/hooks/use-page-meta"

export default function ContactPage() {
  usePageMeta({ title: "ติดต่อเรา", description: "สาขา เวลาทำการ และช่องทางขอใบเสนอราคา" })

  return (
    <Section>
      <SectionHeading as="h1" title="ติดต่อเรา" lead="สาขา เวลาทำการ และช่องทางขอใบเสนอราคา" />
    </Section>
  )
}
