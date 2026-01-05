/**
 * Error Boundary Component
 * Philosophy: "Defeated man don't see that they are already defeated. Resilience is the way."
 */

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({ 
      hasError: false,
      error: null,
      errorInfo: null 
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <div style={styles.card}>
            <h1 style={styles.title}>⚡ Resilience in Action</h1>
            <p style={styles.message}>
              "Defeated man don't see that they are already defeated. Resilience is the way."
            </p>
            <p style={styles.error}>
              Something went wrong, but we're prepared for this.
            </p>
            {this.state.error && (
              <details style={styles.details}>
                <summary>Error Details</summary>
                <pre style={styles.pre}>
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <button onClick={this.handleReset} style={styles.button}>
              Try Again
            </button>
            <button 
              onClick={() => window.location.reload()} 
              style={{...styles.button, ...styles.buttonSecondary}}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  card: {
    background: 'white',
    borderRadius: '12px',
    padding: '40px',
    maxWidth: '600px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  },
  title: {
    fontSize: '32px',
    marginBottom: '20px',
    color: '#667eea',
  },
  message: {
    fontSize: '16px',
    fontStyle: 'italic',
    marginBottom: '20px',
    color: '#666',
    borderLeft: '4px solid #667eea',
    paddingLeft: '15px',
  },
  error: {
    fontSize: '18px',
    marginBottom: '20px',
    color: '#333',
  },
  details: {
    marginBottom: '20px',
    padding: '10px',
    background: '#f5f5f5',
    borderRadius: '4px',
  },
  pre: {
    fontSize: '12px',
    overflow: 'auto',
    marginTop: '10px',
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginRight: '10px',
    marginTop: '10px',
  },
  buttonSecondary: {
    backgroundColor: '#764ba2',
  },
};

export default ErrorBoundary;
