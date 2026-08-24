/**
 * Emits the static JSON API that the axios layer reads.
 *
 *   node scripts/build-api.mjs   ->  public/api/*.json
 *
 * src/content stays the single source of truth for every Thai string and every
 * record. This script is the seam between that and the transport layer: point
 * VITE_API_BASE_URL at a real service and these files stop being used, without
 * a single change in src/api or src/hooks.
 *
 * Runs on plain node using its TypeScript type stripping, so there is no build
 * step and no extra dependency.
 */
import { mkdir, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, "..")
const outDir = resolve(root, "public/api")

const { company, branches } = await import("../src/content/company.ts")
const { partners } = await import("../src/content/partners.ts")
const { products } = await import("../src/content/products.ts")
const { motorTiers, motorCoverageMatrix } = await import(
  "../src/content/motor-tiers.ts"
)
const { homeHero, stats, claimSteps, homeFaqs, featuredProductSlugs } =
  await import("../src/content/home.ts")
const {
  aboutStory,
  timeline,
  vision,
  missions,
  governance,
  leadership,
} = await import("../src/content/about.ts")
const {
  agentHero,
  agentBenefits,
  commissions,
  qualifications,
  applySteps,
  agentFaqs,
} = await import("../src/content/agent.ts")
const { testimonials } = await import("../src/content/testimonials.ts")

const files = {
  "company.json": company,
  "branches.json": branches,
  "partners.json": partners,
  "products.json": products,
  "motor-tiers.json": { tiers: motorTiers, matrix: motorCoverageMatrix },
  "home.json": {
    hero: homeHero,
    stats,
    claimSteps,
    faqs: homeFaqs,
    featuredProductSlugs,
  },
  "about.json": {
    story: aboutStory,
    timeline,
    vision,
    missions,
    governance,
    leadership,
  },
  "agent.json": {
    hero: agentHero,
    benefits: agentBenefits,
    commissions,
    qualifications,
    steps: applySteps,
    faqs: agentFaqs,
  },
  "testimonials.json": testimonials,
}

await mkdir(outDir, { recursive: true })

for (const [name, payload] of Object.entries(files)) {
  await writeFile(
    resolve(outDir, name),
    `${JSON.stringify(payload, null, 2)}\n`,
    "utf8"
  )
}

console.log(`wrote ${Object.keys(files).length} json file(s) to public/api`)
