import {
  Navigate,
  useLocation,
} from "react-router-dom";

const ProtectedRoute = ({
  children,
}) => {
  const location =
    useLocation();

  // Get auth token
  const token =
    localStorage.getItem("token");

  // Redirect if not authenticated
  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from:
            location.pathname,
        }}
      />
    );
  }

  // Render protected page
  return children;
};

export default ProtectedRoute;