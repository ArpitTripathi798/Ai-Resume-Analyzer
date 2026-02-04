import express from "express";
import { getMatchedJobs } from "../controllers/jobController.js";

const router = express.Router();

router.get("/match", getMatchedJobs);

export default router;
