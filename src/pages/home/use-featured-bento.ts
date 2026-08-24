import { useCallback, useMemo } from "react"

import { useFeaturedProducts } from "@/hooks/use-products"
import { useHomeContent } from "@/hooks/use-site-content"
import type { Product } from "@/content/products"

/**
 * The bento is five products in five cells, one large plus four, and the taste
 * skill requires the cell count to match the item count exactly. The shape of a
 * cell is therefore a property of its position in the grid, not of the product,
 * so it is resolved here rather than decided inside a JSX return block.
 *
 * `shape` and `tone` are layout intent, not CSS. The section maps them to grid
 * and surface classes, which keeps styling in the component layer.
 */
export type BentoShape = "feature" | "single" | "wide"

export type BentoCell = {
  product: Product
  shape: BentoShape
  /** Media slot when the cell carries a photograph, null when it is a tinted surface. */
  imageSlot: string | null
  /** Tint used when the cell carries no photograph. */
  tone: "warm" | "cool" | null
}

type CellPlan = {
  shape: BentoShape
  withImage: boolean
  tone: BentoCell["tone"]
}

/**
 * Reading order on a three-column grid: the feature holds columns one and two
 * across two rows, two single cells stack in column three, one single cell opens
 * the last row and the wide cell closes it. No cell is left empty.
 */
const cellPlan: CellPlan[] = [
  { shape: "feature", withImage: true, tone: null },
  { shape: "single", withImage: true, tone: null },
  { shape: "single", withImage: false, tone: "warm" },
  { shape: "single", withImage: false, tone: "cool" },
  { shape: "wide", withImage: true, tone: null },
]

const fallbackPlan: CellPlan = { shape: "single", withImage: false, tone: "cool" }

const noSlugs: string[] = []

export function useFeaturedBento() {
  const home = useHomeContent()
  const slugs = home.content?.featuredProductSlugs ?? noSlugs
  const products = useFeaturedProducts(slugs)

  const cells = useMemo<BentoCell[]>(
    () =>
      products.featured.map((product, index) => {
        const plan = cellPlan[index] ?? fallbackPlan
        return {
          product,
          shape: plan.shape,
          imageSlot: plan.withImage ? `product-${product.slug}` : null,
          tone: plan.withImage ? null : plan.tone,
        }
      }),
    [products.featured]
  )

  const refetch = useCallback(() => {
    home.refetch()
    products.refetch()
  }, [home, products])

  const isLoading = home.isLoading || products.isLoading
  const error = home.error ?? products.error

  return {
    cells,
    isLoading,
    error,
    refetch,
    isEmpty: !isLoading && error === null && cells.length === 0,
  }
}
