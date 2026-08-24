import { Link } from "react-router-dom"

import { SealCheck } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { routePaths } from "@/lib/routes"

import { formatReceivedAt } from "../use-agent-application"

/**
 * สถานะสำเร็จ แผงนี้แทนที่ฟอร์มทั้งใบ ไม่ใช่แถบแจ้งเตือนลอยที่หายไปเอง
 * เลขอ้างอิงคือค่าที่ได้กลับมาจากบริการจริง ผู้สมัครใช้อ้างอิงตอนทีมงานติดต่อกลับ
 */
export function ApplicationReceipt({
  reference,
  receivedAt,
}: {
  reference: string
  receivedAt: string
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-8 md:p-10">
      <span className="flex size-12 items-center justify-center rounded-full bg-brand-soft text-primary">
        <SealCheck className="size-7" />
      </span>
      <h2 className="mt-6 font-display text-2xl leading-[1.3] font-semibold">
        รับใบสมัครของคุณแล้ว
      </h2>
      <p className="mt-3 text-base leading-[1.75] text-muted-foreground">
        หัวหน้าทีมนายหน้าประจำพื้นที่จะติดต่อกลับตามช่องทางที่คุณเลือกไว้ ภายใน 2 วันทำการ
        เพื่อนัดสัมภาษณ์และอธิบายรอบอบรมที่ใกล้ที่สุด
      </p>

      <dl className="mt-8 grid gap-4 border-t border-border pt-6 sm:grid-cols-2">
        <div>
          <dt className="text-sm leading-[1.7] text-muted-foreground">
            เลขอ้างอิงใบสมัคร
          </dt>
          <dd className="mt-1 font-display text-xl leading-[1.4] font-semibold text-primary">
            {reference}
          </dd>
        </div>
        <div>
          <dt className="text-sm leading-[1.7] text-muted-foreground">
            เวลาที่ระบบรับเรื่อง
          </dt>
          <dd className="mt-1 text-base leading-[1.75]">
            {formatReceivedAt(receivedAt)}
          </dd>
        </div>
      </dl>

      <p className="mt-6 text-sm leading-[1.75] text-muted-foreground">
        เก็บเลขอ้างอิงนี้ไว้ แล้วแจ้งกับเจ้าหน้าที่เมื่อโทรกลับ จะช่วยให้ค้นใบสมัครของคุณได้เร็วขึ้น
      </p>

      <Button variant="outline" className="mt-8" asChild>
        <Link to={routePaths.home}>กลับสู่หน้าแรก</Link>
      </Button>
    </div>
  )
}
