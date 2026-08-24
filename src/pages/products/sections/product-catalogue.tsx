import { AsyncBoundary, CardGridSkeleton } from "@/components/common/async-boundary"
import { RevealGroup } from "@/components/common/reveal"
import { Section } from "@/components/common/section"
import { useProducts } from "@/hooks/use-products"
import { ProductCard } from "../product-card"
import { CategoryFilter } from "./category-filter"

/**
 * Filter rail plus card grid.
 *
 * Everything domain-shaped here is resolved by `useProducts`: the visible list,
 * the counts, and what "empty" means. This section renders the result.
 */
export function ProductCatalogue() {
  const {
    visibleProducts,
    category,
    selectCategory,
    countByCategory,
    isEmpty,
    isLoading,
    error,
    refetch,
  } = useProducts()

  return (
    <Section surface="muted" className="pt-8 md:pt-12">
      <h2 className="sr-only">รายการประกันภัยทั้งหมด</h2>

      <CategoryFilter
        value={category}
        counts={countByCategory}
        onSelect={selectCategory}
      />

      <div className="mt-8">
        <AsyncBoundary
          isLoading={isLoading}
          error={error}
          isEmpty={isEmpty}
          onRetry={refetch}
          skeleton={<CardGridSkeleton count={8} />}
          emptyTitle="ยังไม่มีประกันภัยในหมวดนี้"
          emptyDetail="กดปุ่ม ทั้งหมด ที่แถบหมวดด้านบนเพื่อล้างตัวกรองและดูรายการทั้งหมดอีกครั้ง"
        >
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </RevealGroup>
        </AsyncBoundary>
      </div>
    </Section>
  )
}
