import type { ReactNode } from "react"

import { Warning } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import type { ApiError } from "@/api/api-error"
import { cn } from "@/lib/utils"

/**
 * The loading, error and empty states for every fetched section.
 *
 * The taste-skill requires all three to exist rather than shipping only the
 * happy path, and requires skeletons shaped like the content instead of a
 * spinner. Routing them through one component is what keeps that true on every
 * page as the site grows.
 */
export function AsyncBoundary({
  isLoading,
  error,
  isEmpty = false,
  onRetry,
  skeleton,
  emptyTitle = "ยังไม่มีข้อมูลในส่วนนี้",
  emptyDetail,
  onDark = false,
  children,
}: {
  isLoading: boolean
  error: ApiError | null
  isEmpty?: boolean
  onRetry?: () => void
  skeleton?: ReactNode
  emptyTitle?: string
  emptyDetail?: string
  /**
   * Set inside a navy band (`<Section surface="primary">`). Without it a failed
   * fetch renders a light card in the middle of a dark section, which reads as a
   * broken page rather than as an error message.
   */
  onDark?: boolean
  children: ReactNode
}) {
  if (error) {
    return (
      <div
        role="alert"
        className={cn(
          "rounded-lg border p-8 text-center",
          onDark ? "border-white/15 bg-white/8" : "border-border bg-card"
        )}
      >
        <Warning
          className={cn(
            "mx-auto size-8",
            onDark ? "text-white/70" : "text-muted-foreground"
          )}
        />
        <p
          className={cn(
            "mt-4 font-display text-lg leading-[1.4] font-semibold",
            onDark && "text-white"
          )}
        >
          โหลดข้อมูลไม่สำเร็จ
        </p>
        <p
          className={cn(
            "mx-auto mt-2 max-w-md text-sm leading-[1.75]",
            onDark ? "text-white/75" : "text-muted-foreground"
          )}
        >
          {error.message}
        </p>
        {onRetry ? (
          <Button
            variant={onDark ? "onDark" : "outline"}
            size="sm"
            className="mt-5"
            onClick={onRetry}
          >
            ลองใหม่อีกครั้ง
          </Button>
        ) : null}
      </div>
    )
  }

  if (isLoading) {
    return <>{skeleton ?? <CardGridSkeleton />}</>
  }

  if (isEmpty) {
    return (
      <div
        className={cn(
          "rounded-lg border border-dashed p-10 text-center",
          onDark ? "border-white/20 bg-white/6" : "border-border bg-card"
        )}
      >
        <p
          className={cn(
            "font-display text-lg leading-[1.4] font-semibold",
            onDark && "text-white"
          )}
        >
          {emptyTitle}
        </p>
        {emptyDetail ? (
          <p
            className={cn(
              "mx-auto mt-2 max-w-md text-sm leading-[1.75]",
              onDark ? "text-white/75" : "text-muted-foreground"
            )}
          >
            {emptyDetail}
          </p>
        ) : null}
      </div>
    )
  }

  return <>{children}</>
}

export function CardGridSkeleton({
  count = 3,
  className,
}: {
  count?: number
  className?: string
}) {
  return (
    <div
      className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3", className)}
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">กำลังโหลดข้อมูล</span>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-lg border border-border bg-card p-6">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="mt-5 h-6 w-2/3" />
          <Skeleton className="mt-3 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-5/6" />
          <Skeleton className="mt-6 h-4 w-28" />
        </div>
      ))}
    </div>
  )
}

export function LinesSkeleton({ lines = 4 }: { lines?: number }) {
  return (
    <div role="status" aria-live="polite" className="space-y-3">
      <span className="sr-only">กำลังโหลดข้อมูล</span>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          className={cn("h-5", index === lines - 1 ? "w-2/3" : "w-full")}
        />
      ))}
    </div>
  )
}
