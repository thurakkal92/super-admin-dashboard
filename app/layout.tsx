import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { QueryProvider } from "@/lib/query-client"
import { AuthProvider } from "@/contexts/auth-context"
import { AppProvider } from "@/contexts/app-context"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "KI Cockpit - Super Admin Dashboard",
  description: "Super Admin Dashboard for KI Cockpit",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <AuthProvider>
            <AppProvider>
              {children}
              <Toaster />
            </AppProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
