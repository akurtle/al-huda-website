const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

const EVENTS_CACHE_KEY = 'aic_events_cache'
const EVENT_DOC_CACHE_KEY = 'aic_event_docs_cache'

// Long enough that normal browsing (home → events → a detail page → back) costs
// a single API call, short enough that someone who leaves a tab open still picks
// up a newly published event without a reload.
const CACHE_TTL_MS = 5 * 60 * 1000

// Concurrent callers share one in-flight request instead of each firing their
// own — the home page and navbar can both ask for events on the same tick.
const inFlight = new Map()

function isFresh(cachedAt) {
  return typeof cachedAt === 'number' && Date.now() - cachedAt < CACHE_TTL_MS
}

export function readEventsCache(limit) {
  try {
    const raw = sessionStorage.getItem(EVENTS_CACHE_KEY)
    if (!raw) return null
    const { events, cachedLimit, cachedAt } = JSON.parse(raw)
    if (cachedLimit < limit || !isFresh(cachedAt)) return null
    return events.slice(0, limit)
  } catch {
    return null
  }
}

function writeEventsCache(events, limit) {
  try {
    sessionStorage.setItem(
      EVENTS_CACHE_KEY,
      JSON.stringify({ events, cachedLimit: limit, cachedAt: Date.now() })
    )
  } catch {
    // Storage unavailable (private browsing, quota) — caching is best-effort.
  }
}

// Detail pages reached directly (shared link, refresh) miss the list cache, so
// their single doc is cached separately and survives navigation.
function readEventDocCache(id) {
  try {
    const raw = sessionStorage.getItem(EVENT_DOC_CACHE_KEY)
    if (!raw) return null
    const entry = JSON.parse(raw)[id]
    return entry && isFresh(entry.cachedAt) ? entry.event : null
  } catch {
    return null
  }
}

function writeEventDocCache(id, event) {
  try {
    const raw = sessionStorage.getItem(EVENT_DOC_CACHE_KEY)
    const store = raw ? JSON.parse(raw) : {}
    store[id] = { event, cachedAt: Date.now() }
    sessionStorage.setItem(EVENT_DOC_CACHE_KEY, JSON.stringify(store))
  } catch {
    // Storage unavailable (private browsing, quota) — caching is best-effort.
  }
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

  const pending = inFlight.get(limit)
  if (pending) return pending

  const request = (async () => {
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
  })().finally(() => {
    inFlight.delete(limit)
  })

  inFlight.set(limit, request)
  return request
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
      const { events, cachedAt } = JSON.parse(raw)
      if (isFresh(cachedAt)) {
        const hit = Array.isArray(events) && events.find((event) => event.id === id)
        if (hit) return hit
      }
    }
  } catch {
    // Ignore cache read/parse errors and fall through to a network fetch.
  }

  const cachedDoc = readEventDocCache(id)
  if (cachedDoc) return cachedDoc

  const response = await fetch(`${API_BASE}/api/data/events/${encodeURIComponent(id)}`)

  if (response.status === 404) return null

  if (!response.ok) {
    throw new Error('Unable to load event')
  }

  const result = await response.json()
  const event = result.data ?? null

  if (event) writeEventDocCache(id, event)
  return event
}
