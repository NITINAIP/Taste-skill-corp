import { AsyncBoundary } from "@/components/common/async-boundary"
import { Reveal } from "@/components/common/reveal"
import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"
import { Skeleton } from "@/components/ui/skeleton"

import type { AgentContentResource } from "../agent-content"

/**
 * รางลำดับแนวตั้ง ตัวเลขอยู่บนราง คำกริยาคือชื่อขั้นตอน
 * ไม่มีคำว่า "ขั้นตอนที่ 1" เพราะรายการเรียงลำดับบอกลำดับอยู่แล้ว
 */
function StepsSkeleton() {
  return (
    <div role="status" aria-live="polite" className="grid gap-8">
      <span className="sr-only">กำลังโหลดข้อมูล</span>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-[2.5rem_1fr] gap-4 md:grid-cols-[3rem_1fr] md:gap-6"
        >
          <Skeleton className="size-10 rounded-full" />
          <div className="grid gap-3">
            <Skeleton className="h-7 w-56" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function ApplyStepsSection({
  resource,
}: {
  resource: AgentContentResource
}) {
  const { content, isLoading, error, refetch } = resource
  const steps = content?.steps ?? []

  return (
    <Section id="steps">
      <SectionHeading
        title="ขั้นตอนการสมัคร"
        lead="ตั้งแต่กรอกใบสมัครจนถึงปิดกรมธรรม์ฉบับแรก โดยทั่วไปใช้เวลาประมาณ 6 ถึง 10 สัปดาห์ ตามรอบอบรมและรอบสอบของสำนักงาน คปภ."
      />

      <Reveal className="mt-10">
        <AsyncBoundary
          isLoading={isLoading}
          error={error}
          onRetry={refetch}
          isEmpty={steps.length === 0}
          skeleton={<StepsSkeleton />}
        >
          <ol className="grid max-w-3xl gap-8">
            {steps.map((step, index) => (
              <li
                key={step.label}
                className="grid grid-cols-[2.5rem_1fr] gap-4 md:grid-cols-[3rem_1fr] md:gap-6"
              >
                <div className="relative flex justify-center">
                  <span
                    aria-hidden="true"
                    className="z-10 flex size-10 items-center justify-center rounded-full bg-primary font-display text-base leading-[1.4] font-semibold text-primary-foreground"
                  >
                    {index + 1}
                  </span>
                  {index < steps.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="absolute top-12 -bottom-8 left-1/2 w-px -translate-x-1/2 bg-border"
                    />
                  ) : null}
                </div>
                <div>
                  <h3 className="font-display text-xl leading-[1.4] font-semibold md:text-2xl">
                    {step.label}
                  </h3>
                  <p className="mt-3 max-w-[62ch] text-base leading-[1.75] text-muted-foreground">
                    {step.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </AsyncBoundary>
      </Reveal>
    </Section>
  )
}
