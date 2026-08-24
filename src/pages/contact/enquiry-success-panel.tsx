import { SealCheck } from "@/components/icons"
import { Button } from "@/components/ui/button"
import type { LeadReceipt } from "@/api/services/lead.service"

/**
 * The success state, which replaces the form rather than sitting above it.
 *
 * The reference number is the one thing worth keeping, so it is set at reading
 * size and is selectable text. The three lines under it say what happens next in
 * order, because "ส่งสำเร็จ" on its own does not tell anyone whether to wait for
 * a call or to go and find their policy documents.
 */
export function EnquirySuccessPanel({
  receipt,
  onStartNew,
}: {
  receipt: LeadReceipt
  onStartNew: () => void
}) {
  return (
    <div className="mt-10 rounded-lg border border-border bg-card p-7 md:p-9">
      <SealCheck className="size-8 text-primary" aria-hidden />
      <h3 className="mt-4 font-display text-xl leading-[1.4] font-semibold md:text-2xl">
        ได้รับเรื่องของคุณแล้ว
      </h3>
      <p className="mt-3 text-base leading-[1.75] text-muted-foreground">
        เลขที่อ้างอิงของเรื่องนี้คือ{" "}
        <span className="font-medium text-foreground">{receipt.reference}</span>{" "}
        เก็บไว้ใช้อ้างอิงเมื่อติดต่อกลับมาทางโทรศัพท์หรือ LINE
      </p>
      <ol className="mt-6 divide-y divide-border border-t border-border">
        <NextStep title="เจ้าหน้าที่ตรวจสอบข้อมูลที่กรอกไว้" detail="หากรายละเอียดยังไม่พอสำหรับออกข้อเสนอ เราจะโทรกลับไปถามเพิ่มก่อน" />
        <NextStep title="เทียบเงื่อนไขจากบริษัทประกันคู่สัญญา" detail="ข้อเสนอที่ส่งกลับจะแสดงวงเงินความคุ้มครองและข้อยกเว้นที่ต่างกัน ไม่ใช่เฉพาะตัวเลขเบี้ย" />
        <NextStep title="ติดต่อกลับตามช่องทางที่คุณให้ไว้" detail="ภายในเวลาทำการ จันทร์ถึงศุกร์ และเช้าวันเสาร์" />
      </ol>
      <Button variant="outline" className="mt-7" onClick={onStartNew}>
        ส่งเรื่องใหม่อีกเรื่อง
      </Button>
    </div>
  )
}

function NextStep({ title, detail }: { title: string; detail: string }) {
  return (
    <li className="py-4">
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-sm leading-[1.75] text-muted-foreground">
        {detail}
      </p>
    </li>
  )
}
