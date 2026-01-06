import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import fs from "fs";
import https from "https";
import http from "http";
import path from "path";
import { connectDB } from "./config/mongoose";
import userRoutes from "./routes/user-routes";
import contactRoutes from "./routes/contact-routes";
import { logger } from "./utils/logger";
import { validateEnv, getEnvNumber } from "./utils/env-validator";
import { apiRateLimiter } from "./middleware/rate-limiter";

// ✅ Load .env
const envPath = path.join(__dirname, "../../.env");
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  logger.info(".env loaded", { path: envPath }, "Main");
} else {
  logger.warn(".env file not found", { path: envPath }, "Main");
}

// ✅ Validate environment variables
const envValidation = validateEnv();
if (!envValidation.isValid) {
  logger.error(
    "Environment validation failed",
    { errors: envValidation.errors },
    "Main",
  );
  process.exit(1);
}

// ✅ Environment variables
const PORT = getEnvNumber("PORT", 4000);
const mongoUri = process.env.MONGODB_URI!; // Validated by env-validator
const NODE_ENV = process.env.NODE_ENV || "development";

// ✅ CORS origins from environment variable
const allowedOriginsEnv = process.env.ALLOWED_ORIGINS;
const allowedOrigins = allowedOriginsEnv
  ? allowedOriginsEnv.split(",").map((origin) => origin.trim())
  : [
      "http://localhost:3000",
      "http://localhost:4000",
      "http://rickychen930.cloud",
      "https://rickychen930.cloud",
    ];

// ✅ SSL configuration from environment variables
const SSL_CERT_PATH = process.env.SSL_CERT_PATH;
const SSL_KEY_PATH = process.env.SSL_KEY_PATH;

// ✅ Express setup
const app = express();

// ✅ Security headers with Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        frameSrc: ["'none'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: NODE_ENV === "production" ? [] : null,
      },
    },
    crossOriginEmbedderPolicy: false, // Allow external resources
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

// ✅ Security middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ✅ CORS setup
const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) {
      return callback(null, true);
    }
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      logger.warn("CORS blocked origin", { origin }, "Main");
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// ✅ Apply general API rate limiting (before routes)
app.use("/api", apiRateLimiter.middleware());

// ✅ API Routes (must be before static files)
app.use("/api", userRoutes);
app.use("/api/contact", contactRoutes);

// ✅ Health check endpoint
app.get("/health", (_, res) => {
  res.status(200).json({
    status: "ok",
    env: NODE_ENV,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// ✅ Serve static files from React build (production only)
const buildPath = path.join(__dirname, "../../build");
if (NODE_ENV === "production" && fs.existsSync(buildPath)) {
  // Serve static files
  app.use(
    express.static(buildPath, {
      maxAge: "1y", // Cache static assets for 1 year
      etag: true,
    }),
  );

  // Handle React Router - serve index.html for all non-API routes
  app.get("*", (req, res, next) => {
    // Skip API routes
    if (req.path.startsWith("/api")) {
      return next();
    }
    // Serve index.html for SPA routing
    res.sendFile(path.join(buildPath, "index.html"));
  });
} else {
  // Development mode - simple root route
  app.get("/", (_, res) => {
    res.json({
      message: "🔐 Backend API is running 🚀",
      env: NODE_ENV,
      docs: "/api",
    });
  });
}

// ✅ Fallback route - catch all unmatched API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({
    message: "API route not found",
    path: req.path,
    method: req.method,
  });
});

// ✅ SSL configuration
let sslOptions: { key: Buffer; cert: Buffer } | undefined;
if (NODE_ENV === "production" && SSL_KEY_PATH && SSL_CERT_PATH) {
  if (fs.existsSync(SSL_KEY_PATH) && fs.existsSync(SSL_CERT_PATH)) {
    try {
      sslOptions = {
        key: fs.readFileSync(SSL_KEY_PATH),
        cert: fs.readFileSync(SSL_CERT_PATH),
      };
      logger.info("SSL certificates loaded", undefined, "Main");
    } catch (error) {
      logger.error("Failed to load SSL certificates", error, "Main");
    }
  } else {
    logger.warn(
      "SSL certificate paths specified but files not found",
      undefined,
      "Main",
    );
  }
}

// ✅ Create server
const server = sslOptions
  ? https.createServer(sslOptions, app)
  : http.createServer(app);

// ✅ Connect to database before starting server
connectDB(mongoUri)
  .then(() => {
    logger.info("MongoDB connected", undefined, "Main");
    startServer();
  })
  .catch((err) => {
    logger.error("MongoDB connection failed", err, "Main");
    process.exit(1);
  });

function startServer() {
  server.listen(PORT, "0.0.0.0", () => {
    const protocol = sslOptions ? "https" : "http";
    logger.info(
      "Backend server started",
      {
        protocol,
        port: PORT,
        env: NODE_ENV,
        origins: allowedOrigins,
      },
      "Main",
    );
  });

  // ✅ Graceful shutdown
  process.on("SIGTERM", () => {
    logger.info(
      "SIGTERM signal received: closing HTTP server",
      undefined,
      "Main",
    );
    server.close(() => {
      logger.info("HTTP server closed", undefined, "Main");
      process.exit(0);
    });
  });

  process.on("SIGINT", () => {
    logger.info(
      "SIGINT signal received: closing HTTP server",
      undefined,
      "Main",
    );
    server.close(() => {
      logger.info("HTTP server closed", undefined, "Main");
      process.exit(0);
    });
  });
}
