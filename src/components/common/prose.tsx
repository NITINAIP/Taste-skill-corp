import { cn } from "@/lib/utils"

/**
 * A paragraph block at a readable measure.
 *
 * Pages compose this instead of repeating the body type classes, which is what
 * keeps the Thai line-height rule (1.75, never leading-tight) in one place.
 */
export function Prose({
  paragraphs,
  className,
  onDark = false,
}: {
  paragraphs: string[]
  className?: string
  onDark?: boolean
}) {
  return (
    <div className={cn("max-w-[62ch] space-y-4", className)}>
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className={cn(
            "text-base leading-[1.75]",
            onDark ? "text-white/75" : "text-muted-foreground"
          )}
        >
          {paragraph}
        </p>
      ))}
    </div>
  )
}
