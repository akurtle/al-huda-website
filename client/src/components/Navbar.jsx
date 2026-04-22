import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const navItems = [
  { label: 'Home', path: '/', hash: '' },
  { label: 'Prayer Times', path: '/', hash: '#prayer-times' },
  { label: 'Zakaat', path: '/', hash: '#zakaat' },
  { label: 'About', path: '/', hash: '#about' },
  { label: 'Privacy', path: '/privacy', hash: '' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    document.body.style.overflow = ''
  }, [location])

  const toggleMobile = () => {
    setMobileOpen(prev => {
      document.body.style.overflow = !prev ? 'hidden' : ''
      return !prev
    })
  }

  const handleNavClick = (item) => {
    setMobileOpen(false)
    document.body.style.overflow = ''
    if (item.hash && location.pathname === '/') {
      const el = document.querySelector(item.hash)
      if (el) {
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72
        window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo" id="nav-logo">
            <div className="logo-icon">
              <svg viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2"/>
                <path d="M20 6 C20 6, 28 14, 28 20 C28 26, 20 34, 20 34 C20 34, 12 26, 12 20 C12 14, 20 6, 20 6Z" fill="currentColor" opacity="0.3"/>
                <circle cx="20" cy="18" r="4" fill="currentColor"/>
                <path d="M16 26 Q20 22 24 26" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
            <span className="logo-text">Al<span className="logo-accent">Huda</span></span>
          </Link>

          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.hash ? (
                  <a
                    href={item.hash}
                    className="nav-link"
                    onClick={(e) => { e.preventDefault(); handleNavClick(item) }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link to={item.path} className="nav-link">{item.label}</Link>
                )}
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <a href="#zakaat" className="btn btn-primary btn-sm" onClick={(e) => {
              e.preventDefault()
              handleNavClick({ hash: '#zakaat', path: '/' })
            }}>Calculate Zakaat</a>
            <button
              className={`mobile-toggle ${mobileOpen ? 'active' : ''}`}
              onClick={toggleMobile}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'active' : ''}`}>
        <ul className="mobile-nav-links">
          {navItems.map((item) => (
            <li key={item.label}>
              {item.hash ? (
                <a
                  href={item.hash}
                  className="mobile-link"
                  onClick={(e) => { e.preventDefault(); handleNavClick(item) }}
                >
                  {item.label}
                </a>
              ) : (
                <Link to={item.path} className="mobile-link" onClick={() => {
                  setMobileOpen(false)
                  document.body.style.overflow = ''
                }}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
