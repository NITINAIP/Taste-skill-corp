"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Moon, Sun } from "@/components/icons"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  // Before hydration the resolved theme is unknown. Render the same box so the
  // header does not reflow, but keep it inert and hidden from assistive tech.
  if (!mounted) {
    return <div className="size-11" aria-hidden />
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "เปลี่ยนเป็นโหมดสว่าง" : "เปลี่ยนเป็นโหมดมืด"}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  )
}
