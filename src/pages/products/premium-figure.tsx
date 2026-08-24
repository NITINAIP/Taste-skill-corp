import type { Product } from "@/content/products"
import { formatBaht } from "./format"

/**
 * The starting-premium figure.
 *
 * The note under it is regulated small print from the content file and is always
 * rendered with the number, never dropped for visual tidiness. The figure stays
 * in `--foreground`: amber text on a light surface is 2.4:1 and fails AA, so
 * amber on this site is a fill colour, not a text colour.
 */
export function PremiumFigure({
  premium,
}: {
  premium: Product["premiumFrom"]
}) {
  return (
    <div>
      <p className="text-sm leading-[1.7] text-muted-foreground">เบี้ยเริ่มต้น</p>
      <p className="mt-1 font-display text-[2rem] leading-[1.25] font-semibold tabular-nums md:text-[2.5rem]">
        {formatBaht(premium.amount)}
        <span className="ml-2 font-sans text-base font-medium text-muted-foreground">
          {premium.unit}
        </span>
      </p>
    </div>
  )
}
