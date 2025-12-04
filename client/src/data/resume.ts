import { Github, Linkedin, Mail, Terminal, Code2, Cpu, Globe, HeartPulse, ShoppingBag, Instagram } from "lucide-react";

export const RESUME = {
  profile: {
    name: "Aditya Sinha",
    role: "Software Development Engineer",
    email: "adityasinha361@gmail.com",
    phone: "+91 8240437450",
    links: [
      { label: "LinkedIn", url: "https://linkedin.com/in/adisin361", icon: Linkedin },
      { label: "GitHub", url: "https://github.com/adisin361", icon: Github },
      { label: "Instagram", url: "https://instagram.com/adisin361", icon: Instagram },
      { label: "Email", url: "mailto:adityasinha361@gmail.com", icon: Mail },
    ],
    summary: "Frontend Architect & Full Stack Developer specializing in building high-performance, modular web applications. Experienced in scaling systems for 500k+ users and optimizing complex workflows."
  },
  experience: [
    {
      company: "MoveInSync Technology Solutions",
      role: "Software Development Engineer - 1",
      period: "Aug 2023 – Present",
      location: "Bengaluru, KA",
      highlights: [
        "Led end-to-end development of modular frontend apps for Shuttle, Rentlz, Billing, and Live Tracking verticals, serving 500k+ employees.",
        "Built reusable component libraries and business-critical modules, reducing engineering overhead.",
        "Migrated legacy JSP modules to Angular/React, implementing lazy loading and onPush detection for performance.",
        "Implemented Webpack Module Federation for micro-frontend architecture.",
        "Optimized performance by 50% using debouncing, RxJS observables, and memoization."
      ]
    },
    {
      company: "McKinsey & Company",
      role: "Software Engineering Intern",
      period: "Jan 2023 – Jul 2023",
      location: "Bengaluru, KA",
      highlights: [
        "Developed productivity plugins and internal assets for global consultants.",
        "Engineered modular React components with custom hooks and dynamic rendering.",
        "Implemented scalable backend services using Node.js and Sequelize ORM.",
        "Followed clean code principles and containerized development with Docker."
      ]
    },
    {
      company: "HighRadius Corporation",
      role: "Software Engineering Intern",
      period: "Jan 2022 – Sep 2022",
      location: "Bhubaneswar, OR",
      highlights: [
        "Built an AI Enabled Fintech B2B Invoice Management Application.",
        "Used XGBoost Regression to predict Invoice’s due in date and showcased it on a Web App by utilizing MySQL for Database and ReactJS for Front-End."
      ]
    }
  ],
  education: [
    {
      institution: "Kalinga Institute of Industrial Technology",
      degree: "B.Tech in Computer Science",
      period: "2019 – 2023",
      score: "CGPA: 9.20/10"
    }
  ],
  projects: [
    {
      title: "OneHealth",
      stack: ["React", "HealthTech", "Ayushman Bharat API", "Node.js"],
      period: "In Progress",
      description: "A unified HealthTech ecosystem designed to democratize healthcare access. Integrating with Ayushman Bharat infrastructure to create a seamless patient-provider bridge for the next billion users.",
      icon: HeartPulse
    },
    {
      title: "LumeNostalgia",
      stack: ["E-commerce", "Social Media Marketing", "Dropshipping", "Brand Building"],
      period: "Ongoing",
      description: "A boutique home decor brand blending vintage aesthetics with modern logistics. Growing a vibrant community of decor enthusiasts via @lumenostalgia.store on Instagram.",
      icon: ShoppingBag
    },
    {
      title: "Intra-Firm Social Media App",
      stack: ["React", "Express", "PostgreSQL", "AWS S3", "Redis"],
      period: "Feb 2023 – Apr 2023",
      description: "A role-based internal social platform featuring user authentication, post feeds, and real-time announcements.",
      icon: Globe
    },
    {
      title: "BitPe",
      stack: ["React.js", "Solidity", "Web3", "Tailwind"],
      period: "May 2022 – June 2022",
      description: "Decentralized Web3 payment app enabling global crypto transfers via Ethereum network with smart contracts.",
      icon: Cpu
    }
  ],
  skills: {
    languages: ["JavaScript", "TypeScript", "Python", "C/C++", "SQL", "HTML/CSS"],
    frameworks: ["React", "Angular", "Node.js", "Express", "Tailwind", "Material-UI"],
    tools: ["Git/GitHub", "Docker", "AWS (S3)", "Redis", "Webpack", "Figma"]
  }
};
