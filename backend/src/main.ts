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
const envPath = path.join(__dirname, "../.env");
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

// ✅ Connect to DB
connectDB(mongoUri)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });

// ✅ Express setup
const app = express();
app.use(express.json());

// ✅ CORS setup
const allowedOrigins = [
  "http://localhost:4000",
  "http://72.60.208.150:4000",
  "http://rickychen930.cloud",
  "https://rickychen930.cloud",
];

const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`❌ CORS blocked origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// ✅ Routes
app.use("/api", userRoutes);

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

// ✅ SSL options (production only)
const sslOptions =
  NODE_ENV === "production"
    ? {
        key: fs.readFileSync(
          "/etc/letsencrypt/live/rickychen930.cloud/privkey.pem"
        ),
        cert: fs.readFileSync(
          "/etc/letsencrypt/live/rickychen930.cloud/fullchain.pem"
        ),
      }
    : undefined;

// ✅ Create server
const server =
  NODE_ENV === "production" && sslOptions
    ? https.createServer(sslOptions, app)
    : http.createServer(app);

server.listen(PORT, () => {
  console.log(
    `🚀 ${NODE_ENV === "production" ? "Secure" : "Dev"} backend running at ${NODE_ENV === "production" ? "https" : "http"}://localhost:${PORT}`
  );
});
