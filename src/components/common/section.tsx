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
