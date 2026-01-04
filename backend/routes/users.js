/**
 * User Routes
 * Database: world_DB (schema: public)
 */

const express = require('express');
const router = express.Router();
const database = require('../mock/database');
const { asyncHandler, AppError } = require('../middleware/errorHandler');

// Input validation helper
const validateUserInput = (data) => {
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    throw new AppError('Name is required and must be a non-empty string', 400);
  }
  if (!data.email || typeof data.email !== 'string' || !data.email.includes('@')) {
    throw new AppError('Valid email is required', 400);
  }
  if (data.balance !== undefined && (typeof data.balance !== 'number' || data.balance < 0)) {
    throw new AppError('Balance must be a non-negative number', 400);
  }
};

// GET /api/users - Get all users
router.get('/', asyncHandler(async (req, res) => {
  const users = await req.withRetry(() => database.getAllUsers());
  res.json({
    success: true,
    count: users.length,
    data: users,
    database: 'world_DB',
    schema: 'public',
  });
}));

// GET /api/users/:id - Get user by ID
router.get('/:id', asyncHandler(async (req, res) => {
  const user = await req.withRetry(() => database.getUserById(req.params.id));
  res.json({
    success: true,
    data: user,
    database: 'world_DB',
    schema: 'public',
  });
}));

// POST /api/users - Create user
router.post('/', asyncHandler(async (req, res) => {
  // Validate input
  validateUserInput(req.body);
  
  const user = await req.withRetry(() => database.createUser(req.body));
  res.status(201).json({
    success: true,
    data: user,
    message: 'User created successfully',
    database: 'world_DB',
    schema: 'public',
  });
}));

// PUT /api/users/:id - Update user
router.put('/:id', asyncHandler(async (req, res) => {
  // Validate input if provided
  if (req.body.name || req.body.email || req.body.balance !== undefined) {
    validateUserInput({ 
      name: req.body.name || 'Valid Name',
      email: req.body.email || 'valid@email.com',
      ...req.body 
    });
  }
  
  const user = await req.withRetry(() => database.updateUser(req.params.id, req.body));
  res.json({
    success: true,
    data: user,
    message: 'User updated successfully',
    database: 'world_DB',
    schema: 'public',
  });
}));

// DELETE /api/users/:id - Delete user
router.delete('/:id', asyncHandler(async (req, res) => {
  const user = await req.withRetry(() => database.deleteUser(req.params.id));
  res.json({
    success: true,
    data: user,
    message: 'User deleted successfully',
    database: 'world_DB',
    schema: 'public',
  });
}));

module.exports = router;
