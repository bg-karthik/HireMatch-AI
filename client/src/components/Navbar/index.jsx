import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import "./index.css";

const Navbar = () => {
  const navigate = useNavigate();

  const location = useLocation();

  // Navigation links
  const links = [
    {
      label: "Home",
      path: "/",
    },

    {
      label: "Your Resumes",
      path: "/your-resumes",
    },

    {
      label: "Contact",
      path: "/contact",
    },
  ];

  // Auth token
  const token =
    localStorage.getItem("token");

  // Logout
  const handleLogout = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div
        className="navbar-logo"
        role="button"
        tabIndex={0}
        onClick={() =>
          navigate("/")
        }
        onKeyDown={(e) => {
          if (
            e.key === "Enter" ||
            e.key === " "
          ) {
            navigate("/");
          }
        }}
      >
        ✦ HireMatch AI
      </div>

      {/* NAVIGATION */}
      <div className="navbar-links">
        {links.map((link) => (
          <button
            type="button"
            key={link.path}
            className={`nav-link ${
              location.pathname ===
              link.path
                ? "active"
                : ""
            }`}
            onClick={() =>
              navigate(link.path)
            }
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* ACTION BUTTONS */}
      <div className="navbar-actions">
        {token ? (
          <button
            type="button"
            className="nav-btn-ghost"
            onClick={
              handleLogout
            }
          >
            Logout
          </button>
        ) : (
          <>
            <button
              type="button"
              className="nav-btn-ghost"
              onClick={() =>
                navigate("/login")
              }
            >
              Login
            </button>

            <button
              type="button"
              className="nav-btn-primary"
              onClick={() =>
                navigate("/register")
              }
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;