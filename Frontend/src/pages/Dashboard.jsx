import { useState } from "react";
import ResumeUpload from "../components/ResumeUpload";
import JobMatches from "../components/JobMatches";

export default function Dashboard() {
  const [resumeUploaded, setResumeUploaded] = useState(false);

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>
        AI Resume Analyzer
      </h1>

      <p style={{ textAlign: "center", color: "#6b7280", marginBottom: "20px" }}>
        Upload your resume and instantly discover matching job opportunities
      </p>

      <ResumeUpload onUploaded={setResumeUploaded} />

      <hr style={{ margin: "30px 0" }} />

      {resumeUploaded ? (
        <JobMatches />
      ) : (
        <p style={{ textAlign: "center", color: "#6b7280" }}>
          Upload your resume to view personalized job matches
        </p>
      )}
    </div>
  );
}
