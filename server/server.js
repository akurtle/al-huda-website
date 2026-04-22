// ========================================
// Express.js Server — Al Huda
// ========================================
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging (dev)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} | ${req.method} ${req.path}`);
  next();
});

// ========================================
// Routes
// ========================================
const prayerRoutes = require('./routes/prayer.routes');
const zakaatRoutes = require('./routes/zakaat.routes');
const userRoutes = require('./routes/user.routes');
const genericRoutes = require('./routes/generic.routes');

app.use('/api/prayer', prayerRoutes);
app.use('/api/zakaat', zakaatRoutes);
app.use('/api/users', userRoutes);
app.use('/api/data', genericRoutes); // Flexible generic CRUD

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

app.listen(PORT, () => {
  console.log(`🕌 Al Huda API running on port ${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
