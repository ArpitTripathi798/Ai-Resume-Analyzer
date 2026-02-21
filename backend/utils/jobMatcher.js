export const matchJobs = (resumeSkills, jobs) => {
  if (!resumeSkills?.length || !jobs?.length) return [];

  return jobs
    .map((job) => {
      const matched = job.requiredSkills.filter((skill) =>
        resumeSkills.includes(skill)
      );

      const score = job.requiredSkills.length
        ? Math.round((matched.length / job.requiredSkills.length) * 100)
        : 0;

      const q = encodeURIComponent(job.title);

      const links = {
        linkedin: `https://www.linkedin.com/jobs/search/?keywords=${q}`,
        naukri: `https://www.naukri.com/${job.title
          .toLowerCase()
          .replace(/\s+/g, "-")}-jobs`,
        internshala: `https://internshala.com/jobs/keywords-${q}`,
        unstop: `https://unstop.com/jobs?search=${q}`,
      };

      return {
        title: job.title,
        requiredSkills: job.requiredSkills,
        matchedSkills: matched,
        score,
        reason:
          matched.length > 0
            ? "Matched based on skill overlap"
            : "Low skill match",
        links,
      };
    })
    .filter((j) => j.score > 0)
    .sort((a, b) => b.score - a.score);
};