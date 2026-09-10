import axios from "axios";

// Create an Axios instance with a base URL and default settings
const api = axios.create({
  baseURL: "https://techcoach-io-backend.onrender.com",
  // Forces the browser to automatically attach HttpOnly cookies to every request
  withCredentials: true,
});

// Intercepts every outgoing HTTP request before it leaves the browser
// this is if we are using token-based authentication instead of HttpOnly cookies. The interceptor will attach the JWT token to the Authorization header of every request.
api.interceptors.request.use(
  (config) => {
    // Retrieve the saved JWT token from browser storage
    const token = localStorage.getItem("jwt_token");

    // If token exists, attach it to the standard Authorization header
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config; // Allow the request to continue to the backend
  },
  (error) => {
    // Handle any request setup errors
    return Promise.reject(error);
  },
);

export default api;
