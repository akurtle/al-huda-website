import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import usePollEvents from '../hooks/usePollEvents'
import heroPhoto from '../assets/onearth-inspired/mosque-gathering.jpg'
import '../pages/PageStyles.css'
import '../pages/EventsPage.css'
import './LivePollingPage.css'

export default function LivePollingPage() {
  const { events, isLoading, error } = usePollEvents()

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Live Polling' }]}
        eyebrow="Community"
        title="Live Polling"
        subtitle="Have your say on what's happening right now. Select a live poll below to see the questions and vote."
        image={heroPhoto}
      />

      <section className="page-body">
        <div className="container">
          {isLoading && <div className="event-notice">Loading live polls…</div>}

          {!isLoading && error && (
            <div className="event-notice">Live polls could not be loaded right now. Please check back soon.</div>
          )}

          {!isLoading && !error && events.length === 0 && (
            <div className="event-notice">No live polls right now — check back during our next event.</div>
          )}

          {!isLoading && !error && events.length > 0 && (
            <Reveal>
              <div className="events-grid">
                {events.map((event) => (
                  <Link className="events-grid-card" key={event.id} to={`/live-polling/${event.id}`}>
                    <div className="events-grid-body">
                      <span className="event-badge poll-live-badge">
                        <span className="poll-live-dot" aria-hidden="true" />
                        Live now
                      </span>
                      <h3 className="events-grid-title">{event.title}</h3>
                      {event.description && <p className="events-grid-desc">{event.description}</p>}
                      <div className="events-grid-footer">
                        <span className="events-grid-cta" aria-hidden="true">
                          Vote now
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  )
}
