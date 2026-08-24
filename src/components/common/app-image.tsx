import { cn } from "@/lib/utils"
import { photo } from "@/lib/media"

/**
 * The only image element in the app.
 *
 * It resolves a declared media slot rather than taking a URL, so no page can
 * hard-code an image path, every image carries its intrinsic size (which is what
 * keeps CLS at zero), and swapping placeholders for real photography is a change
 * in src/content/media.ts alone.
 */
export function AppImage({
  slot,
  alt,
  className,
  imageClassName,
  priority = false,
  rounded = true,
}: {
  slot: string
  alt: string
  className?: string
  imageClassName?: string
  /** Set on the one image above the fold. Everything else stays lazy. */
  priority?: boolean
  rounded?: boolean
}) {
  const source = photo(slot)

  return (
    <figure className={cn("relative overflow-hidden", rounded && "rounded-lg", className)}>
      <img
        src={source.src}
        alt={alt}
        width={source.width}
        height={source.height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        className={cn("h-full w-full object-cover", imageClassName)}
      />
    </figure>
  )
}
