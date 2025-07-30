"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, RotateCcw } from "lucide-react"
import Link from "next/link"
import { useAudio } from "@/hooks/use-audio"

export default function Age3to5Page() {
  const [currentGame, setCurrentGame] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1) // Added level state
  const { playSuccess, playSound } = useAudio()

  // Puzzle Game State - COMPLETE
  const [puzzlePieces, setPuzzlePieces] = useState([
    { id: 1, position: { x: 50, y: 50 }, correctPosition: { x: 200, y: 150 }, placed: false, emoji: "🔴" },
    { id: 2, position: { x: 120, y: 50 }, correctPosition: { x: 300, y: 150 }, placed: false, emoji: "🔵" },
    { id: 3, position: { x: 190, y: 50 }, correctPosition: { x: 200, y: 250 }, placed: false, emoji: "🟢" },
    { id: 4, position: { x: 260, y: 50 }, correctPosition: { x: 300, y: 250 }, placed: false, emoji: "🟡" },
  ])
  const [puzzleComplete, setPuzzleComplete] = useState(false)

  // Memory Game State - COMPLETE
  const [memoryCards, setMemoryCards] = useState<
    Array<{ id: number; symbol: string; flipped: boolean; matched: boolean }>
  >([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [memoryComplete, setMemoryComplete] = useState(false)

  // Shape Matching Game - COMPLETE
  const [matchedShapes, setMatchedShapes] = useState<string[]>([])
  const [selectedShape, setSelectedShape] = useState<string | null>(null)

  const allShapes = [
    { id: "circle", symbol: "🔴", name: "Círculo Vermelho" },
    { id: "square", symbol: "🟦", name: "Quadrado Azul" },
    { id: "triangle", symbol: "🔺", name: "Triângulo Verde" },
    { id: "star", symbol: "⭐", name: "Estrela Amarela" },
    { id: "heart", symbol: "❤️", name: "Coração Rosa" },
    { id: "diamond", symbol: "💎", name: "Diamante Azul" },
  ]

  // Sequence Game - COMPLETE
  const [currentSequence, setCurrentSequence] = useState<string[]>([])
  const [userSequence, setUserSequence] = useState<string[]>([])
  const [showingSequence, setShowingSequence] = useState(false)

  // Different Game - COMPLETE
  const [differentItems, setDifferentItems] = useState<Array<{ id: number; symbol: string; isDifferent: boolean }>>([])
  const [differentFound, setDifferentFound] = useState(false)

  // Dress Up Game - COMPLETE
  const [mascotOutfit, setMascotOutfit] = useState({ hat: "", shirt: "", shoes: "" })
  const outfitOptions = {
    hat: ["🎩", "👑", "🧢", "🎓"],
    shirt: ["👕", "👔", "🦺", "👗"],
    shoes: ["👟", "👠", "🥾", "🩴"],
  }

  // COMPLETE: Puzzle Logic
  const initializePuzzle = () => {
    const puzzles = [
      // Level 1: 4 pieces
      [
        { id: 1, position: { x: 50, y: 50 }, correctPosition: { x: 200, y: 150 }, placed: false, emoji: "🔴" },
        { id: 2, position: { x: 120, y: 50 }, correctPosition: { x: 300, y: 150 }, placed: false, emoji: "🔵" },
        { id: 3, position: { x: 190, y: 50 }, correctPosition: { x: 200, y: 250 }, placed: false, emoji: "🟢" },
        { id: 4, position: { x: 260, y: 50 }, correctPosition: { x: 300, y: 250 }, placed: false, emoji: "🟡" },
      ],
      // Level 2: 6 pieces
      [
        { id: 1, position: { x: 50, y: 50 }, correctPosition: { x: 150, y: 100 }, placed: false, emoji: "🍎" },
        { id: 2, position: { x: 120, y: 50 }, correctPosition: { x: 250, y: 100 }, placed: false, emoji: "🍊" },
        { id: 3, position: { x: 190, y: 50 }, correctPosition: { x: 350, y: 100 }, placed: false, emoji: "🍌" },
        { id: 4, position: { x: 50, y: 120 }, correctPosition: { x: 150, y: 200 }, placed: false, emoji: "🍇" },
        { id: 5, position: { x: 120, y: 120 }, correctPosition: { x: 250, y: 200 }, placed: false, emoji: "🍓" },
        { id: 6, position: { x: 190, y: 120 }, correctPosition: { x: 350, y: 200 }, placed: false, emoji: "🥝" },
      ],
      // Level 3: 9 pieces
      [
        { id: 1, position: { x: 50, y: 50 }, correctPosition: { x: 100, y: 100 }, placed: false, emoji: "🏠" },
        { id: 2, position: { x: 120, y: 50 }, correctPosition: { x: 200, y: 100 }, placed: false, emoji: "🌳" },
        { id: 3, position: { x: 190, y: 50 }, correctPosition: { x: 300, y: 100 }, placed: false, emoji: "☀️" },
        { id: 4, position: { x: 50, y: 120 }, correctPosition: { x: 100, y: 200 }, placed: false, emoji: "☁️" },
        { id: 5, position: { x: 120, y: 120 }, correctPosition: { x: 200, y: 200 }, placed: false, emoji: "🌈" },
        { id: 6, position: { x: 190, y: 120 }, correctPosition: { x: 300, y: 200 }, placed: false, emoji: "🌸" },
        { id: 7, position: { x: 50, y: 190 }, correctPosition: { x: 100, y: 300 }, placed: false, emoji: "🦋" },
        { id: 8, position: { x: 120, y: 190 }, correctPosition: { x: 200, y: 300 }, placed: false, emoji: "🐦" },
        { id: 9, position: { x: 190, y: 190 }, correctPosition: { x: 300, y: 300 }, placed: false, emoji: "🌼" },
      ],
    ]
    setPuzzlePieces(puzzles[level - 1])
    setPuzzleComplete(false)
  }

  const handlePuzzleDrop = (pieceId: number, event: any, info: any) => {
    const newPieces = [...puzzlePieces]
    const pieceIndex = newPieces.findIndex((p) => p.id === pieceId)
    const piece = newPieces[pieceIndex]

    // Calculate distance to correct position
    const distance = Math.sqrt(
      Math.pow(info.point.x - piece.correctPosition.x, 2) + Math.pow(info.point.y - piece.correctPosition.y, 2),
    )

    if (distance < 50 && !piece.placed) {
      newPieces[pieceIndex].position = piece.correctPosition
      newPieces[pieceIndex].placed = true
      playSuccess()
      setScore((prev) => prev + level * 10)

      if (newPieces.every((p) => p.placed)) {
        setPuzzleComplete(true)
        if (level < 3) {
          setTimeout(() => {
            setLevel((prev) => prev + 1)
            initializePuzzle()
          }, 2000)
        }
      }
    } else {
      // If not placed correctly, return to original drag start position or a nearby spot
      newPieces[pieceIndex].position = { x: info.point.x - 40, y: info.point.y - 40 }
      playSound(200, 300)
    }

    setPuzzlePieces(newPieces)
  }

  // COMPLETE: Memory Game Logic
  const initializeMemoryGame = () => {
    const symbols = ["🐱", "🐶", "🐰", "🐸", "🦋", "🐝", "🐠", "🐥", "🐞", "🐢"].slice(0, level * 2 + 2) // 4, 6, 8 pairs
    const cards = [...symbols, ...symbols]
      .map((symbol, index) => ({ id: index, symbol, flipped: false, matched: false }))
      .sort(() => Math.random() - 0.5)
    setMemoryCards(cards)
    setFlippedCards([])
    setMemoryComplete(false)
  }

  const flipCard = (id: number) => {
    if (flippedCards.length === 2 || memoryCards[id].flipped || memoryCards[id].matched) return

    const newCards = [...memoryCards]
    newCards[id].flipped = true
    setMemoryCards(newCards)

    const newFlipped = [...flippedCards, id]
    setFlippedCards(newFlipped)

    if (newFlipped.length === 2) {
      setTimeout(() => {
        const [first, second] = newFlipped
        if (newCards[first].symbol === newCards[second].symbol) {
          newCards[first].matched = true
          newCards[second].matched = true
          playSuccess()
          setScore((prev) => prev + level * 10)

          if (newCards.every((card) => card.matched)) {
            setMemoryComplete(true)
            if (level < 3) {
              setTimeout(() => {
                setLevel((prev) => prev + 1)
                initializeMemoryGame()
              }, 2000)
            }
          }
        } else {
          newCards[first].flipped = false
          newCards[second].flipped = false
          playSound(200, 300)
        }
        setMemoryCards([...newCards])
        setFlippedCards([])
      }, 1000)
    }
  }

  // COMPLETE: Shape Matching Logic
  const getCurrentShapes = () => {
    return allShapes.slice(0, level * 2 + 2) // 4, 6, 8 shapes
  }

  const handleShapeMatch = (shapeId: string) => {
    if (selectedShape === shapeId) {
      setMatchedShapes((prev) => [...prev, shapeId])
      playSuccess()
      setScore((prev) => prev + level * 10)
      setSelectedShape(null)

      if (matchedShapes.length + 1 === getCurrentShapes().length && level < 3) {
        setTimeout(() => {
          setLevel((prev) => prev + 1)
          setMatchedShapes([])
          setSelectedShape(null)
        }, 2000)
      }
    } else {
      setSelectedShape(shapeId)
      playSound(200, 300)
    }
  }

  // COMPLETE: Sequence Game Logic
  const generateSequence = () => {
    const options = ["🔴", "🟦", "🔺", "⭐", "🟢", "🟡"]
    const length = level + 2 // 3, 4, or 5 items
    const sequence = Array.from({ length }, () => options[Math.floor(Math.random() * options.length)])
    setCurrentSequence(sequence)
    setUserSequence([])
    setShowingSequence(true)

    // Show sequence to user
    setTimeout(() => setShowingSequence(false), 1500 + level * 200) // Longer for higher levels
  }

  const addToUserSequence = (symbol: string) => {
    if (showingSequence) return

    const newSequence = [...userSequence, symbol]
    setUserSequence(newSequence)

    if (newSequence.length === currentSequence.length) {
      const isCorrect = newSequence.every((item, index) => item === currentSequence[index])
      if (isCorrect) {
        playSuccess()
        setScore((prev) => prev + level * 15)
        if (level < 3) {
          setTimeout(() => {
            setLevel((prev) => prev + 1)
            generateSequence()
          }, 1500)
        } else {
          // Game complete at max level
          alert("Parabéns! Você completou todos os níveis da sequência!")
        }
      } else {
        playSound(200, 300)
        setTimeout(() => setUserSequence([]), 1000)
      }
    }
  }

  // COMPLETE: Different Game Logic
  const generateDifferentItems = () => {
    const animals = ["🐱", "🐶", "🐰", "🐸", "🦋", "🐝", "🐠", "🐥", "🐞", "🐢"]
    const numItems = level === 1 ? 4 : level === 2 ? 6 : 8
    const baseSymbol = animals[Math.floor(Math.random() * animals.length)]
    let differentSymbol = animals[Math.floor(Math.random() * animals.length)]
    while (differentSymbol === baseSymbol) {
      differentSymbol = animals[Math.floor(Math.random() * animals.length)]
    }

    const differentIndex = Math.floor(Math.random() * numItems)
    const items = Array.from({ length: numItems }, (_, i) => ({
      id: i,
      symbol: i === differentIndex ? differentSymbol : baseSymbol,
      isDifferent: i === differentIndex,
    }))

    setDifferentItems(items)
    setDifferentFound(false)
  }

  const checkDifferent = (id: number) => {
    const item = differentItems[id]
    if (item.isDifferent) {
      playSuccess()
      setScore((prev) => prev + level * 15)
      setDifferentFound(true)
      if (level < 3) {
        setTimeout(() => {
          setLevel((prev) => prev + 1)
          generateDifferentItems()
        }, 2000)
      } else {
        alert("Parabéns! Você encontrou todos os diferentes!")
      }
    } else {
      playSound(200, 300)
    }
  }

  // Initialize games
  useEffect(() => {
    if (currentGame === "memory") initializeMemoryGame()
    if (currentGame === "sequence") generateSequence()
    if (currentGame === "different") generateDifferentItems()
    if (currentGame === "puzzle") initializePuzzle()
  }, [currentGame, level]) // Re-initialize on level change

  const games = [
    {
      id: "puzzle",
      title: "🧩 Quebra-Cabeças Mágico",
      description: "Arraste as peças para seus lugares!",
      emoji: "🧩",
      color: "bg-gradient-to-br from-pink-400 to-purple-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Nível {level}/3</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>

          {puzzleComplete && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center mb-6 p-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl"
            >
              <div className="text-4xl mb-2">🎉</div>
              <div className="text-2xl font-bold">Quebra-Cabeça Completo!</div>
            </motion.div>
          )}

          <div className="relative h-96 bg-white rounded-xl shadow-lg mb-6">
            {/* Target positions */}
            {puzzlePieces.map((piece) => (
              <div
                key={`target-${piece.id}`}
                className="absolute w-20 h-20 border-4 border-dashed border-gray-300 rounded-xl bg-gray-50 flex items-center justify-center text-2xl"
                style={{ left: piece.correctPosition.x - 40, top: piece.correctPosition.y - 40 }}
              >
                {piece.placed ? piece.emoji : "?"}
              </div>
            ))}

            {/* Draggable pieces */}
            {puzzlePieces.map((piece) => (
              <motion.div
                key={piece.id}
                className="absolute w-20 h-20 bg-white rounded-xl cursor-pointer shadow-lg flex items-center justify-center text-4xl border-4 border-blue-200"
                style={{ left: piece.position.x - 40, top: piece.position.y - 40 }}
                drag={!piece.placed}
                dragMomentum={false}
                whileDrag={{ scale: 1.1, zIndex: 10 }}
                onDragEnd={handlePuzzleDrop.bind(null, piece.id)}
              >
                {piece.emoji}
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "shapes",
      title: "🔷 Formas e Cores",
      description: "Toque nas formas iguais!",
      emoji: "🔷",
      color: "bg-gradient-to-br from-blue-400 to-teal-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Nível {level}/3</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">
              Combinações: {matchedShapes.length}/{getCurrentShapes().length}
            </div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>

          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-4">Toque nas formas iguais!</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            {getCurrentShapes().map((shape) => (
              <motion.button
                key={shape.id}
                className={`w-20 h-20 mx-auto rounded-xl text-5xl transition-all ${
                  matchedShapes.includes(shape.id)
                    ? "bg-green-200 opacity-50"
                    : selectedShape === shape.id
                      ? "bg-blue-200 scale-110 shadow-lg"
                      : "bg-white hover:bg-gray-50 shadow-md"
                }`}
                whileHover={{ scale: matchedShapes.includes(shape.id) ? 1 : 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleShapeMatch(shape.id)}
                disabled={matchedShapes.includes(shape.id)}
              >
                {shape.symbol}
              </motion.button>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "sequence",
      title: "🔄 Continue a Sequência",
      description: "Memorize e repita o padrão!",
      emoji: "🔄",
      color: "bg-gradient-to-br from-green-400 to-blue-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Nível {level}/3</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>

          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-4">
              {showingSequence ? "🧠 Memorize a sequência!" : "🎯 Repita a sequência!"}
            </h3>
          </div>

          <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
            {currentSequence.map((item, index) => (
              <motion.div
                key={index}
                className={`text-6xl p-4 rounded-xl shadow-lg ${showingSequence ? "bg-yellow-100" : "bg-white"}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                {showingSequence ? item : "?"}
              </motion.div>
            ))}
          </div>

          {userSequence.length > 0 && (
            <div className="mb-6 text-center">
              <h4 className="font-bold mb-3">Sua resposta:</h4>
              <div className="flex justify-center gap-2">
                {userSequence.map((item, index) => (
                  <div key={index} className="text-4xl bg-blue-100 p-3 rounded-xl shadow-lg">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          {!showingSequence && (
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-6">
              {["🔴", "🟦", "🔺", "⭐", "🟢", "🟡"].slice(0, level + 3).map((option) => (
                <motion.button
                  key={option}
                  className="text-5xl p-4 rounded-xl bg-white hover:bg-gray-50 shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => addToUserSequence(option)}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          )}
        </div>
      ),
    },
    {
      id: "different",
      title: "🔍 O que é Diferente?",
      description: "Encontre o item especial!",
      emoji: "🔍",
      color: "bg-gradient-to-br from-yellow-400 to-orange-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Nível {level}/3</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>

          {differentFound && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center mb-6 p-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl"
            >
              <div className="text-4xl mb-2">🎯</div>
              <div className="text-2xl font-bold">Encontrou o Diferente!</div>
            </motion.div>
          )}

          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold">🕵️ Qual é diferente dos outros?</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto mb-8">
            {differentItems.map((item) => (
              <motion.button
                key={item.id}
                className="text-8xl p-6 rounded-xl bg-white hover:bg-gray-50 shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => checkDifferent(item.id)}
              >
                {item.symbol}
              </motion.button>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "dressup",
      title: "👗 Vista o Mascote",
      description: "Deixe nosso amigo bem elegante!",
      emoji: "👗",
      color: "bg-gradient-to-br from-pink-400 to-red-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-pink-50 to-red-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Nível {level}/3</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-6">✨ Vista o Mascote Mágico! ✨</h3>
            <div className="relative inline-block">
              <div className="w-40 h-40 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full flex items-center justify-center text-7xl shadow-lg">
                😊
              </div>

              {mascotOutfit.hat && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-5xl">{mascotOutfit.hat}</div>
              )}
              {mascotOutfit.shirt && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl">
                  {mascotOutfit.shirt}
                </div>
              )}
              {mascotOutfit.shoes && (
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-5xl">
                  {mascotOutfit.shoes}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {Object.entries(outfitOptions).map(([category, items]) => (
              <div key={category} className="text-center">
                <h4 className="font-bold mb-4 text-lg capitalize bg-white px-4 py-2 rounded-lg shadow-md">
                  {category === "hat" ? "🎩 Chapéus" : category === "shirt" ? "👕 Roupas" : "👟 Sapatos"}
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {items.map((item) => (
                    <motion.button
                      key={item}
                      className="text-4xl p-4 rounded-xl bg-white hover:bg-gray-50 shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setMascotOutfit((prev) => ({ ...prev, [category]: item }))
                        playSuccess()
                        setScore((prev) => prev + 5)
                      }}
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              onClick={() => setMascotOutfit({ hat: "", shirt: "", shoes: "" })}
              className="bg-gray-500 hover:bg-gray-600 text-white mr-4"
            >
              🧹 Limpar Roupa
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: "memory",
      title: "🧠 Jogo da Memória",
      description: "Encontre todos os pares!",
      emoji: "🧠",
      color: "bg-gradient-to-br from-purple-400 to-blue-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Nível {level}/3</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>

          {memoryComplete && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center mb-6 p-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl"
            >
              <div className="text-4xl mb-2">🧠</div>
              <div className="text-2xl font-bold">Memória Incrível!</div>
            </motion.div>
          )}

          <div className="text-center mb-6">
            <Button
              onClick={initializeMemoryGame}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white mr-4"
            >
              <RotateCcw className="w-4 h-4 mr-2" />🎲 Novo Jogo
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
            {memoryCards.map((card) => (
              <motion.div
                key={card.id}
                className={`aspect-square rounded-xl cursor-pointer flex items-center justify-center text-3xl font-bold shadow-lg transition-all ${
                  card.flipped || card.matched ? "bg-white" : "bg-gradient-to-br from-blue-400 to-purple-500"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => flipCard(card.id)}
              >
                {card.flipped || card.matched ? card.symbol : "?"}
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-6">
            <div className="bg-white px-4 py-2 rounded-lg text-lg font-bold inline-block shadow-lg">
              🎯 Pares encontrados: {memoryCards.filter((card) => card.matched).length / 2}/
              {getCurrentShapes().length / 2}
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <Link href="/">
          <Button variant="outline" size="sm" className="bg-white hover:bg-gray-50">
            <Home className="w-4 h-4 mr-2" />🏠 Início
          </Button>
        </Link>
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            🌟 Exploradores Lógicos 🌟
          </h1>
          <p className="text-gray-600 text-lg">3-5 anos • Descobertas Mágicas</p>
        </div>
        <div className="w-20"></div>
      </header>

      {/* Game Selection */}
      {!currentGame && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
                    ✨ Vamos Brincar! ✨
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Current Game */}
      {currentGame && (
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Button
              onClick={() => setCurrentGame(null)}
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
            >
              ← 🎮 Voltar aos Jogos
            </Button>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              {games.find((g) => g.id === currentGame)?.title}
            </h2>
            <Button
              onClick={() => {
                setScore(0)
                setLevel(1)
                if (currentGame === "memory") initializeMemoryGame()
                if (currentGame === "sequence") generateSequence()
                if (currentGame === "different") generateDifferentItems()
                if (currentGame === "puzzle") initializePuzzle()
                if (currentGame === "shapes") {
                  setMatchedShapes([])
                  setSelectedShape(null)
                }
                if (currentGame === "dressup") {
                  setMascotOutfit({ hat: "", shirt: "", shoes: "" })
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
