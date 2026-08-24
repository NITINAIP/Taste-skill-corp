import { Link } from "react-router-dom"

import { Reveal } from "@/components/common/reveal"
import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"
import { Button } from "@/components/ui/button"
import { routePaths } from "@/lib/routes"

/**
 * A slug that does not resolve gets a real page with a way out, not a blank
 * screen and not a silent redirect: a reader who mistyped a URL or followed an
 * old link needs to be told what happened.
 */
export function ProductNotFound() {
  return (
    <Section>
      <Reveal className="max-w-[42rem]">
        <SectionHeading
          as="h1"
          title="ไม่พบแบบประกันภัยที่คุณเปิด"
          lead="ลิงก์อาจเปลี่ยนไปแล้ว หรือแบบประกันภัยนี้ไม่ได้อยู่ในรายการที่เรารับเป็นนายหน้าในตอนนี้"
        />
        <Button asChild variant="outline" className="mt-8">
          <Link to={routePaths.products}>กลับไปหน้าสินค้าประกันภัย</Link>
        </Button>
      </Reveal>
    </Section>
  )
}
