/**
 * Dashboard Component
 * Main dashboard with health status and navigation
 */

import React, { useState, useEffect } from 'react';
import api from '../services/api';
import UserList from './UserList';
import Transactions from './Transactions';

function Dashboard() {
  const [healthStatus, setHealthStatus] = useState(null);
  const [healthLoading, setHealthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    loadHealthStatus();
    // Refresh health status every 30 seconds
    const interval = setInterval(loadHealthStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadHealthStatus = async () => {
    try {
      setHealthLoading(true);
      const response = await api.health();
      setHealthStatus(response.data);
    } catch (err) {
      console.error('Health check failed:', err);
      setHealthStatus({
        status: 'unhealthy',
        error: err.message,
      });
    } finally {
      setHealthLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.logo}>🏦 Wakanda Bank</h1>
          <p style={styles.subtitle}>
            "Resilience and fault tolerance is the way of a wild hare"
          </p>
        </div>
        <div style={styles.healthStatus}>
          {healthLoading ? (
            <span style={styles.healthLoading}>⏳ Checking...</span>
          ) : (
            <span style={{
              ...styles.healthIndicator,
              backgroundColor: healthStatus?.status === 'healthy' ? '#4caf50' : '#f44336'
            }}>
              {healthStatus?.status === 'healthy' ? '✅ Healthy' : '❌ Unhealthy'}
            </span>
          )}
        </div>
      </header>

      <div style={styles.main}>
        <div style={styles.infoBar}>
          <div style={styles.infoCard}>
            <span style={styles.infoLabel}>Database:</span>
            <span style={styles.infoValue}>world_DB</span>
          </div>
          <div style={styles.infoCard}>
            <span style={styles.infoLabel}>Schema:</span>
            <span style={styles.infoValue}>public</span>
          </div>
          <div style={styles.infoCard}>
            <span style={styles.infoLabel}>Authorized by:</span>
            <span style={styles.infoValue}>Rev. Corrine McClinton</span>
          </div>
        </div>

        <div style={styles.tabs}>
          <button 
            onClick={() => setActiveTab('users')}
            style={{
              ...styles.tab,
              ...(activeTab === 'users' ? styles.activeTab : {})
            }}
          >
            👥 Users
          </button>
          <button 
            onClick={() => setActiveTab('transactions')}
            style={{
              ...styles.tab,
              ...(activeTab === 'transactions' ? styles.activeTab : {})
            }}
          >
            💳 Transactions
          </button>
        </div>

        <div style={styles.content}>
          {activeTab === 'users' && <UserList />}
          {activeTab === 'transactions' && <Transactions />}
        </div>
      </div>

      <footer style={styles.footer}>
        <p>Official Stamp: Rev. Corrine McClinton</p>
        <p>"Defeated man don't see that they are already defeated. Resilience is the way."</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  headerContent: {},
  logo: {
    fontSize: '32px',
    margin: 0,
    color: '#667eea',
  },
  subtitle: {
    fontSize: '14px',
    fontStyle: 'italic',
    color: '#666',
    margin: '5px 0 0 0',
  },
  healthStatus: {},
  healthLoading: {
    fontSize: '14px',
    color: '#666',
  },
  healthIndicator: {
    padding: '8px 16px',
    borderRadius: '20px',
    color: 'white',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  main: {
    flex: 1,
    padding: '40px',
    maxWidth: '1400px',
    width: '100%',
    margin: '0 auto',
  },
  infoBar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  infoCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  infoLabel: {
    fontSize: '12px',
    color: '#666',
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
  tabs: {
    display: 'flex',
    gap: '10px',
    marginBottom: '30px',
  },
  tab: {
    padding: '12px 24px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    border: 'none',
    borderRadius: '8px 8px 0 0',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#666',
    transition: 'all 0.3s',
  },
  activeTab: {
    backgroundColor: 'white',
    color: '#667eea',
    fontWeight: 'bold',
    boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
  },
  content: {
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    minHeight: '400px',
  },
  footer: {
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '20px',
    textAlign: 'center',
    color: '#666',
    fontSize: '14px',
    fontStyle: 'italic',
    borderTop: '1px solid rgba(0,0,0,0.1)',
  },
};

export default Dashboard;
