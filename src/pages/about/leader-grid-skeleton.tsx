import { Skeleton } from "@/components/ui/skeleton"

/**
 * Loading shape for the leadership grid.
 *
 * The shared CardGridSkeleton draws card boxes, and this section has none, so a
 * reader would watch four cards turn into four portraits. This one is the same
 * square-portrait-then-three-lines shape as the finished row.
 */
export function LeaderGridSkeleton() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
    >
      <span className="sr-only">กำลังโหลดข้อมูลทีมผู้บริหาร</span>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index}>
          <Skeleton className="aspect-square w-full rounded-lg" />
          <Skeleton className="mt-5 h-6 w-2/3" />
          <Skeleton className="mt-3 h-4 w-1/2" />
          <Skeleton className="mt-4 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-5/6" />
        </div>
      ))}
    </div>
  )
}
