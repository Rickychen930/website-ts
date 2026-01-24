/**
 * Profile Model - Backend Mongoose Schema
 */

import mongoose, { Schema, Document } from "mongoose";

export interface IProfile extends Document {
  name: string;
  title: string;
  location: string;
  bio: string;
  academics: Array<{
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
    description?: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    issueDate: string;
    expiryDate?: string;
    credentialId?: string;
    credentialUrl?: string;
  }>;
  contacts: Array<{
    type: "email" | "phone" | "linkedin" | "github" | "website" | "other";
    value: string;
    label: string;
    isPrimary: boolean;
  }>;
  experiences: Array<{
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate?: string;
    isCurrent: boolean;
    description: string;
    achievements: string[];
    technologies: string[];
    skillIds?: string[]; // References to technical skill names
  }>;
  honors: Array<{
    title: string;
    issuer: string;
    date: string;
    description?: string;
    url?: string;
  }>;
  languages: Array<{
    name: string;
    proficiency:
      | "native"
      | "fluent"
      | "professional"
      | "conversational"
      | "basic";
  }>;
  projects: Array<{
    title: string;
    description: string;
    longDescription?: string;
    technologies: string[];
    category: "web" | "mobile" | "ai" | "backend" | "fullstack" | "other";
    startDate: string;
    endDate?: string;
    isActive: boolean;
    githubUrl?: string;
    liveUrl?: string;
    imageUrl?: string;
    achievements: string[];
    architecture?: string;
  }>;
  softSkills: Array<{
    name: string;
    category:
      | "leadership"
      | "communication"
      | "problem-solving"
      | "collaboration"
      | "adaptability"
      | "other";
  }>;
  stats: Array<{
    label: string;
    value: string | number;
    unit?: string;
    description?: string;
  }>;
  technicalSkills: Array<{
    name: string;
    category:
      | "language"
      | "framework"
      | "database"
      | "tool"
      | "cloud"
      | "other";
    proficiency: "expert" | "advanced" | "intermediate" | "beginner";
    yearsOfExperience?: number;
  }>;
  testimonials: Array<{
    author: string;
    role: string;
    company: string;
    content: string;
    date: string;
    avatarUrl?: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

// @ts-ignore - Complex union type issue with Mongoose Schema
const ProfileSchema = new Schema<IProfile>(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
    bio: { type: String, required: true },
    academics: { type: Array, default: [] } as any,
    certifications: { type: Array, default: [] } as any,
    contacts: { type: Array, default: [] } as any,
    experiences: { type: Array, default: [] } as any,
    honors: { type: Array, default: [] } as any,
    languages: { type: Array, default: [] } as any,
    projects: { type: Array, default: [] } as any,
    softSkills: { type: Array, default: [] } as any,
    stats: { type: Array, default: [] } as any,
    technicalSkills: { type: Array, default: [] } as any,
    testimonials: { type: Array, default: [] } as any,
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

export const ProfileModel = mongoose.model<IProfile>(
  "Profile",
  ProfileSchema,
  "profiles",
);
