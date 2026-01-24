"use strict";
/**
 * Backend Entry Point
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const database_1 = require("./config/database");
const profileRoutes_1 = __importDefault(require("./routes/profileRoutes"));
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
const rateLimiter_1 = require("./middleware/rateLimiter");
const sanitizeInput_1 = require("./middleware/sanitizeInput");
// Load environment variables based on NODE_ENV
const nodeEnv = process.env.NODE_ENV || "development";
const envFile = `.env.${nodeEnv}`;
const envPath = path_1.default.resolve(__dirname, "../../", envFile);
// Load environment-specific .env file, fallback to .env
dotenv_1.default.config({ path: envPath });
dotenv_1.default.config(); // Load .env as fallback
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
// Security Middleware
app.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
    crossOriginEmbedderPolicy: false, // Allow embedding for portfolio
}));
app.use((0, cors_1.default)({
    origin: process.env.ALLOWED_ORIGINS?.split(",").map((origin) => origin.trim()) || ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// Body parsing with size limits to prevent DoS
app.use(express_1.default.json({
    limit: "10mb",
    strict: true,
}));
app.use(express_1.default.urlencoded({
    extended: true,
    limit: "10mb",
    parameterLimit: 100, // Limit number of parameters
}));
// Input sanitization (before routes)
app.use(sanitizeInput_1.sanitizeInput);
// Rate limiting (apply to all routes)
app.use("/api", rateLimiter_1.apiLimiter);
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
// Routes
app.use("/api/profile", profileRoutes_1.default);
app.use("/api/contact", contactRoutes_1.default);
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
app.use((err, req, res, next) => {
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
});
// Start server
const startServer = async () => {
    const isDevelopment = nodeEnv === "development";
    // Always try to connect to database (MongoDB Atlas)
    // In production, require successful connection before starting server
    try {
        await (0, database_1.connectDatabase)();
        console.log("✅ Database connection established");
    }
    catch (error) {
        console.error("❌ Failed to connect to MongoDB Atlas:", error);
        if (!isDevelopment) {
            console.error("❌ Production mode requires database connection. Exiting...");
            process.exit(1);
        }
        else {
            console.warn("⚠️  Development mode: Server will start but database features may not work.");
            console.warn("💡 Make sure MONGODB_URI is set correctly in your .env file");
        }
    }
    // Start the server
    const httpServer = app.listen(PORT, () => {
        console.log(`✅ Server running on port ${PORT}`);
        console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
        console.log(`🏥 Health check: http://localhost:${PORT}/health`);
        console.log(`🌍 Environment: ${nodeEnv}`);
        if (isDevelopment) {
            console.log(`💡 To seed database: npm run seed (ensure MONGODB_URI is set)`);
        }
    });
    // Graceful shutdown handler
    const gracefulShutdown = async (signal) => {
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
    process.on("uncaughtException", (error) => {
        console.error("Uncaught Exception:", error);
        gracefulShutdown("uncaughtException");
    });
    // Handle unhandled promise rejections
    process.on("unhandledRejection", (reason) => {
        console.error("Unhandled Rejection:", reason);
        gracefulShutdown("unhandledRejection");
    });
};
startServer();
