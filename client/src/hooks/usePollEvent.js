import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

// Live single poll-event doc. `status` is 'loading' | 'ready' | 'ended' | 'error'.
// 'ended' covers both "never existed" and "was unpublished while open" —
// the public site treats both the same way, no separate 404 state.
export default function usePollEvent(eventId) {
  const [event, setEvent] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, 'pollEvents', eventId),
      (snapshot) => {
        const data = snapshot.data()
        if (!snapshot.exists() || !data.published) {
          setEvent(null)
          setStatus('ended')
          return
        }
        setEvent({
          id: snapshot.id,
          title: String(data.title ?? ''),
          description: data.description ?? null,
        })
        setStatus('ready')
      },
      (err) => {
        console.error('usePollEvent:', err)
        setStatus('error')
      }
    )

    return unsubscribe
  }, [eventId])

  return { event, status }
}
