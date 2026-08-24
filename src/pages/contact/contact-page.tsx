import { usePageMeta } from "@/hooks/use-page-meta"

import { AgentCtaSection } from "@/pages/contact/sections/agent-cta-section"
import { BranchesSection } from "@/pages/contact/sections/branches-section"
import { ContactHeaderSection } from "@/pages/contact/sections/contact-header-section"
import { EnquirySection } from "@/pages/contact/sections/enquiry-section"

export default function ContactPage() {
  usePageMeta({
    title: "ติดต่อเรา",
    description:
      "ติดต่ออารักษ์ อินชัวรันส์ โบรกเกอร์ ทางโทรศัพท์ อีเมล หรือ LINE ขอใบเสนอราคาผ่านแบบฟอร์ม พร้อมที่อยู่และเวลาทำการของทุกสาขา",
  })

  return (
    <>
      <ContactHeaderSection />
      <EnquirySection />
      <BranchesSection />
      <AgentCtaSection />
    </>
  )
}
