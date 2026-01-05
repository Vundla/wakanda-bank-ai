/**
 * API Service with Resilience Features
 * Retry logic and error handling
 */

import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance with defaults
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Retry logic for resilience
const retryRequest = async (fn, maxRetries = 3, delay = 1000) => {
  let lastError;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }
  }
  throw lastError;
};

// API methods
const api = {
  // Health check
  health: async () => {
    return retryRequest(() => apiClient.get('/health'));
  },

  // Users
  users: {
    getAll: async () => {
      return retryRequest(() => apiClient.get('/api/users'));
    },
    getById: async (id) => {
      return retryRequest(() => apiClient.get(`/api/users/${id}`));
    },
    create: async (userData) => {
      return retryRequest(() => apiClient.post('/api/users', userData));
    },
    update: async (id, userData) => {
      return retryRequest(() => apiClient.put(`/api/users/${id}`, userData));
    },
    delete: async (id) => {
      return retryRequest(() => apiClient.delete(`/api/users/${id}`));
    },
  },

  // Transactions
  transactions: {
    getAll: async (userId = null) => {
      const url = userId ? `/api/transactions?userId=${userId}` : '/api/transactions';
      return retryRequest(() => apiClient.get(url));
    },
    create: async (transactionData) => {
      return retryRequest(() => apiClient.post('/api/transactions', transactionData));
    },
  },
};

export default api;
