import { useEffect } from 'react'
import './PrivacyPolicy.css'

const sections = [
  {
    id: 'intro', title: '1. Introduction',
    content: (
      <>
        <p>Welcome to Al Huda ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your information when you use our website and mobile application (collectively, the "Service").</p>
        <p>By using the Service, you agree to the collection and use of information in accordance with this policy. If you do not agree with the terms of this privacy policy, please do not access the Service.</p>
      </>
    )
  },
  {
    id: 'collect', title: '2. Information We Collect',
    content: (
      <>
        <h4>2.1 Information You Provide</h4>
        <ul>
          <li><strong>Account Information:</strong> Name, email address, and password when you create an account.</li>
          <li><strong>Profile Data:</strong> Optional information such as your city, preferred calculation method, and notification preferences.</li>
          <li><strong>Zakaat Data:</strong> Financial information entered into the Zakaat calculator. This data is processed locally and is not stored on our servers unless you choose to save it.</li>
        </ul>
        <h4>2.2 Information Collected Automatically</h4>
        <ul>
          <li><strong>Location Data:</strong> With your permission, we collect your device's location to provide accurate prayer times and Qibla direction.</li>
          <li><strong>Device Information:</strong> Device type, operating system, unique device identifiers, and mobile network information.</li>
          <li><strong>Usage Data:</strong> Pages visited, features used, time spent on the Service, and other diagnostic data.</li>
        </ul>
        <h4>2.3 Firebase Services</h4>
        <p>We use Google Firebase for authentication, data storage, and analytics. Firebase may collect certain information as described in <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer">Firebase's Privacy Policy</a>.</p>
      </>
    )
  },
  {
    id: 'use', title: '3. How We Use Your Information',
    content: (
      <>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide, maintain, and improve the Service</li>
          <li>Calculate and display accurate prayer times for your location</li>
          <li>Process Zakaat calculations</li>
          <li>Send notifications (with your consent) for prayer times and important updates</li>
          <li>Analyze usage patterns to improve user experience</li>
          <li>Respond to your inquiries and provide customer support</li>
          <li>Detect, prevent, and address technical issues</li>
        </ul>
      </>
    )
  },
  {
    id: 'share', title: '4. Information Sharing and Disclosure',
    content: (
      <>
        <p>We do <strong>not</strong> sell, trade, or rent your personal information. We may share your information only in the following circumstances:</p>
        <ul>
          <li><strong>Service Providers:</strong> With trusted third-party companies that help us operate the Service (e.g., Firebase, hosting providers).</li>
          <li><strong>Legal Requirements:</strong> When required by law or in response to valid legal processes.</li>
          <li><strong>Protection:</strong> To protect the rights, property, or safety of Al Huda, our users, or the public.</li>
          <li><strong>Consent:</strong> With your explicit consent for any other purpose.</li>
        </ul>
      </>
    )
  },
  {
    id: 'security', title: '5. Data Security',
    content: (
      <>
        <p>We implement appropriate technical and organizational measures to protect your personal data including:</p>
        <ul>
          <li>Encryption of data in transit using TLS/SSL</li>
          <li>Secure storage using Firebase's security infrastructure</li>
          <li>Regular security assessments and updates</li>
          <li>Access controls and authentication mechanisms</li>
        </ul>
        <p>However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your personal data, we cannot guarantee its absolute security.</p>
      </>
    )
  },
  {
    id: 'rights', title: '6. Your Rights',
    content: (
      <>
        <p>Depending on your jurisdiction, you may have the following rights:</p>
        <ul>
          <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
          <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data.</li>
          <li><strong>Deletion:</strong> Request deletion of your personal data.</li>
          <li><strong>Portability:</strong> Request a copy of your data in a machine-readable format.</li>
          <li><strong>Objection:</strong> Object to the processing of your personal data.</li>
          <li><strong>Withdraw Consent:</strong> Withdraw consent at any time where we rely on consent for processing.</li>
        </ul>
        <p>To exercise any of these rights, please contact us using the information provided below.</p>
      </>
    )
  },
  {
    id: 'children', title: "7. Children's Privacy",
    content: (
      <p>The Service is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If we learn that we have collected personal data from a child under 13 without parental consent, we will take steps to delete that information promptly.</p>
    )
  },
  {
    id: 'changes', title: '8. Changes to This Policy',
    content: (
      <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. You are advised to review this privacy policy periodically for any changes.</p>
    )
  },
  {
    id: 'contact', title: '9. Contact Us',
    content: (
      <>
        <p>If you have any questions or concerns about this privacy policy, please contact us:</p>
        <div className="contact-card">
          <div className="contact-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <span>privacy@alhuda.com</span>
          </div>
          <div className="contact-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>123 Community Center, Your City</span>
          </div>
        </div>
      </>
    )
  }
]

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className="privacy-section">
      <div className="container">
        <div className="section-header" style={{ paddingTop: 'calc(var(--nav-height) + 3rem)' }}>
          <span className="section-tag">Legal</span>
          <h2 className="section-title">Privacy Policy</h2>
          <p className="section-subtitle">Last updated: April 8, 2026</p>
        </div>

        <div className="privacy-content">
          <nav className="privacy-nav">
            {sections.map(s => (
              <a
                key={s.id}
                href={`#privacy-${s.id}`}
                className="privacy-nav-link"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(`privacy-${s.id}`)?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {s.title.replace(/^\d+\.\s*/, '')}
              </a>
            ))}
          </nav>

          <div className="privacy-body">
            {sections.map(s => (
              <div className="privacy-block" id={`privacy-${s.id}`} key={s.id}>
                <h3>{s.title}</h3>
                {s.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
