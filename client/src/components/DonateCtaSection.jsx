import { Link } from 'react-router-dom'
import './DonateCtaSection.css'

export default function DonateCtaSection() {
  return (
    <section className="donate-cta-section">
      <div className="donate-cta-bg">
        <div className="donate-cta-shape donate-cta-shape-1" />
        <div className="donate-cta-shape donate-cta-shape-2" />
      </div>
      <div className="container">
        <div className="donate-cta-content">
          <div className="donate-cta-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </div>
          <h2>Your Donation Matters</h2>
          <p>
            Support the growth of knowledge, unity, and community empowerment. 
            Together, we can build a centre of excellence that serves as a beacon 
            for the Muslim community in Newfoundland and beyond.
          </p>
          <div className="donate-cta-actions">
            <Link to="/donate" className="btn btn-primary btn-lg donate-cta-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              Donate Now
            </Link>
            <Link to="/contact" className="btn btn-outline btn-lg donate-cta-btn-outline">
              Contact Us
            </Link>
          </div>
          <p className="donate-cta-verse">
            <span className="verse-arabic-sm">مَّن ذَا الَّذِي يُقْرِضُ اللَّهَ قَرْضًا حَسَنًا</span>
            <span className="verse-trans-sm">"Who is it that would loan Allah a goodly loan?" — Surah Al-Baqarah 2:245</span>
          </p>
        </div>
      </div>
    </section>
  )
}
