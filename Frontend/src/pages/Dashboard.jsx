import { useState } from "react";
import ResumeUpload from "../components/ResumeUpload";
import JobMatches from "../components/JobMatches";

export default function Dashboard() {
  const [resumeUploaded, setResumeUploaded] = useState(false);

  return (
    <div className="container">
      <h1>AI Resume Analyzer & Job Matcher</h1>

      <ResumeUpload onUploaded={setResumeUploaded} />

      <hr />

      {resumeUploaded ? (
        <JobMatches />
      ) : (
        <p style={{ textAlign: "center", color: "#6b7280" }}>
          Upload resume to see job matches
        </p>
      )}
    </div>
  );
}



