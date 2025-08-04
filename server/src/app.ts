/*
    Server
*/
import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.route";
import movieRoutes from "./routes/movie.route";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

app.use("/health", (_req, res) => {
  res.status(200).json({ message: "Healthy" });
});

export default app;
