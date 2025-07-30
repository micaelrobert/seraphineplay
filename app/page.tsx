"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Baby, Gamepad2, Globe, Music, Users, Sparkles, Brain, Beaker } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [mascotAnimation, setMascotAnimation] = useState("idle")

  const ageGroups = [
    {
      id: "0-2",
      title: "O Mundo das Descobertas",
      subtitle: "0-2 anos",
      icon: Baby,
      color: "bg-gradient-to-br from-pink-400 to-rose-500",
      textColor: "text-white",
      description: "Causa e efeito, estimulação sensorial",
      emoji: "👶",
    },
    {
      id: "3-5",
      title: "Exploradores Lógicos",
      subtitle: "3-5 anos",
      icon: Gamepad2,
      color: "bg-gradient-to-br from-blue-400 to-cyan-500",
      textColor: "text-white",
      description: "Padrões, classificação, contagem",
      emoji: "🧩",
    },
    {
      id: "6-8",
      title: "Mestres dos Desafios",
      subtitle: "6-8 anos",
      icon: Brain,
      color: "bg-gradient-to-br from-green-400 to-emerald-500",
      textColor: "text-white",
      description: "Lógica de múltiplos passos",
      emoji: "🧠",
    },
    {
      id: "9-12",
      title: "Gênios em Treinamento",
      subtitle: "9-12 anos",
      icon: Sparkles,
      color: "bg-gradient-to-br from-purple-400 to-violet-500",
      textColor: "text-white",
      description: "Pensamento abstrato e estratégia",
      emoji: "⚡",
    },
  ]

  const thematicCategories = [
    {
      id: "english",
      title: "Inglês com Seraphine",
      icon: Globe,
      color: "bg-gradient-to-br from-orange-400 to-red-500",
      textColor: "text-white",
      emoji: "🌍",
    },
    {
      id: "science",
      title: "Pequenos Cientistas",
      icon: Beaker,
      color: "bg-gradient-to-br from-teal-400 to-cyan-500",
      textColor: "text-white",
      emoji: "🔬",
    },
    {
      id: "music",
      title: "Musicalização Infantil",
      icon: Music,
      color: "bg-gradient-to-br from-indigo-400 to-purple-500",
      textColor: "text-white",
      emoji: "🎵",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="p-6 text-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
            ✨ Seraphineplay ✨
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 font-semibold">🌟 A Jornada de uma Gênio 🌟</p>
        </motion.div>
      </header>

      {/* Mascot Section */}
      <section className="text-center py-8">
        <motion.div
          className="inline-block cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setMascotAnimation(mascotAnimation === "idle" ? "excited" : "idle")}
        >
          <div className="w-40 h-40 md:w-56 md:h-56 mx-auto bg-gradient-to-br from-yellow-300 via-orange-300 to-pink-300 rounded-full flex items-center justify-center shadow-2xl border-8 border-white">
            <motion.div
              animate={mascotAnimation === "excited" ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="w-20 h-20 md:w-28 md:h-28 text-white drop-shadow-lg" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            🌈 Olá, Seraphine! 🌈
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 font-medium">✨ Pronta para aprender brincando? ✨</p>
        </motion.div>
      </section>

      {/* Age Groups */}
      <section className="px-4 py-8 max-w-7xl mx-auto">
        <motion.h3
          className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          🎯 Escolha sua Aventura Mágica 🎯
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ageGroups.map((group, index) => {
            const IconComponent = group.icon
            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Link href={`/age/${group.id}`}>
                  <Card
                    className={`${group.color} border-0 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl group`}
                  >
                    <CardContent className="p-8 text-center">
                      <div className="text-6xl mb-4">{group.emoji}</div>
                      <IconComponent className={`w-8 h-8 ${group.textColor} mx-auto mb-4 opacity-80`} />
                      <h4 className={`text-xl font-bold ${group.textColor} mb-3`}>{group.title}</h4>
                      <p className={`text-sm ${group.textColor} opacity-90 mb-3 font-medium`}>{group.subtitle}</p>
                      <p className={`text-xs ${group.textColor} opacity-80 font-medium`}>{group.description}</p>
                      <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white font-bold">
                        ✨ Explorar ✨
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Thematic Categories */}
      <section className="px-4 py-8 max-w-5xl mx-auto">
        <motion.h3
          className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          🌟 Categorias Especiais 🌟
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {thematicCategories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                <Link href={`/category/${category.id}`}>
                  <Card
                    className={`${category.color} border-0 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                  >
                    <CardContent className="p-8 text-center">
                      <div className="text-6xl mb-4">{category.emoji}</div>
                      <IconComponent className={`w-8 h-8 ${category.textColor} mx-auto mb-4 opacity-80`} />
                      <h4 className={`text-xl font-bold ${category.textColor}`}>{category.title}</h4>
                      <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white font-bold">
                        🎮 Jogar Agora 🎮
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Parents Section */}
      <section className="px-4 py-12 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          <Link href="/parents">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xl px-8 py-4 shadow-xl border-0"
            >
              <Users className="w-6 h-6 mr-3" />
              👨‍👩‍👧‍👦 Informações para os Pais 👨‍👩‍👧‍👦
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
