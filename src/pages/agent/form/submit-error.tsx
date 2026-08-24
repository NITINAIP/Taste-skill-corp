import { WarningCircle } from "@/components/icons"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

/**
 * ส่งไม่สำเร็จ ข้อความที่แสดงคือข้อความภาษาไทยจาก ApiError ไม่ใช่ข้อความจาก axios
 * ค่าที่กรอกไว้ยังอยู่ครบทุกช่อง ปุ่มนี้จึงส่งชุดเดิมซ้ำได้เลย
 */
export function SubmitError({
  message,
  onRetry,
  isSubmitting,
}: {
  message: string
  onRetry: () => void
  isSubmitting: boolean
}) {
  return (
    <Alert variant="destructive" className="border-destructive/40">
      <WarningCircle />
      <AlertTitle className="font-display text-base leading-[1.4]">
        ส่งใบสมัครไม่สำเร็จ
      </AlertTitle>
      <AlertDescription>
        <p className="leading-[1.75]">{message}</p>
        <p className="leading-[1.75]">
          ข้อมูลที่คุณกรอกไว้ยังอยู่ครบทุกช่อง กดส่งอีกครั้งได้โดยไม่ต้องกรอกใหม่
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={onRetry}
          disabled={isSubmitting}
        >
          ส่งใบสมัครอีกครั้ง
        </Button>
      </AlertDescription>
    </Alert>
  )
}
