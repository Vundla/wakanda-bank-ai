/**
 * User List Component
 * Database: world_DB (schema: public)
 */

import React, { useState, useEffect } from 'react';
import api from '../services/api';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    balance: 0,
    accountType: 'Standard'
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.users.getAll();
      setUsers(response.data.data);
    } catch (err) {
      setError(err.message || 'Failed to load users');
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await api.users.create({
        ...newUser,
        balance: parseFloat(newUser.balance)
      });
      setNewUser({ name: '', email: '', balance: 0, accountType: 'Standard' });
      setShowAddForm(false);
      await loadUsers();
    } catch (err) {
      alert('Failed to create user: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.users.delete(id);
      await loadUsers();
    } catch (err) {
      alert('Failed to delete user: ' + (err.response?.data?.error || err.message));
    }
  };

  if (loading) {
    return <div style={styles.loading}>⏳ Loading users...</div>;
  }

  if (error) {
    return (
      <div style={styles.error}>
        <p>❌ {error}</p>
        <button onClick={loadUsers} style={styles.retryButton}>🔄 Retry</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>👥 Users ({users.length})</h2>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          style={styles.addButton}
        >
          {showAddForm ? '❌ Cancel' : '➕ Add User'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddUser} style={styles.form}>
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({...newUser, name: e.target.value})}
            required
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
            required
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Balance"
            value={newUser.balance}
            onChange={(e) => setNewUser({...newUser, balance: e.target.value})}
            required
            style={styles.input}
          />
          <select
            value={newUser.accountType}
            onChange={(e) => setNewUser({...newUser, accountType: e.target.value})}
            style={styles.input}
          >
            <option value="Standard">Standard</option>
            <option value="Royal">Royal</option>
            <option value="Technology">Technology</option>
            <option value="Defense">Defense</option>
          </select>
          <button type="submit" style={styles.submitButton}>Create User</button>
        </form>
      )}

      <div style={styles.userList}>
        {users.map(user => (
          <div key={user.id} style={styles.userCard}>
            <div style={styles.userInfo}>
              <h3 style={styles.userName}>{user.name}</h3>
              <p style={styles.userEmail}>{user.email}</p>
              <p style={styles.userBalance}>
                Balance: <strong>${user.balance.toLocaleString()}</strong>
              </p>
              <span style={styles.userType}>{user.accountType}</span>
            </div>
            <button 
              onClick={() => handleDeleteUser(user.id)}
              style={styles.deleteButton}
            >
              🗑️
            </button>
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
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  input: {
    padding: '12px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  submitButton: {
    padding: '12px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  userList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  userCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: '18px',
    marginBottom: '5px',
    color: '#333',
  },
  userEmail: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '10px',
  },
  userBalance: {
    fontSize: '16px',
    color: '#333',
    marginBottom: '10px',
  },
  userType: {
    display: 'inline-block',
    padding: '4px 12px',
    backgroundColor: '#667eea',
    color: 'white',
    borderRadius: '12px',
    fontSize: '12px',
  },
  deleteButton: {
    padding: '8px 12px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '20px',
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

export default UserList;
