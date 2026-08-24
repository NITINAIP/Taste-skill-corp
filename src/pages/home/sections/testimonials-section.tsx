import { AppImage } from "@/components/common/app-image"
import { AsyncBoundary } from "@/components/common/async-boundary"
import { Reveal, RevealGroup } from "@/components/common/reveal"
import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"
import { Skeleton } from "@/components/ui/skeleton"
import type { Testimonial } from "@/content/testimonials"
import { useTestimonials } from "@/hooks/use-site-content"

/**
 * Layout family: quote grid on hairlines.
 *
 * Three quotes, no cards, no quotation-mark ornament beyond the typographic
 * pair. Attribution is the name on its own line with the role and province
 * under it, never joined with a dash.
 */
const gridClassName = "mt-12 grid gap-10 md:grid-cols-3 md:gap-8"

function QuoteBlock({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="border-t border-border pt-6">
      <blockquote className="text-[0.9375rem] leading-[1.75] text-foreground">
        {`“${testimonial.quote}”`}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <AppImage
          slot={testimonial.photoSlot}
          alt={`ภาพของ${testimonial.name}`}
          rounded={false}
          className="size-12 shrink-0 rounded-full"
        />
        <span className="flex flex-col">
          <span className="font-display text-[0.9375rem] leading-[1.5] font-semibold">
            {testimonial.name}
          </span>
          <span className="text-sm leading-[1.6] text-muted-foreground">
            {testimonial.role} · {testimonial.province}
          </span>
        </span>
      </figcaption>
    </figure>
  )
}

function QuoteGridSkeleton() {
  return (
    <div className={gridClassName} role="status" aria-live="polite">
      <span className="sr-only">กำลังโหลดข้อมูล</span>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="border-t border-border pt-6">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="mt-3 h-4 w-full" />
          <Skeleton className="mt-3 h-4 w-3/5" />
          <div className="mt-6 flex items-center gap-3">
            <Skeleton className="size-12 shrink-0 rounded-full" />
            <div className="w-full">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="mt-2 h-3 w-40" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  const { testimonials, isLoading, error, refetch } = useTestimonials()
  const isEmpty = testimonials.length === 0

  return (
    <Section surface="muted">
      <Reveal>
        <SectionHeading
          title="เสียงจากลูกค้า"
          lead="สามเรื่องจากลูกค้าที่ติดต่อเราตอนเลือกกรมธรรม์ และตอนที่ต้องใช้กรมธรรม์นั้นจริง"
        />
      </Reveal>

      <AsyncBoundary
        isLoading={isLoading}
        error={error}
        isEmpty={isEmpty}
        onRetry={refetch}
        skeleton={<QuoteGridSkeleton />}
        emptyTitle="ยังไม่มีความเห็นจากลูกค้าในขณะนี้"
      >
        <RevealGroup className={gridClassName}>
          {testimonials.map((testimonial) => (
            <QuoteBlock key={testimonial.name} testimonial={testimonial} />
          ))}
        </RevealGroup>
      </AsyncBoundary>
    </Section>
  )
}
