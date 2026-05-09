import appPromo from '../assets/mobile_app_promo.png'
import './AppPromoSection.css'

export default function AppPromoSection() {
  return (
    <section className="app-promo-section">
      <div className="container">
        <div className="app-promo-layout">
          <div className="app-promo-visual">
            <div className="app-mockup-container">
              <img 
                src={appPromo} 
                alt="Al Huda Mobile App Mockup" 
                className="app-mockup-image"
              />
              <div className="app-mockup-glow"></div>
            </div>
          </div>
          
          <div className="app-promo-content">
              <span className="section-tag">Mobile Experience</span>
              <h2 className="promo-title">Faith in Your <span className="text-gradient">Pocket</span></h2>
              <p className="promo-description">
              Get the full Al Huda experience on the go. Stay connected to your faith with adhan notifications, prayer resources, and community updates, all in a beautiful, easy-to-use mobile app.
            </p>
            
            <div className="promo-features">
              <div className="promo-feature-item">
                <div className="promo-feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                </div>
                <div>
                  <h4>Real-time Adhan</h4>
                  <p>Never miss a prayer with localized notifications.</p>
                </div>
              </div>
              <div className="promo-feature-item">
                <div className="promo-feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                </div>
                <div>
                  <h4>Qibla Compass</h4>
                  <p>Find the exact direction of the Kaaba from anywhere.</p>
                </div>
              </div>
              <div className="promo-feature-item">
                <div className="promo-feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                </div>
                <div>
                  <h4>Community Updates</h4>
                  <p>Follow announcements, classes, and event reminders.</p>
                </div>
              </div>
            </div>
            
            <div className="app-store-buttons">
              <a href="#" className="app-btn apple-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.96.95-2.04 1.95-3.15 1.95-1.11 0-1.47-.68-2.73-.68-1.27 0-1.68.66-2.73.68-1.07.02-2.11-.96-3.11-1.95-2.04-2.03-3.6-5.74-3.6-9.13 0-3.39 1.76-5.18 3.5-5.18 1.05 0 2.04.73 2.68.73.63 0 1.83-.87 3.12-.87 1.08 0 2.44.57 3.25 1.63-2.18 1.3-1.83 4.15.22 5.06-.82 2.01-1.89 3.8-3.45 5.86zm-2.1-15.68c.57-.7 1-1.63.89-2.58-.83.03-1.84.55-2.44 1.25-.53.63-.99 1.58-.87 2.49.92.07 1.85-.46 2.42-1.16z"/></svg>
                <div className="app-btn-text">
                  <span>Download on the</span>
                  <strong>App Store</strong>
                </div>
              </a>
              <a href="#" className="app-btn google-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186c-.18.18-.344.131-.462.031-.118-.1-.148-.276-.148-.485V2.268c0-.21.03-.385.148-.485.118-.1.282-.149.461.031zm11.234 9.141l3.523-2.034c.414-.24.734-.145.711.214l-1.047 5.928c-.023.359-.387.697-.811.751l-4.232.544 1.856-5.403zm1.189 6.843l-8.667 1.114 8.667 8.667a.409.409 0 0 0 .584 0l6.634-6.634a.409.409 0 0 0 0-.584l-7.217-2.563zM21.132 8.54l-5.109-2.95a.409.409 0 0 0-.584.214l-1.647 4.795 7.34-4.238a.409.409 0 0 0 0-.721z"/></svg>
                <div className="app-btn-text">
                  <span>GET IT ON</span>
                  <strong>Google Play</strong>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
