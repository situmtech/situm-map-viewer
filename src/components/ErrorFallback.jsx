import React from "react";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert" className="error-page">
      <p>There was an error in the application:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Reload</button>
    </div>
  );
};
export default ErrorFallback;
