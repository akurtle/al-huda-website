// ========================================
// Generic CRUD Routes
// ========================================
// Flexible routes for any collection. 
// Use these when you need quick CRUD without dedicated routes.
// URL pattern: /api/data/:collection
const express = require('express');
const router = express.Router();
const { db, isInitialized } = require('../config/firebase');
const { ModelRegistry } = require('../models');

// In-memory fallback
const inMemoryCollections = {};

function getMemCollection(name) {
  if (!inMemoryCollections[name]) {
    inMemoryCollections[name] = [];
  }
  return inMemoryCollections[name];
}

/**
 * GET /api/data/:collection
 * List documents in a collection
 * Query: limit, orderBy, orderDir
 */
router.get('/:collection', async (req, res, next) => {
  try {
    const { collection } = req.params;
    const { limit = 50, orderBy = 'createdAt', orderDir = 'desc' } = req.query;

    if (isInitialized() && db) {
      let ref = db.collection(collection)
        .orderBy(orderBy, orderDir)
        .limit(parseInt(limit));

      const snapshot = await ref.get();
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json({ success: true, data: docs, count: docs.length });
    } else {
      const docs = getMemCollection(collection).slice(0, parseInt(limit));
      res.json({ success: true, data: docs, count: docs.length, storage: 'memory' });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/data/:collection/:id
 * Get a single document
 */
router.get('/:collection/:id', async (req, res, next) => {
  try {
    const { collection, id } = req.params;

    if (isInitialized() && db) {
      const doc = await db.collection(collection).doc(id).get();
      if (!doc.exists) {
        return res.status(404).json({ success: false, error: 'Document not found' });
      }
      res.json({ success: true, data: { id: doc.id, ...doc.data() } });
    } else {
      const doc = getMemCollection(collection).find(d => d.id === id);
      if (!doc) {
        return res.status(404).json({ success: false, error: 'Document not found' });
      }
      res.json({ success: true, data: doc, storage: 'memory' });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/data/:collection
 * Create a document
 */
router.post('/:collection', async (req, res, next) => {
  try {
    const { collection } = req.params;
    const data = {
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Validate if model exists
    const Model = ModelRegistry.getModel(collection);
    if (Model) {
      const instance = new Model(data);
      const validation = instance.validate();
      if (!validation.valid) {
        return res.status(400).json({ success: false, errors: validation.errors });
      }
    }

    if (isInitialized() && db) {
      const docRef = await db.collection(collection).add(data);
      res.status(201).json({ success: true, id: docRef.id, data });
    } else {
      const id = `mem_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      const doc = { id, ...data };
      getMemCollection(collection).push(doc);
      res.status(201).json({ success: true, id, data: doc, storage: 'memory' });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * PATCH /api/data/:collection/:id
 * Update a document
 */
router.patch('/:collection/:id', async (req, res, next) => {
  try {
    const { collection, id } = req.params;
    const updates = { ...req.body, updatedAt: new Date().toISOString() };

    if (isInitialized() && db) {
      await db.collection(collection).doc(id).update(updates);
      res.json({ success: true });
    } else {
      const col = getMemCollection(collection);
      const idx = col.findIndex(d => d.id === id);
      if (idx >= 0) {
        col[idx] = { ...col[idx], ...updates };
        res.json({ success: true, storage: 'memory' });
      } else {
        res.status(404).json({ success: false, error: 'Document not found' });
      }
    }
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/data/:collection/:id
 * Delete a document
 */
router.delete('/:collection/:id', async (req, res, next) => {
  try {
    const { collection, id } = req.params;

    if (isInitialized() && db) {
      await db.collection(collection).doc(id).delete();
      res.json({ success: true });
    } else {
      const col = getMemCollection(collection);
      const idx = col.findIndex(d => d.id === id);
      if (idx >= 0) {
        col.splice(idx, 1);
        res.json({ success: true, storage: 'memory' });
      } else {
        res.status(404).json({ success: false, error: 'Document not found' });
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
