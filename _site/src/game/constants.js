export {
  NOTE_POOLS,
  NOTE_LABELS,
} from '../components/instruments/definitions.js'

/** @typedef {'highlights' | 'normal' | 'names' | 'audio-only'} VisualMode */

export const DIFFICULTY_CONFIG = {
  beginner: {
    id: 'beginner',
    label: 'Beginner',
    detail: '3 notes · visual highlights',
    length: 3,
    noteDuration: 520,
    playbackGap: 280,
    visualMode: 'highlights',
    scoreMultiplier: 1,
  },
  intermediate: {
    id: 'intermediate',
    label: 'Intermediate',
    detail: '5 notes · faster playback',
    length: 5,
    noteDuration: 320,
    playbackGap: 160,
    visualMode: 'normal',
    scoreMultiplier: 1.5,
  },
  advanced: {
    id: 'advanced',
    label: 'Advanced',
    detail: '8 notes · note names only',
    length: 8,
    noteDuration: 400,
    playbackGap: 220,
    visualMode: 'names',
    scoreMultiplier: 2,
  },
  expert: {
    id: 'expert',
    label: 'Expert',
    detail: 'Audio only mode',
    length: 8,
    noteDuration: 400,
    playbackGap: 220,
    visualMode: 'audio-only',
    scoreMultiplier: 3,
  },
  custom: {
    id: 'custom',
    label: 'Custom',
    detail: 'Configure your own session',
    length: 5,
    noteDuration: 480,
    playbackGap: 240,
    visualMode: 'names',
    scoreMultiplier: 1.75,
  },
}

export const DIFFICULTY_OPTIONS = Object.values(DIFFICULTY_CONFIG).map(
  ({ id, label, detail }) => ({ id, label, detail }),
)

export const INSTRUMENT_OPTIONS = [
  { id: 'piano', label: 'Piano', detail: '1 octave' },
  { id: 'guitar', label: 'Guitar', detail: '6×5 fretboard' },
  { id: 'drums', label: 'Drums', detail: '6 pads' },
]

export const GAME_PHASES = {
  IDLE: 'idle',
  PLAYING: 'playing',
  INPUT: 'input',
  FEEDBACK: 'feedback',
}

export const RESULTS_STORAGE_KEY = 'earwerm-results'
