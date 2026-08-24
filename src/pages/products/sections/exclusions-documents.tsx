import { Reveal } from "@/components/common/reveal"
import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FileText, WarningCircle } from "@/components/icons"
import type { Product } from "@/content/products"

/**
 * Exclusions and required documents, as two disclosure groups.
 *
 * Thirteen-odd items in one flat bulleted list is the layout the taste-skill
 * bans outright. Two groups behind a disclosure keeps the page readable while
 * leaving every regulated line in the markup for anyone who opens it.
 */
export function ExclusionsAndDocuments({ product }: { product: Product }) {
  return (
    <Section>
      <Reveal>
        <SectionHeading
          title="ข้อยกเว้นและเอกสารที่ต้องใช้"
          lead="อ่านสองส่วนนี้ก่อนตัดสินใจ เงื่อนไขที่มีผลผูกพันคือเงื่อนไขในกรมธรรม์ของบริษัทผู้รับประกันภัย"
        />
      </Reveal>

      <Reveal className="mt-8 rounded-lg border border-border bg-card px-6">
        <Accordion type="single" collapsible defaultValue="exclusions">
          <AccordionItem value="exclusions">
            <AccordionTrigger className="py-5 font-display text-lg leading-[1.4] font-semibold">
              ข้อยกเว้นที่กรมธรรม์ไม่คุ้มครอง ({product.exclusions.length} ข้อ)
            </AccordionTrigger>
            <AccordionContent>
              <ul className="grid gap-3 pb-2 md:grid-cols-2">
                {product.exclusions.map((exclusion) => (
                  <li key={exclusion} className="flex gap-3">
                    <WarningCircle
                      className="mt-0.5 size-5 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-[1.75] text-muted-foreground">
                      {exclusion}
                    </span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="documents">
            <AccordionTrigger className="py-5 font-display text-lg leading-[1.4] font-semibold">
              เอกสารที่ต้องใช้ ({product.documents.length} รายการ)
            </AccordionTrigger>
            <AccordionContent>
              <ul className="grid gap-3 pb-2 md:grid-cols-2">
                {product.documents.map((document) => (
                  <li key={document} className="flex gap-3">
                    <FileText
                      className="mt-0.5 size-5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-[1.75] text-muted-foreground">
                      {document}
                    </span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Reveal>
    </Section>
  )
}
