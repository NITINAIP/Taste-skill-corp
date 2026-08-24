import { apiClient } from "@/api/client"
import { endpoints } from "@/api/endpoints"
import { cachedGet } from "@/api/request-cache"
import type { Branch, Company } from "@/content/company"
import type { Partner } from "@/content/partners"

export function fetchCompany(): Promise<Company> {
  return cachedGet(endpoints.company, async () => {
    const { data } = await apiClient.get<Company>(endpoints.company)
    return data
  })
}

export function fetchBranches(): Promise<Branch[]> {
  return cachedGet(endpoints.branches, async () => {
    const { data } = await apiClient.get<Branch[]>(endpoints.branches)
    return data
  })
}

export function fetchPartners(): Promise<Partner[]> {
  return cachedGet(endpoints.partners, async () => {
    const { data } = await apiClient.get<Partner[]>(endpoints.partners)
    return data
  })
}
