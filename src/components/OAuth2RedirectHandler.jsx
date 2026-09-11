import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Use it if we are sending data to the backend and want to store the token in local storage for future API calls. This is a common pattern in OAuth2 flows where the backend sends a token to the frontend after successful authentication.
// Currently we are using HttpOnly cookies for authentication, so this component is not in use. But if we were to switch to token-based authentication, this component would be useful.
const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract the query parameters from the current URL (e.g., ?token=xyz)
    const urlParams = new URLSearchParams(location.search);

    // Grab the specific string value attached to the 'token' key
    const token = urlParams.get("token");

    if (token) {
      // Save token locally so the Axios interceptor can use it for future API calls
      localStorage.setItem("jwt_token", token);

      // Authentication successful, redirect user to the secure dashboard
      // replace: true ensures this specific URL is never saved in browser history
      navigate("/dashboard", { replace: true });
    } else {
      // Redirect to login if authentication failed or token is missing
      navigate("/login", { replace: true });
    }
  }, [location, navigate]);

  return (
    <div className="flex h-screen items-center justify-center text-xl font-semibold">
      Authenticating... Please wait.
    </div>
  );
};

export default OAuth2RedirectHandler;
