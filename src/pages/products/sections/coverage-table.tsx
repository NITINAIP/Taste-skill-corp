import { Reveal } from "@/components/common/reveal"
import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Product } from "@/content/products"

/**
 * Coverage table.
 *
 * A real table with a caption and column scopes, because this is tabular
 * regulated content and a definition list would lose the row-to-column
 * relationship for screen readers.
 *
 * One divider direction only: a hairline under each row, supplied by the table
 * primitive, and nothing on top. `border-t` and `border-b` on every row is the
 * banned spec-sheet look.
 */
export function CoverageTable({ product }: { product: Product }) {
  return (
    <Section surface="muted">
      <Reveal>
        <SectionHeading
          title="ความคุ้มครองตามกรมธรรม์"
          lead="ขอบเขตความคุ้มครองแต่ละข้อ วงเงินจริงเป็นไปตามตารางกรมธรรม์ของบริษัทผู้รับประกันภัยที่คุณเลือก"
        />
      </Reveal>

      <Reveal className="mt-8 overflow-hidden rounded-lg border border-border bg-card">
        <Table>
          <TableCaption className="px-5 pb-5 text-left leading-[1.75]">
            รายการความคุ้มครองของ{product.name} จำนวน {product.coverages.length} ข้อ
          </TableCaption>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead
                scope="col"
                className="h-auto w-2/5 px-5 py-4 whitespace-normal"
              >
                ความคุ้มครอง
              </TableHead>
              <TableHead scope="col" className="h-auto px-5 py-4 whitespace-normal">
                รายละเอียด
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {product.coverages.map((coverage) => (
              <TableRow key={coverage.label}>
                <TableHead
                  scope="row"
                  className="h-auto px-5 py-4 align-top text-base leading-[1.75] font-medium whitespace-normal"
                >
                  {coverage.label}
                </TableHead>
                <TableCell className="px-5 py-4 align-top text-sm leading-[1.75] whitespace-normal text-muted-foreground">
                  {coverage.detail}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Reveal>
    </Section>
  )
}
