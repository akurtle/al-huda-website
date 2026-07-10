const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

const EVENTS_CACHE_KEY = 'aic_events_cache'

export function readEventsCache(limit) {
  try {
    const raw = sessionStorage.getItem(EVENTS_CACHE_KEY)
    if (!raw) return null
    const { events, cachedLimit } = JSON.parse(raw)
    if (cachedLimit < limit) return null
    return events.slice(0, limit)
  } catch {
    return null
  }
}

function writeEventsCache(events, limit) {
  try {
    sessionStorage.setItem(EVENTS_CACHE_KEY, JSON.stringify({ events, cachedLimit: limit }))
  } catch {}
}

function toDate(value) {
  if (!value) return null

  if (value instanceof Date) return value

  if (typeof value === 'string' || typeof value === 'number') {
    const parsed = new Date(value)
    return Number.isNaN(parsed.getTime()) ? null : parsed
  }

  if (typeof value === 'object') {
    const seconds = value.seconds ?? value._seconds
    if (typeof seconds === 'number') {
      return new Date(seconds * 1000)
    }
  }

  return null
}

export function formatEventDate(value) {
  const date = toDate(value)
  if (!date) return 'Date TBA'

  return new Intl.DateTimeFormat('en-CA', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export function formatEventDateLong(value) {
  const date = toDate(value)
  if (!date) return 'Date to be announced'

  return new Intl.DateTimeFormat('en-CA', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export async function fetchUpcomingEvents({ limit = 3 } = {}) {
  const cached = readEventsCache(limit)
  if (cached) return cached

  const response = await fetch(
    `${API_BASE}/api/data/events?limit=${limit}&orderBy=date&orderDir=asc`
  )

  if (!response.ok) {
    throw new Error('Unable to load events')
  }

  const result = await response.json()
  const events = Array.isArray(result.data) ? result.data : []

  writeEventsCache(events, limit)
  return events
}

// The full events listing reuses the same fetch/cache path as the home-page
// preview, just with a larger limit.
export async function fetchAllEvents({ limit = 50 } = {}) {
  return fetchUpcomingEvents({ limit })
}

export async function fetchEventById(id) {
  // Serve from the session cache when the event was already loaded by a list
  // view, so navigating from the events page to a detail page is instant.
  try {
    const raw = sessionStorage.getItem(EVENTS_CACHE_KEY)
    if (raw) {
      const { events } = JSON.parse(raw)
      const hit = Array.isArray(events) && events.find((event) => event.id === id)
      if (hit) return hit
    }
  } catch {
    // Ignore cache read/parse errors and fall through to a network fetch.
  }

  const response = await fetch(`${API_BASE}/api/data/events/${encodeURIComponent(id)}`)

  if (response.status === 404) return null

  if (!response.ok) {
    throw new Error('Unable to load event')
  }

  const result = await response.json()
  return result.data ?? null
}
