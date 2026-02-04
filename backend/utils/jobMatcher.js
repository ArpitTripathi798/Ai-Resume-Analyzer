export const matchJobs = (resumeSkills, jobs) => {
  return jobs.map(job => {
    const matched = job.requiredSkills.filter(skill =>
      resumeSkills.includes(skill)
    );

    const score = Math.round(
      (matched.length / job.requiredSkills.length) * 100
    );

    return { job, score };
  }).sort((a, b) => b.score - a.score);
};
