import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-resume-analyzer.onrender.com/api",
});

export const uploadResume = (formData) =>
  API.post("/resume/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getJobMatches = () =>
  API.get("/jobs/match");
