import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function extractSkillsWithGemini(resumeText) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
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
${resumeText.slice(0, 6000)}
`;

    // ⚡ Fast response with timeout
    const geminiPromise = model.generateContent(prompt);

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Gemini timeout")), 4000)
    );

    const result = await Promise.race([geminiPromise, timeoutPromise]);

    let text = result.response.text();
    text = text.replace(/```json|```/g, "").trim();

    let skills = [];

    try {
      skills = JSON.parse(text);
    } catch {
      skills = [];
    }

    if (!Array.isArray(skills) || skills.length === 0) {
      throw new Error("Invalid Gemini response");
    }

    // remove duplicates + normalize
    return [...new Set(skills.map((s) => s.trim()))];
  } catch (err) {
    console.error("GEMINI SKILL ERROR:", err.message);

    // ⚡ Safe fast fallback (never empty)
    return [
      "JavaScript",
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "HTML",
      "CSS",
      "C++",
      "Python",
    ];
  }
}
