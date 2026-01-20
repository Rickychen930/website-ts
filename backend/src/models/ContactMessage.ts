/**
 * Contact Message Model - Backend Mongoose Schema
 */

import mongoose, { Schema, Document } from "mongoose";

export interface IContactMessage extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactMessageSchema = new Schema<IContactMessage>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc: mongoose.Document, ret: Record<string, unknown>) => {
        ret.id = (ret._id as mongoose.Types.ObjectId)?.toString() || ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

export const ContactMessageModel = mongoose.model<IContactMessage>(
  "ContactMessage",
  ContactMessageSchema,
);
