const API_BASE = 'https://api.aladhan.com/v1'

/**
 * Get user's current location coordinates
 */
export async function getUserLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ lat: 40.7128, lng: -74.006 })
      return
    }
    navigator.geolocation.getCurrentPosition(
      pos => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => resolve({ lat: 40.7128, lng: -74.006 }),
      { timeout: 10000, maximumAge: 300000 }
    )
  })
}

/**
 * Reverse geocode coordinates to city
 */
export async function reverseGeocode(lat, lng) {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    )
    const data = await res.json()
    return { city: data.city || data.locality || 'Unknown City', country: data.countryCode || 'US' }
  } catch {
    return { city: 'Unknown', country: 'US' }
  }
}

/**
 * Format 24h time to 12h
 */
function formatTime(time24) {
  if (!time24) return '--:--'
  const clean = time24.split(' ')[0]
  const [h, m] = clean.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 || 12
  return `${h12}:${String(m).padStart(2, '0')} ${period}`
}

function parseTimeToDate(time24) {
  const clean = time24.split(' ')[0]
  const [h, m] = clean.split(':').map(Number)
  const d = new Date()
  d.setHours(h, m, 0, 0)
  return d
}

/**
 * Fetch prayer times from Aladhan API
 */
export async function fetchPrayerTimes(lat, lng, method = 2) {
  const d = new Date()
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()

  try {
    const res = await fetch(
      `${API_BASE}/timings/${dd}-${mm}-${yyyy}?latitude=${lat}&longitude=${lng}&method=${method}`
    )
    const data = await res.json()

    if (data.code === 200) {
      const t = data.data.timings
      const hijri = data.data.date.hijri
      const greg = data.data.date.gregorian

      return {
        times: {
          fajr: formatTime(t.Fajr), sunrise: formatTime(t.Sunrise),
          dhuhr: formatTime(t.Dhuhr), asr: formatTime(t.Asr),
          maghrib: formatTime(t.Maghrib), isha: formatTime(t.Isha)
        },
        timesRaw: {
          fajr: t.Fajr, sunrise: t.Sunrise, dhuhr: t.Dhuhr,
          asr: t.Asr, maghrib: t.Maghrib, isha: t.Isha
        },
        hijri: `${hijri.day} ${hijri.month.en} ${hijri.year}`,
        gregorian: `${greg.month.en} ${greg.day}, ${greg.year}`
      }
    }
    throw new Error('API error')
  } catch {
    return fallbackTimes()
  }
}

function fallbackTimes() {
  return {
    times: {
      fajr: '5:15 AM', sunrise: '6:45 AM', dhuhr: '12:30 PM',
      asr: '4:00 PM', maghrib: '7:15 PM', isha: '8:45 PM'
    },
    timesRaw: {
      fajr: '05:15', sunrise: '06:45', dhuhr: '12:30',
      asr: '16:00', maghrib: '19:15', isha: '20:45'
    },
    hijri: '-- --- ----',
    gregorian: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }
}

/**
 * Get the next prayer based on current time
 */
export function getNextPrayer(timesRaw) {
  const now = new Date()
  const prayers = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha']
  const labels = { fajr: 'Fajr', sunrise: 'Sunrise', dhuhr: 'Dhuhr', asr: 'Asr', maghrib: 'Maghrib', isha: 'Isha' }

  for (const p of prayers) {
    const pt = parseTimeToDate(timesRaw[p])
    if (pt > now) {
      const diff = pt - now
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      return {
        name: labels[p], key: p,
        time: formatTime(timesRaw[p]),
        countdown: hours > 0 ? `in ${hours}h ${mins}m` : `in ${mins}m`
      }
    }
  }

  return { name: 'Fajr', key: 'fajr', time: formatTime(timesRaw.fajr), countdown: 'Tomorrow' }
}
