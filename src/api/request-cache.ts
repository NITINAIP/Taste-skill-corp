/**
 * Deduplicates GET reads across hook instances.
 *
 * Two hooks that need the same resource are common here: a product detail page
 * resolves its slug from the catalogue, and the related-products row below it
 * reads the same catalogue. Each `useAsyncResource` owns its own state, so
 * without this they would issue two identical requests on every detail view.
 *
 * A cached request deliberately ignores any single caller's AbortSignal: the
 * response belongs to everyone waiting on it, so one component unmounting must
 * not cancel it for the others. Abort still works where it matters, because
 * `useAsyncResource` discards a result that arrives after its caller is gone.
 *
 * A failed request is evicted immediately, so the retry button on an error state
 * performs a real retry rather than replaying the rejection.
 */
type Entry<T> = { promise: Promise<T>; at: number }

const cache = new Map<string, Entry<unknown>>()

const TTL_MS = 5 * 60 * 1000

export function cachedGet<T>(key: string, run: () => Promise<T>): Promise<T> {
  const hit = cache.get(key) as Entry<T> | undefined

  if (hit && Date.now() - hit.at < TTL_MS) {
    return hit.promise
  }

  const promise = run().catch((error: unknown) => {
    cache.delete(key)
    throw error
  })

  cache.set(key, { promise, at: Date.now() })

  return promise
}

export function invalidateCachedGet(key?: string): void {
  if (key) {
    cache.delete(key)
    return
  }
  cache.clear()
}
