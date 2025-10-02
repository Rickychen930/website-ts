import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import fs from "fs";
import https from "https";
import http from "http";
import path from "path";
import { connectDB } from "./config/mongoose";
import userRoutes from "./routes/user-routes";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 4000;
const mongoUri = process.env.MONGODB_URI as string;
const NODE_ENV = process.env.NODE_ENV || "development";

if (!mongoUri) {
  console.error("❌ MONGODB_URI is missing in .env");
  process.exit(1);
}

// ✅ Connect to MongoDB
connectDB(mongoUri);

// 🔐 Sertifikat SSL (hanya untuk production)
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

app.use(cors(corsOptions));
app.use(express.json());

// ✅ Routes
app.use("/api", userRoutes);

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
  https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`🚀 Secure backend running at https://localhost:${PORT}`);
  });
} else {
  http.createServer(app).listen(PORT, () => {
    console.log(`🚀 Dev backend running at http://localhost:${PORT}`);
  });
}
