import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";

dotenv.config();

const app = express();

/* =========================================
   MIDDLEWARE
========================================= */

app.use(
  cors({
    origin: "*",
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    credentials: true,
  })
);

app.use(express.json());

/* =========================================
   MONGODB CONNECTION
========================================= */

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(
      "✅ MongoDB connected"
    );
  })
  .catch((err) => {
    console.error(
      "❌ MongoDB error:",
      err.message
    );
  });

/* =========================================
   TEST ROUTE
========================================= */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "🚀 HireMatch AI API Running",
  });
});

/* =========================================
   ROUTES
========================================= */

app.use("/auth", authRoutes);

app.use("/resume", resumeRoutes);

/* =========================================
   404 HANDLER
========================================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* =========================================
   SERVER
========================================= */

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `✅ Server running on port ${PORT}`
  );
});