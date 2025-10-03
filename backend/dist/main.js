"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
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
const PORT = Number(process.env.PORT);
const mongoUri = process.env.MONGODB_URI;
const NODE_ENV = process.env.NODE_ENV;
console.log("a: ", process.env.PORT);
console.log("b: ", process.env.MONGODB_URI);
console.log("c: ", process.env.MONGODB_URI);
if (!PORT) {
    throw new Error("❌ PORT is not defined in .env");
}
if (!mongoUri) {
    throw new Error("❌ MONGODB_URI is not defined in .env");
}
// ✅ Connect to DB
(0, mongoose_1.connectDB)(mongoUri)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
});
// ✅ Express setup
const app = (0, express_1.default)();
app.use(express_1.default.json());
// ✅ CORS setup
const allowedOrigins = [
    "http://localhost:4000",
    "http://72.60.208.150:4000",
    "http://rickychen930.cloud",
    "https://rickychen930.cloud",
];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            console.warn(`❌ CORS blocked origin: ${origin}`);
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
// ✅ Routes
app.use("/api", user_routes_1.default);
// ✅ Health check
app.get("/health", (_, res) => {
    res.status(200).json({ status: "ok", env: NODE_ENV });
});
// ✅ Root route
app.get("/", (_, res) => {
    res.send("🔐 Secure backend is running 🚀");
});
// ✅ Fallback route
app.use((_, res) => {
    res.status(404).json({ message: "Route not found" });
});
const sslPath = "/etc/letsencrypt/live/rickychen930.cloud";
const sslOptions = NODE_ENV === "production" && fs_1.default.existsSync(sslPath)
    ? {
        key: fs_1.default.readFileSync(`${sslPath}/privkey.pem`),
        cert: fs_1.default.readFileSync(`${sslPath}/fullchain.pem`),
    }
    : undefined;
// ✅ Create server
const server = http_1.default.createServer(app);
server.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Backend running at http://0.0.0.0:${PORT}`);
});
