import { NOTE_LABELS } from './definitions.js'
import './AnswerSequenceBar.css'

/**
 * @param {{ sequence?: string[] }} props
 */
export default function AnswerSequenceBar({ sequence = [] }) {
  if (!sequence.length) return null

  return (
    <div className="answer-sequence" role="status" aria-live="polite">
      <p className="answer-sequence__title">Correct sequence</p>
      <ol className="answer-sequence__list">
        {sequence.map((noteId, index) => (
          <li key={`${noteId}-${index}`} className="answer-sequence__item">
            <span className="answer-sequence__order">{index + 1}</span>
            <span className="answer-sequence__label">
              {NOTE_LABELS[noteId] ?? noteId}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
