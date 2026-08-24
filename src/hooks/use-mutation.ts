import { useCallback, useRef, useState } from "react"

import { ApiError, messageForKind } from "@/api/api-error"

export type MutationStatus = "idle" | "submitting" | "success" | "error"

export type Mutation<TInput, TResult> = {
  submit: (input: TInput) => Promise<TResult | null>
  reset: () => void
  status: MutationStatus
  error: ApiError | null
  data: TResult | null
  isSubmitting: boolean
}

/**
 * Write-state, matching useAsyncResource on the read side.
 *
 * A failed submission keeps whatever the reader typed: the hook never clears the
 * form, it only reports what happened. The component decides what to render for
 * each status, which is how the four required states (idle, submitting, success,
 * error) stay honest instead of collapsing into "it probably worked".
 */
export function useMutation<TInput, TResult>(
  mutate: (input: TInput, signal: AbortSignal) => Promise<TResult>
): Mutation<TInput, TResult> {
  const [status, setStatus] = useState<MutationStatus>("idle")
  const [error, setError] = useState<ApiError | null>(null)
  const [data, setData] = useState<TResult | null>(null)

  const mutateRef = useRef(mutate)
  mutateRef.current = mutate

  const submit = useCallback(async (input: TInput): Promise<TResult | null> => {
    const controller = new AbortController()

    setStatus("submitting")
    setError(null)

    try {
      const result = await mutateRef.current(input, controller.signal)
      setData(result)
      setStatus("success")
      return result
    } catch (cause) {
      setError(
        cause instanceof ApiError
          ? cause
          : new ApiError("unknown", messageForKind("unknown"), { cause })
      )
      setStatus("error")
      return null
    }
  }, [])

  const reset = useCallback(() => {
    setStatus("idle")
    setError(null)
    setData(null)
  }, [])

  return {
    submit,
    reset,
    status,
    error,
    data,
    isSubmitting: status === "submitting",
  }
}
