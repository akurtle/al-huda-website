import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'
import './Navbar.css'

const navItems = [
  { label: 'Home', path: '/', hash: '' },
  { 
    label: 'Mission Statement', path: '/mission', hash: '',
    children: [
      { label: 'Our Executives', path: '/executives' },
    ]
  },
  { 
    label: 'Ramadan', path: '/programs/ramadan', hash: '',
    children: [
      { label: 'Annual Ramadan Tafseer', path: '/programs/tafseer' },
    ]
  },
  { label: 'Weekend Islamic Classes', path: '/programs/weekend-classes', hash: '' },
  { label: 'Jumuah Prayer', path: '/programs/jumuah', hash: '' },
  { label: 'Events', path: '/events', hash: '' },
  { label: 'Live Polling', path: '/live-polling', hash: '' },
  { label: 'Contact', path: '/contact', hash: '' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const location = useLocation()
  const solidNav = scrolled || location.pathname !== '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = ''
  }, [location])

  const toggleMobile = () => {
    setMobileOpen(prev => {
      document.body.style.overflow = !prev ? 'hidden' : ''
      return !prev
    })
  }

  const toggleDropdown = (label) => {
    setActiveDropdown(prev => prev === label ? null : label)
  }

  return (
    <>
      <nav className={`navbar ${solidNav ? 'scrolled' : ''}`} id="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo" id="nav-logo">
            <img src={logo} alt="Al Huda Islamic Centre" className="logo-img" />
            <span className="logo-text">AIC<span className="logo-accent"></span></span>
          </Link>

          <ul className="nav-links">
            {navItems.map((item) => (
              <li 
                key={item.label} 
                className={`nav-item ${item.children ? 'has-dropdown' : ''}`}
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => item.children && setActiveDropdown(null)}
              >
                <Link to={item.path} className="nav-link">
                  {item.label}
                  {item.children && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="dropdown-arrow">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  )}
                </Link>
                {item.children && (
                  <ul className={`dropdown-menu ${activeDropdown === item.label ? 'active' : ''}`}>
                    {item.children.map(child => (
                      <li key={child.label}>
                        <Link to={child.path} className="dropdown-link">{child.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <Link to="/donate" className="btn btn-donate" id="nav-donate-btn">
              DONATE
            </Link>
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
            <li key={item.label} className="mobile-nav-item">
              <div className="mobile-link-row">
                <Link to={item.path} className="mobile-link" onClick={() => {
                  if (!item.children) { setMobileOpen(false); document.body.style.overflow = '' }
                }}>
                  {item.label}
                </Link>
                {item.children && (
                  <button 
                    className={`mobile-dropdown-toggle ${activeDropdown === item.label ? 'active' : ''}`}
                    onClick={() => toggleDropdown(item.label)}
                    aria-label={`Toggle ${item.label} submenu`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                )}
              </div>
              {item.children && (
                <ul className={`mobile-dropdown ${activeDropdown === item.label ? 'active' : ''}`}>
                  {item.children.map(child => (
                    <li key={child.label}>
                      <Link to={child.path} className="mobile-dropdown-link" onClick={() => {
                        setMobileOpen(false)
                        document.body.style.overflow = ''
                      }}>
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li className="mobile-nav-item mobile-donate-item">
            <Link to="/donate" className="btn btn-donate mobile-donate-btn" onClick={() => {
              setMobileOpen(false)
              document.body.style.overflow = ''
            }}>
              DONATE
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}
