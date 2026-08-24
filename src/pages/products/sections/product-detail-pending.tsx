import { AsyncBoundary, LinesSkeleton } from "@/components/common/async-boundary"
import { Section } from "@/components/common/section"
import type { ApiError } from "@/api/api-error"

/**
 * Loading and error state for the detail route.
 *
 * The skeleton is shaped like the header it replaces rather than a spinner, so
 * the page does not jump when the product arrives.
 */
export function ProductDetailPending({
  isLoading,
  error,
  onRetry,
}: {
  isLoading: boolean
  error: ApiError | null
  onRetry: () => void
}) {
  return (
    <Section>
      <AsyncBoundary
        isLoading={isLoading}
        error={error}
        onRetry={onRetry}
        skeleton={
          <div className="max-w-[42rem]">
            <LinesSkeleton lines={5} />
          </div>
        }
      >
        <span className="sr-only">กำลังโหลดข้อมูลแบบประกันภัย</span>
      </AsyncBoundary>
    </Section>
  )
}
