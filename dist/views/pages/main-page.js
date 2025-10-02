"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// pages/main-page.tsx
const react_1 = __importDefault(require("react"));
const navbar_component_1 = __importDefault(require("../components/navbar-component"));
const base_page_1 = __importDefault(require("./base-page"));
const about_me_section_1 = __importDefault(require("./sections/about-me-section"));
const academic_section_1 = __importDefault(require("./sections/academic-section"));
const honour_section_1 = __importDefault(require("./sections/honour-section"));
const certifications_section_1 = __importDefault(require("./sections/certifications-section"));
const technical_skills_section_1 = __importDefault(require("./sections/technical-skills-section"));
const work_experience_section_1 = __importDefault(require("./sections/work-experience-section"));
const projects_section_1 = __importDefault(require("./sections/projects-section"));
const soft_skills_section_1 = __importDefault(require("./sections/soft-skills-section"));
const languages_section_1 = __importDefault(require("./sections/languages-section"));
const contact_section_1 = __importDefault(require("./sections/contact-section"));
const section_block_1 = __importDefault(require("./sections/section-block"));
require("../../assets/css/main-page.css");
const main_controller_1 = __importDefault(require("../../controllers/main-controller"));
class MainPage extends base_page_1.default {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            name: "",
            profile: null,
            loading: true,
        };
        this.controller = new main_controller_1.default();
    }
    async componentDidMount() {
        try {
            const profile = await this.controller.getUserProfile();
            this.setState({ profile, loading: false });
        }
        catch (err) {
            console.error("Failed to load profile:", err);
            this.setState({ loading: false });
        }
    }
    renderNavbar() {
        return <navbar_component_1.default items={this.controller.getNavbarItems()}/>;
    }
    renderSections() {
        const { profile, loading } = this.state;
        if (loading) {
            return <div className="loading">Loading profile...</div>;
        }
        if (!profile) {
            return <div className="error">Failed to load profile data.</div>;
        }
        return (<div className="contents-section">
        <section_block_1.default id="about" title="About Me">
          <about_me_section_1.default data={profile}/>
        </section_block_1.default>
        <section_block_1.default id="academic" title="Academic">
          <academic_section_1.default data={profile.academics}/>
        </section_block_1.default>
        <section_block_1.default id="honors" title="Honors">
          <honour_section_1.default data={profile.honors}/>
        </section_block_1.default>
        <section_block_1.default id="certifications" title="Certifications">
          <certifications_section_1.default data={profile.certifications}/>
        </section_block_1.default>
        <section_block_1.default id="skills" title="Technical Skills">
          <technical_skills_section_1.default data={profile.technicalSkills}/>
        </section_block_1.default>
        <section_block_1.default id="experience" title="Work Experience">
          <work_experience_section_1.default data={profile.experiences}/>
        </section_block_1.default>
        <section_block_1.default id="projects" title="Projects">
          <projects_section_1.default data={profile.projects}/>
        </section_block_1.default>
        <section_block_1.default id="soft-skills" title="Soft Skills">
          <soft_skills_section_1.default data={profile.softSkills}/>
        </section_block_1.default>
        <section_block_1.default id="languages" title="Languages">
          <languages_section_1.default data={profile.languages}/>
        </section_block_1.default>
        <section_block_1.default id="contact" title="Contact">
          <contact_section_1.default data={profile.contacts}/>
        </section_block_1.default>
      </div>);
    }
    renderContent() {
        return (<div className="main-page">
        {this.renderNavbar()}
        {this.renderSections()}
      </div>);
    }
    renderFooter() {
        return <footer className="footer">© 2025 Ricky Inc.</footer>;
    }
}
exports.default = MainPage;
