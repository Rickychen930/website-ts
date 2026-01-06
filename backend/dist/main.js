"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = require("./config/mongoose");
const user_routes_1 = __importDefault(require("./routes/user-routes"));
// ✅ Load .env
const envPath = path_1.default.join(__dirname, "../../.env");
if (fs_1.default.existsSync(envPath)) {
    dotenv_1.default.config({ path: envPath });
    console.log("✅ .env loaded from", envPath);
}
else {
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
const app = (0, express_1.default)();
// ✅ Security middleware
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
// ✅ CORS setup
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, curl, etc.)
        if (!origin) {
            return callback(null, true);
        }
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            console.warn(`❌ CORS blocked origin: ${origin}`);
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
// ✅ API Routes (must be before static files)
app.use("/api", user_routes_1.default);
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
const buildPath = path_1.default.join(__dirname, "../../build");
if (NODE_ENV === "production" && fs_1.default.existsSync(buildPath)) {
    // Serve static files
    app.use(express_1.default.static(buildPath, {
        maxAge: "1y",
        etag: true,
    }));
    // Handle React Router - serve index.html for all non-API routes
    app.get("*", (req, res, next) => {
        // Skip API routes
        if (req.path.startsWith("/api")) {
            return next();
        }
        // Serve index.html for SPA routing
        res.sendFile(path_1.default.join(buildPath, "index.html"));
    });
}
else {
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
let sslOptions;
if (NODE_ENV === "production" && SSL_KEY_PATH && SSL_CERT_PATH) {
    if (fs_1.default.existsSync(SSL_KEY_PATH) && fs_1.default.existsSync(SSL_CERT_PATH)) {
        try {
            sslOptions = {
                key: fs_1.default.readFileSync(SSL_KEY_PATH),
                cert: fs_1.default.readFileSync(SSL_CERT_PATH),
            };
            console.log("✅ SSL certificates loaded");
        }
        catch (error) {
            console.error("❌ Failed to load SSL certificates:", error);
        }
    }
    else {
        console.warn("⚠️ SSL certificate paths specified but files not found");
    }
}
// ✅ Create server
const server = sslOptions
    ? https_1.default.createServer(sslOptions, app)
    : http_1.default.createServer(app);
// ✅ Connect to database before starting server
(0, mongoose_1.connectDB)(mongoUri)
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
