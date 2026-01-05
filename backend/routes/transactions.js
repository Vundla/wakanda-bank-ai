/**
 * Transaction Routes
 * Database: world_DB (schema: public)
 */

const express = require('express');
const router = express.Router();
const database = require('../mock/database');
const { asyncHandler, AppError } = require('../middleware/errorHandler');

// Input validation helper
const validateTransactionInput = (data) => {
  if (!data.userId || typeof data.userId !== 'number') {
    throw new AppError('Valid userId is required', 400);
  }
  if (!data.type || !['deposit', 'withdrawal', 'transfer'].includes(data.type)) {
    throw new AppError('Transaction type must be deposit, withdrawal, or transfer', 400);
  }
  if (!data.amount || typeof data.amount !== 'number' || data.amount <= 0) {
    throw new AppError('Amount must be a positive number', 400);
  }
};

// GET /api/transactions - Get all transactions
router.get('/', asyncHandler(async (req, res) => {
  const { userId } = req.query;
  
  let transactions;
  if (userId) {
    transactions = await req.withRetry(() => database.getTransactionsByUserId(userId));
  } else {
    transactions = await req.withRetry(() => database.getAllTransactions());
  }
  
  res.json({
    success: true,
    count: transactions.length,
    data: transactions,
    database: 'world_DB',
    schema: 'public',
  });
}));

// POST /api/transactions - Create transaction
router.post('/', asyncHandler(async (req, res) => {
  // Validate input
  validateTransactionInput(req.body);
  
  const transaction = await req.withRetry(() => database.createTransaction(req.body));
  res.status(201).json({
    success: true,
    data: transaction,
    message: 'Transaction created successfully',
    database: 'world_DB',
    schema: 'public',
  });
}));

module.exports = router;
