import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-resume-analyzer-7i9f.onrender.com/api",
  timeout: 8000, // ⚡ prevent long waiting
});

// Faster upload with progress support
export const uploadResume = (formData, onUploadProgress) =>
  API.post("/resume/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });

//  Quick job fetch
export const getJobMatches = () =>
  API.get("/jobs/match");