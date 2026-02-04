import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function buildApplyLinks(title) {
  const q = encodeURIComponent(title);
  return [
    `https://www.naukri.com/${q}-jobs`,
    `https://www.linkedin.com/jobs/search/?keywords=${q}`,
    `https://careers.google.com/jobs/results/?q=${q}`,
    `https://unstop.com/jobs?search=${q}`
  ];
}

export async function matchJobsWithGemini(resume, jobs) {
  if (!jobs.length) return [];

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

    const prompt = `
Resume skills:
${resume.skills.join(", ")}

Jobs:
${jobs.map(j =>
  `Title: ${j.title}, Skills: ${j.requiredSkills.join(", ")}`
).join("\n")}

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

    return aiMatches.map(job => ({
      ...job,
      links: buildApplyLinks(job.title)
    }));

  } catch (err) {
    console.error("JOB MATCH AI FAIL:", err.message);

    // fallback (rule based)
    return jobs.map(job => {
      const matchedSkills = job.requiredSkills.filter(s =>
        resume.skills.includes(s)
      );

      return {
        title: job.title,
        score: Math.round((matchedSkills.length / job.requiredSkills.length) * 100),
        matchedSkills,
        links: buildApplyLinks(job.title),
        reason: "Matched based on skill overlap"
      };
    }).filter(j => j.score > 0);
  }
}



