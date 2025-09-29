// src/models/user.model.ts
import mongoose, { Schema, Document, Model } from "mongoose";

/* Sub-documents */
const StatSchema = new Schema(
  {
    value: { type: String, required: true, trim: true },
    label: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const AcademicSchema = new Schema(
  {
    key: { type: String, required: true, index: true },
    icon: { type: String, default: "" },
    title: { type: String, required: true, trim: true },
    institution: { type: String, required: true, trim: true },
    period: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
  },
  { _id: false }
);

const CertificationSchema = new Schema(
  {
    key: { type: String, required: true, index: true },
    icon: { type: String, default: "" },
    title: { type: String, required: true, trim: true },
    provider: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const ContactSchema = new Schema(
  {
    key: { type: String, required: true, index: true },
    icon: { type: String, default: "" },
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
    link: { type: String, trim: true },
  },
  { _id: false }
);

const HonorSchema = new Schema(
  {
    key: { type: String, required: true, index: true },
    icon: { type: String, default: "" },
    title: { type: String, required: true, trim: true },
    event: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
  },
  { _id: false }
);

const LanguageSchema = new Schema(
  {
    key: { type: String, required: true, index: true },
    icon: { type: String, default: "" },
    name: { type: String, required: true, trim: true },
    proficiency: {
      type: String,
      required: true,
      enum: [
        "Native",
        "Professional Working Proficiency",
        "Fluent",
        "Intermediate",
        "Basic",
      ],
    },
  },
  { _id: false }
);

const ProjectSchema = new Schema(
  {
    key: { type: String, required: true, index: true },
    icon: { type: String, default: "" },
    name: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
  },
  { _id: false }
);

const SoftSkillSchema = new Schema(
  {
    key: { type: String, required: true, index: true },
    icon: { type: String, default: "" },
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
  },
  { _id: false }
);

const SkillCategorySchema = new Schema(
  {
    category: { type: String, required: true, trim: true },
    items: {
      type: [String],
      default: [],
      validate: (v: string[]) => Array.isArray(v),
    },
  },
  { _id: false }
);

const ExperienceSchema = new Schema(
  {
    key: { type: String, required: true, index: true },
    icon: { type: String, default: "" },
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    period: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
  },
  { _id: false }
);

/* Root document interface */
export interface IUser extends Document {
  name: string;
  title: string;
  location: string;
  bio: string;
  stats: { value: string; label: string }[];
  academics: {
    key: string;
    icon: string;
    title: string;
    institution: string;
    period: string;
    description: string;
  }[];
  certifications: {
    key: string;
    icon: string;
    title: string;
    provider: string;
    date: string;
  }[];
  contacts: {
    key: string;
    icon: string;
    label: string;
    value: string;
    link?: string;
  }[];
  honors: {
    key: string;
    icon: string;
    title: string;
    event: string;
    date: string;
    description: string;
  }[];
  languages: {
    key: string;
    icon: string;
    name: string;
    proficiency: string;
  }[];
  projects: {
    key: string;
    icon: string;
    name: string;
    date: string;
    description: string;
  }[];
  softSkills: {
    key: string;
    icon: string;
    name: string;
    description: string;
  }[];
  technicalSkills: {
    category: string;
    items: string[];
  }[];
  experiences: {
    key: string;
    icon: string;
    title: string;
    company: string;
    period: string;
    description: string;
  }[];
}

/* Root schema */
const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    title: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    bio: { type: String, required: true, trim: true },
    stats: { type: [StatSchema], default: [] },
    academics: { type: [AcademicSchema], default: [] },
    certifications: { type: [CertificationSchema], default: [] },
    contacts: { type: [ContactSchema], default: [] },
    honors: { type: [HonorSchema], default: [] },
    languages: { type: [LanguageSchema], default: [] },
    projects: { type: [ProjectSchema], default: [] },
    softSkills: { type: [SoftSkillSchema], default: [] },
    technicalSkills: { type: [SkillCategorySchema], default: [] },
    experiences: { type: [ExperienceSchema], default: [] },
  },
  { timestamps: true }
);

// Unique index
UserSchema.index({ name: 1, location: 1 }, { unique: true });

// ❌ jangan pakai : Model<IUser> atau ReturnType<…>
// ✅ biarkan infer otomatis
export const UserModel = mongoose.model<IUser>("User", UserSchema);
