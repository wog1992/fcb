import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import FloatingCustomerCare from "@/components/floating-customer-care"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FCB VIP Intern2Days",
  description: "Investment and task management platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <FloatingCustomerCare />
        </ThemeProvider>
      </body>
    </html>
  )
}
