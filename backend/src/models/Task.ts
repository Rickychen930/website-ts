/**
 * Task Model - To-do for study & work
 */

import mongoose, { Schema, Document } from "mongoose";

export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskCategory = "study" | "work" | "personal";

export interface ITask extends Document {
  title: string;
  dueDate?: Date;
  priority: TaskPriority;
  status: TaskStatus;
  category: TaskCategory;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true, trim: true },
    dueDate: { type: Date },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["todo", "in_progress", "done"],
      default: "todo",
    },
    category: {
      type: String,
      enum: ["study", "work", "personal"],
      default: "personal",
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

export const TaskModel = mongoose.model<ITask>("Task", TaskSchema);
