import { useFormContext } from "react-hook-form"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import type { AgentApplicationForm } from "../agent-application.schema"
import type { ChoiceOption, TextFieldName } from "./field-types"

/**
 * ตัวเลือกไม่กี่ตัวที่ควรเห็นพร้อมกันทั้งหมด
 *
 * ใช้ fieldset กับ legend ซ้อนอีกชั้นแทนป้ายกำกับเดี่ยว เพราะป้ายกำกับหนึ่งอัน
 * ผูกกับช่องกรอกได้ช่องเดียว แต่กลุ่มตัวเลือกต้องการชื่อกลุ่มที่ครอบทุกตัวเลือก
 * แต่ละแถวสูงอย่างน้อย 44 พิกเซล และกดที่ข้อความก็เลือกได้
 */
export function RadioField({
  name,
  label,
  description,
  options,
}: {
  name: TextFieldName
  label: string
  description: string
  options: ChoiceOption[]
}) {
  const { control } = useFormContext<AgentApplicationForm>()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <fieldset className="grid gap-2">
            <legend className="text-sm leading-[1.7] font-medium text-foreground">
              {label}
            </legend>
            <FormDescription className="leading-[1.7]">
              {description}
            </FormDescription>
            <FormControl>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="gap-2 sm:grid-cols-2"
              >
                {options.map((option) => (
                  <div
                    key={option.value}
                    className="flex min-h-11 items-center gap-3 rounded-md border border-input bg-card px-4 py-2.5 has-[button[data-state=checked]]:border-primary"
                  >
                    <RadioGroupItem
                      id={`${name}-${option.value}`}
                      value={option.value}
                    />
                    <Label
                      htmlFor={`${name}-${option.value}`}
                      className="w-full cursor-pointer py-1 text-base leading-[1.7] font-normal"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
          </fieldset>
          <FormMessage role="alert" />
        </FormItem>
      )}
    />
  )
}
