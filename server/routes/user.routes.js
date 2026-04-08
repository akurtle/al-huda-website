// ========================================
// User Routes
// ========================================
const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { db, isInitialized } = require('../config/firebase');

// In-memory fallback
const inMemoryUsers = [];

/**
 * POST /api/users
 * Create or update a user profile
 */
router.post('/', async (req, res, next) => {
  try {
    const user = new User(req.body);
    const validation = user.validate();

    if (!validation.valid) {
      return res.status(400).json({ success: false, errors: validation.errors });
    }

    if (isInitialized() && db) {
      await db.collection(User.COLLECTION).doc(user.uid).set(user.toJSON(), { merge: true });
      res.json({ success: true, id: user.uid });
    } else {
      const idx = inMemoryUsers.findIndex(u => u.uid === user.uid);
      if (idx >= 0) {
        inMemoryUsers[idx] = { ...inMemoryUsers[idx], ...user.toJSON(), uid: user.uid };
      } else {
        inMemoryUsers.push({ ...user.toJSON(), uid: user.uid });
      }
      res.json({ success: true, id: user.uid, storage: 'memory' });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/users/:uid
 * Get user profile
 */
router.get('/:uid', async (req, res, next) => {
  try {
    const { uid } = req.params;

    if (isInitialized() && db) {
      const doc = await db.collection(User.COLLECTION).doc(uid).get();
      if (!doc.exists) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      res.json({ success: true, data: { id: doc.id, ...doc.data() } });
    } else {
      const user = inMemoryUsers.find(u => u.uid === uid);
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      res.json({ success: true, data: user, storage: 'memory' });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * PATCH /api/users/:uid
 * Update user preferences
 */
router.patch('/:uid', async (req, res, next) => {
  try {
    const { uid } = req.params;
    const updates = req.body;

    if (isInitialized() && db) {
      await db.collection(User.COLLECTION).doc(uid).update({
        ...updates,
        updatedAt: new Date().toISOString()
      });
      res.json({ success: true });
    } else {
      const idx = inMemoryUsers.findIndex(u => u.uid === uid);
      if (idx >= 0) {
        inMemoryUsers[idx] = { ...inMemoryUsers[idx], ...updates };
        res.json({ success: true, storage: 'memory' });
      } else {
        res.status(404).json({ success: false, error: 'User not found' });
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
