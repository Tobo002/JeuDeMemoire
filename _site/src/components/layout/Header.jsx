import { NavLink } from 'react-router-dom'
import { Music2 } from 'lucide-react'
import './Header.css'

const NAV_ITEMS = [
  { to: '/', label: 'Home', end: true },
  { to: '/game', label: 'Play', end: false },
]

export default function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <NavLink to="/" className="site-header__brand" end>
          <span className="site-header__logo" aria-hidden="true">
            <Music2 size={22} strokeWidth={2.25} />
          </span>
          <span className="site-header__wordmark">
            Earwerm
            <span className="site-header__tagline">Memory through music</span>
          </span>
        </NavLink>

        <nav className="site-header__nav" aria-label="Main navigation">
          <ul className="site-header__nav-list">
            {NAV_ITEMS.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `site-header__nav-link${isActive ? ' site-header__nav-link--active' : ''}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
