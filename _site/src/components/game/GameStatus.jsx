import './GameStatus.css'

export default function GameStatus({ message, feedback, phase }) {
  const tone =
    feedback === 'correct'
      ? 'success'
      : feedback === 'incorrect'
        ? 'error'
        : phase === 'playing'
          ? 'listen'
          : 'default'

  return (
    <div className={`game-status game-status--${tone}`} role="status" aria-live="polite">
      <p className="game-status__message">{message}</p>
      {feedback === 'correct' ? (
        <p className="game-status__feedback">Correct!</p>
      ) : null}
      {feedback === 'incorrect' ? (
        <p className="game-status__feedback">Incorrect</p>
      ) : null}
    </div>
  )
}
