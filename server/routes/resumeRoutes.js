import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import { upload } from "../middleware/upload.js";

import {
  uploadResume,
  analyzeResume,
} from "../controllers/resumeController.js";

const router = express.Router();

// Upload PDF Resume
router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  uploadResume
);

// Analyze Resume
router.post(
  "/analyze",
  authMiddleware,
  analyzeResume
);

export default router;