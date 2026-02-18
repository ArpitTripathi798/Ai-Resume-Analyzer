import { useState } from "react";
import axios from "axios";

export default function ResumeUpload({ onUploaded }) {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      const res = await axios.post(
        "https://ai-resume-analyzer-7i9f.onrender.com/api/resume/upload",
        formData
      );

      setSkills(res.data.skills || []);
      onUploaded(true);
    } catch (err) {
      console.error(err);
      alert("Resume upload failed");
      onUploaded(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3>Upload Resume (PDF)</h3>
      <input type="file" accept=".pdf" onChange={handleUpload} />

      {loading && <p>Analyzing resume...</p>}

      <h3>Detected Skills</h3>
      {skills.length === 0 && !loading && <p>No skills detected yet</p>}

      {skills.map((skill, i) => (
        <span className="skill" key={i}>{skill}</span>
      ))}
    </>
  );
}
