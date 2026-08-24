import { useFormContext } from "react-hook-form"

import { Checkbox } from "@/components/ui/checkbox"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import type { AgentApplicationForm } from "../agent-application.schema"

/**
 * ความยินยอมตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562
 *
 * ข้อความบนป้ายกำกับบอกตรงไปตรงมาว่าเก็บข้อมูลไปทำอะไร ไม่ใช่ลิงก์ที่ต้องเปิดอ่านต่อ
 * และสคีมาบังคับว่าต้องติ๊กก่อนจึงจะส่งได้ ไม่ใช่การตรวจในคอมโพเนนต์
 */
export function ConsentField() {
  const { control } = useFormContext<AgentApplicationForm>()

  return (
    <FormField
      control={control}
      name="consent"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-start gap-3 rounded-lg border border-border bg-background p-4 md:p-5">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                onBlur={field.onBlur}
                className="mt-1 size-5"
              />
            </FormControl>
            <div className="grid gap-2">
              <FormLabel className="items-start text-base leading-[1.75] font-normal text-foreground">
                ยินยอมให้ อารักษ์ อินชัวรันส์ โบรกเกอร์ เก็บและใช้ข้อมูลในใบสมัครนี้
                เพื่อติดต่อกลับ ตรวจคุณสมบัติผู้สมัคร และดำเนินการอบรมกับยื่นขอใบอนุญาตนายหน้าให้
              </FormLabel>
              <FormDescription className="leading-[1.75]">
                ข้อมูลนี้ใช้กับการรับสมัครนายหน้าเท่านั้น ไม่ส่งต่อให้บุคคลภายนอกเพื่อการตลาด
                และคุณขอดู ขอแก้ไข หรือขอให้ลบข้อมูลได้ทุกเมื่อผ่านหน้าติดต่อเรา
              </FormDescription>
            </div>
          </div>
          <FormMessage role="alert" />
        </FormItem>
      )}
    />
  )
}
