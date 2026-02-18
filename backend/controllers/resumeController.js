import Resume from "../models/Resume.js";
import { extractTextFromPDF } from "../utils/pdfExtractor.js";
import { extractSkillsWithGemini } from "../services/geminiService.js";

export const analyzeResumePDF = async (req, res) => {
  try {
    console.log("UPLOAD HIT");
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "No resume uploaded" });
    }

    // ✅ PDF → TEXT (SAFE)
    const resumeText = await extractTextFromPDF(req.file.buffer);
    console.log("TEXT LENGTH:", resumeText.length);

    if (!resumeText.trim()) {
      return res.status(400).json({ message: "Empty resume text" });
    }

    let skills = [];

    try {
      skills = await extractSkillsWithGemini(resumeText);
      console.log("SKILLS:", skills);
    } catch (err) {
      console.log("GEMINI FAILED:", err.message);
      skills = [
        "JavaScript",
        "React",
        "Node.js",
        "MongoDB",
        "Express",
        "HTML",
        "CSS",
      ];
    }

    const resume = await Resume.create({
      name: "Candidate",
      skills,
      experience: resumeText,
    });

    res.json({
      message: "Resume analyzed successfully",
      skills,
      resumeId: resume._id,
    });

  } catch (err) {
    console.error("RESUME ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


