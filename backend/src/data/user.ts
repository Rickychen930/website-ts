// src/data/user.ts
import { UserProfile } from "../../../src/types/user";

export const userData: UserProfile = {
  name: "Ricky Chen",
  title: "Software Engineer & AI Researcher",
  location: "Sydney, Australia",
  bio: "Experienced in backend, mobile, and frontend development, with hands-on projects at Samsung R&D and Apple Developer Academy. Strong foundation in algorithms and competitive programming. Currently preparing for a Master of Artificial Intelligence at UTS, driven to build scalable tech with real-world impact.",
  stats: [
    { value: "2", label: "Years of Experience" },
    { value: "8", label: "Projects Delivered" },
    { value: "1M+", label: "Users Impacted" },
  ],
  academics: [
    {
      key: "bachelor",
      icon: "🎓",
      title: "Bachelor’s Degree",
      institution: "Binus University – Indonesia",
      period: "2019 – 2023",
      description: "Bachelor of Computer Science | GPA: 3.83/4.00",
    },
    {
      key: "master",
      icon: "📘",
      title: "Master’s Degree",
      institution: "University of Technology Sydney – Australia",
      period: "2025 – 2027",
      description: "Master of Artificial Intelligence",
    },
  ],
  certifications: [
    {
      key: "sololearn",
      icon: "📜",
      title: "jQuery, Python 3, JavaScript, CSS, HTML, C, C++",
      provider: "SoloLearn",
      date: "Feb 2020",
    },
    {
      key: "oracle",
      icon: "🗃️",
      title: "Databases for Developers",
      provider: "Oracle",
      date: "Apr 2021",
    },
    {
      key: "udemy",
      icon: "📱",
      title: "iOS & Swift Development",
      provider: "Udemy",
      date: "Feb 2023",
    },
  ],
  contacts: [
    {
      key: "email",
      icon: "✉️",
      label: "Email",
      value: "rickychen930@gmail.com",
      link: "mailto:rickychen930@gmail.com",
    },
    {
      key: "linkedin",
      icon: "🔗",
      label: "LinkedIn",
      value: "linkedin.com/in/rickychen930",
      link: "https://www.linkedin.com/in/rickychen930",
    },
    {
      key: "github",
      icon: "💻",
      label: "GitHub",
      value: "github.com/rickychen930",
      link: "https://github.com/rickychen930",
    },
  ],
  honors: [
    {
      key: "widyatama",
      icon: "🥉",
      title: "3rd Place – Competitive Programming",
      event: "Widyatama International Coding Competition",
      date: "Jan 2021",
      description:
        "Ranked 3rd in a Southeast Asia-wide coding competition. Collaborated in a team to solve advanced algorithmic challenges using C++, Python, and Java under time pressure.",
    },
    {
      key: "codeforces",
      icon: "⚔️",
      title: "Codeforces Specialist",
      event: "Codeforces Platform",
      date: "Ongoing",
      description:
        "Achieved Specialist rating (1450) with 171 problems solved. Actively participates in contests and algorithmic challenges.",
    },
    {
      key: "kattis",
      icon: "🏆",
      title: "Top Global Programmer",
      event: "Kattis Platform",
      date: "Ongoing",
      description:
        "ranked 5510 with a score of 220.4. Ranked among top global programmers. Skilled in C++, Python, and Java.",
    },
    {
      key: "leetcode",
      icon: "🧱",
      title: "Top Global Programmer",
      event: "leetcode Platform",
      date: "Ongoing",
      description: "Solved 84 problems. Skilled in C++, Python, and Java.",
    },
  ],
  languages: [
    {
      key: "indonesian",
      icon: "🇮🇩",
      name: "Bahasa Indonesia",
      proficiency: "Native",
    },
    {
      key: "english",
      icon: "🇬🇧",
      name: "English",
      proficiency: "Professional Working Proficiency",
    },
  ],
  projects: [
    {
      key: "bottani",
      icon: "🌿",
      name: "Bottani",
      date: "Aug 2022 – Dec 2022",
      description:
        "A smart agriculture app integrated with IoT devices to monitor soil parameters in real time. Enables automated responses based on environmental data, helping farmers maintain optimal soil conditions and improve crop productivity. Built during Apple Developer Academy.",
    },
    {
      key: "kabisa",
      icon: "🧠",
      name: "Kabisa",
      date: "2023",
      description:
        "An educational app introducing Sundanese script through game-based learning. Designed to preserve traditional language and culture. Presented in academic forums and published in IEEE.",
    },
    {
      key: "lemot",
      icon: "💡",
      name: "L-emot",
      date: "2022",
      description:
        "A smart lamp controller built with Arduino and custom hardware. Enabled wireless control of lighting through embedded systems and software integration. Demonstrates practical IoT applications in home automation.",
    },
    {
      key: "markir",
      icon: "🚗",
      name: "M-arkir",
      date: "2022",
      description:
        "A license plate recognition system using Python and OpenCV. Integrated with Arduino for hardware control, combining C++ and Python to enable real-time image processing and automated response. Built as a university project.",
    },
    {
      key: "tvplugin",
      icon: "📺",
      name: "TV Plugin – SmartThings",
      date: "2023",
      description:
        "Developed a TV control plugin for Samsung SmartThings app. Enabled device discovery, remote control, and status monitoring for smart TVs. Contributed to One UI 6 enhancements and improved user experience for millions.",
    },
  ],

  softSkills: [
    {
      key: "agile",
      icon: "⚙️",
      name: "Agile & Scrum Development",
      description:
        "Experienced in collaborative development environments using Agile methodology and Scrum practices.",
    },
    {
      key: "analytical",
      icon: "🧠",
      name: "Analytical Thinking",
      description:
        "Able to break down complex problems and identify efficient, scalable solutions.",
    },
    {
      key: "adaptability",
      icon: "🔄",
      name: "Adaptability",
      description:
        "Quick to learn new technologies and adjust to changing project requirements and team dynamics.",
    },
    {
      key: "collaboration",
      icon: "🤝",
      name: "Collaboration",
      description:
        "Strong team player with excellent communication skills and a proactive attitude toward shared goals.",
    },
  ],
  technicalSkills: [
    {
      category: "Programming Languages",
      items: [
        "Python",
        "Swift",
        "JavaScript",
        "TypeScript",
        "C",
        "C++",
        "Java",
      ],
    },
    {
      category: "Frameworks & Libraries",
      items: ["Node.js", "Express.js", "UIKit", "SwiftUI"],
    },
    {
      category: "Databases",
      items: ["MySQL", "MongoDB"],
    },
    {
      category: "Tools & Platforms",
      items: ["Git", "GitHub", "RESTful APIs", "Agile & Scrum"],
    },
    {
      category: "Specialties",
      items: [
        "iOS Development",
        "Machine Learning",
        "Data Analysis",
        "Competitive Programming",
        "Embedded Systems",
        "Computer Vision",
        "Internet of Things (IoT)",
      ],
    },
  ],

  experiences: [
    {
      key: "samsung",
      icon: "📺",
      title: "Software Engineer",
      company: "Samsung R&D Institute – Jakarta",
      period: "May 2023 – May 2024",
      description:
        "Enhanced SmartThings app functionality and performance. Developed TV Plugin for seamless smart TV integration. Contributed to One UI 6, improving UI/UX and accessibility across devices. Focused on TypeScript, modular architecture, and scalable design.",
    },
    {
      key: "apple",
      icon: "🍎",
      title: "Software Engineer",
      company: "Apple Developer Academy – Tangerang",
      period: "Mar 2022 – Dec 2022",
      description:
        "Mastered Swift, UIKit, SwiftUI, GitHub, and soft skills. Developed five projects including Phowto (photography tutorials), Reguards (women’s travel safety), and Bottani (farm management with remote control).",
    },
  ],
};
