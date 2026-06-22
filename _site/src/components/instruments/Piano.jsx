import { PIANO_LAYOUT } from './definitions.js'
import { buildAnswerOrders, isInteractive, noteClassName } from './noteState.js'
import SequenceOrderBadges from './SequenceOrderBadges.jsx'
import './Piano.css'

/**
 * @param {import('./noteState.js').InstrumentProps} props
 */
export default function Piano({
  activeNotes = [],
  userInput = [],
  answerSequence = [],
  wrongNote,
  onNoteSelect,
  showLabels = true,
}) {
  const interactive = isInteractive(onNoteSelect)
  const answerOrders = buildAnswerOrders(answerSequence)
  const whiteKeys = PIANO_LAYOUT.filter((key) => !key.black)
  const blackKeys = PIANO_LAYOUT.filter((key) => key.black)
  const noteProps = { activeNotes, userInput, answerSequence, wrongNote }

  return (
    <div className="instrument piano" role="group" aria-label="Piano, one octave">
      <div className="piano__keyboard">
        <div className="piano__whites">
          {whiteKeys.map((key) => (
            <button
              key={key.id}
              type="button"
              className={noteClassName('piano__key piano__key--white instrument-note', key.id, noteProps)}
              aria-label={key.label}
              disabled={!interactive}
              onClick={() => onNoteSelect?.(key.id)}
            >
              {showLabels ? <span className="piano__label">{key.label}</span> : null}
              <SequenceOrderBadges orders={answerOrders[key.id]} />
            </button>
          ))}
        </div>
        <div className="piano__blacks">
          {blackKeys.map((key) => (
            <button
              key={key.id}
              type="button"
              className={noteClassName(
                `piano__key piano__key--black instrument-note piano__key--after-${key.after}`,
                key.id,
                noteProps,
              )}
              aria-label={key.label}
              disabled={!interactive}
              onClick={() => onNoteSelect?.(key.id)}
            >
              <SequenceOrderBadges orders={answerOrders[key.id]} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
