import { Reveal } from "@/components/common/reveal"
import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"

import { ContactEnquiryForm } from "@/pages/contact/contact-enquiry-form"
import { EnquirySuccessPanel } from "@/pages/contact/enquiry-success-panel"
import { useContactEnquiry } from "@/pages/contact/use-contact-enquiry"

/**
 * Section 2: the form, in a single column at reading width.
 *
 * The id is the target of the quote CTA used across the site, so it must exist
 * on this element. Success replaces the form; failure keeps it, with everything
 * the reader typed still in place.
 */
export function EnquirySection() {
  const enquiry = useContactEnquiry()

  return (
    <Section id="quote" surface="muted">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <SectionHeading
            title="ขอใบเสนอราคาหรือสอบถามข้อมูล"
            lead="กรอกรายละเอียดไว้ครั้งเดียว เจ้าหน้าที่จะเทียบเงื่อนไขจากบริษัทคู่สัญญาแล้วติดต่อกลับ ไม่มีค่าใช้จ่ายในการขอข้อมูล"
          />
        </Reveal>
        {enquiry.receipt ? (
          <EnquirySuccessPanel
            receipt={enquiry.receipt}
            onStartNew={enquiry.startNewEnquiry}
          />
        ) : (
          <ContactEnquiryForm enquiry={enquiry} />
        )}
      </div>
    </Section>
  )
}
