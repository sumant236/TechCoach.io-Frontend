import { createContext, useEffect, useState } from "react";
import api from "../services/api";

// Create context to manage global authentication state across the app
const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async (credentials) => {},
  logout: async () => {},
  registerUser: async (credentials) => {},
});

// Provides authentication state and methods to child components
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verifies user session with the backend using bearer token authentication
  const checkAuthStatus = async () => {
    try {
      const response = await api.get("/api/auth/me");
      setUser(response.data.data);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Clears user session on the backend and local state
  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("activeInterviewId");
      localStorage.removeItem("jwt_token");
    }
  };

  // Authenticates user and stores jwt token in local storage
  const login = async (credentials) => {
    try {
      const response = await api.post("/api/auth/login", credentials);
      const authData = response.data.data;
      setUser(authData.user);
      setIsAuthenticated(true);
      localStorage.setItem("jwt_token", authData.token);
      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Invalid credentials!";
      return { success: false, message: errorMessage };
    }
  };

  // Registers a new user and stores jwt token in local storage
  const registerUser = async (credentials) => {
    try {
      const response = await api.post("/api/auth/register", credentials);
      const authData = response.data.data;
      setUser(authData.user);
      setIsAuthenticated(true);
      localStorage.setItem("jwt_token", authData.token);

      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Registration failed!";
      return { success: false, message: errorMessage };
    }
  };

  // Run session check on initial component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
