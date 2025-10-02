//  =======================
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
