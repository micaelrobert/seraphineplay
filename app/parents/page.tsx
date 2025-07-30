"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Heart, Brain, Users, Target } from "lucide-react"
import Link from "next/link"

export default function ParentsPage() {
  const philosophyPoints = [
    {
      icon: Brain,
      title: "Desenvolvimento Cognitivo",
      description:
        "Cada jogo é cuidadosamente projetado para estimular diferentes áreas do desenvolvimento cognitivo, desde a percepção sensorial até o raciocínio lógico complexo.",
    },
    {
      icon: Heart,
      title: "Aprendizado Afetivo",
      description:
        "Priorizamos um ambiente seguro e acolhedor onde a criança se sente confiante para explorar, errar e aprender sem pressão.",
    },
    {
      icon: Target,
      title: "Objetivos Claros",
      description:
        "Cada atividade tem objetivos pedagógicos específicos, alinhados com marcos de desenvolvimento infantil reconhecidos internacionalmente.",
    },
    {
      icon: Users,
      title: "Interação Familiar",
      description:
        "Encorajamos a participação dos pais como mediadores do aprendizado, fortalecendo vínculos familiares através da brincadeira.",
    },
  ]

  const ageGroups = [
    {
      age: "0-2 anos",
      title: "O Mundo das Descobertas",
      objectives: [
        "Estimulação sensorial através de cores, sons e texturas",
        "Desenvolvimento da coordenação motora básica",
        "Compreensão de causa e efeito",
        "Introdução à comunicação funcional",
        "Fortalecimento do vínculo afetivo",
      ],
      tips: [
        "Sente-se ao lado da criança e participe ativamente",
        "Repita as palavras em voz alta junto com os sons",
        "Celebre cada interação com entusiasmo",
        "Mantenha sessões curtas (5-10 minutos)",
      ],
    },
    {
      age: "3-5 anos",
      title: "Exploradores Lógicos",
      objectives: [
        "Reconhecimento de padrões e sequências",
        "Desenvolvimento da memória de trabalho",
        "Classificação e categorização",
        "Coordenação motora fina",
        "Introdução ao pensamento lógico",
      ],
      tips: [
        'Faça perguntas abertas: "O que você acha que vem depois?"',
        "Elogie o processo, não apenas o resultado",
        "Conecte os jogos com situações do dia a dia",
        "Permita que a criança explique seu raciocínio",
      ],
    },
    {
      age: "6-8 anos",
      title: "Mestres dos Desafios",
      objectives: [
        "Pensamento sequencial e planejamento",
        "Resolução de problemas de múltiplos passos",
        "Introdução ao pensamento computacional",
        "Desenvolvimento da persistência",
        "Raciocínio espacial",
      ],
      tips: [
        "Encoraje a criança a explicar sua estratégia",
        "Ajude a quebrar problemas complexos em partes menores",
        "Celebre tentativas, mesmo quando não bem-sucedidas",
        "Conecte conceitos com aplicações do mundo real",
      ],
    },
    {
      age: "9-12 anos",
      title: "Gênios em Treinamento",
      objectives: [
        "Pensamento abstrato e estratégico",
        "Análise de múltiplas variáveis",
        "Desenvolvimento do raciocínio dedutivo",
        "Planejamento de longo prazo",
        "Metacognição (pensar sobre o pensamento)",
      ],
      tips: [
        "Discuta diferentes estratégias possíveis",
        "Incentive a criança a ensinar você como jogar",
        "Explore conexões com outras áreas do conhecimento",
        "Promova reflexão sobre o próprio aprendizado",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <Link href="/">
          <Button variant="outline" size="sm" className="bg-white hover:bg-gray-50">
            <Home className="w-4 h-4 mr-2" />🏠 Início
          </Button>
        </Link>
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            👨‍👩‍👧‍👦 Informações para os Pais 👨‍👩‍👧‍👦
          </h1>
          <p className="text-gray-600 mt-2">Entenda a filosofia e os objetivos do Seraphineplay</p>
        </div>
        <div className="w-20"></div>
      </header>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Philosophy Section */}
        <section>
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            🌟 Nossa Filosofia Pedagógica 🌟
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {philosophyPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-white to-gray-50">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <point.icon className="w-8 h-8 text-purple-600" />
                      <CardTitle className="text-lg text-gray-800">{point.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">{point.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Age Groups Section */}
        <section>
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            🎯 Objetivos por Faixa Etária 🎯
          </motion.h2>

          <div className="space-y-8">
            {ageGroups.map((group, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <Card className="overflow-hidden bg-gradient-to-br from-white to-gray-50">
                  <CardHeader className="bg-gradient-to-r from-purple-100 to-blue-100">
                    <CardTitle className="text-xl text-gray-800">
                      {group.age} - {group.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          🎯 Objetivos de Desenvolvimento:
                        </h4>
                        <ul className="space-y-2">
                          {group.objectives.map((objective, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-600">
                              <span className="text-purple-500 mt-1">•</span>
                              {objective}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          💡 Dicas para os Pais:
                        </h4>
                        <ul className="space-y-2">
                          {group.tips.map((tip, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-600">
                              <span className="text-blue-500 mt-1">•</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="text-center py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card className="bg-gradient-to-r from-purple-100 to-blue-100 border-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">💌 Dúvidas ou Sugestões?</h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  O Seraphineplay é um projeto em constante evolução. Sua opinião e feedback são fundamentais para
                  criarmos a melhor experiência educativa para sua criança.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                    📧 Enviar Feedback
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white">
                    💬 Sugerir Novos Jogos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>
      </div>
    </div>
  )
}
