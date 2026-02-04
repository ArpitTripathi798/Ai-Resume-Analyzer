import Resume from "../models/Resume.js";
import Job from "../models/Job.js";
import { matchJobsWithGemini } from "../services/geminiJobMatcher.js";

export const getMatchedJobs = async (req, res) => {
  try {
    const resume = await Resume.findOne().sort({ createdAt: -1 });
    if (!resume) {
      return res.json([]); // 🔑 never 404
    }

    const jobs = await Job.find();
    const matches = await matchJobsWithGemini(resume, jobs);

    res.json(matches);
  } catch (err) {
    console.error("JOB MATCH CONTROLLER ERROR:", err.message);
    res.json([]); // 🔑 NEVER send 500 to frontend
  }
};

