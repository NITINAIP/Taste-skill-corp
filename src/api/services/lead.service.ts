import { apiClient } from "@/api/client"
import { endpoints } from "@/api/endpoints"

/**
 * Writes. On a static host these are served by the axios mock adapter, so the
 * whole request pipeline including interceptors and error normalisation is the
 * real one. Point VITE_API_BASE_URL at a service and nothing here changes.
 */
export type LeadReceipt = {
  reference: string
  receivedAt: string
  mock?: boolean
}

export type AgentApplicationPayload = {
  fullName: string
  nationalId: string
  birthDate: string
  phone: string
  email: string
  province: string
  education: string
  occupation: string
  hasLicence: boolean
  licenceNumber?: string
  experience: string
  contactPreference: string
  note?: string
  consent: boolean
}

export type ContactEnquiryPayload = {
  fullName: string
  phone: string
  email: string
  topic: string
  productSlug?: string
  message: string
  consent: boolean
}

export async function submitAgentApplication(
  payload: AgentApplicationPayload,
  signal?: AbortSignal
): Promise<LeadReceipt> {
  const { data } = await apiClient.post<LeadReceipt>(
    endpoints.agentApplications,
    payload,
    { signal }
  )
  return data
}

export async function submitContactEnquiry(
  payload: ContactEnquiryPayload,
  signal?: AbortSignal
): Promise<LeadReceipt> {
  const { data } = await apiClient.post<LeadReceipt>(
    endpoints.contactEnquiries,
    payload,
    { signal }
  )
  return data
}
