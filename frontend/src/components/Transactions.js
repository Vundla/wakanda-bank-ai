/**
 * Transactions Component
 * Database: world_DB (schema: public)
 */

import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.transactions.getAll();
      setTransactions(response.data.data);
    } catch (err) {
      setError(err.message || 'Failed to load transactions');
      console.error('Error loading transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'deposit': return '💰';
      case 'withdrawal': return '💸';
      case 'transfer': return '🔄';
      default: return '📝';
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'deposit': return '#4caf50';
      case 'withdrawal': return '#f44336';
      case 'transfer': return '#2196f3';
      default: return '#666';
    }
  };

  if (loading) {
    return <div style={styles.loading}>⏳ Loading transactions...</div>;
  }

  if (error) {
    return (
      <div style={styles.error}>
        <p>❌ {error}</p>
        <button onClick={loadTransactions} style={styles.retryButton}>🔄 Retry</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>💳 Transactions ({transactions.length})</h2>
        <button onClick={loadTransactions} style={styles.refreshButton}>
          🔄 Refresh
        </button>
      </div>

      <div style={styles.transactionList}>
        {transactions.map(transaction => (
          <div key={transaction.id} style={styles.transactionCard}>
            <div style={styles.transactionIcon}>
              {getTransactionIcon(transaction.type)}
            </div>
            <div style={styles.transactionInfo}>
              <div style={styles.transactionHeader}>
                <span style={{
                  ...styles.transactionType,
                  color: getTransactionColor(transaction.type)
                }}>
                  {transaction.type.toUpperCase()}
                </span>
                <span style={styles.transactionAmount}>
                  ${transaction.amount.toLocaleString()}
                </span>
              </div>
              <p style={styles.transactionDescription}>
                {transaction.description}
              </p>
              <div style={styles.transactionFooter}>
                <span style={styles.transactionDate}>
                  {new Date(transaction.timestamp).toLocaleDateString()}
                </span>
                <span style={styles.transactionStatus}>
                  {transaction.status === 'completed' ? '✅' : '⏳'} {transaction.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginBottom: '30px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    color: '#333',
  },
  refreshButton: {
    padding: '10px 20px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  transactionList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  transactionCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    gap: '15px',
  },
  transactionIcon: {
    fontSize: '32px',
    display: 'flex',
    alignItems: 'center',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  transactionType: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
  transactionAmount: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
  },
  transactionDescription: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '10px',
  },
  transactionFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: '#999',
  },
  transactionDate: {},
  transactionStatus: {
    textTransform: 'capitalize',
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '18px',
    color: '#666',
  },
  error: {
    textAlign: 'center',
    padding: '40px',
    color: '#d32f2f',
  },
  retryButton: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default Transactions;
