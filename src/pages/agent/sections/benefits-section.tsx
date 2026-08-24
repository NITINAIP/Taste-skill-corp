import type { ComponentType } from "react"

import { AsyncBoundary } from "@/components/common/async-boundary"
import { Reveal } from "@/components/common/reveal"
import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"
import {
  CalendarCheck,
  Coins,
  GraduationCap,
  Handshake,
  ShieldCheck,
} from "@/components/icons"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

import type { AgentContentResource } from "../agent-content"

type IconComponent = ComponentType<{ className?: string }>

const icons: Record<string, IconComponent> = {
  Coins,
  GraduationCap,
  Handshake,
  CalendarCheck,
}

/** ผังเบนโตะสี่ช่อง กว้าง 3 กับ 2 แล้วสลับเป็น 2 กับ 3 ไม่มีช่องว่างเหลือ */
const spans = [
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-3",
]

type Tone = "navy" | "plain" | "soft"

const tones: Tone[] = ["navy", "plain", "plain", "soft"]

const toneSurface: Record<Tone, string> = {
  navy: "bg-primary dark:bg-card border-transparent dark:border-border",
  plain: "bg-card border-border",
  soft: "bg-brand-soft border-transparent dark:border-border",
}

const toneChip: Record<Tone, string> = {
  navy: "bg-white/12 text-brand",
  plain: "bg-brand-soft text-primary",
  soft: "bg-card text-primary",
}

const toneTitle: Record<Tone, string> = {
  navy: "text-white",
  plain: "text-foreground",
  soft: "text-foreground",
}

const toneDetail: Record<Tone, string> = {
  navy: "text-white/75",
  plain: "text-muted-foreground",
  soft: "text-muted-foreground",
}

const toneFigure: Record<Tone, string> = {
  navy: "text-brand",
  plain: "text-primary",
  soft: "text-primary",
}

function BenefitCell({
  tone,
  span,
  icon,
  title,
  detail,
  figure,
}: {
  tone: Tone
  span: string
  icon: string
  title: string
  detail: string
  figure?: string
}) {
  const Icon = icons[icon] ?? ShieldCheck

  return (
    <article
      className={cn(
        "flex flex-col rounded-lg border p-6 md:p-8",
        toneSurface[tone],
        span
      )}
    >
      <span
        className={cn(
          "flex size-11 items-center justify-center rounded-full",
          toneChip[tone]
        )}
      >
        <Icon className="size-6" />
      </span>

      {figure ? (
        <p
          className={cn(
            "mt-6 font-display text-3xl leading-[1.25] font-semibold",
            toneFigure[tone]
          )}
        >
          {figure}
        </p>
      ) : null}

      <h3
        className={cn(
          "mt-4 font-display text-xl leading-[1.4] font-semibold",
          toneTitle[tone]
        )}
      >
        {title}
      </h3>
      <p className={cn("mt-3 text-base leading-[1.75]", toneDetail[tone])}>
        {detail}
      </p>
    </article>
  )
}

function BenefitsSkeleton() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
    >
      <span className="sr-only">กำลังโหลดข้อมูล</span>
      {spans.map((span, index) => (
        <Skeleton key={index} className={cn("h-64 rounded-lg", span)} />
      ))}
    </div>
  )
}

export function BenefitsSection({
  resource,
}: {
  resource: AgentContentResource
}) {
  const { content, isLoading, error, refetch } = resource

  return (
    <Section id="benefits">
      <SectionHeading
        eyebrow="การสนับสนุนจากบริษัท"
        title="สิ่งที่คุณจะได้รับ"
        lead="งานนายหน้าที่ทำคนเดียวทั้งหมดคืองานเอกสาร เราจึงแบ่งงานหลังบ้านออกไปให้ทีมทำแทน"
      />

      <Reveal className="mt-10">
        <AsyncBoundary
          isLoading={isLoading}
          error={error}
          onRetry={refetch}
          isEmpty={content?.benefits.length === 0}
          skeleton={<BenefitsSkeleton />}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {content?.benefits.map((benefit, index) => (
              <BenefitCell
                key={benefit.title}
                tone={tones[index % tones.length]}
                span={spans[index % spans.length]}
                icon={benefit.icon}
                title={benefit.title}
                detail={benefit.detail}
                figure={benefit.figure}
              />
            ))}
          </div>
        </AsyncBoundary>
      </Reveal>
    </Section>
  )
}
