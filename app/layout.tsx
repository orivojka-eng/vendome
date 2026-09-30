import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "VENDÔME Paris — Haute Joaillerie | Made by QuolyTech",
  description:
    "Established in 1924 at Place Vendôme, Vendôme Maison de Haute Joaillerie defines the pinnacle of French high jewelry. Digital atelier platform made by QuolyTech.",
  generator: "QuolyTech",
  creator: "QuolyTech",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png?v=2",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png?v=2",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg?v=2",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png?v=2",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${montserrat.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
