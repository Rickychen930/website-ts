// src/data/user.ts

import { UserProfile } from "../types/user";

export const userData: UserProfile = {
  name: "Ricky Chen",
  title: "Software Engineer & AI Researcher",
  location: "Sydney, Australia",
  bio: "Experienced in backend, mobile, and frontend development, with hands-on projects at Samsung R&D and Apple Developer Academy. Strong foundation in algorithms and competitive programming. Currently preparing for a Master of Artificial Intelligence at UTS, driven to build scalable tech with real-world impact.",
  stats: [
    { value: "2+", label: "Years of Experience" },
    { value: "8", label: "Projects Delivered" },
    { value: "1M+", label: "Users Impacted" },
  ],
  academics: [
    {
      key: "bachelor",
      icon: "🎓",
      title: "Bachelor's Degree in Computer Science",
      institution: "Binus University – Indonesia",
      period: "2019 – 2023",
      description:
        "Bachelor of Computer Science | GPA: 3.83/4.00 | Focused on software engineering, algorithms, data structures, and software development methodologies. Completed capstone project in IoT and computer vision.",
    },
    {
      key: "master",
      icon: "📘",
      title: "Master's Degree in Artificial Intelligence",
      institution: "University of Technology Sydney – Australia",
      period: "2025 – 2027",
      description:
        "Master of Artificial Intelligence | Specializing in machine learning, deep learning, and AI applications. Expected graduation in 2027.",
    },
  ],
  certifications: [
    {
      key: "sololearn",
      icon: "📜",
      title: "Multiple Programming Languages Certification",
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
        "Ranked 3rd in a Southeast Asia-wide coding competition. Collaborated in a team to solve advanced algorithmic challenges using C++, Python, and Java under time pressure. Demonstrated strong problem-solving skills and algorithmic thinking.",
    },
    {
      key: "codeforces",
      icon: "⚔️",
      title: "Codeforces Specialist",
      event: "Codeforces Platform",
      date: "Ongoing",
      description:
        "Achieved Specialist rating (1450) with 171 problems solved. Actively participates in contests and algorithmic challenges. Consistently solving problems across various difficulty levels including dynamic programming, graph algorithms, and data structures.",
    },
    {
      key: "kattis",
      icon: "🏆",
      title: "Top Global Programmer",
      event: "Kattis Platform",
      date: "Ongoing",
      description:
        "Ranked 5510 globally with a score of 220.4. Ranked among top global programmers. Skilled in C++, Python, and Java. Demonstrates proficiency in competitive programming and algorithmic problem-solving.",
    },
    {
      key: "leetcode",
      icon: "🧱",
      title: "LeetCode Problem Solver",
      event: "LeetCode Platform",
      date: "Ongoing",
      description:
        "Solved 84+ problems covering data structures, algorithms, and system design. Skilled in C++, Python, and Java. Focused on improving problem-solving efficiency and code optimization.",
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
        "A smart agriculture app integrated with IoT devices to monitor soil parameters in real time. Enables automated responses based on environmental data, helping farmers maintain optimal soil conditions and improve crop productivity. Built during Apple Developer Academy using Swift, SwiftUI, and IoT integration. Features include real-time sensor data visualization, automated irrigation control, and predictive analytics for crop management.",
    },
    {
      key: "kabisa",
      icon: "🧠",
      name: "Kabisa",
      date: "2023",
      description:
        "An educational app introducing Sundanese script through game-based learning. Designed to preserve traditional language and culture. Presented in academic forums and published in IEEE. Built with Swift and SwiftUI, featuring interactive learning modules, gamification elements, and cultural preservation features. The app helps users learn Sundanese script through engaging gameplay and educational content.",
    },
    {
      key: "lemot",
      icon: "💡",
      name: "L-emot",
      date: "2022",
      description:
        "A smart lamp controller built with Arduino and custom hardware. Enabled wireless control of lighting through embedded systems and software integration. Demonstrates practical IoT applications in home automation. Features include mobile app control, scheduling, brightness adjustment, and energy monitoring. Integrated Arduino microcontroller with Bluetooth connectivity for seamless device control.",
    },
    {
      key: "markir",
      icon: "🚗",
      name: "M-arkir",
      date: "2022",
      description:
        "A license plate recognition system using Python and OpenCV. Integrated with Arduino for hardware control, combining C++ and Python to enable real-time image processing and automated response. Built as a university project. Features include real-time video processing, OCR for license plate recognition, database storage, and automated gate control. Demonstrates expertise in computer vision and embedded systems integration.",
    },
    {
      key: "tvplugin",
      icon: "📺",
      name: "TV Plugin – SmartThings",
      date: "May 2023 – May 2024",
      description:
        "Developed a TV control plugin for Samsung SmartThings app. Enabled device discovery, remote control, and status monitoring for smart TVs. Contributed to One UI 6 enhancements and improved user experience for millions of users. Built with TypeScript, Node.js, and Samsung SmartThings SDK. Features include device discovery, remote control functionality, status monitoring, and seamless integration with SmartThings ecosystem. This project directly impacted millions of users worldwide.",
    },
    {
      key: "phowto",
      icon: "📸",
      name: "Phowto",
      date: "2022",
      description:
        "A photography tutorial app developed during Apple Developer Academy. Provides interactive tutorials and guides for photography enthusiasts. Built with Swift and SwiftUI, featuring video tutorials, step-by-step guides, and community features. Helps users learn photography techniques and improve their skills through structured learning paths.",
    },
    {
      key: "reguards",
      icon: "🛡️",
      name: "Reguards",
      date: "2022",
      description:
        "A women's travel safety app developed during Apple Developer Academy. Designed to enhance safety for women travelers through real-time location sharing, emergency contacts, and safety alerts. Built with Swift and SwiftUI, featuring GPS tracking, emergency SOS functionality, and community safety features. Provides peace of mind for travelers and their families.",
    },
    {
      key: "giftforyou.idn",
      icon: "🛍️",
      name: "giftforyou.idn",
      date: "2025",
      description:
        "A full-stack e-commerce platform for bouquet shopping in Indonesia. Built with React, TypeScript, Express.js, and MongoDB, featuring a modern and responsive user interface. The platform enables customers to browse, customize, and purchase bouquets with seamless payment integration and order tracking. Implemented RESTful API architecture, secure authentication, and efficient database design to ensure scalability and performance. Features include product catalog management, shopping cart functionality, user authentication, order management, and real-time inventory tracking. Demonstrates expertise in full-stack development, API design, and building production-ready e-commerce solutions.",
    },
  ],

  softSkills: [
    {
      key: "agile",
      icon: "⚙️",
      name: "Agile & Scrum Development",
      description:
        "Experienced in collaborative development environments using Agile methodology and Scrum practices. Successfully delivered multiple projects using sprint planning, daily standups, and retrospective meetings. Adaptable to changing requirements and able to work effectively in cross-functional teams.",
    },
    {
      key: "analytical",
      icon: "🧠",
      name: "Analytical Thinking",
      description:
        "Able to break down complex problems and identify efficient, scalable solutions. Strong foundation in algorithms and data structures. Experienced in analyzing system performance, optimizing code, and making data-driven decisions.",
    },
    {
      key: "adaptability",
      icon: "🔄",
      name: "Adaptability",
      description:
        "Quick to learn new technologies and adjust to changing project requirements and team dynamics. Successfully transitioned between different tech stacks including iOS development, backend development, and IoT systems. Comfortable working in fast-paced environments.",
    },
    {
      key: "collaboration",
      icon: "🤝",
      name: "Collaboration",
      description:
        "Strong team player with excellent communication skills and a proactive attitude toward shared goals. Experienced in pair programming, code reviews, and knowledge sharing. Able to work effectively with designers, product managers, and other stakeholders.",
    },
    {
      key: "leadership",
      icon: "👥",
      name: "Leadership",
      description:
        "Demonstrated leadership in team projects and competitive programming competitions. Able to guide team members, delegate tasks effectively, and ensure project delivery on time. Experience mentoring junior developers and sharing technical knowledge.",
    },
    {
      key: "problem-solving",
      icon: "🔧",
      name: "Problem Solving",
      description:
        "Strong problem-solving skills demonstrated through competitive programming achievements and real-world project challenges. Able to approach problems from multiple angles and find creative solutions. Experienced in debugging complex systems and optimizing performance.",
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
      items: ["Node.js", "Express.js", "UIKit", "SwiftUI", "React", "OpenCV"],
    },
    {
      category: "Databases",
      items: ["MySQL", "MongoDB", "SQLite"],
    },
    {
      category: "Tools & Platforms",
      items: [
        "Git",
        "GitHub",
        "RESTful APIs",
        "Agile & Scrum",
        "Docker",
        "Arduino",
        "IoT Platforms",
      ],
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
        "Backend Development",
        "API Development",
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
        "Enhanced SmartThings app functionality and performance. Developed TV Plugin for seamless smart TV integration, enabling device discovery, remote control, and status monitoring. Contributed to One UI 6 enhancements, improving UI/UX and accessibility across devices. Focused on TypeScript, modular architecture, and scalable design. Worked in an Agile environment with cross-functional teams. Technologies used: TypeScript, Node.js, Samsung SmartThings SDK, REST APIs, Git. Impact: Improved user experience for millions of SmartThings users worldwide.",
    },
    {
      key: "apple",
      icon: "🍎",
      title: "Software Engineer",
      company: "Apple Developer Academy – Tangerang",
      period: "Mar 2022 – Dec 2022",
      description:
        "Mastered Swift, UIKit, SwiftUI, GitHub, and soft skills through intensive training program. Developed five projects including Phowto (photography tutorials), Reguards (women's travel safety), and Bottani (farm management with remote control). Participated in design thinking workshops, user research, and iterative development processes. Collaborated with designers and other developers to create user-centered applications. Technologies used: Swift, SwiftUI, UIKit, Xcode, Git, Core Data, Core Location, AVFoundation. Gained expertise in iOS development lifecycle, app architecture, and best practices.",
    },
  ],
};
