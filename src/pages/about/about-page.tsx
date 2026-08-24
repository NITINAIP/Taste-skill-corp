import { usePageMeta } from "@/hooks/use-page-meta"
import { useAboutContent } from "@/hooks/use-site-content"

import { AboutHeaderSection } from "@/pages/about/sections/about-header-section"
import { GovernanceSection } from "@/pages/about/sections/governance-section"
import { LeadershipSection } from "@/pages/about/sections/leadership-section"
import { StorySection } from "@/pages/about/sections/story-section"
import { TimelineSection } from "@/pages/about/sections/timeline-section"
import { VisionMissionSection } from "@/pages/about/sections/vision-mission-section"

export default function AboutPage() {
  usePageMeta({
    title: "ประวัติบริษัท",
    description:
      "เส้นทางของอารักษ์ อินชัวรันส์ โบรกเกอร์ ตั้งแต่ปี 2549 วิสัยทัศน์และพันธกิจ เลขที่ใบอนุญาตนายหน้าประกันวินาศภัย และทีมผู้บริหาร",
  })

  const about = useAboutContent()

  return (
    <>
      <AboutHeaderSection />
      <StorySection about={about} />
      <TimelineSection about={about} />
      <VisionMissionSection about={about} />
      <GovernanceSection about={about} />
      <LeadershipSection about={about} />
    </>
  )
}
