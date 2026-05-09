import { Link } from 'react-router-dom'
import './DonateCtaSection.css'

export default function DonateCtaSection() {
  return (
    <section className="donate-cta-section">
      <div className="container">
        <div className="donate-cta-card">
          <div className="donate-cta-content">
            <span className="section-tag">Support the Centre</span>
            <h2>Your donation helps sustain worship, learning, and care.</h2>
            <p>
              Support the growth of knowledge, unity, and community empowerment.
              Together, we can build a centre of excellence that serves Muslims
              in Newfoundland and beyond.
            </p>
          </div>
          <div className="donate-cta-actions">
            <Link to="/donate" className="btn btn-primary btn-lg">
              Donate Now
              <span className="btn-arrow" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </Link>
            <Link to="/contact" className="btn btn-outline btn-lg">
              Contact Us
              <span className="btn-arrow" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
