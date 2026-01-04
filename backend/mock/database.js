/**
 * Mock world_DB Database
 * Schema: public
 * Password: Mv@8
 * Philosophy: "All database belong to the world" - public schema design
 */

// Mock database state
const mockDB = {
  world_DB: {
    schema: 'public',
    password: 'Mv@8',
    users: [
      {
        id: 1,
        name: 'T\'Challa',
        email: 'tchalla@wakanda.gov',
        balance: 10000000,
        accountType: 'Royal',
        createdAt: new Date('2024-01-01'),
      },
      {
        id: 2,
        name: 'Shuri',
        email: 'shuri@wakanda.tech',
        balance: 5000000,
        accountType: 'Technology',
        createdAt: new Date('2024-01-15'),
      },
      {
        id: 3,
        name: 'Okoye',
        email: 'okoye@wakanda.mil',
        balance: 2500000,
        accountType: 'Defense',
        createdAt: new Date('2024-02-01'),
      },
    ],
    transactions: [
      {
        id: 1,
        userId: 1,
        type: 'deposit',
        amount: 1000000,
        description: 'Vibranium export revenue',
        timestamp: new Date('2024-01-05'),
        status: 'completed',
      },
      {
        id: 2,
        userId: 2,
        type: 'withdrawal',
        amount: 500000,
        description: 'Research equipment purchase',
        timestamp: new Date('2024-01-20'),
        status: 'completed',
      },
      {
        id: 3,
        userId: 1,
        type: 'transfer',
        amount: 250000,
        description: 'Transfer to Shuri',
        timestamp: new Date('2024-02-10'),
        status: 'completed',
      },
      {
        id: 4,
        userId: 3,
        type: 'deposit',
        amount: 500000,
        description: 'Military budget allocation',
        timestamp: new Date('2024-02-15'),
        status: 'completed',
      },
    ],
  },
};

// Auto-increment counters
let userIdCounter = 4;
let transactionIdCounter = 5;

// Database operations with retry logic (resilience pattern)
class MockDatabase {
  constructor() {
    this.db = mockDB.world_DB;
    this.retryAttempts = 3;
    this.retryDelay = 100;
  }

  // Simulate retry logic for resilience
  async executeWithRetry(operation, context = 'operation') {
    let lastError;
    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        if (attempt < this.retryAttempts) {
          await new Promise(resolve => setTimeout(resolve, this.retryDelay * attempt));
        }
      }
    }
    throw new Error(`${context} failed after ${this.retryAttempts} attempts: ${lastError.message}`);
  }

  // User operations
  async getAllUsers() {
    return this.executeWithRetry(() => {
      return [...this.db.users];
    }, 'Get all users');
  }

  async getUserById(id) {
    return this.executeWithRetry(() => {
      const user = this.db.users.find(u => u.id === parseInt(id));
      if (!user) {
        throw new Error('User not found');
      }
      return { ...user };
    }, `Get user ${id}`);
  }

  async createUser(userData) {
    return this.executeWithRetry(() => {
      const newUser = {
        id: userIdCounter++,
        name: userData.name,
        email: userData.email,
        balance: userData.balance || 0,
        accountType: userData.accountType || 'Standard',
        createdAt: new Date(),
      };
      this.db.users.push(newUser);
      return { ...newUser };
    }, 'Create user');
  }

  async updateUser(id, userData) {
    return this.executeWithRetry(() => {
      const index = this.db.users.findIndex(u => u.id === parseInt(id));
      if (index === -1) {
        throw new Error('User not found');
      }
      this.db.users[index] = {
        ...this.db.users[index],
        ...userData,
        id: parseInt(id),
      };
      return { ...this.db.users[index] };
    }, `Update user ${id}`);
  }

  async deleteUser(id) {
    return this.executeWithRetry(() => {
      const index = this.db.users.findIndex(u => u.id === parseInt(id));
      if (index === -1) {
        throw new Error('User not found');
      }
      const deletedUser = this.db.users.splice(index, 1)[0];
      return { ...deletedUser };
    }, `Delete user ${id}`);
  }

  // Transaction operations
  async getAllTransactions() {
    return this.executeWithRetry(() => {
      return [...this.db.transactions];
    }, 'Get all transactions');
  }

  async getTransactionsByUserId(userId) {
    return this.executeWithRetry(() => {
      return this.db.transactions.filter(t => t.userId === parseInt(userId));
    }, `Get transactions for user ${userId}`);
  }

  async createTransaction(transactionData) {
    return this.executeWithRetry(() => {
      const newTransaction = {
        id: transactionIdCounter++,
        userId: transactionData.userId,
        type: transactionData.type,
        amount: transactionData.amount,
        description: transactionData.description || '',
        timestamp: new Date(),
        status: 'completed',
      };
      this.db.transactions.push(newTransaction);
      return { ...newTransaction };
    }, 'Create transaction');
  }

  // Health check
  async healthCheck() {
    return {
      status: 'healthy',
      database: 'world_DB',
      schema: this.db.schema,
      timestamp: new Date(),
      philosophy: 'Resilience and fault tolerance is the way of a wild hare',
    };
  }
}

// Export singleton instance
module.exports = new MockDatabase();
