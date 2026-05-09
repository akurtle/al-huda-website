import heroImage from '../assets/onearth-inspired/hero-prayer.jpg'
import './HeroSection.css'

export default function HeroSection({ nextPrayer, islamicDate }) {
  const gregorianDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <section className="hero-section" id="home" style={{ '--hero-image': `url(${heroImage})` }}>
      <div className="hero-overlay" />
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-badge">
              <span className="badge-dot" />
              <span>Al-Huda Islamic Centre (AIC)</span>
            </div>
            <h1 className="hero-title">Faith, Dialogue, and Community in Newfoundland</h1>
          </div>

          <div className="hero-subheading">
            <p className="hero-subtitle">
              A welcoming centre of knowledge, prayer, capacity building, and social support
              for the growing Muslim community across Newfoundland and beyond.
            </p>
            <a href="#programs" className="btn btn-primary btn-lg" onClick={(e) => {
              e.preventDefault()
              document.querySelector('#programs')?.scrollIntoView({ behavior: 'smooth' })
            }}>
              Explore Programs
              <span className="btn-arrow" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </a>
          </div>
        </div>

        <div className="hero-bottom">
          <div className="hero-stat-card">
            <span className="stat-number">10+</span>
            <span className="stat-label">Years Serving</span>
          </div>
          <div className="hero-stat-card">
            <span className="stat-number">5k+</span>
            <span className="stat-label">Community Members</span>
          </div>
          <div className="hero-prayer-card">
            <div>
              <span className="prayer-mini-header">Next Prayer</span>
              <strong>{nextPrayer?.name || 'Loading...'}</strong>
            </div>
            <div className="hero-prayer-meta">
              <span>{nextPrayer?.time || '--:--'}</span>
              <small>{nextPrayer?.countdown || '...'}</small>
            </div>
          </div>
          <div className="hero-date-card">
            <span>{islamicDate || 'Islamic date loading...'}</span>
            <small>{gregorianDate}</small>
          </div>
        </div>
      </div>
    </section>
  )
}
