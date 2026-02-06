/**
 * Profile Context - Global state management for profile data
 * Uses singleton profileService so admin updates and public site stay in sync.
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { ProfileModel } from "@/models/ProfileModel";
import { profileService } from "@/services/ProfileService";

interface ProfileContextType {
  profile: ProfileModel | null;
  isLoading: boolean;
  error: Error | null;
  loadProfile: () => Promise<void>;
  /** Clear cache and refetch so UI shows latest data (e.g. after admin save) */
  refetch: () => Promise<void>;
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

  const loadProfile = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const loadedProfile = await profileService.fetchProfile();
      setProfile(loadedProfile);
    } catch (err) {
      const errObj =
        err instanceof Error ? err : new Error("Failed to load profile");
      setError(errObj);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetch = useCallback(async (): Promise<void> => {
    profileService.clearCache();
    await loadProfile();
  }, [loadProfile]);

  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const contextValue = useMemo(
    () => ({
      profile,
      isLoading,
      error,
      loadProfile,
      refetch,
      clearError,
    }),
    [profile, isLoading, error, loadProfile, refetch, clearError],
  );

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
};
