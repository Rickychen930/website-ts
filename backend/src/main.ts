import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/mongoose";
import userRoutes from "./routes/user-routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;
const mongoUri = process.env.MONGODB_URI as string;
// ✅ Connect to DB
connectDB(mongoUri);

// ✅ CORS setup — izinkan frontend di port 3000
const corsOptions = {
  origin: "http://72.60.208.150",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", userRoutes);

app.get("/", (_, res) => {
  res.send("Server is running 🚀");
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
