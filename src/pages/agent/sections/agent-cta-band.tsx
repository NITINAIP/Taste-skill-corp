import { Link } from "react-router-dom"

import { Reveal } from "@/components/common/reveal"
import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"
import { Button } from "@/components/ui/button"
import { recruitCta } from "@/lib/nav"
import { routePaths } from "@/lib/routes"

/**
 * แถบปิดท้ายเต็มความกว้าง ปุ่มเดียว ป้ายเดียวกับปุ่มในส่วนหัวของหน้า
 * ข้อความบนปุ่มมาจาก src/lib/nav.ts ที่เดียว จึงไม่มีคำเรียกซ้ำความหมายเดิม
 */
export function AgentCtaBand() {
  return (
    <Section surface="primary">
      <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          title="พร้อมเริ่มงานนายหน้าแล้วหรือยัง"
          lead="กรอกใบสมัครประมาณ 5 นาที ไม่มีค่าสมัครและค่าอบรม ทีมรับสมัครติดต่อกลับภายใน 2 วันทำการ"
          onDark
        />
        <Button variant="brand" size="lg" className="shrink-0" asChild>
          <Link to={routePaths.agentApply}>{recruitCta.label}</Link>
        </Button>
      </Reveal>
    </Section>
  )
}
