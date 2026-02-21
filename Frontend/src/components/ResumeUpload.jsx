import { useState } from "react";
import axios from "axios";

export default function ResumeUpload({ onUploaded }) {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progressText, setProgressText] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      setProgressText("Uploading resume...");

      // small delay for smooth UX
      setTimeout(() => {
        setProgressText("Analyzing skills...");
      }, 600);

      const res = await axios.post(
         "https://ai-resume-analyzer-7i9f.onrender.com/api/resume/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setSkills(res.data.skills || []);
      onUploaded(true);
    } catch (err) {
      console.error(err);
      alert("Resume upload failed");
      onUploaded(false);
    } finally {
      setLoading(false);
      setProgressText("");
    }
  };

  return (
    <>
      <h3>Upload Resume (PDF)</h3>

      <label className="upload-box">
        Choose Resume
        <input type="file" accept=".pdf" onChange={handleUpload} hidden />
      </label>

      {loading && <p>{progressText}</p>}

      <h3>Detected Skills</h3>

      {skills.length === 0 && !loading && (
        <p>No skills detected yet</p>
      )}

      <div className="skills">
        {skills.map((skill, i) => (
          <span className="skill" key={i}>
            {skill}
          </span>
        ))}
      </div>
    </>
  );
}
