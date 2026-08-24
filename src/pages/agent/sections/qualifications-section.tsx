import type { ComponentType } from "react"

import { AsyncBoundary } from "@/components/common/async-boundary"
import { Reveal } from "@/components/common/reveal"
import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"
import { Check, Plus } from "@/components/icons"
import { Skeleton } from "@/components/ui/skeleton"

import type { AgentContentResource } from "../agent-content"

type IconComponent = ComponentType<{ className?: string }>

/**
 * สองคอลัมน์ ข้อบังคับอยู่ซ้าย ข้อได้เปรียบอยู่ขวา
 * ใช้เส้นคั่นบนหัวคอลัมน์เส้นเดียว ไม่ตีเส้นใต้ทุกบรรทัด
 */
function ChecklistColumn({
  title,
  caption,
  items,
  icon: Icon,
}: {
  title: string
  caption: string
  items: string[]
  icon: IconComponent
}) {
  return (
    <div className="border-t border-border pt-6">
      <h3 className="font-display text-xl leading-[1.4] font-semibold">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-[1.75] text-muted-foreground">
        {caption}
      </p>
      <ul className="mt-6 grid gap-4">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-card text-primary">
              <Icon className="size-4" />
            </span>
            <span className="text-base leading-[1.75]">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function QualificationsSkeleton() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="grid gap-10 md:grid-cols-2 md:gap-12"
    >
      <span className="sr-only">กำลังโหลดข้อมูล</span>
      {Array.from({ length: 2 }).map((_, column) => (
        <div key={column} className="border-t border-border pt-6">
          <Skeleton className="h-7 w-48" />
          <div className="mt-6 grid gap-4">
            {Array.from({ length: 5 }).map((_, row) => (
              <Skeleton key={row} className="h-6 w-full" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export function QualificationsSection({
  resource,
}: {
  resource: AgentContentResource
}) {
  const { content, isLoading, error, refetch } = resource

  return (
    <Section id="qualifications" surface="muted">
      <SectionHeading
        title="คุณสมบัติผู้สมัคร"
        lead="เกณฑ์ฝั่งซ้ายเป็นข้อกำหนดตามกฎหมายและหลักเกณฑ์ของสำนักงาน คปภ. ส่วนฝั่งขวาไม่ใช่ข้อบังคับ"
      />

      <Reveal className="mt-10">
        <AsyncBoundary
          isLoading={isLoading}
          error={error}
          onRetry={refetch}
          skeleton={<QualificationsSkeleton />}
        >
          {content ? (
            <div className="grid gap-10 md:grid-cols-2 md:gap-12">
              <ChecklistColumn
                title="คุณสมบัติที่ต้องมี"
                caption="ครบทุกข้อจึงจะยื่นขอรับใบอนุญาตได้"
                items={content.qualifications.required}
                icon={Check}
              />
              <ChecklistColumn
                title="มีแล้วจะช่วยให้เริ่มงานได้เร็วขึ้น"
                caption="ไม่มีก็สมัครได้ ทีมงานจะช่วยเสริมให้ระหว่างอบรม"
                items={content.qualifications.plus}
                icon={Plus}
              />
            </div>
          ) : null}
        </AsyncBoundary>
      </Reveal>
    </Section>
  )
}
