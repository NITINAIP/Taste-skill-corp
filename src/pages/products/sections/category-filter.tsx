import { Check } from "@/components/icons"
import { productCategories } from "@/content/products"
import type { CategoryFilter as CategoryFilterValue } from "@/hooks/use-products"
import { cn } from "@/lib/utils"

/**
 * The filter rail.
 *
 * Static chrome only: the labels come from the content file, the selected value
 * and the counts come from `useProducts`. This component decides nothing about
 * which products are shown.
 *
 * The selected chip is marked three ways, not by colour alone: a check icon, a
 * heavier weight, and a solid surface. `aria-pressed` carries the same state to
 * assistive tech, and every chip is a real button so keyboard operation and the
 * focus ring come for free.
 */
const filters: { id: CategoryFilterValue; label: string }[] = [
  { id: "all", label: "ทั้งหมด" },
  ...productCategories.map((category) => ({
    id: category.id as CategoryFilterValue,
    label: category.label,
  })),
]

export function CategoryFilter({
  value,
  counts,
  onSelect,
}: {
  value: CategoryFilterValue
  counts: Map<CategoryFilterValue, number>
  onSelect: (next: CategoryFilterValue) => void
}) {
  return (
    <div
      role="group"
      aria-label="กรองตามหมวดประกันภัย"
      className="flex flex-wrap gap-2"
    >
      {filters.map((filter) => {
        const isActive = filter.id === value

        return (
          <button
            key={filter.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(filter.id)}
            className={cn(
              "inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm",
              "transition-[color,background-color,border-color] duration-150 ease-out",
              "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isActive
                ? "border-primary bg-primary font-semibold text-primary-foreground"
                : "border-border bg-card font-medium text-foreground hover:border-primary/35 hover:bg-primary/5"
            )}
          >
            {isActive ? <Check className="size-4" aria-hidden="true" /> : null}
            {filter.label}
            <span
              className={cn(
                "tabular-nums text-xs",
                isActive ? "text-primary-foreground/75" : "text-muted-foreground"
              )}
            >
              {counts.get(filter.id) ?? 0}
            </span>
          </button>
        )
      })}
    </div>
  )
}
