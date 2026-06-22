import './StatBlock.css'

export default function StatBlock({ label, value, unit, icon: Icon, variant = 'default' }) {
  return (
    <div className={`stat-block stat-block--${variant}`}>
      {Icon ? (
        <span className="stat-block__icon" aria-hidden="true">
          <Icon size={18} strokeWidth={1.75} />
        </span>
      ) : null}
      <div className="stat-block__content">
        <span className="stat-block__label">{label}</span>
        <span className="stat-block__value">
          {value}
          {unit ? <span className="stat-block__unit">{unit}</span> : null}
        </span>
      </div>
    </div>
  )
}
