/**
 * Note Model - Quick notes (study, work, interview)
 */

import mongoose, { Schema, Document } from "mongoose";

export type NoteCategory = "study" | "work" | "interview" | "other";

export interface INote extends Document {
  title: string;
  content: string;
  category: NoteCategory;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema<INote>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, default: "" },
    category: {
      type: String,
      enum: ["study", "work", "interview", "other"],
      default: "other",
    },
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

export const NoteModel = mongoose.model<INote>("Note", NoteSchema);
