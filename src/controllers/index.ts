/**
 * Controllers Index
 * Centralized export for all controllers
 * 
 * Usage:
 * import { AboutMeController, BaseController } from '@/controllers';
 * import { MainPageController } from '@/controllers';
 */

// Base Controller
export { BaseController, IBaseController } from './base-controller';
import { BaseController } from './base-controller';

// Section Controllers
export { AboutMeController } from './about-me-controller';
import { AboutMeController } from './about-me-controller';
export { AcademicController } from './academic-controller';
import { AcademicController } from './academic-controller';
export { TechnicalSkillsController } from './technical-skills-controller';
import { TechnicalSkillsController } from './technical-skills-controller';
export { ContactController } from './contact-controller';
import { ContactController } from './contact-controller';
export { CertificationController } from './certification-controller';
import { CertificationController } from './certification-controller';
export { HonorsController } from './honors-controller';
import { HonorsController } from './honors-controller';
export { LanguageController } from './language-controller';
import { LanguageController } from './language-controller';
export { SoftSkillsController } from './soft-skills-controller';
import { SoftSkillsController } from './soft-skills-controller';
export { WorkExperienceController } from './work-experience-controller';
import { WorkExperienceController } from './work-experience-controller';
export { ProjectController } from './project-controller';
import { ProjectController } from './project-controller';

// Page Controllers
export { MainPageController } from './main-page-controller';
export { FooterController } from './footer-controller';
export { default as NavbarController } from './navbar-controller';

/**
 * Controller Factory (Optional)
 * Can be used to create controller instances with dependency injection
 * Follows Factory Pattern for object creation
 */
export class ControllerFactory {
  /**
   * Create a controller instance
   * @param ControllerClass - Controller class to instantiate
   * @param args - Constructor arguments
   * @returns Controller instance
   */
  static create<T extends BaseController>(
    ControllerClass: new (...args: any[]) => T,
    ...args: any[]
  ): T {
    return new ControllerClass(...args);
  }

  /**
   * Create all section controllers
   * Useful for bulk initialization
   * @returns Object containing all section controller instances
   */
  static createAllSectionControllers(): {
    aboutMe: AboutMeController;
    academic: AcademicController;
    technicalSkills: TechnicalSkillsController;
    contact: ContactController;
    certification: CertificationController;
    honors: HonorsController;
    language: LanguageController;
    softSkills: SoftSkillsController;
    workExperience: WorkExperienceController;
    project: ProjectController;
  } {
    return {
      aboutMe: new AboutMeController(),
      academic: new AcademicController(),
      technicalSkills: new TechnicalSkillsController(),
      contact: new ContactController(),
      certification: new CertificationController(),
      honors: new HonorsController(),
      language: new LanguageController(),
      softSkills: new SoftSkillsController(),
      workExperience: new WorkExperienceController(),
      project: new ProjectController(),
    };
  }
}

