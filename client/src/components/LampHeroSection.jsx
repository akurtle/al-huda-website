import { motion, useReducedMotion } from 'motion/react'
import campBg from '../assets/summer-camp-bg.jpg'
import './LampHeroSection.css'

const ZEFFY_URL = 'https://www.zeffy.com/en-CA/ticketing/al-huda-islamic-centre-summer-camp-and-family-retreat--2026-2'
const MotionDiv = motion.div

export default function LampHeroSection() {
  const reduceMotion = useReducedMotion()

  const anim = (initial, whileInView, delay = 0.1) =>
    reduceMotion ? {} : { initial, whileInView, viewport: { once: true, amount: 0.4 }, transition: { ease: 'easeOut', delay, duration: 0.9 } }

  return (
    <section className="lamp-hero" id="summer-camp-2026">
      {/* Background photo + dark overlay */}
      <div className="lamp-hero-bg" style={{ backgroundImage: `url(${campBg})` }} />

      {/* Lamp glow */}
      <div className="lamp-glow-wrap">
        {/* Soft spotlight — radial glow spreading down from the top center */}
        <MotionDiv
          className="lamp-glow"
          {...anim({ opacity: 0, width: '22rem' }, { opacity: 1, width: '48rem' }, 0.1)}
        />

        {/* Bright core directly under the line */}
        <MotionDiv
          className="lamp-core"
          {...anim({ opacity: 0, width: '10rem' }, { opacity: 1, width: '20rem' }, 0.1)}
        />

        {/* Bright glowing line at the very top edge */}
        <MotionDiv
          className="lamp-line"
          {...anim({ width: '8rem', opacity: 0.4 }, { width: '32rem', opacity: 1 }, 0.1)}
        />
      </div>

      {/* Content — rises up after the lamp turns on */}
      <MotionDiv
        className="lamp-content"
        {...anim({ y: 90, opacity: 0 }, { y: 0, opacity: 1 }, 0.45)}
      >
        <span className="lamp-tag">Featured Event</span>

        <h2 className="lamp-title">Summer Camp &amp; Family Retreat 2026</h2>

        <p className="lamp-subtitle">
          Faith, Family, and Fellowship: Growing Together for the Sake of Allah
        </p>

        <div className="lamp-meta">
          <div className="lamp-meta-item">
            {/* Calendar SVG icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span>July 10&ndash;12, 2026</span>
          </div>
          <div className="lamp-meta-item">
            {/* Location SVG icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>Springwood Outdoor Discovery Camp</span>
          </div>
        </div>

        <a
          href={ZEFFY_URL}
          className="lamp-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Register Now
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </a>
      </MotionDiv>
    </section>
  )
}
