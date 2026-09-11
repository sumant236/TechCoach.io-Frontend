import axios from "axios";

// Create an Axios instance with a base URL and default settings
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Use environment variable for backend URL
});

// Intercepts every outgoing HTTP request before it leaves the browser
api.interceptors.request.use(
  (config) => {
    // Retrieve the saved JWT token from browser storage
    const token = localStorage.getItem("jwt_token");

    // If token exists, attach it to the standard Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // Allow the request to continue to the backend
  },
  // Handle any request setup errors
  (error) => Promise.reject(error),
);

export default api;
