import './FeaturedEventSection.css'

const ZEFFY_URL =
  'https://www.zeffy.com/en-CA/ticketing/al-huda-islamic-centre-summer-camp-and-family-retreat--2026-2'

export default function FeaturedEventSection() {
  return (
    <section className="featured-event" id="summer-camp-2026">
      <div className="container">
        <div className="featured-event-card">
          <div className="featured-event-content">
            <span className="section-tag">Featured Event</span>
            <h2>First Summer Camp &amp; Family Retreat 2026</h2>
            <p className="featured-event-theme">
              Faith, Family, and Fellowship: Growing Together for the Sake of Allah
            </p>

            <div className="featured-event-meta">
              <div className="featured-event-meta-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>July 10&ndash;12, 2026</span>
              </div>
              <div className="featured-event-meta-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>Springwood Outdoor Discovery Camp, Brigus Junction</span>
              </div>
            </div>

            <p className="featured-event-desc">
              AL-HUDA Islamic Centre is pleased to invite families, youth, and community
              members to register for our First Summer Camp and Family Retreat. This retreat
              is designed to bring the community together for a balanced weekend of spiritual
              reminders, family bonding, couples&rsquo; sessions, children&rsquo;s outdoor
              education, recreation, and adventure in a peaceful natural environment.
            </p>
          </div>

          <div className="featured-event-actions">
            <a
              href={ZEFFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              Register Now
              <span className="btn-arrow" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
