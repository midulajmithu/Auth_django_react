import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuthenticated, allowedRoles, userRole }) => {
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Redirect to unauthorized or home page if role not allowed
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  // Render the protected content
  return children;
};

export default ProtectedRoute;