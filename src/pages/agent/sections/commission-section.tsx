import { AsyncBoundary } from "@/components/common/async-boundary"
import { Reveal } from "@/components/common/reveal"
import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"
import { InfoIcon } from "@/components/icons"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import type { AgentContentResource } from "../agent-content"

function CommissionSkeleton() {
  return (
    <div role="status" aria-live="polite" className="space-y-3">
      <span className="sr-only">กำลังโหลดข้อมูล</span>
      <Skeleton className="h-10 w-full" />
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="h-14 w-full" />
      ))}
    </div>
  )
}

/**
 * ตารางจริง มีคำบรรยายตารางและหัวคอลัมน์ที่ประกาศขอบเขต
 * ไม่ใช่แถบคะแนนหรือการ์ดที่ทำท่าเป็นตาราง เพราะตัวเลขชุดนี้คือเนื้อหาของส่วนนี้
 */
export function CommissionSection({
  resource,
}: {
  resource: AgentContentResource
}) {
  const { content, isLoading, error, refetch } = resource

  return (
    <Section id="commissions" surface="card">
      <SectionHeading
        title="รายได้และค่าคอมมิชชั่น"
        lead="ค่าตอบแทนคิดเป็นเปอร์เซ็นต์ของเบี้ยประกันภัยที่บริษัทผู้รับประกันภัยเรียกเก็บได้จริง ต่างกันตามประเภทกรมธรรม์และบริษัทคู่สัญญา"
      />

      <Reveal className="mt-10">
        <AsyncBoundary
          isLoading={isLoading}
          error={error}
          onRetry={refetch}
          isEmpty={content?.commissions.length === 0}
          emptyTitle="ยังไม่มีตารางอัตราค่าคอมมิชชั่น"
          emptyDetail="ติดต่อทีมรับสมัครเพื่อขออัตราตามสัญญาที่มีผลบังคับในปัจจุบัน"
          skeleton={<CommissionSkeleton />}
        >
          <div className="overflow-hidden rounded-lg border border-border">
            <Table>
              <TableCaption className="mt-0 px-5 py-4 text-left leading-[1.75]">
                ช่วงอัตราค่าคอมมิชชั่นแยกตามประเภทกรมธรรม์
              </TableCaption>
              <TableHeader>
                <TableRow className="bg-muted/60">
                  <TableHead scope="col" className="h-12 px-5 text-base">
                    ประเภทกรมธรรม์
                  </TableHead>
                  <TableHead scope="col" className="h-12 px-5 text-base">
                    ช่วงอัตรา
                  </TableHead>
                  <TableHead
                    scope="col"
                    className="h-12 px-5 text-base whitespace-normal"
                  >
                    เงื่อนไขที่ทำให้อัตราต่างกัน
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {content?.commissions.map((row) => (
                  <TableRow key={row.line}>
                    <TableHead
                      scope="row"
                      className="h-auto max-w-64 px-5 py-4 align-top text-base leading-[1.75] whitespace-normal"
                    >
                      {row.line}
                    </TableHead>
                    <TableCell className="px-5 py-4 align-top font-display text-lg leading-[1.4] font-semibold text-primary">
                      {row.rate}
                    </TableCell>
                    <TableCell className="max-w-md px-5 py-4 align-top text-sm leading-[1.75] whitespace-normal text-muted-foreground">
                      {row.note}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <p className="mt-5 flex items-start gap-3 rounded-lg border border-border bg-background p-4 text-sm leading-[1.75] text-muted-foreground">
            <InfoIcon className="mt-0.5 size-5 shrink-0 text-primary" />
            <span>
              อัตราในตารางนี้เป็นช่วงอัตราสำหรับใช้ประกอบการตัดสินใจเท่านั้น
              อัตราที่ใช้จริงเป็นไปตามสัญญาระหว่างบริษัทนายหน้ากับบริษัทประกันวินาศภัยแต่ละแห่ง
              และเปลี่ยนแปลงได้ตามรอบปีสัญญา รายได้ขึ้นอยู่กับจำนวนกรมธรรม์ที่ปิดได้จริง
              บริษัทไม่รับรองรายได้ขั้นต่ำให้ผู้สมัคร
            </span>
          </p>
        </AsyncBoundary>
      </Reveal>
    </Section>
  )
}
