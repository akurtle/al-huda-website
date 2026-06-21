import { motion, useReducedMotion } from 'motion/react'
import campBg from '../assets/summer-camp-bg.jpg'
import './LampHeroSection.css'

const ZEFFY_URL = 'https://www.zeffy.com/en-CA/ticketing/al-huda-islamic-centre-summer-camp-and-family-retreat--2026-2'
const MotionDiv = motion.div

export default function LampHeroSection() {
  const reduceMotion = useReducedMotion()

  const anim = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { y: 32, opacity: 0 },
          whileInView: { y: 0, opacity: 1 },
          viewport: { once: true, amount: 0.3 },
          transition: { ease: [0.22, 1, 0.36, 1], delay, duration: 0.65 },
        }

  return (
    <section className="featured-event" id="summer-camp-2026">
      <div className="container">
        <MotionDiv className="featured-event-card" {...anim(0)}>
          <div className="featured-event-media">
            <img src={campBg} alt="Children and families at the Al Huda summer camp" />
          </div>

          <div className="featured-event-body">
            <span className="section-tag">Featured Event</span>

            <h2 className="featured-event-title">Summer Camp &amp; Family Retreat 2026</h2>

            <p className="featured-event-subtitle">
              Faith, Family, and Fellowship: Growing Together for the Sake of Allah
            </p>

            <div className="featured-event-meta">
              <div className="featured-event-meta-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>July 10&ndash;12, 2026</span>
              </div>
              <div className="featured-event-meta-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Springwood Outdoor Discovery Camp</span>
              </div>
            </div>

            <a
              href={ZEFFY_URL}
              className="btn btn-primary btn-lg featured-event-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Register Now
              <span className="btn-arrow" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </a>
          </div>
        </MotionDiv>
      </div>
    </section>
  )
}
