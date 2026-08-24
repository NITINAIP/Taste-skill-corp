import { Link } from "react-router-dom"

import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"
import { Button } from "@/components/ui/button"
import { usePageMeta } from "@/hooks/use-page-meta"
import { routePaths } from "@/routes"

export default function NotFoundPage() {
  usePageMeta({
    title: "ไม่พบหน้าที่ต้องการ",
    description: "หน้าที่คุณเปิดอาจถูกย้ายหรือไม่มีอยู่แล้ว",
  })

  return (
    <Section>
      <SectionHeading
        as="h1"
        title="ไม่พบหน้าที่คุณกำลังมองหา"
        lead="หน้านี้อาจถูกย้าย เปลี่ยนชื่อ หรือไม่มีอยู่แล้ว ลองกลับไปที่หน้าแรกหรือดูประกันภัยทั้งหมด"
      />
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild variant="brand">
          <Link to={routePaths.home}>กลับหน้าแรก</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to={routePaths.products}>ดูประกันภัยทั้งหมด</Link>
        </Button>
      </div>
    </Section>
  )
}
