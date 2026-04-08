import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="logo-icon">
                <svg viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2"/>
                  <path d="M20 6 C20 6, 28 14, 28 20 C28 26, 20 34, 20 34 C20 34, 12 26, 12 20 C12 14, 20 6, 20 6Z" fill="currentColor" opacity="0.3"/>
                  <circle cx="20" cy="18" r="4" fill="currentColor"/>
                </svg>
              </div>
              <span className="logo-text">Ummah<span className="logo-accent">Connect</span></span>
            </Link>
            <p className="footer-tagline">Your trusted Islamic community platform for prayer times, Zakaat calculations, and more.</p>
          </div>
          <div className="footer-links-group">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><a href="/#prayer-times">Prayer Times</a></li>
              <li><a href="/#zakaat">Zakaat Calculator</a></li>
              <li><a href="/#about">About Us</a></li>
            </ul>
          </div>
          <div className="footer-links-group">
            <h4>Legal</h4>
            <ul>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>
          <div className="footer-links-group">
            <h4>Connect</h4>
            <ul>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Community Forum</a></li>
              <li><a href="#">Download App</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Ummah Connect. All rights reserved.</p>
          <p className="footer-bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
        </div>
      </div>
    </footer>
  )
}
