import { useEffect, useRef } from 'react'
import './HeroSection.css'

export default function HeroSection({ nextPrayer, islamicDate }) {
  const statsRef = useRef(null)

  useEffect(() => {
    const counters = statsRef.current?.querySelectorAll('.stat-number[data-target]')
    if (!counters) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.5 })

    counters.forEach(c => observer.observe(c))
    return () => observer.disconnect()
  }, [])

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'))
    const duration = 2000
    const increment = target / (duration / 16)
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) { current = target; clearInterval(timer) }
      el.textContent = Math.floor(current).toLocaleString()
    }, 16)
  }

  const gregorianDate = new Date().toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  })

  return (
    <section className="hero-section" id="home">
      <div className="hero-bg-shapes">
        <div className="hero-shape hero-shape-1" />
        <div className="hero-shape hero-shape-2" />
        <div className="hero-shape hero-shape-3" />
      </div>
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            <span>Serving the Muslim Community</span>
          </div>
          <h1 className="hero-title">
            Your Trusted <span className="text-gradient">Islamic</span> Community Hub
          </h1>
          <p className="hero-subtitle">
            Accurate prayer times, Zakaat calculations, and essential Islamic resources — all in one beautiful platform designed for the modern Muslim community.
          </p>
          <div className="hero-actions">
            <a href="#prayer-times" className="btn btn-primary btn-lg" onClick={(e) => {
              e.preventDefault()
              document.querySelector('#prayer-times')?.scrollIntoView({ behavior: 'smooth' })
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              View Prayer Times
            </a>
            <a href="#zakaat" className="btn btn-outline btn-lg" onClick={(e) => {
              e.preventDefault()
              document.querySelector('#zakaat')?.scrollIntoView({ behavior: 'smooth' })
            }}>
              Calculate Zakaat
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
          <div className="hero-stats" ref={statsRef}>
            <div className="stat-item">
              <span className="stat-number" data-target="5000">0</span>+
              <span className="stat-label">Community Members</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number" data-target="365">0</span>
              <span className="stat-label">Days Active</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number" data-target="99">0</span>%
              <span className="stat-label">Accuracy</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card-stack">
            <div className="hero-card hero-card-prayer">
              <div className="prayer-mini-header">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></svg>
                Next Prayer
              </div>
              <div className="prayer-mini-name">{nextPrayer?.name || 'Loading...'}</div>
              <div className="prayer-mini-time">{nextPrayer?.time || '--:--'}</div>
              <div className="prayer-mini-countdown">{nextPrayer?.countdown || '...'}</div>
            </div>
            <div className="hero-card hero-card-date">
              <div className="islamic-date-label">Islamic Date</div>
              <div className="islamic-date-value">{islamicDate || '...'}</div>
              <div className="gregorian-date">{gregorianDate}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-scroll-indicator">
        <span>Scroll Down</span>
        <div className="scroll-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        </div>
      </div>
    </section>
  )
}
