import { AsyncBoundary, LinesSkeleton } from "@/components/common/async-boundary"
import { Reveal } from "@/components/common/reveal"
import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"
import type { Milestone } from "@/content/about"

import type { AboutResource } from "@/pages/about/about-resource"

/**
 * Section 3: vertical timeline.
 *
 * The year sits on the rail and the rail is the divider between the year column
 * and the text column, so the list reads as one continuous line of time instead
 * of a row of disconnected cards.
 */
export function TimelineSection({ about }: { about: AboutResource }) {
  const milestones = about.content?.timeline ?? []

  return (
    <Section surface="muted">
      <Reveal>
        <SectionHeading
          title="เส้นทางของบริษัท"
          lead="ช่วงเวลาที่เปลี่ยนวิธีทำงานของเรา เรียงตามปีที่เกิดขึ้นจริง"
        />
      </Reveal>
      <div className="mt-12">
        <AsyncBoundary
          isLoading={about.isLoading}
          error={about.error}
          onRetry={about.refetch}
          skeleton={<LinesSkeleton lines={8} />}
        >
          <ol>
            {milestones.map((milestone) => (
              <MilestoneRow key={milestone.year} milestone={milestone} />
            ))}
          </ol>
        </AsyncBoundary>
      </div>
    </Section>
  )
}

function MilestoneRow({ milestone }: { milestone: Milestone }) {
  return (
    <li className="group grid grid-cols-[5.25rem_1fr] gap-x-4 sm:grid-cols-[9rem_1fr] sm:gap-x-8">
      <p className="font-display text-sm font-semibold text-primary sm:text-base">
        {milestone.year}
      </p>
      <div className="border-l border-border pb-10 pl-5 group-last:pb-0 sm:pl-8">
        <h3 className="font-display text-xl leading-[1.4] font-semibold md:text-2xl">
          {milestone.title}
        </h3>
        <p className="mt-3 max-w-[62ch] text-base leading-[1.75] text-muted-foreground">
          {milestone.detail}
        </p>
      </div>
    </li>
  )
}
