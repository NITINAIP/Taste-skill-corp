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
    () => fetchCompany(),
    "company"
  )
  return { ...resource, company: resource.data }
}

export function useBranches() {
  const resource = useAsyncResource<Branch[]>(
    () => fetchBranches(),
    "branches"
  )
  return { ...resource, branches: resource.data ?? [] }
}

export function usePartners() {
  const resource = useAsyncResource<Partner[]>(
    () => fetchPartners(),
    "partners"
  )
  return { ...resource, partners: resource.data ?? [] }
}
