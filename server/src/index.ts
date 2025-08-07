/*
    Fire Up
*/
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "";

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Mongodb failed to connect", err);
    process.exit(1);
  }
}

startServer();
