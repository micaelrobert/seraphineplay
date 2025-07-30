import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Seraphineplay - A Jornada de uma Gênio",
  description:
    "Plataforma educativa para desenvolvimento cognitivo, lógico e criativo. Jogos interativos para crianças de 0 a 12 anos.",
  keywords: "educação infantil, jogos educativos, desenvolvimento cognitivo, aprendizado, crianças",
  authors: [{ name: "Seraphineplay Team" }],
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
