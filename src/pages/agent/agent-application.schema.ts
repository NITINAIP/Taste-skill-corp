import { z } from "zod"

import { thaiProvinces } from "./thai-provinces"

/**
 * กติกาการตรวจใบสมัครนายหน้า ทั้งหมดอยู่ในไฟล์นี้ไฟล์เดียว
 *
 * คอมโพเนนต์ไม่ตัดสินว่าอะไรถูกหรือผิด มันเพียงแสดงผลของสคีมานี้
 * ทุกเงื่อนไข รวมถึงฟิลด์เลขที่ใบอนุญาตที่บังคับเฉพาะบางกรณี อยู่ในสคีมา
 * ไม่ใช่ใน JSX ตามกฎสถาปัตยกรรมข้อที่สองของโปรเจกต์
 */

/** อายุขั้นต่ำตามหลักเกณฑ์การขอรับใบอนุญาตนายหน้าประกันวินาศภัย */
export const MINIMUM_AGE = 20

/** ตัดช่องว่างและขีดกลางที่ผู้กรอกใส่มาเพื่อความอ่านง่ายออกก่อนตรวจ */
export function normaliseDigits(value: string): string {
  return value.replace(/[\s-]/g, "")
}

/**
 * ตรวจเลขประจำตัวประชาชนไทยด้วยหลักตรวจสอบจริง ไม่ใช่แค่นับความยาว
 * คูณหลักที่ 1 ถึง 12 ด้วยน้ำหนัก 13 ลงมาถึง 2 รวมผล หารเอาเศษด้วย 11
 * แล้วหลักตรวจสอบคือ (11 - เศษ) % 10
 */
export function isThaiNationalId(value: string): boolean {
  if (!/^\d{13}$/.test(value)) return false

  let sum = 0
  for (let index = 0; index < 12; index += 1) {
    sum += Number(value[index]) * (13 - index)
  }

  return (11 - (sum % 11)) % 10 === Number(value[12])
}

/** เบอร์มือถือไทย 10 หลัก ขึ้นต้นด้วย 06, 08 หรือ 09 */
export function isThaiMobile(value: string): boolean {
  return /^0[689]\d{8}$/.test(value)
}

/** อายุเต็มปีของผู้สมัคร ณ วันที่อ้างอิง ใช้ตรวจเกณฑ์อายุขั้นต่ำ */
export function ageOnDate(birthDate: string, reference: Date = new Date()): number {
  const [year, month, day] = birthDate.split("-").map(Number)
  if (!year || !month || !day) return Number.NaN

  let age = reference.getFullYear() - year
  const beforeBirthday =
    reference.getMonth() + 1 < month ||
    (reference.getMonth() + 1 === month && reference.getDate() < day)

  if (beforeBirthday) age -= 1
  return age
}

export const educationOptions: readonly string[] = [
  "มัธยมศึกษาตอนปลาย หรือเทียบเท่า",
  "ปวช. หรือ ปวส.",
  "ปริญญาตรี",
  "สูงกว่าปริญญาตรี",
]

export const experienceOptions: readonly string[] = [
  "ยังไม่เคยทำงานขายหรืองานบริการลูกค้า",
  "น้อยกว่า 1 ปี",
  "1 ถึง 3 ปี",
  "มากกว่า 3 ปี",
]

export const contactPreferenceOptions: readonly string[] = [
  "โทรศัพท์",
  "ไลน์",
  "อีเมล",
]

export const licenceOptions: readonly { value: string; label: string }[] = [
  { value: "no", label: "ยังไม่มีใบอนุญาต" },
  { value: "yes", label: "มีใบอนุญาตนายหน้าแล้ว" },
]

const chosenFrom = (options: readonly string[]) => (value: string) =>
  options.includes(value)

export const agentApplicationSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(1, "กรุณากรอกชื่อและนามสกุล")
      .min(4, "กรุณากรอกทั้งชื่อและนามสกุลตามบัตรประชาชน")
      .max(120, "ชื่อยาวเกินไป กรุณาตรวจสอบอีกครั้ง"),

    nationalId: z.string().superRefine((value, ctx) => {
      const digits = normaliseDigits(value)

      if (digits.length === 0) {
        ctx.addIssue({ code: "custom", message: "กรุณากรอกเลขประจำตัวประชาชน" })
        return
      }
      if (!/^\d+$/.test(digits)) {
        ctx.addIssue({
          code: "custom",
          message: "เลขประจำตัวประชาชนต้องเป็นตัวเลขเท่านั้น",
        })
        return
      }
      if (digits.length !== 13) {
        ctx.addIssue({
          code: "custom",
          message: "เลขประจำตัวประชาชนต้องมี 13 หลัก",
        })
        return
      }
      if (!isThaiNationalId(digits)) {
        ctx.addIssue({
          code: "custom",
          message: "เลขประจำตัวประชาชนไม่ถูกต้อง กรุณาตรวจสอบตัวเลขอีกครั้ง",
        })
      }
    }),

    birthDate: z.string().superRefine((value, ctx) => {
      if (value.length === 0) {
        ctx.addIssue({ code: "custom", message: "กรุณาเลือกวันเดือนปีเกิด" })
        return
      }
      const age = ageOnDate(value)
      if (Number.isNaN(age)) {
        ctx.addIssue({
          code: "custom",
          message: "รูปแบบวันเกิดไม่ถูกต้อง กรุณาเลือกจากปฏิทิน",
        })
        return
      }
      if (age < MINIMUM_AGE) {
        ctx.addIssue({
          code: "custom",
          message: `ผู้ขอรับใบอนุญาตนายหน้าประกันวินาศภัยต้องมีอายุ ${MINIMUM_AGE} ปีบริบูรณ์ขึ้นไป`,
        })
        return
      }
      if (age > 100) {
        ctx.addIssue({ code: "custom", message: "กรุณาตรวจสอบปีเกิดอีกครั้ง" })
      }
    }),

    phone: z.string().superRefine((value, ctx) => {
      const digits = normaliseDigits(value)

      if (digits.length === 0) {
        ctx.addIssue({ code: "custom", message: "กรุณากรอกเบอร์มือถือ" })
        return
      }
      if (!/^\d+$/.test(digits)) {
        ctx.addIssue({
          code: "custom",
          message: "เบอร์มือถือต้องเป็นตัวเลข เว้นวรรคหรือขีดกลางได้",
        })
        return
      }
      if (!isThaiMobile(digits)) {
        ctx.addIssue({
          code: "custom",
          message: "เบอร์มือถือต้องมี 10 หลัก และขึ้นต้นด้วย 06, 08 หรือ 09",
        })
      }
    }),

    email: z
      .string()
      .trim()
      .min(1, "กรุณากรอกอีเมล")
      .pipe(z.email({ error: "รูปแบบอีเมลไม่ถูกต้อง เช่น somchai@example.com" })),

    province: z
      .string()
      .min(1, "กรุณาเลือกจังหวัดที่สะดวกทำงาน")
      .refine(chosenFrom(thaiProvinces), {
        error: "กรุณาเลือกจังหวัดจากรายการ",
      }),

    education: z
      .string()
      .min(1, "กรุณาเลือกระดับการศึกษาสูงสุด")
      .refine(chosenFrom(educationOptions), {
        error: "กรุณาเลือกระดับการศึกษาจากรายการ",
      }),

    occupation: z
      .string()
      .trim()
      .min(1, "กรุณากรอกอาชีพปัจจุบัน")
      .max(120, "ข้อความยาวเกินไป กรุณาสรุปให้สั้นลง"),

    hasLicence: z
      .string()
      .min(1, "กรุณาเลือกสถานะใบอนุญาตของคุณ")
      .refine((value) => value === "yes" || value === "no", {
        error: "กรุณาเลือกสถานะใบอนุญาตของคุณ",
      }),

    licenceNumber: z.string().trim(),

    experience: z
      .string()
      .min(1, "กรุณาเลือกประสบการณ์ที่ใกล้เคียงที่สุด")
      .refine(chosenFrom(experienceOptions), {
        error: "กรุณาเลือกประสบการณ์จากรายการ",
      }),

    contactPreference: z
      .string()
      .min(1, "กรุณาเลือกช่องทางที่สะดวกให้ติดต่อกลับ")
      .refine(chosenFrom(contactPreferenceOptions), {
        error: "กรุณาเลือกช่องทางจากรายการ",
      }),

    note: z.string().trim().max(600, "ข้อความยาวเกิน 600 ตัวอักษร"),

    consent: z.boolean(),
  })
  .superRefine((values, ctx) => {
    if (values.hasLicence === "yes") {
      const licence = normaliseDigits(values.licenceNumber)

      if (licence.length === 0) {
        ctx.addIssue({
          code: "custom",
          path: ["licenceNumber"],
          message: "กรุณากรอกเลขที่ใบอนุญาตนายหน้าที่ถืออยู่",
        })
      } else if (licence.length < 6) {
        ctx.addIssue({
          code: "custom",
          path: ["licenceNumber"],
          message: "เลขที่ใบอนุญาตสั้นเกินไป กรุณาตรวจสอบจากหน้าบัตร",
        })
      }
    }

    if (values.consent !== true) {
      ctx.addIssue({
        code: "custom",
        path: ["consent"],
        message: "ต้องยินยอมให้เก็บและใช้ข้อมูลก่อนจึงจะส่งใบสมัครได้",
      })
    }
  })

export type AgentApplicationForm = z.infer<typeof agentApplicationSchema>

export const defaultAgentApplicationValues: AgentApplicationForm = {
  fullName: "",
  nationalId: "",
  birthDate: "",
  phone: "",
  email: "",
  province: "",
  education: "",
  occupation: "",
  hasLicence: "",
  licenceNumber: "",
  experience: "",
  contactPreference: "",
  note: "",
  consent: false,
}
