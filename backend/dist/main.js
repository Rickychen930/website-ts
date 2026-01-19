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
// Load environment variables based on NODE_ENV
const nodeEnv = process.env.NODE_ENV || 'development';
const envFile = `.env.${nodeEnv}`;
const envPath = path_1.default.resolve(__dirname, '../../', envFile);
// Load environment-specific .env file, fallback to .env
dotenv_1.default.config({ path: envPath });
dotenv_1.default.config(); // Load .env as fallback
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use('/api/profile', profileRoutes_1.default);
app.use('/api/contact', contactRoutes_1.default);
// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});
// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not found',
        message: `Route ${req.method} ${req.path} not found`
    });
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ Error:', err);
    console.error('Request path:', req.path);
    console.error('Request method:', req.method);
    // Don't leak error details in production
    const isDevelopment = nodeEnv === 'development';
    res.status(500).json({
        error: 'Internal server error',
        message: isDevelopment ? err.message : undefined,
        stack: isDevelopment ? err.stack : undefined
    });
});
// Start server
const startServer = async () => {
    try {
        await (0, database_1.connectDatabase)();
        app.listen(PORT, () => {
            console.log(`✅ Server running on port ${PORT}`);
            console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
            console.log(`🏥 Health check: http://localhost:${PORT}/health`);
            console.log(`🌍 Environment: ${nodeEnv}`);
        });
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};
// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: closing HTTP server');
    process.exit(0);
});
process.on('SIGINT', async () => {
    console.log('SIGINT signal received: closing HTTP server');
    process.exit(0);
});
startServer();
