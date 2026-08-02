// ========================================
// Prayer Times Routes
// ========================================
const express = require('express');
const router = express.Router();
const { cached } = require('../lib/cache');

const ALADHAN_API = 'https://api.aladhan.com/v1';

// Prayer times for a given day and place are fixed once computed, so these are
// cached aggressively — the TTL exists only to bound how long a stale day's
// entry lingers, not because the answer changes.
const TIMES_TTL_MS = 6 * 60 * 60 * 1000;
const CALENDAR_TTL_MS = 24 * 60 * 60 * 1000;

// Coordinates are bucketed to ~1.1 km before both the cache key and the upstream
// request. Prayer times shift by under a few seconds across that distance, and
// it turns every visitor in the same neighbourhood into one cache entry instead
// of one per GPS reading.
function bucketCoord(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num.toFixed(2) : value;
}

function setPrayerCacheHeaders(res, ttlMs) {
  res.set('Cache-Control', `public, max-age=${Math.round(ttlMs / 1000)}`);
}

/**
 * GET /api/prayer/times
 * Get prayer times for coordinates
 * Query: lat, lng, method (default 2 = ISNA), date (DD-MM-YYYY)
 */
router.get('/times', async (req, res, next) => {
  try {
    const {
      lat = 40.7128,
      lng = -74.006,
      method = 2,
      date
    } = req.query;

    const today = date || (() => {
      const d = new Date();
      return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
    })();

    const latKey = bucketCoord(lat);
    const lngKey = bucketCoord(lng);

    const payload = await cached(
      `prayer:times:${today}:${latKey}:${lngKey}:${method}`,
      TIMES_TTL_MS,
      async () => {
        const response = await fetch(
          `${ALADHAN_API}/timings/${today}?latitude=${latKey}&longitude=${lngKey}&method=${method}`
        );
        const data = await response.json();

        if (data.code !== 200) {
          throw new Error('Aladhan API returned error');
        }

        return {
          timings: data.data.timings,
          date: data.data.date,
          meta: data.data.meta
        };
      }
    );

    setPrayerCacheHeaders(res, TIMES_TTL_MS);
    res.json({ success: true, data: payload });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/prayer/calendar
 * Get prayer times for a full month
 * Query: lat, lng, method, month, year
 */
router.get('/calendar', async (req, res, next) => {
  try {
    const {
      lat = 40.7128,
      lng = -74.006,
      method = 2,
      month = new Date().getMonth() + 1,
      year = new Date().getFullYear()
    } = req.query;

    const latKey = bucketCoord(lat);
    const lngKey = bucketCoord(lng);

    const payload = await cached(
      `prayer:calendar:${year}:${month}:${latKey}:${lngKey}:${method}`,
      CALENDAR_TTL_MS,
      async () => {
        const response = await fetch(
          `${ALADHAN_API}/calendar/${year}/${month}?latitude=${latKey}&longitude=${lngKey}&method=${method}`
        );
        const data = await response.json();

        if (data.code !== 200) {
          throw new Error('Calendar API returned error');
        }

        return data.data;
      }
    );

    setPrayerCacheHeaders(res, CALENDAR_TTL_MS);
    res.json({ success: true, data: payload });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/prayer/methods
 * Get available calculation methods
 */
router.get('/methods', (req, res) => {
  // A hardcoded constant — safe to cache for a day.
  res.set('Cache-Control', 'public, max-age=86400');
  res.json({
    success: true,
    data: {
      1: 'University of Islamic Sciences, Karachi',
      2: 'Islamic Society of North America (ISNA)',
      3: 'Muslim World League',
      4: 'Umm Al-Qura University, Makkah',
      5: 'Egyptian General Authority of Survey',
      7: 'Institute of Geophysics, University of Tehran',
      8: 'Gulf Region',
      9: 'Kuwait',
      10: 'Qatar',
      11: 'Majlis Ugama Islam Singapura',
      12: 'Union Organization Islamic de France',
      13: 'Diyanet İşleri Başkanlığı, Turkey',
      14: 'Spiritual Administration of Muslims of Russia',
      15: 'Moonsighting Committee Worldwide'
    }
  });
});

module.exports = router;
