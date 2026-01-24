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
import { apiLimiter } from "./middleware/rateLimiter";
import { sanitizeInput } from "./middleware/sanitizeInput";

// Load environment variables - only use .env file
const nodeEnv = process.env.NODE_ENV || "development";
const envPath = path.resolve(__dirname, "../../", ".env");

// Load .env file only
dotenv.config({ path: envPath });

const app = express();
const PORT = process.env.PORT || 4000;

// Security Middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
    crossOriginEmbedderPolicy: false, // Allow embedding for portfolio
  }),
);

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",").map((origin) =>
      origin.trim(),
    ) || ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Body parsing with size limits to prevent DoS
app.use(
  express.json({
    limit: "10mb", // Limit JSON payload size
    strict: true,
  }),
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb", // Limit URL-encoded payload size
    parameterLimit: 100, // Limit number of parameters
  }),
);

// Input sanitization (before routes)
app.use(sanitizeInput);

// Rate limiting (apply to all routes)
app.use("/api", apiLimiter);

// API info endpoint
app.get("/api", (req, res) => {
  res.json({
    message: "API is running",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      profile: "/api/profile",
      contact: "/api/contact",
    },
    example: "/api/profile",
  });
});

// Routes (frontend uses /api/profile singular)
app.use("/api/profile", profileRoutes);
app.use("/api/contact", contactRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// 404 handler (must be after all routes)
app.use((req, res) => {
  res.status(404).json({
    error: "Not found",
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// Error handling middleware (must be last, after all routes and 404 handler)
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

  // Always try to connect to database (MongoDB Atlas)
  // In production, require successful connection before starting server
  try {
    await connectDatabase();
    console.log("✅ Database connection established");
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB Atlas:", error);
    if (!isDevelopment) {
      console.error(
        "❌ Production mode requires database connection. Exiting...",
      );
      process.exit(1);
    } else {
      console.warn(
        "⚠️  Development mode: Server will start but database features may not work.",
      );
      console.warn(
        "💡 Make sure MONGODB_URI is set correctly in your .env file",
      );
    }
  }

  // Start the server
  const httpServer = app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
    console.log(`🏥 Health check: http://localhost:${PORT}/health`);
    console.log(`🌍 Environment: ${nodeEnv}`);
    if (isDevelopment) {
      console.log(
        `💡 To seed database: npm run seed (ensure MONGODB_URI is set)`,
      );
    }
  });

  // Graceful shutdown handler
  const gracefulShutdown = async (signal: string) => {
    console.log(`${signal} signal received: closing HTTP server gracefully`);

    // Close HTTP server
    httpServer.close(() => {
      console.log("HTTP server closed");

      // Close database connection
      const mongoose = require("mongoose");
      mongoose.connection.close(false, () => {
        console.log("MongoDB connection closed");
        process.exit(0);
      });
    });

    // Force close after 10 seconds
    setTimeout(() => {
      console.error("Forced shutdown after timeout");
      process.exit(1);
    }, 10000);
  };

  // Register shutdown handlers
  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGINT", () => gracefulShutdown("SIGINT"));

  // Handle uncaught exceptions
  process.on("uncaughtException", (error: Error) => {
    console.error("Uncaught Exception:", error);
    gracefulShutdown("uncaughtException");
  });

  // Handle unhandled promise rejections
  process.on("unhandledRejection", (reason: unknown) => {
    console.error("Unhandled Rejection:", reason);
    gracefulShutdown("unhandledRejection");
  });
};

startServer();
