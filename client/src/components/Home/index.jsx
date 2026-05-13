import Navbar from "../Navbar";
import "./index.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleProtectedRoute = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/your-resumes");
    } else {
      navigate("/login");
    }
  };

  const features = [
    {
      icon: "📄",
      title: "Resume Parsing",
      desc: "Extracts skills, experience, and education from PDF/DOCX.",
    },
    {
      icon: "🎯",
      title: "ATS Scoring",
      desc: "Compares your resume to job descriptions and returns an ATS compatibility score.",
    },
    {
      icon: "🤖",
      title: "AI Suggestions",
      desc: "Personalized edits and bullet rewrites powered by AI.",
    },
    {
      icon: "🔑",
      title: "Keyword Optimization",
      desc: "Highlights missing keywords and suggests where to add them.",
    },
    {
      icon: "📐",
      title: "Format Tips",
      desc: "Improve formatting for better ATS parsing.",
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      desc: "Your files and data stay protected.",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Upload",
      desc: "Upload your PDF or DOCX resume.",
    },
    {
      num: "02",
      title: "Analyze",
      desc: "Get ATS score and AI-powered insights.",
    },
    {
      num: "03",
      title: "Improve",
      desc: "Apply suggestions and improve your chances.",
    },
  ];

  return (
    <div className="home-wrapper">
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            AI-Powered Resume Analysis
          </div>

          <h1 className="hero-h1">
            Make Your Resume
            <br />
            <span className="gradient-text">
              Beat the Bots
            </span>
          </h1>

          <p className="hero-sub">
            Upload your resume, get an ATS score,
            and receive AI-driven suggestions to
            improve your chances of getting hired.
          </p>

          <p className="hero-quote">
            “A great resume opens doors; this tool
            ensures it gets past the first one.”
          </p>

          <div className="hero-actions">
            <button
              type="button"
              className="btn-primary"
              onClick={handleProtectedRoute}
            >
              Get Started — It's Free
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/contact")}
            >
              See Demo
            </button>
          </div>

          {/* SCORE CARD */}
          <div className="score-card-tease">
            <div className="score-ring">
              <svg
                viewBox="0 0 80 80"
                className="ring-svg"
              >
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  className="ring-bg"
                />

                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  className="ring-fill"
                />
              </svg>

              <div className="score-number">
                72
              </div>
            </div>

            <div className="score-details">
              <div className="score-label">
                ATS Score
              </div>

              <div className="score-bar-row">
                <span>Keywords</span>

                <div className="mini-bar">
                  <div
                    className="mini-fill"
                    style={{ width: "68%" }}
                  ></div>
                </div>
              </div>

              <div className="score-bar-row">
                <span>Format</span>

                <div className="mini-bar">
                  <div
                    className="mini-fill"
                    style={{ width: "84%" }}
                  ></div>
                </div>
              </div>

              <div className="score-bar-row">
                <span>Content</span>

                <div className="mini-bar">
                  <div
                    className="mini-fill"
                    style={{ width: "55%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <div className="section-header">
          <p className="section-tag">
            What We Offer
          </p>

          <h2>
            Everything You Need to
            <br />

            <span className="gradient-text">
              Land the Interview
            </span>
          </h2>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              className="feature-card"
              key={index}
            >
              <div className="feature-icon">
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="features-cta">
          <button
            type="button"
            className="btn-primary"
            onClick={handleProtectedRoute}
          >
            Optimize My Resume
          </button>

          <p className="trust-line">
            No credit card. Secure processing.
            Export in PDF.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">
        <div className="section-header">
          <p className="section-tag">
            Simple Process
          </p>

          <h2>
            Three Steps to
            <br />

            <span className="gradient-text">
              Resume Success
            </span>
          </h2>
        </div>

        <div className="steps-row">
          {steps.map((step, index) => (
            <div
              className="step-card"
              key={index}
            >
              <div className="step-num">
                {step.num}
              </div>

              <h3>{step.title}</h3>

              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-orb cta-orb-1"></div>
        <div className="cta-orb cta-orb-2"></div>

        <div className="cta-content">
          <h2>
            Ready to Get More
            <br />

            <span className="gradient-text">
              Interview Callbacks?
            </span>
          </h2>

          <p>
            Join thousands of job seekers
            optimizing resumes with AI.
          </p>

          <div className="hero-actions">
            <button
              type="button"
              className="btn-primary"
              onClick={handleProtectedRoute}
            >
              Start for Free
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/contact")}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} HireMatch AI.
            All rights reserved.
          </p>

          <p>
            Made with ❤️ for job seekers
            worldwide
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;