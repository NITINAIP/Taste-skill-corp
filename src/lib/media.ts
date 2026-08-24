import { mediaSlots } from "@/content/media"

/**
 * Two-mode media layer. See DESIGN-BRIEF section 10.
 *
 * This environment has no image-generation tool and blocks picsum.photos,
 * images.unsplash.com and cdn.simpleicons.org at the network egress proxy, so a
 * remote-only setup would render a page full of broken images. Building the site
 * text-only is not an option either: the taste-skill calls a text-only marketing
 * page incomplete work, and div-based fake imagery is banned outright.
 *
 * So: `VITE_IMAGE_MODE=remote` gives seeded picsum photography on any
 * machine with internet, and the default `placeholder` mode serves the committed
 * SVG compositions in /public/media that `scripts/generate-placeholders.mjs`
 * generates from the same seeds. Neither mode pretends to be something it is not.
 *
 * Real photography still to shoot is listed in docs/ASSETS-NEEDED.md.
 */
export const imageMode: "remote" | "placeholder" =
  import.meta.env.VITE_IMAGE_MODE === "remote" ? "remote" : "placeholder"

const BASE_WIDTH = 1600

export type Photo = {
  src: string
  width: number
  height: number
  /** Art direction for the real photograph that replaces this slot. */
  brief: string
}

export function photo(id: string): Photo {
  const slot = mediaSlots[id]

  if (!slot) {
    throw new Error(
      `Unknown media slot "${id}". Declare it in src/content/media.ts before using it.`
    )
  }

  const [ratioW, ratioH] = slot.ratio
  const width = BASE_WIDTH
  const height = Math.round((BASE_WIDTH * ratioH) / ratioW)

  return {
    src:
      imageMode === "remote"
        ? `https://picsum.photos/seed/${slot.seed}/${width}/${height}`
        : `${import.meta.env.BASE_URL}media/${slot.seed}.svg`,
    width,
    height,
    brief: slot.brief,
  }
}
