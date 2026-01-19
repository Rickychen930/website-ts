/**
 * Profile Context - Global state management for profile data
 * Version 2: Added React Context for centralized state
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { ProfileModel } from "@/models/ProfileModel";
import { ProfileService } from "@/services/ProfileService";

interface ProfileContextType {
  profile: ProfileModel | null;
  isLoading: boolean;
  error: Error | null;
  loadProfile: () => Promise<void>;
  clearError: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within ProfileProvider");
  }
  return context;
};

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({
  children,
}) => {
  const [profile, setProfile] = useState<ProfileModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const profileServiceRef = React.useRef(new ProfileService());

  const loadProfile = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const loadedProfile = await profileServiceRef.current.fetchProfile();
      setProfile(loadedProfile);
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to load profile");
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = (): void => {
    setError(null);
  };

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return (
    <ProfileContext.Provider
      value={{ profile, isLoading, error, loadProfile, clearError }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
