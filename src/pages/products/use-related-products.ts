import { useMemo } from "react"

import type { Product } from "@/content/products"
import { useProducts } from "@/hooks/use-products"

const RELATED_COUNT = 3

/**
 * The three products shown under a detail page.
 *
 * Same category first, because someone reading about voluntary motor cover is
 * most likely weighing it against the compulsory policy. When a category is too
 * small to fill the row, the popular lines top it up, then anything else, so the
 * row is never short and never repeats the product being read.
 *
 * This lives beside the page rather than in a JSX body because it is a filtering
 * decision, and filtering decisions do not belong in a return block.
 */
export function useRelatedProducts(current: Product | undefined) {
  const { products, isLoading, error, refetch } = useProducts()

  const related = useMemo(() => {
    if (!current) return []

    const candidates = products.filter(
      (product) => product.slug !== current.slug
    )
    const sameCategory = candidates.filter(
      (product) => product.category === current.category
    )
    const popular = candidates.filter(
      (product) => product.popular && product.category !== current.category
    )
    const rest = candidates.filter(
      (product) => !product.popular && product.category !== current.category
    )

    return [...sameCategory, ...popular, ...rest].slice(0, RELATED_COUNT)
  }, [products, current])

  return {
    related,
    isLoading,
    error,
    isEmpty: !isLoading && !error && related.length === 0,
    refetch,
  }
}
