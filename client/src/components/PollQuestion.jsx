import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { castVote, changeVote, getVotedOptionId, hasVoted, markVoted } from '../services/polls'

const MotionDiv = motion.div

// Effective voting state from the stored timing fields + current time.
// Mirrors the admin dashboard's pollState. Enforcement is client-side only.
function computeState(poll, now) {
  if (poll.closesAt && now >= poll.closesAt) return 'closed'
  if (poll.votingStatus === 'closed') return 'closed'
  if (poll.opensAt && now < poll.opensAt) return 'notStarted'
  return 'open'
}

function formatRemaining(ms) {
  const total = Math.max(0, Math.ceil(ms / 1000))
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function PollQuestion({ poll }) {
  const [voted, setVoted] = useState(() => hasVoted(poll.id))
  const [chosenId, setChosenId] = useState(() => getVotedOptionId(poll.id))
  const [submitting, setSubmitting] = useState(false)
  const [editing, setEditing] = useState(false)
  const [error, setError] = useState(null)
  const [now, setNow] = useState(() => Date.now())
  const reduceMotion = useReducedMotion()

  // Tick once a second only while a countdown is pending, so the timer can
  // display and the component can auto-flip to "closed" at closesAt with no
  // server write. No interval when the poll has no deadline.
  const hasDeadline = poll.closesAt != null
  useEffect(() => {
    if (!hasDeadline) return
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [hasDeadline, poll.closesAt])

  const state = computeState(poll, now)
  const isOpen = state === 'open'

  // Leaving edit mode automatically once voting closes mid-edit.
  const wasOpen = useRef(isOpen)
  useEffect(() => {
    if (wasOpen.current && !isOpen && editing) setEditing(false)
    wasOpen.current = isOpen
  }, [isOpen, editing])

  async function handleVote(optionId) {
    if (voted || submitting || !isOpen) return
    setSubmitting(true)
    setError(null)
    try {
      await castVote(poll.id, optionId)
      markVoted(poll.id, optionId)
      setChosenId(optionId)
      setVoted(true)
    } catch {
      setError('Your vote could not be counted. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleChange(optionId) {
    if (submitting || !isOpen) return
    if (optionId === chosenId) {
      setEditing(false)
      return
    }
    setSubmitting(true)
    setError(null)
    try {
      await changeVote(poll.id, chosenId, optionId)
      markVoted(poll.id, optionId)
      setChosenId(optionId)
      setEditing(false)
    } catch {
      setError('Your answer could not be changed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const resultsHidden = poll.hideResultsFromVoters
  const showResults = (voted || state === 'closed') && !editing && !resultsHidden
  const remaining = poll.closesAt ? poll.closesAt - now : null
  const urgent = remaining != null && remaining <= 10000

  // Ranked copy for results — highest votes first, ties fall back to display order.
  const ranked = [...poll.options].sort((a, b) => b.votes - a.votes || a.order - b.order)

  return (
    <div className="poll-question">
      <div className="poll-question-head">
        <h3 className="poll-question-title">{poll.question}</h3>
        <div className="poll-head-meta">
          {isOpen && remaining != null && (
            <span
              className={`poll-countdown${urgent ? ' is-urgent' : ''}`}
              aria-label="Voting countdown"
            >
              <span aria-hidden="true">⏳ {formatRemaining(remaining)}</span>
            </span>
          )}
          <span className="poll-vote-count" aria-label={`${poll.totalVotes} votes so far`}>
            <span className="poll-live-dot" aria-hidden="true" />
            {poll.totalVotes} vote{poll.totalVotes === 1 ? '' : 's'}
          </span>
        </div>
      </div>

      {state === 'closed' && (
        <p className="poll-closed-banner" role="status">
          Voting closed &middot; {poll.totalVotes} vote{poll.totalVotes === 1 ? '' : 's'}
        </p>
      )}

      {error && <p className="poll-question-error">{error}</p>}

      {editing ? (
        <>
          <div className="poll-options">
            {poll.options.map((option, i) => (
              <button
                key={option.id}
                type="button"
                className={`poll-option-button${option.id === chosenId ? ' is-current' : ''}`}
                disabled={submitting}
                onClick={() => handleChange(option.id)}
              >
                <span className="poll-option-index" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="poll-option-text">{option.text}</span>
                {option.id === chosenId && <span className="poll-option-current">Current</span>}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="poll-change-button"
            disabled={submitting}
            onClick={() => setEditing(false)}
          >
            Keep my answer
          </button>
        </>
      ) : (voted || state === 'closed') && resultsHidden ? (
        <div className="poll-results-hidden">
          {chosenId ? (
            <div className="poll-options">
              <div className="poll-option-button is-current poll-option-static">
                <span className="poll-option-index" aria-hidden="true">
                  {poll.options.findIndex((o) => o.id === chosenId) + 1}
                </span>
                <span className="poll-option-text">
                  {poll.options.find((o) => o.id === chosenId)?.text}
                </span>
                <span className="poll-option-current">Your answer</span>
              </div>
            </div>
          ) : (
            <p className="poll-question-total">Voting has closed.</p>
          )}
          {voted && isOpen && (
            <button
              type="button"
              className="poll-change-button"
              onClick={() => setEditing(true)}
            >
              Change my answer
            </button>
          )}
        </div>
      ) : !showResults ? (
        <div className="poll-options">
          {state === 'notStarted' && (
            <p className="poll-question-total">Voting opens soon.</p>
          )}
          {poll.options.map((option, i) => (
            <button
              key={option.id}
              type="button"
              className="poll-option-button"
              disabled={submitting || !isOpen}
              onClick={() => handleVote(option.id)}
            >
              <span className="poll-option-index" aria-hidden="true">
                {i + 1}
              </span>
              <span className="poll-option-text">{option.text}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="poll-results">
          {ranked.map((option, i) => {
            const pct = poll.totalVotes > 0 ? Math.round((option.votes / poll.totalVotes) * 100) : 0
            const isLeader = i === 0 && option.votes > 0
            const isChosen = option.id === chosenId

            return (
              <div
                key={option.id}
                className={`poll-result-row${isLeader ? ' is-leader' : ''}${isChosen ? ' is-chosen' : ''}`}
              >
                <div className="poll-result-fill-track">
                  {reduceMotion ? (
                    <div className="poll-result-fill" style={{ width: `${pct}%` }} />
                  ) : (
                    <MotionDiv
                      className="poll-result-fill"
                      initial={false}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </div>
                <span className="poll-result-rank" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="poll-result-text">
                  {option.text}
                  {isChosen && <span className="poll-result-chip">Your vote</span>}
                </span>
                <span className="poll-result-stat">
                  <span className="poll-result-pct">{pct}%</span>
                  <span className="poll-result-votes">
                    {option.votes} vote{option.votes === 1 ? '' : 's'}
                  </span>
                </span>
              </div>
            )
          })}
        </div>
      )}

      {showResults && (
        <div className="poll-question-foot">
          <p className="poll-question-total">
            {poll.totalVotes} vote{poll.totalVotes === 1 ? '' : 's'} &middot;{' '}
            {state === 'closed' ? 'final results' : 'results update live'}
          </p>
          {voted && isOpen && (
            <button
              type="button"
              className="poll-change-button"
              onClick={() => setEditing(true)}
            >
              Change my answer
            </button>
          )}
        </div>
      )}
    </div>
  )
}
