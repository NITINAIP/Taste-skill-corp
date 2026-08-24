import { AppImage } from "@/components/common/app-image"
import { Reveal } from "@/components/common/reveal"
import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"

/**
 * Section 1: page header.
 *
 * Headline and standfirst are stacked, never split left and right, and the
 * office photograph sits under them as one wide band so the page opens on
 * something real rather than on type alone.
 */
export function AboutHeaderSection() {
  return (
    <Section>
      <Reveal>
        <SectionHeading
          as="h1"
          title="ประวัติบริษัท"
          lead="อารักษ์ เป็นนายหน้าประกันวินาศภัยที่ได้รับใบอนุญาตจากสำนักงาน คปภ. ตั้งแต่ปี 2549 หน้านี้รวมเส้นทางของบริษัท วิสัยทัศน์ ข้อมูลใบอนุญาต และทีมที่รับผิดชอบงานแต่ละด้าน"
        />
      </Reveal>
      <Reveal delay={0.08}>
        <AppImage
          slot="about-office"
          alt="บรรยากาศการทำงานที่สำนักงานใหญ่ ดินแดง ในเวลาทำการปกติ"
          className="mt-12 aspect-[16/9]"
          priority
        />
      </Reveal>
    </Section>
  )
}
