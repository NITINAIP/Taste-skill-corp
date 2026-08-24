import { Link } from "react-router-dom"

import { ArrowRight } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/content/products"
import { routePaths } from "@/lib/routes"
import { cn } from "@/lib/utils"
import { formatBaht } from "./format"
import { ProductIcon } from "./sections/product-icon"

/**
 * One product, one link target.
 *
 * The whole card is the anchor rather than a card with a small "read more" link
 * inside it, so the tap target is the full 44px-plus surface on touch and screen
 * readers announce one destination instead of two.
 *
 * `summary` is the only description rendered here. `coverages[].detail` is long
 * regulated wording and belongs on the detail page, never in a grid cell.
 */
export function ProductCard({
  product,
  className,
}: {
  product: Product
  className?: string
}) {
  return (
    <Link
      to={routePaths.productDetail(product.slug)}
      className={cn(
        "group flex h-full flex-col rounded-lg border border-border bg-card p-6 shadow-card",
        "transition-[border-color,box-shadow,transform] duration-150 ease-out",
        "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "motion-safe:hover:-translate-y-px hover:border-primary/35",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-11 items-center justify-center rounded-full bg-primary/8 text-primary">
          <ProductIcon name={product.icon} className="size-6" />
        </span>
        {product.popular ? <Badge>ยอดนิยม</Badge> : null}
      </div>

      <h3 className="mt-5 font-display text-xl leading-[1.4] font-semibold">
        {product.name}
      </h3>
      <p className="mt-2 text-sm leading-[1.75] text-muted-foreground">
        {product.summary}
      </p>

      <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t border-border pt-4">
        <p className="text-sm leading-[1.7] text-muted-foreground">
          เบี้ยเริ่มต้น{" "}
          <span className="font-display text-lg font-semibold text-foreground tabular-nums">
            {formatBaht(product.premiumFrom.amount)}
          </span>{" "}
          {product.premiumFrom.unit}
        </p>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
          ดูความคุ้มครอง
          <ArrowRight className="size-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}
