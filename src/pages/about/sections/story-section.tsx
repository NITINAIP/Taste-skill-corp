import { AppImage } from "@/components/common/app-image"
import { AsyncBoundary, LinesSkeleton } from "@/components/common/async-boundary"
import { Prose } from "@/components/common/prose"
import { Reveal } from "@/components/common/reveal"
import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"

import type { AboutResource } from "@/pages/about/about-resource"

/**
 * Section 2: two-column prose with a portrait beside it.
 *
 * The measure stays at 62ch through Prose, so the column narrows rather than the
 * line length growing when the viewport does.
 */
export function StorySection({ about }: { about: AboutResource }) {
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeading title="เรื่องราวของเรา" />
          <AsyncBoundary
            isLoading={about.isLoading}
            error={about.error}
            onRetry={about.refetch}
            skeleton={<LinesSkeleton lines={9} />}
          >
            <Prose className="mt-6" paragraphs={about.content?.story ?? []} />
          </AsyncBoundary>
        </div>
        <Reveal className="lg:col-span-5">
          <AppImage
            slot="about-story"
            alt="ผู้ร่วมก่อตั้งยืนอยู่ในห้องเก็บแฟ้มกรมธรรม์ของบริษัท"
            className="aspect-[4/5]"
          />
        </Reveal>
      </div>
    </Section>
  )
}
