// pages/main-page.tsx
import React, { ReactNode } from "react";
import Navbar from "../components/navbar-component";
import BasePage, { BasePageState } from "./base-page";
import AboutMeSection from "./sections/about-me-section";
import AcademicSection from "./sections/academic-section";
import HonorsSection from "./sections/honour-section";
import CertificationSection from "./sections/certifications-section";
import TechnicalSkillsSection from "./sections/technical-skills-section";
import WorkExperienceSection from "./sections/work-experience-section";
import ProjectsSection from "./sections/projects-section";
import SoftSkillsSection from "./sections/soft-skills-section";
import LanguagesSection from "./sections/languages-section";
import ContactSection from "./sections/contact-section";
import SectionBlock from "./sections/section-block";
import "../../assets/css/main-page.css";
import MainController from "../../controllers/main-controller";
import { UserProfile } from "../../types/user";

type MainPageState = BasePageState & {
  name: string;
  profile: UserProfile | null;
  loading: boolean;
};

class MainPage extends BasePage<{}, MainPageState> {
  private controller: MainController;

  constructor(props: {}) {
    super(props);
    this.state = {
      ...this.state,
      name: "",
      profile: null,
      loading: true,
    };
    this.controller = new MainController();
  }

  async componentDidMount(): Promise<void> {
    try {
      const profile = await this.controller.getUserProfile();
      this.setState({ profile, loading: false });
    } catch (err) {
      console.error("Failed to load profile:", err);
      this.setState({ loading: false });
    }
  }

  private renderNavbar(): ReactNode {
    return <Navbar items={this.controller.getNavbarItems()} />;
  }

  private renderSections(): ReactNode {
    const { profile, loading } = this.state;

    if (loading) {
      return <div className="loading">Loading profile...</div>;
    }

    if (!profile) {
      return <div className="error">Failed to load profile data.</div>;
    }

    return (
      <div className="contents-section">
        <SectionBlock id="about" title="About Me">
          <AboutMeSection data={profile} />
        </SectionBlock>
        <SectionBlock id="academic" title="Academic">
          <AcademicSection data={profile.academics} />
        </SectionBlock>
        <SectionBlock id="honors" title="Honors">
          <HonorsSection data={profile.honors} />
        </SectionBlock>
        <SectionBlock id="certifications" title="Certifications">
          <CertificationSection data={profile.certifications} />
        </SectionBlock>
        <SectionBlock id="skills" title="Technical Skills">
          <TechnicalSkillsSection data={profile.technicalSkills} />
        </SectionBlock>
        <SectionBlock id="experience" title="Work Experience">
          <WorkExperienceSection data={profile.experiences} />
        </SectionBlock>
        <SectionBlock id="projects" title="Projects">
          <ProjectsSection data={profile.projects} />
        </SectionBlock>
        <SectionBlock id="soft-skills" title="Soft Skills">
          <SoftSkillsSection data={profile.softSkills} />
        </SectionBlock>
        <SectionBlock id="languages" title="Languages">
          <LanguagesSection data={profile.languages} />
        </SectionBlock>
        <SectionBlock id="contact" title="Contact">
          <ContactSection data={profile.contacts} />
        </SectionBlock>
      </div>
    );
  }

  protected renderContent(): ReactNode {
    return (
      <div className="main-page">
        {this.renderNavbar()}
        {this.renderSections()}
      </div>
    );
  }

  protected renderFooter(): ReactNode {
    return <footer className="footer">© 2025 Ricky Inc.</footer>;
  }
}

export default MainPage;
