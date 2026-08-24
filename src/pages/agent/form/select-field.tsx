import { useFormContext } from "react-hook-form"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import type { AgentApplicationForm } from "../agent-application.schema"
import type { ChoiceOption, TextFieldName } from "./field-types"

/**
 * ตัวเลือกแบบรายการยาว ป้ายกำกับยังอยู่เหนือช่องเหมือนฟิลด์อื่น
 * ข้อความในตัวเลือกที่ยังไม่ได้เลือกเป็นคำสั่งให้เลือก ไม่ใช่ป้ายกำกับซ่อนรูป
 */
export function SelectField({
  name,
  label,
  description,
  options,
  prompt,
}: {
  name: TextFieldName
  label: string
  description: string
  options: ChoiceOption[]
  prompt: string
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
          <Select value={field.value} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger
                className="h-11 w-full bg-card text-base"
                onBlur={field.onBlur}
              >
                <SelectValue placeholder={prompt} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="max-h-72">
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="py-2.5 text-base"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage role="alert" />
        </FormItem>
      )}
    />
  )
}
