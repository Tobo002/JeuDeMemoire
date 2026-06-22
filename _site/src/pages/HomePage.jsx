import { Link } from 'react-router-dom'
import { ArrowRight, Drum, Guitar, Piano } from 'lucide-react'
import { Button, InstrumentCard } from '../components/ui'
import './HomePage.css'

const INSTRUMENTS = [
  {
    id: 'piano',
    name: 'Piano',
    description: 'Distinct pitches in a linear layout — perfect for melodic recall.',
    icon: Piano,
    accent: 'primary',
  },
  {
    id: 'guitar',
    name: 'Guitar',
    description: 'String-based tones with a warm, familiar timbre.',
    icon: Guitar,
    accent: 'secondary',
  },
  {
    id: 'drums',
    name: 'Drums',
    description: 'Rhythmic patterns that challenge timing and sequence memory.',
    icon: Drum,
    accent: 'accent',
  },
]

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="container home-hero__inner">
          <div className="home-hero__copy">
            <p className="eyebrow">Earwerm</p>
            <h1 className="home-hero__title text-balance">
              Hear it. Hold it. Play it back.
            </h1>
            <p className="home-hero__description lead">
              A musical memory game where you listen to note sequences on your
              chosen instrument, memorize the pattern, and reproduce it — one level
              at a time.
            </p>
            <div className="home-hero__actions">
              <Button as={Link} to="/game" variant="primary" size="lg">
                Start
                <ArrowRight size={20} aria-hidden="true" />
              </Button>
            </div>
          </div>

          <div className="home-hero__accent" aria-hidden="true">
            <div className="home-hero__ring home-hero__ring--one" />
            <div className="home-hero__ring home-hero__ring--two" />
            <div className="home-hero__note-stack">
              {['Do', 'Mi', 'Sol'].map((note, index) => (
                <span
                  key={note}
                  className="home-hero__floating-note"
                  style={{ '--delay': `${index * 120}ms` }}
                >
                  {note}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="home-instruments" aria-labelledby="instruments-heading">
        <div className="container">
          <header className="home-instruments__header">
            <p className="eyebrow">Instruments</p>
            <h2 id="instruments-heading">Choose your sound</h2>
            <p className="home-instruments__intro lead">
              Each instrument offers a distinct way to perceive and remember
              sequences. Pick the one that matches your learning style.
            </p>
          </header>

          <div className="home-instruments__grid">
            {INSTRUMENTS.map(({ id, name, description, icon, accent }) => (
              <InstrumentCard
                key={id}
                name={name}
                description={description}
                icon={icon}
                accent={accent}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
