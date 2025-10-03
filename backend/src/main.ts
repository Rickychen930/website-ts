import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import fs from "fs";
import https from "https";
import http from "http";
import { connectDB } from "./config/mongoose";
import userRoutes from "./routes/user-routes";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });
console.log("Loaded MONGODB_URI:", process.env.MONGODB_URI);
const envPath = path.resolve(__dirname, "../.env");
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log("✅ .env loaded from", envPath);
} else {
  console.warn("⚠️ .env file not found at", envPath);
}
const app = express();
const PORT = Number(process.env.PORT) || 5050;
const mongoUri = process.env.MONGODB_URI as string;
const NODE_ENV = process.env.NODE_ENV || "development";

// ✅ Connect to DB
connectDB(mongoUri);

// ✅ CORS setup — izinkan frontend di port 4000 dan domain cloud
const allowedOrigins = [
  "http://localhost:4000",
  "http://172.19.11.34:4000",
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
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// ✅ Routes
app.use("/api", userRoutes);

// ✅ Root route
app.get("/", (_, res) => {
  res.send("🔐 Secure backend is running 🚀");
});

// ✅ Fallback route
app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Sertifikat SSL (hanya untuk production)
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

// ✅ Jalankan server
if (NODE_ENV === "production" && sslOptions) {
  https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(
      `🚀 Secure backend running at https://rickychen930.cloud:${PORT}`
    );
  });
} else {
  http.createServer(app).listen(PORT, () => {
    console.log(`🚀 Dev backend running at http://localhost:${PORT}`);
  });
}
