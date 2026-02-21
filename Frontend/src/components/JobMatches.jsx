import { useEffect, useState } from "react";
import axios from "axios";
import { FaLinkedin, FaBriefcase, FaUserGraduate, FaTrophy } from "react-icons/fa";

export default function JobMatches() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://ai-resume-analyzer-7i9f.onrender.com/api/jobs/match")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setJobs(res.data);
        } else {
          setJobs([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load job matches");
        setLoading(false);
      });
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <>
      <h3>Matched Jobs</h3>

      {loading && <p>Analyzing best matches for you...</p>}

      {!loading && jobs.length === 0 && <p>No jobs matched yet</p>}

      {jobs.map((job, i) => (
        <div className="job-card" key={i}>
          <h4>{job?.title || "Untitled Job"}</h4>

          <p>
            <b>Match Score:</b> {job?.score ?? 0}%
          </p>

          <div className="skills">
            {(job?.matchedSkills || []).map((s, idx) => (
              <span key={idx} className="skill">
                {s}
              </span>
            ))}
          </div>

          <p className="reason">{job?.reason || "No reason provided"}</p>

          <div className="apply-buttons">
            {job?.links?.linkedin && (
              <a href={job.links.linkedin} target="_blank" rel="noreferrer">
                <button className="apply-btn linkedin">
                  <FaLinkedin /> LinkedIn
                </button>
              </a>
            )}

            {job?.links?.naukri && (
              <a href={job.links.naukri} target="_blank" rel="noreferrer">
                <button className="apply-btn naukri">
                  <FaBriefcase /> Naukri
                </button>
              </a>
            )}

            {job?.links?.internshala && (
              <a href={job.links.internshala} target="_blank" rel="noreferrer">
                <button className="apply-btn internshala">
                  <FaUserGraduate /> Internshala
                </button>
              </a>
            )}

            {job?.links?.unstop && (
              <a href={job.links.unstop} target="_blank" rel="noreferrer">
                <button className="apply-btn unstop">
                  <FaTrophy /> Unstop
                </button>
              </a>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
