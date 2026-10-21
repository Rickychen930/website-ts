/**
 * Profile Context - Global state management for profile data
 * Content is bundled (see @/data/profile), so it is available synchronously.
 */

import React, { createContext, useContext, useMemo, ReactNode } from "react";
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
  // Bundled content: available on the very first render, never loading or failing
  const contextValue = useMemo<ProfileContextType>(
    () => ({
      profile: profileService.getProfile(),
      isLoading: false,
      error: null,
      loadProfile: async () => undefined,
      refetch: async () => undefined,
      clearError: () => undefined,
    }),
    [],
  );

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
};
