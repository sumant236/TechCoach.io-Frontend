import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

/**
 * ProtectedRoute Component
 * Restricts access to private pages, ensuring only authenticated users can view them.
 */
const ProtectedRoute = ({ children }) => {
  // Extract authentication status and loading state from context
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  // Render a centered loading spinner while checking authentication state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Redirect unauthenticated users to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render child components if the user is authenticated
  return children;
};

export default ProtectedRoute;
