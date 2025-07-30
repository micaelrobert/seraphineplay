"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, RotateCcw } from "lucide-react"
import Link from "next/link"
import { useAudio } from "@/hooks/use-audio"

export default function Age0to2Page() {
  const [currentGame, setCurrentGame] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1) // Added level state
  const { playNote, playSuccess, playSound } = useAudio()

  // Communication Panel Items - COMPLETE
  const communicationItems = [
    { id: "food", label: "Comida", color: "bg-red-400 hover:bg-red-500", sound: "Comida!", emoji: "🍎" },
    { id: "water", label: "Água", color: "bg-blue-400 hover:bg-blue-500", sound: "Água!", emoji: "💧" },
    { id: "sleep", label: "Dormir", color: "bg-purple-400 hover:bg-purple-500", sound: "Dormir!", emoji: "😴" },
    { id: "play", label: "Brincar", color: "bg-green-400 hover:bg-green-500", sound: "Brincar!", emoji: "🎮" },
    { id: "music", label: "Música", color: "bg-yellow-400 hover:bg-yellow-500", sound: "Música!", emoji: "🎵" },
    { id: "diaper", label: "Fralda", color: "bg-pink-400 hover:bg-pink-500", sound: "Fralda!", emoji: "👶" },
  ]

  // Peekaboo Game - COMPLETE
  const [mascotVisible, setMascotVisible] = useState(true)
  const [peekabooCount, setPeekabooCount] = useState(0)

  // Bubbles Game - COMPLETE
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([])
  const [bubblePopCount, setBubblePopCount] = useState(0)

  // Piano Game - COMPLETE
  const pianoKeys = [
    { note: "C", name: "Dó", color: "bg-red-400 hover:bg-red-500" },
    { note: "D", name: "Ré", color: "bg-orange-400 hover:bg-orange-500" },
    { note: "E", name: "Mi", color: "bg-yellow-400 hover:bg-yellow-500" },
    { note: "F", name: "Fá", color: "bg-green-400 hover:bg-green-500" },
    { note: "G", name: "Sol", color: "bg-blue-400 hover:bg-blue-500" },
    { note: "A", name: "Lá", color: "bg-indigo-400 hover:bg-indigo-500" },
    { note: "B", name: "Si", color: "bg-purple-400 hover:bg-purple-500" },
  ]

  // Contrast Shapes - COMPLETE
  const [currentShapeIndex, setCurrentShapeIndex] = useState(0)
  const contrastShapes = [
    { type: "circle", color: "black", element: <div className="w-32 h-32 bg-black rounded-full"></div> },
    { type: "square", color: "white", element: <div className="w-32 h-32 bg-white border-8 border-black"></div> },
    {
      type: "triangle",
      color: "black",
      element: (
        <div className="w-0 h-0 border-l-[64px] border-r-[64px] border-b-[128px] border-l-transparent border-r-transparent border-b-black"></div>
      ),
    },
    {
      type: "stripes",
      color: "black",
      element: <div className="w-32 h-32 bg-gradient-to-r from-black via-white to-black bg-[length:20px_100%]"></div>,
    },
    {
      type: "checkerboard",
      color: "black",
      element: (
        <div className="grid grid-cols-4 grid-rows-4 w-32 h-32">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className={`${(Math.floor(i / 4) + i) % 2 === 0 ? "bg-black" : "bg-white"}`}></div>
          ))}
        </div>
      ),
    },
  ]

  // COMPLETE: Peekaboo Game Logic
  const toggleMascot = () => {
    setMascotVisible(!mascotVisible)
    playSound(mascotVisible ? "Cadê?" : "Achou!")
    setScore((prev) => prev + 1)
    setPeekabooCount((prev) => prev + 1)

    if (peekabooCount >= 4 && level < 3) {
      setLevel((prev) => prev + 1)
      setPeekabooCount(0)
    }
  }

  // COMPLETE: Bubbles Game Logic
  const generateBubbles = () => {
    const colors = ["bg-pink-300", "bg-blue-300", "bg-green-300", "bg-yellow-300", "bg-purple-300", "bg-orange-300"]
    const numBubbles = level === 1 ? 5 : level === 2 ? 8 : 12
    const newBubbles = Array.from({ length: numBubbles }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 60 + 10,
      y: 100,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
    setBubbles(newBubbles)
    setBubblePopCount(0)
  }

  const popBubble = (id: number) => {
    setBubbles((prev) => prev.filter((bubble) => bubble.id !== id))
    playSuccess()
    setScore((prev) => prev + 1)
    setBubblePopCount((prev) => prev + 1)

    if (bubblePopCount + 1 >= (level === 1 ? 5 : level === 2 ? 8 : 12) && level < 3) {
      setTimeout(() => {
        setLevel((prev) => prev + 1)
        generateBubbles()
      }, 1000)
    }
  }

  // COMPLETE: Piano Game Logic
  const playPianoKey = (key: (typeof pianoKeys)[0]) => {
    playNote(key.note)
    playSound(key.name)
    setScore((prev) => prev + 1)
  }

  const playMelodyForPiano = () => {
    const melodies = [
      ["C", "D", "E", "F"], // Level 1
      ["C", "E", "G", "C"], // Level 2
      ["C", "D", "E", "F", "G", "A", "B", "C"], // Level 3
    ]
    const currentMelody = melodies[level - 1]
    currentMelody.forEach((note, index) => {
      setTimeout(() => playNote(note), index * 500)
    })
  }

  // COMPLETE: Contrast Shapes Logic
  const advanceShape = () => {
    setCurrentShapeIndex((prev) => (prev + 1) % contrastShapes.length)
  }

  // Auto-advance contrast shapes
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (currentGame === "contrast") {
      interval = setInterval(
        () => {
          advanceShape()
        },
        3000 - level * 500,
      ) // Faster for higher levels
    }
    return () => clearInterval(interval)
  }, [currentGame, level])

  // Auto-generate bubbles
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (currentGame === "bubbles") {
      generateBubbles() // Initial generation
      interval = setInterval(
        () => {
          setBubbles((prev) => {
            const colors = ["bg-pink-300", "bg-blue-300", "bg-green-300", "bg-yellow-300", "bg-purple-300"]
            const newBubble = {
              id: Date.now(),
              x: Math.random() * 60 + 10,
              y: 100,
              color: colors[Math.floor(Math.random() * colors.length)],
            }
            return [...prev, newBubble]
          })
        },
        2000 - level * 300,
      ) // Faster generation for higher levels
    }
    return () => clearInterval(interval)
  }, [currentGame, level])

  const games = [
    {
      id: "communication",
      title: "🗣️ Painel de Comunicação",
      description: "Toque nos botões para expressar necessidades",
      emoji: "🗣️",
      color: "bg-gradient-to-br from-red-400 to-pink-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Nível {level}/3</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {communicationItems.map((item) => (
              <motion.button
                key={item.id}
                className={`${item.color} text-white p-6 rounded-2xl shadow-lg transition-all duration-300 min-h-[120px] flex flex-col items-center justify-center`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playSound(item.sound)
                  setScore((prev) => prev + 1)
                }}
              >
                <div className="text-5xl mb-2">{item.emoji}</div>
                <p className="text-lg font-bold">{item.label}</p>
              </motion.button>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "peekaboo",
      title: "👀 Cadê o Achou?",
      description: "Toque na tela para brincar de esconde-esconde",
      emoji: "👀",
      color: "bg-gradient-to-br from-yellow-400 to-orange-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Nível {level}/3</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>
          <div className="flex items-center justify-center h-64">
            <motion.div
              className="cursor-pointer"
              onClick={toggleMascot}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {mascotVisible ? (
                  <motion.div
                    key="visible"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-40 h-40 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <span className="text-8xl">😊</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="hidden"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-40 h-40 bg-gray-200 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <span className="text-8xl">🙈</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      ),
    },
    {
      id: "bubbles",
      title: "🫧 Estoura Bolhas",
      description: "Toque nas bolhas para estourá-las",
      emoji: "🫧",
      color: "bg-gradient-to-br from-blue-400 to-cyan-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Nível {level}/3</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>
          <div className="relative h-80 bg-gradient-to-t from-blue-100 to-blue-50 rounded-lg overflow-hidden">
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <Button onClick={generateBubbles} size="sm" className="bg-blue-500 hover:bg-blue-600">
                🫧 Novas Bolhas
              </Button>
            </div>

            <AnimatePresence>
              {bubbles.map((bubble) => (
                <motion.div
                  key={bubble.id}
                  className={`absolute ${bubble.color} rounded-full cursor-pointer shadow-lg flex items-center justify-center text-white font-bold w-16 h-16`}
                  style={{
                    left: `${bubble.x}%`,
                    top: `${bubble.y}%`,
                  }}
                  initial={{ scale: 0, y: 0 }}
                  animate={{
                    scale: 1,
                    y: -300,
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    y: { duration: 4, ease: "linear" },
                    scale: { duration: 0.3 },
                  }}
                  onClick={() => popBubble(bubble.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <span className="text-xs">POP!</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      ),
    },
    {
      id: "piano",
      title: "🎹 Piano Sensorial",
      description: "Toque nas teclas coloridas para fazer música",
      emoji: "🎹",
      color: "bg-gradient-to-br from-purple-400 to-pink-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Nível {level}/3</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>
          <div className="flex justify-center gap-2 mb-6">
            {pianoKeys.map((key) => (
              <motion.button
                key={key.note}
                className={`${key.color} w-16 h-32 md:w-20 md:h-40 rounded-lg shadow-lg text-white font-bold text-xl`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playPianoKey(key)
                }}
              >
                <div className="text-2xl mb-1">{key.note}</div>
                <div className="text-xs">{key.name}</div>
              </motion.button>
            ))}
          </div>

          <div className="text-center">
            <Button onClick={playMelodyForPiano} className="bg-purple-500 hover:bg-purple-600 mb-4">
              🎵 Tocar Melodia
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: "contrast",
      title: "⚫ Alto Contraste",
      description: "Formas em preto e branco para estimular a visão",
      emoji: "⚫",
      color: "bg-gradient-to-br from-gray-400 to-gray-600",
      component: (
        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Nível {level}/3</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">
              Forma {currentShapeIndex + 1} de {contrastShapes.length}
            </div>
          </div>
          <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-lg">
            <motion.div
              key={currentShapeIndex}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center"
            >
              {contrastShapes[currentShapeIndex].element}
            </motion.div>
          </div>
          <div className="text-center mt-6">
            <Button onClick={advanceShape} variant="outline">
              Próxima Forma
            </Button>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 p-4">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <Link href="/">
          <Button variant="outline" size="sm" className="bg-white hover:bg-gray-50">
            <Home className="w-4 h-4 mr-2" />🏠 Início
          </Button>
        </Link>
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
            👶 O Mundo das Descobertas 👶
          </h1>
          <p className="text-gray-600 text-lg">0-2 anos • Primeiras Experiências</p>
        </div>
        <div className="w-20"></div>
      </header>

      {/* Game Selection */}
      {!currentGame && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 h-full ${game.color} border-0`}
                onClick={() => setCurrentGame(game.id)}
              >
                <CardHeader className="text-center">
                  <div className="text-6xl mb-4">{game.emoji}</div>
                  <CardTitle className="text-xl text-white font-bold">{game.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-white/90 text-lg font-medium mb-4">{game.description}</p>
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-bold text-center">
                    ✨ Brincar ✨
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Current Game */}
      {currentGame && (
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button
              onClick={() => setCurrentGame(null)}
              className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white"
            >
              ← 🎮 Voltar aos Jogos
            </Button>
            <h2 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
              {games.find((g) => g.id === currentGame)?.title}
            </h2>
            <Button
              onClick={() => {
                setScore(0)
                setLevel(1)
                if (currentGame === "bubbles") {
                  setBubblePopCount(0)
                  generateBubbles()
                }
                if (currentGame === "contrast") setCurrentShapeIndex(0)
                if (currentGame === "peekaboo") setMascotVisible(true)
              }}
              variant="outline"
              size="sm"
            >
              <RotateCcw className="w-4 h-4 mr-2" />🔄 Reiniciar
            </Button>
          </div>

          <Card className="bg-white shadow-xl border-0">
            <CardContent className="p-0">{games.find((g) => g.id === currentGame)?.component}</CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
