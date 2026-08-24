import { AsyncBoundary, LinesSkeleton } from "@/components/common/async-boundary"
import { Reveal } from "@/components/common/reveal"
import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"
import { Check, Minus } from "@/components/icons"
import type { MotorCoverageRow, MotorTier } from "@/content/motor-tiers"
import { useMotorTiers } from "@/hooks/use-product-detail"

/**
 * Tier comparison for voluntary motor cover.
 *
 * A real matrix table with a scope on every header. Never progress bars with a
 * filled track and never a score out of five: the answer per cell is covered,
 * not covered, or the wording from the policy, and a bar cannot say that.
 *
 * Ten rows, so the dividers are deliberately sparse: zebra banding carries the
 * row rhythm and the only hairlines in the table are the two that separate the
 * header and the footer from the body. The first column is sticky and the
 * scroll container is the table wrapper, so the matrix survives 360px without
 * the page itself scrolling sideways.
 */
function TierCell({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <>
        <Check className="mx-auto size-5 text-primary" aria-hidden="true" />
        <span className="sr-only">คุ้มครอง</span>
      </>
    )
  }

  if (value === false) {
    return (
      <>
        <Minus className="mx-auto size-5 text-muted-foreground" aria-hidden="true" />
        <span className="sr-only">ไม่คุ้มครอง</span>
      </>
    )
  }

  return (
    <span className="block text-xs leading-[1.7] text-muted-foreground">
      {value}
    </span>
  )
}

function TierMatrix({
  tiers,
  matrix,
}: {
  tiers: MotorTier[]
  matrix: MotorCoverageRow[]
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full min-w-[54rem] text-left text-sm">
        <caption className="sr-only">
          ตารางเปรียบเทียบความคุ้มครองประกันภัยรถยนต์ภาคสมัครใจ ชั้น 1 ชั้น 2+ ชั้น 3+ และชั้น 3
          แถวคือรายการความคุ้มครอง คอลัมน์คือชั้นความคุ้มครอง
        </caption>
        <thead className="border-b border-border">
          <tr className="bg-card">
            <th
              scope="col"
              className="sticky left-0 z-10 min-w-[16rem] bg-inherit px-5 py-4 font-medium"
            >
              ความคุ้มครอง
            </th>
            {tiers.map((tier) => (
              <th
                key={tier.key}
                scope="col"
                className="min-w-[9rem] px-4 py-4 text-center font-display text-base font-semibold"
              >
                {tier.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&>tr:nth-child(even)]:bg-muted [&>tr:nth-child(odd)]:bg-card">
          {matrix.map((row) => (
            <tr key={row.label}>
              <th
                scope="row"
                className="sticky left-0 z-10 bg-inherit px-5 py-4 text-left align-top font-medium"
              >
                {row.label}
                {row.note ? (
                  <span className="mt-1 block max-w-[26rem] text-xs leading-[1.7] font-normal text-muted-foreground">
                    {row.note}
                  </span>
                ) : null}
              </th>
              {tiers.map((tier) => (
                <td key={tier.key} className="px-4 py-4 text-center align-top">
                  <TierCell value={row.values[tier.key]} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot className="border-t border-border">
          <tr className="bg-card">
            <th
              scope="row"
              className="sticky left-0 z-10 bg-inherit px-5 py-4 text-left align-top font-medium"
            >
              เหมาะกับ
            </th>
            {tiers.map((tier) => (
              <td
                key={tier.key}
                className="px-4 py-4 align-top text-xs leading-[1.7] text-muted-foreground"
              >
                {tier.suitedFor}
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export function MotorTierComparison() {
  const { tiers, matrix, isLoading, error, refetch } = useMotorTiers(true)

  return (
    <Section>
      <Reveal>
        <SectionHeading
          eyebrow="ประกันภัยรถยนต์ภาคสมัครใจ"
          title="เปรียบเทียบความคุ้มครองแต่ละชั้น"
          lead="ชั้นความคุ้มครองต่างกันที่ความเสียหายต่อรถของผู้เอาประกันภัย ส่วนความรับผิดต่อบุคคลภายนอกมีอยู่ในทุกชั้น"
        />
      </Reveal>

      <div className="mt-8">
        <AsyncBoundary
          isLoading={isLoading}
          error={error}
          onRetry={refetch}
          skeleton={<LinesSkeleton lines={8} />}
        >
          <TierMatrix tiers={tiers} matrix={matrix} />
        </AsyncBoundary>
      </div>
    </Section>
  )
}
