import { AsyncBoundary, LinesSkeleton } from "@/components/common/async-boundary"
import { Reveal } from "@/components/common/reveal"
import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"

import type { AboutResource } from "@/pages/about/about-resource"

/**
 * Section 5: licence and regulator, as a definition list on hairlines.
 *
 * This is the section an SME buyer scrolls to before deciding we are real, so the
 * licence number, the regulator, the registration number and the registered
 * capital are set at reading size on the page. Nothing here is grey small print,
 * and the id is the footer's link target.
 */
export function GovernanceSection({ about }: { about: AboutResource }) {
  const records = about.content?.governance ?? []

  return (
    <Section id="governance">
      <Reveal>
        <SectionHeading
          eyebrow="ข้อมูลตามกฎหมาย"
          title="ใบอนุญาตและการกำกับดูแล"
          lead="บริษัทประกอบธุรกิจนายหน้าประกันวินาศภัยภายใต้ใบอนุญาตที่ออกโดยสำนักงาน คปภ. รายละเอียดการจดทะเบียนด้านล่างใช้ตรวจสอบสถานะใบอนุญาตกับสำนักงาน คปภ. ได้ก่อนทำสัญญา"
        />
      </Reveal>
      <div className="mt-10">
        <AsyncBoundary
          isLoading={about.isLoading}
          error={about.error}
          onRetry={about.refetch}
          skeleton={<LinesSkeleton lines={6} />}
        >
          <dl className="grid gap-x-14 sm:grid-cols-2">
          {records.map((record) => (
            <div key={record.label} className="border-t border-border py-6">
              <dt className="text-sm leading-[1.7] text-muted-foreground">
                {record.label}
              </dt>
              <dd className="mt-2 font-display text-lg leading-[1.45] font-semibold text-foreground md:text-xl">
                {record.value}
              </dd>
            </div>
          ))}
          </dl>
        </AsyncBoundary>
      </div>
    </Section>
  )
}
