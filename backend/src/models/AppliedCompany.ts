/**
 * Applied Company Model - Track companies you've applied to
 */

import mongoose, { Schema, Document } from "mongoose";

export type AppliedStatus =
  | "applied"
  | "interview"
  | "rejected"
  | "offer"
  | "withdrawn";

export interface IAppliedCompany extends Document {
  companyName: string;
  position: string;
  appliedAt: Date;
  status: AppliedStatus;
  notes?: string;
  jobUrl?: string;
  /** When to follow up (e.g. after one week) */
  followUpAt?: Date;
  /** Next interview date/time */
  nextInterviewAt?: Date;
  /** Recruiter or hiring manager name/contact */
  contactPerson?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AppliedCompanySchema = new Schema<IAppliedCompany>(
  {
    companyName: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    appliedAt: { type: Date, required: true, default: Date.now },
    status: {
      type: String,
      required: true,
      enum: ["applied", "interview", "rejected", "offer", "withdrawn"],
      default: "applied",
    },
    notes: { type: String, trim: true },
    jobUrl: { type: String, trim: true },
    followUpAt: { type: Date },
    nextInterviewAt: { type: Date },
    contactPerson: { type: String, trim: true },
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

export const AppliedCompanyModel = mongoose.model<IAppliedCompany>(
  "AppliedCompany",
  AppliedCompanySchema,
);
