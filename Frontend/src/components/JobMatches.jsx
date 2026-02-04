import { useEffect, useState } from "react";
import axios from "axios";

export default function JobMatches() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/jobs/match")
      .then(res => {
        if (Array.isArray(res.data)) {
          setJobs(res.data);
        } else {
          setJobs([]);
        }
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load job matches");
      });
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <>
      <h3>Matched Jobs</h3>

      {jobs.length === 0 && <p>No jobs matched yet</p>}

      {jobs.map((job, i) => (
        <div className="job-card" key={i}>
          <h4>{job?.title || "Untitled Job"}</h4>

          <p>
            <b>Match Score:</b> {job?.score ?? 0}%
          </p>

          <div className="skills">
            {(job?.matchedSkills || []).map((s, idx) => (
              <span key={idx} className="skill">{s}</span>
            ))}
          </div>

          <p className="reason">{job?.reason || "No reason provided"}</p>

          <div className="apply-links">
            {(job?.links || []).map((link, idx) => (
              <a key={idx} href={link} target="_blank" rel="noreferrer">
                Apply
              </a>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

