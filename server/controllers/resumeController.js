import { parseResume } from "../utils/resumeParser.js";

import { extractKeywords } from "../utils/keywordExtractor.js";

import { calculateATSScore } from "../utils/atsScore.js";

import { analyzeWithGemini } from "../utils/aiAnalyzer.js";

/* =========================================
   UPLOAD RESUME
========================================= */

export const uploadResume =
  async (req, res) => {
    try {
      // CHECK FILE
      if (!req.file) {
        return res.status(400).json({
          error: "No file uploaded",
        });
      }

      // EXTRACT TEXT
      const extractedText =
        await parseResume(
          req.file.buffer
        );

      // VALIDATE TEXT
      if (
        !extractedText ||
        extractedText.trim().length === 0
      ) {
        return res.status(400).json({
          error:
            "Unable to extract text from resume",
        });
      }

      res.json({
        success: true,

        text: extractedText,

        preview:
          extractedText.slice(
            0,
            500
          ),
      });

    } catch (err) {
      console.error(
        "Upload Resume Error:",
        err
      );

      res.status(500).json({
        error:
          err.message ||
          "Resume upload failed",
      });
    }
  };

/* =========================================
   ANALYZE RESUME
========================================= */

export const analyzeResume =
  async (req, res) => {
    try {
      const {
        resumeText,
        jobDescription,
      } = req.body;

      /* =========================================
         VALIDATION
      ========================================= */

      if (!resumeText) {
        return res.status(400).json({
          error:
            "resumeText is required",
        });
      }

      /* =========================================
         DEFAULT JOB DESCRIPTION
      ========================================= */

      const defaultJD = `
Frontend Developer React JavaScript HTML CSS
Responsive Design REST API Git GitHub
Node.js Express MongoDB Redux
UI UX Problem Solving Teamwork
`;

      const finalJobDescription =
        jobDescription?.trim() ||
        defaultJD;

      /* =========================================
         KEYWORD EXTRACTION
      ========================================= */

      const jdKeywords =
        extractKeywords(
          finalJobDescription
        );

      const resumeKeywords =
        extractKeywords(
          resumeText
        );

      console.log(
        "JD Keywords:",
        jdKeywords
      );

      console.log(
        "Resume Keywords:",
        resumeKeywords
      );

      /* =========================================
         FIXED ATS SCORE
      ========================================= */

      const calculatedScore =
        calculateATSScore(
          jdKeywords,
          resumeKeywords
        );

      console.log(
        "Calculated ATS Score:",
        calculatedScore
      );

      /* =========================================
         GEMINI ANALYSIS
      ========================================= */

      let geminiResult = {};

      try {
        geminiResult =
          await analyzeWithGemini(
            resumeText,
            finalJobDescription
          );

      } catch (aiError) {
        console.error(
          "Gemini Error:",
          aiError
        );

        geminiResult = {};
      }

      const aiAnalysis =
        geminiResult.analysis || {};

      /* =========================================
         SUGGESTIONS
      ========================================= */

      const suggestions = [
        ...(aiAnalysis
          .ats_optimization_tips || []),

        ...(aiAnalysis
          .missing_skills
          ?.from_resume_for_job_description ||
          []),
      ];

      /* =========================================
         FALLBACK SUGGESTIONS
      ========================================= */

      const finalSuggestions =
        suggestions.length > 0
          ? suggestions
          : [
              "Add more technical keywords related to the job role.",
              "Improve resume formatting for better ATS readability.",
              "Include measurable achievements in experience section.",
              "Add more relevant project details and technologies.",
            ];

      /* =========================================
         RESPONSE
      ========================================= */

      res.json({
        success: true,

        // ALWAYS USE FIXED SCORE
        score:
          calculatedScore || 0,

        suggestions:
          finalSuggestions,

        matchedKeywords:
          resumeKeywords.filter(
            (keyword) =>
              jdKeywords.includes(
                keyword
              )
          ),

        missingKeywords:
          jdKeywords.filter(
            (keyword) =>
              !resumeKeywords.includes(
                keyword
              )
          ),

        fullAnalysis: aiAnalysis,
      });

    } catch (err) {
      console.error(
        "Analyze Resume Error:",
        err
      );

      res.status(500).json({
        error:
          err.message ||
          "Resume analysis failed",
      });
    }
  };