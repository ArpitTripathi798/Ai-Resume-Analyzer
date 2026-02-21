export const extractSkills = (text = "") => {
  if (!text) return [];

  const normalizedText = text.toLowerCase();

  const skills = [
    "javascript",
    "react",
    "node",
    "node.js",
    "mongodb",
    "express",
    "html",
    "css",
    "bootstrap",
    "tailwind",
    "python",
    "java",
    "c++",
    "c",
    "typescript",
    "next",
    "redux",
    "mysql",
    "postgresql",
    "firebase",
    "aws",
    "docker",
    "git",
    "github"
  ];

  const detected = skills.filter(skill =>
    normalizedText.includes(skill)
  );

  // remove duplicates & normalize casing
  return [...new Set(detected.map(s => s.toUpperCase()))];
};