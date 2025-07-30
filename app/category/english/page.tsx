"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Volume2, RotateCcw } from "lucide-react"
import Link from "next/link"
import { useAudio } from "@/hooks/use-audio"

export default function EnglishPage() {
  const [currentGame, setCurrentGame] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const { playSuccess, playSound } = useAudio()

  // Color Game - COMPLETE
  const [currentColor, setCurrentColor] = useState("")
  const [colorScore, setColorScore] = useState(0)
  const colors = [
    { name: "RED", color: "bg-red-500", emoji: "🔴" },
    { name: "BLUE", color: "bg-blue-500", emoji: "🔵" },
    { name: "GREEN", color: "bg-green-500", emoji: "🟢" },
    { name: "YELLOW", color: "bg-yellow-500", emoji: "🟡" },
    { name: "PURPLE", color: "bg-purple-500", emoji: "🟣" },
    { name: "ORANGE", color: "bg-orange-500", emoji: "🟠" },
    { name: "PINK", color: "bg-pink-500", emoji: "🩷" },
    { name: "BROWN", color: "bg-amber-700", emoji: "🤎" },
  ]

  // Word-Image Matching - COMPLETE
  const [wordImagePairs] = useState([
    // Level 1 - Basic
    { word: "APPLE", image: "🍎", audio: "apple" },
    { word: "CAT", image: "🐱", audio: "cat" },
    { word: "DOG", image: "🐶", audio: "dog" },
    { word: "SUN", image: "☀️", audio: "sun" },
    // Level 2 - Intermediate
    { word: "HOUSE", image: "🏠", audio: "house" },
    { word: "TREE", image: "🌳", audio: "tree" },
    { word: "FLOWER", image: "🌸", audio: "flower" },
    { word: "BIRD", image: "🐦", audio: "bird" },
    // Level 3 - Advanced
    { word: "BUTTERFLY", image: "🦋", audio: "butterfly" },
    { word: "RAINBOW", image: "🌈", audio: "rainbow" },
    { word: "ELEPHANT", image: "🐘", audio: "elephant" },
    { word: "COMPUTER", image: "💻", audio: "computer" },
  ])
  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [matchedPairs, setMatchedPairs] = useState<string[]>([])

  // Hangman Game - COMPLETE
  const [hangmanWord, setHangmanWord] = useState("")
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const [wrongGuesses, setWrongGuesses] = useState(0)
  const [gameWon, setGameWon] = useState(false)
  const [gameLost, setGameLost] = useState(false)

  const hangmanWords = [
    // Level 1
    ["CAT", "DOG", "SUN", "CAR", "BED"],
    // Level 2
    ["HOUSE", "APPLE", "WATER", "HAPPY", "MUSIC"],
    // Level 3
    ["ELEPHANT", "COMPUTER", "RAINBOW", "BUTTERFLY", "ADVENTURE"],
  ]

  // Vocabulary Quiz - COMPLETE
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [quizScore, setQuizScore] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)
  const vocabularyQuiz = [
    // Level 1
    [
      {
        question: "What color is the sun?",
        options: ["RED", "BLUE", "YELLOW", "GREEN"],
        correct: "YELLOW",
        image: "☀️",
      },
      { question: "What animal says 'meow'?", options: ["DOG", "CAT", "BIRD", "FISH"], correct: "CAT", image: "🐱" },
      { question: "What do we live in?", options: ["TREE", "CAR", "HOUSE", "BOOK"], correct: "HOUSE", image: "🏠" },
    ],
    // Level 2
    [
      {
        question: "What fruit is red and round?",
        options: ["BANANA", "APPLE", "ORANGE", "GRAPE"],
        correct: "APPLE",
        image: "🍎",
      },
      { question: "What flies in the sky?", options: ["FISH", "CAR", "BIRD", "TREE"], correct: "BIRD", image: "🐦" },
      {
        question: "What gives us light at night?",
        options: ["SUN", "MOON", "TREE", "CAR"],
        correct: "MOON",
        image: "🌙",
      },
    ],
    // Level 3
    [
      {
        question: "What has many colors after rain?",
        options: ["CLOUD", "RAINBOW", "TREE", "HOUSE"],
        correct: "RAINBOW",
        image: "🌈",
      },
      {
        question: "What large animal has a trunk?",
        options: ["LION", "TIGER", "ELEPHANT", "BEAR"],
        correct: "ELEPHANT",
        image: "🐘",
      },
      {
        question: "What do we use to type?",
        options: ["PHONE", "COMPUTER", "BOOK", "PENCIL"],
        correct: "COMPUTER",
        image: "💻",
      },
    ],
  ]

  // Alphabet Game - COMPLETE
  const [currentLetter, setCurrentLetter] = useState("A")
  const [alphabetProgress, setAlphabetProgress] = useState<string[]>([])
  const [alphabetComplete, setAlphabetComplete] = useState(false)

  // Sentence Building - NEW
  const [sentenceWords, setSentenceWords] = useState<string[]>([])
  const [targetSentence, setTargetSentence] = useState("")
  const [userSentence, setUserSentence] = useState<string[]>([])
  const [sentenceComplete, setSentenceComplete] = useState(false)

  const playAudio = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "en-US"
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  // COMPLETE: Color Game Logic
  const generateColorChallenge = () => {
    const levelColors = level === 1 ? colors.slice(0, 4) : level === 2 ? colors.slice(0, 6) : colors
    const randomColor = levelColors[Math.floor(Math.random() * levelColors.length)]
    setCurrentColor(randomColor.name)
    playAudio(`Touch the color ${randomColor.name}`)
  }

  const checkColorAnswer = (selectedColor: string) => {
    if (selectedColor === currentColor) {
      playSuccess()
      setColorScore((prev) => prev + 1)
      setScore((prev) => prev + level * 5)

      if (colorScore >= 4 && level < 3) {
        setLevel((prev) => prev + 1)
        setColorScore(0)
      }

      setTimeout(() => generateColorChallenge(), 1000)
    } else {
      playSound(200, 300)
    }
  }

  // COMPLETE: Word-Image Matching Logic
  const getCurrentPairs = () => {
    const startIndex = (level - 1) * 4
    return wordImagePairs.slice(startIndex, startIndex + 4)
  }

  const checkWordImageMatch = (word: string, image: string) => {
    const currentPairs = getCurrentPairs()
    const pair = currentPairs.find((p) => p.word === word && p.image === image)

    if (pair) {
      setMatchedPairs((prev) => [...prev, word])
      playSuccess()
      setScore((prev) => prev + level * 10)
      playAudio(pair.audio)

      if (matchedPairs.length + 1 === currentPairs.length && level < 3) {
        setTimeout(() => {
          setLevel((prev) => prev + 1)
          setMatchedPairs([])
          setSelectedWord(null)
          setSelectedImage(null)
        }, 2000)
      }
    } else {
      playSound(200, 300)
    }
    setSelectedWord(null)
    setSelectedImage(null)
  }

  // COMPLETE: Hangman Logic
  const initializeHangman = () => {
    const levelWords = hangmanWords[level - 1]
    const word = levelWords[Math.floor(Math.random() * levelWords.length)]
    setHangmanWord(word)
    setGuessedLetters([])
    setWrongGuesses(0)
    setGameWon(false)
    setGameLost(false)
  }

  const guessLetter = (letter: string) => {
    if (guessedLetters.includes(letter)) return

    const newGuessedLetters = [...guessedLetters, letter]
    setGuessedLetters(newGuessedLetters)

    if (hangmanWord.includes(letter)) {
      playSuccess()
      if (hangmanWord.split("").every((l) => newGuessedLetters.includes(l))) {
        setGameWon(true)
        setScore((prev) => prev + level * 20)
        playAudio("Well done!")

        if (level < 3) {
          setTimeout(() => {
            setLevel((prev) => prev + 1)
            initializeHangman()
          }, 3000)
        }
      }
    } else {
      const newWrongGuesses = wrongGuesses + 1
      setWrongGuesses(newWrongGuesses)
      playSound(200, 300)

      if (newWrongGuesses >= 6) {
        setGameLost(true)
        playAudio(`The word was ${hangmanWord}`)
      }
    }
  }

  // COMPLETE: Quiz Logic
  const answerQuizQuestion = (answer: string) => {
    const currentQuiz = vocabularyQuiz[level - 1]
    const question = currentQuiz[currentQuestion]

    if (answer === question.correct) {
      playSuccess()
      setQuizScore((prev) => prev + 1)
      setScore((prev) => prev + level * 15)
      playAudio("Correct!")
    } else {
      playSound(200, 300)
      playAudio(`Wrong! The answer is ${question.correct}`)
    }

    setTimeout(() => {
      if (currentQuestion < currentQuiz.length - 1) {
        setCurrentQuestion((prev) => prev + 1)
      } else {
        setQuizComplete(true)
        if (level < 3 && quizScore >= 2) {
          setTimeout(() => {
            setLevel((prev) => prev + 1)
            setCurrentQuestion(0)
            setQuizScore(0)
            setQuizComplete(false)
          }, 3000)
        }
      }
    }, 2000)
  }

  // COMPLETE: Alphabet Logic
  const nextLetter = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const currentIndex = alphabet.indexOf(currentLetter)

    if (currentIndex < alphabet.length - 1) {
      const nextLetter = alphabet[currentIndex + 1]
      setCurrentLetter(nextLetter)
      setAlphabetProgress((prev) => [...prev, currentLetter])
      playAudio(nextLetter)
    } else {
      setAlphabetComplete(true)
      setScore((prev) => prev + level * 25)
      playSuccess()
    }
  }

  // NEW: Sentence Building Logic
  const generateSentence = () => {
    const sentences = [
      // Level 1
      { target: "I LIKE CATS", words: ["I", "LIKE", "CATS", "DOGS", "HATE"] },
      { target: "THE SUN IS HOT", words: ["THE", "SUN", "IS", "HOT", "COLD", "MOON"] },
      // Level 2
      { target: "I AM HAPPY TODAY", words: ["I", "AM", "HAPPY", "TODAY", "SAD", "YESTERDAY"] },
      { target: "BIRDS CAN FLY HIGH", words: ["BIRDS", "CAN", "FLY", "HIGH", "LOW", "SWIM"] },
      // Level 3
      { target: "THE RAINBOW HAS MANY COLORS", words: ["THE", "RAINBOW", "HAS", "MANY", "COLORS", "FEW", "SOUNDS"] },
    ]

    const sentence = sentences[Math.min(level - 1, sentences.length - 1)]
    setTargetSentence(sentence.target)
    setSentenceWords(sentence.words.sort(() => Math.random() - 0.5))
    setUserSentence([])
    setSentenceComplete(false)
  }

  const addWordToSentence = (word: string) => {
    const newSentence = [...userSentence, word]
    setUserSentence(newSentence)
    setSentenceWords((prev) => prev.filter((w) => w !== word))

    if (newSentence.join(" ") === targetSentence) {
      setSentenceComplete(true)
      playSuccess()
      setScore((prev) => prev + level * 30)
      playAudio("Perfect sentence!")
    }
  }

  const removeWordFromSentence = (index: number) => {
    const word = userSentence[index]
    setUserSentence((prev) => prev.filter((_, i) => i !== index))
    setSentenceWords((prev) => [...prev, word])
  }

  // Initialize games
  useEffect(() => {
    if (currentGame === "colors") {
      generateColorChallenge()
    } else if (currentGame === "hangman") {
      initializeHangman()
    } else if (currentGame === "alphabet") {
      playAudio(currentLetter)
    } else if (currentGame === "sentence") {
      generateSentence()
    }
  }, [currentGame])

  const games = [
    {
      id: "colors",
      title: "🎨 Toque na Cor",
      description: "Ouça a cor em inglês e toque na correta!",
      emoji: "🎨",
      color: "bg-gradient-to-br from-red-400 to-pink-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Nível {level}/3</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Acertos: {colorScore}</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>

          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-4">Touch the color:</h3>
            <div className="text-4xl font-bold text-blue-600 mb-4">{currentColor}</div>
            <Button onClick={() => playAudio(`Touch the color ${currentColor}`)} variant="outline">
              <Volume2 className="w-4 h-4 mr-2" />
              Repetir
            </Button>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {(level === 1 ? colors.slice(0, 4) : level === 2 ? colors.slice(0, 6) : colors).map((color) => (
              <motion.button
                key={color.name}
                className={`${color.color} w-20 h-20 rounded-lg shadow-lg flex items-center justify-center text-3xl`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => checkColorAnswer(color.name)}
              >
                {color.emoji}
              </motion.button>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "matching",
      title: "🔗 Palavra e Imagem",
      description: "Conecte as palavras em inglês com as imagens!",
      emoji: "🔗",
      color: "bg-gradient-to-br from-blue-400 to-cyan-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Nível {level}/3</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">
              Pares: {matchedPairs.length}/{getCurrentPairs().length}
            </div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Words */}
            <div>
              <h4 className="font-bold mb-4 text-center">📝 Words</h4>
              <div className="space-y-2">
                {getCurrentPairs().map((pair) => (
                  <motion.button
                    key={pair.word}
                    className={`w-full p-3 rounded-lg font-bold ${
                      matchedPairs.includes(pair.word)
                        ? "bg-green-200 text-green-800"
                        : selectedWord === pair.word
                          ? "bg-blue-200 text-blue-800"
                          : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (matchedPairs.includes(pair.word)) return

                      if (selectedImage) {
                        checkWordImageMatch(pair.word, selectedImage)
                      } else {
                        setSelectedWord(pair.word)
                        playAudio(pair.audio)
                      }
                    }}
                    disabled={matchedPairs.includes(pair.word)}
                  >
                    {pair.word}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Images */}
            <div>
              <h4 className="font-bold mb-4 text-center">🖼️ Images</h4>
              <div className="grid grid-cols-2 gap-2">
                {getCurrentPairs().map((pair) => (
                  <motion.button
                    key={pair.image}
                    className={`aspect-square text-4xl rounded-lg ${
                      matchedPairs.includes(pair.word)
                        ? "bg-green-200"
                        : selectedImage === pair.image
                          ? "bg-blue-200"
                          : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (matchedPairs.includes(pair.word)) return

                      if (selectedWord) {
                        checkWordImageMatch(selectedWord, pair.image)
                      } else {
                        setSelectedImage(pair.image)
                      }
                    }}
                    disabled={matchedPairs.includes(pair.word)}
                  >
                    {pair.image}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "hangman",
      title: "🎯 Jogo da Forca",
      description: "Adivinhe a palavra em inglês letra por letra!",
      emoji: "🎯",
      color: "bg-gradient-to-br from-green-400 to-emerald-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Nível {level}/3</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Erros: {wrongGuesses}/6</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>

          <div className="text-center mb-6">
            {/* Hangman drawing */}
            <div className="text-6xl mb-4">
              {wrongGuesses === 0 && "😊"}
              {wrongGuesses === 1 && "😐"}
              {wrongGuesses === 2 && "😟"}
              {wrongGuesses === 3 && "😰"}
              {wrongGuesses === 4 && "😵"}
              {wrongGuesses === 5 && "💀"}
              {wrongGuesses >= 6 && "☠️"}
            </div>

            {/* Word display */}
            <div className="text-3xl font-bold mb-4 tracking-wider">
              {hangmanWord.split("").map((letter, index) => (
                <span key={index} className="mx-1">
                  {guessedLetters.includes(letter) ? letter : "_"}
                </span>
              ))}
            </div>

            {/* Game status */}
            {gameWon && <div className="text-2xl font-bold text-green-600 mb-4">🎉 You won! Well done!</div>}
            {gameLost && (
              <div className="text-2xl font-bold text-red-600 mb-4">😞 Game over! The word was: {hangmanWord}</div>
            )}
          </div>

          {/* Letter buttons */}
          {!gameWon && !gameLost && (
            <div className="grid grid-cols-6 gap-2 max-w-md mx-auto mb-6">
              {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
                <motion.button
                  key={letter}
                  className={`p-2 rounded font-bold ${
                    guessedLetters.includes(letter)
                      ? "bg-gray-300 text-gray-500"
                      : "bg-blue-100 hover:bg-blue-200 text-blue-800"
                  }`}
                  whileHover={{ scale: guessedLetters.includes(letter) ? 1 : 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => guessLetter(letter)}
                  disabled={guessedLetters.includes(letter)}
                >
                  {letter}
                </motion.button>
              ))}
            </div>
          )}

          <div className="flex justify-center gap-4">
            <Button onClick={initializeHangman}>New Word</Button>
            <Button onClick={() => playAudio(hangmanWord)} variant="outline">
              <Volume2 className="w-4 h-4 mr-2" />
              Hear Word
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: "quiz",
      title: "🧠 Quiz de Vocabulário",
      description: "Responda perguntas sobre palavras em inglês!",
      emoji: "🧠",
      color: "bg-gradient-to-br from-purple-400 to-violet-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Nível {level}/3</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Acertos: {quizScore}</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>

          {!quizComplete ? (
            <div className="text-center">
              <div className="mb-6">
                <div className="text-6xl mb-4">{vocabularyQuiz[level - 1][currentQuestion].image}</div>
                <h3 className="text-2xl font-bold mb-4">{vocabularyQuiz[level - 1][currentQuestion].question}</h3>
                <Button
                  onClick={() => playAudio(vocabularyQuiz[level - 1][currentQuestion].question)}
                  variant="outline"
                  className="mb-6"
                >
                  <Volume2 className="w-4 h-4 mr-2" />
                  Repetir Pergunta
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                {vocabularyQuiz[level - 1][currentQuestion].options.map((option) => (
                  <motion.button
                    key={option}
                    className="p-4 bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => answerQuizQuestion(option)}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>

              <div className="mt-6 text-sm text-gray-600">
                Question {currentQuestion + 1} of {vocabularyQuiz[level - 1].length}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold mb-4">Quiz Complete!</h3>
              <div className="text-xl mb-6">
                Final Score: {quizScore}/{vocabularyQuiz[level - 1].length}
              </div>
              <Button
                onClick={() => {
                  setCurrentQuestion(0)
                  setQuizScore(0)
                  setQuizComplete(false)
                }}
              >
                Play Again
              </Button>
            </div>
          )}
        </div>
      ),
    },
    {
      id: "alphabet",
      title: "🔤 Alfabeto Cantado",
      description: "Aprenda o alfabeto em inglês com sons!",
      emoji: "🔤",
      color: "bg-gradient-to-br from-yellow-400 to-orange-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Alfabeto Inglês</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Progresso: {alphabetProgress.length}/26</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>

          {!alphabetComplete ? (
            <div className="text-center">
              <div className="mb-8">
                <div className="text-8xl font-bold mb-4 text-blue-600">{currentLetter}</div>
                <Button onClick={() => playAudio(currentLetter)} variant="outline" className="mb-4">
                  <Volume2 className="w-4 h-4 mr-2" />
                  Repetir Letra
                </Button>
              </div>

              <div className="mb-6">
                <Button onClick={nextLetter} disabled={currentLetter === "Z"} size="lg">
                  Próxima Letra →
                </Button>
              </div>

              {/* Progress */}
              <div className="mb-6">
                <h4 className="font-bold mb-2">Progresso:</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {alphabetProgress.map((letter) => (
                    <span key={letter} className="bg-green-200 text-green-800 px-2 py-1 rounded text-sm">
                      {letter}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold mb-4">Alfabeto Completo!</h3>
              <div className="text-xl mb-6">Parabéns! Você aprendeu todo o alfabeto!</div>
              <Button
                onClick={() => {
                  setCurrentLetter("A")
                  setAlphabetProgress([])
                  setAlphabetComplete(false)
                  playAudio("A")
                }}
              >
                Recomeçar
              </Button>
            </div>
          )}
        </div>
      ),
    },
    {
      id: "sentence",
      title: "📝 Monte Frases",
      description: "Construa frases em inglês com as palavras!",
      emoji: "📝",
      color: "bg-gradient-to-br from-teal-400 to-cyan-500",
      component: (
        <div className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">Nível {level}/3</div>
            <div className="bg-white px-4 py-2 rounded-lg font-bold">Pontos: {score}</div>
          </div>

          {sentenceComplete && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center mb-6 p-4 bg-green-500 text-white rounded-xl"
            >
              <div className="text-4xl mb-2">🎉</div>
              <div className="text-2xl font-bold">Perfect Sentence!</div>
            </motion.div>
          )}

          <div className="text-center mb-6">
            <h3 className="text-xl font-bold mb-4">🎯 Target Sentence:</h3>
            <div className="text-2xl font-bold text-blue-600 mb-4">{targetSentence}</div>
            <Button onClick={() => playAudio(targetSentence)} variant="outline">
              <Volume2 className="w-4 h-4 mr-2" />
              Hear Sentence
            </Button>
          </div>

          {/* User's sentence */}
          <div className="mb-6">
            <h4 className="font-bold mb-3 text-center">✨ Your Sentence:</h4>
            <div className="min-h-[60px] bg-white border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-wrap gap-2 justify-center">
              {userSentence.map((word, index) => (
                <motion.button
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg font-bold hover:bg-blue-200"
                  onClick={() => removeWordFromSentence(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {word}
                </motion.button>
              ))}
              {userSentence.length === 0 && (
                <span className="text-gray-500 italic">Click words below to build your sentence</span>
              )}
            </div>
          </div>

          {/* Available words */}
          <div className="text-center">
            <h4 className="font-bold mb-3">📚 Available Words:</h4>
            <div className="flex flex-wrap gap-2 justify-center">
              {sentenceWords.map((word, index) => (
                <motion.button
                  key={index}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-bold"
                  onClick={() => addWordToSentence(word)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {word}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="text-center mt-6">
            <Button onClick={generateSentence} variant="outline">
              🎲 New Sentence
            </Button>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 p-4">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <Link href="/">
          <Button variant="outline" size="sm" className="bg-white hover:bg-gray-50">
            <Home className="w-4 h-4 mr-2" />🏠 Início
          </Button>
        </Link>
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            🌍 Inglês com Seraphine 🌍
          </h1>
          <p className="text-gray-600 text-lg">English Learning Games</p>
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
                    ✨ Let's Play! ✨
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
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
            >
              ← 🎮 Back to Games
            </Button>
            <h2 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {games.find((g) => g.id === currentGame)?.title}
            </h2>
            <Button
              onClick={() => {
                setScore(0)
                setLevel(1)
                if (currentGame === "colors") {
                  setColorScore(0)
                  generateColorChallenge()
                }
                if (currentGame === "hangman") {
                  initializeHangman()
                }
                if (currentGame === "quiz") {
                  setCurrentQuestion(0)
                  setQuizScore(0)
                  setQuizComplete(false)
                }
                if (currentGame === "matching") {
                  setMatchedPairs([])
                  setSelectedWord(null)
                  setSelectedImage(null)
                }
                if (currentGame === "alphabet") {
                  setCurrentLetter("A")
                  setAlphabetProgress([])
                  setAlphabetComplete(false)
                  playAudio("A")
                }
                if (currentGame === "sentence") {
                  generateSentence()
                }
              }}
              variant="outline"
              size="sm"
            >
              <RotateCcw className="w-4 h-4 mr-2" />🔄 Reset
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
