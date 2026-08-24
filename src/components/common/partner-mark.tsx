import { cn } from "@/lib/utils"

/**
 * Logo lockup for a partner insurer.
 *
 * The taste-skill's rule is: if the brand name is invented, invent an SVG mark
 * for it, because a plain styled `<span>` wordmark reads as generic. Real Thai
 * insurer logos cannot be used here, so every partner is invented and gets a
 * geometric monogram derived from its Thai initials.
 *
 * Logo wall rule: marks only. No category or product label underneath.
 */
export function PartnerMark({
  name,
  initials,
  className,
}: {
  name: string
  initials: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground",
        className
      )}
    >
      <svg viewBox="0 0 40 40" className="size-10 shrink-0" aria-hidden="true">
        <rect
          x="0.75"
          y="0.75"
          width="38.5"
          height="38.5"
          rx="11"
          className="fill-transparent stroke-current"
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />
        <path
          d="M20 9.5 29 13v8.4c0 5.3-3.7 9.6-9 11.6-5.3-2-9-6.3-9-11.6V13Z"
          className="fill-current"
          fillOpacity="0.1"
        />
      </svg>
      <span className="flex flex-col leading-[1.3]">
        <span
          aria-hidden="true"
          className="font-display text-sm font-semibold tracking-wide"
        >
          {initials}
        </span>
        <span className="font-display text-[0.9375rem] font-medium text-current">
          {name}
        </span>
      </span>
    </div>
  )
}
