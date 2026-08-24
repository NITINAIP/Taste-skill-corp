import { cn } from "@/lib/utils"

/**
 * The one hand-authored SVG in this codebase. The taste-skill allows a
 * hand-rolled mark when it is a single simple geometric shape, which this is:
 * a rounded square holding a shield. Everything else that looks like an icon
 * comes from Phosphor via `@/components/icons`.
 */
export function Logo({
  className,
  withWordmark = true,
  tone = "default",
}: {
  className?: string
  withWordmark?: boolean
  tone?: "default" | "onDark"
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 32 32"
        role="img"
        aria-label="อารักษ์ โบรกเกอร์"
        className="size-9 shrink-0"
      >
        <rect
          width="32"
          height="32"
          rx="9"
          className={tone === "onDark" ? "fill-white/12" : "fill-primary"}
        />
        <path
          d="M16 6.6 23.2 9.5v6.9c0 4.4-3 8-7.2 9.9-4.2-1.9-7.2-5.5-7.2-9.9V9.5Z"
          className="fill-brand"
        />
        <path
          d="m12.7 16.3 2.4 2.4 4.3-4.6"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={tone === "onDark" ? "stroke-[#0b1727]" : "stroke-[#0b1727]"}
        />
      </svg>
      {withWordmark ? (
        <span className="font-display text-lg leading-[1.25] font-semibold">
          <span className={tone === "onDark" ? "text-white" : "text-foreground"}>
            อารักษ์
          </span>{" "}
          <span
            className={
              tone === "onDark"
                ? "font-medium text-white/70"
                : "font-medium text-muted-foreground"
            }
          >
            โบรกเกอร์
          </span>
        </span>
      ) : null}
    </span>
  )
}
