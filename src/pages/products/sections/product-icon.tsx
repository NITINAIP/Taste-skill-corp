import {
  FirstAid,
  House,
  IdentificationCard,
  ShieldCheck,
  Storefront,
  Suitcase,
  Truck,
} from "@/components/icons"

/**
 * `product.icon` arrives from the catalogue as a plain string key, so the
 * mapping to a real component lives here instead of in a section body. An
 * unknown key falls back to the shield rather than crashing the grid, because a
 * new product line should never be able to take the page down.
 */
const iconByKey: Record<string, typeof ShieldCheck> = {
  ShieldCheck,
  IdentificationCard,
  FirstAid,
  House,
  Suitcase,
  Storefront,
  Truck,
}

export function ProductIcon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const Icon = iconByKey[name] ?? ShieldCheck

  return <Icon className={className} aria-hidden="true" />
}
