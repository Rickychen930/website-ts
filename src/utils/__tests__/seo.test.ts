/**
 * Unit tests for SEO utilities
 */

import {
  updateTitle,
  updateMetaTag,
  updateOGTag,
  updateTwitterTag,
  generateStructuredData,
  injectStructuredData,
  updateSEOFromProfile,
  initializeSEO,
} from '../seo';
import { UserProfile } from '../../types/user';

describe('SEO Utilities', () => {
  beforeEach(() => {
    // Clear document head before each test
    document.head.innerHTML = '';
    document.title = '';
  });

  describe('updateTitle', () => {
    it('should update document title', () => {
      updateTitle('Test Title');
      expect(document.title).toBe('Test Title');
    });
  });

  describe('updateMetaTag', () => {
    it('should create new meta tag if it does not exist', () => {
      updateMetaTag('description', 'Test description');
      const meta = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      expect(meta).toBeTruthy();
      expect(meta.content).toBe('Test description');
    });

    it('should update existing meta tag', () => {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Old description';
      document.head.appendChild(meta);

      updateMetaTag('description', 'New description');
      expect(meta.content).toBe('New description');
    });
  });

  describe('updateOGTag', () => {
    it('should create new OG tag if it does not exist', () => {
      updateOGTag('og:title', 'Test OG Title');
      const meta = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
      expect(meta).toBeTruthy();
      expect(meta.content).toBe('Test OG Title');
    });

    it('should update existing OG tag', () => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:title');
      meta.content = 'Old OG Title';
      document.head.appendChild(meta);

      updateOGTag('og:title', 'New OG Title');
      expect(meta.content).toBe('New OG Title');
    });
  });

  describe('updateTwitterTag', () => {
    it('should create new Twitter tag if it does not exist', () => {
      updateTwitterTag('twitter:card', 'summary');
      const meta = document.querySelector('meta[name="twitter:card"]') as HTMLMetaElement;
      expect(meta).toBeTruthy();
      expect(meta.content).toBe('summary');
    });
  });

  describe('generateStructuredData', () => {
    const mockProfile: UserProfile = {
      name: 'John Doe',
      title: 'Software Engineer',
      location: 'New York, USA',
      bio: 'Experienced software engineer',
      stats: [],
      academics: [],
      certifications: [],
      contacts: [
        {
          key: 'linkedin',
          icon: 'linkedin',
          label: 'LinkedIn',
          value: 'john-doe',
          link: 'https://linkedin.com/in/john-doe',
        },
        {
          key: 'github',
          icon: 'github',
          label: 'GitHub',
          value: 'johndoe',
          link: 'https://github.com/johndoe',
        },
      ],
      honors: [],
      languages: [],
      projects: [],
      softSkills: [],
      technicalSkills: [
        {
          category: 'Frontend',
          items: ['React', 'TypeScript', 'CSS'],
        },
        {
          category: 'Backend',
          items: ['Node.js', 'Express'],
        },
      ],
      experiences: [
        {
          key: 'exp1',
          icon: 'work',
          title: 'Senior Developer',
          company: 'Tech Corp',
          period: '2020 - Present',
          description: 'Led development team',
        },
      ],
    };

    beforeEach(() => {
      // Mock window.location
      Object.defineProperty(window, 'location', {
        value: {
          href: 'https://example.com',
        },
        writable: true,
      });
    });

    it('should generate valid structured data', () => {
      const data = generateStructuredData(mockProfile);

      expect(data).toHaveProperty('@context', 'https://schema.org');
      expect(data).toHaveProperty('@type', 'Person');
      expect(data).toHaveProperty('name', 'John Doe');
      expect(data).toHaveProperty('jobTitle', 'Software Engineer');
      expect(data).toHaveProperty('description', 'Experienced software engineer');
    });

    it('should include sameAs links from contacts', () => {
      const data = generateStructuredData(mockProfile);

      expect(data).toHaveProperty('sameAs');
      expect(Array.isArray(data.sameAs)).toBe(true);
      expect(data.sameAs).toContain('https://linkedin.com/in/john-doe');
      expect(data.sameAs).toContain('https://github.com/johndoe');
    });

    it('should include technical skills as knowsAbout', () => {
      const data = generateStructuredData(mockProfile);

      expect(data).toHaveProperty('knowsAbout');
      expect(Array.isArray(data.knowsAbout)).toBe(true);
      expect(data.knowsAbout.length).toBe(5); // React, TypeScript, CSS, Node.js, Express
      expect(data.knowsAbout[0]).toHaveProperty('@type', 'Thing');
      expect(data.knowsAbout[0]).toHaveProperty('name', 'React');
    });

    it('should include work experience', () => {
      const data = generateStructuredData(mockProfile);

      expect(data).toHaveProperty('worksFor');
      expect(Array.isArray(data.worksFor)).toBe(true);
      expect(data.worksFor[0]).toHaveProperty('@type', 'Organization');
      expect(data.worksFor[0]).toHaveProperty('name', 'Tech Corp');
      expect(data.worksFor[0]).toHaveProperty('jobTitle', 'Senior Developer');
    });

    it('should handle empty arrays', () => {
      const emptyProfile: UserProfile = {
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

      const data = generateStructuredData(emptyProfile);

      expect(data).toHaveProperty('name', 'John Doe');
      expect(data).not.toHaveProperty('knowsAbout');
      expect(data).not.toHaveProperty('worksFor');
    });

    it('should filter contacts without links', () => {
      const profileWithNoLinks: UserProfile = {
        ...mockProfile,
        contacts: [
          {
            key: 'email',
            icon: 'email',
            label: 'Email',
            value: 'john@example.com',
            // No link property
          },
        ],
      };

      const data = generateStructuredData(profileWithNoLinks);

      expect(data.sameAs).toEqual([]);
    });
  });

  describe('injectStructuredData', () => {
    it('should inject structured data script', () => {
      const data = { '@type': 'Person', name: 'John Doe' };
      injectStructuredData(data);

      const script = document.querySelector('script[type="application/ld+json"]');
      expect(script).toBeTruthy();
      expect(script?.textContent).toBe(JSON.stringify(data));
    });

    it('should replace existing structured data', () => {
      const oldData = { '@type': 'Person', name: 'Old Name' };
      const newData = { '@type': 'Person', name: 'New Name' };

      injectStructuredData(oldData);
      injectStructuredData(newData);

      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      expect(scripts.length).toBe(1);
      expect(scripts[0]?.textContent).toBe(JSON.stringify(newData));
    });
  });

  describe('updateSEOFromProfile', () => {
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

    beforeEach(() => {
      Object.defineProperty(window, 'location', {
        value: {
          origin: 'https://example.com',
          href: 'https://example.com',
        },
        writable: true,
      });
    });

    it('should update all SEO metadata', () => {
      updateSEOFromProfile(mockProfile);

      expect(document.title).toBe('John Doe - Software Engineer | Portfolio');
      
      const description = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      expect(description?.content).toBe('Test bio');

      const ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
      expect(ogTitle?.content).toBe('John Doe - Software Engineer | Portfolio');

      const twitterCard = document.querySelector('meta[name="twitter:card"]') as HTMLMetaElement;
      expect(twitterCard?.content).toBe('summary_large_image');
    });

    it('should inject structured data', () => {
      updateSEOFromProfile(mockProfile);

      const script = document.querySelector('script[type="application/ld+json"]');
      expect(script).toBeTruthy();
      const data = JSON.parse(script?.textContent || '{}');
      expect(data['@type']).toBe('Person');
      expect(data.name).toBe('John Doe');
    });
  });

  describe('initializeSEO', () => {
    it('should set default SEO values', () => {
      initializeSEO();

      expect(document.title).toBe('Ricky Chen - Software Engineer Portfolio');
      
      const description = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      expect(description?.content).toContain('Professional portfolio');
    });
  });
});

