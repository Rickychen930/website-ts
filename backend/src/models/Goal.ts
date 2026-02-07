/**
 * Goal Model - Short-term targets (study & career)
 */

import mongoose, { Schema, Document } from "mongoose";

export type GoalStatus = "active" | "completed";

export interface IGoal extends Document {
  title: string;
  targetDate?: Date;
  status: GoalStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const GoalSchema = new Schema<IGoal>(
  {
    title: { type: String, required: true, trim: true },
    targetDate: { type: Date },
    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },
    notes: { type: String, trim: true },
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

export const GoalModel = mongoose.model<IGoal>("Goal", GoalSchema);
