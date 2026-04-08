// ========================================
// Prayer Times Routes
// ========================================
const express = require('express');
const router = express.Router();

const ALADHAN_API = 'https://api.aladhan.com/v1';

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

    const response = await fetch(
      `${ALADHAN_API}/timings/${today}?latitude=${lat}&longitude=${lng}&method=${method}`
    );
    const data = await response.json();

    if (data.code === 200) {
      res.json({
        success: true,
        data: {
          timings: data.data.timings,
          date: data.data.date,
          meta: data.data.meta
        }
      });
    } else {
      throw new Error('Aladhan API returned error');
    }
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

    const response = await fetch(
      `${ALADHAN_API}/calendar/${year}/${month}?latitude=${lat}&longitude=${lng}&method=${method}`
    );
    const data = await response.json();

    if (data.code === 200) {
      res.json({
        success: true,
        data: data.data
      });
    } else {
      throw new Error('Calendar API returned error');
    }
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/prayer/methods
 * Get available calculation methods
 */
router.get('/methods', (req, res) => {
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
