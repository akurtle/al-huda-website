import './AboutSection.css'

export default function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="about-layout">
          <div className="about-content">
            <span className="section-tag">About Us</span>
            <h2 className="section-title">Serving the Community with Excellence</h2>
            <p className="about-text">
              Al Huda is dedicated to providing the Muslim community with reliable, accurate, and beautifully designed Islamic tools and resources. Our mission is to make essential Islamic services accessible to everyone, everywhere.
            </p>
            <p className="about-text">
              Whether you need accurate prayer times for your location, want to calculate your Zakaat obligation, or are looking to connect with your local Muslim community, Al Huda is here for you.
            </p>
            <div className="about-values">
              {[
                {
                  title: 'Accuracy',
                  desc: 'Verified calculations based on authenticated Islamic sources',
                  icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                },
                {
                  title: 'Privacy First',
                  desc: 'Your personal data is protected and never shared with third parties',
                  icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                },
                {
                  title: 'Community Love',
                  desc: 'Built by the community, for the community with care and dedication',
                  icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                }
              ].map(v => (
                <div className="value-item" key={v.title}>
                  <div className="value-icon">{v.icon}</div>
                  <div>
                    <h4>{v.title}</h4>
                    <p>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-visual">
            <div className="about-pattern-card">
              <div className="quran-verse">
                <p className="verse-arabic">إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا</p>
                <p className="verse-translation">"Indeed, prayer has been decreed upon the believers a decree of specified times."</p>
                <p className="verse-reference">Surah An-Nisa 4:103</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
