import { Link } from "react-router-dom"

import { AppImage } from "@/components/common/app-image"
import { AsyncBoundary } from "@/components/common/async-boundary"
import { Reveal } from "@/components/common/reveal"
import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useHomeContent } from "@/hooks/use-site-content"
import { quoteCta, recruitCta } from "@/lib/nav"

/**
 * Layout family: asymmetric split, copy on seven columns, photograph on five.
 *
 * The hero holds three text elements and nothing else: headline, subtext, CTA
 * pair. The header is 72px, so the band is sized against the remaining viewport
 * rather than against `h-screen`, which collapses on mobile Safari.
 */
function HeroCopySkeleton() {
  return (
    <div role="status" aria-live="polite">
      <span className="sr-only">กำลังโหลดข้อมูล</span>
      <Skeleton className="h-11 w-full max-w-[32rem]" />
      <Skeleton className="mt-4 h-11 w-4/5 max-w-[26rem]" />
      <Skeleton className="mt-8 h-5 w-full max-w-[30rem]" />
      <Skeleton className="mt-3 h-5 w-3/5 max-w-[20rem]" />
      <div className="mt-9 flex flex-wrap gap-3">
        <Skeleton className="h-12 w-44 rounded-md" />
        <Skeleton className="h-12 w-44 rounded-md" />
      </div>
    </div>
  )
}

export function HeroSection() {
  const { content, isLoading, error, refetch } = useHomeContent()

  return (
    <Section
      className="flex min-h-[calc(100dvh-72px)] items-center"
      containerClassName="w-full"
    >
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <AsyncBoundary
            isLoading={isLoading}
            error={error}
            onRetry={refetch}
            skeleton={<HeroCopySkeleton />}
          >
            <Reveal>
              <SectionHeading
                as="h1"
                title={content?.hero.headline}
                lead={content?.hero.sub}
              />
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild variant="brand" size="lg">
                  <Link to={quoteCta.href}>{quoteCta.label}</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to={recruitCta.href}>{recruitCta.label}</Link>
                </Button>
              </div>
            </Reveal>
          </AsyncBoundary>
        </div>

        <div className="lg:col-span-5">
          <AppImage
            slot="home-hero"
            priority
            alt="เจ้าหน้าที่นายหน้ากางตารางเปรียบเทียบความคุ้มครองให้ลูกค้าดูบนโต๊ะประชุมริมหน้าต่าง"
            className="aspect-[16/10] w-full shadow-card lg:aspect-[4/5]"
          />
        </div>
      </div>
    </Section>
  )
}
