import type { AgentApplicationForm } from "../agent-application.schema"

/**
 * ชื่อฟิลด์ที่เก็บค่าเป็นข้อความ แยกออกจาก consent ที่เป็น boolean
 * ทำให้คอมโพเนนต์ฟิลด์รับเฉพาะชื่อที่ชนิดข้อมูลตรงกันจริง โดยไม่ต้อง cast
 */
export type TextFieldName = {
  [Key in keyof AgentApplicationForm]: AgentApplicationForm[Key] extends string
    ? Key
    : never
}[keyof AgentApplicationForm]

export type ChoiceOption = { value: string; label: string }

export function toOptions(values: readonly string[]): ChoiceOption[] {
  return values.map((value) => ({ value, label: value }))
}
