import { usePageMeta } from "@/hooks/use-page-meta"
import { ProductCatalogue } from "./sections/product-catalogue"
import { ProductsHeader } from "./sections/products-header"
import { QuoteCtaBand } from "./sections/quote-cta-band"

export default function ProductsPage() {
  usePageMeta({
    title: "สินค้าประกันภัย",
    description:
      "ประกันรถยนต์ สุขภาพ อัคคีภัย เดินทาง และประกันธุรกิจ เลือกดูความคุ้มครองของแต่ละแบบ",
  })

  return (
    <>
      <ProductsHeader />
      <ProductCatalogue />
      <QuoteCtaBand
        title="ยังไม่แน่ใจว่าแบบไหนตรงกับที่ใช้งานจริง"
        lead="ส่งรายละเอียดรถ บ้าน หรือธุรกิจของคุณมา ทีมงานจะเทียบเบี้ยและความคุ้มครองจากบริษัทคู่สัญญาให้"
      />
    </>
  )
}
