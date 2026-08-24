/**
 * Every internal path the app can link to.
 *
 * Kept out of routes.tsx so that importing a path does not pull the route tree
 * (and therefore every lazy page boundary) into the importing module.
 */
export const routePaths = {
  home: "/",
  products: "/products",
  productDetail: (slug: string) => `/products/${slug}`,
  agent: "/agent",
  agentApply: "/agent/apply",
  about: "/about",
  contact: "/contact",
} as const
