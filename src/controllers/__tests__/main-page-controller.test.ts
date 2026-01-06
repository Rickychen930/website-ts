/**
 * Unit tests for MainPageController
 */

import { MainPageController } from '../main-page-controller';
import { UserService } from '../../services/user-service';
import { SectionManager, ISectionConfig } from '../../models/section-model';
import { UserProfile } from '../../types/user';

// Mock dependencies
jest.mock('../../services/user-service');
jest.mock('../../models/section-model');

describe('MainPageController', () => {
  let controller: MainPageController;
  let mockUserService: jest.Mocked<UserService>;
  let mockSectionManager: jest.Mocked<SectionManager>;

  beforeEach(() => {
    jest.clearAllMocks();

    // Create mock instances
    mockUserService = {
      getUserProfile: jest.fn(),
    } as any;

    mockSectionManager = {
      registerSections: jest.fn(),
      getVisibleSections: jest.fn(),
      getSectionById: jest.fn(),
    } as any;

    controller = new MainPageController(mockUserService, mockSectionManager);
  });

  describe('constructor', () => {
    it('should create instance with default dependencies', () => {
      const defaultController = new MainPageController();
      expect(defaultController).toBeInstanceOf(MainPageController);
    });

    it('should create instance with injected dependencies', () => {
      expect(controller).toBeInstanceOf(MainPageController);
    });
  });

  describe('initializeSections', () => {
    it('should register sections with section manager', () => {
      const sections: ISectionConfig[] = [
        { id: 'about', title: 'About', component: jest.fn() as any, dataKey: 'name' },
        { id: 'contact', title: 'Contact', component: jest.fn() as any, dataKey: 'contacts' },
      ];

      controller.initializeSections(sections);

      expect(mockSectionManager.registerSections).toHaveBeenCalledWith(sections);
    });
  });

  describe('getUserProfile', () => {
    const mockProfile: UserProfile = {
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

    it('should fetch user profile from service', async () => {
      mockUserService.getUserProfile.mockResolvedValue(mockProfile);

      const result = await controller.getUserProfile('John Doe');

      expect(result).toEqual(mockProfile);
      expect(mockUserService.getUserProfile).toHaveBeenCalledWith('John Doe');
    });

    it('should return null when service returns null', async () => {
      mockUserService.getUserProfile.mockResolvedValue(null);

      const result = await controller.getUserProfile('John Doe');

      expect(result).toBeNull();
    });

    it('should handle errors gracefully', async () => {
      const error = new Error('Service error');
      mockUserService.getUserProfile.mockRejectedValue(error);

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = await controller.getUserProfile('John Doe');

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith('Failed to load user profile:', error);

      consoleSpy.mockRestore();
    });
  });

  describe('getNavbarItems', () => {
    it('should return array of navbar items', () => {
      const items = controller.getNavbarItems();

      expect(Array.isArray(items)).toBe(true);
      expect(items.length).toBeGreaterThan(0);
      expect(items).toContain('About');
      expect(items).toContain('Contact');
    });

    it('should return a new array (not reference)', () => {
      const items1 = controller.getNavbarItems();
      const items2 = controller.getNavbarItems();

      expect(items1).not.toBe(items2);
      expect(items1).toEqual(items2);
    });
  });

  describe('getVisibleSections', () => {
    it('should delegate to section manager', () => {
      const mockProfile: UserProfile = {
        name: 'John',
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

      const mockSections: ISectionConfig[] = [
        { id: 'about', title: 'About', component: jest.fn() as any, dataKey: 'name' },
      ];

      mockSectionManager.getVisibleSections.mockReturnValue(mockSections);

      const result = controller.getVisibleSections(mockProfile);

      expect(result).toEqual(mockSections);
      expect(mockSectionManager.getVisibleSections).toHaveBeenCalledWith(mockProfile);
    });
  });

  describe('getSectionById', () => {
    it('should delegate to section manager', () => {
      const mockSection: ISectionConfig = {
        id: 'about',
        title: 'About',
        component: jest.fn() as any,
        dataKey: 'name',
      };

      mockSectionManager.getSectionById.mockReturnValue(mockSection);

      const result = controller.getSectionById('about');

      expect(result).toEqual(mockSection);
      expect(mockSectionManager.getSectionById).toHaveBeenCalledWith('about');
    });

    it('should return undefined for non-existent section', () => {
      mockSectionManager.getSectionById.mockReturnValue(undefined);

      const result = controller.getSectionById('nonexistent');

      expect(result).toBeUndefined();
    });
  });
});

