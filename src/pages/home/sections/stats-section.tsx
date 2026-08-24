import { AsyncBoundary } from "@/components/common/async-boundary"
import { Reveal } from "@/components/common/reveal"
import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"
import { Skeleton } from "@/components/ui/skeleton"
import type { Stat } from "@/content/home"
import { useHomeContent } from "@/hooks/use-site-content"

/**
 * Layout family: full bleed navy stat band.
 *
 * Four figures on hairlines. No cards, no progress tracks, no icons in circles.
 * The band keeps the page accent, so it is a surface inside one theme rather
 * than a theme flip.
 */
const bandClassName = "mt-12 grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8"

const figureClassName =
  "lg:border-l lg:border-white/15 lg:pl-8 lg:first:border-l-0 lg:first:pl-0"

function StatFigure({ stat }: { stat: Stat }) {
  return (
    <div className={figureClassName}>
      <p className="font-display text-4xl leading-[1.25] font-semibold text-brand md:text-[2.75rem]">
        {stat.figure}
      </p>
      <p className="mt-3 font-display text-base leading-[1.4] font-medium text-white">
        {stat.label}
      </p>
      <p className="mt-2 text-sm leading-[1.75] text-white/70">{stat.detail}</p>
    </div>
  )
}

function StatBandSkeleton() {
  return (
    <div className={bandClassName} role="status" aria-live="polite">
      <span className="sr-only">กำลังโหลดข้อมูล</span>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className={figureClassName}>
          <Skeleton className="h-11 w-24 bg-white/15" />
          <Skeleton className="mt-4 h-5 w-40 bg-white/15" />
          <Skeleton className="mt-3 h-4 w-full bg-white/10" />
          <Skeleton className="mt-2 h-4 w-4/5 bg-white/10" />
        </div>
      ))}
    </div>
  )
}

export function StatsSection() {
  const { content, isLoading, error, refetch } = useHomeContent()
  const stats = content?.stats ?? []

  return (
    <Section id="why" surface="primary">
      <Reveal>
        <SectionHeading
          onDark
          title="ทำไมต้องอารักษ์"
          lead="เราไม่ใช่บริษัทประกัน แต่เป็นนายหน้าที่ถือใบอนุญาต และทำงานอยู่ฝั่งผู้เอาประกันภัยตั้งแต่วันเลือกกรมธรรม์จนถึงวันรับค่าสินไหม"
        />
      </Reveal>

      <AsyncBoundary
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
        skeleton={<StatBandSkeleton />}
      >
        <Reveal className={bandClassName} delay={0.05}>
          {stats.map((stat) => (
            <StatFigure key={stat.label} stat={stat} />
          ))}
        </Reveal>
      </AsyncBoundary>
    </Section>
  )
}
