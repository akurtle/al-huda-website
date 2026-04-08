// ========================================
// Firebase Admin SDK Configuration
// ========================================
const admin = require('firebase-admin');

let db = null;
let authAdmin = null;
let isInitialized = false;

/**
 * Initialize Firebase Admin SDK
 * Will gracefully handle missing credentials for development
 */
function initializeFirebase() {
  if (isInitialized) return;

  try {
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT;

    if (serviceAccountPath) {
      const serviceAccount = require(serviceAccountPath);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL
      });
    } else {
      // Try default credentials (for Cloud environments)
      admin.initializeApp({
        credential: admin.credential.applicationDefault()
      });
    }

    db = admin.firestore();
    authAdmin = admin.auth();
    isInitialized = true;
    console.log('✅ Firebase Admin SDK initialized');
  } catch (error) {
    console.warn('⚠️  Firebase Admin SDK not initialized:', error.message);
    console.warn('   Server will run with in-memory storage fallback.');
  }
}

initializeFirebase();

module.exports = {
  admin,
  db,
  auth: authAdmin,
  isInitialized: () => isInitialized
};
