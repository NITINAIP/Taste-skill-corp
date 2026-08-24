import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

// Self-hosted type. Anuphan ships as a variable font with per-subset
// unicode-range, so the browser downloads the Thai cut only when it needs it.
import "@fontsource-variable/anuphan"
import "@fontsource/ibm-plex-sans-thai/thai-400.css"
import "@fontsource/ibm-plex-sans-thai/thai-500.css"
import "@fontsource/ibm-plex-sans-thai/thai-600.css"
import "@fontsource/ibm-plex-sans-thai/latin-400.css"
import "@fontsource/ibm-plex-sans-thai/latin-500.css"
import "@fontsource/ibm-plex-sans-thai/latin-600.css"

import "@/styles/globals.css"

import { App } from "@/App"

const container = document.getElementById("root")

if (!container) {
  throw new Error("Root element #root is missing from index.html")
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
)
