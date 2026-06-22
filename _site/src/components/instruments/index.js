import './instruments.css'

import Drums from './Drums.jsx'
import Guitar from './Guitar.jsx'
import Piano from './Piano.jsx'

export { default as Piano } from './Piano.jsx'
export { default as Guitar } from './Guitar.jsx'
export { default as Drums } from './Drums.jsx'
export { default as AnswerSequenceBar } from './AnswerSequenceBar.jsx'

export { NOTE_POOLS, NOTE_LABELS } from './definitions.js'
export { noteClassName, toActiveSet, buildAnswerOrders } from './noteState.js'

export const INSTRUMENTS = {
  piano: Piano,
  guitar: Guitar,
  drums: Drums,
}
