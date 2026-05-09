import './MissionSection.css'

export default function MissionSection() {
  return (
    <section className="mission-section" id="mission">
      <div className="container">
        <div className="mission-layout">
          <div className="mission-content">
            <span className="section-tag">Our Mission</span>
            <h2 className="section-title">Building a Centre of Excellence</h2>
            <div className="mission-divider" />
            <p className="mission-text">
              To establish a centre of excellence to serve as the citadel of knowledge, 
              capacity building and social support hub for the growing African Muslims 
              and others in Newfoundland.
            </p>
            <div className="mission-pillars">
              {[
                { icon: '📚', label: 'Knowledge', desc: 'Islamic education and scholarship' },
                { icon: '🤝', label: 'Capacity Building', desc: 'Empowering community members' },
                { icon: '💝', label: 'Social Support', desc: 'Welfare and community care' },
              ].map(p => (
                <div className="mission-pillar" key={p.label}>
                  <span className="pillar-icon">{p.icon}</span>
                  <h4>{p.label}</h4>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mission-visual">
            <div className="mission-image-wrapper">
              <img 
                src="/src/assets/mission.jpg" 
                alt="Al-Huda Islamic Centre community" 
                className="mission-image"
              />
              <div className="mission-image-accent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
