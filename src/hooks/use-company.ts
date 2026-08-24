import {
  fetchBranches,
  fetchCompany,
  fetchPartners,
} from "@/api/services/company.service"
import { useAsyncResource } from "@/hooks/use-async-resource"
import type { Branch, Company } from "@/content/company"
import type { Partner } from "@/content/partners"

export function useCompany() {
  const resource = useAsyncResource<Company>(
    (signal) => fetchCompany(signal),
    "company"
  )
  return { ...resource, company: resource.data }
}

export function useBranches() {
  const resource = useAsyncResource<Branch[]>(
    (signal) => fetchBranches(signal),
    "branches"
  )
  return { ...resource, branches: resource.data ?? [] }
}

export function usePartners() {
  const resource = useAsyncResource<Partner[]>(
    (signal) => fetchPartners(signal),
    "partners"
  )
  return { ...resource, partners: resource.data ?? [] }
}
