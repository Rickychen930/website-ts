"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MainController {
    getNavbarItems() {
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
    async getUserProfile() {
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const endpoint = `${apiUrl}/Ricky%20Chen`;
            console.log("🔍 Fetching user profile from:", endpoint);
            const res = await fetch(endpoint, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) {
                throw new Error(`Failed to fetch profile: ${res.status}`);
            }
            const data = (await res.json());
            console.log("User profile fetched:", data);
            return data;
        }
        catch (err) {
            console.error("Error in getUserProfile:", err);
            return null;
        }
    }
}
exports.default = MainController;
