import type { Metadata, Viewport } from "next"
import { Anuphan, IBM_Plex_Sans_Thai } from "next/font/google"

import { ThemeProvider } from "@/components/site/theme-provider"
import { Toaster } from "@/components/ui/sonner"

import "./globals.css"

/**
 * Anuphan for display, IBM Plex Sans Thai for body (DESIGN-BRIEF section 4).
 * Both carry real Thai cuts. Kanit, Prompt, Sarabun and Noto Sans Thai are the
 * Thai equivalent of Inter and are banned as defaults on this project.
 */
const anuphan = Anuphan({
  subsets: ["thai", "latin"],
  weight: ["500", "600", "700"],
  variable: "--font-anuphan",
  display: "swap",
})

const plexThai = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-thai",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://arakbroker.example.com"),
  title: {
    default: "อารักษ์ โบรกเกอร์ | นายหน้าประกันภัยที่อยู่ข้างคุณ",
    template: "%s | อารักษ์ โบรกเกอร์",
  },
  description:
    "นายหน้าประกันวินาศภัยที่ได้รับใบอนุญาตจาก คปภ. เปรียบเทียบประกันรถยนต์ สุขภาพ อัคคีภัย และประกันธุรกิจ พร้อมทีมดูแลเคลมตลอดอายุกรมธรรม์",
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: "อารักษ์ โบรกเกอร์",
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f8fb" },
    { media: "(prefers-color-scheme: dark)", color: "#081524" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className={`${anuphan.variable} ${plexThai.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
