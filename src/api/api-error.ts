/**
 * One error shape for the whole app.
 *
 * Components never see an AxiosError. They see this, with a Thai message that is
 * safe to render, so no error path leaks a stack trace or an English network
 * string into the interface.
 */
export type ApiErrorKind =
  | "network"
  | "timeout"
  | "notFound"
  | "validation"
  | "server"
  | "unknown"

export class ApiError extends Error {
  kind: ApiErrorKind
  status?: number
  details?: Record<string, string>

  constructor(
    kind: ApiErrorKind,
    message: string,
    options?: { status?: number; details?: Record<string, string>; cause?: unknown }
  ) {
    super(message, { cause: options?.cause })
    this.name = "ApiError"
    this.kind = kind
    this.status = options?.status
    this.details = options?.details
  }
}

const messages: Record<ApiErrorKind, string> = {
  network: "เชื่อมต่อไม่ได้ กรุณาตรวจสอบอินเทอร์เน็ตแล้วลองใหม่อีกครั้ง",
  timeout: "ใช้เวลานานเกินไป กรุณาลองใหม่อีกครั้ง",
  notFound: "ไม่พบข้อมูลที่ต้องการ",
  validation: "ข้อมูลที่กรอกยังไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง",
  server: "ระบบขัดข้องชั่วคราว กรุณาลองใหม่ในอีกสักครู่",
  unknown: "เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง",
}

export function messageForKind(kind: ApiErrorKind): string {
  return messages[kind]
}
