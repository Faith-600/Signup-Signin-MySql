import React from 'react';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Oops! Something went wrong.</h1>
      <p>Error: {error.message}</p>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
}

export default ErrorFallback;
