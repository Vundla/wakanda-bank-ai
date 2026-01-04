/**
 * Main App Component with Error Boundary
 */

import React from 'react';
import ErrorBoundary from './utils/errorBoundary';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <ErrorBoundary>
      <Dashboard />
    </ErrorBoundary>
  );
}

export default App;
