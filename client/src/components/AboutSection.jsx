import { Link } from 'react-router-dom'
import communityImage from '../assets/onearth-inspired/community-prayer.jpg'
import gatheringImage from '../assets/onearth-inspired/mosque-gathering.jpg'
import './AboutSection.css'

export default function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="about-eyebrow">
          <span className="section-tag">About Al-Huda</span>
        </div>

        <div className="about-heading-row">
          <h2 className="section-title">
            A spiritual home shaped by knowledge, service, and belonging.
          </h2>
          <p>
            Al-Huda Islamic Centre serves families and individuals through prayer,
            Islamic education, community care, and spaces where faith can be practiced
            with dignity and warmth.
          </p>
        </div>

        <div className="about-editorial-grid">
          <div className="about-number-card">
            <div>
              <span className="about-badge-number">10+</span>
              <span className="about-badge-text">Years of Service</span>
            </div>
            <p>Serving Muslims in Newfoundland with education, worship, and community support.</p>
          </div>

          <div className="about-image-card">
            <img
              src={communityImage}
              alt="Community members gathering for prayer"
              className="about-image"
            />
          </div>

          <div className="about-mission-card">
            <span className="section-tag">Our Work</span>
            <h3>Building capacity for the next generation.</h3>
            <p>
              From weekend classes and Ramadan programs to Jumuah prayer and volunteer-led
              care, our work is rooted in practical service and sincere connection.
            </p>
            <Link to="/mission" className="btn btn-primary btn-lg about-cta">
              Read Our Mission
              <span className="btn-arrow" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </Link>
          </div>

          <div className="about-image-card tall">
            <img
              src={gatheringImage}
              alt="Worshippers inside a mosque space"
              className="about-image"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
