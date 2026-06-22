/** One chromatic octave (C4–B4). */
export const PIANO_LAYOUT = [
  { id: 'c', label: 'C', black: false },
  { id: 'cs', label: 'C♯', black: true, after: 'c' },
  { id: 'd', label: 'D', black: false },
  { id: 'ds', label: 'D♯', black: true, after: 'd' },
  { id: 'e', label: 'E', black: false },
  { id: 'f', label: 'F', black: false },
  { id: 'fs', label: 'F♯', black: true, after: 'f' },
  { id: 'g', label: 'G', black: false },
  { id: 'gs', label: 'G♯', black: true, after: 'g' },
  { id: 'a', label: 'A', black: false },
  { id: 'as', label: 'A♯', black: true, after: 'a' },
  { id: 'b', label: 'B', black: false },
]

export const GUITAR_STRINGS = [
  { index: 0, label: 'E' },
  { index: 1, label: 'A' },
  { index: 2, label: 'D' },
  { index: 3, label: 'G' },
  { index: 4, label: 'B' },
  { index: 5, label: 'e' },
]

export const FRET_COUNT = 5

export const DRUM_LAYOUT = [
  { id: 'kick', label: 'Kick', row: 1, col: 0 },
  { id: 'snare', label: 'Snare', row: 1, col: 1 },
  { id: 'hihat', label: 'Hi-Hat', row: 0, col: 0 },
  { id: 'tom-hi', label: 'Hi Tom', row: 0, col: 1 },
  { id: 'tom-lo', label: 'Lo Tom', row: 0, col: 2 },
  { id: 'crash', label: 'Crash', row: 0, col: 3 },
]

export function guitarNoteId(stringIndex, fret) {
  return `g-${stringIndex}-${fret}`
}

export function buildFretboardNotes(strings) {
  const notes = []
  for (const string of strings) {
    for (let fret = 0; fret < FRET_COUNT; fret += 1) {
      const id = guitarNoteId(string.index, fret)
      notes.push({
        id,
        label: `${string.label}${fret === 0 ? '' : ` · ${fret}`}`,
        stringIndex: string.index,
        fret,
        stringLabel: string.label,
      })
    }
  }
  return notes
}

export const GUITAR_NOTES = buildFretboardNotes(GUITAR_STRINGS)

export const NOTE_POOLS = {
  piano: PIANO_LAYOUT.map((note) => note.id),
  guitar: GUITAR_NOTES.map((note) => note.id),
  drums: DRUM_LAYOUT.map((pad) => pad.id),
}

export const NOTE_LABELS = Object.fromEntries([
  ...PIANO_LAYOUT.map((note) => [note.id, note.label]),
  ...GUITAR_NOTES.map((note) => [note.id, note.label]),
  ...DRUM_LAYOUT.map((pad) => [pad.id, pad.label]),
])
