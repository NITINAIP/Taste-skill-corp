import { Skeleton } from "@/components/ui/skeleton"

/**
 * Shown while a lazy page chunk downloads. It matches the shape of a page header
 * plus a first content block, because a generic spinner tells the reader nothing
 * about what is arriving.
 */
export function RouteFallback() {
  return (
    <div className="container-page py-16 md:py-24" role="status" aria-live="polite">
      <span className="sr-only">กำลังโหลดหน้า</span>
      <Skeleton className="h-4 w-28 rounded-full" />
      <Skeleton className="mt-5 h-11 w-full max-w-xl" />
      <Skeleton className="mt-3 h-11 w-full max-w-md" />
      <Skeleton className="mt-6 h-5 w-full max-w-2xl" />
      <Skeleton className="mt-2 h-5 w-full max-w-xl" />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-52 rounded-lg" />
        <Skeleton className="h-52 rounded-lg" />
        <Skeleton className="h-52 rounded-lg" />
      </div>
    </div>
  )
}
