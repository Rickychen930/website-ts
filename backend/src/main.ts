import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import helmet from "helmet";
import http from "http";
import https from "https";
import path from "path";
import { connectDB } from "./config/mongoose";
import { apiRateLimiter } from "./middleware/rate-limiter";
import contactRoutes from "./routes/contact-routes";
import userRoutes from "./routes/user-routes";
import { getEnvNumber, validateEnv } from "./utils/env-validator";
import { logger } from "./utils/logger";

// ✅ Load .env
// Try multiple locations: backend/.env, root/.env, and current directory
const possibleEnvPaths = [
  path.join(__dirname, "../../.env"), // Root of project
  path.join(__dirname, "../.env"), // Backend directory
  path.join(process.cwd(), ".env"), // Current working directory
  "/root/backend/.env", // Server location
];

let envPath: string | null = null;
for (const possiblePath of possibleEnvPaths) {
  if (fs.existsSync(possiblePath)) {
    envPath = possiblePath;
    break;
  }
}

if (envPath) {
  dotenv.config({ path: envPath });
  logger.info(".env loaded", { path: envPath }, "Main");
} else {
  logger.warn(
    ".env file not found in any of these locations",
    {
      searched: possibleEnvPaths,
    },
    "Main",
  );
  // Try to load from environment variables directly (for production deployments)
  logger.info(
    "Attempting to use environment variables directly",
    undefined,
    "Main",
  );
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
        // Allow API connections from same origin and configured origins
        connectSrc: [
          "'self'",
          ...(allowedOrigins.length > 0 ? allowedOrigins : []),
        ],
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
    // Allow requests with no origin (mobile apps, curl, server-to-server, nginx proxy)
    // This is important for nginx proxy which may not send origin header
    if (!origin) {
      logger.info(
        "CORS: Allowing request with no origin (likely server-to-server)",
        undefined,
        "Main",
      );
      return callback(null, true);
    }

    // Normalize origin (remove trailing slash)
    const normalizedOrigin = origin.replace(/\/$/, "");

    // Check if origin is in allowed list
    const isAllowed = allowedOrigins.some((allowed) => {
      const normalizedAllowed = allowed.replace(/\/$/, "");
      return normalizedOrigin === normalizedAllowed;
    });

    if (isAllowed) {
      logger.info(
        "CORS: Allowing origin",
        { origin: normalizedOrigin },
        "Main",
      );
      callback(null, true);
    } else {
      logger.warn(
        "CORS blocked origin",
        {
          origin: normalizedOrigin,
          allowedOrigins,
        },
        "Main",
      );
      callback(new Error(`Not allowed by CORS: ${normalizedOrigin}`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "X-Forwarded-For",
    "X-Real-IP",
  ],
  exposedHeaders: ["Content-Length", "Content-Type"],
  optionsSuccessStatus: 200,
  maxAge: 86400, // 24 hours
};

app.use(cors(corsOptions));

// ✅ Apply general API rate limiting (before routes)
app.use("/api", apiRateLimiter.middleware());

// ✅ API info endpoint
app.get("/api", (_, res) => {
  res.status(200).json({
    message: "API is running",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      user: "/api/:name",
      contact: "/api/contact",
    },
    example: "/api/Ricky%20Chen",
  });
});

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

// ✅ Fallback route - catch all unmatched API routes (must be before static files)
app.use((req, res, next) => {
  // Only handle unmatched API routes
  if (req.path.startsWith("/api") && !res.headersSent) {
    res.status(404).json({
      message: "API route not found",
      path: req.path,
      method: req.method,
    });
  } else {
    next();
  }
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
