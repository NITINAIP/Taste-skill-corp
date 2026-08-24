import type { ReactNode } from "react"

/**
 * กลุ่มคำถามหนึ่งชุดในใบสมัคร ใช้ fieldset กับ legend จริง
 * ผู้ใช้โปรแกรมอ่านหน้าจอจะได้ยินชื่อกลุ่มก่อนถึงฟิลด์แรกของกลุ่มเสมอ
 */
export function FieldSet({
  legend,
  hint,
  children,
}: {
  legend: string
  hint: string
  children: ReactNode
}) {
  return (
    <fieldset className="rounded-lg border border-border bg-card p-6 md:p-8">
      <legend className="px-2 font-display text-lg leading-[1.4] font-semibold text-foreground">
        {legend}
      </legend>
      <p className="mt-1 text-sm leading-[1.75] text-muted-foreground">{hint}</p>
      <div className="mt-6 grid gap-6">{children}</div>
    </fieldset>
  )
}
