"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDB = exports.connectDB = void 0;
// src/config/mongoose.ts
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = async (uri) => {
    try {
        await mongoose_1.default.connect(uri);
        console.log("MongoDB connected");
    }
    catch (err) {
        console.error("MongoDB connection error:", err);
        throw err;
    }
};
exports.connectDB = connectDB;
async function disconnectDB() {
    await mongoose_1.default.disconnect();
}
exports.disconnectDB = disconnectDB;
