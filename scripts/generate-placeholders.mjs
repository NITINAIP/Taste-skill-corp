/**
 * Generates the placeholder art in /public/media from the slots declared in
 * src/content/media.ts.
 *
 *   node scripts/generate-placeholders.mjs
 *
 * Each file is a deterministic composition built from the slot's seed: navy
 * ground, one amber element, soft geometry, correct aspect ratio. They are brand
 * art, not grey boxes and not fake screenshots, and swapping in real photography
 * is a one-line change in src/content/media.ts.
 */
import { mkdir, writeFile, readFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, "..")
const outDir = resolve(root, "public/media")

/** xmur3 + mulberry32: small, deterministic, good enough for layout jitter. */
function rng(seed) {
  let h = 1779033703 ^ seed.length
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  let a = h >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const GROUNDS = ["#0f2a4a", "#132f52", "#0c2340", "#16385f"]
const VEILS = ["#1d4b80", "#26609f", "#173d69"]
const BRAND = "#e8940c"

function compose(seed, w, h) {
  const rand = rng(seed)
  const pick = (arr) => arr[Math.floor(rand() * arr.length)]
  const ground = pick(GROUNDS)
  const veil = pick(VEILS)
  const min = Math.min(w, h)

  const blobs = Array.from({ length: 3 }, () => {
    const r = min * (0.34 + rand() * 0.4)
    return {
      cx: (0.1 + rand() * 0.85) * w,
      cy: (0.05 + rand() * 0.9) * h,
      r,
      o: (0.16 + rand() * 0.2).toFixed(3),
    }
  })

  const bandY = (0.42 + rand() * 0.3) * h
  const bandH = min * (0.03 + rand() * 0.035)
  const arcR = min * (0.2 + rand() * 0.18)
  const arcX = (0.18 + rand() * 0.6) * w
  const arcY = (0.2 + rand() * 0.55) * h
  const gridGap = Math.round(min / (8 + Math.floor(rand() * 5)))

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="presentation">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${ground}"/>
      <stop offset="1" stop-color="#081524"/>
    </linearGradient>
    <pattern id="grid" width="${gridGap}" height="${gridGap}" patternUnits="userSpaceOnUse">
      <path d="M ${gridGap} 0 L 0 0 0 ${gridGap}" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="${(min * 0.06).toFixed(1)}"/>
    </filter>
    <clipPath id="frame"><rect width="${w}" height="${h}"/></clipPath>
  </defs>
  <g clip-path="url(#frame)">
    <rect width="${w}" height="${h}" fill="url(#g)"/>
    <rect width="${w}" height="${h}" fill="url(#grid)"/>
    <g filter="url(#soft)">
${blobs
  .map(
    (b) =>
      `      <circle cx="${b.cx.toFixed(0)}" cy="${b.cy.toFixed(0)}" r="${b.r.toFixed(0)}" fill="${veil}" fill-opacity="${b.o}"/>`
  )
  .join("\n")}
    </g>
    <rect x="0" y="${bandY.toFixed(0)}" width="${w}" height="${bandH.toFixed(0)}" fill="${BRAND}" fill-opacity="0.9"/>
    <circle cx="${arcX.toFixed(0)}" cy="${arcY.toFixed(0)}" r="${arcR.toFixed(0)}" fill="none" stroke="${BRAND}" stroke-opacity="0.55" stroke-width="${Math.max(2, min * 0.006).toFixed(1)}"/>
    <circle cx="${(w - arcX * 0.4).toFixed(0)}" cy="${(h - arcY * 0.5).toFixed(0)}" r="${(arcR * 0.55).toFixed(0)}" fill="none" stroke="#ffffff" stroke-opacity="0.16" stroke-width="${Math.max(2, min * 0.005).toFixed(1)}"/>
  </g>
</svg>
`
}

async function loadSlots() {
  const file = resolve(root, "src/content/media.ts")
  const source = await readFile(file, "utf8")

  // Parsed rather than imported so the script stays runnable with plain node,
  // with no TypeScript loader and no build step.
  const slots = []
  const blockRe = /\{[^{}]*?seed:\s*"([^"]+)"[^{}]*?\}/gs
  for (const match of source.matchAll(blockRe)) {
    const block = match[0]
    const ratio = block.match(/ratio:\s*\[\s*(\d+)\s*,\s*(\d+)\s*\]/)
    if (!ratio) continue
    slots.push({
      seed: match[1],
      ratio: [Number(ratio[1]), Number(ratio[2])],
    })
  }
  return slots
}

const slots = await loadSlots()

if (slots.length === 0) {
  console.error(
    "No media slots found in src/content/media.ts. Expected objects with `ratio: [w, h]` and `seed: \"...\"`."
  )
  process.exit(1)
}

await mkdir(outDir, { recursive: true })

for (const slot of slots) {
  const [rw, rh] = slot.ratio
  const w = 1600
  const h = Math.round((1600 * rh) / rw)
  await writeFile(resolve(outDir, `${slot.seed}.svg`), compose(slot.seed, w, h), "utf8")
}

console.log(`generated ${slots.length} placeholder(s) in public/media`)
