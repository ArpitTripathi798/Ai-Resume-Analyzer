import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: String,
  requiredSkills: [String],
});

export default mongoose.model("Job", jobSchema);
