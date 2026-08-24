import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

import { List, X } from "@/components/icons"
import { Logo } from "@/components/common/logo"
import { ThemeToggle } from "@/components/common/theme-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { mainNav, quoteCta } from "@/lib/nav"
import { cn } from "@/lib/utils"

/**
 * One line at desktop, 72px tall. The taste-skill caps nav height at 80px and
 * bans a two-line desktop nav, so the Thai labels here are deliberately short:
 * "ประกันภัย" rather than "ผลิตภัณฑ์ประกันภัย", "ติดต่อเรา" rather than "ติดต่อสอบถาม".
 */
export function SiteHeader() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-[72px] items-center justify-between gap-6">
        <Link
          to="/"
          className="rounded-md focus-visible:outline-none"
          aria-label="อารักษ์ โบรกเกอร์ หน้าแรก"
        >
          <Logo />
        </Link>

        <nav aria-label="เมนูหลัก" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "inline-flex h-10 items-center rounded-md px-3 text-[0.9375rem] transition-colors",
                    isActive(item.href)
                      ? "font-medium text-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="brand" size="sm" className="hidden sm:inline-flex">
            <Link to={quoteCta.href}>{quoteCta.label}</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="เปิดเมนู">
                <List />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[19rem] p-0">
              <div className="flex h-[72px] items-center justify-between border-b border-border px-5">
                <Logo />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                  aria-label="ปิดเมนู"
                >
                  <X />
                </Button>
              </div>
              <SheetTitle className="sr-only">เมนูหลัก</SheetTitle>
              <nav aria-label="เมนูหลักบนมือถือ" className="px-3 py-4">
                <ul className="flex flex-col">
                  {mainNav.map((item) => (
                    <li key={item.href}>
                      <Link
                        to={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={cn(
                          "flex min-h-12 items-center rounded-md px-3 text-base transition-colors",
                          isActive(item.href)
                            ? "bg-accent font-medium text-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="brand" className="mt-4 w-full">
                  <Link to={quoteCta.href} onClick={() => setOpen(false)}>
                    {quoteCta.label}
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
