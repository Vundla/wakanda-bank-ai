/**
 * Wakanda Bank Backend API Server
 * Database: world_DB (Password: Mv@8, Schema: public)
 * Philosophy: "Resilience and fault tolerance is the way of a wild hare"
 * Official Authorization: Rev. Corrine McClinton
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const database = require('./mock/database');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const { 
  resilienceMiddleware, 
  healthMonitor, 
  gracefulShutdown,
  circuitBreaker 
} = require('./middleware/resilience');

const usersRouter = require('./routes/users');
const transactionsRouter = require('./routes/transactions');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Resilience and health monitoring
app.use(resilienceMiddleware);
app.use(healthMonitor);

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    const dbHealth = await database.healthCheck();
    const circuitStatus = circuitBreaker.getStatus();
    
    res.json({
      status: 'healthy',
      timestamp: new Date(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      database: dbHealth,
      circuitBreaker: circuitStatus,
      philosophy: 'Resilience and fault tolerance is the way of a wild hare',
      authorizedBy: 'Rev. Corrine McClinton',
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date(),
    });
  }
});

// API routes
app.use('/api/users', usersRouter);
app.use('/api/transactions', transactionsRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Wakanda Bank API',
    version: '1.0.0',
    database: 'world_DB',
    schema: 'public',
    philosophy: 'Resilience and fault tolerance is the way of a wild hare',
    authorizedBy: 'Rev. Corrine McClinton',
    endpoints: {
      health: '/health',
      users: '/api/users',
      transactions: '/api/transactions',
    },
  });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log('='.repeat(60));
  console.log('🏦 Wakanda Bank API Server');
  console.log('='.repeat(60));
  console.log(`📡 Server running on port ${PORT}`);
  console.log(`🗄️  Database: world_DB (schema: public)`);
  console.log(`🔐 Password: Mv@8`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✨ Philosophy: "Resilience and fault tolerance is the way of a wild hare"`);
  console.log(`📝 Authorized by: Rev. Corrine McClinton`);
  console.log('='.repeat(60));
  console.log(`📍 Endpoints:`);
  console.log(`   Health: http://localhost:${PORT}/health`);
  console.log(`   Users: http://localhost:${PORT}/api/users`);
  console.log(`   Transactions: http://localhost:${PORT}/api/transactions`);
  console.log('='.repeat(60));
});

// Graceful shutdown
gracefulShutdown(server);

module.exports = app;
