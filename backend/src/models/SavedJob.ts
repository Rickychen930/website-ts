/**
 * Saved Job Model - Jobs you want to apply to later (wishlist)
 */

import mongoose, { Schema, Document } from "mongoose";

export interface ISavedJob extends Document {
  companyName: string;
  position: string;
  jobUrl?: string;
  source?: string;
  notes?: string;
  savedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SavedJobSchema = new Schema<ISavedJob>(
  {
    companyName: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    jobUrl: { type: String, trim: true },
    source: { type: String, trim: true },
    notes: { type: String, trim: true },
    savedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc: mongoose.Document, ret: Record<string, unknown>) => {
        ret.id = (ret._id as mongoose.Types.ObjectId)?.toString?.() || ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

export const SavedJobModel = mongoose.model<ISavedJob>(
  "SavedJob",
  SavedJobSchema,
);
