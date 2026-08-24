/**
 * Every path the app can call, in one place.
 *
 * Reads resolve against `VITE_API_BASE_URL` when it is set, and otherwise
 * against the static JSON that `npm run api` generates into /public/api from
 * src/content. That keeps the data layer identical in both cases: the UI never
 * knows whether it is talking to a CMS or to a build artefact.
 */
export const endpoints = {
  company: "/company.json",
  branches: "/branches.json",
  partners: "/partners.json",
  products: "/products.json",
  motorTiers: "/motor-tiers.json",
  home: "/home.json",
  about: "/about.json",
  agent: "/agent.json",
  testimonials: "/testimonials.json",

  agentApplications: "/leads/agent-applications",
  contactEnquiries: "/leads/contact-enquiries",
} as const
