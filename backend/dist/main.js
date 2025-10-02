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
const mongoose_1 = require("./config/mongoose");
const user_routes_1 = __importDefault(require("./routes/user-routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 4000;
const mongoUri = process.env.MONGODB_URI;
const NODE_ENV = process.env.NODE_ENV || "development";
if (!mongoUri) {
    console.error("❌ MONGODB_URI is missing in .env");
    process.exit(1);
}
// ✅ Connect to MongoDB
(0, mongoose_1.connectDB)(mongoUri);
// 🔐 Sertifikat SSL (hanya untuk production)
const sslOptions = NODE_ENV === "production"
    ? {
        key: fs_1.default.readFileSync("/etc/letsencrypt/live/rickychen930.cloud/privkey.pem"),
        cert: fs_1.default.readFileSync("/etc/letsencrypt/live/rickychen930.cloud/fullchain.pem"),
    }
    : undefined;
// ✅ CORS setup
const corsOptions = {
    origin: [
        "http://localhost:5051",
        "https://rickychen930.cloud",
        "http://rickychen930.cloud",
        "https://www.rickychen930.cloud",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
// ✅ Routes
app.use("/api", user_routes_1.default);
// ✅ Root route
app.get("/", (_, res) => {
    res.send("🔐 Secure backend is running 🚀");
});
// ✅ Fallback route (404)
app.use((_, res) => {
    res.status(404).json({ message: "Route not found" });
});
// ✅ Jalankan server
if (NODE_ENV === "production" && sslOptions) {
    https_1.default.createServer(sslOptions, app).listen(PORT, () => {
        console.log(`🚀 Secure backend running at https://localhost:${PORT}`);
    });
}
else {
    http_1.default.createServer(app).listen(PORT, () => {
        console.log(`🚀 Dev backend running at http://localhost:${PORT}`);
    });
}
