import { PIANO_LAYOUT } from '../components/instruments/definitions.js'

const GUITAR_OPEN = [82.41, 110.0, 146.83, 196.0, 246.94, 329.63]

const PIANO_FREQ = Object.fromEntries(
  [
    ['c', 261.63],
    ['cs', 277.18],
    ['d', 293.66],
    ['ds', 311.13],
    ['e', 329.63],
    ['f', 349.23],
    ['fs', 369.99],
    ['g', 392.0],
    ['gs', 415.3],
    ['a', 440.0],
    ['as', 466.16],
    ['b', 493.88],
  ].filter(([id]) => PIANO_LAYOUT.some((note) => note.id === id)),
)

let audioContext = null

function getContext() {
  if (!audioContext) {
    audioContext = new AudioContext()
  }
  return audioContext
}

export async function resumeAudio() {
  const ctx = getContext()
  if (ctx.state === 'suspended') {
    await ctx.resume()
  }
}

function playTone(ctx, frequency, duration, type = 'sine', gainPeak = 0.22) {
  const oscillator = ctx.createOscillator()
  const gain = ctx.createGain()

  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime)

  gain.gain.setValueAtTime(0.0001, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(gainPeak, ctx.currentTime + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)

  oscillator.connect(gain)
  gain.connect(ctx.destination)

  oscillator.start(ctx.currentTime)
  oscillator.stop(ctx.currentTime + duration + 0.05)
}

function playNoiseBurst(ctx, duration, filterFreq, gainPeak = 0.35) {
  const bufferSize = ctx.sampleRate * duration
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)

  for (let i = 0; i < bufferSize; i += 1) {
    data[i] = Math.random() * 2 - 1
  }

  const source = ctx.createBufferSource()
  const filter = ctx.createBiquadFilter()
  const gain = ctx.createGain()

  source.buffer = buffer
  filter.type = 'lowpass'
  filter.frequency.setValueAtTime(filterFreq, ctx.currentTime)

  gain.gain.setValueAtTime(gainPeak, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)

  source.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)

  source.start(ctx.currentTime)
  source.stop(ctx.currentTime + duration + 0.02)
}

function fretFrequency(openFreq, fret) {
  return openFreq * 2 ** (fret / 12)
}

function parseGuitarNote(noteId) {
  const match = noteId.match(/^g-(\d+)-(\d+)$/)
  if (!match) return null
  return { string: Number(match[1]), fret: Number(match[2]) }
}

/**
 * @param {string} instrument
 * @param {string} noteId
 */
export async function playNote(instrument, noteId) {
  await resumeAudio()
  const ctx = getContext()

  if (instrument === 'piano') {
    const freq = PIANO_FREQ[noteId]
    if (freq) playTone(ctx, freq, 0.45, 'triangle', 0.2)
    return
  }

  if (instrument === 'guitar') {
    const parsed = parseGuitarNote(noteId)
    if (!parsed) return
    const openFreq = GUITAR_OPEN[parsed.string]
    if (!openFreq) return
    playTone(ctx, fretFrequency(openFreq, parsed.fret), 0.5, 'sawtooth', 0.14)
    return
  }

  if (instrument === 'drums') {
    switch (noteId) {
      case 'kick':
        playTone(ctx, 90, 0.18, 'sine', 0.45)
        playNoiseBurst(ctx, 0.12, 180, 0.2)
        break
      case 'snare':
        playNoiseBurst(ctx, 0.14, 2200, 0.28)
        break
      case 'hihat':
        playNoiseBurst(ctx, 0.06, 8000, 0.12)
        break
      case 'tom-hi':
        playTone(ctx, 180, 0.18, 'sine', 0.28)
        break
      case 'tom-lo':
        playTone(ctx, 120, 0.22, 'sine', 0.3)
        break
      case 'crash':
        playNoiseBurst(ctx, 0.35, 6000, 0.18)
        playTone(ctx, 520, 0.25, 'triangle', 0.08)
        break
      default:
        break
    }
  }
}

export function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
