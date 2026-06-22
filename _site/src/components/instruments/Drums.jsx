import { DRUM_LAYOUT } from './definitions.js'
import { buildAnswerOrders, isInteractive, noteClassName } from './noteState.js'
import SequenceOrderBadges from './SequenceOrderBadges.jsx'
import './Drums.css'

/**
 * @param {import('./noteState.js').InstrumentProps} props
 */
export default function Drums({
  activeNotes = [],
  userInput = [],
  answerSequence = [],
  wrongNote,
  onNoteSelect,
  showLabels = true,
}) {
  const interactive = isInteractive(onNoteSelect)
  const answerOrders = buildAnswerOrders(answerSequence)
  const noteProps = { activeNotes, userInput, answerSequence, wrongNote }

  return (
    <div className="instrument drums" role="group" aria-label="Drum kit">
      <div className="drums__kit">
        {DRUM_LAYOUT.map((pad) => (
          <button
            key={pad.id}
            type="button"
            className={noteClassName(
              `drums__pad drums__pad--${pad.id} instrument-note`,
              pad.id,
              noteProps,
            )}
            style={{ gridRow: pad.row + 1, gridColumn: pad.col + 1 }}
            aria-label={pad.label}
            disabled={!interactive}
            onClick={() => onNoteSelect?.(pad.id)}
          >
            {showLabels ? <span className="drums__label">{pad.label}</span> : null}
            <SequenceOrderBadges orders={answerOrders[pad.id]} />
          </button>
        ))}
      </div>
    </div>
  )
}
