import express from "express";
import upload from "../utils/upload.js";
import { analyzeResumePDF } from "../controllers/resumeController.js";

const router = express.Router();

// 🔑 resume MUST match frontend
router.post("/upload", upload.single("resume"), analyzeResumePDF);

export default router;
