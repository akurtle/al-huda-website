// ========================================
// In-process TTL cache
// ========================================
// Collapses repeated reads of the same data into a single Firestore / upstream
// call per TTL window. Cloud Run runs several instances and scales to zero, so
// this is a per-instance, best-effort cache — not a shared one. That is enough
// here: every cached endpoint is a read where a few seconds of staleness costs
// nothing, and writes invalidate explicitly.

const entries = new Map(); // key -> { value, expiresAt, staleUntil }
const inFlight = new Map(); // key -> Promise

// Bound on memory. The keyspace is small (a handful of collections, uids and
// coordinate buckets), so this only trips if a caller invents unbounded keys.
const MAX_ENTRIES = 500;

// How long past its TTL an entry may still be served while a refresh runs in
// the background, and as a fallback when the refresh itself fails.
const STALE_GRACE_MS = 10 * 60 * 1000;

const stats = { hits: 0, misses: 0, staleHits: 0, errorFallbacks: 0 };

function sweep() {
  const now = Date.now();
  for (const [key, entry] of entries) {
    if (entry.staleUntil <= now) entries.delete(key);
  }
}

function store(key, value, ttlMs) {
  const now = Date.now();
  if (entries.size >= MAX_ENTRIES && !entries.has(key)) sweep();
  if (entries.size < MAX_ENTRIES || entries.has(key)) {
    entries.set(key, { value, expiresAt: now + ttlMs, staleUntil: now + ttlMs + STALE_GRACE_MS });
  }
}

// Concurrent misses on the same key share one `produce()` call, so a burst of
// traffic against a cold cache still costs exactly one read.
function refresh(key, ttlMs, produce) {
  const pending = inFlight.get(key);
  if (pending) return pending;

  const promise = (async () => {
    const value = await produce();
    store(key, value, ttlMs);
    return value;
  })().finally(() => {
    inFlight.delete(key);
  });

  inFlight.set(key, promise);
  return promise;
}

/**
 * Return the cached value for `key`, or call `produce()` and cache its result.
 *
 * Past the TTL the stale value is served immediately while a single refresh
 * runs in the background, so an expiring entry never makes a user wait and
 * never lets a burst of requests through to Firestore at once. If that refresh
 * fails, the stale value keeps being served — a Firestore blip degrades to
 * slightly old data rather than a 500.
 */
async function cached(key, ttlMs, produce) {
  const hit = entries.get(key);
  const now = Date.now();

  if (hit && hit.expiresAt > now) {
    stats.hits++;
    return hit.value;
  }

  if (hit && hit.staleUntil > now) {
    stats.staleHits++;
    // Background refresh; failures are swallowed because we already have a
    // value to return and the next request will try again.
    refresh(key, ttlMs, produce).catch((error) => {
      console.warn(`Cache refresh failed for ${key}:`, error.message);
    });
    return hit.value;
  }

  stats.misses++;
  try {
    return await refresh(key, ttlMs, produce);
  } catch (error) {
    if (hit) {
      stats.errorFallbacks++;
      console.warn(`Serving expired cache for ${key} after error:`, error.message);
      return hit.value;
    }
    throw error;
  }
}

/**
 * Drop every cached entry whose key starts with `prefix`.
 * Called after a write so the next read reflects it immediately.
 */
function invalidatePrefix(prefix) {
  for (const key of entries.keys()) {
    if (key.startsWith(prefix)) entries.delete(key);
  }
}

/** Hit-rate counters, surfaced on /api/health to confirm the cache is working. */
function cacheStats() {
  const total = stats.hits + stats.staleHits + stats.misses;
  return {
    ...stats,
    entries: entries.size,
    hitRate: total ? Number(((stats.hits + stats.staleHits) / total).toFixed(3)) : null,
  };
}

module.exports = { cached, invalidatePrefix, cacheStats };
