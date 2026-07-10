import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '../firebase'

// Live list of currently-published poll events for the public /live-polling page.
export default function usePollEvents() {
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const q = query(
      collection(db, 'pollEvents'),
      where('published', '==', true),
      orderBy('createdAt', 'desc')
    )

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setEvents(
          snapshot.docs.map((d) => {
            const data = d.data()
            return {
              id: d.id,
              title: String(data.title ?? ''),
              description: data.description ?? null,
            }
          })
        )
        setError(null)
        setIsLoading(false)
      },
      (err) => {
        console.error('usePollEvents:', err)
        setError(err)
        setIsLoading(false)
      }
    )

    return unsubscribe
  }, [])

  return { events, isLoading, error }
}
