import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import communityPrayer from '../assets/onearth-inspired/community-prayer.jpg'
import gatheringImage from '../assets/onearth-inspired/mosque-gathering.jpg'
import outdoorPrayer from '../assets/onearth-inspired/outdoor-prayer.jpg'
import heroPrayer from '../assets/onearth-inspired/hero-prayer.jpg'
import lecture1Image from '../assets/onearth-inspired/Lecutre-1.jpg'
import './ProgramsSection.css'

const programs = [
  {
    title: 'Bi-Weekly Lectures',
    desc: 'Regular Islamic lectures covering various topics to enrich knowledge and strengthen faith.',
    image: lecture1Image,
    slug: 'lectures',
  },
  {
    title: 'Annual Ramadan Tafseer',
    desc: 'In-depth Qur\'anic exegesis sessions held annually during the blessed month of Ramadan.',
    image: heroPrayer,
    slug: 'tafseer',
  },
  {
    title: 'Weekend Islamic Classes',
    desc: 'Structured weekend classes for children at Memorial University, Saturdays & Sundays.',
    image: communityPrayer,
    slug: 'weekend-classes',
  },
  {
    title: 'Annual Iftar Saahim',
    desc: 'Community iftar gatherings during Ramadan fostering unity and shared spiritual experience.',
    image: outdoorPrayer,
    slug: 'ramadan',
  },
  {
    title: 'Graveyard Visitation',
    desc: 'Organized community visits as a reminder of the hereafter and to pray for the deceased.',
    image: gatheringImage,
    slug: 'visitation',
  },
]

export default function ProgramsSection() {
  return (
    <section className="programs-section" id="programs">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">What We Offer</span>
          <h2 className="section-title">Programs & Services</h2>
          <p className="section-subtitle">
            Al-Huda Islamic Centre (AIC) is enriched with outstanding programs and core services
            for the Muslim community in Newfoundland.
          </p>
        </Reveal>
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
                  <span className="program-card-cta">Learn More</span>
                </div>
              </div>
              <div className="program-card-body">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <span className="program-arrow" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
