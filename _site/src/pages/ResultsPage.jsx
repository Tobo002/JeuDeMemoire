import { Link } from 'react-router-dom'
import { Music2, RotateCcw, Target } from 'lucide-react'
import { Button, StatBlock } from '../components/ui'
import { loadSessionResults } from '../game/results.js'
import './ResultsPage.css'

const EMPTY_RESULTS = {
  score: 0,
  accuracy: 0,
  longestMelody: 0,
}

export default function ResultsPage() {
  const session = loadSessionResults() ?? EMPTY_RESULTS

  return (
    <div className="results-page">
      <div className="container container--narrow">
        <header className="results-page__header">
          <p className="eyebrow">Session complete</p>
          <h1 className="results-page__title">Your results</h1>
          <p className="results-page__intro lead">
            {session.score > 0
              ? 'Great effort! Here is how you performed in your last session.'
              : 'No session data yet. Play a round to see your results here.'}
          </p>
        </header>

        <div className="results-page__score-card">
          <span className="results-page__score-label">Score</span>
          <span className="results-page__score-value">
            {session.score.toLocaleString()}
          </span>
        </div>

        <div className="results-page__metrics">
          <StatBlock
            label="Accuracy"
            value={session.accuracy}
            unit="%"
            icon={Target}
          />
          <StatBlock
            label="Longest melody"
            value={session.longestMelody}
            unit="rounds"
            icon={Music2}
          />
        </div>

        <div className="results-page__actions">
          <Button as={Link} to="/game" variant="primary" size="lg">
            <RotateCcw size={20} aria-hidden="true" />
            Play again
          </Button>
        </div>
      </div>
    </div>
  )
}
