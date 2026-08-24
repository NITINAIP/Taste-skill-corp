import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
} from "axios"

import { ApiError, messageForKind } from "@/api/api-error"
import { createMockAwareAdapter } from "@/api/mock-adapter"

/**
 * The only HTTP client in this codebase.
 *
 * Nothing outside src/api may call fetch, XMLHttpRequest, or construct its own
 * axios instance. Components do not import this file either; they go through a
 * service in src/api/services and a hook in src/hooks.
 */
const baseURL =
  import.meta.env.VITE_API_BASE_URL ?? `${import.meta.env.BASE_URL}api`

export const apiClient: AxiosInstance = axios.create({
  baseURL,
  timeout: 12_000,
  headers: { Accept: "application/json" },
})

// Vite type-strips the default adapter reference at build time if it is read at
// module scope inside the create call, so it is wired here instead.
apiClient.defaults.adapter = createMockAwareAdapter(
  axios.getAdapter(axios.defaults.adapter)
)

apiClient.interceptors.request.use((config) => {
  config.headers.set("X-Client", "arak-web")
  return config
})

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: unknown) => Promise.reject(toApiError(error))
)

function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error
  }

  if (error instanceof AxiosError) {
    if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
      return new ApiError("timeout", messageForKind("timeout"), { cause: error })
    }

    const status = error.response?.status

    if (status === undefined) {
      return new ApiError("network", messageForKind("network"), { cause: error })
    }

    if (status === 404) {
      return new ApiError("notFound", messageForKind("notFound"), {
        status,
        cause: error,
      })
    }

    if (status === 422 || status === 400) {
      const details = (error.response?.data as { errors?: Record<string, string> })
        ?.errors
      return new ApiError("validation", messageForKind("validation"), {
        status,
        details,
        cause: error,
      })
    }

    return new ApiError("server", messageForKind("server"), {
      status,
      cause: error,
    })
  }

  return new ApiError("unknown", messageForKind("unknown"), { cause: error })
}
