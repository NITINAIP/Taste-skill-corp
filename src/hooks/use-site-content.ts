import {
  fetchAboutContent,
  fetchAgentContent,
  fetchHomeContent,
  fetchTestimonials,
  type AboutContent,
  type AgentContent,
  type HomeContent,
} from "@/api/services/content.service"
import { useAsyncResource } from "@/hooks/use-async-resource"
import type { Testimonial } from "@/content/testimonials"

export function useHomeContent() {
  const resource = useAsyncResource<HomeContent>(
    () => fetchHomeContent(),
    "home"
  )
  return { ...resource, content: resource.data }
}

export function useAboutContent() {
  const resource = useAsyncResource<AboutContent>(
    () => fetchAboutContent(),
    "about"
  )
  return { ...resource, content: resource.data }
}

export function useAgentContent() {
  const resource = useAsyncResource<AgentContent>(
    () => fetchAgentContent(),
    "agent"
  )
  return { ...resource, content: resource.data }
}

export function useTestimonials() {
  const resource = useAsyncResource<Testimonial[]>(
    () => fetchTestimonials(),
    "testimonials"
  )
  return { ...resource, testimonials: resource.data ?? [] }
}
