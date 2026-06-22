import './PageHeader.css'

export default function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  align = 'left',
  className = '',
  headingLevel: Heading = 'h1',
  titleId,
}) {
  return (
    <header
      className={`page-header page-header--${align} ${className}`.trim()}
    >
      <div className="page-header__content">
        {eyebrow ? <p className="page-header__eyebrow">{eyebrow}</p> : null}
        <Heading
          id={titleId}
          className="page-header__title"
        >
          {title}
        </Heading>
        {description ? (
          <p className="page-header__description lead">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="page-header__actions">{actions}</div> : null}
    </header>
  )
}
