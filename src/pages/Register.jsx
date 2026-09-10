import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import googleLogo from "../assets/google.svg";

/**
 * Register Component
 * Handles new user registration with password validation and Google OAuth.
 */
const Register = () => {
  // Extract registration method from authentication context
  const { registerUser } = useContext(AuthContext);

  // Local state for user input, validation errors, and loading status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Redirects the browser to the backend Google OAuth2 entry point
  const handleGoogleLogin = () => {
    const backendUrl =
      import.meta.env.VITE_BACKEND_URL ||
      "https://techcoach-io-backend.onrender.com";
    window.location.href = `${backendUrl}/oauth2/authorization/google`;
  };

  // Validates inputs and handles user registration submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Ensure matching passwords before submitting to the backend
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Enforce minimum password length for security
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await registerUser({ email, password });

      if (result.success) {
        navigate("/dashboard");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Responsive container with fluid scaling and padding for mobile and desktop devices
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-6 text-xs sm:text-sm md:text-base">
      <div className="w-full max-w-sm sm:max-w-md p-6 sm:p-8 bg-white shadow-xl rounded-2xl text-center">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            TechCoach.io
          </h2>
          <p className="text-gray-500 mt-1 sm:mt-2 text-xs sm:text-sm">
            Create your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-xs sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-xs sm:text-sm"
              placeholder="Password"
            />
          </div>
          <div>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-xs sm:text-sm"
              placeholder="Confirm Password"
            />
          </div>

          {error && (
            <div className="text-red-500 text-xs sm:text-sm font-medium text-left">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition duration-300 flex justify-center items-center text-xs sm:text-sm ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-5 sm:mt-6 text-xs sm:text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Log in here
          </Link>
        </p>

        <div className="relative flex py-5 sm:py-6 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink-0 mx-3 sm:mx-4 text-gray-400 text-xs sm:text-sm">
            Or
          </span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full flex justify-center items-center gap-3 bg-white border border-gray-300 text-gray-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-50 transition duration-300 shadow-sm text-xs sm:text-sm"
        >
          <img src={googleLogo} alt="Google Logo" className="w-4 h-4 sm:w-5 sm:h-5" />
          Sign up with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
