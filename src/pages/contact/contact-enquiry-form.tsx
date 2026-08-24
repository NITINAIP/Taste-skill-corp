import { Warning } from "@/components/icons"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import { contactTopics } from "@/pages/contact/contact-enquiry.schema"
import type { ContactEnquiry } from "@/pages/contact/use-contact-enquiry"

/**
 * The enquiry form: idle, submitting and error live here, success is a separate
 * panel that replaces this one.
 *
 * Every field carries its label above the control, helper text in markup, and
 * error text below, wired through the Form primitives so aria-describedby and
 * aria-invalid stay correct without being written by hand at each field.
 */
export function ContactEnquiryForm({ enquiry }: { enquiry: ContactEnquiry }) {
  const { form } = enquiry

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={enquiry.submit}
        aria-busy={enquiry.isSubmitting}
        className="mt-10 space-y-7"
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ชื่อและนามสกุล</FormLabel>
              <FormControl>
                <Input autoComplete="name" {...field} />
              </FormControl>
              <FormDescription>
                กรอกชื่อตามบัตรประชาชน เพื่อให้ตรงกับชื่อผู้เอาประกันภัยในกรมธรรม์
              </FormDescription>
              <FormMessage role="alert" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>เบอร์โทรศัพท์มือถือ</FormLabel>
              <FormControl>
                <Input inputMode="tel" autoComplete="tel" {...field} />
              </FormControl>
              <FormDescription>
                ตัวเลข 10 หลัก จะเว้นวรรคหรือใส่ขีดคั่นก็ได้ เช่น 081 234 5678
              </FormDescription>
              <FormMessage role="alert" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>อีเมล</FormLabel>
              <FormControl>
                <Input inputMode="email" autoComplete="email" {...field} />
              </FormControl>
              <FormDescription>
                ใช้ส่งใบเสนอราคาและเอกสารประกอบให้คุณเก็บไว้
              </FormDescription>
              <FormMessage role="alert" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>เรื่องที่ต้องการติดต่อ</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="h-11 w-full text-base">
                    <SelectValue placeholder="เลือกเรื่องที่ต้องการติดต่อ" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {contactTopics.map((topic) => (
                    <SelectItem key={topic.value} value={topic.value}>
                      {topic.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                เลือกให้ตรงที่สุด เรื่องจะถูกส่งต่อให้ทีมที่รับผิดชอบโดยตรง
              </FormDescription>
              <FormMessage role="alert" />
            </FormItem>
          )}
        />

        {enquiry.needsProductLine ? (
          <FormField
            control={form.control}
            name="productSlug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ประเภทประกันที่ต้องการให้เสนอราคา</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? ""}
                  disabled={enquiry.isLoadingProducts}
                >
                  <FormControl>
                    <SelectTrigger className="h-11 w-full text-base">
                      <SelectValue placeholder="เลือกประเภทประกันภัย" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {enquiry.productOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  หากยังไม่แน่ใจว่าต้องใช้แบบไหน เลือกให้เจ้าหน้าที่ช่วยแนะนำได้
                </FormDescription>
                <FormMessage role="alert" />
              </FormItem>
            )}
          />
        ) : null}

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>รายละเอียด</FormLabel>
              <FormControl>
                <Textarea rows={6} {...field} />
              </FormControl>
              <FormDescription>
                บอกสิ่งที่อยากให้เตรียมไว้ก่อนติดต่อกลับ เช่น รุ่นและปีของรถ ทุนประกันที่ต้องการ หรือวันที่เกิดเหตุ
              </FormDescription>
              <FormMessage role="alert" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start gap-4 rounded-lg border border-border bg-card p-5">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-1 size-5"
                />
              </FormControl>
              <div className="grid gap-2">
                <FormLabel className="items-start leading-[1.7]">
                  ยินยอมให้บริษัทเก็บและใช้ชื่อ เบอร์โทรศัพท์ อีเมล และรายละเอียดที่กรอกไว้ เพื่อติดต่อกลับและจัดทำข้อเสนอประกันภัยตามเรื่องที่แจ้ง
                </FormLabel>
                <FormDescription>
                  ข้อมูลนี้ไม่ถูกส่งต่อให้บุคคลภายนอกเพื่อการตลาด และขอแก้ไขหรือลบได้ทุกเมื่อผ่านช่องทางติดต่อด้านบน
                </FormDescription>
                <FormMessage role="alert" />
              </div>
            </FormItem>
          )}
        />

        {enquiry.error ? (
          <Alert variant="destructive">
            <Warning />
            <AlertTitle>ส่งเรื่องไม่สำเร็จ</AlertTitle>
            <AlertDescription>
              <p>{enquiry.error.message}</p>
              <p>ข้อมูลที่กรอกไว้ยังอยู่ครบ กดส่งอีกครั้งได้ทันที</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                disabled={enquiry.isSubmitting}
                onClick={enquiry.submit}
              >
                ลองส่งอีกครั้ง
              </Button>
            </AlertDescription>
          </Alert>
        ) : null}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button
            type="submit"
            variant="brand"
            size="lg"
            disabled={enquiry.isSubmitting}
            className="w-full sm:w-auto sm:min-w-60"
          >
            {enquiry.isSubmitting ? "กำลังส่งข้อมูล" : "ส่งเรื่องถึงเรา"}
          </Button>
          <p className="text-sm leading-[1.7] text-muted-foreground">
            เจ้าหน้าที่ติดต่อกลับตามช่องทางที่ให้ไว้ในเวลาทำการ
          </p>
        </div>

        <p role="status" aria-live="polite" className="sr-only">
          {enquiry.isSubmitting ? "กำลังส่งข้อมูล กรุณารอสักครู่" : ""}
        </p>
      </form>
    </Form>
  )
}
