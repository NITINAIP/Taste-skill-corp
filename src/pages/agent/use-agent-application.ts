import { useCallback } from "react"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  submitAgentApplication,
  type AgentApplicationPayload,
  type LeadReceipt,
} from "@/api/services/lead.service"
import { useMutation } from "@/hooks/use-mutation"

import {
  agentApplicationSchema,
  defaultAgentApplicationValues,
  normaliseDigits,
  type AgentApplicationForm,
} from "./agent-application.schema"

/**
 * สถานะฟอร์มและการส่งใบสมัคร ไม่มี JSX ในไฟล์นี้
 *
 * การส่งข้อมูลไปตามสาย component -> hook -> service -> apiClient เท่านั้น
 * คอมโพเนนต์ไม่เรียก axios เอง ไม่มีทางส่งที่สอง และเมื่อส่งไม่สำเร็จ
 * ค่าที่ผู้สมัครกรอกไว้จะยังอยู่ครบ เพราะไม่มีจุดไหนสั่ง reset ฟอร์ม
 */
function toPayload(values: AgentApplicationForm): AgentApplicationPayload {
  const hasLicence = values.hasLicence === "yes"

  return {
    fullName: values.fullName.trim(),
    nationalId: normaliseDigits(values.nationalId),
    birthDate: values.birthDate,
    phone: normaliseDigits(values.phone),
    email: values.email.trim(),
    province: values.province,
    education: values.education,
    occupation: values.occupation.trim(),
    hasLicence,
    licenceNumber: hasLicence
      ? normaliseDigits(values.licenceNumber)
      : undefined,
    experience: values.experience,
    contactPreference: values.contactPreference,
    note: values.note.trim() === "" ? undefined : values.note.trim(),
    consent: values.consent,
  }
}

/**
 * เวลาที่ระบบรับเรื่อง แปลงเป็นรูปแบบวันที่ไทยครั้งเดียวที่นี่
 * คอมโพเนนต์แสดงผลอย่างเดียว ไม่คำนวณหรือจัดรูปแบบข้อมูลเอง
 */
export function formatReceivedAt(isoDate: string): string {
  const parsed = new Date(isoDate)
  if (Number.isNaN(parsed.getTime())) return isoDate

  return new Intl.DateTimeFormat("th-TH", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(parsed)
}

export function useAgentApplication() {
  const form = useForm<AgentApplicationForm>({
    resolver: zodResolver(agentApplicationSchema),
    defaultValues: defaultAgentApplicationValues,
    mode: "onTouched",
  })

  const mutation = useMutation<AgentApplicationForm, LeadReceipt>(
    (values, signal) => submitAgentApplication(toPayload(values), signal)
  )

  const { control, handleSubmit, getValues } = form

  // ใช้ useWatch แทน form.watch เพื่อให้คอมโพเนนต์ที่อ่านค่านี้รีเรนเดอร์เฉพาะเมื่อค่านี้เปลี่ยน
  const licenceAnswer = useWatch({ control, name: "hasLicence" })

  const submit = handleSubmit((values) => {
    void mutation.submit(values)
  })

  // ส่งซ้ำด้วยค่าชุดเดิมที่ยังอยู่ในฟอร์ม ผู้สมัครไม่ต้องกรอกใหม่
  const retry = useCallback(() => {
    void mutation.submit(getValues())
  }, [getValues, mutation])

  return {
    form,
    submit,
    retry,
    requiresLicenceNumber: licenceAnswer === "yes",
    isSubmitting: mutation.isSubmitting,
    isSubmitted: mutation.status === "success",
    error: mutation.error,
    receipt: mutation.data,
  }
}

export type AgentApplication = ReturnType<typeof useAgentApplication>
