import type { ElementType } from "react"
import { Link } from "react-router-dom"

import { AppImage } from "@/components/common/app-image"
import { AsyncBoundary } from "@/components/common/async-boundary"
import { Reveal } from "@/components/common/reveal"
import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"
import {
  ArrowUpRight,
  FirstAid,
  House,
  IdentificationCard,
  ShieldCheck,
  Storefront,
  Suitcase,
  Truck,
} from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { routePaths } from "@/lib/routes"
import { cn } from "@/lib/utils"
import type { BentoCell, BentoShape } from "@/pages/home/use-featured-bento"
import { useFeaturedBento } from "@/pages/home/use-featured-bento"

/**
 * Layout family: bento. Five featured products, five cells, one large plus four.
 *
 * Three cells carry a photograph and two carry a tinted surface with the product
 * glyph, so the grid is not five identical white cards. Only the short product
 * fields are printed here; the coverage detail belongs on the detail page.
 */
const glyphs: Record<string, ElementType> = {
  ShieldCheck,
  FirstAid,
  House,
  Storefront,
  Suitcase,
  Truck,
  IdentificationCard,
}

const gridClassName = "mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"

const shapeClassName: Record<BentoShape, string> = {
  feature: "sm:col-span-2 lg:col-span-2 lg:row-span-2",
  single: "",
  wide: "lg:col-span-2",
}

const mediaClassName: Record<BentoShape, string> = {
  feature: "h-44 sm:h-60 lg:h-auto lg:min-h-[15rem] lg:flex-1",
  single: "h-36",
  wide: "h-40",
}

const toneClassName: Record<"warm" | "cool", string> = {
  warm: "bg-brand-soft text-primary",
  cool: "bg-primary/8 text-primary",
}

const tileClassName = cn(
  "group flex flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-card outline-none",
  "transition-[transform,box-shadow,border-color] duration-200",
  "hover:border-primary/35 hover:shadow-lift motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0",
  "focus-visible:ring-[3px] focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
)

function BentoTile({ cell }: { cell: BentoCell }) {
  const { product, shape, imageSlot, tone } = cell
  const Glyph = glyphs[product.icon] ?? ShieldCheck
  const blurb = shape === "feature" ? product.summary : product.heroLine

  return (
    <Link
      to={routePaths.productDetail(product.slug)}
      className={cn(tileClassName, shapeClassName[shape])}
    >
      {imageSlot ? (
        <AppImage
          slot={imageSlot}
          alt={product.name}
          rounded={false}
          className={cn("w-full shrink-0", mediaClassName[shape])}
          imageClassName="transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
        />
      ) : (
        <div
          aria-hidden="true"
          className={cn(
            "flex shrink-0 items-center justify-center",
            mediaClassName[shape],
            toneClassName[tone ?? "cool"]
          )}
        >
          <Glyph className="size-11" />
        </div>
      )}

      <div className="flex flex-col gap-2 p-6">
        <h3 className="font-display text-lg leading-[1.4] font-semibold">
          {product.name}
        </h3>
        <p className="text-sm leading-[1.75] text-muted-foreground">{blurb}</p>
        <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
          ดูความคุ้มครอง
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  )
}

function BentoSkeleton() {
  return (
    <div className={gridClassName} role="status" aria-live="polite">
      <span className="sr-only">กำลังโหลดข้อมูล</span>
      {(["feature", "single", "single", "single", "wide"] as BentoShape[]).map(
        (shape, index) => (
          <div
            key={index}
            className={cn(
              "flex flex-col overflow-hidden rounded-lg border border-border bg-card",
              shapeClassName[shape]
            )}
          >
            <Skeleton className={cn("w-full rounded-none", mediaClassName[shape])} />
            <div className="p-6">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="mt-3 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-4/5" />
            </div>
          </div>
        )
      )}
    </div>
  )
}

export function ProductsSection() {
  const { cells, isLoading, error, refetch, isEmpty } = useFeaturedBento()

  return (
    <Section id="products">
      <Reveal>
        <SectionHeading
          eyebrow="ความคุ้มครองยอดนิยม"
          title="สินค้าประกันภัย"
          lead="ห้าแบบที่ลูกค้าถามถึงมากที่สุด เปิดดูเงื่อนไข ข้อยกเว้น และเอกสารที่ต้องใช้ได้ก่อนตัดสินใจ"
        />
      </Reveal>

      <AsyncBoundary
        isLoading={isLoading}
        error={error}
        isEmpty={isEmpty}
        onRetry={refetch}
        skeleton={<BentoSkeleton />}
        emptyTitle="ยังไม่มีแบบประกันแนะนำในขณะนี้"
        emptyDetail="ดูแบบประกันทั้งหมดได้ที่หน้าประกันภัย"
      >
        <Reveal className={gridClassName}>
          {cells.map((cell) => (
            <BentoTile key={cell.product.slug} cell={cell} />
          ))}
        </Reveal>
      </AsyncBoundary>

      <div className="mt-10">
        <Button asChild variant="outline">
          <Link to={routePaths.products}>ดูประกันภัยทั้งหมด</Link>
        </Button>
      </div>
    </Section>
  )
}
