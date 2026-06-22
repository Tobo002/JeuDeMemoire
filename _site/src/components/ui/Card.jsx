import './Card.css'

export default function Card({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  as: Component = 'div',
  ...props
}) {
  return (
    <Component
      className={`card card--${variant} card--pad-${padding} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  )
}

export function CardHeader({ children, className = '' }) {
  return <div className={`card__header ${className}`.trim()}>{children}</div>
}

export function CardBody({ children, className = '' }) {
  return <div className={`card__body ${className}`.trim()}>{children}</div>
}

export function CardFooter({ children, className = '' }) {
  return <div className={`card__footer ${className}`.trim()}>{children}</div>
}
