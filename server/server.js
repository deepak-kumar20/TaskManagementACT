import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

// Validate required environment variables
if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET is not set in environment variables");
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      // In production, process.env.CLIENT_URL might have a trailing flash or be missing
      const clUrl = process.env.CLIENT_URL
        ? process.env.CLIENT_URL.replace(/\/$/, "")
        : "http://localhost:5173";

      const allowedOrigins = [
        clUrl,
        "http://localhost:5173",
        "http://localhost:3000",
        "https://task-management-act.vercel.app", // Hardcoded fallback for your Vercel app
      ];

      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ CORS Blocked:", origin);
        callback(null, false); // Don't throw error, just don't set headers (fixes 500 error on preflight)
      }
    },
    credentials: true,
  }),
);

// Routes
app.use("/api", authRoutes);

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "✅ API Running",
    timestamp: new Date().toISOString(),
    version: "2.0.0",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Start server
(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`📡 API: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
})();
