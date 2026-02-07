/**
 * Admin Service - API client for admin dashboard
 */

const getBaseUrl = () =>
  process.env.REACT_APP_API_URL || "http://localhost:4000";

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("admin_token");
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export interface AdminStats {
  profileExists: boolean;
  profileUpdatedAt: string | null;
  counts: {
    projects: number;
    experiences: number;
    skills: number;
    testimonials: number;
    stats: number;
    contactMessages: number;
    appliedCompanies?: number;
    savedJobs?: number;
    tasks?: number;
    goals?: number;
    notes?: number;
    academics?: number;
    certifications?: number;
    honors?: number;
    profileContacts?: number;
    languages?: number;
  };
}

export interface ContactMessageItem {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ContactMessagesResponse {
  items: ContactMessageItem[];
  total: number;
  limit: number;
  skip: number;
}

export interface AppliedCompanyItem {
  id: string;
  companyName: string;
  position: string;
  appliedAt: string;
  status: string;
  notes?: string;
  jobUrl?: string;
  followUpAt?: string;
  nextInterviewAt?: string;
  contactPerson?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SavedJobItem {
  id: string;
  companyName: string;
  position: string;
  jobUrl?: string;
  source?: string;
  notes?: string;
  savedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  dueDate?: string;
  priority: string;
  status: string;
  category: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GoalItem {
  id: string;
  title: string;
  targetDate?: string;
  status: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface NoteItem {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SavedCoverLetterItem {
  id: string;
  companyName: string;
  position: string;
  jobDescription?: string;
  bodyText: string;
  createdAt?: string;
  updatedAt?: string;
}

export const adminService = {
  async login(secret: string): Promise<{ success: boolean; token: string }> {
    const res = await fetch(`${getBaseUrl()}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || data.error || "Login failed");
    }
    if (!data.success || !data.token) {
      throw new Error("Invalid response from server");
    }
    return { success: true, token: data.token };
  },

  async getStats(): Promise<AdminStats> {
    const res = await fetch(`${getBaseUrl()}/api/admin/stats`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok)
      throw new Error(data.message || data.error || "Failed to load stats");
    return data;
  },

  async getProfile(): Promise<Record<string, unknown>> {
    const res = await fetch(`${getBaseUrl()}/api/profile`, {
      headers: { Accept: "application/json" },
    });
    const data = await res.json();
    if (!res.ok)
      throw new Error(data.message || data.error || "Failed to load profile");
    return data;
  },

  async updateProfile(
    profile: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    const res = await fetch(`${getBaseUrl()}/api/admin/profile`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(profile),
    });
    const data = await res.json();
    if (!res.ok)
      throw new Error(data.message || data.error || "Failed to update profile");
    return data;
  },

  async getContactMessages(params?: {
    limit?: number;
    skip?: number;
  }): Promise<ContactMessagesResponse> {
    const q = new URLSearchParams();
    if (params?.limit != null) q.set("limit", String(params.limit));
    if (params?.skip != null) q.set("skip", String(params.skip));
    const res = await fetch(`${getBaseUrl()}/api/admin/contacts?${q}`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok)
      throw new Error(data.message || data.error || "Failed to load messages");
    return data;
  },

  async deleteContactMessage(id: string): Promise<void> {
    const res = await fetch(`${getBaseUrl()}/api/admin/contacts/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok)
      throw new Error(data.message || data.error || "Failed to delete message");
  },

  // Applied companies (track companies you've applied to)
  async getCompanies(params?: {
    limit?: number;
    skip?: number;
    sort?: string;
  }): Promise<{
    items: AppliedCompanyItem[];
    total: number;
    limit: number;
    skip: number;
  }> {
    const q = new URLSearchParams();
    if (params?.limit != null) q.set("limit", String(params.limit));
    if (params?.skip != null) q.set("skip", String(params.skip));
    if (params?.sort != null) q.set("sort", params.sort);
    const res = await fetch(`${getBaseUrl()}/api/admin/companies?${q}`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok)
      throw new Error(data.message || data.error || "Failed to load companies");
    return data;
  },

  async createCompany(payload: {
    companyName: string;
    position: string;
    appliedAt?: string;
    status?: string;
    notes?: string;
    jobUrl?: string;
    followUpAt?: string;
    nextInterviewAt?: string;
    contactPerson?: string;
  }): Promise<AppliedCompanyItem> {
    const res = await fetch(`${getBaseUrl()}/api/admin/companies`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok)
      throw new Error(data.message || data.error || "Failed to create company");
    return data;
  },

  async updateCompany(
    id: string,
    payload: Partial<{
      companyName: string;
      position: string;
      appliedAt: string;
      status: string;
      notes: string;
      jobUrl: string;
      followUpAt: string;
      nextInterviewAt: string;
      contactPerson: string;
    }>,
  ): Promise<AppliedCompanyItem> {
    const res = await fetch(`${getBaseUrl()}/api/admin/companies/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok)
      throw new Error(data.message || data.error || "Failed to update company");
    return data;
  },

  async deleteCompany(id: string): Promise<void> {
    const res = await fetch(`${getBaseUrl()}/api/admin/companies/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok && res.status !== 204)
      throw new Error(data.message || data.error || "Failed to delete company");
  },

  // Tasks
  async getTasks(params?: {
    limit?: number;
    skip?: number;
    sort?: string;
    status?: string;
  }): Promise<{
    items: TaskItem[];
    total: number;
    limit: number;
    skip: number;
  }> {
    const q = new URLSearchParams();
    if (params?.limit != null) q.set("limit", String(params.limit));
    if (params?.skip != null) q.set("skip", String(params.skip));
    if (params?.sort != null) q.set("sort", params.sort);
    if (params?.status != null) q.set("status", params.status);
    const res = await fetch(`${getBaseUrl()}/api/admin/tasks?${q}`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok)
      throw new Error(data.message || data.error || "Failed to load tasks");
    return data;
  },
  async createTask(payload: Partial<TaskItem>): Promise<TaskItem> {
    const res = await fetch(`${getBaseUrl()}/api/admin/tasks`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok)
      throw new Error(data.message || data.error || "Failed to create task");
    return data;
  },
  async updateTask(id: string, payload: Partial<TaskItem>): Promise<TaskItem> {
    const res = await fetch(`${getBaseUrl()}/api/admin/tasks/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok)
      throw new Error(data.message || data.error || "Failed to update task");
    return data;
  },
  async deleteTask(id: string): Promise<void> {
    const res = await fetch(`${getBaseUrl()}/api/admin/tasks/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok && res.status !== 204)
      throw new Error(data.message || data.error || "Failed to delete task");
  },

  // Goals
  async getGoals(params?: {
    limit?: number;
    skip?: number;
    sort?: string;
    status?: string;
  }): Promise<{
    items: GoalItem[];
    total: number;
    limit: number;
    skip: number;
  }> {
    const q = new URLSearchParams();
    if (params?.limit != null) q.set("limit", String(params.limit));
    if (params?.skip != null) q.set("skip", String(params.skip));
    if (params?.sort != null) q.set("sort", params.sort);
    if (params?.status != null) q.set("status", params.status);
    const res = await fetch(`${getBaseUrl()}/api/admin/goals?${q}`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok)
      throw new Error(data.message || data.error || "Failed to load goals");
    return data;
  },
  async createGoal(payload: Partial<GoalItem>): Promise<GoalItem> {
    const res = await fetch(`${getBaseUrl()}/api/admin/goals`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok)
      throw new Error(data.message || data.error || "Failed to create goal");
    return data;
  },
  async updateGoal(id: string, payload: Partial<GoalItem>): Promise<GoalItem> {
    const res = await fetch(`${getBaseUrl()}/api/admin/goals/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok)
      throw new Error(data.message || data.error || "Failed to update goal");
    return data;
  },
  async deleteGoal(id: string): Promise<void> {
    const res = await fetch(`${getBaseUrl()}/api/admin/goals/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok && res.status !== 204)
      throw new Error(data.message || data.error || "Failed to delete goal");
  },

  // Notes
  async getNotes(params?: {
    limit?: number;
    skip?: number;
    sort?: string;
    category?: string;
  }): Promise<{
    items: NoteItem[];
    total: number;
    limit: number;
    skip: number;
  }> {
    const q = new URLSearchParams();
    if (params?.limit != null) q.set("limit", String(params.limit));
    if (params?.skip != null) q.set("skip", String(params.skip));
    if (params?.sort != null) q.set("sort", params.sort);
    if (params?.category != null) q.set("category", params.category);
    const res = await fetch(`${getBaseUrl()}/api/admin/notes?${q}`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok)
      throw new Error(data.message || data.error || "Failed to load notes");
    return data;
  },
  async createNote(payload: Partial<NoteItem>): Promise<NoteItem> {
    const res = await fetch(`${getBaseUrl()}/api/admin/notes`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok)
      throw new Error(data.message || data.error || "Failed to create note");
    return data;
  },
  async updateNote(id: string, payload: Partial<NoteItem>): Promise<NoteItem> {
    const res = await fetch(`${getBaseUrl()}/api/admin/notes/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok)
      throw new Error(data.message || data.error || "Failed to update note");
    return data;
  },
  async deleteNote(id: string): Promise<void> {
    const res = await fetch(`${getBaseUrl()}/api/admin/notes/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok && res.status !== 204)
      throw new Error(data.message || data.error || "Failed to delete note");
  },

  // Saved cover letters (different letter per company)
  async getCoverLetters(params?: {
    limit?: number;
    skip?: number;
    sort?: string;
  }): Promise<{
    items: SavedCoverLetterItem[];
    total: number;
    limit: number;
    skip: number;
  }> {
    const q = new URLSearchParams();
    if (params?.limit != null) q.set("limit", String(params.limit));
    if (params?.skip != null) q.set("skip", String(params.skip));
    if (params?.sort != null) q.set("sort", params.sort);
    const res = await fetch(`${getBaseUrl()}/api/admin/cover-letters?${q}`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok)
      throw new Error(
        data.message || data.error || "Failed to load cover letters",
      );
    return data;
  },
  async createCoverLetter(payload: {
    companyName: string;
    position: string;
    jobDescription?: string;
    bodyText: string;
  }): Promise<SavedCoverLetterItem> {
    const res = await fetch(`${getBaseUrl()}/api/admin/cover-letters`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok)
      throw new Error(
        data.message || data.error || "Failed to create cover letter",
      );
    return data;
  },
  async updateCoverLetter(
    id: string,
    payload: Partial<{
      companyName: string;
      position: string;
      jobDescription: string;
      bodyText: string;
    }>,
  ): Promise<SavedCoverLetterItem> {
    const res = await fetch(`${getBaseUrl()}/api/admin/cover-letters/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok)
      throw new Error(
        data.message || data.error || "Failed to update cover letter",
      );
    return data;
  },
  async deleteCoverLetter(id: string): Promise<void> {
    const res = await fetch(`${getBaseUrl()}/api/admin/cover-letters/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok && res.status !== 204)
      throw new Error(
        data.message || data.error || "Failed to delete cover letter",
      );
  },

  // Saved jobs (wishlist – to apply later)
  async getSavedJobs(params?: {
    limit?: number;
    skip?: number;
    sort?: string;
  }): Promise<{
    items: SavedJobItem[];
    total: number;
    limit: number;
    skip: number;
  }> {
    const q = new URLSearchParams();
    if (params?.limit != null) q.set("limit", String(params.limit));
    if (params?.skip != null) q.set("skip", String(params.skip));
    if (params?.sort != null) q.set("sort", params.sort);
    const res = await fetch(`${getBaseUrl()}/api/admin/saved-jobs?${q}`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok)
      throw new Error(
        data.message || data.error || "Failed to load saved jobs",
      );
    return data;
  },
  async createSavedJob(payload: {
    companyName: string;
    position: string;
    jobUrl?: string;
    source?: string;
    notes?: string;
  }): Promise<SavedJobItem> {
    const res = await fetch(`${getBaseUrl()}/api/admin/saved-jobs`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok)
      throw new Error(data.message || data.error || "Failed to save job");
    return data;
  },
  async updateSavedJob(
    id: string,
    payload: Partial<{
      companyName: string;
      position: string;
      jobUrl: string;
      source: string;
      notes: string;
    }>,
  ): Promise<SavedJobItem> {
    const res = await fetch(`${getBaseUrl()}/api/admin/saved-jobs/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok)
      throw new Error(
        data.message || data.error || "Failed to update saved job",
      );
    return data;
  },
  async deleteSavedJob(id: string): Promise<void> {
    const res = await fetch(`${getBaseUrl()}/api/admin/saved-jobs/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok && res.status !== 204)
      throw new Error(
        data.message || data.error || "Failed to delete saved job",
      );
  },

  // AI (Master of AI – requires OPENAI_API_KEY on backend)
  async getAiStatus(): Promise<{ configured: boolean }> {
    const res = await fetch(`${getBaseUrl()}/api/admin/ai/status`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok)
      throw new Error(
        data.message || data.error || "Failed to check AI status",
      );
    return data;
  },
  async aiEnhanceCoverLetter(payload: {
    bodyText: string;
    jobDescription?: string;
    companyName?: string;
    position?: string;
  }): Promise<{ improved: string }> {
    const res = await fetch(
      `${getBaseUrl()}/api/admin/ai/enhance-cover-letter`,
      {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      },
    );
    const data = await res.json();
    if (!res.ok)
      throw new Error(data.message || data.error || "AI request failed");
    return data;
  },
  async aiSummarizeJobDescription(
    jobDescription: string,
  ): Promise<{ summary: string }> {
    const res = await fetch(`${getBaseUrl()}/api/admin/ai/summarize-jd`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ jobDescription }),
    });
    const data = await res.json();
    if (!res.ok)
      throw new Error(data.message || data.error || "AI request failed");
    return data;
  },
  async aiGenerateInterviewQuestions(payload: {
    companyName?: string;
    position?: string;
    jobDescription?: string;
  }): Promise<{ questions: string }> {
    const res = await fetch(
      `${getBaseUrl()}/api/admin/ai/interview-questions`,
      {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      },
    );
    const data = await res.json();
    if (!res.ok)
      throw new Error(data.message || data.error || "AI request failed");
    return data;
  },
};
