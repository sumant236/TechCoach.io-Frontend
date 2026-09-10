import axios from "axios";
import { createContext, useEffect, useState } from "react";

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

  // Verifies user session with the backend using HttpOnly cookies
  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(
        "https://techcoach-io-backend.onrender.com/api/auth/me",
        {
          withCredentials: true,
        },
      );
      setUser(response.data);
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
      await axios.post(
        "https://techcoach-io-backend.onrender.com/api/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("activeInterviewId");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Authenticates user and refreshes auth status
  const login = async (credentials) => {
    console.log("Attempting login with credentials:", credentials);
    try {
      await axios.post(
        "https://techcoach-io-backend.onrender.com/api/auth/login",
        { ...credentials },
        { withCredentials: true },
      );

      await checkAuthStatus();

      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Invalid credentials!";
      return { success: false, message: errorMessage };
    }
  };

  // Registers a new user and authenticates them automatically
  const registerUser = async (credentials) => {
    console.log("Attempting registration with credentials:", credentials);
    try {
      await axios.post(
        "https://techcoach-io-backend.onrender.com/api/auth/register",
        { ...credentials },
        { withCredentials: true },
      );

      await checkAuthStatus();

      return { success: true };
    } catch (error) {
      console.log("Registration error:", error.response?.data || error);
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
