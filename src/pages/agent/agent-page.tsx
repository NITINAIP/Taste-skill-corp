import { useAgentContent } from "@/hooks/use-site-content"
import { usePageMeta } from "@/hooks/use-page-meta"

import { AgentCtaBand } from "./sections/agent-cta-band"
import { AgentFaqSection } from "./sections/agent-faq-section"
import { AgentHero } from "./sections/agent-hero"
import { ApplyStepsSection } from "./sections/apply-steps-section"
import { BenefitsSection } from "./sections/benefits-section"
import { CommissionSection } from "./sections/commission-section"
import { QualificationsSection } from "./sections/qualifications-section"

export default function AgentPage() {
  usePageMeta({
    title: "สมัครเป็นนายหน้าประกันวินาศภัย",
    description:
      "อาชีพนายหน้าประกันวินาศภัยกับอารักษ์ โบรกเกอร์ ดูช่วงอัตราค่าคอมมิชชั่น คุณสมบัติผู้สมัคร และขั้นตอนอบรมสอบใบอนุญาต",
  })

  const resource = useAgentContent()

  return (
    <>
      <AgentHero resource={resource} />
      <CommissionSection resource={resource} />
      <BenefitsSection resource={resource} />
      <QualificationsSection resource={resource} />
      <ApplyStepsSection resource={resource} />
      <AgentFaqSection resource={resource} />
      <AgentCtaBand />
    </>
  )
}
