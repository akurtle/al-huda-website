import { Link } from 'react-router-dom'
import './AboutSection.css'

export default function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="about-layout">
          <div className="about-image-side">
            <div className="about-image-wrapper">
              <img 
                src="/src/assets/about.jpg" 
                alt="Al-Huda Islamic Centre community gathering" 
                className="about-image"
              />
              <div className="about-image-badge">
                <span className="about-badge-number">10+</span>
                <span className="about-badge-text">Years of Service</span>
              </div>
            </div>
          </div>
          <div className="about-content">
            <span className="section-tag">About Us</span>
            <h2 className="section-title">Welcome to the AIC</h2>
            <div className="about-accent-line" />
            <p className="about-text">
              Welcome to the AIC — the Atlantic Islamic Centre, a beacon of knowledge, 
              community, and support for the growing Muslim Community in Newfoundland and beyond.
            </p>
            <p className="about-text">
              Our centre serves as a spiritual home for Muslims in the Atlantic region, 
              providing essential Islamic services, education, and a strong sense of community 
              for families and individuals alike.
            </p>
            <div className="about-highlights">
              <div className="about-highlight">
                <div className="highlight-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                  </svg>
                </div>
                <div>
                  <h4>Islamic Education</h4>
                  <p>Weekend classes, lectures, and Qur'anic studies</p>
                </div>
              </div>
              <div className="about-highlight">
                <div className="highlight-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div>
                  <h4>Community Building</h4>
                  <p>Social events, welfare support, and unity</p>
                </div>
              </div>
              <div className="about-highlight">
                <div className="highlight-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </div>
                <div>
                  <h4>Spiritual Growth</h4>
                  <p>Prayer services, Ramadan programs, and more</p>
                </div>
              </div>
            </div>
            <Link to="/mission" className="btn btn-primary btn-lg about-cta">
              Read More About Us
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
