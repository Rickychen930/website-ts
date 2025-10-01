import { UserProfile } from "../types/user";

class MainController {
  getNavbarItems(): string[] {
    return [
      "About",
      "Academic",
      "Honors",
      "Certifications",
      "Skills",
      "Experience",
      "Projects",
      "Soft Skills",
      "Languages",
      "Contact",
    ];
  }

  async getUserProfile(): Promise<UserProfile | null> {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const endpoint = `${apiUrl}/api/Ricky%20Chen`;

      console.log("🔍 Fetching user profile from:", endpoint);

      const res = await fetch(endpoint, {
        method: "GET",
        credentials: "include", // ❗️Hanya jika pakai cookie/session
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch profile: ${res.status}`);
      }

      const data = (await res.json()) as UserProfile;
      console.log("User profile fetched:", data);

      return data;
    } catch (err) {
      console.error("Error in getUserProfile:", err);
      return null;
    }
  }
}

export default MainController;
