import { useCallback } from "react"
import { useForm } from "react-hook-form"
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

export function useAgentApplication() {
  const form = useForm<AgentApplicationForm>({
    resolver: zodResolver(agentApplicationSchema),
    defaultValues: defaultAgentApplicationValues,
    mode: "onTouched",
  })

  const mutation = useMutation<AgentApplicationForm, LeadReceipt>(
    (values, signal) => submitAgentApplication(toPayload(values), signal)
  )

  const { handleSubmit, getValues } = form

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
    requiresLicenceNumber: form.watch("hasLicence") === "yes",
    isSubmitting: mutation.isSubmitting,
    isSubmitted: mutation.status === "success",
    error: mutation.error,
    receipt: mutation.data,
  }
}
