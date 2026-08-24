import { apiClient } from "@/api/client"
import { endpoints } from "@/api/endpoints"
import type { ClaimStep, Stat } from "@/content/home"
import type { Governance, Leader, Milestone } from "@/content/about"
import type {
  AgentBenefit,
  ApplyStep,
  CommissionRow,
} from "@/content/agent"
import type { Testimonial } from "@/content/testimonials"

export type HomeContent = {
  hero: { headline: string; sub: string }
  stats: Stat[]
  claimSteps: ClaimStep[]
  faqs: { q: string; a: string }[]
  featuredProductSlugs: string[]
}

export type AboutContent = {
  story: string[]
  timeline: Milestone[]
  vision: string
  missions: { title: string; detail: string }[]
  governance: Governance[]
  leadership: Leader[]
}

export type AgentContent = {
  hero: { headline: string; sub: string }
  benefits: AgentBenefit[]
  commissions: CommissionRow[]
  qualifications: { required: string[]; plus: string[] }
  steps: ApplyStep[]
  faqs: { q: string; a: string }[]
}

export async function fetchHomeContent(
  signal?: AbortSignal
): Promise<HomeContent> {
  const { data } = await apiClient.get<HomeContent>(endpoints.home, { signal })
  return data
}

export async function fetchAboutContent(
  signal?: AbortSignal
): Promise<AboutContent> {
  const { data } = await apiClient.get<AboutContent>(endpoints.about, { signal })
  return data
}

export async function fetchAgentContent(
  signal?: AbortSignal
): Promise<AgentContent> {
  const { data } = await apiClient.get<AgentContent>(endpoints.agent, { signal })
  return data
}

export async function fetchTestimonials(
  signal?: AbortSignal
): Promise<Testimonial[]> {
  const { data } = await apiClient.get<Testimonial[]>(endpoints.testimonials, {
    signal,
  })
  return data
}
