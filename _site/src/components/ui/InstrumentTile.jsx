import './InstrumentTile.css'

export default function InstrumentTile({
  name,
  description,
  icon: Icon,
  selected = false,
  disabled = false,
  onSelect,
}) {
  return (
    <button
      type="button"
      className={`instrument-tile${selected ? ' instrument-tile--selected' : ''}`}
      aria-pressed={selected}
      disabled={disabled}
      onClick={onSelect}
    >
      <span className="instrument-tile__icon" aria-hidden="true">
        {Icon ? <Icon size={28} strokeWidth={1.75} /> : null}
      </span>
      <span className="instrument-tile__content">
        <span className="instrument-tile__name">{name}</span>
        {description ? (
          <span className="instrument-tile__description">{description}</span>
        ) : null}
      </span>
    </button>
  )
}
