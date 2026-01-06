// =======================
// Education
// =======================
export interface IEducation {
  degree: string;
  institution: string;
  location?: string;
  startYear: number;
  endYear: number;
  gpa?: string;
}

// =======================
// Work Experience
// =======================
export interface IWorkExperience {
  title: string;
  company: string;
  location?: string;
  startDate: string; // e.g. "May 2023"
  endDate: string; // e.g. "Present"
  description: string; // satu teks panjang
}

// =======================
// Honors / Achievements
// =======================
export interface IHonor {
  title: string;
  event?: string;
  date: string;
  description: string; // satu teks panjang
}

// =======================
// Languages
// =======================
export interface ILanguage {
  key: string;
  icon: string;
  name: string;
  proficiency: string;
}

// =======================
// Root User (DB / Mongoose)
// =======================
export interface IUser {
  _id?: string; // untuk MongoDB
  name: string;
  email: string;
  phone?: string;
  location?: string;
  about?: string; // bisa disamakan dengan "bio" di UserProfile
  education: IEducation[];
  workExperience: IWorkExperience[];
  skills: string[];
  honors?: IHonor[];
  languages?: ILanguage[];
  createdAt?: Date;
  updatedAt?: Date;
}

// =======================
// UserProfile (Frontend / Portfolio)
// =======================
export type UserProfile = {
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
  testimonials?: {
    key: string;
    name: string;
    role: string;
    company: string;
    image?: string;
    text: string;
    rating?: number;
    date?: string;
    link?: string;
  }[];
};
