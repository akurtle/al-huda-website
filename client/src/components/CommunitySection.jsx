import { useEffect, useRef, useState } from 'react'
import { fetchUpcomingEvents, formatEventDate, readEventsCache } from '../services/events'
import './CommunitySection.css'

export default function CommunitySection() {
  const cached = useRef(readEventsCache(3)).current
  const [events, setEvents] = useState(cached ?? [])
  const [isLoadingEvents, setIsLoadingEvents] = useState(cached === null)
  const [eventsError, setEventsError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadEvents() {
      try {
        const upcomingEvents = await fetchUpcomingEvents()
        if (isMounted) {
          setEvents(upcomingEvents)
          setEventsError('')
        }
      } catch {
        if (isMounted) {
          setEventsError('Upcoming events will be posted soon.')
        }
      } finally {
        if (isMounted) {
          setIsLoadingEvents(false)
        }
      }
    }

    loadEvents()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="community-section" id="community">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Our Community</span>
          <h2 className="section-title">Voices & Events</h2>
        </div>
        <div className="community-layout">
          <div className="community-testimonials">
            <h3 className="community-sub-heading">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              What People Say
            </h3>
            <div className="testimonial-card">
              <div className="testimonial-quote-mark">"</div>
              <h4>Statement by the Prime Minister on Ramadan</h4>
              <p>
                The Prime Minister, Justin Trudeau, today issued the following statement on Ramadan: 
                "Tomorrow, Muslims in Canada and around the world will mark the start of Ramadan."
              </p>
              <p>
                "One of the five pillars of Islam, this month-long spiritual journey is a time of 
                fasting, charity, and prayer. At the end of each day, families and friends will 
                traditionally gather to enjoy iftar – the meal that breaks their fast at sunset."
              </p>
              <a 
                href="https://pm.gc.ca/en/news/statements/2022/04/01/statement-prime-minister-ramadan"
                target="_blank"
                rel="noopener noreferrer"
                className="testimonial-link"
              >
                Read Full Statement →
              </a>
            </div>
          </div>

          <div className="community-events">
            <h3 className="community-sub-heading">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Upcoming Events
            </h3>
            {isLoadingEvents && (
              <div className="event-card event-card-muted">
                <p className="event-desc">Loading upcoming events...</p>
              </div>
            )}

            {!isLoadingEvents && eventsError && (
              <div className="event-card event-card-muted">
                <p className="event-desc">{eventsError}</p>
              </div>
            )}

            {!isLoadingEvents && !eventsError && events.length === 0 && (
              <div className="event-card event-card-muted">
                <p className="event-desc">Upcoming events will be posted soon.</p>
              </div>
            )}

            {!isLoadingEvents && !eventsError && events.map((event) => (
              <article className="event-card" key={event.id || event.title}>
                {event.assetImagePath && (
                  <img
                    className="event-image"
                    src={event.assetImagePath}
                    alt=""
                    loading="lazy"
                  />
                )}
                <div className="event-badge">{formatEventDate(event.date)}</div>
                <h4>{event.title}</h4>
                {event.description && (
                  <p className="event-desc">{event.description}</p>
                )}
                {event.location && (
                  <div className="event-details">
                    <div className="event-detail">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      <span>{event.location}</span>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
