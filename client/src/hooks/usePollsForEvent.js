import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '../firebase'

// Live list of the currently-published poll questions belonging to one event.
// Requires a composite index on polls: eventId (asc) + published (asc) + order (asc).
export default function usePollsForEvent(eventId) {
  const [polls, setPolls] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const q = query(
      collection(db, 'polls'),
      where('eventId', '==', eventId),
      where('published', '==', true),
      orderBy('order', 'asc')
    )

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setPolls(
          snapshot.docs.map((d) => {
            const data = d.data()
            const optionsMap = data.options ?? {}
            const options = Object.entries(optionsMap)
              .map(([id, o]) => ({
                id,
                text: String(o?.text ?? ''),
                votes: Number(o?.votes ?? 0),
                order: Number(o?.order ?? 0),
              }))
              .sort((a, b) => a.order - b.order)

            return {
              id: d.id,
              question: String(data.question ?? ''),
              options,
              totalVotes: Number(data.totalVotes ?? 0),
              votingStatus:
                data.votingStatus === 'open' || data.votingStatus === 'closed'
                  ? data.votingStatus
                  : null,
              // Firestore Timestamp → ms epoch (null when unset).
              opensAt: data.opensAt?.toMillis ? data.opensAt.toMillis() : null,
              closesAt: data.closesAt?.toMillis ? data.closesAt.toMillis() : null,
              hideResultsFromVoters: Boolean(data.hideResultsFromVoters),
            }
          })
        )
        setError(null)
        setIsLoading(false)
      },
      (err) => {
        console.error('usePollsForEvent:', err)
        setError(err)
        setIsLoading(false)
      }
    )

    return unsubscribe
  }, [eventId])

  return { polls, isLoading, error }
}
