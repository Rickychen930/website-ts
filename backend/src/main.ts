import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/mongoose";
import userRoutes from "./routes/user-routes";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5050;
const mongoUri = process.env.MONGODB_URI as string;
// ✅ Connect to DB
connectDB(mongoUri);

const corsOptions = {
  origin: [
    "http://localhost:5051",
    "https://rickychen930.cloud",
    "rickychen930.cloud",
    "www.rickychen930.cloud",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());

app.use("/api", userRoutes);

app.get("/", (_, res) => {
  res.send("Server is running 🚀");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend running at http://0.0.0.0:${PORT}`);
});
