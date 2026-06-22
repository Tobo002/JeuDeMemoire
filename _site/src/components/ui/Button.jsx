import './Button.css'

const VARIANTS = ['primary', 'secondary', 'accent', 'ghost']
const SIZES = ['sm', 'md', 'lg']

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  as: Component = 'button',
  ...props
}) {
  const safeVariant = VARIANTS.includes(variant) ? variant : 'primary'
  const safeSize = SIZES.includes(size) ? size : 'md'

  return (
    <Component
      className={`btn btn--${safeVariant} btn--${safeSize} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  )
}
