import { cn } from "@/lib/utils"

type Surface = "page" | "card" | "primary" | "muted"

const surfaceClass: Record<Surface, string> = {
  page: "bg-background text-foreground",
  card: "bg-card text-card-foreground",
  muted: "bg-muted text-foreground",
  // A navy band inside a light page is part of the system, not a theme flip.
  // It keeps the same accent and the same radius scale.
  primary: "bg-primary text-primary-foreground dark:bg-card",
}

export function Section({
  id,
  surface = "page",
  className,
  containerClassName,
  children,
}: {
  id?: string
  surface?: Surface
  className?: string
  containerClassName?: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      className={cn("py-16 md:py-24", surfaceClass[surface], className)}
    >
      <div className={cn("container-page", containerClassName)}>{children}</div>
    </section>
  )
}

/**
 * The only place an eyebrow may be rendered.
 *
 * The taste-skill caps eyebrows at ceil(sectionCount / 3) per page and the check
 * is mechanical, so funnelling every eyebrow through one prop makes the count a
 * grep instead of a judgement call:
 *
 *     grep -rn 'eyebrow=' src/components/sections/<page> | wc -l
 *
 * Headline and lead are always stacked. The split-header pattern (big headline
 * left, small paragraph floating right) is banned by section 4.7.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  onDark = false,
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string
  title: React.ReactNode
  lead?: React.ReactNode
  onDark?: boolean
  className?: string
  as?: "h1" | "h2"
}) {
  return (
    <div className={cn("max-w-[42rem]", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-sm font-medium",
            onDark ? "text-brand" : "text-primary dark:text-primary"
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Tag
        className={cn(
          Tag === "h1"
            ? "text-[2.25rem] leading-[1.25] md:text-5xl lg:text-[3.25rem]"
            : "text-3xl leading-[1.3] md:text-4xl",
          "font-display font-semibold",
          onDark ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </Tag>
      {lead ? (
        <p
          className={cn(
            "mt-4 text-base leading-[1.75]",
            onDark ? "text-white/75" : "text-muted-foreground"
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  )
}
