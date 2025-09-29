// src/seed/seed-user.ts
import "dotenv/config";
import { connectDB, disconnectDB } from "../config/mongoose";
import { upsertUserByName } from "../controllers/user-controller";
import { userData } from "../data/user";

async function seed() {
  try {
    const mongoUri = process.env.MONGODB_URI as string;
    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined in .env");
    }

    await connectDB(mongoUri);

    const saved = await upsertUserByName(userData.name, userData);
    if (saved) {
      console.log("Upserted user:", saved._id);
    } else {
      console.log("User not found or not saved");
    }
  } catch (err) {
    console.error("Seed error:", err);
  } finally {
    await disconnectDB();
    process.exit(0);
  }
}

seed();
