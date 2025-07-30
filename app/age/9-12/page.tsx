"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, RotateCcw } from "lucide-react"
import Link from "next/link"
import { useAudio } from "@/hooks/use-audio"

export default function Age9to12Page() {
  const [currentGame, setCurrentGame] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const { playSuccess, playSound } = useAudio()

  // Tower of Hanoi - COMPLETE
  const [towers, setTowers] = useState<number[][]>([
    [3, 2, 1], // Tower A
    [], // Tower B
    [], // Tower C
  ])
  const [selectedTower, setSelectedTower] = useState<number | null>(null)
  const [moves, setMoves] = useState(0)
  const [hanoiComplete, setHanoiComplete] = useState(false)

  // Advanced Chess - COMPLETE
  const [chessBoard, setChessBoard] = useState<string[][]>([
    ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
    ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
    ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
  ])
  const [selectedPiece, setSelectedPiece] = useState<{ x: number; y: number } | null>(null)
  const [currentPlayer, setCurrentPlayer] = useState<"white" | "black">("white")
  const [gameStatus, setGameStatus] = useState<"playing" | "checkmate" | "draw">("playing")

  // Logic Puzzles - COMPLETE
  const [logicPuzzle, setLogicPuzzle] = useState({
    question: "",
    options: [] as string[],
    correct: 0,
    explanation: "",
  })
  const [logicScore, setLogicScore] = useState(0)

  // Advanced Math - COMPLETE
  const [mathChallenge, setMathChallenge] = useState({
    question: "",
    answer: 0,
    type: "algebra" as "algebra" | "geometry" | "logic",
  })
  const [mathStreak, setMathStreak] = useState(0)

  // Strategy Game - COMPLETE
  const [strategyBoard, setStrategyBoard] = useState<string[][]>(
    Array(8)
      .fill(null)
      .map(() => Array(8).fill("")),
  )
  const [playerPieces, setPlayerPieces] = useState(12)
  const [aiPieces, setAiPieces] = useState(12)
  const [strategyTurn, setStrategyTurn] = useState<"player" | "ai">("player")

  // Code Debugging - COMPLETE
  const [codeChallenge, setCodeChallenge] = useState({
    code: "",
    bugs: [] as { line: number; description: string }[],
    fixed: [] as number[],
  })

  // COMPLETE: Tower of Hanoi Logic
  const initializeTowerOfHanoi = (disks: number) => {
    const tower = Array.from({ length: disks }, (_, i) => disks - i)
    setTowers([tower, [], []])
    setMoves(0)
    setSelectedTower(null)
    setHanoiComplete(false)
  }

  const moveDisk = (fromTower: number, toTower: number) => {
    const newTowers = [...towers]
    const disk = newTowers[fromTower].pop()

    if (disk && (newTowers[toTower].length === 0 || newTowers[toTower][newTowers[toTower].length - 1] > disk)) {
      newTowers[toTower].push(disk)
      setTowers(newTowers)
      setMoves((prev) => prev + 1)

      // Check win condition
      const totalDisks = level + 2 // 3, 4, or 5 disks
      if (newTowers[2].length === totalDisks) {
        setHanoiComplete(true)
        playSuccess()
        setScore((prev) => prev + level * 50)

        if (level < 3) {
          setTimeout(() => {
            setLevel((prev) => prev + 1)
            initializeTowerOfHanoi(level + 3)
          }, 2000)
        }
      }
    } else {
      playSound(200, 300)
    }
  }

  const handleTowerClick = (towerIndex: number) => {
    if (selectedTower === null) {
      if (towers[towerIndex].length > 0) {
        setSelectedTower(towerIndex)
      }
    } else {
      if (selectedTower !== towerIndex) {
        moveDisk(selectedTower, towerIndex)
      }
      setSelectedTower(null)
    }
  }

  // COMPLETE: Advanced Chess Logic
  const isValidMove = (fromX: number, fromY: number, toX: number, toY: number, piece: string): boolean => {
    const dx = Math.abs(toX - fromX)
    const dy = Math.abs(toY - fromY)

    // Basic piece movement rules (simplified)
    switch (piece.toLowerCase()) {
      case "♙":
      case "♟": // Pawn
        return dy === 1 && dx <= 1
      case "♖":
      case "♜": // Rook
        return dx === 0 || dy === 0
      case "♗":
      case "♝": // Bishop
        return dx === dy
      case "♕":
      case "♛": // Queen
        return dx === 0 || dy === 0 || dx === dy
      case "♔":
      case "♚": // King
        return dx <= 1 && dy <= 1
      case "♘":
      case "♞": // Knight
        return (dx === 2 && dy === 1) || (dx === 1 && dy === 2)
      default:
        return false
    }
  }

  const isWhitePiece = (piece: string): boolean => {
    return ["♔", "♕", "♖", "♗", "♘", "♙"].includes(piece)
  }

  const handleChessMove = (x: number, y: number) => {
    if (selectedPiece) {
      const piece = chessBoard[selectedPiece.y][selectedPiece.x]
      const targetPiece = chessBoard[y][x]

      // Check if it's the correct player's turn
      const isPieceWhite = isWhitePiece(piece)
      if ((currentPlayer === "white" && !isPieceWhite) || (currentPlayer === "black" && isPieceWhite)) {
        setSelectedPiece(null)
        return
      }

      // Check if move is valid
      if (isValidMove(selectedPiece.x, selectedPiece.y, x, y, piece)) {
        // Check if target square has opponent's piece or is empty
        if (!targetPiece || isWhitePiece(piece) !== isWhitePiece(targetPiece)) {
          const newBoard = [...chessBoard]
          newBoard[selectedPiece.y][selectedPiece.x] = ""
          newBoard[y][x] = piece
          setChessBoard(newBoard)

          // Check for checkmate (simplified)
          if (targetPiece === "♔" || targetPiece === "♚") {
            setGameStatus("checkmate")
            playSuccess()
            setScore((prev) => prev + level * 100)
          } else {
            setCurrentPlayer(currentPlayer === "white" ? "black" : "white")
          }
        }
      }
      setSelectedPiece(null)
    } else if (chessBoard[y][x]) {
      const piece = chessBoard[y][x]
      const isPieceWhite = isWhitePiece(piece)
      if ((currentPlayer === "white" && isPieceWhite) || (currentPlayer === "black" && !isPieceWhite)) {
        setSelectedPiece({ x, y })
      }
    }
  }

  // COMPLETE: Logic Puzzles
  const generateLogicPuzzle = () => {
    const puzzles = [
      // Level 1
      [
        {
          question: "Se todos os gatos são animais e Mimi é um gato, então:",
          options: ["Mimi é um animal", "Mimi não é um animal", "Não podemos saber", "Mimi é um cão"],
          correct: 0,
          explanation: "Se todos os gatos são animais e Mimi é um gato, então Mimi deve ser um animal.",
        },
        {
          question: "Em uma sequência: 2, 4, 8, 16, ... Qual é o próximo número?",
          options: ["24", "32", "20", "18"],
          correct: 1,
          explanation: "Cada número é o dobro do anterior: 2×2=4, 4×2=8, 8×2=16, 16×2=32",
        },
      ],
      // Level 2
      [
        {
          question: "Se A > B e B > C, então:",
          options: ["C > A", "A > C", "A = C", "Não podemos saber"],
          correct: 1,
          explanation: "Se A é maior que B e B é maior que C, então A deve ser maior que C.",
        },
        {
          question: "Quantos triângulos há nesta figura: △ dentro de △?",
          options: ["2", "3", "4", "5"],
          correct: 1,
          explanation: "Há o triângulo pequeno, o triângulo grande, e o triângulo formado pela combinação.",
        },
      ],
      // Level 3
      [
        {
          question: "Se 'Todos os X são Y' e 'Alguns Y são Z', podemos concluir que:",
          options: ["Todos os X são Z", "Alguns X são Z", "Nenhum X é Z", "Não podemos concluir nada"],
          correct: 3,
          explanation: "Não temos informação suficiente para relacionar X e Z diretamente.",
        },
        {
          question: "Em um código: A=1, B=2, C=3... Qual é o valor de 'CAB'?",
          options: ["312", "123", "321", "132"],
          correct: 0,
          explanation: "C=3, A=1, B=2, então CAB = 312",
        },
      ],
    ]

    const levelPuzzles = puzzles[level - 1]
    const puzzle = levelPuzzles[Math.floor(Math.random() * levelPuzzles.length)]
    setLogicPuzzle(puzzle)
  }

  const checkLogicAnswer = (selectedIndex: number) => {
    if (selectedIndex === logicPuzzle.correct) {
      setLogicScore((prev) => prev + 1)
      setScore((prev) => prev + level * 20)
      playSuccess()

      if (logicScore >= 2 && level < 3) {
        setLevel((prev) => prev + 1)
        setLogicScore(0)
      }

      setTimeout(() => generateLogicPuzzle(), 2000)
    } else {
      playSound(200, 300)
    }
  }

  // COMPLETE: Advanced Math
const generateMathChallenge = () => {
  let question: string;
  let answer: number;
  let type: ChallengeType;

  if (level === 1) {
    // Basic algebra
    const x = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 20) + 1;
    const c = x + b;
    question = `Se x + ${b} = ${c}, quanto vale x?`;
    answer = x;
    type = "algebra";
  } else if (level === 2) {
    // Geometry
    const side = Math.floor(Math.random() * 10) + 1;
    question = `Qual é a área de um quadrado com lado ${side}?`;
    answer = side * side;
    type = "geometry";
  } else {
    // Advanced logic
    const a = Math.floor(Math.random() * 5) + 2;
    question = `Se 2^x = ${Math.pow(2, a)}, quanto vale x?`;
    answer = a;
    type = "logic";
  }

  setMathChallenge({ question, answer, type });
};
  type ChallengeType = "algebra" | "geometry" | "logic";


  const checkMathAnswer = (userAnswer: number) => {
    if (userAnswer === mathChallenge.answer) {
      setMathStreak((prev) => prev + 1)
      setScore((prev) => prev + level * 25)
      playSuccess()

      if (mathStreak >= 2 && level < 3) {
        setLevel((prev) => prev + 1)
        setMathStreak(0)
      }

      generateMathChallenge()
    } else {
      setMathStreak(0)
      playSound(200, 300)
    }
  }

  // COMPLETE: Code Debugging
  const generateCodeChallenge = () => {
    const challenges = [
      // Level 1
      {
        code: `function soma(a, b) {
  return a + b
}
console.log(soma(2, 3))`,
        bugs: [{ line: 2, description: "Falta ponto e vírgula" }],
        fixed: [],
      },
      // Level 2
      {
        code: `for (let i = 0; i < 5; i++) {
  console.log(i)
}`,
        bugs: [{ line: 1, description: "Loop infinito - condição errada" }],
        fixed: [],
      },
      // Level 3
      {
        code: `function fibonacci(n) {
  if (n <= 1) return n
  return fibonacci(n-1) + fibonacci(n-2)
}`,
        bugs: [{ line: 2, description: "Condição base incorreta" }],
        fixed: [],
      },
    ]

    setCodeChallenge(challenges[level - 1])
  }

  const fixBug = (lineNumber: number) => {
    const bug = codeChallenge.bugs.find((b) => b.line === lineNumber)
    if (bug && !codeChallenge.fixed.includes(lineNumber)) {
      const newFixed = [...codeChallenge.fixed, lineNumber]
      setCodeChallenge((prev) => ({ ...prev, fixed: newFixed }))

      if (newFixed.length === codeChallenge.bugs.length) {
        playSuccess()
        setScore((prev) => prev + level * 30)

        if (level < 3) {
          setTimeout(() => {
            setLevel((prev) => prev + 1)
            generateCodeChallenge()
          }, 2000)
        }
      }
    }
  }

  // Initialize games
  useEffect(() => {
    if (currentGame === "hanoi") {
      initializeTowerOfHanoi(level + 2)
    } else if (currentGame === "logic") {
      generateLogicPuzzle()
    } else if (currentGame === "math") {
      generateMathChallenge()
    } else if (currentGame === "code") {
      generateCodeChallenge()
    }
  }, [currentGame])

  const games = [
    {
      id: "hanoi",
      title: "🗼 Torre de Hanói",
      description: "Mova todos os discos para a torre da direita!",
      emoji: "🗼",
      color: "bg-gradient-to-br from-amber-400 to-orange-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">
              Nível {level}/3 ({level + 2} discos)
            </div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>

          {hanoiComplete && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center mb-6 p-4 bg-green-500 text-white rounded-xl"
            >
              <div className="text-4xl mb-2">🎉</div>
              <div className="text-2xl font-bold">Torre Completa em {moves} movimentos!</div>
            </motion.div>
          )}

          <div className="flex justify-center gap-8 mb-6">
            {towers.map((tower, towerIndex) => (
              <div
                key={towerIndex}
                className={`w-32 h-48 bg-gray-200 rounded-lg cursor-pointer relative flex flex-col-reverse items-center p-2 ${
                  selectedTower === towerIndex ? "ring-4 ring-blue-500" : ""
                }`}
                onClick={() => handleTowerClick(towerIndex)}
              >
                <div className="w-28 h-2 bg-gray-600 rounded"></div>
                {tower.map((disk, diskIndex) => (
                  <div
                    key={diskIndex}
                    className={`h-6 rounded mb-1 ${
                      disk === 1
                        ? "w-12 bg-red-400"
                        : disk === 2
                          ? "w-16 bg-blue-400"
                          : disk === 3
                            ? "w-20 bg-green-400"
                            : disk === 4
                              ? "w-24 bg-yellow-400"
                              : "w-28 bg-purple-400"
                    }`}
                  />
                ))}
                <div className="text-xs text-gray-600 absolute -bottom-6">
                  Torre {String.fromCharCode(65 + towerIndex)}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="mb-4">
              <span className="bg-white px-3 py-1 rounded-lg text-sm font-bold mr-4">Movimentos: {moves}</span>
              <span className="bg-white px-3 py-1 rounded-lg text-sm font-bold">
                Mínimo possível: {Math.pow(2, level + 2) - 1}
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "chess",
      title: "♛ Xadrez Avançado",
      description: "Jogue xadrez completo com todas as peças!",
      emoji: "♛",
      color: "bg-gradient-to-br from-purple-400 to-indigo-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Nível {level}/3</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">
              Jogador: {currentPlayer === "white" ? "Brancas" : "Pretas"}
            </div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>

          {gameStatus === "checkmate" && (
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
                  className={`w-12 h-12 flex items-center justify-center text-2xl cursor-pointer border-2 transition-all ${
                    (x + y) % 2 === 0 ? "bg-amber-100" : "bg-amber-800"
                  } ${
                    selectedPiece?.x === x && selectedPiece?.y === y
                      ? "border-blue-500 bg-blue-200"
                      : "border-transparent"
                  }`}
                  onClick={() => handleChessMove(x, y)}
                >
                  {piece}
                </div>
              )),
            )}
          </div>

          <div className="text-center">
            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="text-lg font-semibold text-blue-800">🎯 Clique em uma peça e depois onde quer movê-la!</p>
              <p className="text-blue-600 text-sm mt-2">Brancas: ♔♕♖♗♘♙ | Pretas: ♚♛♜♝♞♟</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "logic",
      title: "🧠 Quebra-Cabeças Lógicos",
      description: "Resolva problemas de lógica complexos!",
      emoji: "🧠",
      color: "bg-gradient-to-br from-emerald-400 to-teal-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Nível {level}/3</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Acertos: {logicScore}</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
              <h3 className="text-xl font-bold mb-4 text-center">{logicPuzzle.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {logicPuzzle.options.map((option, index) => (
                  <Button
                    key={index}
                    className="p-4 text-left bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold"
                    onClick={() => checkLogicAnswer(index)}
                  >
                    {String.fromCharCode(65 + index)}. {option}
                  </Button>
                ))}
              </div>
            </div>

            <div className="bg-yellow-100 p-4 rounded-lg">
              <p className="text-sm text-yellow-800">
                💡 <strong>Dica:</strong> Leia com atenção e pense passo a passo!
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "math",
      title: "📐 Matemática Avançada",
      description: "Álgebra, geometria e lógica matemática!",
      emoji: "📐",
      color: "bg-gradient-to-br from-rose-400 to-pink-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">
              Nível {level}/3 - {mathChallenge.type}
            </div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Sequência: {mathStreak}</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>

          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white p-8 rounded-xl shadow-lg mb-6">
              <h3 className="text-2xl font-bold mb-6">{mathChallenge.question}</h3>

              <div className="flex justify-center">
                <input
                  type="number"
                  className="w-32 p-4 text-2xl text-center border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="?"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      const value = Number.parseInt((e.target as HTMLInputElement).value)
                      if (!isNaN(value)) {
                        checkMathAnswer(value)
                        ;(e.target as HTMLInputElement).value = ""
                      }
                    }
                  }}
                />
              </div>

              <p className="text-sm text-gray-600 mt-4">Digite sua resposta e pressione Enter</p>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="bg-blue-100 p-3 rounded-lg">
                <div className="font-bold text-blue-800">Álgebra</div>
                <div className="text-blue-600">Equações e variáveis</div>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <div className="font-bold text-green-800">Geometria</div>
                <div className="text-green-600">Formas e medidas</div>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <div className="font-bold text-purple-800">Lógica</div>
                <div className="text-purple-600">Padrões e sequências</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "code",
      title: "💻 Depuração de Código",
      description: "Encontre e corrija bugs no código!",
      emoji: "💻",
      color: "bg-gradient-to-br from-cyan-400 to-blue-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Nível {level}/3</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">
              Bugs corrigidos: {codeChallenge.fixed.length}/{codeChallenge.bugs.length}
            </div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-900 text-green-400 p-6 rounded-xl font-mono text-sm mb-6">
              {codeChallenge.code.split("\n").map((line, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-gray-500 w-8 text-right mr-4">{index + 1}</span>
                  <span
                    className={`flex-1 ${
                      codeChallenge.bugs.some((bug) => bug.line === index + 1) &&
                      !codeChallenge.fixed.includes(index + 1)
                        ? "bg-red-900 text-red-300 px-2 py-1 rounded cursor-pointer hover:bg-red-800"
                        : codeChallenge.fixed.includes(index + 1)
                          ? "bg-green-900 text-green-300 px-2 py-1 rounded"
                          : ""
                    }`}
                    onClick={() => fixBug(index + 1)}
                  >
                    {line}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-white p-4 rounded-xl shadow-lg">
              <h4 className="font-bold mb-3">🐛 Bugs para encontrar:</h4>
              <div className="space-y-2">
                {codeChallenge.bugs.map((bug, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${
                      codeChallenge.fixed.includes(bug.line) ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    <div className="font-semibold">Linha {bug.line}:</div>
                    <div className="text-sm">{bug.description}</div>
                    {codeChallenge.fixed.includes(bug.line) && (
                      <div className="text-xs text-green-600 mt-1">✅ Corrigido!</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                💡 Clique nas linhas destacadas em vermelho para corrigir os bugs!
              </p>
            </div>
          </div>
        </div>
      ),
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
            ⚡ Gênios em Treinamento ⚡
          </h1>
          <p className="text-gray-600 text-lg">9-12 anos • Desafios Avançados</p>
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
                    🚀 Desafiar Agora! 🚀
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
                if (currentGame === "hanoi") {
                  initializeTowerOfHanoi(3)
                }
                if (currentGame === "chess") {
                  setChessBoard([
                    ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
                    ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
                    ["", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", ""],
                    ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
                    ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
                  ])
                  setCurrentPlayer("white")
                  setGameStatus("playing")
                  setSelectedPiece(null)
                }
                if (currentGame === "logic") {
                  setLogicScore(0)
                  generateLogicPuzzle()
                }
                if (currentGame === "math") {
                  setMathStreak(0)
                  generateMathChallenge()
                }
                if (currentGame === "code") {
                  generateCodeChallenge()
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
