import { AsyncBoundary, LinesSkeleton } from "@/components/common/async-boundary"
import { Reveal } from "@/components/common/reveal"
import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"

import type { AboutResource } from "@/pages/about/about-resource"

/**
 * Section 4: two-cell asymmetric panel on the navy band.
 *
 * The vision takes the large cell at display size because it is one sentence the
 * reader should carry away. The three missions sit in the narrow cell on
 * hairlines, which keeps them subordinate without hiding them.
 */
export function VisionMissionSection({ about }: { about: AboutResource }) {
  const missions = about.content?.missions ?? []

  return (
    <Section surface="primary">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal>
            <SectionHeading onDark title="วิสัยทัศน์และพันธกิจ" />
          </Reveal>
          <AsyncBoundary
            isLoading={about.isLoading}
            error={about.error}
            onRetry={about.refetch}
            skeleton={<LinesSkeleton lines={3} />}
          >
            <Reveal delay={0.06}>
              <p className="mt-8 max-w-[24ch] font-display text-2xl leading-[1.35] font-semibold text-white md:text-3xl">
                {about.content?.vision}
              </p>
            </Reveal>
          </AsyncBoundary>
        </div>
        <div className="lg:col-span-5">
          <AsyncBoundary
            isLoading={about.isLoading}
            error={about.error}
            onRetry={about.refetch}
            skeleton={<LinesSkeleton lines={6} />}
          >
            <ul className="divide-y divide-white/15 border-t border-white/15">
              {missions.map((mission) => (
                <li key={mission.title} className="py-6">
                  <h3 className="font-display text-lg leading-[1.4] font-semibold text-white">
                    {mission.title}
                  </h3>
                  <p className="mt-2 text-sm leading-[1.75] text-white/75">
                    {mission.detail}
                  </p>
                </li>
              ))}
            </ul>
          </AsyncBoundary>
        </div>
      </div>
    </Section>
  )
}
