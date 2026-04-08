// ========================================
// Zakaat Routes
// ========================================
const express = require('express');
const router = express.Router();
const { ZakaatCalculation } = require('../models');
const { db, isInitialized } = require('../config/firebase');

// In-memory fallback storage
const inMemoryStore = [];

/**
 * POST /api/zakaat/calculate
 * Calculate zakaat from provided assets and liabilities
 */
router.post('/calculate', (req, res) => {
  try {
    const { assets, liabilities, nisab } = req.body;

    const calc = new ZakaatCalculation({ assets, liabilities });
    calc.calculate(nisab || 490);

    const validation = calc.validate();
    if (!validation.valid) {
      return res.status(400).json({ success: false, errors: validation.errors });
    }

    res.json({
      success: true,
      data: {
        totalAssets: calc.totalAssets,
        totalLiabilities: calc.totalLiabilities,
        netWealth: calc.netWealth,
        nisabThreshold: calc.nisabThreshold,
        isEligible: calc.isEligible,
        zakaatAmount: calc.zakaatAmount,
        zakaatRate: 0.025
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/zakaat/save
 * Save a zakaat calculation
 */
router.post('/save', async (req, res, next) => {
  try {
    const calc = new ZakaatCalculation(req.body);
    calc.calculate(req.body.nisab || 490);

    if (isInitialized() && db) {
      const docRef = await db.collection(ZakaatCalculation.COLLECTION).add(calc.toJSON());
      res.json({ success: true, id: docRef.id, data: calc.toJSON() });
    } else {
      // In-memory fallback
      const id = `local_${Date.now()}`;
      inMemoryStore.push({ id, ...calc.toJSON() });
      res.json({ success: true, id, data: calc.toJSON(), storage: 'memory' });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/zakaat/history/:userId
 * Get calculation history for a user
 */
router.get('/history/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (isInitialized() && db) {
      const snapshot = await db.collection(ZakaatCalculation.COLLECTION)
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .limit(20)
        .get();

      const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json({ success: true, data: results });
    } else {
      const results = inMemoryStore.filter(item => item.userId === userId);
      res.json({ success: true, data: results, storage: 'memory' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
