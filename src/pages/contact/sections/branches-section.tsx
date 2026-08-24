import { AppImage } from "@/components/common/app-image"
import { AsyncBoundary, CardGridSkeleton } from "@/components/common/async-boundary"
import { Reveal, RevealGroup } from "@/components/common/reveal"
import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"
import { Clock, MapPin, Phone } from "@/components/icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Branch } from "@/content/company"

import { useBranches } from "@/hooks/use-company"
import { toTelHref } from "@/pages/contact/tel-href"

/**
 * Section 3: branch cards.
 *
 * A card is right here because each branch is a place the reader may travel to,
 * with its own number to call, so the group has real edges. Opening hours are
 * printed in full Thai words rather than a 08.30-17.30 strip, because that is
 * how they are read out over the phone.
 */
export function BranchesSection() {
  const { branches, isLoading, error, refetch } = useBranches()

  return (
    <Section id="branches">
      <Reveal>
        <SectionHeading
          title="สาขาและเวลาทำการ"
          lead="เข้ามาคุยเรื่องกรมธรรม์หรือยื่นเอกสารเคลมได้ที่สาขาใดก็ได้ ทุกสาขาดูเรื่องเดิมต่อกันได้จากระบบเดียวกัน"
        />
      </Reveal>
      <Reveal delay={0.06}>
        <AppImage
          slot="contact-office"
          alt="อาคารสำนักงานใหญ่ของบริษัทเมื่อมองจากถนนรัชดาภิเษก"
          className="mt-10 aspect-[16/9]"
        />
      </Reveal>
      <AsyncBoundary
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
        skeleton={<CardGridSkeleton count={4} className="mt-10 lg:grid-cols-2" />}
      >
        <RevealGroup className="mt-10 grid gap-6 md:grid-cols-2">
          {branches.map((branch) => (
            <BranchCard key={branch.id} branch={branch} />
          ))}
        </RevealGroup>
      </AsyncBoundary>
    </Section>
  )
}

function BranchCard({ branch }: { branch: Branch }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{branch.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <BranchDetail icon={<MapPin className="size-5 text-primary" aria-hidden />} label="ที่อยู่">
          {branch.address}
        </BranchDetail>
        <BranchDetail icon={<Phone className="size-5 text-primary" aria-hidden />} label="โทรศัพท์">
          <a
            href={toTelHref(branch.phone)}
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            {branch.phone}
          </a>
        </BranchDetail>
        <BranchDetail icon={<Clock className="size-5 text-primary" aria-hidden />} label="เวลาทำการ">
          {branch.hours}
        </BranchDetail>
      </CardContent>
    </Card>
  )
}

function BranchDetail({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 shrink-0">{icon}</span>
      <p className="text-sm leading-[1.75] text-muted-foreground">
        <span className="sr-only">{label}: </span>
        {children}
      </p>
    </div>
  )
}
