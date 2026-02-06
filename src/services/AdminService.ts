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
    if (!res.ok) throw new Error(data.message || data.error || "Failed to load stats");
    return data;
  },

  async getProfile(): Promise<Record<string, unknown>> {
    const res = await fetch(`${getBaseUrl()}/api/profile`, {
      headers: { Accept: "application/json" },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || data.error || "Failed to load profile");
    return data;
  },

  async updateProfile(profile: Record<string, unknown>): Promise<Record<string, unknown>> {
    const res = await fetch(`${getBaseUrl()}/api/admin/profile`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(profile),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || data.error || "Failed to update profile");
    return data;
  },

  async getContactMessages(params?: { limit?: number; skip?: number }): Promise<ContactMessagesResponse> {
    const q = new URLSearchParams();
    if (params?.limit != null) q.set("limit", String(params.limit));
    if (params?.skip != null) q.set("skip", String(params.skip));
    const res = await fetch(`${getBaseUrl()}/api/admin/contacts?${q}`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || data.error || "Failed to load messages");
    return data;
  },

  async deleteContactMessage(id: string): Promise<void> {
    const res = await fetch(`${getBaseUrl()}/api/admin/contacts/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || data.error || "Failed to delete message");
  },
};
