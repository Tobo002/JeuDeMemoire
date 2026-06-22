import { FRET_COUNT, GUITAR_STRINGS } from './definitions.js'
import { buildAnswerOrders, isInteractive, noteClassName } from './noteState.js'
import SequenceOrderBadges from './SequenceOrderBadges.jsx'
import './Fretboard.css'

/**
 * @param {import('./noteState.js').InstrumentProps} props
 */
export default function Guitar({
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
    <div className="instrument fretboard fretboard--guitar" role="group" aria-label="Guitar fretboard">
      <div className="fretboard__neck">
        <div className="fretboard__nut" />
        <div className="fretboard__grid">
          <div className="fretboard__fret-labels" aria-hidden="true">
            <span />
            {Array.from({ length: FRET_COUNT }, (_, fret) => (
              <span key={fret} className="fretboard__fret-number">
                {fret}
              </span>
            ))}
          </div>
          {GUITAR_STRINGS.map((string) => (
            <div key={string.index} className="fretboard__string-row">
              {showLabels ? (
                <span className="fretboard__string-name">{string.label}</span>
              ) : (
                <span className="fretboard__string-name" aria-hidden="true" />
              )}
              {Array.from({ length: FRET_COUNT }, (_, fret) => {
                const noteId = `g-${string.index}-${fret}`
                return (
                  <button
                    key={noteId}
                    type="button"
                    className={noteClassName('fretboard__fret instrument-note', noteId, noteProps)}
                    aria-label={`String ${string.label}, fret ${fret}`}
                    disabled={!interactive}
                    onClick={() => onNoteSelect?.(noteId)}
                  >
                    <span className="fretboard__fret-wire" />
                    <span className="fretboard__dot" />
                    <SequenceOrderBadges orders={answerOrders[noteId]} />
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
