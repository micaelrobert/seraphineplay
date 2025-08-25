import type React from "react"
import type { Metadata } from "next"
// Importando a nova fonte do Google Fonts
import { Inter, Lilita_One } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/layout/navbar"
import { cn } from "@/lib/utils" // Importe o cn para mesclar classes

// Configuração da fonte Inter para o corpo do texto
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter', // Criando uma variável para a fonte Inter
})

// Configuração da nova fonte Lilita One para os títulos
const lilitaOne = Lilita_One({
  subsets: ["latin"],
  weight: "400",
  variable: '--font-lilita-one', // Criando uma variável para a nova fonte
})

export const metadata: Metadata = {
  title: "Seraphineplay - A Jornada de uma Gênio",
  description:
    "Plataforma educativa para desenvolvimento cognitivo, lógico e criativo. Jogos interativos para crianças de 0 a 12 anos.",
  keywords: "educação infantil, jogos educativos, desenvolvimento cognitivo, aprendizado, crianças",
  authors: [{ name: "Seraphineplay Team" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      {/* Aplicando as variáveis das fontes na tag body */}
      <body className={cn(inter.variable, lilitaOne.variable, "font-sans")}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}