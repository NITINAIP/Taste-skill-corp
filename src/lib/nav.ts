/**
 * Navigation and the locked CTA hrefs.
 *
 * The taste-skill bans two CTAs with the same intent anywhere on a site, so the
 * labels live here and nowhere else. If a page needs a quote button, it imports
 * `quoteCta`. It does not write its own label.
 */
export type NavItem = { href: string; label: string }

export const mainNav: NavItem[] = [
  { href: "/", label: "หน้าแรก" },
  { href: "/products", label: "ประกันภัย" },
  { href: "/agent", label: "สมัครนายหน้า" },
  { href: "/about", label: "ประวัติบริษัท" },
  { href: "/contact", label: "ติดต่อเรา" },
]

export const quoteCta = { label: "ขอใบเสนอราคา", href: "/contact#quote" } as const
export const recruitCta = { label: "สมัครเป็นนายหน้า", href: "/agent/apply" } as const

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "ประกันภัย",
    items: [
      { href: "/products/motor", label: "ประกันภัยรถยนต์" },
      { href: "/products/compulsory-motor", label: "พ.ร.บ. รถยนต์" },
      { href: "/products/health", label: "ประกันสุขภาพ" },
      { href: "/products/home-fire", label: "ประกันอัคคีภัยบ้านอยู่อาศัย" },
      { href: "/products", label: "ประกันภัยทั้งหมด" },
    ],
  },
  {
    title: "บริษัท",
    items: [
      { href: "/about", label: "ประวัติบริษัท" },
      { href: "/about#governance", label: "ใบอนุญาตและการกำกับดูแล" },
      { href: "/agent", label: "ร่วมเป็นนายหน้ากับเรา" },
      { href: "/contact", label: "ติดต่อเรา" },
    ],
  },
  {
    title: "บริการลูกค้า",
    items: [
      { href: "/contact#quote", label: "ขอใบเสนอราคา" },
      { href: "/contact#branches", label: "สาขาและเวลาทำการ" },
      { href: "/products/motor#faq", label: "คำถามที่พบบ่อย" },
    ],
  },
]
