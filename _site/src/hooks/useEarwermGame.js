import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { NOTE_LABELS, NOTE_POOLS } from '../components/instruments/definitions.js'
import { delay, playNote } from '../game/audio.js'
import { GAME_PHASES } from '../game/constants.js'
import { resolveGameConfig } from '../game/customConfig.js'
import { saveSessionResults } from '../game/results.js'
import { generateSequence } from '../game/sequence.js'

function calcAccuracy(correct, total) {
  if (total === 0) return 0
  return Math.round((correct / total) * 100)
}

function roundScore(length, multiplier) {
  return Math.round(length * 100 * multiplier)
}

/**
 * @param {Object} options
 * @param {string} options.instrument
 * @param {string} options.difficulty
 * @param {import('../game/customConfig.js').DEFAULT_CUSTOM_SETTINGS} [options.customSettings]
 * @param {(path: string) => void} options.navigate
 */
export function useEarwermGame({ instrument, difficulty, customSettings, navigate }) {
  const config = useMemo(
    () => resolveGameConfig(difficulty, customSettings),
    [difficulty, customSettings],
  )
  const notePool = NOTE_POOLS[instrument] ?? NOTE_POOLS.piano

  const [phase, setPhase] = useState(GAME_PHASES.IDLE)
  const [sequence, setSequence] = useState([])
  const [userInput, setUserInput] = useState([])
  const [activeNotes, setActiveNotes] = useState([])
  const [displayedNote, setDisplayedNote] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [wrongNote, setWrongNote] = useState(null)

  const [score, setScore] = useState(0)
  const [round, setRound] = useState(0)
  const [replayCount, setReplayCount] = useState(0)
  const [correctNotes, setCorrectNotes] = useState(0)
  const [totalNotes, setTotalNotes] = useState(0)
  const [longestMelody, setLongestMelody] = useState(0)

  const playbackToken = useRef(0)
  const feedbackTimer = useRef(null)

  const clearFeedbackTimer = useCallback(() => {
    if (feedbackTimer.current) {
      clearTimeout(feedbackTimer.current)
      feedbackTimer.current = null
    }
  }, [])

  const endGame = useCallback(
    (stats) => {
      saveSessionResults({
        score: stats.score,
        accuracy: calcAccuracy(stats.correctNotes, stats.totalNotes),
        longestMelody: stats.longestMelody,
        instrument,
        difficulty,
      })
      navigate('/results')
    },
    [difficulty, instrument, navigate],
  )

  const playSequence = useCallback(
    async (seq) => {
      const token = ++playbackToken.current
      setPhase(GAME_PHASES.PLAYING)
      setActiveNotes([])
      setDisplayedNote(null)

      for (let i = 0; i < seq.length; i += 1) {
        if (token !== playbackToken.current) return

        const note = seq[i]
        const showHighlight =
          config.visualMode === 'highlights' || config.visualMode === 'normal'
        const showName = config.visualMode === 'names'

        if (showHighlight) {
          setActiveNotes([note])
        }
        if (showName) {
          setDisplayedNote(NOTE_LABELS[note] ?? note)
        }

        await playNote(instrument, note)
        await delay(config.noteDuration)

        setActiveNotes([])
        if (showName) {
          await delay(120)
          setDisplayedNote(null)
        }

        if (i < seq.length - 1) {
          await delay(config.playbackGap)
        }
      }

      if (token !== playbackToken.current) return

      setDisplayedNote(null)
      setActiveNotes([])
      setPhase(GAME_PHASES.INPUT)
    },
    [config, instrument],
  )

  const startRound = useCallback(
    async (seq) => {
      setUserInput([])
      setFeedback(null)
      setWrongNote(null)
      await playSequence(seq)
    },
    [playSequence],
  )

  const beginGame = useCallback(async () => {
    clearFeedbackTimer()
    playbackToken.current += 1

    const initialSequence = generateSequence(config.length, notePool)
    setSequence(initialSequence)
    setUserInput([])
    setFeedback(null)
    setWrongNote(null)
    setScore(0)
    setRound(0)
    setReplayCount(0)
    setCorrectNotes(0)
    setTotalNotes(0)
    setLongestMelody(0)

    await startRound(initialSequence)
  }, [clearFeedbackTimer, config.length, notePool, startRound])

  const replaySequence = useCallback(async () => {
    if (phase !== GAME_PHASES.INPUT || sequence.length === 0) return

    setReplayCount((count) => count + 1)
    setUserInput([])
    setFeedback(null)
    setWrongNote(null)
    await playSequence(sequence)
  }, [phase, playSequence, sequence])

  const handleNoteSelect = useCallback(
    (noteId) => {
      if (phase !== GAME_PHASES.INPUT) return

      playNote(instrument, noteId)

      const nextIndex = userInput.length
      const expected = sequence[nextIndex]

      const nextInput = [...userInput, noteId]
      setUserInput(nextInput)
      setTotalNotes((total) => total + 1)

      if (noteId !== expected) {
        setWrongNote(noteId)
        setActiveNotes([])
        setFeedback('incorrect')
        setPhase(GAME_PHASES.FEEDBACK)
        clearFeedbackTimer()
        feedbackTimer.current = setTimeout(() => {
          endGame({
            score,
            correctNotes,
            totalNotes: totalNotes + 1,
            longestMelody,
          })
        }, 4000)
        return
      }

      setActiveNotes([noteId])
      setTimeout(() => setActiveNotes([]), 180)

      setCorrectNotes((correct) => correct + 1)

      if (nextInput.length === sequence.length) {
        const nextRound = round + 1
        const points = roundScore(config.length, config.scoreMultiplier)
        const nextScore = score + points

        setFeedback('correct')
        setPhase(GAME_PHASES.FEEDBACK)
        setRound(nextRound)
        setScore(nextScore)
        setLongestMelody((longest) => Math.max(longest, nextRound))

        clearFeedbackTimer()
        feedbackTimer.current = setTimeout(async () => {
          const nextSequence = generateSequence(config.length, notePool)
          setSequence(nextSequence)
          setFeedback(null)
          await startRound(nextSequence)
        }, 1100)
      }
    },
    [
      phase,
      instrument,
      userInput,
      sequence,
      clearFeedbackTimer,
      endGame,
      score,
      correctNotes,
      totalNotes,
      longestMelody,
      round,
      config.length,
      config.scoreMultiplier,
      notePool,
      startRound,
    ],
  )

  useEffect(() => {
    return () => {
      playbackToken.current += 1
      clearFeedbackTimer()
    }
  }, [clearFeedbackTimer])

  const settingsLocked = phase === GAME_PHASES.PLAYING || phase === GAME_PHASES.INPUT

  const statusMessage = (() => {
    if (phase === GAME_PHASES.IDLE) {
      return 'Press Start to hear your first sequence.'
    }
    if (phase === GAME_PHASES.PLAYING) {
      if (config.visualMode === 'audio-only') {
        return 'Listen carefully — audio only.'
      }
      if (config.visualMode === 'names') {
        return 'Watch the note names.'
      }
      if (config.visualMode === 'highlights' || config.visualMode === 'normal') {
        return 'Watch the instrument — notes will light up.'
      }
      return 'Listen to the sequence…'
    }
    if (phase === GAME_PHASES.INPUT) {
      return `Your turn — ${userInput.length} / ${sequence.length} notes`
    }
    if (feedback === 'correct') {
      return 'Perfect! Next sequence coming up.'
    }
    if (feedback === 'incorrect') {
      return 'Wrong note. Here is the correct sequence.'
    }
    return ''
  })()

  return {
    phase,
    sequence,
    userInput,
    activeNotes,
    wrongNote,
    displayedNote,
    feedback,
    score,
    round,
    replayCount,
    sequenceLength: config.length,
    visualMode: config.visualMode,
    settingsLocked,
    statusMessage,
    beginGame,
    replaySequence,
    handleNoteSelect,
  }
}
