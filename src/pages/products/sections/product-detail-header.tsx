import { Link } from "react-router-dom"

import { AppImage } from "@/components/common/app-image"
import { Reveal } from "@/components/common/reveal"
import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"
import { Button } from "@/components/ui/button"
import type { Product } from "@/content/products"
import { quoteCta } from "@/lib/nav"
import { routePaths } from "@/lib/routes"
import { PremiumFigure } from "../premium-figure"

/**
 * Detail header: asymmetric 7/5 split, copy and figure left, product image right.
 *
 * A different family from the index header on purpose, which is a plain stacked
 * left-aligned header with no asset.
 */
export function ProductDetailHeader({ product }: { product: Product }) {
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-7">
          <Reveal>
            <Link
              to={routePaths.products}
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              สินค้าประกันภัยทั้งหมด
            </Link>
            <SectionHeading
              as="h1"
              className="mt-4"
              title={product.name}
              lead={product.heroLine}
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-8 flex flex-wrap items-end gap-x-10 gap-y-5">
              <PremiumFigure premium={product.premiumFrom} />
              <Button asChild variant="brand" size="lg">
                <Link to={quoteCta.href}>{quoteCta.label}</Link>
              </Button>
            </div>
            <p className="mt-4 max-w-[56ch] text-xs leading-[1.7] text-muted-foreground">
              {product.premiumFrom.note}
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={0.12}>
            <AppImage
              slot={`product-${product.slug}`}
              alt={`ภาพประกอบบริการ${product.name}`}
              priority
            />
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
