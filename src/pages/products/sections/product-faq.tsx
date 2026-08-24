import { Reveal } from "@/components/common/reveal"
import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { Product } from "@/content/products"

/**
 * Per-product FAQ.
 *
 * Anchored at #faq because the footer links straight here. Laid out as a rail
 * heading beside the disclosure list, which keeps it a different composition
 * from the exclusions accordion above it even though both are disclosures.
 */
export function ProductFaq({ product }: { product: Product }) {
  return (
    <Section id="faq" surface="muted">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-4">
          <SectionHeading title="คำถามที่พบบ่อย" />
        </Reveal>

        <Reveal className="lg:col-span-8" delay={0.08}>
          <Accordion type="single" collapsible className="border-t border-border">
            {product.faqs.map((faq) => (
              <AccordionItem key={faq.q} value={faq.q}>
                <AccordionTrigger className="py-5 text-base leading-[1.75] font-medium">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="max-w-[62ch] pb-2 text-sm leading-[1.75] text-muted-foreground">
                    {faq.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Section>
  )
}
