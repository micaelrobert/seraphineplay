"use client"

import { useCallback, useRef } from "react"

export function useAudio() {
  const audioContextRef = useRef<AudioContext | null>(null)

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      } catch (error) {
        console.warn("AudioContext not supported:", error)
        return null
      }
    }
    return audioContextRef.current
  }, [])

  const playSound = useCallback(
    (frequencyOrText: number | string, duration = 200, type: OscillatorType = "sine") => {
      // If it's a string, use speech synthesis
      if (typeof frequencyOrText === "string") {
        if ("speechSynthesis" in window) {
          const utterance = new SpeechSynthesisUtterance(frequencyOrText)
          utterance.lang = "pt-BR"
          utterance.rate = 0.8
          speechSynthesis.speak(utterance)
        }
        return
      }

      // Otherwise, play the frequency
      try {
        const ctx = getAudioContext()
        if (!ctx) return

        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)

        oscillator.frequency.value = frequencyOrText
        oscillator.type = type

        gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000)

        oscillator.start(ctx.currentTime)
        oscillator.stop(ctx.currentTime + duration / 1000)
      } catch (error) {
        console.warn("Audio playback failed:", error)
      }
    },
    [getAudioContext],
  )

  const playNote = useCallback(
    (note: string) => {
      const frequencies: { [key: string]: number } = {
        C: 261.63,
        D: 293.66,
        E: 329.63,
        F: 349.23,
        G: 392.0,
        A: 440.0,
        B: 493.88,
      }

      if (frequencies[note]) {
        playSound(frequencies[note], 500)
      }
    },
    [playSound],
  )

  const playSuccess = useCallback(() => {
    playSound(523.25, 100) // C5
    setTimeout(() => playSound(659.25, 100), 100) // E5
    setTimeout(() => playSound(783.99, 200), 200) // G5
  }, [playSound])

  const playError = useCallback(() => {
    playSound(200, 300, "sawtooth")
  }, [playSound])

  const playMelody = useCallback(
    async (notes: string[], tempo = 500) => {
      for (const note of notes) {
        playNote(note)
        await new Promise((resolve) => setTimeout(resolve, tempo))
      }
    },
    [playNote],
  )

  return {
    playSound,
    playNote,
    playSuccess,
    playError,
    playMelody,
  }
}
