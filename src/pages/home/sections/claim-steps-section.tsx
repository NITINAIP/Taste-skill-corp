import type { ElementType } from "react"

import { AsyncBoundary } from "@/components/common/async-boundary"
import { Reveal } from "@/components/common/reveal"
import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"
import { ChatCircleText, Clock, FileText, HandCoins } from "@/components/icons"
import { Skeleton } from "@/components/ui/skeleton"
import type { ClaimStep } from "@/content/home"
import { useHomeContent } from "@/hooks/use-site-content"
import { cn } from "@/lib/utils"

/**
 * Layout family: horizontal step flow with a connector line.
 *
 * The verb from the content file is the label. Nothing here prints a step
 * number, because the reading order already carries the sequence. The connector
 * runs horizontally between markers at desktop and vertically on mobile, and it
 * is hidden on the last item through a group-last variant rather than an index
 * comparison in the markup.
 */
const stepIcons: ElementType[] = [ChatCircleText, FileText, Clock, HandCoins]

const flowClassName = "mt-12 grid gap-10 md:grid-cols-4 md:gap-8"

const itemClassName = "group relative flex gap-4 md:block"

const connectorClassName = cn(
  "absolute left-6 top-14 -bottom-10 w-px bg-border group-last:hidden",
  "md:left-14 md:-right-8 md:top-6 md:bottom-auto md:h-px md:w-auto"
)

const markerClassName =
  "relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-border bg-background text-primary"

function ClaimStepItem({ step, icon: Icon }: { step: ClaimStep; icon: ElementType }) {
  return (
    <li className={itemClassName}>
      <span aria-hidden="true" className={connectorClassName} />
      <span aria-hidden="true" className={markerClassName}>
        <Icon className="size-6" />
      </span>
      <div className="md:mt-5">
        <h3 className="font-display text-lg leading-[1.4] font-semibold">
          {step.label}
        </h3>
        <p className="mt-2 text-sm leading-[1.75] text-muted-foreground">
          {step.detail}
        </p>
      </div>
    </li>
  )
}

function ClaimFlowSkeleton() {
  return (
    <div className={flowClassName} role="status" aria-live="polite">
      <span className="sr-only">กำลังโหลดข้อมูล</span>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="flex gap-4 md:block">
          <Skeleton className="size-12 shrink-0 rounded-full" />
          <div className="w-full md:mt-5">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="mt-3 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-5/6" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function ClaimStepsSection() {
  const { content, isLoading, error, refetch } = useHomeContent()
  const steps = content?.claimSteps ?? []

  return (
    <Section id="claims">
      <Reveal>
        <SectionHeading
          title="ขั้นตอนการเคลม"
          lead="ตั้งแต่โทรแจ้งเหตุจนเงินเข้าบัญชี ทีมสินไหมของเราเป็นคนประสานกับบริษัทผู้รับประกันภัยแทนคุณ"
        />
      </Reveal>

      <AsyncBoundary
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
        skeleton={<ClaimFlowSkeleton />}
      >
        <Reveal delay={0.05}>
          <ol className={flowClassName}>
            {steps.map((step, index) => (
              <ClaimStepItem
                key={step.label}
                step={step}
                icon={stepIcons[index] ?? ChatCircleText}
              />
            ))}
          </ol>
        </Reveal>
      </AsyncBoundary>
    </Section>
  )
}
