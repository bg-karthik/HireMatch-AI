# HireMatch AI — Resume ATS Analyzer

HireMatch AI is a modern AI-powered Resume ATS Analyzer built with the MERN stack and Gemini AI. The platform helps job seekers improve their resumes by analyzing ATS compatibility, extracting keywords, and generating AI-driven optimization suggestions.

---

# Features

- Resume Upload (PDF / DOC / DOCX)
- ATS Compatibility Score
- AI-Powered Resume Suggestions
- Keyword Matching & Missing Skills Detection
- Secure JWT Authentication
- Responsive Modern UI
- Resume Text Extraction
- Gemini AI Integration
- Protected Routes

---

# Tech Stack

## Frontend
- React.js
- React Router DOM
- CSS3
- Vite

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- PDF Parser

## AI Integration
- Google Gemini AI API

---

# Project Structure

```txt
hirematch-AI/
│
├── client/                 # Frontend
│   ├── src/
│   └── ...
│
├── server/                 # Backend
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── ...
│
├── README.md
├── .gitignore
└── package.json
```

---

# Installation

## 1. Clone Repository

```bash
git clone https://github.com/your-username/hirematch-AI.git
```

---

## 2. Install Frontend Dependencies

```bash
cd client
npm install
```

---

## 3. Install Backend Dependencies

```bash
cd ../server
npm install
```

---

# Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
```

---

# Running the Application

## Frontend

```bash
cd client
npm run dev
```

## Backend

```bash
cd server
npm run dev
```

---

# ATS Analysis Workflow

1. User uploads resume
2. Resume text is extracted
3. Keywords are analyzed
4. ATS score is calculated
5. Gemini AI generates optimization suggestions
6. Results are displayed in dashboard

---

# Core Functionalities

## Authentication
- User Registration
- User Login
- JWT-based Authentication
- Protected Routes

## Resume Analysis
- Resume Parsing
- Keyword Extraction
- ATS Score Calculation
- Missing Skill Detection
- AI Optimization Suggestions

---

# Future Improvements

- Job Description Upload
- Resume Download
- Resume History
- Dashboard Analytics
- Multi-Resume Comparison
- AI Resume Builder
- Interview Preparation Assistant

---

# Screenshots

Add project screenshots here.

---

# Deployment

## Frontend
- Vercel
- Netlify

## Backend
- Render
- Railway

## Database
- MongoDB Atlas

---

# Author

Karthik

---

# License

This project is licensed under the MIT License.