import { apiClient } from "@/api/client"
import { ApiError, messageForKind } from "@/api/api-error"
import { endpoints } from "@/api/endpoints"
import type { Product } from "@/content/products"
import type { MotorCoverageRow, MotorTier } from "@/content/motor-tiers"

/**
 * Product catalogue reads.
 *
 * A service maps transport to domain objects and nothing else. No React, no
 * component state, no formatting for display. Hooks handle state; components
 * handle presentation.
 */
export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  const { data } = await apiClient.get<Product[]>(endpoints.products, { signal })
  return data
}

export async function fetchProductBySlug(
  slug: string,
  signal?: AbortSignal
): Promise<Product> {
  const products = await fetchProducts(signal)
  const product = products.find((item) => item.slug === slug)

  if (!product) {
    throw new ApiError("notFound", messageForKind("notFound"), { status: 404 })
  }

  return product
}

export async function fetchMotorTiers(signal?: AbortSignal): Promise<{
  tiers: MotorTier[]
  matrix: MotorCoverageRow[]
}> {
  const { data } = await apiClient.get<{
    tiers: MotorTier[]
    matrix: MotorCoverageRow[]
  }>(endpoints.motorTiers, { signal })
  return data
}
