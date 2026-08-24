import { useCallback, useEffect, useRef, useState } from "react"

import { ApiError, messageForKind } from "@/api/api-error"

export type AsyncStatus = "idle" | "loading" | "success" | "error"

export type AsyncResource<T> = {
  data: T | null
  error: ApiError | null
  status: AsyncStatus
  isLoading: boolean
  isError: boolean
  refetch: () => void
}

/**
 * The one place that owns read-state.
 *
 * Every domain hook builds on this, so loading, error and abort behave the same
 * on every screen and no component ever writes its own `useState(loading)`
 * ladder. Requests are aborted when the caller unmounts or the key changes, so a
 * slow response cannot land on a page the reader already left.
 */
export function useAsyncResource<T>(
  loader: (signal: AbortSignal) => Promise<T>,
  key: string
): AsyncResource<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<ApiError | null>(null)
  const [status, setStatus] = useState<AsyncStatus>("idle")
  const [reloadToken, setReloadToken] = useState(0)

  const loaderRef = useRef(loader)
  loaderRef.current = loader

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    setStatus("loading")
    setError(null)

    loaderRef
      .current(controller.signal)
      .then((result) => {
        if (!active) return
        setData(result)
        setStatus("success")
      })
      .catch((cause: unknown) => {
        if (!active || controller.signal.aborted) return
        setError(
          cause instanceof ApiError
            ? cause
            : new ApiError("unknown", messageForKind("unknown"), { cause })
        )
        setStatus("error")
      })

    return () => {
      active = false
      controller.abort()
    }
  }, [key, reloadToken])

  const refetch = useCallback(() => setReloadToken((token) => token + 1), [])

  return {
    data,
    error,
    status,
    isLoading: status === "loading" || status === "idle",
    isError: status === "error",
    refetch,
  }
}
