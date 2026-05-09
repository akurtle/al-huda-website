import outdoorPrayer from '../assets/onearth-inspired/outdoor-prayer.jpg'
import './MissionSection.css'

const pillars = [
  { value: '01', label: 'Knowledge', desc: 'Islamic education, lectures, and Qur’anic learning for all ages.' },
  { value: '02', label: 'Capacity Building', desc: 'Programs that help community members grow in confidence and service.' },
  { value: '03', label: 'Social Support', desc: 'Care, connection, and practical support for families and individuals.' },
]

export default function MissionSection() {
  return (
    <section className="mission-section" id="mission">
      <div className="container">
        <div className="mission-layout">
          <div className="mission-content">
            <span className="section-tag">Our Mission</span>
            <h2 className="section-title">A centre of excellence for faith and community life.</h2>
            <p className="mission-text">
              To establish a centre of excellence to serve as the citadel of knowledge,
              capacity building, and social support hub for the growing African Muslims
              and others in Newfoundland.
            </p>
          </div>

          <div className="mission-visual">
            <img
              src={outdoorPrayer}
              alt="Community prayer gathering outdoors"
              className="mission-image"
            />
          </div>
        </div>

        <div className="mission-pillars">
          {pillars.map((pillar) => (
            <article className="mission-pillar" key={pillar.label}>
              <span>{pillar.value}</span>
              <div>
                <h3>{pillar.label}</h3>
                <p>{pillar.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
