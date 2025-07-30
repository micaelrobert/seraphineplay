"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, RotateCcw } from "lucide-react"
import Link from "next/link"
import { useAudio } from "@/hooks/use-audio"

export default function SciencePage() {
  const [currentGame, setCurrentGame] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const { playSuccess, playSound } = useAudio()

  // Float or Sink Game - COMPLETE
  const [waterLevel, setWaterLevel] = useState(50)
  const [floatingItems, setFloatingItems] = useState<string[]>([])
  const [sinkingItems, setSinkingItems] = useState<string[]>([])

  const allItems = [
    { name: "🪨 Pedra", floats: false },
    { name: "🪶 Pena", floats: true },
    { name: "🍎 Maçã", floats: true },
    { name: "🔑 Chave", floats: false },
    { name: "🧊 Gelo", floats: true },
    { name: "🪙 Moeda", floats: false },
    { name: "🏀 Bola", floats: true },
    { name: "📎 Clipe", floats: false },
    { name: "🪵 Madeira", floats: true },
    { name: "🔩 Parafuso", floats: false },
  ]

  // Food Chain Game - COMPLETE
  const [foodChainItems, setFoodChainItems] = useState([
    { id: 1, name: "🌱 Planta", level: 1, position: { x: 50, y: 200 } },
    { id: 2, name: "🐰 Coelho", level: 2, position: { x: 150, y: 200 } },
    { id: 3, name: "🦅 Águia", level: 3, position: { x: 250, y: 200 } },
    { id: 4, name: "☀️ Sol", level: 0, position: { x: 50, y: 100 } },
  ])
  const [chainComplete, setChainComplete] = useState(false)

  // Solar System Game - COMPLETE
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null)
  const planets = [
    { name: "Mercúrio", emoji: "☿️", distance: "Mais próximo do Sol", fact: "O planeta mais quente!" },
    { name: "Vênus", emoji: "♀️", distance: "2º planeta", fact: "Tem nuvens de ácido!" },
    { name: "Terra", emoji: "🌍", distance: "3º planeta", fact: "Nosso lar no espaço!" },
    { name: "Marte", emoji: "♂️", distance: "4º planeta", fact: "O planeta vermelho!" },
    { name: "Júpiter", emoji: "🪐", distance: "5º planeta", fact: "O maior planeta!" },
    { name: "Saturno", emoji: "🪐", distance: "6º planeta", fact: "Tem anéis lindos!" },
    { name: "Urano", emoji: "🌀", distance: "7º planeta", fact: "Gira de lado!" },
    { name: "Netuno", emoji: "🌊", distance: "8º planeta", fact: "Muito frio e ventoso!" },
  ]

  // Weather Game - COMPLETE
  const [currentWeather, setCurrentWeather] = useState("")
  const [weatherScore, setWeatherScore] = useState(0)
  const weatherTypes = [
    { type: "sunny", emoji: "☀️", name: "Ensolarado", description: "Céu limpo e sol brilhante" },
    { type: "rainy", emoji: "🌧️", name: "Chuvoso", description: "Chuva caindo do céu" },
    { type: "cloudy", emoji: "☁️", name: "Nublado", description: "Céu coberto de nuvens" },
    { type: "snowy", emoji: "❄️", name: "Nevando", description: "Flocos de neve caindo" },
    { type: "stormy", emoji: "⛈️", name: "Tempestade", description: "Raios e trovões" },
    { type: "windy", emoji: "🌬️", name: "Ventoso", description: "Vento forte" },
  ]

  // Body Parts Game - COMPLETE
  const [bodyPartChallenge, setBodyPartChallenge] = useState("")
  const [bodyPartScore, setBodyPartScore] = useState(0)
  const bodyParts = [
    { name: "Cabeça", emoji: "👤", function: "Onde fica o cérebro" },
    { name: "Olhos", emoji: "👀", function: "Para enxergar" },
    { name: "Ouvidos", emoji: "👂", function: "Para escutar" },
    { name: "Nariz", emoji: "👃", function: "Para cheirar" },
    { name: "Boca", emoji: "👄", function: "Para falar e comer" },
    { name: "Mãos", emoji: "✋", function: "Para pegar coisas" },
    { name: "Pés", emoji: "🦶", function: "Para caminhar" },
    { name: "Coração", emoji: "❤️", function: "Bombeia o sangue" },
    { name: "Estômago", emoji: "🍔", function: "Digere a comida" },
    { name: "Pulmões", emoji: "🌬️", function: "Para respirar" },
  ]

  // COMPLETE: Float or Sink Logic
  const getItemsForLevel = () => {
    if (level === 1) return allItems.slice(0, 4)
    if (level === 2) return allItems.slice(0, 7)
    return allItems
  }

  const testFloatSink = (itemName: string, shouldFloat: boolean) => {
    const item = allItems.find((i) => i.name === itemName)
    if (!item) return

    if (item.floats === shouldFloat) {
      if (shouldFloat) {
        setFloatingItems((prev) => [...prev, itemName])
      } else {
        setSinkingItems((prev) => [...prev, itemName])
      }
      playSuccess()
      setScore((prev) => prev + level * 10)

      const currentLevelItems = getItemsForLevel()
      const remainingItems = currentLevelItems.filter(
        (i) => !floatingItems.includes(i.name) && !sinkingItems.includes(i.name),
      )
      if (remainingItems.length === 1 && level < 3) {
        setTimeout(() => {
          setLevel((prev) => prev + 1)
          setFloatingItems([])
          setSinkingItems([])
        }, 2000)
      }
    } else {
      playSound(200, 300)
    }
  }

  // COMPLETE: Food Chain Logic
  const initializeFoodChain = () => {
    const chains = [
      // Level 1: Sun -> Plant -> Rabbit -> Eagle
      [
        { id: 1, name: "🌱 Planta", level: 1, position: { x: 50, y: 200 } },
        { id: 2, name: "🐰 Coelho", level: 2, position: { x: 150, y: 200 } },
        { id: 3, name: "🦅 Águia", level: 3, position: { x: 250, y: 200 } },
        { id: 4, name: "☀️ Sol", level: 0, position: { x: 50, y: 100 } },
      ],
      // Level 2: Sun -> Grass -> Cow -> Human
      [
        { id: 1, name: "🌿 Grama", level: 1, position: { x: 50, y: 200 } },
        { id: 2, name: "🐄 Vaca", level: 2, position: { x: 150, y: 200 } },
        { id: 3, name: "👨‍👩‍👧 Humano", level: 3, position: { x: 250, y: 200 } },
        { id: 4, name: "☀️ Sol", level: 0, position: { x: 50, y: 100 } },
      ],
      // Level 3: Sun -> Algae -> Fish -> Bear
      [
        { id: 1, name: "🦠 Alga", level: 1, position: { x: 50, y: 200 } },
        { id: 2, name: "🐟 Peixe", level: 2, position: { x: 150, y: 200 } },
        { id: 3, name: "🐻 Urso", level: 3, position: { x: 250, y: 200 } },
        { id: 4, name: "☀️ Sol", level: 0, position: { x: 50, y: 100 } },
      ],
    ]
    setFoodChainItems(chains[level - 1])
    setChainComplete(false)
  }

  const checkFoodChainOrder = () => {
    const sortedByX = [...foodChainItems].sort((a, b) => a.position.x - b.position.x)
    const correctOrder = [0, 1, 2, 3] // Sun, Producer, Primary Consumer, Secondary Consumer
    const currentOrder = sortedByX.map((item) => item.level)

    if (JSON.stringify(currentOrder) === JSON.stringify(correctOrder)) {
      setChainComplete(true)
      playSuccess()
      setScore((prev) => prev + level * 25)

      if (level < 3) {
        setTimeout(() => {
          setLevel((prev) => prev + 1)
          initializeFoodChain()
        }, 2000)
      }
    } else {
      playSound(200, 300)
    }
  }

  // COMPLETE: Weather Game Logic
  const generateWeatherChallenge = () => {
    const levelWeatherTypes =
      level === 1 ? weatherTypes.slice(0, 3) : level === 2 ? weatherTypes.slice(0, 5) : weatherTypes
    const randomWeather = levelWeatherTypes[Math.floor(Math.random() * levelWeatherTypes.length)]
    setCurrentWeather(randomWeather.type)
  }

  const checkWeatherAnswer = (selectedType: string) => {
    if (selectedType === currentWeather) {
      playSuccess()
      setWeatherScore((prev) => prev + 1)
      setScore((prev) => prev + level * 15)

      if (weatherScore >= 2 && level < 3) {
        setTimeout(() => {
          setLevel((prev) => prev + 1)
          setWeatherScore(0)
          generateWeatherChallenge()
        }, 1000)
      } else {
        setTimeout(() => generateWeatherChallenge(), 1000)
      }
    } else {
      playSound(200, 300)
    }
  }

  // COMPLETE: Body Parts Game Logic
  const generateBodyPartChallenge = () => {
    const levelBodyParts = level === 1 ? bodyParts.slice(0, 5) : level === 2 ? bodyParts.slice(0, 8) : bodyParts
    const randomPart = levelBodyParts[Math.floor(Math.random() * levelBodyParts.length)]
    setBodyPartChallenge(randomPart.function)
  }

  const checkBodyPartAnswer = (partName: string) => {
    const correctPart = bodyParts.find((part) => part.function === bodyPartChallenge)
    if (correctPart && correctPart.name === partName) {
      playSuccess()
      setBodyPartScore((prev) => prev + 1)
      setScore((prev) => prev + level * 15)

      if (bodyPartScore >= 2 && level < 3) {
        setTimeout(() => {
          setLevel((prev) => prev + 1)
          setBodyPartScore(0)
          generateBodyPartChallenge()
        }, 1000)
      } else {
        setTimeout(() => generateBodyPartChallenge(), 1000)
      }
    } else {
      playSound(200, 300)
    }
  }

  // Initialize games
  useEffect(() => {
    if (currentGame === "weather") {
      generateWeatherChallenge()
    } else if (currentGame === "body") {
      generateBodyPartChallenge()
    } else if (currentGame === "float") {
      setFloatingItems([])
      setSinkingItems([])
    } else if (currentGame === "foodchain") {
      initializeFoodChain()
    }
  }, [currentGame, level])

  const games = [
    {
      id: "float",
      title: "🌊 Flutua ou Afunda?",
      description: "Descubra quais objetos flutuam na água!",
      emoji: "🌊",
      color: "bg-gradient-to-br from-blue-400 to-cyan-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Nível {level}/3</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Water Tank */}
            <div className="bg-blue-100 p-4 rounded-lg">
              <h4 className="font-bold mb-4 text-center">🌊 Tanque de Água</h4>
              <div className="relative h-64 bg-blue-300 rounded-lg overflow-hidden">
                {/* Water level */}
                <div
                  className="absolute bottom-0 left-0 right-0 bg-blue-500 transition-all duration-500"
                  style={{ height: `${waterLevel}%` }}
                />

                {/* Floating items */}
                {floatingItems.map((item, index) => (
                  <motion.div
                    key={`float-${item}`}
                    className="absolute text-2xl"
                    style={{
                      left: `${20 + index * 15}%`,
                      top: `${45 - waterLevel * 0.3}%`,
                    }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {item.split(" ")[0]}
                  </motion.div>
                ))}

                {/* Sinking items */}
                {sinkingItems.map((item, index) => (
                  <motion.div
                    key={`sink-${item}`}
                    className="absolute text-2xl bottom-2"
                    style={{ left: `${60 + index * 15}%` }}
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    {item.split(" ")[0]}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Items to test */}
            <div>
              <h4 className="font-bold mb-4">Objetos para Testar</h4>
              <div className="grid grid-cols-2 gap-3">
                {getItemsForLevel()
                  .filter((item) => !floatingItems.includes(item.name) && !sinkingItems.includes(item.name))
                  .map((item) => (
                    <div key={item.name} className="text-center">
                      <div className="text-4xl mb-2">{item.name.split(" ")[0]}</div>
                      <div className="text-sm mb-2">{item.name.split(" ").slice(1).join(" ")}</div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          onClick={() => testFloatSink(item.name, true)}
                          className="bg-blue-500 hover:bg-blue-600"
                        >
                          Flutua
                        </Button>
                        <Button size="sm" onClick={() => testFloatSink(item.name, false)} variant="outline">
                          Afunda
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "foodchain",
      title: "🌿 Monte a Cadeia Alimentar",
      description: "Organize os seres vivos na ordem correta!",
      emoji: "🌿",
      color: "bg-gradient-to-br from-green-400 to-emerald-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Nível {level}/3</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>

          {chainComplete && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center mb-6 p-4 bg-green-500 text-white rounded-xl"
            >
              <div className="text-4xl mb-2">🎉</div>
              <div className="text-2xl font-bold">Cadeia Alimentar Completa!</div>
            </motion.div>
          )}

          <div className="relative h-80 bg-green-50 rounded-lg mb-6 overflow-hidden">
            {/* Background elements */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-green-200"></div>
            <div className="absolute top-4 right-4 text-6xl">☀️</div>

            {/* Food chain items */}
            {foodChainItems.map((item) => (
              <motion.div
                key={item.id}
                className="absolute cursor-pointer bg-white p-2 rounded-lg shadow-lg"
                style={{ left: item.position.x, top: item.position.y }}
                drag
                dragMomentum={false}
                whileDrag={{ scale: 1.1, zIndex: 10 }}
                onDragEnd={(event, info) => {
                  const newItems = [...foodChainItems]
                  const itemIndex = newItems.findIndex((i) => i.id === item.id)
                  newItems[itemIndex].position = { x: info.point.x, y: info.point.y }
                  setFoodChainItems(newItems)
                  checkFoodChainOrder()
                }}
              >
                <div className="text-2xl text-center">{item.name}</div>
              </motion.div>
            ))}

            {/* Arrows showing flow */}
            {chainComplete && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#10B981" />
                  </marker>
                </defs>
                <line
                  x1="100"
                  y1="120"
                  x2="140"
                  y2="120"
                  stroke="#10B981"
                  strokeWidth="3"
                  markerEnd="url(#arrowhead)"
                />
                <line
                  x1="200"
                  y1="220"
                  x2="240"
                  y2="220"
                  stroke="#10B981"
                  strokeWidth="3"
                  markerEnd="url(#arrowhead)"
                />
                <line
                  x1="300"
                  y1="220"
                  x2="340"
                  y2="220"
                  stroke="#10B981"
                  strokeWidth="3"
                  markerEnd="url(#arrowhead)"
                />
              </svg>
            )}
          </div>

          <div className="text-center">
            <Button onClick={initializeFoodChain} variant="outline">
              Reiniciar
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: "solar",
      title: "🪐 Sistema Solar Interativo",
      description: "Explore os planetas do nosso sistema solar!",
      emoji: "🪐",
      color: "bg-gradient-to-br from-purple-400 to-violet-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Nível {level}/3</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>
          <div className="relative h-80 bg-black rounded-lg mb-6 overflow-hidden">
            {/* Sun */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-6xl">☀️</div>

            {/* Planets */}
            {planets.slice(0, level * 3).map((planet, index) => (
              <motion.button
                key={planet.name}
                className={`absolute text-3xl hover:scale-125 transition-transform ${
                  selectedPlanet === planet.name ? "scale-150" : ""
                }`}
                style={{
                  left: `${120 + index * 35}px`,
                  top: `${140 + Math.sin(index) * 20}px`,
                }}
                onClick={() => {
                  setSelectedPlanet(planet.name)
                  setScore((prev) => prev + 5)
                }}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 10 + index * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                {planet.emoji}
              </motion.button>
            ))}

            {/* Stars */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-yellow-300"
                style={{
                  left: `${Math.random() * 90}%`,
                  top: `${Math.random() * 90}%`,
                }}
              >
                ✨
              </div>
            ))}
          </div>

          {/* Planet info */}
          {selectedPlanet && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-100 p-4 rounded-lg text-center"
            >
              <div className="text-4xl mb-2">{planets.find((p) => p.name === selectedPlanet)?.emoji}</div>
              <h3 className="text-2xl font-bold mb-2">{selectedPlanet}</h3>
              <p className="text-gray-600 mb-2">{planets.find((p) => p.name === selectedPlanet)?.distance}</p>
              <p className="text-lg font-semibold text-blue-600">
                {planets.find((p) => p.name === selectedPlanet)?.fact}
              </p>
            </motion.div>
          )}

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">Clique nos planetas para aprender sobre eles!</p>
          </div>
        </div>
      ),
    },
    {
      id: "weather",
      title: "☀️ Qual é o Clima?",
      description: "Identifique diferentes tipos de clima!",
      emoji: "☀️",
      color: "bg-gradient-to-br from-yellow-400 to-orange-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Nível {level}/3</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Acertos: {weatherScore}</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Que tipo de clima é este?</h3>
            <div className="text-8xl mb-4">{weatherTypes.find((w) => w.type === currentWeather)?.emoji}</div>
            <p className="text-lg text-gray-600 mb-4">
              {weatherTypes.find((w) => w.type === currentWeather)?.description}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-md mx-auto mb-6">
            {(level === 1 ? weatherTypes.slice(0, 3) : level === 2 ? weatherTypes.slice(0, 5) : weatherTypes).map(
              (weather) => (
                <motion.button
                  key={weather.type}
                  className="p-4 bg-blue-100 hover:bg-blue-200 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => checkWeatherAnswer(weather.type)}
                >
                  <div className="text-3xl mb-2">{weather.emoji}</div>
                  <div className="text-sm font-semibold">{weather.name}</div>
                </motion.button>
              ),
            )}
          </div>
        </div>
      ),
    },
    {
      id: "body",
      title: "🧍 Partes do Corpo",
      description: "Aprenda sobre as funções do corpo humano!",
      emoji: "🧍",
      color: "bg-gradient-to-br from-pink-400 to-rose-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Nível {level}/3</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Acertos: {bodyPartScore}</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Qual parte do corpo:</h3>
            <div className="text-xl bg-blue-100 p-4 rounded-lg mb-6">{bodyPartChallenge}</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-6">
            {(level === 1 ? bodyParts.slice(0, 5) : level === 2 ? bodyParts.slice(0, 8) : bodyParts).map((part) => (
              <motion.button
                key={part.name}
                className="p-4 bg-pink-100 hover:bg-pink-200 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => checkBodyPartAnswer(part.name)}
              >
                <div className="text-3xl mb-2">{part.emoji}</div>
                <div className="text-sm font-semibold">{part.name}</div>
              </motion.button>
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <Button onClick={generateBodyPartChallenge} variant="outline">
              Nova Pergunta
            </Button>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-green-50 p-4">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <Link href="/">
          <Button variant="outline" size="sm" className="bg-white hover:bg-gray-50">
            <Home className="w-4 h-4 mr-2" />🏠 Início
          </Button>
        </Link>
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
            🔬 Pequenos Cientistas 🔬
          </h1>
          <p className="text-gray-600 text-lg">Descobrindo o mundo da ciência</p>
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
                    ✨ Explorar! ✨
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Current Game */}
      {currentGame && (
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button
              onClick={() => setCurrentGame(null)}
              className="bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white"
            >
              ← 🎮 Voltar aos Jogos
            </Button>
            <h2 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
              {games.find((g) => g.id === currentGame)?.title}
            </h2>
            <Button
              onClick={() => {
                setScore(0)
                setLevel(1)
                if (currentGame === "weather") {
                  setWeatherScore(0)
                  generateWeatherChallenge()
                }
                if (currentGame === "body") {
                  setBodyPartScore(0)
                  generateBodyPartChallenge()
                }
                if (currentGame === "float") {
                  setFloatingItems([])
                  setSinkingItems([])
                }
                if (currentGame === "foodchain") {
                  initializeFoodChain()
                }
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
