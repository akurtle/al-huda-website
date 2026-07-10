import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { castVote, getVotedOptionId, hasVoted, markVoted } from '../services/polls'

const MotionDiv = motion.div

export default function PollQuestion({ poll }) {
  const [voted, setVoted] = useState(() => hasVoted(poll.id))
  const [chosenId, setChosenId] = useState(() => getVotedOptionId(poll.id))
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const reduceMotion = useReducedMotion()

  async function handleVote(optionId) {
    if (voted || submitting) return
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

  const showResults = voted

  // Ranked copy for results — highest votes first, ties fall back to display order.
  const ranked = [...poll.options].sort((a, b) => b.votes - a.votes || a.order - b.order)

  return (
    <div className="poll-question">
      <div className="poll-question-head">
        <h3 className="poll-question-title">{poll.question}</h3>
        <span className="poll-vote-count" aria-label={`${poll.totalVotes} votes so far`}>
          <span className="poll-live-dot" aria-hidden="true" />
          {poll.totalVotes} vote{poll.totalVotes === 1 ? '' : 's'}
        </span>
      </div>

      {error && <p className="poll-question-error">{error}</p>}

      {!showResults ? (
        <div className="poll-options">
          {poll.options.map((option, i) => (
            <button
              key={option.id}
              type="button"
              className="poll-option-button"
              disabled={submitting}
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
        <p className="poll-question-total">
          {poll.totalVotes} vote{poll.totalVotes === 1 ? '' : 's'} &middot; results update live
        </p>
      )}
    </div>
  )
}
