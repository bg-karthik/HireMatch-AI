import { useState } from "react";

import Navbar from "../Navbar";

import "./index.css";

const YourResumes = () => {
  const [selectedFile, setSelectedFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [
    analysisResult,
    setAnalysisResult,
  ] = useState(null);

  const [showModal, setShowModal] =
    useState(false);

  /* =========================================
     HANDLE FILE
  ========================================= */

  const handleFileChange = (
    event
  ) => {
    const file =
      event.target.files[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "application/pdf",

      "application/msword",

      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (
      !allowedTypes.includes(
        file.type
      )
    ) {
      setError(
        "Only PDF, DOC, and DOCX files are allowed."
      );

      setSelectedFile(null);

      return;
    }

    setSelectedFile(file);

    setError("");
  };

  /* =========================================
     UPLOAD + ANALYZE
  ========================================= */

  const handleUploadAndAnalyze =
    async () => {
      if (!selectedFile) {
        setError(
          "Please select a resume file."
        );

        return;
      }

      const token =
        localStorage.getItem(
          "token"
        );

      if (!token) {
        setError(
          "Please login first."
        );

        return;
      }

      try {
        setLoading(true);

        setError("");

        setAnalysisResult(null);

        /* =========================================
           FORM DATA
        ========================================= */

        const formData =
          new FormData();

        formData.append(
          "resume",
          selectedFile
        );

        /* =========================================
           STEP 1 — UPLOAD RESUME
        ========================================= */

        const uploadResponse =
          await fetch(
            "http://localhost:5000/resume/upload",
            {
              method: "POST",

              headers: {
                Authorization: `Bearer ${token}`,
              },

              body: formData,
            }
          );

        let uploadData;

        try {
          uploadData =
            await uploadResponse.json();
        } catch {
          throw new Error(
            "Invalid upload response"
          );
        }

        if (!uploadResponse.ok) {
          throw new Error(
            uploadData.error ||
              "Resume upload failed."
          );
        }

        /* =========================================
           EXTRACTED TEXT
        ========================================= */

        const extractedText =
          uploadData.text;

        if (!extractedText) {
          throw new Error(
            "Could not extract text from resume."
          );
        }

        /* =========================================
           SAMPLE JOB DESCRIPTION
        ========================================= */

        const jobDescription = `
Frontend React Developer with experience in React.js,
JavaScript, HTML, CSS, Node.js, MongoDB, REST APIs,
Git, and responsive web design.
`;

        /* =========================================
           STEP 2 — ANALYZE RESUME
        ========================================= */

        const analyzeResponse =
          await fetch(
            "http://localhost:5000/resume/analyze",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization: `Bearer ${token}`,
              },

              body: JSON.stringify({
                resumeText:
                  extractedText,

                jobDescription,
              }),
            }
          );

        let analyzeData;

        try {
          analyzeData =
            await analyzeResponse.json();
        } catch {
          throw new Error(
            "Invalid analysis response"
          );
        }

        if (!analyzeResponse.ok) {
          throw new Error(
            analyzeData.error ||
              "Resume analysis failed."
          );
        }

        /* =========================================
           SET RESULT
        ========================================= */

        setAnalysisResult(
          analyzeData
        );

        setShowModal(true);

      } catch (err) {
        console.error(err);

        setError(
          err.message ||
            "Something went wrong."
        );

      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="resume-page">
      <Navbar />

      {/* BACKGROUND */}
      <div className="resume-bg-orbs">
        <div className="resume-orb orb-1"></div>

        <div className="resume-orb orb-2"></div>
      </div>

      {/* CONTENT */}
      <div className="resume-container">
        {/* HEADER */}
        <div className="resume-header">
          <p className="resume-tag">
            Resume Analyzer
          </p>

          <h1 className="resume-title">
            Upload Your{" "}
            <span className="gradient-text">
              Resume
            </span>
          </h1>

          <p className="resume-subtitle">
            Analyze your resume
            with AI and improve
            ATS compatibility.
          </p>
        </div>

        {/* CARD */}
        <div className="upload-card">
          {error && (
            <div className="error-box">
              {error}
            </div>
          )}

          {/* FILE */}
          <div className="file-upload-section">
            <label
              htmlFor="resumeUpload"
              className="upload-label"
            >
              {selectedFile ? (
                <>
                  <span className="upload-icon">
                    ✓
                  </span>

                  <span className="file-name">
                    {
                      selectedFile.name
                    }
                  </span>
                </>
              ) : (
                <>
                  <span className="upload-icon">
                    ↑
                  </span>

                  <span>
                    Choose PDF or DOCX Resume
                  </span>
                </>
              )}
            </label>

            <input
              id="resumeUpload"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={
                handleFileChange
              }
              hidden
            />
          </div>

          {/* BUTTON */}
          <button
            type="button"
            className="analyze-btn"
            onClick={
              handleUploadAndAnalyze
            }
            disabled={loading}
          >
            {loading
              ? "Analyzing Resume..."
              : "Upload & Analyze"}
          </button>
        </div>

        {/* RESULT */}
        {analysisResult && (
          <div className="analysis-card">
            <div className="analysis-header">
              <h2>
                Resume Analysis
              </h2>
            </div>

            {/* SCORE */}
            <div className="score-section">
              <div className="score-circle">
                <span>
                  {analysisResult.score ||
                    0}
                </span>
              </div>

              <p>ATS Score</p>
            </div>

            {/* SUGGESTIONS */}
            <div className="feedback-section">
              <h3>
                AI Suggestions
              </h3>

              <ul>
                {analysisResult
                  ?.suggestions
                  ?.length > 0 ? (
                  analysisResult.suggestions.map(
                    (
                      item,
                      index
                    ) => (
                      <li
                        key={index}
                      >
                        {item}
                      </li>
                    )
                  )
                ) : (
                  <li>
                    No suggestions
                    available.
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}

        {/* MODAL */}
        {showModal &&
          analysisResult && (
            <div className="modal-overlay">
              <div className="result-modal">
                <button
                  type="button"
                  className="close-btn"
                  onClick={() =>
                    setShowModal(
                      false
                    )
                  }
                >
                  ×
                </button>

                <h2>
                  Analysis Completed
                </h2>

                <div className="modal-score">
                  {analysisResult.score ||
                    0}
                </div>

                <p className="modal-label">
                  ATS Compatibility
                  Score
                </p>

                <div className="modal-feedback">
                  <h3>
                    Suggestions
                  </h3>

                  <ul>
                    {analysisResult
                      ?.suggestions
                      ?.length >
                    0 ? (
                      analysisResult.suggestions.map(
                        (
                          item,
                          index
                        ) => (
                          <li
                            key={
                              index
                            }
                          >
                            {item}
                          </li>
                        )
                      )
                    ) : (
                      <li>
                        No
                        suggestions
                        available.
                      </li>
                    )}
                  </ul>
                </div>

                <button
                  type="button"
                  className="analyze-btn modal-btn"
                  onClick={() =>
                    setShowModal(
                      false
                    )
                  }
                >
                  Close
                </button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default YourResumes;