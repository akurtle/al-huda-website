import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../pages/PageStyles.css'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production, this would send to a backend
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="page-breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <span>Contact</span>
          </div>
          <span className="section-tag">Reach Out</span>
          <h1 className="page-hero-title">Get in Touch</h1>
          <p className="page-hero-subtitle">
            We'd love to hear from you. Reach out for any questions, suggestions, or support.
          </p>
        </div>
      </section>

      <section className="page-body">
        <div className="container">
          <div className="contact-layout">
            <div className="contact-info-side">
              <div className="contact-info-cards">
                <div className="contact-info-card">
                  <div className="contact-info-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <h4>Address</h4>
                    <p>15 Charter Ct, St. John's, NL A1A 3P9</p>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div className="contact-info-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div>
                    <h4>Phone</h4>
                    <p>+1 (709) 725-1470</p>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div className="contact-info-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div>
                    <h4>Email</h4>
                    <p>ahislamiccentre@gmail.com</p>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div className="contact-info-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div>
                    <h4>Jumuah Prayer</h4>
                    <p>Every Friday at 1:00 PM<br/>Park Place, Mount Pearl</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <h3>Send Us a Message</h3>
              {submitted && (
                <div style={{
                  padding: '0.75rem 1rem',
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--success)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  marginBottom: '1.25rem',
                }}>
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="contact-name">Full Name</label>
                    <input 
                      type="text" id="contact-name" required
                      value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="contact-email">Email</label>
                    <input 
                      type="email" id="contact-email" required
                      value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="contact-subject">Subject</label>
                  <input 
                    type="text" id="contact-subject" required
                    value={form.subject}
                    onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                    placeholder="How can we help?"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="contact-message">Message</label>
                  <textarea 
                    id="contact-message" required
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    placeholder="Your message..."
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-lg btn-full">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
