import './SelectorGroup.css'

export default function SelectorGroup({
  legend,
  name,
  value,
  onChange,
  options,
  layout = 'stack',
  disabled = false,
}) {
  return (
    <fieldset
      className={`selector-group selector-group--${layout}${
        disabled ? ' selector-group--disabled' : ''
      }`}
      disabled={disabled}
    >
      <legend className="selector-group__legend">{legend}</legend>
      <div
        className="selector-group__options"
        role="radiogroup"
        aria-label={legend}
      >
        {options.map(({ id, label, detail }) => (
          <label key={id} className="selector-option">
            <input
              type="radio"
              name={name}
              value={id}
              checked={value === id}
              onChange={() => onChange(id)}
            />
            <span className="selector-option__surface">
              <span className="selector-option__label">{label}</span>
              {detail ? (
                <span className="selector-option__detail">{detail}</span>
              ) : null}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
