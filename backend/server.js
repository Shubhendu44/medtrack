import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import medicineRoutes from "./routes/medicineRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

/* ==============================
   CORS CONFIGURATION
   Allows requests only from frontend
================================ */
app.use(
  cors({
    origin: "https://medtrack-amber.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

/* ==============================
   MIDDLEWARE
================================ */
app.use(express.json());

/* ==============================
   HEALTH ROUTE (for UptimeRobot)
================================ */
app.get("/", (req, res) => {
  res.send("MedTrack API running 🚀");
});

/* ==============================
   ROUTES
================================ */
app.use("/api/medicines", medicineRoutes);
app.use("/api/auth", authRoutes);

/* ==============================
   MONGODB CONNECTION
================================ */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Error:", err.message));

/* ==============================
   SERVER START
================================ */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});