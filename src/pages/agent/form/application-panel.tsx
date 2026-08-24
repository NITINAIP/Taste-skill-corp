import type { AgentApplication } from "../use-agent-application"
import { ApplicationForm } from "./application-form"
import { ApplicationReceipt } from "./application-receipt"

/**
 * คอลัมน์เดียวกว้างพอสำหรับการอ่านทีละบรรทัด และเป็นจุดที่สลับระหว่าง
 * ฟอร์มกับแผงยืนยันการรับใบสมัคร เมื่อส่งสำเร็จ ฟอร์มจะถูกแทนที่ทั้งใบ
 */
export function ApplicationPanel({
  application,
}: {
  application: AgentApplication
}) {
  const { isSubmitted, receipt } = application

  return (
    <div className="mx-auto mt-10 max-w-2xl md:mt-12">
      {isSubmitted && receipt ? (
        <ApplicationReceipt
          reference={receipt.reference}
          receivedAt={receipt.receivedAt}
        />
      ) : (
        <ApplicationForm application={application} />
      )}
    </div>
  )
}
