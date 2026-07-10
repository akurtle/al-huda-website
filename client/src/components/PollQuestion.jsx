import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { castVote, hasVoted, markVoted } from '../services/polls'

export default function PollQuestion({ poll }) {
  const [voted, setVoted] = useState(() => hasVoted(poll.id))
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const reduceMotion = useReducedMotion()

  async function handleVote(optionId) {
    if (voted || submitting) return
    setSubmitting(true)
    setError(null)
    try {
      await castVote(poll.id, optionId)
      markVoted(poll.id)
      setVoted(true)
    } catch {
      setError('Your vote could not be counted. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const showResults = voted

  return (
    <div className="poll-question">
      <h3 className="poll-question-title">{poll.question}</h3>

      {error && <p className="poll-question-error">{error}</p>}

      <div className="poll-options">
        {poll.options.map((option) => {
          const pct = poll.totalVotes > 0 ? Math.round((option.votes / poll.totalVotes) * 100) : 0

          if (!showResults) {
            return (
              <button
                key={option.id}
                type="button"
                className="poll-option-button"
                disabled={submitting}
                onClick={() => handleVote(option.id)}
              >
                {option.text}
              </button>
            )
          }

          return (
            <div key={option.id} className="poll-result-row">
              <div className="poll-result-label">
                <span>{option.text}</span>
                <span className="poll-result-pct">
                  {option.votes} ({pct}%)
                </span>
              </div>
              <div className="poll-result-track">
                {reduceMotion ? (
                  <div className="poll-result-bar" style={{ width: `${pct}%` }} />
                ) : (
                  <motion.div
                    className="poll-result-bar"
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>

      {showResults && (
        <p className="poll-question-total">
          {poll.totalVotes} vote{poll.totalVotes === 1 ? '' : 's'} — thanks for voting
        </p>
      )}
    </div>
  )
}
