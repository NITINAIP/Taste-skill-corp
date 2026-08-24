import type { AxiosAdapter, AxiosRequestConfig } from "axios"

import { endpoints } from "@/api/endpoints"

/**
 * Lead submission has no backend on a static host.
 *
 * Rather than bypassing axios with a hand-rolled promise, the two write
 * endpoints are served by an axios adapter. Interceptors, timeouts, cancellation
 * and error normalisation therefore behave exactly as they will once
 * VITE_API_BASE_URL points at a real service, and the switch is one env var.
 *
 * Reads are never mocked. They fetch the generated JSON in /public/api for real.
 */
const writeEndpoints: string[] = [
  endpoints.agentApplications,
  endpoints.contactEnquiries,
]

function isMockedWrite(config: AxiosRequestConfig): boolean {
  const method = (config.method ?? "get").toLowerCase()
  const url = config.url ?? ""
  return method === "post" && writeEndpoints.some((path) => url.endsWith(path))
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function createMockAwareAdapter(defaultAdapter: AxiosAdapter): AxiosAdapter {
  return async function adapter(config) {
    if (!isMockedWrite(config)) {
      return defaultAdapter(config)
    }

    await delay(700)

    const reference = `AR-${Date.now().toString(36).toUpperCase()}`

    return {
      data: {
        reference,
        receivedAt: new Date().toISOString(),
        mock: true,
      },
      status: 201,
      statusText: "Created",
      headers: {},
      config,
    }
  }
}
