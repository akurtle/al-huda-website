import { useState, useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import heroImage from '../assets/onearth-inspired/hero-prayer.jpg'
import GeometricPattern from './GeometricPattern'
import './HeroSection.css'

const MotionSpan = motion.span
const ROTATING_WORDS = ['Dialogue', 'Knowledge', 'Prayer', 'Service', 'Belonging']
const LONGEST_WORD = ROTATING_WORDS.reduce((a, b) => (b.length > a.length ? b : a))

function RotatingWord() {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % ROTATING_WORDS.length)
    }, 2600)
    return () => clearInterval(id)
  }, [reduceMotion])

  if (reduceMotion) {
    return <span className="rotating-word">{ROTATING_WORDS[0]}</span>
  }

  return (
    <span className="rotating-word">
      {/* Invisible sizer reserves the widest word's width so the rest of the line never reflows. */}
      <span className="rotating-word-sizer" aria-hidden="true">{LONGEST_WORD}</span>
      <AnimatePresence mode="wait" initial={false}>
        <MotionSpan
          key={ROTATING_WORDS[index]}
          className="rotating-word-item"
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -8, opacity: 0 }}
          transition={{ duration: 0.32, ease: 'easeOut' }}
        >
          {ROTATING_WORDS[index]}
        </MotionSpan>
      </AnimatePresence>
    </span>
  )
}

export default function HeroSection({ nextPrayer, islamicDate }) {
  const gregorianDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <section className="hero-section" id="home" style={{ '--hero-image': `url(${heroImage})` }}>
      <div className="hero-overlay" />
      <GeometricPattern color="var(--accent)" opacity="0.08" fade="bottom" />
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-badge">
              <span className="badge-dot" />
              <span>Al-Huda Islamic Centre (AIC)</span>
            </div>
            <h1 className="hero-title">
              Faith, <RotatingWord />
              <br />
              and community in Newfoundland
            </h1>
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
            <span className="stat-number">5+</span>
            <span className="stat-label">Years Serving</span>
          </div>
          <div className="hero-stat-card">
            <span className="stat-number">2k+</span>
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
