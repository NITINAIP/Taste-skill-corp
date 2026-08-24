import { Link } from "react-router-dom"

import { Reveal } from "@/components/common/reveal"
import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"
import { Button } from "@/components/ui/button"
import { quoteCta } from "@/lib/nav"

/**
 * Closing band, one CTA and nothing else.
 *
 * The label comes from `quoteCta` so the site keeps exactly one label for the
 * quote intent (DESIGN-BRIEF section 8). Amber fill takes navy text through the
 * `brand` button variant; white on amber fails AA.
 */
export function QuoteCtaBand({ title, lead }: { title: string; lead: string }) {
  return (
    <Section surface="primary">
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <Reveal>
          <SectionHeading onDark title={title} lead={lead} />
        </Reveal>
        <Reveal delay={0.08}>
          <Button asChild variant="brand" size="lg">
            <Link to={quoteCta.href}>{quoteCta.label}</Link>
          </Button>
        </Reveal>
      </div>
    </Section>
  )
}
