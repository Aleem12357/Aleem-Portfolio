export const profile = {
  name: "Muhammad Aleem",
  role: "Full-Stack Developer",
  location: "Islamabad, Pakistan",
  email: "aleem123579@gmail.com",
  phone: "+92 315 5196967",
  github: "https://github.com/Aleem12357",
  linkedin: "https://www.linkedin.com/in/muhammadAleem123579/",
  blurb:
    "I'm Muhammad Aleem, a final-year Software Engineering student (CGPA 3.95) and full-stack developer. From frontend to backend, I thrive on solving complex problems with clean, efficient code — React, Next.js, Vue and Node are my daily tools.",
  blurb2:
    "Currently an Associate Business Analyst at Zweidevs, and a Teaching Assistant for OOP labs at the University of Central Punjab. I like shipping products, mentoring students and learning something new every week.",
};

export const stats = [
  { value: "3.95", label: "CGPA" },
  { value: "6+", label: "Roles held" },
  { value: "14+", label: "Public repos" },
  { value: "3rd", label: "of 175+ FYPs" },
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
    points: [
      "Supported OOP lab sessions and one-on-one concept clarification.",
    ],
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
};

export const projects: Project[] = [
  {
    slug: "digital-diary",
    category: "Web App",
    images: ["/projects/digital-diary-1.svg", "/projects/digital-diary-2.svg"],
    title: "Digital Diary",
    tagline: "School management portal with AI career guidance",
    description:
      "A full-stack school management portal where teachers, students and parents manage grades, track behaviour and communicate in one place. Placed 3rd out of 175+ projects at the UCP FYP Open House.",
    stack: ["MongoDB", "Express", "React", "Node.js", "Python"],
    highlights: [
      "AI-driven recommendation engine suggesting personalised career paths",
      "Role-based access control with tailored dashboards per user type",
      "Gamified badges rewarding grades, behaviour and participation",
      "Real-time chat between teachers, parents and students",
    ],
    year: "2025",
  },
  {
    slug: "veamkodrive",
    category: "Web App",
    images: ["/projects/veamkodrive-1.svg", "/projects/veamkodrive-2.svg"],
    title: "Veamkodrive",
    tagline: "Oman automobile marketplace",
    description:
      "A modern automobile platform for the Omani market with listings, search and an admin-managed catalogue backed by Supabase.",
    stack: ["React", "TypeScript", "Supabase"],
    highlights: [
      "Typed data layer with Supabase row level security",
      "Fast filtering and responsive listing grid",
    ],
    year: "2026",
  },
  {
    slug: "unitrix",
    category: "Web App",
    images: ["/projects/unitrix-1.svg", "/projects/unitrix-2.svg"],
    title: "Unitrix",
    tagline: "Study-abroad consultancy platform — in development",
    description:
      "A consultancy website helping students discover universities, compare programmes and manage their application journey.",
    stack: ["React", "TypeScript"],
    highlights: ["University discovery and comparison", "Application journey tracking"],
    year: "2026",
  },
  {
    slug: "bytely",
    category: "Web App",
    images: ["/projects/bytely-1.svg", "/projects/bytely-2.svg"],
    title: "Bytely Auth Module",
    tagline: "Authentication built twice — Firebase and MERN",
    description:
      "A complete authentication module: Google Sign-In through Firebase plus a custom email/password flow backed by Node, Express and MongoDB.",
    stack: ["Vue.js", "Firebase", "Node.js", "Express", "MongoDB"],
    highlights: [
      "Google email authentication with Firebase",
      "Custom login backed by a MERN API",
      "Full forgot-password recovery workflow",
      "Reusable, responsive Vue components",
    ],
    year: "2025",
  },
  {
    slug: "ezi",
    category: "Website",
    images: ["/projects/ezi-1.svg", "/projects/ezi-2.svg"],
    title: "EZI Website",
    tagline: "Re-engineered service site for Canadian cities",
    description:
      "Redesigned the EZI marketing site in Next.js and shipped new city and service pages for Ottawa, Toronto, Gatineau and Montreal while keeping design consistency intact.",
    stack: ["Next.js", "Tailwind CSS"],
    highlights: ["Four new city landing pages", "New service pages such as snow removal"],
    year: "2025",
  },
  {
    slug: "passop",
    category: "Web App",
    images: ["/projects/passop-1.svg", "/projects/passop-2.svg"],
    title: "PassOP — Password Manager",
    tagline: "Secure, responsive password vault",
    description:
      "A password manager with secure storage, quick copy/edit/delete actions and persistence through MongoDB plus local storage fallback.",
    stack: ["React", "Vite", "Tailwind CSS", "Express", "MongoDB"],
    highlights: ["Secure credential storage", "One-click copy, edit and delete", "Works across all screen sizes"],
    year: "2024",
  },
  {
    slug: "textutils",
    category: "Web App",
    images: ["/projects/textutils-1.svg", "/projects/textutils-2.svg"],
    title: "TextUtils",
    tagline: "Text manipulation toolkit",
    description:
      "A versatile text utility: strip extra spaces, convert cases, copy to clipboard and listen to text with built-in speech synthesis.",
    stack: ["React", "Bootstrap", "JavaScript"],
    highlights: ["Text-to-speech accessibility", "Case conversion and cleanup", "Clipboard integration"],
    year: "2024",
  },
  {
    slug: "mini-search-engine",
    category: "Systems",
    images: ["/projects/mini-search-engine-1.svg", "/projects/mini-search-engine-2.svg"],
    title: "Mini Search Engine",
    tagline: "Hash-table indexing and boolean retrieval in C++",
    description:
      "A document search engine that tokenises and indexes collections into hash tables, then retrieves matches with AND/OR boolean queries.",
    stack: ["C++", "Data Structures"],
    highlights: ["Hash-table indexing phase", "Boolean AND/OR query handling"],
    year: "2023",
  },
  {
    slug: "clearclutter",
    category: "CLI Tool",
    images: ["/projects/clearclutter-1.svg", "/projects/clearclutter-2.svg"],
    title: "ClearClutter",
    tagline: "Automated file organiser CLI",
    description:
      "A Node.js tool that sorts a messy folder into subfolders by file extension in a single command.",
    stack: ["Node.js"],
    highlights: ["Extension-based sorting", "Efficient filesystem operations"],
    year: "2023",
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
  Tools: ["Git", "GitHub", "VS Code", "Cursor", "Postman", "Jira", "Trello", "Figma", "IntelliJ", "Google Colab"],
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

/**
 * Certificate images: drop files into `public/certificates/` and set
 * `image: "/certificates/your-file.jpg"` on the matching entry below.
 */
export const certificates: Certificate[] = [
  { title: "CS50 Python", issuer: "Harvard / Cambridge", year: "2024" },
  { title: "Data Structures in C++", issuer: "Coursera", year: "2023" },
  { title: "HTML and CSS", issuer: "Coursera", year: "2023" },
  { title: "Microsoft Word", issuer: "Coursera", year: "2023" },
  { title: "Digital Marketing", issuer: "DigiSkills", year: "2022" },
  { title: "Freelancing", issuer: "DigiSkills", year: "2022" },
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
    detail: "Pitched a startup idea, built a working MVP and secured 4th position among competing teams.",
  },
  {
    title: "Student Ambassador — Blackbox AI",
    detail: "Represented Blackbox AI on campus, sharing AI tooling content and running community sessions.",
  },
  {
    title: "Career Fair 2024 — Cyber Security Society, UCP",
    detail: "Organised and managed the university career fair, coordinating teams and vendors.",
  },
  {
    title: "Seminars — IEEE UCP & Confiniti",
    detail: "Attended AI/ML applications seminar and a Web3.0 session on decentralised technologies.",
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
