import { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import "./index.css";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  /* =========================================
     HANDLE NAME
  ========================================= */

  const handleNameChange = (
    event
  ) => {
    setName(event.target.value);
  };

  /* =========================================
     HANDLE EMAIL
  ========================================= */

  const handleEmailChange = (
    event
  ) => {
    setEmail(event.target.value);
  };

  /* =========================================
     HANDLE PASSWORD
  ========================================= */

  const handlePasswordChange = (
    event
  ) => {
    setPassword(
      event.target.value
    );
  };

  /* =========================================
     HANDLE REGISTER
  ========================================= */

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setLoading(true);

    setError("");

    setSuccess("");

    try {
      const response =
        await fetch(
          `${import.meta.env.VITE_API_URL}/auth/register`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              name,
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
        setSuccess(
          "Registration successful! Redirecting to login..."
        );

        /* CLEAR FORM */

        setName("");

        setEmail("");

        setPassword("");

        /* REDIRECT */

        setTimeout(() => {
          navigate("/login");
        }, 1800);

      } else {
        setError(
          data.error ||
            data.message ||
            "Registration failed"
        );
      }

    } catch (err) {
      console.error(
        "Register Error:",
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

      {/* CARD */}
      <form
        className="auth-card"
        onSubmit={handleSubmit}
      >
        {/* HEADER */}
        <div className="auth-header">
          <p className="auth-tag">
            Create Account
          </p>

          <h2>
            Join{" "}
            <span className="gradient-text">
              HireMatch AI
            </span>
          </h2>

          <p className="auth-subtitle">
            Start optimizing your
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

        {/* SUCCESS */}
        {success && (
          <p className="success-text">
            {success}
          </p>
        )}

        {/* NAME */}
        <div className="input-group">
          <label htmlFor="name">
            Full Name
          </label>

          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={name}
            onChange={
              handleNameChange
            }
            required
            autoComplete="name"
          />
        </div>

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
            onChange={
              handleEmailChange
            }
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
            placeholder="Create a password"
            value={password}
            onChange={
              handlePasswordChange
            }
            required
            autoComplete="new-password"
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="auth-btn"
          disabled={loading}
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </button>

        {/* FOOTER */}
        <p className="auth-footer-text">
          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;