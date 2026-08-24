import { AsyncBoundary, CardGridSkeleton } from "@/components/common/async-boundary"
import { Reveal, RevealGroup } from "@/components/common/reveal"
import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"
import type { Product } from "@/content/products"
import { ProductCard } from "../product-card"
import { useRelatedProducts } from "../use-related-products"

export function RelatedProducts({ product }: { product: Product }) {
  const { related, isLoading, error, isEmpty, refetch } =
    useRelatedProducts(product)

  return (
    <Section>
      <Reveal>
        <SectionHeading
          title="ดูประกันภัยแบบอื่น"
          lead="แบบที่คนมักดูคู่กับหน้านี้ เปิดดูความคุ้มครองก่อนขอเทียบเบี้ยพร้อมกันได้"
        />
      </Reveal>

      <div className="mt-8">
        <AsyncBoundary
          isLoading={isLoading}
          error={error}
          isEmpty={isEmpty}
          onRetry={refetch}
          skeleton={<CardGridSkeleton count={3} />}
          emptyTitle="ยังไม่มีแบบอื่นให้เทียบในตอนนี้"
        >
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </RevealGroup>
        </AsyncBoundary>
      </div>
    </Section>
  )
}
