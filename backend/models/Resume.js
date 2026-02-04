import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  name: String,
  skills: [String],
  experience: String,
});

export default mongoose.model("Resume", resumeSchema);
