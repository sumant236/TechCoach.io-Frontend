import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

/**
 * GuestRoute Component
 * Restricts access to public-only pages like login and registration for authenticated users.
 */
const GuestRoute = ({ children }) => {
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

  // Redirect authenticated users away from guest pages to the dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Render child components if the user is a guest
  return children;
};

export default GuestRoute;
