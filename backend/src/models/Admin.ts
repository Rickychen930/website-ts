/**
 * Admin Model - Single admin user for dashboard login
 * Password stored only on backend (hashed in DB via seed)
 */

import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
  passwordHash: string;
  salt: string;
  token?: string;
  updatedAt: Date;
}

const AdminSchema = new Schema<IAdmin>(
  {
    passwordHash: { type: String, required: true },
    salt: { type: String, required: true },
    token: { type: String, required: false, default: null },
  },
  {
    timestamps: true,
    collection: "admins",
  },
);

export const AdminModel = mongoose.model<IAdmin>("Admin", AdminSchema);
