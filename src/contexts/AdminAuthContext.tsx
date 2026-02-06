/**
 * Admin Auth Context - Token and login state for admin dashboard
 */

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { adminService } from "@/services/AdminService";

const TOKEN_KEY = "admin_token";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (secret: string) => Promise<void>;
  logout: () => void;
  token: string | null;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = (): AdminAuthContextType => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return ctx;
};

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY),
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [token]);

  const login = useCallback(async (secret: string) => {
    const { token: t } = await adminService.login(secret);
    setToken(t);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
  }, []);

  const value: AdminAuthContextType = {
    isAuthenticated: !!token,
    login,
    logout,
    token,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
