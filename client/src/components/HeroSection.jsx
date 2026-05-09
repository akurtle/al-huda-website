import { useEffect, useRef, useState } from 'react'
import './HeroSection.css'

export default function HeroSection({ nextPrayer, islamicDate }) {
  const statsRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    '/src/assets/hero-1.jpg',
    '/src/assets/hero-2.jpg',
    '/src/assets/hero-3.jpg',
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

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
      {/* Image Slider Background */}
      <div className="hero-slider">
        {slides.map((src, i) => (
          <div
            key={i}
            className={`hero-slide ${i === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
        <div className="hero-slider-overlay" />
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            <span>Al-Huda Islamic Centre (AIC)</span>
          </div>
          <h1 className="hero-title">
            Faith, <span className="text-gradient-hero">Dialogue</span> & Community
          </h1>
          <p className="hero-subtitle">
            Welcome to the Atlantic Islamic Centre — a beacon of knowledge, community, 
            and support for the growing Muslim Community in Newfoundland and beyond.
          </p>
          <div className="hero-actions">
            <a href="#programs" className="btn btn-primary btn-lg" onClick={(e) => {
              e.preventDefault()
              document.querySelector('#programs')?.scrollIntoView({ behavior: 'smooth' })
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              Our Programs
            </a>
            <a href="#prayer-times" className="btn btn-outline-hero btn-lg" onClick={(e) => {
              e.preventDefault()
              document.querySelector('#prayer-times')?.scrollIntoView({ behavior: 'smooth' })
            }}>
              Prayer Times
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
          </div>
          <div className="hero-stats" ref={statsRef}>
            <div className="stat-item">
              <span className="stat-number" data-target="5000">0</span>+
              <span className="stat-label">Community Members</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number" data-target="5">0</span>
              <span className="stat-label">Core Programs</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number" data-target="10">0</span>+
              <span className="stat-label">Years Serving</span>
            </div>
          </div>
        </div>

        {/* Prayer Time Floating Card */}
        <div className="hero-visual">
          <div className="hero-card-stack">
            <div className="hero-card hero-card-prayer">
              <div className="prayer-mini-header">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /></svg>
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

      {/* Slider Dots */}
      <div className="hero-slider-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`slider-dot ${i === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="hero-scroll-indicator">
        <span>Scroll Down</span>
        <div className="scroll-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
        </div>
      </div>
    </section>
  )
}
