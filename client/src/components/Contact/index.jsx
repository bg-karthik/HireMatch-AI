import { useState } from "react";

import Navbar from "../Navbar";

import "./index.css";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // Handle Input Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      // Example backend request
      // Replace with your actual backend route later

      /*
      await fetch(
        "http://localhost:5000/contact",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(form),
        }
      );
      */

      // Fake API delay
      await new Promise((resolve) =>
        setTimeout(resolve, 1200)
      );

      setSubmitted(true);

      // Clear form
      setForm({
        name: "",
        email: "",
        message: "",
      });

    } catch (err) {
      console.error(
        "Contact Form Error:",
        err
      );

      setError(
        "Something went wrong. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-wrapper">
      {/* NAVBAR */}
      <Navbar />

      {/* BACKGROUND ORBS */}
      <div className="contact-bg-orbs">
        <div className="contact-orb contact-orb-1"></div>

        <div className="contact-orb contact-orb-2"></div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="contact-container">
        {/* HEADER */}
        <div className="contact-header">
          <p className="contact-tag">
            Get in Touch
          </p>

          <h1 className="contact-title">
            We'd Love to{" "}
            <span className="gradient-text">
              Hear From You
            </span>
          </h1>

          <p className="contact-sub">
            Have a question,
            feedback, or just want to
            say hello? Fill out the
            form and we'll get back
            to you shortly.
          </p>
        </div>

        {/* CONTACT CARD */}
        <div className="contact-card">
          {submitted ? (
            <div className="success-state">
              <div className="success-icon">
                ✓
              </div>

              <h2>
                Contact Submitted
                Successfully!
              </h2>

              <p>
                Thanks for reaching
                out. We'll get back
                to you soon.
              </p>

              <button
                className="contact-btn"
                onClick={() =>
                  setSubmitted(false)
                }
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >
              {/* ERROR */}
              {error && (
                <p
                  style={{
                    color: "#ff6b6b",
                    marginBottom: "10px",
                  }}
                >
                  {error}
                </p>
              )}

              {/* ROW */}
              <div className="form-row">
                {/* NAME */}
                <div className="form-group">
                  <label htmlFor="name">
                    Full Name
                  </label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={
                      handleChange
                    }
                    required
                  />
                </div>

                {/* EMAIL */}
                <div className="form-group">
                  <label htmlFor="email">
                    Email Address
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={
                      handleChange
                    }
                    required
                  />
                </div>
              </div>

              {/* MESSAGE */}
              <div className="form-group">
                <label htmlFor="message">
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us what's on your mind..."
                  rows={6}
                  value={form.message}
                  onChange={
                    handleChange
                  }
                  required
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="contact-btn"
                disabled={loading}
              >
                {loading
                  ? "Sending..."
                  : "Send Message →"}
              </button>
            </form>
          )}
        </div>

        {/* CONTACT INFO */}
        <div className="contact-info-strip">
          {[
            {
              icon: "✉",
              label: "Email",
              value:
                "hello@hirematchai.com",
            },

            {
              icon: "⏱",
              label:
                "Response Time",
              value:
                "Within 24 hours",
            },

            {
              icon: "📍",
              label: "Location",
              value:
                "Hyderabad, India",
            },
          ].map((item, index) => (
            <div
              className="info-item"
              key={index}
            >
              <span className="info-icon">
                {item.icon}
              </span>

              <div>
                <p className="info-label">
                  {item.label}
                </p>

                <p className="info-value">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;