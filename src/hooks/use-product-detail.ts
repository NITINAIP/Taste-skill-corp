import { useMemo } from "react"

import { fetchMotorTiers, fetchProductBySlug } from "@/api/services/catalog.service"
import { useAsyncResource } from "@/hooks/use-async-resource"
import type { Product } from "@/content/products"
import type { MotorCoverageRow, MotorTier } from "@/content/motor-tiers"

const MOTOR_SLUGS = new Set(["motor"])

export function useProductDetail(slug: string | undefined) {
  const resource = useAsyncResource<Product>(
    (signal) => fetchProductBySlug(slug ?? "", signal),
    `product:${slug ?? ""}`
  )

  const showsTierComparison = useMemo(
    () => Boolean(slug && MOTOR_SLUGS.has(slug)),
    [slug]
  )

  return { ...resource, product: resource.data, showsTierComparison }
}

export function useMotorTiers(enabled: boolean) {
  const resource = useAsyncResource<{
    tiers: MotorTier[]
    matrix: MotorCoverageRow[]
  }>(
    async (signal) =>
      enabled ? fetchMotorTiers(signal) : { tiers: [], matrix: [] },
    `motor-tiers:${enabled}`
  )

  return {
    ...resource,
    tiers: resource.data?.tiers ?? [],
    matrix: resource.data?.matrix ?? [],
  }
}
