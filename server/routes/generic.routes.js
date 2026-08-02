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
const { cached, invalidatePrefix } = require('../lib/cache');

// How long a read may be served from cache. Content here (events, etc.) is
// edited rarely and read constantly, and every write below invalidates its own
// collection, so the TTL only bounds staleness from out-of-band edits made
// straight in the Firebase console.
const READ_TTL_MS = Number(process.env.DATA_CACHE_TTL_MS || 60_000);

// Every list request fetches at least this many docs and slices down to the
// requested limit. The home page asks for 3 and the events page for 50; sharing
// one cache entry makes those cost 50 reads per TTL window instead of 53 per
// visitor.
const LIST_FETCH_FLOOR = 50;

// In-memory fallback
const inMemoryCollections = {};

function getMemCollection(name) {
  if (!inMemoryCollections[name]) {
    inMemoryCollections[name] = [];
  }
  return inMemoryCollections[name];
}

// Let browsers and any shared cache in front of Cloud Run reuse a response
// without hitting the API at all. `cors` sets `Vary: Origin`, so per-origin
// CORS headers stay correct in shared caches.
function setReadCacheHeaders(res) {
  const seconds = Math.max(1, Math.round(READ_TTL_MS / 1000));
  res.set('Cache-Control', `public, max-age=${seconds}, stale-while-revalidate=${seconds * 5}`);
}

// Called after any write so the next read reflects it without waiting out the TTL.
function invalidateCollection(collection) {
  invalidatePrefix(`data:${collection}:`);
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
      const requested = parseInt(limit);
      const fetchLimit = Math.max(requested, LIST_FETCH_FLOOR);
      const key = `data:${collection}:list:${orderBy}:${orderDir}:${fetchLimit}`;

      const all = await cached(key, READ_TTL_MS, async () => {
        const snapshot = await db.collection(collection)
          .orderBy(orderBy, orderDir)
          .limit(fetchLimit)
          .get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      });

      const docs = all.slice(0, requested);
      setReadCacheHeaders(res);
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
      // Misses are cached as null too, so a crawler or a stale link hammering a
      // deleted id costs one read per TTL window rather than one per request.
      const data = await cached(`data:${collection}:doc:${id}`, READ_TTL_MS, async () => {
        const doc = await db.collection(collection).doc(id).get();
        return doc.exists ? { id: doc.id, ...doc.data() } : null;
      });

      if (!data) {
        return res.status(404).json({ success: false, error: 'Document not found' });
      }
      setReadCacheHeaders(res);
      res.json({ success: true, data });
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
      invalidateCollection(collection);
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
      invalidateCollection(collection);
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
      invalidateCollection(collection);
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
