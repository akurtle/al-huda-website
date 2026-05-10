import { Link } from 'react-router-dom'
import '../pages/PageStyles.css'

export default function DonatePage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="page-breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <span>Donate</span>
          </div>
          <span className="section-tag">Support Us</span>
          <h1 className="page-hero-title">Your Donation Matters</h1>
          <p className="page-hero-subtitle">
            Together, we can build a centre of excellence that serves as a beacon 
            for the Muslim community in Newfoundland and beyond.
          </p>
        </div>
      </section>

      <section className="page-body">
        <div className="container">
          <div className="donate-content">
            <h2 style={{ textAlign: 'center', marginTop: 0, marginBottom: '2rem' }}>
              Multiple Ongoing Donation Projects
            </h2>

            <div className="donate-projects">
              <div className="donate-project-card">
                <div className="donate-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                  </svg>
                </div>
                <h3>Donation for AIC Activities</h3>
                <p>
                  Support the growth of knowledge, unity, and community empowerment through 
                  your donation. Together, we can build a center of excellence that serves 
                  as a beacon for the Muslim community in Newfoundland and beyond.
                </p>
              </div>

              <div className="donate-project-card">
                <div className="donate-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </div>
                <h3>Donation for Sadaqah and Zakat</h3>
                <p>
                  Extend your kindness and compassion by contributing to our Sadaqah fund. 
                  Fulfill your obligation of Zakat and make a meaningful difference in the 
                  lives of those less fortunate. Your donation is an investment in creating 
                  a space where knowledge, unity, and support flourish.
                </p>
              </div>
            </div>

            <div className="donate-options">
              <h2 style={{ marginTop: 0 }}>Donation Options</h2>

              <div className="donate-option-item">
                <span className="donate-option-label">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" style={{ verticalAlign: 'middle', marginRight: '0.5rem' }}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Interac
                </span>
                <span className="donate-option-value">ahislamiccentre@gmail.com</span>
              </div>

              <div className="donate-option-item">
                <span className="donate-option-label">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" style={{ verticalAlign: 'middle', marginRight: '0.5rem' }}>
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                    <line x1="1" y1="10" x2="23" y2="10"/>
                  </svg>
                  Bank Transfer
                </span>
                <span className="donate-option-value">Transit#: 00163, Int# 01163, Acc#11410</span>
              </div>

              <div className="donate-option-item">
                <span className="donate-option-label">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" style={{ verticalAlign: 'middle', marginRight: '0.5rem' }}>
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="16"/>
                    <line x1="8" y1="12" x2="16" y2="12"/>
                  </svg>
                  GoFundMe
                </span>
                <span className="donate-option-value">
                  <a 
                    href="https://www.gofundme.com/f/fundraiser-for-permanent-masjid-for-5daily-prayers"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Mount Pearl Masjid: Elevate Faith, Build Home
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
