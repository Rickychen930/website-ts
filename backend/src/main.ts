/**
 * Backend Entry Point
 */

import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import path from "path";
import { connectDatabase } from "./config/database";
import profileRoutes from "./routes/profileRoutes";
import contactRoutes from "./routes/contactRoutes";

// Load environment variables based on NODE_ENV
const nodeEnv = process.env.NODE_ENV || "development";
const envFile = `.env.${nodeEnv}`;
const envPath = path.resolve(__dirname, "../../", envFile);

// Load environment-specific .env file, fallback to .env
dotenv.config({ path: envPath });
dotenv.config(); // Load .env as fallback

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || [
      "http://localhost:3000",
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/profile", profileRoutes);
app.use("/api/contact", contactRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not found",
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error("❌ Error:", err);
    console.error("Request path:", req.path);
    console.error("Request method:", req.method);

    // Don't leak error details in production
    const isDevelopment = nodeEnv === "development";
    res.status(500).json({
      error: "Internal server error",
      message: isDevelopment ? err.message : undefined,
      stack: isDevelopment ? err.stack : undefined,
    });
  },
);

// Start server
const startServer = async () => {
  const isDevelopment = nodeEnv === "development";

  // In development, try to connect but don't block server startup
  if (isDevelopment) {
    connectDatabase().catch(() => {
      // Connection will retry in the background
    });
  } else {
    // In production, wait for database connection
    try {
      await connectDatabase();
    } catch (error) {
      console.error("❌ Failed to connect to database:", error);
      process.exit(1);
    }
  }

  // Start the server regardless of database connection status in development
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
    console.log(`🏥 Health check: http://localhost:${PORT}/health`);
    console.log(`🌍 Environment: ${nodeEnv}`);
  });
};

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM signal received: closing HTTP server");
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("SIGINT signal received: closing HTTP server");
  process.exit(0);
});

startServer();
