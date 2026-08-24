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
import { useHomeContent } from "@/hooks/use-site-content"

/**
 * Layout family: accordion.
 *
 * Single column at a readable measure. One panel open at a time, collapsible,
 * so the reader never has to scroll past six open answers to reach the footer.
 */
function FaqSkeleton() {
  return (
    <div className="border-t border-border" role="status" aria-live="polite">
      <span className="sr-only">กำลังโหลดข้อมูล</span>
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between gap-6 border-b border-border py-6"
        >
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="size-4 shrink-0 rounded-full" />
        </div>
      ))}
    </div>
  )
}

export function FaqSection() {
  const { content, isLoading, error, refetch } = useHomeContent()
  const faqs = content?.faqs ?? []
  const isEmpty = faqs.length === 0

  return (
    <Section id="faq">
      <Reveal>
        <SectionHeading
          title="คำถามที่พบบ่อย"
          lead="คำถามที่ทีมงานได้รับมากที่สุดจากผู้ที่กำลังเลือกกรมธรรม์ฉบับแรก"
        />
      </Reveal>

      <div className="mt-10 max-w-[52rem]">
        <AsyncBoundary
          isLoading={isLoading}
          error={error}
          isEmpty={isEmpty}
          onRetry={refetch}
          skeleton={<FaqSkeleton />}
          emptyTitle="ยังไม่มีคำถามในส่วนนี้"
        >
          <Reveal delay={0.05}>
            <Accordion type="single" collapsible className="border-t border-border">
              {faqs.map((faq) => (
                <AccordionItem key={faq.q} value={faq.q}>
                  <AccordionTrigger className="gap-6 py-5 font-display text-base leading-[1.6] font-semibold hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-[62ch] pb-6 text-base leading-[1.75] text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </AsyncBoundary>
      </div>
    </Section>
  )
}
