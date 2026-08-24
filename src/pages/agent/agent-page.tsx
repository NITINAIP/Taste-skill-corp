import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"
import { usePageMeta } from "@/hooks/use-page-meta"

export default function AgentPage() {
  usePageMeta({ title: "สมัครเป็นนายหน้าประกันภัย", description: "รายได้จากค่าคอมมิชชั่น พร้อมทีมสนับสนุนและการอบรมสอบใบอนุญาต" })

  return (
    <Section>
      <SectionHeading as="h1" title="สมัครเป็นนายหน้าประกันภัย" lead="รายได้จากค่าคอมมิชชั่น พร้อมทีมสนับสนุนและการอบรมสอบใบอนุญาต" />
    </Section>
  )
}
