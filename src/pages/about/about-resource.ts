import type { useAboutContent } from "@/hooks/use-site-content"

/**
 * The shape /about sections receive.
 *
 * The page fetches the about content once and hands the whole resource to the
 * sections that need it, so five sections do not open five requests for the same
 * document and each one can still render its own loading and error state.
 */
export type AboutResource = ReturnType<typeof useAboutContent>
