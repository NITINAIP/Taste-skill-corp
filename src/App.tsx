import { BrowserRouter } from "react-router-dom"

import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/providers/theme-provider"
import { AppRoutes } from "@/routes"

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AppRoutes />
        <Toaster position="top-center" />
      </BrowserRouter>
    </ThemeProvider>
  )
}
