import { AppImage } from "@/components/common/app-image"
import { AsyncBoundary, CardGridSkeleton } from "@/components/common/async-boundary"
import { Reveal, RevealGroup } from "@/components/common/reveal"
import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"
import type { Leader } from "@/content/about"

import type { AboutResource } from "@/pages/about/about-resource"

/**
 * Section 6: portrait grid.
 *
 * Four people, one square portrait each, no card containers. The role sits
 * directly under the name because the reader is looking for who handles claims,
 * not for a decorated tile.
 */
export function LeadershipSection({ about }: { about: AboutResource }) {
  const leaders = about.content?.leadership ?? []

  return (
    <Section surface="muted">
      <Reveal>
        <SectionHeading
          title="ทีมผู้บริหาร"
          lead="ผู้รับผิดชอบงานรับประกันภัย งานปฏิบัติการ งานสินไหมทดแทน และงานพัฒนาช่องทางนายหน้า"
        />
      </Reveal>
      <AsyncBoundary
        isLoading={about.isLoading}
        error={about.error}
        onRetry={about.refetch}
        skeleton={<CardGridSkeleton count={4} className="mt-12 lg:grid-cols-4" />}
      >
        <RevealGroup className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {leaders.map((leader) => (
            <LeaderProfile key={leader.name} leader={leader} />
          ))}
        </RevealGroup>
      </AsyncBoundary>
    </Section>
  )
}

function LeaderProfile({ leader }: { leader: Leader }) {
  return (
    <article>
      <AppImage
        slot={leader.photoSlot}
        alt={`ภาพบุคคลของ ${leader.name} ${leader.role}`}
        className="aspect-square"
      />
      <h3 className="mt-5 font-display text-lg leading-[1.4] font-semibold">
        {leader.name}
      </h3>
      <p className="mt-1 text-sm leading-[1.7] font-medium text-primary">
        {leader.role}
      </p>
      <p className="mt-3 text-sm leading-[1.75] text-muted-foreground">
        {leader.bio}
      </p>
    </article>
  )
}
