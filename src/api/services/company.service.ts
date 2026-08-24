import { apiClient } from "@/api/client"
import { endpoints } from "@/api/endpoints"
import type { Branch, Company } from "@/content/company"
import type { Partner } from "@/content/partners"

export async function fetchCompany(signal?: AbortSignal): Promise<Company> {
  const { data } = await apiClient.get<Company>(endpoints.company, { signal })
  return data
}

export async function fetchBranches(signal?: AbortSignal): Promise<Branch[]> {
  const { data } = await apiClient.get<Branch[]>(endpoints.branches, { signal })
  return data
}

export async function fetchPartners(signal?: AbortSignal): Promise<Partner[]> {
  const { data } = await apiClient.get<Partner[]>(endpoints.partners, { signal })
  return data
}
