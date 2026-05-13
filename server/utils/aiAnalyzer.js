import dotenv from "dotenv";

dotenv.config();

/* =========================================
   GEMINI ANALYZER
========================================= */

export const analyzeWithGemini =
  async (
    resumeText,
    jobDescription
  ) => {
    try {
      // API KEY CHECK
      if (
        !process.env.GEMINI_API_KEY
      ) {
        throw new Error(
          "GEMINI_API_KEY is missing"
        );
      }

      /* =========================================
         API REQUEST
      ========================================= */

      const response =
        await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: buildPrompt(
                        resumeText,
                        jobDescription
                      ),
                    },
                  ],
                },
              ],

              generationConfig: {
                temperature: 0.2,
              },
            }),
          }
        );

      const data =
        await response.json();

      console.log(
        "Gemini Response:",
        JSON.stringify(
          data,
          null,
          2
        )
      );

      /* =========================================
         EXTRACT TEXT
      ========================================= */

      const rawText =
        data?.candidates?.[0]
          ?.content?.parts?.[0]
          ?.text;

      if (!rawText) {
        throw new Error(
          "Empty Gemini response"
        );
      }

      /* =========================================
         CLEAN RESPONSE
      ========================================= */

      const cleanedText =
        rawText
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

      /* =========================================
         PARSE JSON
      ========================================= */

      try {
        return JSON.parse(
          cleanedText
        );

      } catch (parseError) {
        console.error(
          "JSON Parse Error:",
          parseError
        );

        console.error(
          "RAW GEMINI TEXT:",
          cleanedText
        );

        return {
          success: false,

          analysis: {
            compatibility_score: 0,

            ats_optimization_tips:
              [
                "Unable to parse AI response properly.",
              ],

            missing_skills: {
              from_resume_for_job_description:
                [],

              from_job_description_for_resume:
                [],
            },
          },
        };
      }

    } catch (error) {
      console.error(
        "Gemini Analysis Error:",
        error
      );

      throw error;
    }
  };

/* =========================================
   PROMPT BUILDER
========================================= */

const buildPrompt = (
  resumeText,
  jobDescription
) => `
You are an ATS resume analyzer AI.

Analyze the resume against the job description.

IMPORTANT:
- Return STRICT JSON ONLY
- No markdown
- No explanations
- No backticks
- No extra text

Use EXACTLY this schema:

{
  "success": true,
  "analysis": {
    "resume_skills": [],
    "job_description_skills": [],
    "missing_skills": {
      "from_resume_for_job_description": [],
      "from_job_description_for_resume": []
    },
    "ats_optimized_bullet_point_improvements": [
      {
        "original_summary": "",
        "suggested_bullets": [],
        "reasoning": ""
      }
    ],
    "ats_optimization_tips": [],
    "compatibility_score": 0,
    "overall_assessment": ""
  }
}

Resume:
${resumeText}

Job Description:
${jobDescription}
`;