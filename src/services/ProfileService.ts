/**
 * Profile Service — hands out the bundled portfolio content.
 *
 * The public site no longer fetches a profile from the API: the content lives
 * in `@/data/profile` and is built into the app, so it renders instantly and
 * works offline. The backend remains for chat, contact and admin only.
 */

import { PROFILE } from "@/data/profile";
import { ProfileModel } from "@/models/ProfileModel";

export class ProfileService {
  private readonly profile: ProfileModel = ProfileModel.create(PROFILE);

  public getProfile(): ProfileModel {
    return this.profile;
  }
}

export const profileService = new ProfileService();
