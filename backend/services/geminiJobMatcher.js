import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function buildApplyLinks(title) {
  const q = encodeURIComponent(title);

  return {
    linkedin: `https://www.linkedin.com/jobs/search/?keywords=${q}`,
    naukri: `https://www.naukri.com/${title
      .toLowerCase()
      .replace(/\s+/g, "-")}-jobs`,
    internshala: `https://internshala.com/jobs/keywords-${q}`,
    unstop: `https://unstop.com/jobs?search=${q}`,
  };
}

export async function matchJobsWithGemini(resume, jobs) {
  if (!jobs.length || !resume) return [];

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

    const prompt = `
Resume skills:
${resume.skills.join(", ")}

Jobs:
${jobs
  .map(
    (j) =>
      `Title: ${j.title}, Skills: ${j.requiredSkills.join(", ")}`
  )
  .join("\n")}

Return JSON:
[
  {
    "title": "",
    "score": 0-100,
    "matchedSkills": [],
    "reason": ""
  }
]
`;

    const result = await model.generateContent(prompt);

    let text = result.response.text();
    text = text.replace(/```json|```/g, "").trim();

    const aiMatches = JSON.parse(text);

    return aiMatches.map((job) => ({
      ...job,
      links: buildApplyLinks(job.title),
    }));
  } catch (err) {
    console.error("JOB MATCH AI FAIL:", err.message);

    // Flexible fallback matching (FIXED)
    return jobs
      .map((job) => {
        const matchedSkills = job.requiredSkills.filter((skill) =>
          resume.skills.some((rSkill) =>
            rSkill.toLowerCase().includes(skill.toLowerCase()) ||
            skill.toLowerCase().includes(rSkill.toLowerCase())
          )
        );

        const score = job.requiredSkills.length
          ? Math.round(
              (matchedSkills.length / job.requiredSkills.length) * 100
            )
          : 0;

        return {
          title: job.title,
          score,
          matchedSkills,
          reason: "Matched based on skill similarity",
          links: buildApplyLinks(job.title),
        };
      })
      .filter((job) => job.score > 0);
  }
}