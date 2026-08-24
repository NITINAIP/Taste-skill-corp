import { usePageMeta } from "@/hooks/use-page-meta"
import { AgentBandSection } from "@/pages/home/sections/agent-band-section"
import { ClaimStepsSection } from "@/pages/home/sections/claim-steps-section"
import { FaqSection } from "@/pages/home/sections/faq-section"
import { HeroSection } from "@/pages/home/sections/hero-section"
import { PartnersSection } from "@/pages/home/sections/partners-section"
import { ProductsSection } from "@/pages/home/sections/products-section"
import { StatsSection } from "@/pages/home/sections/stats-section"
import { TestimonialsSection } from "@/pages/home/sections/testimonials-section"

/**
 * The homepage composes sections and nothing else. Layout, styling and data all
 * belong to the sections, which is the project rule that keeps a page file from
 * turning into utility soup.
 */
export default function HomePage() {
  usePageMeta({
    title: "นายหน้าประกันภัยที่อยู่ข้างคุณ",
    description:
      "เปรียบเทียบความคุ้มครองจากบริษัทประกันคู่สัญญา แล้วดูแลคุณต่อจนจบเคลม",
  })

  return (
    <>
      <HeroSection />
      <PartnersSection />
      <ProductsSection />
      <StatsSection />
      <ClaimStepsSection />
      <AgentBandSection />
      <TestimonialsSection />
      <FaqSection />
    </>
  )
}
