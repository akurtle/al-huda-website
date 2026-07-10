import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { fetchAllEvents, formatEventDate, readEventsCache } from '../services/events'
import heroPhoto from '../assets/onearth-inspired/mosque-gathering.jpg'
import '../pages/PageStyles.css'
import './EventsPage.css'

export default function EventsPage() {
  const cached = useRef(readEventsCache(50)).current
  const [events, setEvents] = useState(cached ?? [])
  const [isLoading, setIsLoading] = useState(cached === null)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadEvents() {
      try {
        const all = await fetchAllEvents({ limit: 50 })
        if (isMounted) {
          setEvents(all)
          setError('')
        }
      } catch {
        if (isMounted) {
          setError('Events could not be loaded right now. Please check back soon.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadEvents()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Events' }]}
        eyebrow="Community"
        title="Events at Al-Huda"
        subtitle="Lectures, gatherings, and programs bringing our community together. Select an event to see full details."
        image={heroPhoto}
      />

      <section className="page-body">
        <div className="container">
          {isLoading && (
            <div className="event-notice">Loading events…</div>
          )}

          {!isLoading && error && (
            <div className="event-notice">{error}</div>
          )}

          {!isLoading && !error && events.length === 0 && (
            <div className="event-notice">Upcoming events will be posted soon.</div>
          )}

          {!isLoading && !error && events.length > 0 && (
            <div className="events-grid">
              {events.map((event) => (
                <Link
                  className="events-grid-card"
                  key={event.id || event.title}
                  to={`/events/${event.id}`}
                >
                  {event.assetImagePath && (
                    <img
                      className="events-grid-image"
                      src={event.assetImagePath}
                      alt=""
                      loading="lazy"
                    />
                  )}
                  <div className="events-grid-body">
                    <span className="event-badge">{formatEventDate(event.date)}</span>
                    <h3 className="events-grid-title">{event.title}</h3>
                    {event.description && (
                      <p className="events-grid-desc">{event.description}</p>
                    )}
                    <div className="events-grid-footer">
                      {event.location && (
                        <span className="event-detail">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          <span>{event.location}</span>
                        </span>
                      )}
                      <span className="events-grid-cta" aria-hidden="true">
                        View details
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
