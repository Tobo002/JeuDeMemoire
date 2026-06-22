import { INSTRUMENTS, AnswerSequenceBar } from '../instruments'
import './InstrumentVisualization.css'

function AudioOnlyVisual() {
  return (
    <div className="viz-audio-only" aria-hidden="true">
      <div className="viz-audio-only__rings">
        <span className="viz-audio-only__ring" />
        <span className="viz-audio-only__ring" />
        <span className="viz-audio-only__ring" />
      </div>
      <p className="viz-audio-only__label">Listening…</p>
    </div>
  )
}

function NoteNameDisplay({ label }) {
  if (!label) {
    return (
      <div className="viz-note-name viz-note-name--empty" aria-hidden="true">
        <span className="viz-note-name__placeholder">—</span>
      </div>
    )
  }

  return (
    <div className="viz-note-name" role="status" aria-live="polite">
      <span className="viz-note-name__value">{label}</span>
    </div>
  )
}

function InstrumentStage({ instrument, instrumentProps }) {
  switch (instrument) {
    case 'guitar':
      return <INSTRUMENTS.guitar {...instrumentProps} />
    case 'drums':
      return <INSTRUMENTS.drums {...instrumentProps} />
    case 'piano':
    default:
      return <INSTRUMENTS.piano {...instrumentProps} />
  }
}

export default function InstrumentVisualization({
  instrument = 'piano',
  phase = 'idle',
  visualMode = 'highlights',
  activeNotes = [],
  userInput = [],
  answerSequence = [],
  wrongNote = null,
  displayedNote = null,
  feedback = null,
  onNoteSelect,
}) {
  const isPlaying = phase === 'playing'
  const isInteractive = phase === 'input' && typeof onNoteSelect === 'function'
  const showAnswer = feedback === 'incorrect' && answerSequence.length > 0
  const showLabels =
    showAnswer ||
    visualMode === 'names' ||
    visualMode === 'highlights' ||
    visualMode === 'normal'
  const audioOnlyPlayback = isPlaying && visualMode === 'audio-only'
  const namesOnlyPlayback = isPlaying && visualMode === 'names'

  const instrumentProps = {
    activeNotes: showAnswer ? [] : activeNotes,
    userInput,
    answerSequence: showAnswer ? answerSequence : [],
    wrongNote: showAnswer ? wrongNote : null,
    onNoteSelect: isInteractive ? onNoteSelect : undefined,
    showLabels: showLabels || !isPlaying,
  }

  return (
    <div className="instrument-viz">
      <div
        className={`instrument-viz__frame${
          feedback === 'correct'
            ? ' instrument-viz__frame--success'
            : feedback === 'incorrect'
              ? ' instrument-viz__frame--error'
              : ''
        }`}
      >
        {audioOnlyPlayback ? (
          <AudioOnlyVisual />
        ) : namesOnlyPlayback ? (
          <NoteNameDisplay label={displayedNote} />
        ) : (
          <InstrumentStage instrument={instrument} instrumentProps={instrumentProps} />
        )}
      </div>
      {showAnswer ? <AnswerSequenceBar sequence={answerSequence} /> : null}
    </div>
  )
}
