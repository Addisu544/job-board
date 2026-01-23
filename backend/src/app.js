import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import jobRoutes from "../src/routes/job.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import applicationRoutes from "./routes/application.routes.js";

// app.use("/api/profile", profileRoutes);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api", applicationRoutes);

export default app;
