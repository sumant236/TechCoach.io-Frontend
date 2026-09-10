import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import Register from "./pages/Register";

function App() {
  return (
    // Outer router wrapper enabling HTML5 history routing across the application
    <Router>
      {/* Global authentication provider managing user session state and cookies */}
      <AuthProvider>
        {/* Main responsive layout container with mobile-first padding and scaling */}
        <div className="min-h-screen w-full bg-slate-50 text-slate-900 text-xs sm:text-sm md:text-base antialiased flex flex-col justify-between">
          <Routes>
            {/* Public/Guest-only Route: Accessible strictly when logged out (redirects authenticated users) */}
            <Route
              path="/login"
              element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              }
            />

            {/* Public/Guest-only Route: User registration portal */}
            <Route
              path="/register"
              element={
                <GuestRoute>
                  <Register />
                </GuestRoute>
              }
            />

            {/* Default Route: Automatically redirects root traffic to the login portal */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Protected Route: Restricted area requiring valid authentication session cookies */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
