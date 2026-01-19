/**
 * Seed Data - Ricky Chen Profile
 * Improved and normalized structure matching the backend schema
 */

export const seedProfileData = {
  name: "Ricky Chen",
  title: "Software Engineer & AI Researcher",
  location: "Sydney, Australia",
  bio: "Experienced in backend, mobile, and frontend development, with hands-on projects at Samsung R&D and Apple Developer Academy. Strong foundation in algorithms and competitive programming. Currently preparing for a Master of Artificial Intelligence at UTS, driven to build scalable tech with real-world impact.",

  academics: [
    {
      institution: "University of Technology Sydney – Australia",
      degree: "Master of Artificial Intelligence",
      field: "Artificial Intelligence",
      startDate: "2025-02-01",
      endDate: "2027-12-31",
      description:
        "Master of Artificial Intelligence | Specializing in machine learning, deep learning, and AI applications. Expected graduation in 2027.",
    },
    {
      institution: "Binus University – Indonesia",
      degree: "Bachelor of Computer Science",
      field: "Computer Science",
      startDate: "2019-09-01",
      endDate: "2023-06-30",
      description:
        "Bachelor of Computer Science | GPA: 3.83/4.00 | Focused on software engineering, algorithms, data structures, and software development methodologies. Completed capstone project in IoT and computer vision.",
    },
  ],

  certifications: [
    {
      name: "iOS & Swift Development",
      issuer: "Udemy",
      issueDate: "2023-02-01",
      credentialId: "UDEMY-IOS-SWIFT-2023",
      credentialUrl: "https://www.udemy.com",
    },
    {
      name: "Databases for Developers",
      issuer: "Oracle",
      issueDate: "2021-04-01",
      credentialId: "ORACLE-DB-DEV-2021",
      credentialUrl: "https://www.oracle.com",
    },
    {
      name: "Multiple Programming Languages Certification",
      issuer: "SoloLearn",
      issueDate: "2020-02-01",
      credentialId: "SOLOLEARN-MULTI-LANG-2020",
    },
  ],

  contacts: [
    {
      type: "email" as const,
      value: "rickychen930@gmail.com",
      label: "Email",
      isPrimary: true,
    },
    {
      type: "linkedin" as const,
      value: "https://www.linkedin.com/in/rickychen930",
      label: "LinkedIn",
      isPrimary: false,
    },
    {
      type: "github" as const,
      value: "https://github.com/rickychen930",
      label: "GitHub",
      isPrimary: false,
    },
  ],

  experiences: [
    {
      company: "Samsung R&D Institute – Jakarta",
      position: "Software Engineer",
      location: "Jakarta, Indonesia",
      startDate: "2023-05-01",
      endDate: "2024-05-31",
      isCurrent: false,
      description:
        "Enhanced SmartThings app functionality and performance. Developed TV Plugin for seamless smart TV integration, enabling device discovery, remote control, and status monitoring. Contributed to One UI 6 enhancements, improving UI/UX and accessibility across devices. Focused on TypeScript, modular architecture, and scalable design. Worked in an Agile environment with cross-functional teams.",
      achievements: [
        "Developed TV Plugin for SmartThings enabling device discovery, remote control, and status monitoring",
        "Contributed to One UI 6 enhancements improving UI/UX and accessibility",
        "Improved user experience for millions of SmartThings users worldwide",
        "Implemented scalable architecture using TypeScript and Node.js",
      ],
      technologies: [
        "TypeScript",
        "Node.js",
        "Samsung SmartThings SDK",
        "REST APIs",
        "Git",
        "Agile",
        "Scrum",
      ],
    },
    {
      company: "Apple Developer Academy – Tangerang",
      position: "Software Engineer",
      location: "Tangerang, Indonesia",
      startDate: "2022-03-01",
      endDate: "2022-12-31",
      isCurrent: false,
      description:
        "Mastered Swift, UIKit, SwiftUI, GitHub, and soft skills through intensive training program. Developed five projects including Phowto (photography tutorials), Reguards (women's travel safety), and Bottani (farm management with remote control). Participated in design thinking workshops, user research, and iterative development processes. Collaborated with designers and other developers to create user-centered applications.",
      achievements: [
        "Developed five iOS applications using Swift and SwiftUI",
        "Mastered iOS development lifecycle, app architecture, and best practices",
        "Participated in design thinking workshops and user research",
        "Collaborated effectively with designers and developers in cross-functional teams",
      ],
      technologies: [
        "Swift",
        "SwiftUI",
        "UIKit",
        "Xcode",
        "Git",
        "Core Data",
        "Core Location",
        "AVFoundation",
      ],
    },
  ],

  honors: [
    {
      title: "LeetCode Problem Solver",
      issuer: "LeetCode Platform",
      date: "2024-01-01",
      description:
        "Solved 84+ problems covering data structures, algorithms, and system design. Skilled in C++, Python, and Java. Focused on improving problem-solving efficiency and code optimization.",
      url: "https://leetcode.com/rickychen930",
    },
    {
      title: "Top Global Programmer",
      issuer: "Kattis Platform",
      date: "2024-01-01",
      description:
        "Ranked 5510 globally with a score of 220.4. Ranked among top global programmers. Skilled in C++, Python, and Java. Demonstrates proficiency in competitive programming and algorithmic problem-solving.",
      url: "https://open.kattis.com/users/rickychen930",
    },
    {
      title: "Codeforces Specialist",
      issuer: "Codeforces Platform",
      date: "2024-01-01",
      description:
        "Achieved Specialist rating (1450) with 171 problems solved. Actively participates in contests and algorithmic challenges. Consistently solving problems across various difficulty levels including dynamic programming, graph algorithms, and data structures.",
      url: "https://codeforces.com/profile/rickychen930",
    },
    {
      title: "3rd Place – Competitive Programming",
      issuer: "Widyatama International Coding Competition",
      date: "2021-01-15",
      description:
        "Ranked 3rd in a Southeast Asia-wide coding competition. Collaborated in a team to solve advanced algorithmic challenges using C++, Python, and Java under time pressure. Demonstrated strong problem-solving skills and algorithmic thinking.",
    },
  ],

  languages: [
    {
      name: "Bahasa Indonesia",
      proficiency: "native" as const,
    },
    {
      name: "English",
      proficiency: "professional" as const,
    },
  ],

  projects: [
    {
      title: "giftforyou.idn",
      description:
        "A full-stack e-commerce platform for bouquet shopping in Indonesia.",
      longDescription:
        "A full-stack e-commerce platform for bouquet shopping in Indonesia. Built with React, TypeScript, Express.js, and MongoDB, featuring a modern and responsive user interface. The platform enables customers to browse, customize, and purchase bouquets with seamless payment integration and order tracking. Implemented RESTful API architecture, secure authentication, and efficient database design to ensure scalability and performance.",
      technologies: [
        "React",
        "TypeScript",
        "Express.js",
        "MongoDB",
        "Node.js",
        "RESTful APIs",
      ],
      category: "fullstack" as const,
      startDate: "2025-01-01",
      isActive: true,
      githubUrl: "https://github.com/rickychen930/giftforyou.idn",
      achievements: [
        "Built production-ready e-commerce platform with modern tech stack",
        "Implemented secure authentication and payment integration",
        "Designed scalable RESTful API architecture",
        "Created responsive and user-friendly interface",
      ],
      architecture:
        "Full-stack architecture with React frontend, Express.js backend, and MongoDB database. RESTful API design with JWT authentication and secure payment processing.",
    },
    {
      title: "TV Plugin – SmartThings",
      description:
        "Developed a TV control plugin for Samsung SmartThings app enabling device discovery, remote control, and status monitoring.",
      longDescription:
        "Developed a TV control plugin for Samsung SmartThings app. Enabled device discovery, remote control, and status monitoring for smart TVs. Contributed to One UI 6 enhancements and improved user experience for millions of users. Built with TypeScript, Node.js, and Samsung SmartThings SDK.",
      technologies: [
        "TypeScript",
        "Node.js",
        "Samsung SmartThings SDK",
        "REST APIs",
      ],
      category: "backend" as const,
      startDate: "2023-05-01",
      endDate: "2024-05-31",
      isActive: false,
      achievements: [
        "Enabled device discovery and remote control for smart TVs",
        "Improved user experience for millions of SmartThings users worldwide",
        "Integrated seamlessly with SmartThings ecosystem",
        "Implemented modular and scalable architecture",
      ],
    },
    {
      title: "Bottani",
      description:
        "A smart agriculture app integrated with IoT devices to monitor soil parameters in real time.",
      longDescription:
        "A smart agriculture app integrated with IoT devices to monitor soil parameters in real time. Enables automated responses based on environmental data, helping farmers maintain optimal soil conditions and improve crop productivity. Built during Apple Developer Academy using Swift, SwiftUI, and IoT integration.",
      technologies: ["Swift", "SwiftUI", "IoT", "Core Data", "Bluetooth"],
      category: "mobile" as const,
      startDate: "2022-08-01",
      endDate: "2022-12-31",
      isActive: false,
      achievements: [
        "Integrated IoT devices for real-time soil monitoring",
        "Implemented automated irrigation control system",
        "Created predictive analytics for crop management",
        "Built intuitive mobile interface for farmers",
      ],
    },
    {
      title: "Kabisa",
      description:
        "An educational app introducing Sundanese script through game-based learning.",
      longDescription:
        "An educational app introducing Sundanese script through game-based learning. Designed to preserve traditional language and culture. Presented in academic forums and published in IEEE. Built with Swift and SwiftUI, featuring interactive learning modules, gamification elements, and cultural preservation features.",
      technologies: [
        "Swift",
        "SwiftUI",
        "Game Development",
        "Education Technology",
      ],
      category: "mobile" as const,
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      isActive: false,
      githubUrl: "https://github.com/rickychen930/kabisa",
      achievements: [
        "Preserved traditional Sundanese script through gamification",
        "Presented research at academic forums and published in IEEE",
        "Created engaging interactive learning modules",
        "Promoted cultural preservation through technology",
      ],
    },
    {
      title: "Reguards",
      description:
        "A women's travel safety app designed to enhance safety for women travelers.",
      longDescription:
        "A women's travel safety app developed during Apple Developer Academy. Designed to enhance safety for women travelers through real-time location sharing, emergency contacts, and safety alerts. Built with Swift and SwiftUI, featuring GPS tracking, emergency SOS functionality, and community safety features.",
      technologies: [
        "Swift",
        "SwiftUI",
        "Core Location",
        "AVFoundation",
        "GPS",
      ],
      category: "mobile" as const,
      startDate: "2022-03-01",
      endDate: "2022-12-31",
      isActive: false,
      achievements: [
        "Implemented real-time GPS tracking and location sharing",
        "Created emergency SOS functionality for user safety",
        "Built community safety features and alerts",
        "Addressed real-world safety concerns through technology",
      ],
    },
    {
      title: "Phowto",
      description:
        "A photography tutorial app providing interactive tutorials and guides for photography enthusiasts.",
      longDescription:
        "A photography tutorial app developed during Apple Developer Academy. Provides interactive tutorials and guides for photography enthusiasts. Built with Swift and SwiftUI, featuring video tutorials, step-by-step guides, and community features.",
      technologies: ["Swift", "SwiftUI", "AVFoundation", "Video Processing"],
      category: "mobile" as const,
      startDate: "2022-03-01",
      endDate: "2022-12-31",
      isActive: false,
      achievements: [
        "Created comprehensive photography learning platform",
        "Implemented video tutorial system",
        "Built step-by-step interactive guides",
        "Designed engaging user interface for learning",
      ],
    },
    {
      title: "M-arkir",
      description:
        "A license plate recognition system using Python and OpenCV with Arduino integration.",
      longDescription:
        "A license plate recognition system using Python and OpenCV. Integrated with Arduino for hardware control, combining C++ and Python to enable real-time image processing and automated response. Built as a university project.",
      technologies: [
        "Python",
        "OpenCV",
        "Arduino",
        "C++",
        "Computer Vision",
        "OCR",
      ],
      category: "ai" as const,
      startDate: "2022-01-01",
      endDate: "2022-06-30",
      isActive: false,
      achievements: [
        "Implemented real-time license plate recognition using OpenCV",
        "Integrated computer vision with embedded systems",
        "Created automated gate control system",
        "Demonstrated expertise in computer vision and IoT integration",
      ],
    },
    {
      title: "L-emot",
      description:
        "A smart lamp controller built with Arduino and custom hardware for wireless lighting control.",
      longDescription:
        "A smart lamp controller built with Arduino and custom hardware. Enabled wireless control of lighting through embedded systems and software integration. Demonstrates practical IoT applications in home automation.",
      technologies: ["Arduino", "C++", "Bluetooth", "IoT", "Embedded Systems"],
      category: "other" as const,
      startDate: "2022-01-01",
      endDate: "2022-06-30",
      isActive: false,
      achievements: [
        "Built custom hardware solution for smart lighting",
        "Implemented wireless control via Bluetooth",
        "Created energy monitoring features",
        "Demonstrated practical IoT application in home automation",
      ],
    },
  ],

  softSkills: [
    {
      name: "Agile & Scrum Development",
      category: "collaboration" as const,
    },
    {
      name: "Analytical Thinking",
      category: "problem-solving" as const,
    },
    {
      name: "Adaptability",
      category: "adaptability" as const,
    },
    {
      name: "Collaboration",
      category: "collaboration" as const,
    },
    {
      name: "Leadership",
      category: "leadership" as const,
    },
    {
      name: "Problem Solving",
      category: "problem-solving" as const,
    },
  ],

  stats: [
    {
      label: "Years of Experience",
      value: "2+",
      description: "Professional software development experience",
    },
    {
      label: "Projects Delivered",
      value: 8,
      description: "Successfully completed projects across various domains",
    },
    {
      label: "Users Impacted",
      value: "1M+",
      description: "Total users impacted by developed applications",
    },
  ],

  technicalSkills: [
    // Programming Languages
    {
      name: "Python",
      category: "language" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 4,
    },
    {
      name: "Swift",
      category: "language" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 3,
    },
    {
      name: "JavaScript",
      category: "language" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 3,
    },
    {
      name: "TypeScript",
      category: "language" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 2,
    },
    {
      name: "C",
      category: "language" as const,
      proficiency: "intermediate" as const,
      yearsOfExperience: 2,
    },
    {
      name: "C++",
      category: "language" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 4,
    },
    {
      name: "Java",
      category: "language" as const,
      proficiency: "intermediate" as const,
      yearsOfExperience: 2,
    },
    // Frameworks & Libraries
    {
      name: "React",
      category: "framework" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 2,
    },
    {
      name: "Node.js",
      category: "framework" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 2,
    },
    {
      name: "Express.js",
      category: "framework" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 2,
    },
    {
      name: "SwiftUI",
      category: "framework" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 3,
    },
    {
      name: "UIKit",
      category: "framework" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 3,
    },
    {
      name: "OpenCV",
      category: "framework" as const,
      proficiency: "intermediate" as const,
      yearsOfExperience: 2,
    },
    // Databases
    {
      name: "MongoDB",
      category: "database" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 2,
    },
    {
      name: "MySQL",
      category: "database" as const,
      proficiency: "intermediate" as const,
      yearsOfExperience: 2,
    },
    {
      name: "SQLite",
      category: "database" as const,
      proficiency: "intermediate" as const,
      yearsOfExperience: 2,
    },
    // Tools & Platforms
    {
      name: "Git",
      category: "tool" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 4,
    },
    {
      name: "GitHub",
      category: "tool" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 4,
    },
    {
      name: "Docker",
      category: "tool" as const,
      proficiency: "intermediate" as const,
      yearsOfExperience: 1,
    },
    {
      name: "RESTful APIs",
      category: "tool" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 2,
    },
    {
      name: "Arduino",
      category: "tool" as const,
      proficiency: "intermediate" as const,
      yearsOfExperience: 2,
    },
    // Specialties
    {
      name: "iOS Development",
      category: "other" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 3,
    },
    {
      name: "Machine Learning",
      category: "other" as const,
      proficiency: "intermediate" as const,
      yearsOfExperience: 1,
    },
    {
      name: "Computer Vision",
      category: "other" as const,
      proficiency: "intermediate" as const,
      yearsOfExperience: 2,
    },
    {
      name: "IoT Development",
      category: "other" as const,
      proficiency: "intermediate" as const,
      yearsOfExperience: 2,
    },
    {
      name: "Competitive Programming",
      category: "other" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 4,
    },
    {
      name: "Backend Development",
      category: "other" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 2,
    },
  ],

  testimonials: [
    {
      author: "Latifah Munawaroh",
      role: "Data Scientist",
      company: "Apple Developer Academy | Digital Talent Scholarship Awardee",
      content:
        "I had the pleasure of working alongside Ricky at Apple Developer Academy. As a highly skilled programmer with a strong background in competitive programming and IoT, Ricky consistently impressed me with his technical abilities. He is a dedicated problem solver who is always eager to explore the most effective solutions, striking a balance between design and development considerations. Ricky is an excellent communicator and collaborator. He actively listens to the ideas of others, particularly during design team meetings, and is always open to learning new techniques from colleagues, regardless of seniority. His confident and innovative approach to problem-solving makes him a valuable asset to any team.",
      date: "2024-11-01",
    },
    {
      author: "Ariel Waraney Manueke",
      role: "Master of IT Student @ UTS",
      company: "Apple Developer Academy",
      content:
        "I highly recommend Ricky for his outstanding skills in iOS development, collaboration, critical thinking, and problem-solving. We have worked together on an internship project, and I found him highly passionate and dedicated to his profession in tackling every. He has a fun personality that makes me enjoy every time working with him. His contribution to the team as a developer is highly considerable as it helped our team to build our first App. Ricky definetely would become an appreciated member of any team.",
      date: "2023-05-01",
    },
    {
      author: "Galih Laras Prakoso",
      role: "Software Engineer",
      company: "Apple Developer Academy",
      content:
        "I am delighted to recommend my friend Ricky Chen, who I had the pleasure of working with me at the same team at Apple Developer Academy. Ricky Chen is a highly skilled software engineer who excels at competitive programming and has a natural talent for learning new technologies, as I witnessed firsthand when we were building iOS apps using SwiftUI. His ability to grasp complex concepts and implement them quickly and efficiently is remarkable. Ricky Chen is a critical thinker who brings a fresh perspective to ideation and is always willing to contribute ideas to the project. He takes his responsibilities seriously, always ensuring that the quality of work meets the highest standards. His positive attitude and fun personality make him a joy to work with, and his commitment to getting things done is second to none. Overall, I have no doubt that Ricky Chen would be an asset to any team or organization that he joins, and I wholeheartedly recommend him for any software engineering or development role.",
      date: "2023-05-01",
    },
    {
      author: "Queency Lowen",
      role: "Graphic Designer | UI/UX Designer",
      company: "Apple Developer Academy",
      content:
        "Ricky is a talented developer with excellent collaboration skills. Working with him on design and development projects was a great experience. He understands the importance of balancing technical implementation with user experience, making him a valuable team member.",
      date: "2023-05-01",
    },
    {
      author: "Rido Hendrawan",
      role: "Product Designer",
      company: "Apple Developer Academy",
      content:
        "Based on my experience working with Ricky on an iOS project app, I would highly recommend him as a skilled and dedicated software engineer. Ricky's expertise in Swift and iOS frameworks was instrumental in the success of our project, and his ability to work collaboratively with our team was invaluable. He consistently demonstrated strong communication skills, providing clear and concise updates on his progress and effectively addressing any issues that arose.",
      date: "2023-04-01",
    },
  ],
};
