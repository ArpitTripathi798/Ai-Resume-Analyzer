import Resume from "../models/Resume.js";
import Job from "../models/Job.js";
import { matchJobsWithGemini } from "../services/geminiJobMatcher.js";

export const getMatchedJobs = async (req, res) => {
  try {
    const resume = await Resume.findOne().sort({ createdAt: -1 });
    if (!resume) {
      return res.json([]);
    }

    const jobs = await Job.find();
    if (!jobs.length) {
      return res.json([]);
    }

    const matches = await matchJobsWithGemini(resume, jobs);

    // Add platform links dynamically (LinkedIn, Naukri, Internshala, Unstop)
    const enhancedMatches = matches.map((job) => {
      const encodedTitle = encodeURIComponent(job.title);

      return {
        ...job,
        links: {
          linkedin: `https://www.linkedin.com/jobs/search/?keywords=${encodedTitle}`,
          naukri: `https://www.naukri.com/${job.title
            .toLowerCase()
            .replace(/\s+/g, "-")}-jobs`,
          internshala: `https://internshala.com/jobs/keywords-${encodedTitle}`,
          unstop: `https://unstop.com/jobs?search=${encodedTitle}`,
        },
      };
    });

    res.json(enhancedMatches);
  } catch (err) {
    console.error("JOB MATCH CONTROLLER ERROR:", err.message);
    res.json([]);
  }
};
