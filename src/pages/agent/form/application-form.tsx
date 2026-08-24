import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"

import {
  contactPreferenceOptions,
  educationOptions,
  experienceOptions,
  licenceOptions,
} from "../agent-application.schema"
import { thaiProvinces } from "../thai-provinces"
import type { AgentApplication } from "../use-agent-application"
import { ConsentField } from "./consent-field"
import { FieldSet } from "./field-set"
import { toOptions } from "./field-types"
import { RadioField } from "./radio-field"
import { SelectField } from "./select-field"
import { SubmitError } from "./submit-error"
import { TextField } from "./text-field"
import { TextareaField } from "./textarea-field"

const provinceOptions = toOptions(thaiProvinces)
const educationChoices = toOptions(educationOptions)
const experienceChoices = toOptions(experienceOptions)
const contactChoices = toOptions(contactPreferenceOptions)

/**
 * ใบสมัครจริง คอมโพเนนต์นี้ทำหน้าที่แสดงผลอย่างเดียว
 * เงื่อนไขการตรวจอยู่ในสคีมา การส่งและการแปลงข้อมูลอยู่ใน use-agent-application
 */
export function ApplicationForm({
  application,
}: {
  application: AgentApplication
}) {
  const { form, submit, retry, requiresLicenceNumber, isSubmitting, error } =
    application

  return (
    <Form {...form}>
      <form onSubmit={submit} noValidate aria-busy={isSubmitting} className="grid gap-6">
        <FieldSet
          legend="ข้อมูลผู้สมัคร"
          hint="กรอกตามบัตรประชาชน เพราะต้องใช้ชุดเดียวกันตอนยื่นขอใบอนุญาตกับสำนักงาน คปภ."
        >
          <TextField
            name="fullName"
            label="ชื่อและนามสกุล"
            description="กรอกชื่อและนามสกุลตามที่ปรากฏบนบัตรประชาชน"
            autoComplete="name"
          />
          <TextField
            name="nationalId"
            label="เลขประจำตัวประชาชน"
            description="13 หลักตามหน้าบัตร ใส่เว้นวรรคหรือขีดกลางได้ ระบบตัดออกให้เอง"
            placeholder="1 2345 67890 12 3"
            inputMode="numeric"
            maxLength={20}
          />
          <TextField
            name="birthDate"
            label="วันเดือนปีเกิด"
            description="ผู้ขอรับใบอนุญาตนายหน้าประกันวินาศภัยต้องมีอายุ 20 ปีบริบูรณ์ขึ้นไปในวันที่ยื่นสมัคร"
            type="date"
            autoComplete="bday"
          />
        </FieldSet>

        <FieldSet
          legend="ช่องทางติดต่อกลับ"
          hint="ทีมรับสมัครติดต่อกลับภายใน 2 วันทำการ ตามช่องทางที่คุณเลือกไว้"
        >
          <TextField
            name="phone"
            label="เบอร์มือถือ"
            description="10 หลัก ขึ้นต้นด้วย 06, 08 หรือ 09 ใส่เว้นวรรคหรือขีดกลางได้"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="081 234 5678"
          />
          <TextField
            name="email"
            label="อีเมล"
            description="ใช้ส่งกำหนดการอบรมและเอกสารสมัครสอบใบอนุญาต"
            type="email"
            autoComplete="email"
          />
          <SelectField
            name="province"
            label="จังหวัดที่สะดวกทำงาน"
            description="เลือกจังหวัดที่คุณเข้าพบลูกค้าได้เป็นประจำ เราจะจับคู่กับหัวหน้าทีมประจำพื้นที่นั้น"
            options={provinceOptions}
            prompt="เลือกจังหวัด"
          />
          <RadioField
            name="contactPreference"
            label="ช่องทางที่สะดวกให้ติดต่อกลับ"
            description="เราจะเริ่มจากช่องทางนี้ก่อนเสมอ"
            options={contactChoices}
          />
        </FieldSet>

        <FieldSet
          legend="การศึกษาและประสบการณ์"
          hint="ใช้จัดรอบอบรมและจับคู่สายผลิตภัณฑ์ที่เหมาะกับคุณ ไม่ได้ใช้ตัดสิทธิ์ผู้ที่ยังไม่มีประสบการณ์"
        >
          <SelectField
            name="education"
            label="ระดับการศึกษาสูงสุด"
            description="เกณฑ์ขั้นต่ำคือมัธยมศึกษาปีที่ 6 หรือเทียบเท่า"
            options={educationChoices}
            prompt="เลือกระดับการศึกษา"
          />
          <TextField
            name="occupation"
            label="อาชีพปัจจุบัน"
            description="เช่น พนักงานบริษัท เจ้าของร้าน หรือดูแลครอบครัวเต็มเวลา ระบุตามจริงได้เลย"
            autoComplete="organization-title"
          />
          <SelectField
            name="experience"
            label="ประสบการณ์งานขายหรืองานบริการลูกค้า"
            description="ยังไม่เคยทำก็สมัครได้ ข้อมูลนี้ใช้จัดกลุ่มอบรมให้เหมาะกับพื้นฐานของคุณ"
            options={experienceChoices}
            prompt="เลือกช่วงประสบการณ์"
          />
          <RadioField
            name="hasLicence"
            label="สถานะใบอนุญาตนายหน้าประกันภัย"
            description="ยังไม่มีใบอนุญาตก็สมัครได้ เราจัดอบรมและช่วยยื่นสมัครสอบให้"
            options={[...licenceOptions]}
          />
          {requiresLicenceNumber ? (
            <TextField
              name="licenceNumber"
              label="เลขที่ใบอนุญาตนายหน้า"
              description="ดูจากหน้าบัตรใบอนุญาตที่สำนักงาน คปภ. ออกให้ กรอกเฉพาะตัวเลข"
              inputMode="numeric"
              maxLength={20}
            />
          ) : null}
        </FieldSet>

        <FieldSet
          legend="ความยินยอมและข้อมูลเพิ่มเติม"
          hint="อ่านข้อความยินยอมให้ครบก่อนติ๊ก ใบสมัครจะส่งได้ต่อเมื่อคุณยินยอมแล้ว"
        >
          <TextareaField
            name="note"
            label="ข้อมูลเพิ่มเติม ไม่บังคับ"
            description="เช่น เวลาที่สะดวกให้โทรกลับ หรือกลุ่มลูกค้าที่คุณเข้าถึงได้ ไม่เกิน 600 ตัวอักษร"
          />
          <ConsentField />
        </FieldSet>

        {error ? (
          <SubmitError
            message={error.message}
            onRetry={retry}
            isSubmitting={isSubmitting}
          />
        ) : null}

        <div className="grid gap-3">
          <Button
            type="submit"
            variant="brand"
            size="lg"
            disabled={isSubmitting}
            className="w-full sm:w-72"
          >
            {isSubmitting ? "กำลังส่งใบสมัคร" : "ส่งใบสมัคร"}
          </Button>
          <p className="text-sm leading-[1.75] text-muted-foreground">
            การส่งใบสมัครยังไม่ใช่การทำสัญญา และไม่มีค่าใช้จ่ายในขั้นตอนนี้
          </p>
        </div>
      </form>
    </Form>
  )
}
