export const profile = {
  name: "Muhammad Aleem",
  role: "Full-Stack Developer",
  location: "Islamabad, Pakistan",
  email: "aleem123579@gmail.com",
  phone: "+92 315 5196967",
  whatsapp: "https://wa.me/923155196967",
  github: "https://github.com/Aleem12357",
  linkedin: "https://www.linkedin.com/in/muhammadAleem123579/",
  blurb:
    "I'm Muhammad Aleem, a full-stack developer and AI automation specialist. From frontend to backend, I thrive on solving complex problems with clean, efficient code — React, Next.js, Vue and Node are my daily tools.",
  blurb2:
    "I build scalable web products and intelligent automation workflows. Whether it's shipping a production app, integrating AI-driven features, or architecting an entire platform — I deliver clean code that works at scale.",
};

export const stats = [
  { value: "12+", label: "Projects shipped" },
  { value: "6+", label: "Roles held" },
  { value: "14+", label: "Public repos" },
  { value: "AI", label: "Automation" },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    role: "Freelance Full-Stack Developer",
    company: "Self-Employed",
    period: "2024 — Present (2 years)",
    location: "Remote",
    points: [
      "Built custom web applications, full-stack solutions, and automated workflows for diverse global clients.",
      "Delivered responsive frontend interfaces with React and Next.js alongside Node.js and Supabase backends.",
    ],
  },
  {
    role: "Associate Business Analyst",
    company: "Zweidevs",
    period: "Dec 2025 — Present",
    location: "Lahore, Pakistan",
    points: [
      "Identify and engage potential clients for custom web and mobile application projects.",
      "Prepare tailored proposals on Upwork and Freelancer, aligning solutions with client requirements.",
      "Run market and competitor research to support lead generation and sales strategy.",
      "Work with technical teams on project scope, timelines and cost estimates.",
    ],
  },
  {
    role: "Teaching Assistant — OOP Lab",
    company: "University of Central Punjab",
    period: "Oct 2025 — Feb 2026",
    location: "Lahore, Pakistan",
    points: [
      "Help OOP students understand lab tasks and core object-oriented concepts.",
      "Guide students transitioning from C++ to Java syntax.",
    ],
  },
  {
    role: "Jr Web Developer",
    company: "Byte Force IT Solutions",
    period: "Oct 2025 — Dec 2025",
    location: "Lahore, Pakistan",
    points: [
      "Redesigned the EZI website and added new pages in Next.js per client requirements.",
      "Built the Bytely login page and integrated Google Firebase using Vue.js.",
      "Produced Elementor templates to showcase design options to clients.",
    ],
  },
  {
    role: "Full Stack Intern",
    company: "Tech Overflow",
    period: "Feb 2025 — Jun 2025",
    location: "Lahore, Pakistan",
    points: [
      "Built a Customer Feedback System in React + TypeScript with shadcn/ui and Drizzle ORM.",
      "Implemented RESTful APIs with Node.js and Express, improving backend efficiency.",
      "Integrated MongoDB for scalable data management and faster queries.",
      "Wrote Playwright test cases for a Kanban project.",
    ],
  },
  {
    role: "Teaching Assistant — OOP Lab",
    company: "University of Central Punjab",
    period: "Nov 2024 — Feb 2025",
    location: "Lahore, Pakistan",
    points: ["Supported OOP lab sessions and one-on-one concept clarification."],
  },
  {
    role: "Student Pedagogy Partnership",
    company: "University of Central Punjab",
    period: "Oct 2024 — Feb 2025",
    location: "Lahore, Pakistan",
    points: [
      "Observed OOP classes to identify improvements in delivery and engagement.",
      "Gathered student feedback and relayed actionable suggestions to faculty.",
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  highlights: string[];
  year: string;
  category: string;
  images: string[];
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "dental-skin-clinic",
    category: "Client Site",
    images: ["/projects/TheDental-SkinClinic1.webp", "/projects/TheDental-SkinClinic2.webp"],
    title: "The Dental & Skin Clinic",
    tagline:
      "A premium, responsive clinical showcase and appointment platform built with modern web technologies.",
    description:
      "A high-performance client site for a premier dental and skin clinic. Engineered with clean React architecture to offer dynamic service catalog browsing, client testimonials, and a streamlined booking funnel.",
    stack: ["React.js", "TypeScript", "Tailwind CSS", "Vite"],
    highlights: [
      "Optimized client-acquisition funnel with direct appointment scheduling integrations",
      "Fully responsive layout rendering pixel-perfectly on both mobile and desktop viewports",
      "Visual asset pipeline optimized for fast page loads and smooth animations",
      "Premium, modern dark-themed aesthetics customized to match the clinic's brand style",
    ],
    year: "2026",
    liveUrl: "https://the-dental-skin-clinic.vercel.app/",
  },
  {
    slug: "tiktok-insta-automation",
    category: "AI Automation",
    images: [
      "/projects/automationsSS/tiktok-insta-videoautomation1.png",
      "/projects/automationsSS/tiktok-insta-videoautomation2.png",
    ],
    title: "TikTok & Instagram Video Automation",
    tagline:
      "An automated video creation and scheduling system powered by AI models, Python, and webhook actions.",
    description:
      "An intelligent automation workflow designed to automatically generate, render, and publish/schedule video content for TikTok and Instagram. Powered by python automation, custom asset assembly pipelines, and API integrations.",
    stack: ["Python", "AI/ML", "n8n", "Webhook", "API Integration"],
    highlights: [
      "Fully automated video assembly using Python scripts and AI generation APIs",
      "Dynamic scheduling and posting integrations across TikTok and Instagram Graph API",
      "Automated engagement and comment reply workflows triggered via webhooks",
      "Visual content dashboard for reviewing queued posts and engagement metrics",
    ],
    year: "2026",
  },
  {
    slug: "youtube-automation",
    category: "AI Automation",
    images: [
      "/projects/automationsSS/youtubeAutomation1.png",
      "/projects/automationsSS/youtubeAutomation2.png",
    ],
    title: "YouTube Content Automation",
    tagline:
      "A complete channel management automation tool that generates video scripts, voiceovers, and uploads content.",
    description:
      "An advanced backend system automating YouTube channel operations. Automatically drafts video concepts, structures scripts with LLMs, synthesizes natural audio voiceovers, compiles video assets, and uploads them to YouTube.",
    stack: ["Python", "AI/ML", "Node.js", "YouTube API", "n8n"],
    highlights: [
      "Script generation and scene structuring powered by OpenAI and Anthropic LLMs",
      "Realistic voiceover synthesis using leading TTS providers",
      "Automatic video compilation and metadata generation (titles, descriptions, tags)",
      "Automated YouTube Data API integration for scheduled uploads and channel updates",
    ],
    year: "2026",
  },
  {
    slug: "digital-diary",
    category: "Web App",
    images: ["/projects/digital-diary-1.webp", "/projects/digital-diary-2.webp"],
    title: "Digital Diary",
    tagline:
      "A full-stack school management portal with AI-driven career guidance, role-based access, and real-time collaboration.",
    description:
      "A full-stack school management portal designed to streamline communication between teachers, parents, and students. Features role-based dashboards, automated grade and attendance tracking, real-time messaging, and an integrated Python AI engine providing personalized career recommendations.",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js", "Python", "AI/ML"],
    highlights: [
      "Role-Based Access Control (RBAC) with JWT for Students, Teachers, and Parents",
      "Python microservice running an AI career recommendation model",
      "Real-time instant messaging using Socket.io with strict channel isolation",
      "Gamified student rewards system with performance badges and dynamic leaderboards",
      "Awarded 3rd Position out of 175+ FYP projects at UCP Open House Exhibition",
    ],
    year: "2025",
    liveUrl: "https://digital-diary-mydc.vercel.app/",
  },
  {
    slug: "veamkodrive",
    category: "Web App",
    images: ["/projects/veamkodrive-1.webp", "/projects/veamkodrive-2.webp"],
    title: "Veamkodrive",
    tagline:
      "A polished automobile showcase website for an Oman-based car dealership, built with React, TypeScript, and Supabase.",
    description:
      "A premium automotive showcase platform built for an international car dealership in Oman. Engineered with React, TypeScript, and Supabase to deliver real-time inventory management, high-performance visual asset delivery, and an intuitive administration workflow.",
    stack: ["React.js", "TypeScript", "Supabase", "Tailwind CSS", "Vite"],
    highlights: [
      "Supabase Postgres backend with dynamic REST APIs for instant inventory updates",
      "End-to-end TypeScript architecture ensuring zero runtime type mismatches",
      "Optimized asset pipeline with lazy loading and Supabase Storage transforms",
      "Fine-grained Row-Level Security (RLS) policies protecting client admin actions",
    ],
    year: "2026",
    liveUrl: "https://veamkodrive.vercel.app",
  },
  {
    slug: "unitrix",
    category: "Client Site",
    images: ["/projects/unitrix-1.webp", "/projects/unitrix-2.webp"],
    title: "Unitrix",
    tagline:
      "A modern study-abroad consultancy website redesigned from the ground up with React, TypeScript, and Lovable.",
    description:
      "A modern, high-converting web platform engineered for a study-abroad consultancy. Designed mobile-first with React, TypeScript, and Tailwind CSS to replace outdated legacy flows with interactive university search, lead generation forms, and fast page speeds.",
    stack: ["React.js", "TypeScript", "Lovable", "Tailwind CSS", "Vite"],
    highlights: [
      "Rapid prototyping and component scaffolding using Lovable and Tailwind CSS",
      "Mobile-first responsive layouts optimized for high conversion and engagement",
      "Interactive course search filters and dynamic application guidance forms",
      "Deployed with automated Vercel CI/CD pipelines and preview environments",
    ],
    year: "2026",
    liveUrl: "https://unitrix-refresh.vercel.app",
  },
  {
    slug: "vista-artisan-dreams",
    category: "Web App",
    images: ["/projects/unitedestimates1.webp", "/projects/unitedestimates2.webp"],
    title: "Vista Artisan Dreams",
    tagline:
      "A redesigned, visually elevated contractor website with 3D elements, animations, and a tour-guide chatbot — built to win a real client.",
    description:
      "A visually immersive spec rebuild of an existing contractor platform, enhanced with interactive 3D elements, smooth micro-animations, and an AI-driven tour-guide bot. Built as an active sales tool to demonstrate modern digital experiences to real prospective clients.",
    stack: ["React.js", "TypeScript", "Lovable", "Tailwind CSS", "shadcn/ui"],
    highlights: [
      "Integrated interactive 3D graphics built with Three.js and Spline",
      "Built-in interactive AI tour-guide bot that answers client FAQs in real time",
      "Single-page conversion funnel linked directly to an automated scheduling widget",
      "Reverse-engineered asset and content architecture for maximum visual impact",
    ],
    year: "2026",
    liveUrl: "https://vista-artisan-dreams.lovable.app",
  },
  {
    slug: "bytely",
    category: "Web App",
    images: ["/projects/bytely-1.webp", "/projects/bytely-2.webp"],
    title: "Bytely",
    tagline:
      "A full authentication module featuring Google Sign-In, email/password login, and password reset — built with Vue.js and Firebase.",
    description:
      "A robust, production-grade authentication and user management module developed for Byte Force IT Solutions. Features OAuth 2.0 Google Sign-In, email/password verification, secure password reset, and a modular Vue.js component architecture.",
    stack: ["Vue.js", "Firebase", "Node.js", "Express.js", "MongoDB"],
    highlights: [
      "Firebase Authentication integration for Google OAuth 2.0 and email verification",
      "Express.js & MongoDB backend for extended user profile metadata management",
      "Modular Vue 3 component library built for internal team reusability",
      "Custom Vuelidate validation rules giving real-time feedback on input fields",
    ],
    year: "2025",
    liveUrl: "https://bytely.ai/",
  },
  {
    slug: "ezi-website",
    category: "Web App",
    images: ["/projects/ezi-1.webp", "/projects/ezi-2.webp"],
    title: "Ezi Website",
    tagline:
      "A Next.js re-engineering project — overhauled design, new city pages, and city-specific service pages for a Canadian home services brand.",
    description:
      "A complete Next.js re-engineering project for a major Canadian home services brand operating across Ottawa, Toronto, Gatineau, and Montreal. Engineered dynamic local routing to generate city-specific service pages, significantly boosting local SEO rankings.",
    stack: ["Next.js", "React.js", "Tailwind CSS", "Elementor"],
    highlights: [
      "Dynamic Next.js file-based routing architecture for local city/service pages",
      "Standardized component layouts ensuring design consistency across regional sub-pages",
      "Optimized image loading and performance metrics for fast mobile rendering",
      "Converted custom Elementor design specifications into clean React code",
    ],
    year: "2025",
    liveUrl: "https://ezi.services/",
  },
  {
    slug: "password-manager",
    category: "Web App",
    images: ["/projects/passop-1.webp", "/projects/passop-2.webp"],
    title: "PassOP – Password Manager",
    tagline:
      "A MERN stack password manager with secure storage, clipboard copy, and full CRUD — built to learn full-stack development end to end.",
    description:
      "A full-stack MERN application built to provide local and cloud password management. Features instant searching, one-click clipboard copying, encrypted-at-rest field persistence, and full CRUD operations without page reloads.",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS", "Vite"],
    highlights: [
      "Dual-layer storage combining cloud MongoDB persistence with fallback localStorage",
      "One-click clipboard copy utility using modern browser native Clipboard APIs",
      "Full CRUD capability with instant React state updates and zero page reloads",
      "Clean, responsive dark-themed UI styled with Tailwind CSS utilities",
    ],
    year: "2024",
    liveUrl: "https://password-manager-mern-stack.vercel.app/",
  },
  {
    slug: "textutils",
    category: "Utility App",
    images: ["/projects/textutils-1.webp", "/projects/textutils-2.webp"],
    title: "TextUtils",
    tagline:
      "A React text manipulation tool — case conversion, extra space removal, text-to-speech, and one-click clipboard copy.",
    description:
      "A lightweight, browser-native text processing suite built with React. Offers instant case conversion, extra whitespace stripping, character/word metrics, text-to-speech playback, and one-click clipboard extraction.",
    stack: ["React.js", "HTML", "Bootstrap", "CSS", "JavaScript"],
    highlights: [
      "Zero external dependencies using native browser Web Speech API for text-to-speech",
      "Real-time character, word, and reading time counter with live state updates",
      "One-click text cleanup routines (case transformations, extra space removal)",
      "Clean controlled component design handling multi-step string transformations",
    ],
    year: "2024",
    liveUrl: "https://aleem12357.github.io/TextUtils-React/",
  },
  {
    slug: "twitter-clone",
    category: "UI Clone",
    images: ["/projects/twitterclone1.webp", "/projects/twitterclone2.webp"],
    title: "Twitter Clone",
    tagline:
      "A static Twitter UI clone built with HTML, CSS, Tailwind CSS, and JavaScript — focused on responsive layout and component recreation.",
    description:
      "A pixel-perfect frontend clone of Twitter's complex 3-column desktop and mobile interface. Stress-tests Tailwind CSS utilities and vanilla JavaScript to deliver interactive tweet feeds, sticky sidebars, and responsive UI components.",
    stack: ["HTML", "CSS", "Tailwind CSS", "JavaScript"],
    highlights: [
      "Pixel-accurate 3-column layout built with Tailwind CSS Flexbox & Grid",
      "Sticky sidebar navigation and trending panel matching Twitter desktop UX",
      "Interactive like, retweet, and bookmark state toggles via JavaScript event handlers",
      "Fully responsive design collapsing sidebars cleanly on mobile viewports",
    ],
    year: "2024",
    liveUrl: "https://aleem12357.github.io/TwitterClone/",
  },
  {
    slug: "bmw-website",
    category: "Multi-page Site",
    images: ["/projects/bmw1.webp", "/projects/bmw2.webp"],
    title: "BMW Website Clone",
    tagline:
      "A multi-page BMW website clone with Home, About, Contact, and Car Models pages — built with HTML, Bootstrap, CSS, and JavaScript.",
    description:
      "A multi-page automotive showcase site replicating BMW's luxury digital brand. Built with HTML, CSS, Bootstrap, and JavaScript to deliver responsive car model showcases, interactive navigation menus, and clean page layouts.",
    stack: ["HTML", "Bootstrap", "CSS", "JavaScript"],
    highlights: [
      "Multi-page structure (Home, About, Models, Contact) with uniform navigation",
      "Customized Bootstrap 5 grid layout tailored to luxury automotive aesthetics",
      "Interactive car model showcase cards with smooth hover transitions",
      "Responsive mobile navigation drawer and vanilla JS scroll interactions",
    ],
    year: "2024",
    liveUrl: "https://aleem12357.github.io/BMW-website/index.html",
  },
  {
    slug: "todo-list",
    category: "CRUD App",
    images: ["/projects/todolist1.webp", "/projects/todolist2.webp"],
    title: "To-Do List App",
    tagline:
      "A React task manager with Tailwind CSS — add, complete, and delete tasks with a clean, minimal interface.",
    description:
      "A refined React productivity app designed with Tailwind CSS. Demonstrates immutable state management patterns, local storage state persistence, task filtering, and smooth task completion animations.",
    stack: ["React.js", "Tailwind CSS", "CSS", "JavaScript"],
    highlights: [
      "Persistent task storage using React useEffect hooks synchronized with localStorage",
      "Functional immutable state updates preventing state mutation bugs",
      "One-click task completion toggles, deletion, and inline editing workflows",
      "Responsive minimal UI designed with Tailwind CSS utility classes",
    ],
    year: "2024",
    liveUrl: "https://todo-list-tau-lilac.vercel.app/",
  },
  {
    slug: "clearclutter",
    category: "CLI Tool",
    images: ["/projects/clearclutter-1.webp", "/projects/clearclutter-2.webp"],
    title: "ClearClutter",
    tagline:
      "A Node.js CLI tool that automatically organises a messy folder by sorting files into extension-based subdirectories.",
    description:
      "A high-utility Node.js CLI automation tool that organizes messy directories by automatically scanning, categorizing, and sorting files into extension-based subfolders with collision protection.",
    stack: ["Node.js", "JavaScript", "fs module"],
    highlights: [
      "Zero third-party dependencies utilizing Node.js native fs and path modules",
      "Automated file classification grouping files by extensions into dedicated subdirectories",
      "Collision safety logic appending unique identifiers to prevent accidental file overwrites",
      "Lightweight command-line interface supporting instant execution on any directory",
    ],
    year: "2024",
  },
];

export const stack = {
  Languages: ["C", "C++", "Python", "SQL", "JavaScript", "TypeScript", "PHP", "HTML/CSS"],
  Frameworks: [
    "React",
    "Next.js",
    "Vue.js",
    "Node.js",
    "Express",
    "Vite",
    "Tailwind CSS",
    "Bootstrap",
    "Playwright",
    "Selenium",
  ],
  Data: ["MongoDB", "Supabase", "Firebase", "Drizzle ORM", "SQL"],
  Tools: [
    "Git",
    "GitHub",
    "VS Code",
    "Cursor",
    "Postman",
    "Jira",
    "Trello",
    "Figma",
    "IntelliJ",
    "Google Colab",
  ],
};

export const education = [
  {
    school: "University of Central Punjab",
    detail: "BS Software Engineering — CGPA 3.95",
    period: "Mar 2022 — Mar 2026",
    location: "Johar Town, Lahore",
  },
  {
    school: "Punjab College",
    detail: "Pre-Engineering — 87%",
    period: "Aug 2019 — Aug 2021",
    location: "Cantt Campus, Rawalpindi",
  },
];

export type Certificate = {
  title: string;
  issuer: string;
  year: string;
  image?: string;
};

export const certificates: Certificate[] = [
  {
    title: "CS50's Introduction to Programming with Python",
    issuer: "Harvard / edX",
    year: "2024",
    image: "/certificates/CS50P_Harvard_Certificate.webp",
  },
  {
    title: "Object-Oriented Data Structures in C++",
    issuer: "Coursera (UIUC)",
    year: "2023",
    image: "/certificates/CPP_Classes_and_Objects_Coursera.webp",
  },
  {
    title: "HTML and CSS in Depth",
    issuer: "Meta / Coursera",
    year: "2023",
    image: "/certificates/HTML_CSS_Meta_Coursera.webp",
  },
  {
    title: "Work Smarter with Microsoft Word",
    issuer: "Coursera",
    year: "2023",
    image: "/certificates/Microsoft_Word_Coursera.webp",
  },
  {
    title: "Customer Analytics",
    issuer: "Wharton / Coursera",
    year: "2023",
    image: "/certificates/Customer_Analytics_Wharton.webp",
  },
  {
    title: "Digital Marketing Programme",
    issuer: "DigiSkills.pk",
    year: "2022",
    image: "/certificates/Digital_Marketing_DigiSkills.webp",
  },
  {
    title: "Freelancing Programme",
    issuer: "DigiSkills.pk",
    year: "2022",
    image: "/certificates/Freelancing_DigiSkills.webp",
  },
  {
    title: "Teaching Assistant — OOP Lab (Fall 2025)",
    issuer: "University of Central Punjab",
    year: "2025–2026",
    image: "/certificates/Teaching_Assistant_Fall2025.webp",
  },
  {
    title: "Teaching Assistant — OOP Lab (Fall 2024)",
    issuer: "University of Central Punjab",
    year: "2024–2025",
    image: "/certificates/Teaching_Assistant_Fall2024.webp",
  },
  {
    title: "Student Pedagogy Partnership Program",
    issuer: "University of Central Punjab",
    year: "2024–2025",
    image: "/certificates/Student_Pedagogy_Partnership.webp",
  },
  {
    title: "SochSeSolution Innovation Event (4th Place)",
    issuer: "GDG / BNU",
    year: "2025",
    image: "/certificates/Soch_Se_Solution_GDG.webp",
  },
  {
    title: "HackXV 2023 Hackathon Participant",
    issuer: "FAST-NUCES / UCP",
    year: "2023",
    image: "/certificates/HackXV_2023_Certificate.webp",
  },
  {
    title: "AI & ML Applications Seminar",
    issuer: "IEEE UCP Student Branch",
    year: "2024",
    image: "/certificates/IEEE_AI_ML_Seminar.webp",
  },
  {
    title: "Web3.0 & Decentralized Technologies",
    issuer: "Confiniti / UCP",
    year: "2024",
    image: "/certificates/Confiniti_Session_UCP.webp",
  },
  {
    title: "FYP Open House Exhibition (3rd Place & Volunteer)",
    issuer: "University of Central Punjab",
    year: "2024",
    image: "/certificates/Openhouse_Exhibition_Volunteer.webp",
  },
];

export const activities = [
  {
    title: "FYP Open House Exhibition — UCP",
    detail:
      "Secured 3rd position out of 175+ projects for Digital Diary, presenting architecture and real-world use cases to judges.",
  },
  {
    title: "WebVerse Hackathon — GDGoC UCP",
    detail:
      "Web lead and organiser for the hackathon held 6 January 2026: participant coordination, logistics and judging flow.",
  },
  {
    title: "SochSeSolution Innovation Event — BNU",
    detail:
      "Pitched a startup idea, built a working MVP and secured 4th position among competing teams.",
  },
  {
    title: "Student Ambassador — Blackbox AI",
    detail:
      "Represented Blackbox AI on campus, sharing AI tooling content and running community sessions.",
  },
  {
    title: "Career Fair 2024 — Cyber Security Society, UCP",
    detail: "Organised and managed the university career fair, coordinating teams and vendors.",
  },
  {
    title: "Seminars — IEEE UCP & Confiniti",
    detail:
      "Attended AI/ML applications seminar and a Web3.0 session on decentralised technologies.",
  },
];

export const services = [
  {
    eyebrow: "What you get",
    title: "Clean code, pixel-perfect UI, deployed & scaling",
    body: "Typed React front-ends, tested flows and APIs that hold up under real traffic.",
  },
  {
    eyebrow: "Flexible with timezones",
    title: "Based in Islamabad, available globally",
    body: "Comfortable overlapping with EU and North American teams — async by default, on call when it matters.",
  },
  {
    eyebrow: "How I work",
    title: "Clear communication, fast iterations, no surprises",
    body: "Short feedback loops, visible progress and honest estimates from kickoff to handover.",
  },
];

export type Testimonial = { headline: string; quote: string; name: string; title: string };

export const testimonials: Testimonial[] = [
  {
    headline: "He turned our messy brief into something clean",
    quote:
      "We handed Aleem a rough idea and a folder of screenshots. He came back with a working prototype that was tidier than anything we'd sketched.",
    name: "Hamza R.",
    title: "Founder, early-stage startup",
  },
  {
    headline: "Shipped the portal ahead of schedule",
    quote:
      "Role-based dashboards, chat and reporting — all delivered before the deadline and easy for our staff to actually use.",
    name: "Sana K.",
    title: "Program Lead, school network",
  },
  {
    headline: "Caught problems we didn't even know we had",
    quote:
      "While rebuilding our pages he spotted broken mobile navigation and unoptimised images, then fixed both without being asked.",
    name: "Daniyal A.",
    title: "Marketing Manager",
  },
  {
    headline: "A teammate, not just a contractor",
    quote:
      "Clear updates, honest estimates and code our own devs could pick up the moment the project handed over.",
    name: "Ayesha M.",
    title: "Product Manager, agency",
  },
  {
    headline: "Our students actually enjoy the labs now",
    quote:
      "As a TA he explained OOP concepts in a way that stuck. That same patience shows up in how he documents his work.",
    name: "Dr. Faisal T.",
    title: "Faculty, UCP",
  },
];
