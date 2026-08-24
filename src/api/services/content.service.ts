import { apiClient } from "@/api/client"
import { endpoints } from "@/api/endpoints"
import { cachedGet } from "@/api/request-cache"
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

export function fetchHomeContent(): Promise<HomeContent> {
  return cachedGet(endpoints.home, async () => {
    const { data } = await apiClient.get<HomeContent>(endpoints.home)
    return data
  })
}

export function fetchAboutContent(): Promise<AboutContent> {
  return cachedGet(endpoints.about, async () => {
    const { data } = await apiClient.get<AboutContent>(endpoints.about)
    return data
  })
}

export function fetchAgentContent(): Promise<AgentContent> {
  return cachedGet(endpoints.agent, async () => {
    const { data } = await apiClient.get<AgentContent>(endpoints.agent)
    return data
  })
}

export function fetchTestimonials(): Promise<Testimonial[]> {
  return cachedGet(endpoints.testimonials, async () => {
    const { data } = await apiClient.get<Testimonial[]>(endpoints.testimonials)
    return data
  })
}
