import { Suspense, lazy } from "react"
import { Route, Routes } from "react-router-dom"

import { RootLayout } from "@/components/layout/root-layout"
import { RouteFallback } from "@/components/common/route-fallback"

/**
 * One lazy chunk per page. A corporate site is read one page at a time, so
 * shipping the agent application form to someone reading the company history is
 * wasted bytes on a Thai mobile connection.
 */
const HomePage = lazy(() => import("@/pages/home/home-page"))
const ProductsPage = lazy(() => import("@/pages/products/products-page"))
const ProductDetailPage = lazy(
  () => import("@/pages/products/product-detail-page")
)
const AgentPage = lazy(() => import("@/pages/agent/agent-page"))
const AgentApplyPage = lazy(() => import("@/pages/agent/agent-apply-page"))
const AboutPage = lazy(() => import("@/pages/about/about-page"))
const ContactPage = lazy(() => import("@/pages/contact/contact-page"))
const NotFoundPage = lazy(() => import("@/pages/not-found-page"))

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route
          index
          element={
            <Suspense fallback={<RouteFallback />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="products"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ProductsPage />
            </Suspense>
          }
        />
        <Route
          path="products/:slug"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ProductDetailPage />
            </Suspense>
          }
        />
        <Route
          path="agent"
          element={
            <Suspense fallback={<RouteFallback />}>
              <AgentPage />
            </Suspense>
          }
        />
        <Route
          path="agent/apply"
          element={
            <Suspense fallback={<RouteFallback />}>
              <AgentApplyPage />
            </Suspense>
          }
        />
        <Route
          path="about"
          element={
            <Suspense fallback={<RouteFallback />}>
              <AboutPage />
            </Suspense>
          }
        />
        <Route
          path="contact"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ContactPage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<RouteFallback />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}
