import { useFormContext } from "react-hook-form"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import type { AgentApplicationForm } from "../agent-application.schema"
import type { TextFieldName } from "./field-types"

/**
 * ป้ายกำกับอยู่เหนือช่องกรอกเสมอ คำอธิบายอยู่ในมาร์กอัปทุกช่อง
 * และข้อความผิดพลาดอยู่ใต้ช่องกรอก ผูกกับ aria-describedby ให้แล้วโดย FormControl
 */
export function TextField({
  name,
  label,
  description,
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
  maxLength,
}: {
  name: TextFieldName
  label: string
  description: string
  type?: "text" | "email" | "tel" | "date"
  placeholder?: string
  autoComplete?: string
  inputMode?: "text" | "numeric" | "tel" | "email"
  maxLength?: number
}) {
  const { control } = useFormContext<AgentApplicationForm>()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormDescription className="leading-[1.7]">
            {description}
          </FormDescription>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              inputMode={inputMode}
              maxLength={maxLength}
              {...field}
            />
          </FormControl>
          <FormMessage role="alert" />
        </FormItem>
      )}
    />
  )
}
