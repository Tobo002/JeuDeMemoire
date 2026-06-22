import { DIFFICULTY_CONFIG } from './constants.js'

export const DEFAULT_CUSTOM_SETTINGS = {
  sequenceLength: 5,
  playbackSpeed: 1,
  visualMode: 'highlights',
}

export const CUSTOM_LIMITS = {
  sequenceLength: { min: 1, max: 16 },
  playbackSpeed: { min: 0.5, max: 2, step: 0.1 },
}

/** @typedef {'names' | 'audio-only' | 'highlights'} CustomVisualMode */

/**
 * @param {typeof DEFAULT_CUSTOM_SETTINGS} settings
 */
export function buildCustomConfig(settings) {
  const { sequenceLength, playbackSpeed, visualMode } = {
    ...DEFAULT_CUSTOM_SETTINGS,
    ...settings,
  }

  const clampedLength = Math.min(
    CUSTOM_LIMITS.sequenceLength.max,
    Math.max(CUSTOM_LIMITS.sequenceLength.min, sequenceLength),
  )
  const clampedSpeed = Math.min(
    CUSTOM_LIMITS.playbackSpeed.max,
    Math.max(CUSTOM_LIMITS.playbackSpeed.min, playbackSpeed),
  )

  const baseNoteDuration = 480
  const baseGap = 240
  const timingScale = 1 / clampedSpeed

  return {
    id: 'custom',
    label: 'Custom',
    detail: 'Your settings',
    length: clampedLength,
    noteDuration: Math.round(baseNoteDuration * timingScale),
    playbackGap: Math.round(baseGap * timingScale),
    visualMode,
    scoreMultiplier: 1 + clampedLength * 0.15,
  }
}

/**
 * @param {string} difficulty
 * @param {typeof DEFAULT_CUSTOM_SETTINGS} [customSettings]
 */
export function resolveGameConfig(difficulty, customSettings) {
  if (difficulty === 'custom') {
    return buildCustomConfig(customSettings ?? DEFAULT_CUSTOM_SETTINGS)
  }
  return DIFFICULTY_CONFIG[difficulty] ?? DIFFICULTY_CONFIG.beginner
}

export const CUSTOM_VISUAL_OPTIONS = [
  { id: 'highlights', label: 'Instrument', detail: 'Highlight notes as they play' },
  { id: 'names', label: 'Note names', detail: 'Text labels during playback' },
  { id: 'audio-only', label: 'Audio only', detail: 'Listen without visuals' },
]
