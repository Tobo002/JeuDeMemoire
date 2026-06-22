import './InstrumentCard.css'

export default function InstrumentCard({ name, description, icon: Icon, accent = 'primary' }) {
  return (
    <article className={`instrument-card instrument-card--${accent}`}>
      <div className="instrument-card__glow" aria-hidden="true" />
      <div className="instrument-card__icon" aria-hidden="true">
        {Icon ? <Icon size={32} strokeWidth={1.5} /> : null}
      </div>
      <div className="instrument-card__body">
        <h3 className="instrument-card__name">{name}</h3>
        <p className="instrument-card__description">{description}</p>
      </div>
      <div className="instrument-card__wave" aria-hidden="true">
        <span /><span /><span /><span /><span />
      </div>
    </article>
  )
}
