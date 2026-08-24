import { useCallback, useMemo, useState } from "react"

import { fetchProducts } from "@/api/services/catalog.service"
import { useAsyncResource } from "@/hooks/use-async-resource"
import type { Product, ProductCategory } from "@/content/products"

export type CategoryFilter = ProductCategory | "all"

/**
 * Catalogue business logic. The products page renders what this returns and
 * makes no decisions of its own: filtering, ordering and the "no results" case
 * are resolved here, not in JSX.
 */
export function useProducts() {
  const resource = useAsyncResource<Product[]>(
    (signal) => fetchProducts(signal),
    "products"
  )
  const [category, setCategory] = useState<CategoryFilter>("all")

  const products = useMemo(() => resource.data ?? [], [resource.data])

  const visibleProducts = useMemo(() => {
    const filtered =
      category === "all"
        ? products
        : products.filter((product) => product.category === category)

    // Popular lines first so the catalogue opens on what most readers came for,
    // then stable original order within each group.
    return [...filtered].sort((a, b) => Number(b.popular) - Number(a.popular))
  }, [products, category])

  const countByCategory = useMemo(() => {
    const counts = new Map<CategoryFilter, number>([["all", products.length]])
    for (const product of products) {
      counts.set(product.category, (counts.get(product.category) ?? 0) + 1)
    }
    return counts
  }, [products])

  const selectCategory = useCallback((next: CategoryFilter) => {
    setCategory(next)
  }, [])

  return {
    ...resource,
    products,
    visibleProducts,
    category,
    selectCategory,
    countByCategory,
    isEmpty: resource.status === "success" && visibleProducts.length === 0,
  }
}

export function useFeaturedProducts(slugs: string[]) {
  const resource = useAsyncResource<Product[]>(
    (signal) => fetchProducts(signal),
    "products"
  )

  const featured = useMemo(() => {
    const bySlug = new Map((resource.data ?? []).map((p) => [p.slug, p]))
    return slugs
      .map((slug) => bySlug.get(slug))
      .filter((product): product is Product => Boolean(product))
  }, [resource.data, slugs])

  return { ...resource, featured }
}
