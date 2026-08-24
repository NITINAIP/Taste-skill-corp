import { apiClient } from "@/api/client"
import { ApiError, messageForKind } from "@/api/api-error"
import { endpoints } from "@/api/endpoints"
import { cachedGet } from "@/api/request-cache"
import type { Product } from "@/content/products"
import type { MotorCoverageRow, MotorTier } from "@/content/motor-tiers"

/**
 * Product catalogue reads.
 *
 * A service maps transport to domain objects and nothing else. No React, no
 * component state, no formatting for display. Hooks handle state; components
 * handle presentation.
 */
export function fetchProducts(): Promise<Product[]> {
  return cachedGet(endpoints.products, async () => {
    const { data } = await apiClient.get<Product[]>(endpoints.products)
    return data
  })
}

export async function fetchProductBySlug(slug: string): Promise<Product> {
  const products = await fetchProducts()
  const product = products.find((item) => item.slug === slug)

  if (!product) {
    throw new ApiError("notFound", messageForKind("notFound"), { status: 404 })
  }

  return product
}

export function fetchMotorTiers(): Promise<{
  tiers: MotorTier[]
  matrix: MotorCoverageRow[]
}> {
  return cachedGet(endpoints.motorTiers, async () => {
    const { data } = await apiClient.get<{
      tiers: MotorTier[]
      matrix: MotorCoverageRow[]
    }>(endpoints.motorTiers)
    return data
  })
}
