import { useParams } from "react-router-dom"

import { usePageMeta } from "@/hooks/use-page-meta"
import { useProductDetail } from "@/hooks/use-product-detail"
import { CoverageTable } from "./sections/coverage-table"
import { ExclusionsAndDocuments } from "./sections/exclusions-documents"
import { MotorTierComparison } from "./sections/motor-tier-table"
import { ProductDetailHeader } from "./sections/product-detail-header"
import { ProductDetailPending } from "./sections/product-detail-pending"
import { ProductFaq } from "./sections/product-faq"
import { ProductNotFound } from "./sections/product-not-found"
import { QuoteCtaBand } from "./sections/quote-cta-band"
import { RelatedProducts } from "./sections/related-products"

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { product, showsTierComparison, isLoading, error, refetch } =
    useProductDetail(slug)

  usePageMeta({
    title: product?.name ?? "รายละเอียดความคุ้มครอง",
    description:
      product?.summary ?? "ความคุ้มครอง ข้อยกเว้น และเอกสารที่ต้องใช้",
  })

  if (error?.kind === "notFound") {
    return <ProductNotFound />
  }

  if (!product) {
    return (
      <ProductDetailPending
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
      />
    )
  }

  return (
    <>
      <ProductDetailHeader product={product} />
      <CoverageTable product={product} />
      {showsTierComparison ? <MotorTierComparison /> : null}
      <ExclusionsAndDocuments product={product} />
      <ProductFaq product={product} />
      <RelatedProducts product={product} />
      <QuoteCtaBand
        title={`ขอเบี้ย${product.name}จากหลายบริษัทในครั้งเดียว`}
        lead="แจ้งข้อมูลที่ต้องใช้คำนวณ ทีมงานจะส่งตารางเทียบเบี้ยและความคุ้มครองกลับให้ภายในเวลาทำการ"
      />
    </>
  )
}
