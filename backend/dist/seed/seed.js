"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/seed/seed-user.ts
require("dotenv/config");
const mongoose_1 = require("../config/mongoose");
const user_controller_1 = require("../controllers/user-controller");
const user_1 = require("../data/user");
async function seed() {
    try {
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error("MONGODB_URI is not defined in .env");
        }
        await (0, mongoose_1.connectDB)(mongoUri);
        const saved = await (0, user_controller_1.upsertUserByName)(user_1.userData.name, user_1.userData);
        if (saved) {
            console.log("Upserted user:", saved._id);
        }
        else {
            console.log("User not found or not saved");
        }
    }
    catch (err) {
        console.error("Seed error:", err);
    }
    finally {
        await (0, mongoose_1.disconnectDB)();
        process.exit(0);
    }
}
seed();
