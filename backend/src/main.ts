import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import fs from "fs";
import https from "https";
import http from "http";
import path from "path";
import { connectDB } from "./config/mongoose";
import userRoutes from "./routes/user-routes";

// ✅ Load .env
const envPath = path.join(__dirname, "../../.env");
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log("✅ .env loaded from", envPath);
} else {
  console.warn("⚠️ .env file not found at", envPath);
}

// ✅ Environment variables
const PORT = Number(process.env.PORT) || 4000;
const mongoUri = process.env.MONGODB_URI;
const NODE_ENV = process.env.NODE_ENV || "development";

if (!mongoUri) {
  throw new Error("❌ MONGODB_URI is not defined in .env");
}

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

// ✅ Security middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ✅ CORS setup
const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) {
      return callback(null, true);
    }
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`❌ CORS blocked origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// ✅ API Routes (must be before static files)
app.use("/api", userRoutes);

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
  app.use(express.static(buildPath, {
    maxAge: "1y", // Cache static assets for 1 year
    etag: true,
  }));

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
app.use("/api/:path(*)", (req, res) => {
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
      console.log("✅ SSL certificates loaded");
    } catch (error) {
      console.error("❌ Failed to load SSL certificates:", error);
    }
  } else {
    console.warn("⚠️ SSL certificate paths specified but files not found");
  }
}

// ✅ Create server
const server = sslOptions
  ? https.createServer(sslOptions, app)
  : http.createServer(app);

// ✅ Connect to database before starting server
connectDB(mongoUri)
  .then(() => {
    console.log("✅ MongoDB connected");
    startServer();
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });

function startServer() {
  server.listen(PORT, "0.0.0.0", () => {
    const protocol = sslOptions ? "https" : "http";
    console.log(`🚀 Backend running at ${protocol}://0.0.0.0:${PORT}`);
    console.log(`📦 Environment: ${NODE_ENV}`);
    console.log(`🌐 CORS allowed origins: ${allowedOrigins.join(", ")}`);
  });

  // ✅ Graceful shutdown
  process.on("SIGTERM", () => {
    console.log("SIGTERM signal received: closing HTTP server");
    server.close(() => {
      console.log("HTTP server closed");
      process.exit(0);
    });
  });

  process.on("SIGINT", () => {
    console.log("SIGINT signal received: closing HTTP server");
    server.close(() => {
      console.log("HTTP server closed");
      process.exit(0);
    });
  });
}
