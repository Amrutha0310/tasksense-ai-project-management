import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import connectDB from "./src/config/db.js";
import cloudinary from "./src/config/cloudinary.js";

// Routes
import authRouter from "./src/routes/authRoutes.js";
import projectRouter from "./src/routes/projectRoutes.js";
import taskRouter from "./src/routes/taskRoutes.js";
// import aiRouter from "./src/routes/aiRoutes.js";

const app = express();


// =====================
// Middlewares
// =====================

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));


// =====================
// Routes
// =====================

app.use("/api/auth", authRouter);
app.use("/api/projects", projectRouter);
app.use("/api/tasks", taskRouter);
// app.use("/api/ai", aiRouter);


// =====================
// Test Route
// =====================

app.get("/", (req, res) => {
  res.send("TaskSense AI Backend Running 🚀");
});


// =====================
// Global Error Handler
// =====================

app.use((err, req, res, next) => {

  const message = err.message || "Internal Server Error";
  const status = err.statusCode || 500;

  console.error("Error:", message);

  res.status(status).json({
    success: false,
    message
  });

});


// =====================
// Start Server
// =====================

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {

  console.log(`Server running on port ${PORT}`);

  // connect database
  await connectDB();

  // check cloudinary connection
  try {

    const result = await cloudinary.api.ping();
    console.log("Cloudinary Connected:", result);

  } catch (error) {

    console.error("Cloudinary Connection Failed:", error);

  }

});