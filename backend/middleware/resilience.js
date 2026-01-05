/**
 * Resilience & Fault Tolerance Middleware
 * Philosophy: "Resilience and fault tolerance is the way of a wild hare"
 */

// Circuit breaker implementation
class CircuitBreaker {
  constructor(threshold = 5, timeout = 60000) {
    this.failureCount = 0;
    this.threshold = threshold;
    this.timeout = timeout;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.nextAttempt = Date.now();
  }

  async execute(operation) {
    if (this.state === 'OPEN') {
      if (Date.now() < this.nextAttempt) {
        throw new Error('Circuit breaker is OPEN - service temporarily unavailable');
      }
      this.state = 'HALF_OPEN';
    }

    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }

  onFailure() {
    this.failureCount++;
    if (this.failureCount >= this.threshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.timeout;
    }
  }

  getStatus() {
    return {
      state: this.state,
      failureCount: this.failureCount,
      threshold: this.threshold,
      nextAttempt: this.state === 'OPEN' ? new Date(this.nextAttempt) : null,
    };
  }
}

// Global circuit breaker instance
const circuitBreaker = new CircuitBreaker();

// Resilience middleware with retry logic
const resilienceMiddleware = (req, res, next) => {
  // Add circuit breaker to request
  req.circuitBreaker = circuitBreaker;
  
  // Add retry helper to request
  req.withRetry = async (operation, maxRetries = 3, delay = 100) => {
    let lastError;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await circuitBreaker.execute(operation);
      } catch (error) {
        lastError = error;
        if (attempt < maxRetries && error.message !== 'Circuit breaker is OPEN - service temporarily unavailable') {
          await new Promise(resolve => setTimeout(resolve, delay * attempt));
        }
      }
    }
    throw lastError;
  };

  next();
};

// Health monitoring middleware
const healthMonitor = (req, res, next) => {
  // Track request start time
  req.startTime = Date.now();
  
  // Add response time tracking
  const originalSend = res.send;
  res.send = function(data) {
    res.responseTime = Date.now() - req.startTime;
    originalSend.apply(res, arguments);
  };
  
  next();
};

// Graceful shutdown handler
const gracefulShutdown = (server) => {
  const shutdown = (signal) => {
    console.log(`\n${signal} received. Starting graceful shutdown...`);
    
    server.close(() => {
      console.log('HTTP server closed');
      process.exit(0);
    });

    // Force shutdown after 30 seconds
    setTimeout(() => {
      console.error('Forced shutdown after timeout');
      process.exit(1);
    }, 30000);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
};

module.exports = {
  CircuitBreaker,
  circuitBreaker,
  resilienceMiddleware,
  healthMonitor,
  gracefulShutdown,
};
