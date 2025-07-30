"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Volume2, Play, RotateCcw } from "lucide-react"
import Link from "next/link"
import { useAudio } from "@/hooks/use-audio"

export default function MusicPage() {
  const [currentGame, setCurrentGame] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const { playNote, playSuccess, playSound } = useAudio()

  // Simon Says Game - COMPLETE
  const [simonSequence, setSimonSequence] = useState<string[]>([])
  const [playerSequence, setPlayerSequence] = useState<string[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [gameActive, setGameActive] = useState(false)

  const simonColors = ["red", "blue", "green", "yellow", "purple", "orange"]
  const colorNotes = {
    red: "C",
    blue: "D",
    green: "E",
    yellow: "F",
    purple: "G",
    orange: "A",
  }

  // Melody Maker - COMPLETE
  const [melody, setMelody] = useState<string[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [isPlayingMelody, setIsPlayingMelody] = useState(false)

  const notes = [
    { note: "C", name: "Dó", color: "bg-red-400" },
    { note: "D", name: "Ré", color: "bg-orange-400" },
    { note: "E", name: "Mi", color: "bg-yellow-400" },
    { note: "F", name: "Fá", color: "bg-green-400" },
    { note: "G", name: "Sol", color: "bg-blue-400" },
    { note: "A", name: "Lá", color: "bg-indigo-400" },
    { note: "B", name: "Si", color: "bg-purple-400" },
  ]

  // Instrument Guessing Game - COMPLETE
  const [currentInstrument, setCurrentInstrument] = useState("")
  const [instrumentScore, setInstrumentScore] = useState(0)

  const instruments = [
    { name: "Piano", emoji: "🎹", sound: "piano" },
    { name: "Violão", emoji: "🎸", sound: "guitar" },
    { name: "Bateria", emoji: "🥁", sound: "drums" },
    { name: "Flauta", emoji: "🪈", sound: "flute" },
    { name: "Violino", emoji: "🎻", sound: "violin" },
    { name: "Trompete", emoji: "🎺", sound: "trumpet" },
    { name: "Saxofone", emoji: "🎷", sound: "saxophone" },
    { name: "Harpa", emoji: "🎶", sound: "harp" },
  ]

  // Rhythm Game - COMPLETE
  const [rhythmPattern, setRhythmPattern] = useState<boolean[]>([])
  const [playerRhythm, setPlayerRhythm] = useState<boolean[]>([])
  const [rhythmPlaying, setRhythmPlaying] = useState(false)
  const [beatIndex, setBeatIndex] = useState(0)

  // Music Staff Game - COMPLETE
  const [staffNotes, setStaffNotes] = useState<Array<{ note: string; position: number }>>([])
  const [selectedStaffNote, setSelectedStaffNote] = useState<string | null>(null)
  const [staffScore, setStaffScore] = useState(0)

  const staffNoteOptions = [
    { note: "C", position: 1, emoji: "🎵" },
    { note: "D", position: 2, emoji: "🎶" },
    { note: "E", position: 3, emoji: "🎼" },
    { note: "F", position: 4, emoji: "🎧" },
    { note: "G", position: 5, emoji: "🎤" },
  ]

  // COMPLETE: Simon Says Logic
  const startSimonGame = () => {
    const newNote = simonColors[Math.floor(Math.random() * simonColors.length)]
    setSimonSequence([newNote])
    setPlayerSequence([])
    setGameActive(true)
    playSimonSequence([newNote])
  }

  const playSimonSequence = async (sequence: string[]) => {
    setIsPlaying(true)
    for (let i = 0; i < sequence.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 600 - level * 100)) // Faster for higher levels
      playNote(colorNotes[sequence[i] as keyof typeof colorNotes])
      // Visual feedback would go here (e.g., button flash)
    }
    setIsPlaying(false)
  }

  const handleSimonInput = (color: string) => {
    if (isPlaying || !gameActive) return

    const newPlayerSequence = [...playerSequence, color]
    setPlayerSequence(newPlayerSequence)
    playNote(colorNotes[color as keyof typeof colorNotes])

    // Check if player made a mistake
    if (newPlayerSequence[newPlayerSequence.length - 1] !== simonSequence[newPlayerSequence.length - 1]) {
      setGameActive(false)
      playSound(200, 500)
      alert(`Game Over! Você chegou ao nível ${level}`)
      return
    }

    // Check if player completed the sequence
    if (newPlayerSequence.length === simonSequence.length) {
      if (newPlayerSequence.join("") === simonSequence.join("")) {
        playSuccess()
        setScore((prev) => prev + level * 10)

        if (level < 3) {
          setTimeout(() => {
            setLevel((prev) => prev + 1)
            const newNote = simonColors[Math.floor(Math.random() * simonColors.length)]
            const newSequence = [...simonSequence, newNote]
            setSimonSequence(newSequence)
            setPlayerSequence([])
            playSimonSequence(newSequence)
          }, 1000)
        } else {
          alert("Parabéns! Você completou todos os níveis do Simon!")
        }
      }
    }
  }

  // COMPLETE: Melody Maker Logic
  const addNoteToMelody = (note: string) => {
    if (isRecording) {
      setMelody((prev) => [...prev, note])
    }
    playNote(note)
  }

  const playMelody = async () => {
    if (melody.length === 0) return

    setIsPlayingMelody(true)
    for (const note of melody) {
      playNote(note)
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
    setIsPlayingMelody(false)
  }

  // COMPLETE: Instrument Guessing Game Logic
  const generateInstrumentChallenge = () => {
    const levelInstruments = level === 1 ? instruments.slice(0, 3) : level === 2 ? instruments.slice(0, 6) : instruments
    const randomInstrument = levelInstruments[Math.floor(Math.random() * levelInstruments.length)]
    setCurrentInstrument(randomInstrument.name)
    // In a real app, you would play the instrument sound here
    playSound(randomInstrument.sound) // Using playSound for placeholder
  }

  const checkInstrumentAnswer = (selectedInstrument: string) => {
    if (selectedInstrument === currentInstrument) {
      playSuccess()
      setInstrumentScore((prev) => prev + 1)
      setScore((prev) => prev + level * 15)

      if (instrumentScore >= 2 && level < 3) {
        setTimeout(() => {
          setLevel((prev) => prev + 1)
          setInstrumentScore(0)
          generateInstrumentChallenge()
        }, 1000)
      } else {
        setTimeout(() => generateInstrumentChallenge(), 1000)
      }
    } else {
      playSound(200, 300)
    }
  }

  // COMPLETE: Rhythm Game Logic
  const generateRhythmPattern = () => {
    const patternLength = level + 3 // 4, 5, or 6 beats
    const pattern = Array.from({ length: patternLength }, () => Math.random() > 0.5)
    setRhythmPattern(pattern)
    setPlayerRhythm([])
    playRhythmPattern(pattern)
  }

  const playRhythmPattern = async (pattern: boolean[]) => {
    setRhythmPlaying(true)
    for (let i = 0; i < pattern.length; i++) {
      setBeatIndex(i)
      if (pattern[i]) {
        playNote("C") // Play a simple beat sound
      }
      await new Promise((resolve) => setTimeout(resolve, 400 - level * 50)) // Faster tempo for higher levels
    }
    setBeatIndex(-1)
    setRhythmPlaying(false)
  }

  const addRhythmBeat = (hasBeat: boolean) => {
    if (rhythmPlaying) return

    const newRhythm = [...playerRhythm, hasBeat]
    setPlayerRhythm(newRhythm)

    if (hasBeat) {
      playNote("C")
    }

    if (newRhythm.length === rhythmPattern.length) {
      const matches = newRhythm.every((beat, index) => beat === rhythmPattern[index])
      if (matches) {
        playSuccess()
        setScore((prev) => prev + level * 20)
        if (level < 3) {
          setTimeout(() => {
            setLevel((prev) => prev + 1)
            generateRhythmPattern()
          }, 1000)
        } else {
          alert("Parabéns! Você dominou o ritmo!")
        }
      } else {
        playSound(200, 300)
        setTimeout(() => setPlayerRhythm([]), 1000)
      }
    }
  }

  // COMPLETE: Music Staff Game Logic
  const generateStaffNotes = () => {
    const numNotes = level + 2 // 3, 4, or 5 notes
    const randomNotes = Array.from({ length: numNotes }, () => ({
      note: staffNoteOptions[Math.floor(Math.random() * staffNoteOptions.length)].note,
      position: Math.floor(Math.random() * 5) + 1, // 1 to 5 for staff lines
    }))
    setStaffNotes(randomNotes)
    setSelectedStaffNote(null)
  }

  const checkStaffNote = (note: string) => {
    if (staffNotes.length > 0 && staffNotes[0].note === note) {
      playSuccess()
      setStaffScore((prev) => prev + 1)
      setScore((prev) => prev + level * 25)
      playNote(note)
      setStaffNotes((prev) => prev.slice(1)) // Remove the first note

      if (staffNotes.length === 1 && level < 3) {
        setTimeout(() => {
          setLevel((prev) => prev + 1)
          setStaffScore(0)
          generateStaffNotes()
        }, 2000)
      } else if (staffNotes.length === 1 && level === 3) {
        alert("Parabéns! Você leu todas as notas!")
      }
    } else {
      playSound(200, 300)
    }
  }

  // Initialize games
  useEffect(() => {
    if (currentGame === "instrument") {
      generateInstrumentChallenge()
    } else if (currentGame === "rhythm") {
      generateRhythmPattern()
    } else if (currentGame === "staff") {
      generateStaffNotes()
    }
  }, [currentGame, level])

  const games = [
    {
      id: "simon",
      title: "🎶 Simon dos Sons",
      description: "Repita a sequência de notas musicais!",
      emoji: "🎶",
      color: "bg-gradient-to-br from-red-400 to-orange-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Nível {level}/3</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>

          <div className="mb-6 text-center">
            {!gameActive ? (
              <Button onClick={startSimonGame} size="lg">
                <Play className="w-4 h-4 mr-2" />
                Começar Jogo
              </Button>
            ) : (
              <div className="text-lg text-gray-600">{isPlaying ? "Escute a sequência..." : "Sua vez!"}</div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
            {simonColors.slice(0, level * 2).map((color) => (
              <motion.button
                key={color}
                className={`w-24 h-24 rounded-lg shadow-lg ${
                  color === "red"
                    ? "bg-red-500"
                    : color === "blue"
                      ? "bg-blue-500"
                      : color === "green"
                        ? "bg-green-500"
                        : color === "yellow"
                          ? "bg-yellow-500"
                          : color === "purple"
                            ? "bg-purple-500"
                            : "bg-orange-500"
                } ${isPlaying ? "opacity-50" : "hover:opacity-80"}`}
                whileHover={{ scale: isPlaying ? 1 : 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSimonInput(color)}
                disabled={isPlaying}
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "melody",
      title: "🎹 Monte sua Melodia",
      description: "Crie e toque suas próprias melodias!",
      emoji: "🎹",
      color: "bg-gradient-to-br from-blue-400 to-purple-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Nível {level}/3</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>
          <div className="mb-6 text-center">
            <div className="flex justify-center gap-2 mb-4">
              <Button onClick={() => setIsRecording(!isRecording)} variant={isRecording ? "default" : "outline"}>
                {isRecording ? "Parar Gravação" : "Gravar Melodia"}
              </Button>
              <Button onClick={playMelody} disabled={melody.length === 0 || isPlayingMelody}>
                <Play className="w-4 h-4 mr-2" />
                Tocar Melodia
              </Button>
              <Button onClick={() => setMelody([])} variant="outline">
                Limpar
              </Button>
            </div>

            {isRecording && <div className="text-red-600 font-bold mb-4">🔴 Gravando... Toque as notas!</div>}
          </div>

          {/* Piano Keys */}
          <div className="flex justify-center gap-1 mb-6">
            {notes.map((noteObj) => (
              <motion.button
                key={noteObj.note}
                className={`${noteObj.color} w-12 h-32 rounded-lg shadow-lg text-white font-bold flex flex-col items-center justify-end pb-2`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => addNoteToMelody(noteObj.note)}
              >
                <div className="text-xs">{noteObj.name}</div>
                <div className="text-lg">{noteObj.note}</div>
              </motion.button>
            ))}
          </div>

          {/* Melody Display */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-bold mb-2">Sua Melodia:</h4>
            <div className="flex flex-wrap gap-2 min-h-[40px]">
              {melody.map((note, index) => (
                <span key={index} className="bg-blue-100 px-2 py-1 rounded text-sm">
                  {note}
                </span>
              ))}
              {melody.length === 0 && <span className="text-gray-500 text-sm">Nenhuma nota gravada ainda...</span>}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "instrument",
      title: "🥁 Qual é o Instrumento?",
      description: "Identifique instrumentos pelos seus sons!",
      emoji: "🥁",
      color: "bg-gradient-to-br from-green-400 to-teal-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Nível {level}/3</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Acertos: {instrumentScore}</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Que instrumento é este?</h3>
            <div className="text-6xl mb-4">🎵</div>
            <Button onClick={generateInstrumentChallenge} className="mb-4">
              <Volume2 className="w-4 h-4 mr-2" />
              Ouvir Som
            </Button>
            <div className="text-sm text-gray-600">(Som do instrumento: {currentInstrument})</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-6">
            {(level === 1 ? instruments.slice(0, 3) : level === 2 ? instruments.slice(0, 6) : instruments).map(
              (instrument) => (
                <motion.button
                  key={instrument.name}
                  className="p-4 bg-purple-100 hover:bg-purple-200 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => checkInstrumentAnswer(instrument.name)}
                >
                  <div className="text-4xl mb-2">{instrument.emoji}</div>
                  <div className="text-sm font-semibold">{instrument.name}</div>
                </motion.button>
              ),
            )}
          </div>
        </div>
      ),
    },
    {
      id: "rhythm",
      title: "🥁 Jogo do Ritmo",
      description: "Reproduza o padrão rítmico que você ouvir!",
      emoji: "🥁",
      color: "bg-gradient-to-br from-yellow-400 to-orange-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Nível {level}/3</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>

          <div className="mb-6 text-center">
            <h3 className="text-2xl font-bold mb-4">Reproduza o Ritmo</h3>
            <Button onClick={() => playRhythmPattern(rhythmPattern)} disabled={rhythmPlaying} className="mb-4">
              <Volume2 className="w-4 h-4 mr-2" />
              Ouvir Ritmo
            </Button>
          </div>

          {/* Rhythm Pattern Display */}
          <div className="mb-6">
            <h4 className="font-bold mb-2">Padrão Original:</h4>
            <div className="flex justify-center gap-2">
              {rhythmPattern.map((beat, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded border-2 ${
                    beat ? "bg-blue-500 border-blue-600" : "bg-gray-200 border-gray-300"
                  } ${beatIndex === index ? "ring-2 ring-yellow-400" : ""}`}
                />
              ))}
            </div>
          </div>

          {/* Player Input */}
          <div className="mb-6">
            <h4 className="font-bold mb-2">Seu Ritmo:</h4>
            <div className="flex justify-center gap-2 mb-4">
              {Array.from({ length: rhythmPattern.length }).map((_, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded border-2 ${
                    playerRhythm[index] === true
                      ? "bg-green-500 border-green-600"
                      : playerRhythm[index] === false
                        ? "bg-gray-200 border-gray-300"
                        : "bg-white border-gray-400 border-dashed"
                  }`}
                />
              ))}
            </div>

            {playerRhythm.length < rhythmPattern.length && (
              <div className="flex justify-center gap-4">
                <Button onClick={() => addRhythmBeat(true)} disabled={rhythmPlaying}>
                  🥁 Batida
                </Button>
                <Button onClick={() => addRhythmBeat(false)} variant="outline" disabled={rhythmPlaying}>
                  🤫 Silêncio
                </Button>
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      id: "staff",
      title: "🎼 Leitura de Partitura",
      description: "Identifique as notas na partitura!",
      emoji: "🎼",
      color: "bg-gradient-to-br from-indigo-400 to-purple-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Nível {level}/3</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Acertos: {staffScore}</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Qual é a próxima nota?</h3>
            <div className="relative w-full max-w-md mx-auto h-40 bg-white border-2 border-gray-300 rounded-lg overflow-hidden">
              {/* Staff lines */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="absolute left-0 right-0 bg-gray-400 h-0.5" style={{ top: `${20 + i * 15}%` }} />
              ))}
              {/* Notes */}
              {staffNotes.map((note, index) => (
                <motion.div
                  key={index}
                  className="absolute text-4xl"
                  style={{
                    left: `${20 + index * 20}%`,
                    top: `${20 + (5 - note.position) * 15}%`, // Adjust position based on note
                  }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  🎵
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            {staffNoteOptions.map((option) => (
              <motion.button
                key={option.note}
                className="p-4 bg-blue-100 hover:bg-blue-200 rounded-lg text-blue-800 font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => checkStaffNote(option.note)}
              >
                {option.note} ({option.position})
              </motion.button>
            ))}
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <Link href="/">
          <Button variant="outline" size="sm" className="bg-white hover:bg-gray-50">
            <Home className="w-4 h-4 mr-2" />🏠 Início
          </Button>
        </Link>
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            🎵 Musicalização Infantil 🎵
          </h1>
          <p className="text-gray-600 text-lg">Descobrindo o mundo da música</p>
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
                    ✨ Tocar Agora! ✨
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
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
            >
              ← 🎮 Voltar aos Jogos
            </Button>
            <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {games.find((g) => g.id === currentGame)?.title}
            </h2>
            <Button
              onClick={() => {
                setScore(0)
                setLevel(1)
                if (currentGame === "simon") {
                  setGameActive(false)
                  setSimonSequence([])
                  setPlayerSequence([])
                }
                if (currentGame === "melody") {
                  setMelody([])
                  setIsRecording(false)
                }
                if (currentGame === "instrument") {
                  setInstrumentScore(0)
                  generateInstrumentChallenge()
                }
                if (currentGame === "rhythm") {
                  generateRhythmPattern()
                }
                if (currentGame === "staff") {
                  setStaffScore(0)
                  generateStaffNotes()
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
