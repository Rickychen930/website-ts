"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
// src/models/user.model.ts
const mongoose_1 = __importStar(require("mongoose"));
/* Sub-documents */
const StatSchema = new mongoose_1.Schema({
    value: { type: String, required: true, trim: true },
    label: { type: String, required: true, trim: true },
}, { _id: false });
const AcademicSchema = new mongoose_1.Schema({
    key: { type: String, required: true, index: true },
    icon: { type: String, default: "" },
    title: { type: String, required: true, trim: true },
    institution: { type: String, required: true, trim: true },
    period: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
}, { _id: false });
const CertificationSchema = new mongoose_1.Schema({
    key: { type: String, required: true, index: true },
    icon: { type: String, default: "" },
    title: { type: String, required: true, trim: true },
    provider: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
}, { _id: false });
const ContactSchema = new mongoose_1.Schema({
    key: { type: String, required: true, index: true },
    icon: { type: String, default: "" },
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
    link: { type: String, trim: true },
}, { _id: false });
const HonorSchema = new mongoose_1.Schema({
    key: { type: String, required: true, index: true },
    icon: { type: String, default: "" },
    title: { type: String, required: true, trim: true },
    event: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
}, { _id: false });
const LanguageSchema = new mongoose_1.Schema({
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
}, { _id: false });
const ProjectSchema = new mongoose_1.Schema({
    key: { type: String, required: true, index: true },
    icon: { type: String, default: "" },
    name: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
}, { _id: false });
const SoftSkillSchema = new mongoose_1.Schema({
    key: { type: String, required: true, index: true },
    icon: { type: String, default: "" },
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
}, { _id: false });
const SkillCategorySchema = new mongoose_1.Schema({
    category: { type: String, required: true, trim: true },
    items: {
        type: [String],
        default: [],
        validate: (v) => Array.isArray(v),
    },
}, { _id: false });
const ExperienceSchema = new mongoose_1.Schema({
    key: { type: String, required: true, index: true },
    icon: { type: String, default: "" },
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    period: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
}, { _id: false });
const TestimonialSchema = new mongoose_1.Schema({
    key: { type: String, required: true, index: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    image: { type: String, trim: true },
    text: { type: String, required: true, trim: true },
    rating: { type: Number, min: 1, max: 5 },
    date: { type: String, trim: true },
    link: { type: String, trim: true },
}, { _id: false });
/* Root schema */
const UserSchema = new mongoose_1.Schema({
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
    testimonials: { type: [TestimonialSchema], default: [] },
}, { timestamps: true });
// Unique index
UserSchema.index({ name: 1, location: 1 }, { unique: true });
// ❌ jangan pakai : Model<IUser> atau ReturnType<…>
// ✅ biarkan infer otomatis
exports.UserModel = mongoose_1.default.model("User", UserSchema);
