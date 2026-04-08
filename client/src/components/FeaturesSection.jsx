import './FeaturesSection.css'

const features = [
  {
    title: 'Prayer Times',
    desc: 'Accurate prayer timings based on your location with beautiful Adhan notifications and Qibla direction.',
    link: '#prayer-times',
    linkText: 'View Times →',
    iconClass: 'feature-icon-prayer',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  },
  {
    title: 'Zakaat Calculator',
    desc: 'Calculate your Zakaat obligation accurately with our comprehensive calculator covering gold, silver, cash, and more.',
    link: '#zakaat',
    linkText: 'Calculate Now →',
    iconClass: 'feature-icon-zakaat',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    featured: true
  },
  {
    title: 'Community',
    desc: 'Connect with your local Muslim community, find nearby mosques, and participate in community events.',
    link: '#about',
    linkText: 'Learn More →',
    iconClass: 'feature-icon-community',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  }
]

export default function FeaturesSection() {
  const scrollTo = (e, hash) => {
    e.preventDefault()
    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="features-section" id="features">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">What We Offer</span>
          <h2 className="section-title">Everything You Need in One Place</h2>
          <p className="section-subtitle">Comprehensive Islamic tools and resources designed with care and precision for the Muslim community.</p>
        </div>
        <div className="features-grid">
          {features.map((f) => (
            <div className={`feature-card ${f.featured ? 'featured' : ''}`} key={f.title}>
              {f.featured && <div className="feature-badge">Popular</div>}
              <div className={`feature-icon ${f.iconClass}`}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <a href={f.link} className="feature-link" onClick={(e) => scrollTo(e, f.link)}>{f.linkText}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
