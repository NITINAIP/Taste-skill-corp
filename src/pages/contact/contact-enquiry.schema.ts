import { z } from "zod"

/**
 * Validation for the contact enquiry, in one place.
 *
 * Every rule the form enforces lives here, including the conditional one: when
 * the reader is asking for a quote, the product line becomes required. The form
 * component only renders what this file decides, so the rule cannot drift
 * between the markup and the payload.
 */
export type TopicOption = { value: string; label: string }

export const QUOTE_TOPIC = "quote"

/** Always offered, so a reader who has not decided yet is never stuck. */
export const UNSPECIFIED_PRODUCT = "unspecified"
export const UNSPECIFIED_PRODUCT_LABEL = "ยังไม่ระบุ ให้เจ้าหน้าที่ช่วยแนะนำ"

export const contactTopics: TopicOption[] = [
  { value: QUOTE_TOPIC, label: "ขอใบเสนอราคา" },
  { value: "coverage", label: "สอบถามความคุ้มครอง" },
  { value: "claim", label: "แจ้งเคลม" },
  { value: "other", label: "เรื่องอื่น" },
]

const topicValues = contactTopics.map((topic) => topic.value)

/**
 * Readers type mobile numbers as 08-1234-5678 or 081 234 5678 as often as they
 * type ten bare digits. Spaces and dashes are stripped before the number is
 * checked, so a valid number is never rejected for its punctuation.
 */
export function normalisePhone(value: string): string {
  return value.replace(/[\s-]/g, "")
}

const thaiMobilePattern = /^0[689]\d{8}$/

export const contactEnquirySchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "กรุณากรอกชื่อและนามสกุล")
      .max(80, "ชื่อยาวเกินไป กรุณากรอกไม่เกิน 80 ตัวอักษร"),
    phone: z
      .string()
      .trim()
      .min(1, "กรุณากรอกเบอร์โทรศัพท์มือถือ")
      .refine(
        (value) => thaiMobilePattern.test(normalisePhone(value)),
        "เบอร์มือถือต้องเป็นตัวเลข 10 หลัก ขึ้นต้นด้วย 06 08 หรือ 09"
      ),
    email: z
      .string()
      .trim()
      .min(1, "กรุณากรอกอีเมล")
      .email("รูปแบบอีเมลไม่ถูกต้อง ตัวอย่างเช่น name@example.com"),
    topic: z
      .string()
      .refine(
        (value) => topicValues.includes(value),
        "กรุณาเลือกเรื่องที่ต้องการติดต่อ"
      ),
    productSlug: z.string().optional(),
    message: z
      .string()
      .trim()
      .min(10, "กรุณาอธิบายเรื่องที่ต้องการติดต่ออย่างน้อย 10 ตัวอักษร")
      .max(1000, "ข้อความยาวเกินไป กรุณาสรุปให้ไม่เกิน 1,000 ตัวอักษร"),
    consent: z.boolean(),
  })
  .superRefine((values, ctx) => {
    if (values.topic === QUOTE_TOPIC && !values.productSlug) {
      ctx.addIssue({
        code: "custom",
        path: ["productSlug"],
        message: "กรุณาเลือกประเภทประกันที่ต้องการให้เสนอราคา",
      })
    }

    if (!values.consent) {
      ctx.addIssue({
        code: "custom",
        path: ["consent"],
        message: "กรุณายอมรับการเก็บและใช้ข้อมูลก่อนส่งแบบฟอร์ม",
      })
    }
  })

export type ContactEnquiryValues = z.infer<typeof contactEnquirySchema>

export const emptyContactEnquiry: ContactEnquiryValues = {
  fullName: "",
  phone: "",
  email: "",
  topic: "",
  productSlug: "",
  message: "",
  consent: false,
}
