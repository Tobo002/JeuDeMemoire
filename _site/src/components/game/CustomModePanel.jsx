import { SelectorGroup } from '../ui'
import {
  CUSTOM_LIMITS,
  CUSTOM_VISUAL_OPTIONS,
} from '../../game/customConfig.js'
import './CustomModePanel.css'

/**
 * @param {Object} props
 * @param {{ sequenceLength: number, playbackSpeed: number, visualMode: string }} props.settings
 * @param {(patch: Partial<typeof props.settings>) => void} props.onChange
 * @param {boolean} [props.disabled]
 */
export default function CustomModePanel({ settings, onChange, disabled = false }) {
  const { sequenceLength, playbackSpeed, visualMode } = settings
  const speedLabel = `${playbackSpeed.toFixed(1)}×`

  return (
    <div className={`custom-mode${disabled ? ' custom-mode--disabled' : ''}`}>
      <p className="custom-mode__heading">Custom settings</p>

      <div className="custom-mode__field">
        <label className="custom-mode__label" htmlFor="custom-sequence-length">
          Notes per sequence
        </label>
        <input
          id="custom-sequence-length"
          className="custom-mode__input"
          type="number"
          min={CUSTOM_LIMITS.sequenceLength.min}
          max={CUSTOM_LIMITS.sequenceLength.max}
          value={sequenceLength}
          disabled={disabled}
          onChange={(event) => {
            const value = Number(event.target.value)
            if (Number.isNaN(value)) return
            onChange({
              sequenceLength: Math.min(
                CUSTOM_LIMITS.sequenceLength.max,
                Math.max(CUSTOM_LIMITS.sequenceLength.min, value),
              ),
            })
          }}
        />
        <span className="custom-mode__hint">
          {CUSTOM_LIMITS.sequenceLength.min}–{CUSTOM_LIMITS.sequenceLength.max} notes
        </span>
      </div>

      <div className="custom-mode__field">
        <label className="custom-mode__label" htmlFor="custom-playback-speed">
          Playback speed
          <span className="custom-mode__value">{speedLabel}</span>
        </label>
        <input
          id="custom-playback-speed"
          className="custom-mode__range"
          type="range"
          min={CUSTOM_LIMITS.playbackSpeed.min}
          max={CUSTOM_LIMITS.playbackSpeed.max}
          step={CUSTOM_LIMITS.playbackSpeed.step}
          value={playbackSpeed}
          disabled={disabled}
          onChange={(event) =>
            onChange({ playbackSpeed: Number(event.target.value) })
          }
        />
        <div className="custom-mode__range-labels" aria-hidden="true">
          <span>Slower</span>
          <span>Faster</span>
        </div>
      </div>

      <SelectorGroup
        legend="Playback display"
        name="custom-visual"
        value={visualMode}
        onChange={(id) => onChange({ visualMode: id })}
        options={CUSTOM_VISUAL_OPTIONS}
        disabled={disabled}
      />
    </div>
  )
}
