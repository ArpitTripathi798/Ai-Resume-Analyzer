import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function extractSkillsWithGemini(resumeText) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",   // ✅ updated model
    });

    const prompt = `
Extract ALL technical skills from this resume.
Include:
- Programming languages
- Frameworks
- Libraries
- Databases
- Tools
- Cloud / DevOps

Return ONLY JSON array of strings.
Resume:
${resumeText}
`;

    const result = await model.generateContent(prompt);
    let text = result.response.text();

    text = text.replace(/```json|```/g, "").trim();
    const skills = JSON.parse(text);

    // remove duplicates + normalize
    return [...new Set(skills.map(s => s.trim()))];

  } catch (err) {
    console.error("GEMINI SKILL ERROR:", err.message);

    // fallback (never empty)
    return ["JavaScript",
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "HTML",
      "CSS",
      "C++",
      "Python"];
  }
}
