
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = require("./config/mongoose");
const user_routes_1 = __importDefault(require("./routes/user-routes"));
const contact_routes_1 = __importDefault(require("./routes/contact-routes"));
const logger_1 = require("./utils/logger");
const env_validator_1 = require("./utils/env-validator");
const rate_limiter_1 = require("./middleware/rate-limiter");
// ✅ Load .env
const envPath = path_1.default.join(__dirname, "../../.env");
if (fs_1.default.existsSync(envPath)) {
    dotenv_1.default.config({ path: envPath });
    logger_1.logger.info(".env loaded", { path: envPath }, "Main");
}
else {
    logger_1.logger.warn(".env file not found", { path: envPath }, "Main");
}
// ✅ Validate environment variables
const envValidation = (0, env_validator_1.validateEnv)();
if (!envValidation.isValid) {
    logger_1.logger.error("Environment validation failed", { errors: envValidation.errors }, "Main");
    process.exit(1);
}
// ✅ Environment variables
const PORT = (0, env_validator_1.getEnvNumber)("PORT", 4000);
const mongoUri = process.env.MONGODB_URI; // Validated by env-validator
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
const app = (0, express_1.default)();
// ✅ Security headers with Helmet
app.use((0, helmet_1.default)({
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
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
}));
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
            logger_1.logger.warn("CORS blocked origin", { origin }, "Main");
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
// ✅ Apply general API rate limiting (before routes)
app.use("/api", rate_limiter_1.apiRateLimiter.middleware());
// ✅ API Routes (must be before static files)
app.use("/api", user_routes_1.default);
app.use("/api/contact", contact_routes_1.default);
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
app.use("/api/:path(*)", (req, res) => {
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
            logger_1.logger.info("SSL certificates loaded", undefined, "Main");
        }
        catch (error) {
            logger_1.logger.error("Failed to load SSL certificates", error, "Main");
        }
    }
    else {
        logger_1.logger.warn("SSL certificate paths specified but files not found", undefined, "Main");
    }
}
// ✅ Create server
const server = sslOptions
    ? https_1.default.createServer(sslOptions, app)
    : http_1.default.createServer(app);
// ✅ Connect to database before starting server
(0, mongoose_1.connectDB)(mongoUri)
    .then(() => {
    logger_1.logger.info("MongoDB connected", undefined, "Main");
    startServer();
})
    .catch((err) => {
    logger_1.logger.error("MongoDB connection failed", err, "Main");
    process.exit(1);
});
function startServer() {
    server.listen(PORT, "0.0.0.0", () => {
        const protocol = sslOptions ? "https" : "http";
        logger_1.logger.info("Backend server started", {
            protocol,
            port: PORT,
            env: NODE_ENV,
            origins: allowedOrigins,
        }, "Main");
    });
    // ✅ Graceful shutdown
    process.on("SIGTERM", () => {
        logger_1.logger.info("SIGTERM signal received: closing HTTP server", undefined, "Main");
        server.close(() => {
            logger_1.logger.info("HTTP server closed", undefined, "Main");
            process.exit(0);
        });
    });
    process.on("SIGINT", () => {
        logger_1.logger.info("SIGINT signal received: closing HTTP server", undefined, "Main");
        server.close(() => {
            logger_1.logger.info("HTTP server closed", undefined, "Main");
            process.exit(0);
        });
    });
}
