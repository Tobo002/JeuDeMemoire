/**
 * @typedef {Object} InstrumentProps
 * @property {string[]} [activeNotes] Notes highlighted during playback.
 * @property {string[]} [userInput] Notes the user has entered this round.
 * @property {string[]} [answerSequence] Correct sequence shown after a fault.
 * @property {string} [wrongNote] Note the user played incorrectly.
 * @property {(noteId: string) => void} [onNoteSelect] Called when a note is clicked.
 * @property {boolean} [showLabels] Show note labels on the instrument.
 */

/**
 * @param {string[] | string | null | undefined} activeNotes
 * @returns {Set<string>}
 */
export function toActiveSet(activeNotes) {
  if (!activeNotes) return new Set()
  if (Array.isArray(activeNotes)) return new Set(activeNotes)
  return new Set([activeNotes])
}

/**
 * @param {string[]} sequence
 * @returns {Record<string, number[]>}
 */
export function buildAnswerOrders(sequence = []) {
  /** @type {Record<string, number[]>} */
  const orders = {}
  sequence.forEach((noteId, index) => {
    if (!orders[noteId]) orders[noteId] = []
    orders[noteId].push(index + 1)
  })
  return orders
}

/**
 * @param {string} baseClass
 * @param {string} noteId
 * @param {InstrumentProps} props
 */
export function noteClassName(
  baseClass,
  noteId,
  { activeNotes = [], userInput = [], answerSequence = [], wrongNote },
) {
  const classes = [baseClass]
  const active = toActiveSet(activeNotes)
  const inAnswer = answerSequence.length > 0 && answerSequence.includes(noteId)

  if (active.has(noteId)) {
    classes.push('instrument-note--active')
  }

  if (inAnswer) {
    classes.push('instrument-note--answer')
  }

  if (wrongNote === noteId) {
    classes.push('instrument-note--wrong')
  }

  if (userInput.includes(noteId)) {
    classes.push('instrument-note--input')
  }

  if (userInput[userInput.length - 1] === noteId) {
    classes.push('instrument-note--latest')
  }

  return classes.join(' ')
}

export function isInteractive(onNoteSelect) {
  return typeof onNoteSelect === 'function'
}
