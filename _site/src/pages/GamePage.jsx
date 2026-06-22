import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ListMusic, Play, RefreshCw, Trophy } from 'lucide-react'
import { CustomModePanel, GameStatus, InstrumentVisualization } from '../components/game'
import { Button, SelectorGroup, StatBlock } from '../components/ui'
import { resumeAudio } from '../game/audio.js'
import { DEFAULT_CUSTOM_SETTINGS } from '../game/customConfig.js'
import {
  DIFFICULTY_OPTIONS,
  GAME_PHASES,
  INSTRUMENT_OPTIONS,
} from '../game/constants.js'
import { useEarwermGame } from '../hooks/useEarwermGame.js'
import './GamePage.css'

export default function GamePage() {
  const navigate = useNavigate()
  const [instrument, setInstrument] = useState('piano')
  const [difficulty, setDifficulty] = useState('beginner')
  const [customSettings, setCustomSettings] = useState(DEFAULT_CUSTOM_SETTINGS)

  const game = useEarwermGame({
    instrument,
    difficulty,
    customSettings,
    navigate,
  })

  const isCustom = difficulty === 'custom'
  const canReplay = game.phase === GAME_PHASES.INPUT && game.sequence.length > 0
  const isPlaying = game.phase !== GAME_PHASES.IDLE

  function updateCustomSettings(patch) {
    setCustomSettings((current) => ({ ...current, ...patch }))
  }

  async function handleStart() {
    await resumeAudio()
    await game.beginGame()
  }

  return (
    <div className="game-page">
      <div className="container container--game">
        <header className="game-page__header">
          <p className="eyebrow">Session</p>
          <h1 className="game-page__title">Play</h1>
        </header>

        <div className="game-board">
          <aside className="game-panel game-panel--left" aria-label="Game settings">
            <SelectorGroup
              legend="Instrument"
              name="instrument"
              value={instrument}
              onChange={setInstrument}
              options={INSTRUMENT_OPTIONS}
              layout="compact"
              disabled={game.settingsLocked}
            />
            <SelectorGroup
              legend="Difficulty"
              name="difficulty"
              value={difficulty}
              onChange={setDifficulty}
              options={DIFFICULTY_OPTIONS}
              disabled={game.settingsLocked}
            />

            {isCustom ? (
              <CustomModePanel
                settings={customSettings}
                onChange={updateCustomSettings}
                disabled={game.settingsLocked}
              />
            ) : null}

            <div className="game-controls">
              {!isPlaying ? (
                <Button variant="primary" size="lg" onClick={handleStart}>
                  <Play size={20} aria-hidden="true" />
                  Start
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="md"
                  onClick={game.replaySequence}
                  disabled={!canReplay}
                >
                  <RefreshCw size={18} aria-hidden="true" />
                  Replay sequence
                </Button>
              )}
            </div>
          </aside>

          <section className="game-panel game-panel--center" aria-label="Instrument view">
            <GameStatus
              message={game.statusMessage}
              feedback={game.feedback}
              phase={game.phase}
            />
            <InstrumentVisualization
              instrument={instrument}
              phase={game.phase}
              visualMode={game.visualMode}
              activeNotes={game.activeNotes}
              userInput={game.userInput}
              answerSequence={game.sequence}
              wrongNote={game.wrongNote}
              displayedNote={game.displayedNote}
              feedback={game.feedback}
              onNoteSelect={game.handleNoteSelect}
            />
            {game.phase === GAME_PHASES.INPUT && game.userInput.length > 0 ? (
              <p className="game-input-progress text-sm text-muted">
                Your sequence: {game.userInput.length} / {game.sequence.length}
              </p>
            ) : null}
          </section>

          <aside className="game-panel game-panel--right" aria-label="Session stats">
            <StatBlock
              label="Score"
              value={game.score}
              icon={Trophy}
              variant="highlight"
            />
            <StatBlock
              label="Sequence length"
              value={game.sequenceLength}
              icon={ListMusic}
            />
            <StatBlock
              label="Replay count"
              value={game.replayCount}
              icon={RefreshCw}
            />
            {game.round > 0 ? (
              <p className="game-round text-sm text-muted">
                Round {game.round} completed
              </p>
            ) : null}
          </aside>
        </div>
      </div>
    </div>
  )
}
