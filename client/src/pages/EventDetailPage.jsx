import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { fetchEventById, formatEventDateLong } from '../services/events'
import fallbackPhoto from '../assets/onearth-inspired/community-prayer.jpg'
import '../pages/PageStyles.css'
import './EventsPage.css'

export default function EventDetailPage() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'notfound' | 'error'

  useEffect(() => {
    let isMounted = true

    async function loadEvent() {
      setStatus('loading')
      try {
        const data = await fetchEventById(id)
        if (!isMounted) return
        if (data) {
          setEvent(data)
          setStatus('ready')
        } else {
          setStatus('notfound')
        }
      } catch {
        if (isMounted) setStatus('error')
      }
    }

    loadEvent()

    return () => {
      isMounted = false
    }
  }, [id])

  if (status === 'loading') {
    return (
      <>
        <PageHero crumbs={[{ label: 'Events', to: '/events' }]} title="Loading event…" />
        <section className="page-body">
          <div className="container">
            <div className="event-notice">Loading event details…</div>
          </div>
        </section>
      </>
    )
  }

  if (status === 'notfound' || status === 'error') {
    const isError = status === 'error'
    return (
      <>
        <PageHero
          crumbs={[{ label: 'Events', to: '/events' }]}
          title={isError ? 'Something went wrong' : 'Event Not Found'}
          subtitle={
            <>
              {isError
                ? 'We could not load this event right now. '
                : 'The event you’re looking for doesn’t exist or may have ended. '}
              <Link to="/events" style={{ color: 'var(--gold-light)' }}>Back to all events</Link>.
            </>
          }
        />
      </>
    )
  }

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Events', to: '/events' }, { label: event.title }]}
        eyebrow={formatEventDateLong(event.date)}
        title={event.title}
        subtitle={event.location ? `Location: ${event.location}` : undefined}
        image={event.assetImagePath || fallbackPhoto}
      />

      <section className="page-body">
        <div className="container">
          <div className="page-content">
            <div className="event-detail-meta">
              <div className="event-detail-meta-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <div>
                  <span className="event-detail-meta-label">Date</span>
                  <span className="event-detail-meta-value">{formatEventDateLong(event.date)}</span>
                </div>
              </div>
              {event.time && (
                <div className="event-detail-meta-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <div>
                    <span className="event-detail-meta-label">Time</span>
                    <span className="event-detail-meta-value">{event.time}</span>
                  </div>
                </div>
              )}
              {event.location && (
                <div className="event-detail-meta-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <span className="event-detail-meta-label">Location</span>
                    <span className="event-detail-meta-value">{event.location}</span>
                  </div>
                </div>
              )}
            </div>

            {event.description && (
              <p className="event-detail-lead">{event.description}</p>
            )}

            {event.details && <p>{event.details}</p>}

            {event.registrationUrl && (
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                Register / RSVP
                <span className="btn-arrow" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </span>
              </a>
            )}

            <p className="event-detail-back">
              <Link to="/events">&larr; Back to all events</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
