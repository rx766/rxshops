import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // For now, allow access for testing (no authentication implemented yet)
  // In production, check if user is authenticated
  const isAuthenticated = true; // Temporarily allow access for testing
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;