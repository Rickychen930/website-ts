/**
 * Unit tests for UserService
 */

import { UserService } from '../user-service';
import { apiClient } from '../api';
import { UserProfile } from '../../types/user';

// Mock the API client
jest.mock('../api', () => ({
  apiClient: {
    get: jest.fn(),
  },
}));

describe('UserService', () => {
  let userService: UserService;
  const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

  beforeEach(() => {
    userService = new UserService();
    jest.clearAllMocks();
  });

  describe('getUserProfile', () => {
    const mockProfile: UserProfile = {
      name: 'John Doe',
      title: 'Software Engineer',
      location: 'New York',
      bio: 'Test bio',
      stats: [],
      academics: [],
      certifications: [],
      contacts: [],
      honors: [],
      languages: [],
      projects: [],
      softSkills: [],
      technicalSkills: [],
      experiences: [],
    };

    it('should fetch user profile successfully', async () => {
      mockApiClient.get.mockResolvedValue({
        data: mockProfile,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
      });

      const result = await userService.getUserProfile('John Doe');

      expect(result).toEqual(mockProfile);
      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/John%20Doe',
        expect.objectContaining({
          cacheTime: 5 * 60 * 1000,
          retries: 3,
          timeout: 15000,
        })
      );
    });

    it('should use default user name when no name is provided', async () => {
      mockApiClient.get.mockResolvedValue({
        data: mockProfile,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
      });

      await userService.getUserProfile();

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/Ricky%20Chen',
        expect.any(Object)
      );
    });

    it('should return null for invalid profile data', async () => {
      mockApiClient.get.mockResolvedValue({
        data: { invalid: 'data' } as any,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
      });

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = await userService.getUserProfile('John Doe');

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(
        '❌ Invalid user profile data structure'
      );

      consoleSpy.mockRestore();
    });

    it('should throw error when API call fails', async () => {
      const error = new Error('API Error');
      mockApiClient.get.mockRejectedValue(error);

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await expect(userService.getUserProfile('John Doe')).rejects.toThrow('API Error');

      expect(consoleSpy).toHaveBeenCalledWith(
        '❌ Error fetching user profile:',
        expect.objectContaining({
          message: 'API Error',
        })
      );

      consoleSpy.mockRestore();
    });

    it('should handle profile with missing optional arrays', async () => {
      const minimalProfile: UserProfile = {
        name: 'John Doe',
        title: 'Engineer',
        location: 'NYC',
        bio: 'Bio',
        stats: [],
        academics: [],
        certifications: [],
        contacts: [],
        honors: [],
        languages: [],
        projects: [],
        softSkills: [],
        technicalSkills: [],
        experiences: [],
      };

      mockApiClient.get.mockResolvedValue({
        data: minimalProfile,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
      });

      const result = await userService.getUserProfile('John Doe');

      expect(result).toEqual(minimalProfile);
    });
  });

  describe('isValidProfile (private method tested via getUserProfile)', () => {
    it('should reject non-object data', async () => {
      mockApiClient.get.mockResolvedValue({
        data: null as any,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
      });

      const result = await userService.getUserProfile('John Doe');

      expect(result).toBeNull();
    });

    it('should reject data with missing required fields', async () => {
      mockApiClient.get.mockResolvedValue({
        data: {
          name: 'John',
          // Missing title, location, bio, etc.
        } as any,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
      });

      const result = await userService.getUserProfile('John Doe');

      expect(result).toBeNull();
    });

    it('should reject data with non-array fields', async () => {
      mockApiClient.get.mockResolvedValue({
        data: {
          name: 'John',
          title: 'Engineer',
          location: 'NYC',
          bio: 'Bio',
          stats: 'not an array' as any,
          academics: [],
          certifications: [],
          contacts: [],
          honors: [],
          languages: [],
          projects: [],
          softSkills: [],
          technicalSkills: [],
          experiences: [],
        },
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
      });

      const result = await userService.getUserProfile('John Doe');

      expect(result).toBeNull();
    });
  });
});

