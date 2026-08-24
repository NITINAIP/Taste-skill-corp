import { Link } from "react-router-dom"

import { AppImage } from "@/components/common/app-image"
import { AsyncBoundary } from "@/components/common/async-boundary"
import { Reveal } from "@/components/common/reveal"
import { SectionHeading } from "@/components/common/section-heading"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { recruitCta } from "@/lib/nav"
import { routePaths } from "@/lib/routes"

import type { AgentContentResource } from "../agent-content"

/**
 * หน้านี้มีข้อความหลักเพียงข้อความเดียว การจัดกึ่งกลางจึงมีเหตุผลรองรับ
 * และเป็นที่เดียวของเว็บไซต์ที่ใช้การจัดกึ่งกลาง ส่วนที่เหลือจัดชิดซ้ายทั้งหมด
 */
function HeroSkeleton() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mx-auto flex max-w-2xl flex-col items-center gap-4"
    >
      <span className="sr-only">กำลังโหลดข้อมูล</span>
      <Skeleton className="h-11 w-full bg-white/20" />
      <Skeleton className="h-11 w-4/5 bg-white/20" />
      <Skeleton className="mt-2 h-5 w-3/4 bg-white/15" />
      <Skeleton className="mt-4 h-12 w-56 rounded-md bg-white/25" />
    </div>
  )
}

export function AgentHero({ resource }: { resource: AgentContentResource }) {
  const { content, isLoading, error, refetch } = resource

  return (
    <section className="relative isolate flex min-h-[calc(100dvh-72px)] items-center overflow-hidden">
      <AppImage
        slot="agent-hero"
        alt="ห้องอบรมเตรียมสอบใบอนุญาตนายหน้าประกันวินาศภัย ผู้เข้าอบรมนั่งฟังวิทยากรอธิบายหน้าห้อง"
        priority
        rounded={false}
        className="absolute inset-0 -z-20 h-full w-full"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-[#0b1727]/95 via-[#0b1727]/82 to-[#0b1727]/95"
      />

      <div className="container-page py-20 md:py-24">
        <AsyncBoundary
          isLoading={isLoading}
          error={error}
          onRetry={refetch}
          skeleton={<HeroSkeleton />}
        >
          {content ? (
            <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
              <SectionHeading
                as="h1"
                title={content.hero.headline}
                lead={content.hero.sub}
                onDark
                className="max-w-none text-center"
              />
              <Button variant="brand" size="lg" className="mt-8" asChild>
                <Link to={routePaths.agentApply}>{recruitCta.label}</Link>
              </Button>
            </Reveal>
          ) : null}
        </AsyncBoundary>
      </div>
    </section>
  )
}
