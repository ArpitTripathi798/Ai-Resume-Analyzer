import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import resumeRoutes from "./routes/resumeRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

dotenv.config();

const app = express();

//  Optimized middlewares
app.use(cors());
app.use(express.json({ limit: "2mb" }));

//  Health route (fast check)
app.get("/", (req, res) => {
  res.json({ status: "Server running" });
});

app.use("/api/resume", resumeRoutes);
app.use("/api/jobs", jobRoutes);

const PORT = process.env.PORT || 5000;

// Faster Mongo settings
mongoose
  .connect(process.env.MONGO_URI, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server running on ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });
