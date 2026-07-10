import { Link, useParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import PollQuestion from '../components/PollQuestion'
import usePollEvent from '../hooks/usePollEvent'
import usePollsForEvent from '../hooks/usePollsForEvent'
import fallbackPhoto from '../assets/onearth-inspired/community-prayer.jpg'
import '../pages/PageStyles.css'
import '../pages/EventsPage.css'
import './LivePollingPage.css'

export default function PollEventDetailPage() {
  const { eventId } = useParams()
  // Keyed remount on eventId change gives each poll event a clean initial
  // 'loading' state without needing to reset it inside an effect.
  return <PollEventDetail key={eventId} eventId={eventId} />
}

function PollEventDetail({ eventId }) {
  const { event, status } = usePollEvent(eventId)
  const { polls, isLoading: pollsLoading } = usePollsForEvent(eventId)

  if (status === 'loading') {
    return (
      <>
        <PageHero crumbs={[{ label: 'Live Polling', to: '/live-polling' }]} title="Loading poll…" />
        <section className="page-body">
          <div className="container">
            <div className="event-notice">Loading poll details…</div>
          </div>
        </section>
      </>
    )
  }

  if (status === 'ended' || status === 'error') {
    const isError = status === 'error'
    return (
      <>
        <PageHero
          crumbs={[{ label: 'Live Polling', to: '/live-polling' }]}
          title={isError ? 'Something went wrong' : 'This Poll Has Ended'}
          subtitle={
            <>
              {isError
                ? 'We could not load this poll right now. '
                : 'This live poll is no longer active — it may have wrapped up or been removed. '}
              <Link to="/live-polling" style={{ color: 'var(--gold-light)' }}>
                See what&rsquo;s live now
              </Link>
              .
            </>
          }
        />
      </>
    )
  }

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Live Polling', to: '/live-polling' }, { label: event.title }]}
        eyebrow="Live now"
        title={event.title}
        subtitle={event.description || undefined}
        image={fallbackPhoto}
      />

      <section className="page-body">
        <div className="container">
          <div className="page-content poll-event-questions">
            {pollsLoading && <div className="event-notice">Loading questions…</div>}

            {!pollsLoading && polls.length === 0 && (
              <div className="event-notice">Questions for this poll haven&rsquo;t been published yet — check back shortly.</div>
            )}

            {!pollsLoading &&
              polls.map((poll, i) => (
                <Reveal key={poll.id} delay={i * 0.05}>
                  <PollQuestion poll={poll} />
                </Reveal>
              ))}

            <p className="event-detail-back">
              <Link to="/live-polling">&larr; Back to all live polls</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
