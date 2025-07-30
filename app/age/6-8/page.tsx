"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, RotateCcw, Play } from "lucide-react"
import Link from "next/link"
import { useAudio } from "@/hooks/use-audio"

export default function Age6to8Page() {
  const [currentGame, setCurrentGame] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const { playSuccess, playSound } = useAudio()

  // Block Coding Game - COMPLETE
  const [mascotPosition, setMascotPosition] = useState({ x: 0, y: 0 })
  const [codeBlocks, setCodeBlocks] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [maze, setMaze] = useState([
    [0, 0, 0, 0, 1],
    [1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 2], // 2 = goal
  ])

  // Math Battle Game - COMPLETE
  const [mathProblem, setMathProblem] = useState({ question: "", answer: 0, options: [] as number[] })
  const [mathScore, setMathScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [mathStreak, setMathStreak] = useState(0)
  const [mathActive, setMathActive] = useState(false)

  // Story Sequence Game - COMPLETE
  const [storyCards, setStoryCards] = useState([
    { id: 1, text: "🌱 Plantar a semente", order: 1, currentPosition: 3 },
    { id: 2, text: "💧 Regar a planta", order: 2, currentPosition: 1 },
    { id: 3, text: "🌿 A planta cresce", order: 3, currentPosition: 4 },
    { id: 4, text: "🌸 A flor aparece", order: 4, currentPosition: 2 },
  ])
  const [storyComplete, setStoryComplete] = useState(false)

  // Connect the Dots Game - COMPLETE
  const [dots, setDots] = useState<Array<{ id: number; x: number; y: number; connected: boolean }>>([])
  const [connections, setConnections] = useState<number[]>([])
  const [dotsComplete, setDotsComplete] = useState(false)

  // Chess Game - COMPLETE
  const [chessBoard, setChessBoard] = useState<string[][]>([
    ["", "", "", "♔", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "♛", ""],
    ["", "", "", "", "", "", "", "♚"],
  ])
  const [selectedPiece, setSelectedPiece] = useState<{ x: number; y: number } | null>(null)
  const [chessComplete, setChessComplete] = useState(false)

  // Pattern Recognition Game - NEW
  const [patternSequence, setPatternSequence] = useState<string[]>([])
  const [userPattern, setUserPattern] = useState<string[]>([])
  const [patternComplete, setPatternComplete] = useState(false)

  // FIXED: Math Battle Logic
  const generateMathProblem = () => {
    let num1, num2, operation, answer, question

    if (level === 1) {
      num1 = Math.floor(Math.random() * 10) + 1
      num2 = Math.floor(Math.random() * 10) + 1
      operation = Math.random() > 0.5 ? "+" : "-"
      if (operation === "-" && num1 < num2) [num1, num2] = [num2, num1]
      answer = operation === "+" ? num1 + num2 : num1 - num2
      question = `${num1} ${operation} ${num2}`
    } else if (level === 2) {
      num1 = Math.floor(Math.random() * 20) + 1
      num2 = Math.floor(Math.random() * 10) + 1
      operation = ["+", "-", "×"][Math.floor(Math.random() * 3)]
      if (operation === "×") {
        num1 = Math.floor(Math.random() * 10) + 1
        num2 = Math.floor(Math.random() * 10) + 1
        answer = num1 * num2
      } else if (operation === "+") {
        answer = num1 + num2
      } else {
        if (num1 < num2) [num1, num2] = [num2, num1]
        answer = num1 - num2
      }
      question = `${num1} ${operation} ${num2}`
    } else {
      // Level 3 - Division and harder multiplication
      if (Math.random() > 0.5) {
        answer = Math.floor(Math.random() * 10) + 1
        num2 = Math.floor(Math.random() * 10) + 1
        num1 = answer * num2
        operation = "÷"
        question = `${num1} ${operation} ${num2}`
      } else {
        num1 = Math.floor(Math.random() * 12) + 1
        num2 = Math.floor(Math.random() * 12) + 1
        operation = "×"
        answer = num1 * num2
        question = `${num1} ${operation} ${num2}`
      }
    }

    const wrongAnswers = [
      answer + Math.floor(Math.random() * 5) + 1,
      answer - Math.floor(Math.random() * 5) - 1,
      answer + Math.floor(Math.random() * 10) + 5,
    ].filter((n) => n > 0)

    const options = [answer, ...wrongAnswers].sort(() => Math.random() - 0.5)
    setMathProblem({ question, answer, options })
  }

  const checkMathAnswer = (selectedAnswer: number) => {
    if (selectedAnswer === mathProblem.answer) {
      setMathScore((prev) => prev + level * 10)
      setMathStreak((prev) => prev + 1)
      setScore((prev) => prev + level * 10)
      playSuccess()

      // Level up after 5 correct answers
      if (mathStreak >= 4 && level < 3) {
        setLevel((prev) => prev + 1)
        setMathStreak(0)
      }
    } else {
      setMathStreak(0)
      playSound(200, 300)
    }
    generateMathProblem()
  }

  // FIXED: Code Blocks Logic
  const runCodeBlocks = async () => {
    setIsRunning(true)
    const currentPos = { ...mascotPosition }

    for (const block of codeBlocks) {
      await new Promise((resolve) => setTimeout(resolve, 800))

      switch (block) {
        case "up":
          if (currentPos.y > 0 && maze[currentPos.y - 1][currentPos.x] !== 1) {
            currentPos.y -= 1
          }
          break
        case "down":
          if (currentPos.y < 4 && maze[currentPos.y + 1][currentPos.x] !== 1) {
            currentPos.y += 1
          }
          break
        case "left":
          if (currentPos.x > 0 && maze[currentPos.y][currentPos.x - 1] !== 1) {
            currentPos.x -= 1
          }
          break
        case "right":
          if (currentPos.x < 4 && maze[currentPos.y][currentPos.x + 1] !== 1) {
            currentPos.x += 1
          }
          break
      }

      setMascotPosition({ ...currentPos })

      if (maze[currentPos.y][currentPos.x] === 2) {
        playSuccess()
        setScore((prev) => prev + level * 20)

        // Generate new maze for next level
        if (level < 3) {
          setTimeout(() => {
            setLevel((prev) => prev + 1)
            generateNewMaze()
          }, 1000)
        }
        break
      }
    }

    setIsRunning(false)
  }

  const generateNewMaze = () => {
    const mazes = [
      // Level 1
      [
        [0, 0, 0, 0, 1],
        [1, 1, 0, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 2],
      ],
      // Level 2
      [
        [0, 1, 0, 0, 0],
        [0, 1, 0, 1, 1],
        [0, 0, 0, 0, 0],
        [1, 1, 1, 0, 1],
        [0, 0, 0, 0, 2],
      ],
      // Level 3
      [
        [0, 1, 1, 0, 0],
        [0, 0, 1, 0, 1],
        [1, 0, 0, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 0, 0, 2],
      ],
    ]
    setMaze(mazes[level - 1])
    setMascotPosition({ x: 0, y: 0 })
    setCodeBlocks([])
  }

  // FIXED: Story Sequence Logic
  const swapStoryCards = (draggedId: number, targetId: number) => {
    const newCards = [...storyCards]
    const draggedIndex = newCards.findIndex((card) => card.id === draggedId)
    const targetIndex = newCards.findIndex((card) => card.id === targetId)

    if (draggedIndex !== -1 && targetIndex !== -1) {
      const draggedPos = newCards[draggedIndex].currentPosition
      const targetPos = newCards[targetIndex].currentPosition

      newCards[draggedIndex].currentPosition = targetPos
      newCards[targetIndex].currentPosition = draggedPos

      setStoryCards(newCards)

      const isCorrect = newCards.every((card) => card.order === card.currentPosition)
      if (isCorrect) {
        setStoryComplete(true)
        playSuccess()
        setScore((prev) => prev + level * 30)

        if (level < 3) {
          setTimeout(() => {
            setLevel((prev) => prev + 1)
            generateNewStory()
          }, 2000)
        }
      }
    }
  }

  const generateNewStory = () => {
    const stories = [
      // Level 1
      [
        { id: 1, text: "🌱 Plantar a semente", order: 1, currentPosition: 3 },
        { id: 2, text: "💧 Regar a planta", order: 2, currentPosition: 1 },
        { id: 3, text: "🌿 A planta cresce", order: 3, currentPosition: 4 },
        { id: 4, text: "🌸 A flor aparece", order: 4, currentPosition: 2 },
      ],
      // Level 2
      [
        { id: 1, text: "🥚 Ovo no ninho", order: 1, currentPosition: 4 },
        { id: 2, text: "🐣 Ovo rachando", order: 2, currentPosition: 2 },
        { id: 3, text: "🐤 Pintinho nasce", order: 3, currentPosition: 1 },
        { id: 4, text: "🐔 Galinha adulta", order: 4, currentPosition: 3 },
      ],
      // Level 3
      [
        { id: 1, text: "🌙 Noite chegando", order: 1, currentPosition: 3 },
        { id: 2, text: "😴 Hora de dormir", order: 2, currentPosition: 5 },
        { id: 3, text: "💤 Dormindo profundo", order: 3, currentPosition: 1 },
        { id: 4, text: "🌅 Amanhecendo", order: 4, currentPosition: 4 },
        { id: 5, text: "😊 Acordando feliz", order: 5, currentPosition: 2 },
      ],
    ]
    setStoryCards(stories[level - 1])
    setStoryComplete(false)
  }

  // FIXED: Connect the Dots Logic
  const generateDots = () => {
    const dotCounts = [6, 8, 10] // Different levels
    const count = dotCounts[level - 1]

    const newDots = Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      x: 100 + (i % Math.ceil(Math.sqrt(count))) * 80,
      y: 100 + Math.floor(i / Math.ceil(Math.sqrt(count))) * 80,
      connected: false,
    }))
    setDots(newDots)
    setConnections([])
    setDotsComplete(false)
  }

  const connectDot = (dotId: number) => {
    const expectedNext = connections.length + 1

    if (dotId === expectedNext) {
      const newConnections = [...connections, dotId]
      setConnections(newConnections)
      setDots((prev) => prev.map((dot) => (dot.id === dotId ? { ...dot, connected: true } : dot)))

      if (dotId === dots.length) {
        setDotsComplete(true)
        playSuccess()
        setScore((prev) => prev + level * 25)

        if (level < 3) {
          setTimeout(() => {
            setLevel((prev) => prev + 1)
            generateDots()
          }, 2000)
        }
      }
    } else {
      playSound(200, 300)
    }
  }

  // FIXED: Chess Logic
  const handleChessMove = (x: number, y: number) => {
    if (selectedPiece) {
      const piece = chessBoard[selectedPiece.y][selectedPiece.x]
      if (piece === "♛") {
        const newBoard = [...chessBoard]
        newBoard[selectedPiece.y][selectedPiece.x] = ""
        newBoard[y][x] = "♛"
        setChessBoard(newBoard)

        // Check for checkmate (simplified)
        const kingX = 3,
          kingY = 0
        const isCheckmate =
          (x === kingX && Math.abs(y - kingY) <= 1) ||
          (y === kingY && Math.abs(x - kingX) <= 1) ||
          Math.abs(x - kingX) === Math.abs(y - kingY)

        if (isCheckmate) {
          setChessComplete(true)
          playSuccess()
          setScore((prev) => prev + level * 40)

          if (level < 3) {
            setTimeout(() => {
              setLevel((prev) => prev + 1)
              generateNewChessPosition()
            }, 2000)
          }
        }
      }
      setSelectedPiece(null)
    } else if (chessBoard[y][x] === "♛") {
      setSelectedPiece({ x, y })
    }
  }

  const generateNewChessPosition = () => {
    const positions = [
      // Level 1
      [
        ["", "", "", "♔", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "♛", ""],
        ["", "", "", "", "", "", "", "♚"],
      ],
      // Level 2
      [
        ["", "", "♔", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["♛", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "♚"],
      ],
      // Level 3
      [
        ["", "", "", "", "♔", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "♛", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "♚"],
      ],
    ]
    setChessBoard(positions[level - 1])
    setSelectedPiece(null)
    setChessComplete(false)
  }

  // NEW: Pattern Recognition Game
  const generatePattern = () => {
    const shapes = ["🔴", "🟦", "🔺", "⭐", "🟢", "🟡"]
    const patternLength = level + 2 // 3, 4, or 5 items
    const pattern = Array.from({ length: patternLength }, () => shapes[Math.floor(Math.random() * shapes.length)])
    setPatternSequence(pattern)
    setUserPattern([])
    setPatternComplete(false)
  }

  const addToPattern = (shape: string) => {
    const newPattern = [...userPattern, shape]
    setUserPattern(newPattern)

    if (newPattern.length === patternSequence.length) {
      const isCorrect = newPattern.every((item, index) => item === patternSequence[index])
      if (isCorrect) {
        setPatternComplete(true)
        playSuccess()
        setScore((prev) => prev + level * 15)

        if (level < 3) {
          setTimeout(() => {
            setLevel((prev) => prev + 1)
            generatePattern()
          }, 2000)
        }
      } else {
        playSound(200, 300)
        setTimeout(() => setUserPattern([]), 1000)
      }
    }
  }

  // Timer for math game
  useEffect(() => {
    if (currentGame === "math" && mathActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setMathActive(false)
    }
  }, [currentGame, mathActive, timeLeft])

  // Initialize games
  useEffect(() => {
    if (currentGame === "math") {
      generateMathProblem()
      setTimeLeft(60)
      setMathScore(0)
      setMathStreak(0)
      setMathActive(true)
    } else if (currentGame === "dots") {
      generateDots()
    } else if (currentGame === "pattern") {
      generatePattern()
    }
  }, [currentGame])

  const games = [
    {
      id: "coding",
      title: "🤖 Código em Blocos",
      description: "Programe o robô para chegar ao objetivo!",
      emoji: "🤖",
      color: "bg-gradient-to-br from-blue-400 to-purple-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Nível {level}/3</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Maze */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h4 className="font-bold mb-4 text-center">🏰 Labirinto</h4>
              <div className="grid grid-cols-5 gap-2 w-fit mx-auto">
                {maze.map((row, y) =>
                  row.map((cell, x) => (
                    <div
                      key={`${x}-${y}`}
                      className={`w-12 h-12 border-2 rounded-lg flex items-center justify-center text-2xl ${
                        cell === 1 ? "bg-gray-800" : cell === 2 ? "bg-green-400" : "bg-blue-50"
                      }`}
                    >
                      {mascotPosition.x === x && mascotPosition.y === y && "🤖"}
                      {cell === 2 && mascotPosition.x !== x && mascotPosition.y !== y && "🎯"}
                    </div>
                  )),
                )}
              </div>
            </div>

            {/* Code Blocks */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h4 className="font-bold mb-4">⚡ Comandos</h4>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { id: "up", label: "⬆️ Cima", color: "bg-green-100 hover:bg-green-200" },
                  { id: "right", label: "➡️ Direita", color: "bg-blue-100 hover:bg-blue-200" },
                  { id: "down", label: "⬇️ Baixo", color: "bg-orange-100 hover:bg-orange-200" },
                  { id: "left", label: "⬅️ Esquerda", color: "bg-purple-100 hover:bg-purple-200" },
                ].map((command) => (
                  <Button
                    key={command.id}
                    onClick={() => setCodeBlocks((prev) => [...prev, command.id])}
                    className={`${command.color} text-gray-700 font-semibold`}
                    disabled={isRunning}
                  >
                    {command.label}
                  </Button>
                ))}
              </div>

              <div className="mb-6">
                <h5 className="font-semibold mb-3">📝 Sequência:</h5>
                <div className="flex flex-wrap gap-2 min-h-[50px] p-4 bg-gray-50 rounded-lg">
                  {codeBlocks.map((block, index) => (
                    <span key={index} className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm">
                      {block === "up" ? "⬆️" : block === "right" ? "➡️" : block === "down" ? "⬇️" : "⬅️"}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={runCodeBlocks}
                  disabled={isRunning || codeBlocks.length === 0}
                  className="bg-green-500 hover:bg-green-600"
                >
                  <Play className="w-4 h-4 mr-2" />
                  ▶️ Executar
                </Button>
                <Button onClick={() => setCodeBlocks([])} variant="outline" disabled={isRunning}>
                  🗑️ Limpar
                </Button>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "math",
      title: "🧮 Batalha Matemática",
      description: "Resolva problemas contra o tempo!",
      emoji: "🧮",
      color: "bg-gradient-to-br from-red-400 to-yellow-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-red-50 to-yellow-50 rounded-xl">
          <div className="flex justify-center gap-6 mb-8">
            <div className="bg-red-500 text-white px-6 py-4 rounded-xl shadow-lg">
              <div className="text-sm font-semibold">⏰ Tempo</div>
              <div className="text-3xl font-bold">{timeLeft}s</div>
            </div>
            <div className="bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg">
              <div className="text-sm font-semibold">🏆 Pontos</div>
              <div className="text-3xl font-bold">{mathScore}</div>
            </div>
            <div className="bg-blue-500 text-white px-6 py-4 rounded-xl shadow-lg">
              <div className="text-sm font-semibold">📊 Nível</div>
              <div className="text-3xl font-bold">{level}/3</div>
            </div>
          </div>

          {mathActive && timeLeft > 0 ? (
            <div className="text-center">
              <div className="text-6xl font-bold mb-6 text-gray-800">{mathProblem.question} = ?</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {mathProblem.options.map((option, index) => (
                  <Button
                    key={index}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-6 px-8 text-2xl"
                    onClick={() => checkMathAnswer(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>

              {mathStreak >= 3 && (
                <div className="mt-4 p-3 bg-yellow-400 text-yellow-900 rounded-xl font-bold">
                  🔥 Sequência de {mathStreak}! Incrível! 🔥
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <div className="text-4xl mb-4">⏰</div>
              <div className="text-2xl font-bold mb-4">Tempo Esgotado!</div>
              <div className="text-xl mb-6">Pontuação Final: {mathScore}</div>
              <Button
                onClick={() => {
                  setTimeLeft(60)
                  setMathScore(0)
                  setMathStreak(0)
                  setMathActive(true)
                  generateMathProblem()
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg font-bold"
              >
                🚀 Jogar Novamente
              </Button>
            </div>
          )}
        </div>
      ),
    },
    {
      id: "story",
      title: "📚 Monte a História",
      description: "Organize os eventos na ordem correta!",
      emoji: "📚",
      color: "bg-gradient-to-br from-green-400 to-blue-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Nível {level}/3</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>

          {storyComplete && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center mb-6 p-4 bg-green-500 text-white rounded-xl"
            >
              <div className="text-4xl mb-2">🎉</div>
              <div className="text-2xl font-bold">História Completa!</div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {storyCards
              .sort((a, b) => a.currentPosition - b.currentPosition)
              .map((card) => (
                <motion.div
                  key={card.id}
                  className={`bg-white p-6 rounded-xl shadow-lg cursor-pointer border-4 transition-all ${
                    storyComplete && card.order === card.currentPosition
                      ? "border-green-400"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                  drag
                  dragMomentum={false}
                  whileDrag={{ scale: 1.1, zIndex: 10 }}
                  onDragEnd={(event, info) => {
                    const elements = document.elementsFromPoint(info.point.x, info.point.y)
                    const targetCard = elements.find((el) => el.getAttribute("data-card-id"))
                    if (targetCard) {
                      const targetId = Number.parseInt(targetCard.getAttribute("data-card-id") || "0")
                      if (targetId && targetId !== card.id) {
                        swapStoryCards(card.id, targetId)
                      }
                    }
                  }}
                  data-card-id={card.id}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">{card.text.split(" ")[0]}</div>
                    <div className="text-lg font-semibold text-gray-700 mb-2">
                      {card.text.split(" ").slice(1).join(" ")}
                    </div>
                    <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm font-bold">
                      Posição: {card.currentPosition}
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      ),
    },
    {
      id: "dots",
      title: "🔗 Conecte os Pontos",
      description: "Una os números em ordem crescente!",
      emoji: "🔗",
      color: "bg-gradient-to-br from-teal-400 to-blue-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Nível {level}/3</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>

          {dotsComplete && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center mb-6 p-4 bg-teal-500 text-white rounded-xl"
            >
              <div className="text-4xl mb-2">🎨</div>
              <div className="text-2xl font-bold">Desenho Completo!</div>
            </motion.div>
          )}

          <div className="relative h-96 bg-white rounded-xl mx-auto max-w-2xl shadow-lg overflow-hidden">
            <svg className="absolute inset-0 w-full h-full">
              {connections.map((dotId, index) => {
                if (index === connections.length - 1) return null
                const currentDot = dots.find((d) => d.id === dotId)
                const nextDot = dots.find((d) => d.id === connections[index + 1])
                if (!currentDot || !nextDot) return null

                return (
                  <line
                    key={`${dotId}-${connections[index + 1]}`}
                    x1={currentDot.x}
                    y1={currentDot.y}
                    x2={nextDot.x}
                    y2={nextDot.y}
                    stroke="#3B82F6"
                    strokeWidth="4"
                  />
                )
              })}
            </svg>

            {dots.map((dot) => (
              <Button
                key={dot.id}
                className={`absolute w-12 h-12 rounded-full text-lg font-bold shadow-lg ${
                  dot.connected
                    ? "bg-green-500 text-white"
                    : "bg-white border-4 border-blue-500 text-blue-500 hover:bg-blue-50"
                }`}
                style={{ left: dot.x - 24, top: dot.y - 24 }}
                onClick={() => connectDot(dot.id)}
                disabled={dot.connected}
              >
                {dot.id}
              </Button>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "chess",
      title: "♛ Desafio do Xadrez",
      description: "Mova a rainha para capturar o rei!",
      emoji: "♛",
      color: "bg-gradient-to-br from-purple-400 to-pink-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Nível {level}/3</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>

          {chessComplete && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center mb-6 p-4 bg-purple-500 text-white rounded-xl"
            >
              <div className="text-4xl mb-2">👑</div>
              <div className="text-2xl font-bold">Xeque-Mate!</div>
            </motion.div>
          )}

          <div className="grid grid-cols-8 gap-1 w-fit mx-auto mb-6 p-4 bg-white rounded-xl shadow-lg">
            {chessBoard.map((row, y) =>
              row.map((piece, x) => (
                <div
                  key={`${x}-${y}`}
                  className={`w-12 h-12 flex items-center justify-center text-3xl cursor-pointer border-2 transition-all ${
                    (x + y) % 2 === 0 ? "bg-amber-100" : "bg-amber-800"
                  } ${selectedPiece?.x === x && selectedPiece?.y === y ? "border-blue-500" : "border-transparent"}`}
                  onClick={() => handleChessMove(x, y)}
                >
                  {piece}
                </div>
              )),
            )}
          </div>

          <div className="text-center">
            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="text-lg font-semibold text-blue-800">
                🎯 Clique na Rainha (♛) e depois onde quer movê-la para capturar o Rei (♔)!
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "pattern",
      title: "🎨 Reconhecimento de Padrões",
      description: "Memorize e reproduza a sequência!",
      emoji: "🎨",
      color: "bg-gradient-to-br from-indigo-400 to-cyan-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-indigo-50 to-cyan-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Nível {level}/3</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>

          {patternComplete && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center mb-6 p-4 bg-indigo-500 text-white rounded-xl"
            >
              <div className="text-4xl mb-2">🎨</div>
              <div className="text-2xl font-bold">Padrão Perfeito!</div>
            </motion.div>
          )}

          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">🧠 Memorize a sequência:</h3>
            <div className="flex justify-center gap-4 mb-6">
              {patternSequence.map((item, index) => (
                <div key={index} className="text-6xl bg-white p-4 rounded-xl shadow-lg">
                  {item}
                </div>
              ))}
            </div>
          </div>

          {userPattern.length > 0 && (
            <div className="text-center mb-6">
              <h4 className="font-bold mb-3">✨ Sua resposta:</h4>
              <div className="flex justify-center gap-2">
                {userPattern.map((item, index) => (
                  <div key={index} className="text-4xl bg-blue-100 p-3 rounded-xl shadow-lg">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-2xl mx-auto">
            {["🔴", "🟦", "🔺", "⭐", "🟢", "🟡"].map((shape) => (
              <Button
                key={shape}
                className="text-5xl p-6 bg-white hover:bg-gray-50 shadow-lg"
                onClick={() => addToPattern(shape)}
                disabled={userPattern.length >= patternSequence.length}
              >
                {shape}
              </Button>
            ))}
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <Link href="/">
          <Button variant="outline" size="sm" className="bg-white hover:bg-gray-50">
            <Home className="w-4 h-4 mr-2" />🏠 Início
          </Button>
        </Link>
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            ⚡ Mestres dos Desafios ⚡
          </h1>
          <p className="text-gray-600 text-lg">6-8 anos • Aventuras Lógicas</p>
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
                    ✨ Jogar Agora! ✨
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
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              ← 🎮 Voltar aos Jogos
            </Button>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {games.find((g) => g.id === currentGame)?.title}
            </h2>
            <Button
              onClick={() => {
                setScore(0)
                setLevel(1)
                if (currentGame === "math") {
                  setTimeLeft(60)
                  setMathScore(0)
                  setMathStreak(0)
                  setMathActive(true)
                  generateMathProblem()
                }
                if (currentGame === "coding") {
                  generateNewMaze()
                }
                if (currentGame === "story") {
                  generateNewStory()
                }
                if (currentGame === "dots") {
                  generateDots()
                }
                if (currentGame === "chess") {
                  generateNewChessPosition()
                }
                if (currentGame === "pattern") {
                  generatePattern()
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
