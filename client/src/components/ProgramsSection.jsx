import { Link } from 'react-router-dom'
import './ProgramsSection.css'

const programs = [
  {
    title: 'Bi-Weekly Lectures',
    desc: 'Regular Islamic lectures covering various topics to enrich knowledge and strengthen faith.',
    image: '/src/assets/programs/lectures.jpg',
    slug: 'lectures',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
  {
    title: 'Annual Ramadan Tafseer',
    desc: 'In-depth Qur\'anic exegesis sessions held annually during the blessed month of Ramadan.',
    image: '/src/assets/programs/tafseer.jpg',
    slug: 'tafseer',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    ),
  },
  {
    title: 'Weekend Islamic Classes',
    desc: 'Structured weekend classes for children at Memorial University, Saturdays & Sundays.',
    image: '/src/assets/programs/classes.jpg',
    slug: 'weekend-classes',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: 'Annual Iftar Saahim',
    desc: 'Community iftar gatherings during Ramadan fostering unity and shared spiritual experience.',
    image: '/src/assets/programs/iftar.jpg',
    slug: 'ramadan',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/>
        <line x1="10" y1="1" x2="10" y2="4"/>
        <line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
  },
  {
    title: 'Graveyard Visitation',
    desc: 'Organized community visits as a reminder of the hereafter and to pray for the deceased.',
    image: '/src/assets/programs/visitation.jpg',
    slug: 'visitation',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
]

export default function ProgramsSection() {
  return (
    <section className="programs-section" id="programs">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">What We Offer</span>
          <h2 className="section-title">Programs & Services</h2>
          <p className="section-subtitle">
            Al-Huda Islamic Centre (AIC) is enriched with outstanding programs and core services 
            for the Muslim community in Newfoundland.
          </p>
        </div>
        <div className="programs-grid">
          {programs.map((p) => (
            <Link 
              to={`/programs/${p.slug}`} 
              className="program-card" 
              key={p.slug}
            >
              <div className="program-card-image">
                <img src={p.image} alt={p.title} />
                <div className="program-card-overlay">
                  <span className="program-card-cta">Learn More →</span>
                </div>
              </div>
              <div className="program-card-body">
                <div className="program-card-icon">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
