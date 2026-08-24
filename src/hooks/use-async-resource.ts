import { useCallback, useEffect, useRef, useState } from "react"

import { ApiError, messageForKind } from "@/api/api-error"

export type AsyncStatus = "loading" | "success" | "error"

export type AsyncResource<T> = {
  data: T | null
  error: ApiError | null
  status: AsyncStatus
  isLoading: boolean
  isError: boolean
  refetch: () => void
}

type ResourceState<T> = {
  key: string
  status: AsyncStatus
  data: T | null
  error: ApiError | null
}

function loadingState<T>(key: string): ResourceState<T> {
  return { key, status: "loading", data: null, error: null }
}

function toApiError(cause: unknown): ApiError {
  return cause instanceof ApiError
    ? cause
    : new ApiError("unknown", messageForKind("unknown"), { cause })
}

/**
 * The one place that owns read-state.
 *
 * Every domain hook builds on this, so loading, error and abort behave the same
 * on every screen and no component writes its own `useState(loading)` ladder.
 * Requests are aborted when the caller unmounts or the key changes, so a slow
 * response cannot land on a page the reader already left.
 *
 * The loading state on a key change is derived during render rather than set
 * from inside the effect. Setting it in the effect would render one frame of the
 * previous key's data under the new key, which is how a reader ends up seeing
 * motor coverage on the health insurance page for a moment.
 */
export function useAsyncResource<T>(
  loader: (signal: AbortSignal) => Promise<T>,
  key: string
): AsyncResource<T> {
  const [reloadToken, setReloadToken] = useState(0)
  const effectiveKey = `${key}#${reloadToken}`

  const [state, setState] = useState<ResourceState<T>>(() =>
    loadingState<T>(effectiveKey)
  )

  // The loader is usually an inline arrow, so it is a new function every render.
  // Holding it in a ref keeps the fetch effect keyed on the data identity rather
  // than on the closure identity. Written in an effect, never during render.
  const loaderRef = useRef(loader)
  useEffect(() => {
    loaderRef.current = loader
  })

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    loaderRef
      .current(controller.signal)
      .then((result) => {
        if (!active) return
        setState({
          key: effectiveKey,
          status: "success",
          data: result,
          error: null,
        })
      })
      .catch((cause: unknown) => {
        if (!active || controller.signal.aborted) return
        setState({
          key: effectiveKey,
          status: "error",
          data: null,
          error: toApiError(cause),
        })
      })

    return () => {
      active = false
      controller.abort()
    }
  }, [effectiveKey])

  const current = state.key === effectiveKey ? state : loadingState<T>(effectiveKey)

  const refetch = useCallback(() => setReloadToken((token) => token + 1), [])

  return {
    data: current.data,
    error: current.error,
    status: current.status,
    isLoading: current.status === "loading",
    isError: current.status === "error",
    refetch,
  }
}
