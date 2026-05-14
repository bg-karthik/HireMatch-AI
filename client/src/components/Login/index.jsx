import { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import "./index.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /* =========================================
     HANDLE EMAIL
  ========================================= */

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  /* =========================================
     HANDLE PASSWORD
  ========================================= */

  const handlePassword = (
    event
  ) => {
    setPassword(event.target.value);
  };

  /* =========================================
     HANDLE LOGIN
  ========================================= */

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setLoading(true);

    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      let data = {};

      try {
        data =
          await response.json();
      } catch {
        data = {
          error:
            "Invalid server response",
        };
      }

      if (response.ok) {
        /* SAVE TOKEN */

        localStorage.setItem(
          "token",
          data.token
        );

        /* SAVE USER */

        if (data.user) {
          localStorage.setItem(
            "user",
            JSON.stringify(
              data.user
            )
          );
        }

        /* REDIRECT */

        navigate(
          "/your-resumes"
        );

      } else {
        setError(
          data.error ||
            data.message ||
            "Login failed"
        );
      }

    } catch (err) {
      console.error(
        "Login Error:",
        err
      );

      setError(
        "Unable to connect to server."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* BACKGROUND */}
      <div className="auth-bg-orbs">
        <div className="auth-orb auth-orb-1"></div>

        <div className="auth-orb auth-orb-2"></div>
      </div>

      {/* LOGIN CARD */}
      <form
        className="auth-card"
        onSubmit={handleSubmit}
      >
        {/* HEADER */}
        <div className="auth-header">
          <p className="auth-tag">
            Welcome Back
          </p>

          <h2>
            Login to{" "}
            <span className="gradient-text">
              HireMatch AI
            </span>
          </h2>

          <p className="auth-subtitle">
            Continue optimizing your
            resume with AI-powered
            ATS analysis.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <p className="error-text">
            {error}
          </p>
        )}

        {/* EMAIL */}
        <div className="input-group">
          <label htmlFor="email">
            Email Address
          </label>

          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmail}
            required
            autoComplete="email"
          />
        </div>

        {/* PASSWORD */}
        <div className="input-group">
          <label htmlFor="password">
            Password
          </label>

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={
              handlePassword
            }
            required
            autoComplete="current-password"
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="auth-btn"
          disabled={loading}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        {/* FOOTER */}
        <p className="auth-footer-text">
          Don't have an account?{" "}

          <Link to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;