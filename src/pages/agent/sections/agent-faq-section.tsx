import { AsyncBoundary } from "@/components/common/async-boundary"
import { Reveal } from "@/components/common/reveal"
import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Skeleton } from "@/components/ui/skeleton"

import type { AgentContentResource } from "../agent-content"

function FaqSkeleton() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="grid gap-px border-t border-border"
    >
      <span className="sr-only">กำลังโหลดข้อมูล</span>
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="h-14 w-full rounded-none" />
      ))}
    </div>
  )
}

export function AgentFaqSection({
  resource,
}: {
  resource: AgentContentResource
}) {
  const { content, isLoading, error, refetch } = resource
  const faqs = content?.faqs ?? []

  return (
    <Section id="faq" surface="card">
      <SectionHeading
        title="คำถามที่พบบ่อย"
        lead="คำถามที่ผู้สมัครถามเข้ามามากที่สุดก่อนตัดสินใจ"
      />

      <Reveal className="mt-10 max-w-3xl">
        <AsyncBoundary
          isLoading={isLoading}
          error={error}
          onRetry={refetch}
          isEmpty={faqs.length === 0}
          skeleton={<FaqSkeleton />}
        >
          <Accordion
            type="single"
            collapsible
            className="border-t border-border"
          >
            {faqs.map((faq) => (
              <AccordionItem key={faq.q} value={faq.q}>
                <AccordionTrigger className="gap-6 py-5 text-left font-display text-base leading-[1.6] font-semibold hover:no-underline md:text-lg">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="max-w-[62ch] pb-5 text-base leading-[1.75] text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AsyncBoundary>
      </Reveal>
    </Section>
  )
}
