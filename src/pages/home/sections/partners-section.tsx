import { AsyncBoundary } from "@/components/common/async-boundary"
import { PartnerMark } from "@/components/common/partner-mark"
import { RevealGroup } from "@/components/common/reveal"
import { Section } from "@/components/common/section"
import { Skeleton } from "@/components/ui/skeleton"
import { usePartners } from "@/hooks/use-company"

/**
 * Layout family: logo wall.
 *
 * Marks only. No category label under any mark, no heading above the wall
 * larger than one line of context, and no eyebrow. The marks are monograms
 * generated from invented insurer names, so they read in both themes.
 */
const wallClassName =
  "mt-7 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 lg:grid-cols-4"

function PartnerWallSkeleton() {
  return (
    <div className={wallClassName} role="status" aria-live="polite">
      <span className="sr-only">กำลังโหลดข้อมูล</span>
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="flex items-center gap-3">
          <Skeleton className="size-10 shrink-0 rounded-lg" />
          <div className="w-full">
            <Skeleton className="h-3 w-10" />
            <Skeleton className="mt-2 h-4 w-28" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function PartnersSection() {
  const { partners, isLoading, error, refetch } = usePartners()
  const isEmpty = partners.length === 0

  return (
    <Section surface="muted" className="py-12 md:py-16">
      <p className="max-w-[62ch] text-sm leading-[1.75] text-muted-foreground">
        บริษัทประกันวินาศภัยที่เราเป็นนายหน้าให้ เทียบเบี้ยและเงื่อนไขจากหลายบริษัทได้ในคราวเดียว
      </p>

      <AsyncBoundary
        isLoading={isLoading}
        error={error}
        isEmpty={isEmpty}
        onRetry={refetch}
        skeleton={<PartnerWallSkeleton />}
        emptyTitle="ยังไม่มีรายชื่อบริษัทคู่สัญญาในขณะนี้"
      >
        <RevealGroup className={wallClassName} step={0.04}>
          {partners.map((partner) => (
            <PartnerMark
              key={partner.name}
              name={partner.name}
              initials={partner.initials}
            />
          ))}
        </RevealGroup>
      </AsyncBoundary>
    </Section>
  )
}
