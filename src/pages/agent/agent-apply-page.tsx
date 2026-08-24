import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"
import { usePageMeta } from "@/hooks/use-page-meta"

import { ApplicationPanel } from "./form/application-panel"
import { useAgentApplication } from "./use-agent-application"

export default function AgentApplyPage() {
  usePageMeta({
    title: "กรอกใบสมัครนายหน้าประกันวินาศภัย",
    description:
      "กรอกใบสมัครนายหน้าประกันวินาศภัยกับอารักษ์ โบรกเกอร์ ใช้เวลาประมาณ 5 นาที ทีมรับสมัครติดต่อกลับภายใน 2 วันทำการ",
  })

  const application = useAgentApplication()

  return (
    <Section>
      <SectionHeading
        as="h1"
        title="กรอกใบสมัครนายหน้าประกันวินาศภัย"
        lead="ใช้เวลาประมาณ 5 นาที ยังไม่ต้องมีใบอนุญาตก็สมัครได้ ทีมรับสมัครจะติดต่อกลับภายใน 2 วันทำการเพื่อนัดสัมภาษณ์"
        className="mx-auto"
      />
      <ApplicationPanel application={application} />
    </Section>
  )
}
