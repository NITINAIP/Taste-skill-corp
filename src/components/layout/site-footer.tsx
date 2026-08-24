import { Link } from "react-router-dom"

import { Envelope, MapPin, Phone } from "@/components/icons"
import { Logo } from "@/components/common/logo"
import { company } from "@/content/company"
import { footerNav } from "@/lib/nav"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container-page py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_repeat(3,minmax(0,0.95fr))] lg:gap-8">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-[1.75] text-muted-foreground">
              {company.tagline} เราเปรียบเทียบเงื่อนไขจากบริษัทประกันคู่สัญญา
              แล้วดูแลคุณต่อจนจบเคลม
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <a
                  href={`tel:${company.phoneHref}`}
                  className="text-foreground underline-offset-4 hover:underline"
                >
                  {company.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Envelope className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <a
                  href={`mailto:${company.email}`}
                  className="text-foreground underline-offset-4 hover:underline"
                >
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span className="text-muted-foreground">{company.address}</span>
              </li>
            </ul>
          </div>

          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="font-display text-sm leading-[1.4] font-semibold text-foreground">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.href + item.label}>
                    <Link
                      to={item.href}
                      className="text-sm leading-[1.75] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <dl className="grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex gap-2">
              <dt className="text-muted-foreground">ใบอนุญาตนายหน้าประกันวินาศภัย</dt>
              <dd className="font-medium text-foreground">{company.licence.number}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted-foreground">กำกับดูแลโดย</dt>
              <dd className="font-medium text-foreground">{company.licence.regulator}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted-foreground">ทุนจดทะเบียน</dt>
              <dd className="font-medium text-foreground">{company.registeredCapital}</dd>
            </div>
          </dl>

          <p className="mt-6 max-w-3xl text-xs leading-[1.8] text-muted-foreground">
            อารักษ์ โบรกเกอร์ ทำหน้าที่เป็นนายหน้าประกันวินาศภัย
            ไม่ใช่บริษัทผู้รับประกันภัย ความคุ้มครอง เงื่อนไข และข้อยกเว้นทั้งหมด
            เป็นไปตามกรมธรรม์ของบริษัทผู้รับประกันภัยที่ท่านเลือก
            เบี้ยประกันที่แสดงบนเว็บไซต์เป็นราคาเริ่มต้นเพื่อการเปรียบเทียบเท่านั้น
            ราคาจริงขึ้นอยู่กับการพิจารณารับประกันภัย
          </p>

          <p className="mt-6 text-xs text-muted-foreground">
            สงวนลิขสิทธิ์ {company.legalName}
          </p>
        </div>
      </div>
    </footer>
  )
}
