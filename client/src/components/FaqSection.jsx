import { useState } from 'react'
import { Link } from 'react-router-dom'
import './FaqSection.css'

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      q: "How do my donations help?",
      a: "Your contributions directly fund the mosque's operational costs, community welfare programs, Islamic education initiatives for youth, and our ongoing expansion efforts."
    },
    {
      q: "Can I volunteer with Al Huda?",
      a: "Yes! We welcome volunteers for our weekend classes, Ramadan iftar organization, community outreach, and special events. Please reach out via our contact page to get involved."
    },
    {
      q: "Are my donations tax-deductible?",
      a: "Yes, Al-Huda Islamic Centre is a registered charity. All donations are tax-deductible as per Canadian Revenue Agency (CRA) regulations."
    },
    {
      q: "Where are Jumuah and classes held?",
      a: "Jumuah prayer and weekend classes are shared through our programs and contact channels. Please reach out if you need the latest location details."
    }
  ]

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        
        <div className="faq-layout">
          <div className="faq-header-col">
            <span className="section-tag">Frequently Asked Questions</span>
            <h2 className="section-title">All You Need to Know</h2>
          </div>

          <div className="faq-accordion-col">
            <div className="faq-accordion">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index
                return (
                  <div className={`faq-item ${isOpen ? 'active' : ''}`} key={index}>
                    <button 
                      className="faq-toggle" 
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    >
                      <h3>{faq.q}</h3>
                      <div className="faq-icon">
                        <span className="faq-icon-line horizontal"></span>
                        <span className="faq-icon-line vertical"></span>
                      </div>
                    </button>
                    <div className="faq-content">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="faq-reach-out-card">
          <div className="reach-content">
            <h3>HAVE ANY QUESTIONS?</h3>
            <p>We're here to help—reach out anytime. Our team is always ready to assist you.</p>
          </div>
          <Link to="/contact" className="btn btn-primary btn-lg">
            REACH OUT
            <span className="btn-arrow" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </span>
          </Link>
        </div>

      </div>
    </section>
  )
}
