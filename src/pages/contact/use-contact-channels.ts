import { useMemo } from "react"

import { useCompany } from "@/hooks/use-company"

/**
 * The three direct channels, resolved from company data.
 *
 * Turning a LINE id into a link and a phone number into a dialable href is
 * derivation, so it happens here and the header section renders a finished list.
 */
export type ContactChannelId = "phone" | "email" | "line"

export type ContactChannel = {
  id: ContactChannelId
  label: string
  value: string
  href: string
  helper: string
  isExternal: boolean
}

export function useContactChannels() {
  const { company, isLoading, error, refetch } = useCompany()

  const channels = useMemo<ContactChannel[]>(() => {
    if (!company) return []

    return [
      {
        id: "phone",
        label: "โทรศัพท์",
        value: company.phone,
        href: company.phoneHref,
        helper: company.officeHours,
        isExternal: false,
      },
      {
        id: "email",
        label: "อีเมล",
        value: company.email,
        href: `mailto:${company.email}`,
        helper: "สำหรับส่งเอกสารและรายละเอียดกรมธรรม์",
        isExternal: false,
      },
      {
        id: "line",
        label: "LINE",
        value: company.lineId,
        href: `https://line.me/R/ti/p/${company.lineId}`,
        helper: "สอบถามและส่งภาพความเสียหายผ่านแชท",
        isExternal: true,
      },
    ]
  }, [company])

  return { channels, isLoading, error, refetch }
}
