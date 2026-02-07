/**
 * Saved Cover Letter Model - One letter per company/role (each can be different)
 */

import mongoose, { Schema, Document } from "mongoose";

export interface ISavedCoverLetter extends Document {
  companyName: string;
  position: string;
  jobDescription?: string;
  /** Editable body (paragraphs between greeting and closing). Each company can have different content. */
  bodyText: string;
  createdAt: Date;
  updatedAt: Date;
}

const SavedCoverLetterSchema = new Schema<ISavedCoverLetter>(
  {
    companyName: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    jobDescription: { type: String, trim: true },
    bodyText: { type: String, required: true, default: "" },
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

export const SavedCoverLetterModel = mongoose.model<ISavedCoverLetter>(
  "SavedCoverLetter",
  SavedCoverLetterSchema,
);
