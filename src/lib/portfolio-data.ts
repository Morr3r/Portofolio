import type { StaticImageData } from "next/image";
import pasPhoto from "@/assets/PasPhoto.jpg";
import pasPhotoTransparent from "@/assets/PasPhoto2-transparent.png";
import pasPhotoTwo from "@/assets/PasPhoto2-alt.jpg";
import certificateItSecurityFront from "@/assets/Sertifikat Pembelajaran IT Security - Security Awareness Batch 1 conv/Sertifikat Pembelajaran IT Security - Security Awareness Batch 1 conv 1.jpeg";
import certificateItSecurityBack from "@/assets/Sertifikat Pembelajaran IT Security - Security Awareness Batch 1 conv/Sertifikat Pembelajaran IT Security - Security Awareness Batch 1 conv 2.jpeg";
import certificateStrategicProjectFront from "@/assets/Sertifikat Pembelajaran Strategic Project Management for Banking Digital Transformation conv/Sertifikat Pembelajaran Strategic Project Management for Banking Digital Transformation conv 1.jpeg";
import certificateStrategicProjectBack from "@/assets/Sertifikat Pembelajaran Strategic Project Management for Banking Digital Transformation conv/Sertifikat Pembelajaran Strategic Project Management for Banking Digital Transformation conv 2.jpeg";
import certificateApupptFront from "@/assets/SertifikatAPUPPT conv/SertifikatAPUPPT conv 1.jpeg";
import certificateApupptBack from "@/assets/SertifikatAPUPPT conv/SertifikatAPUPPT conv 2.jpeg";
import certificateGratifikasiFront from "@/assets/SertifikatGratifikasi conv/SertifikatGratifikasi conv 1.jpeg";
import certificateGratifikasiBack from "@/assets/SertifikatGratifikasi conv/SertifikatGratifikasi conv 2.jpeg";
import certificateJabarmaya from "@/assets/SertifikatJabarmaya_AfghanyYogaswara conv/SertifikatJabarmaya_AfghanyYogaswara conv 1.jpeg";
import certificatePusatBahasa from "@/assets/SertifikatPusatBahasa_AfghanyYogaswara conv/SertifikatPusatBahasa_AfghanyYogaswara conv 1.jpeg";

export type LocaleCode = "en" | "id";

export type SectionId =
  | "intro"
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "contact";

export type InteractiveObjectId =
  | "room"
  | "poster"
  | "whiteboard"
  | "laptop"
  | "arcade"
  | "phone";

export type PortfolioProject = {
  id: string;
  title: string;
  period: string;
  description: string;
  responsibilities: string[];
  stack: string[];
  liveUrl: string;
  githubUrl: string;
  previewLabel: string;
};

export type PortfolioProfile = {
  name: string;
  role: string;
  intro: string;
  email: string;
  phone: string;
  location: string;
  social: {
    github: string;
    linkedin: string;
  };
};

export type PortfolioSection = {
  id: SectionId;
  title: string;
  eyebrow: string;
  description: string;
};

export type InteractiveObjectConfig = {
  id: InteractiveObjectId;
  section: SectionId;
  label: string;
  hint: string;
  accent: string;
};

export type ProfilePhoto = {
  label: string;
  src: StaticImageData;
};

export type CertificateAsset = {
  title: string;
  issuer: string;
  label: string;
  src: StaticImageData;
};

export type WorkExperience = {
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
  tags: string[];
};

export const portfolioProfile: PortfolioProfile = {
  name: "Afghany Yogaswara",
  role: "Mobile Developer / Frontend Developer",
  intro:
    "Software Engineering graduate of SMKN 13 Bandung with diverse work experience over the past five years. My educational background in software engineering has given me a deep understanding of technology and strong problem-solving skills. I am curious, adaptable, agile, eager to learn, and ready to work in a new environment.",
  email: "afghany.yogaswaraa@gmail.com",
  phone: "+62 895-3658-71245",
  location: "Bandung, Indonesia",
  social: {
    github: "https://github.com/Morr3r",
    linkedin: "https://afghanyportofolio.vercel.app"
  }
};

export const profilePhotos: ProfilePhoto[] = [
  { label: "Formal profile photo", src: pasPhoto },
  { label: "Transparent profile photo", src: pasPhotoTransparent },
  { label: "Alternate profile photo", src: pasPhotoTwo }
];

export const certificateAssets: CertificateAsset[] = [
  {
    title: "IT Security - Security Awareness Batch 1",
    issuer: "bank bjb",
    label: "Front",
    src: certificateItSecurityFront
  },
  {
    title: "IT Security - Security Awareness Batch 1",
    issuer: "bank bjb",
    label: "Back",
    src: certificateItSecurityBack
  },
  {
    title: "Strategic Project Management for Banking Digital Transformation",
    issuer: "bank bjb",
    label: "Front",
    src: certificateStrategicProjectFront
  },
  {
    title: "Strategic Project Management for Banking Digital Transformation",
    issuer: "bank bjb",
    label: "Back",
    src: certificateStrategicProjectBack
  },
  {
    title: "APU PPT",
    issuer: "bank bjb",
    label: "Front",
    src: certificateApupptFront
  },
  {
    title: "APU PPT",
    issuer: "bank bjb",
    label: "Back",
    src: certificateApupptBack
  },
  {
    title: "Gratifikasi",
    issuer: "bank bjb",
    label: "Front",
    src: certificateGratifikasiFront
  },
  {
    title: "Gratifikasi",
    issuer: "bank bjb",
    label: "Back",
    src: certificateGratifikasiBack
  },
  {
    title: "Frontend Developer Internship",
    issuer: "PT Sarana Insan Muda Selaras (Jabar Maya)",
    label: "Certificate",
    src: certificateJabarmaya
  },
  {
    title: "English Translator and Public Relations Administration",
    issuer: "Pusat Bahasa dan Multibudaya Universitas Airlangga",
    label: "Certificate",
    src: certificatePusatBahasa
  }
];

export const portfolioSkills = [
  "Flutter",
  "Dart",
  "React Native",
  "Next.js",
  "React.js",
  "JavaScript",
  "HTML",
  "CSS",
  "Tailwind",
  "Figma UI/UX",
  "GitHub",
  "Jenkins",
  "Navicat",
  "Canva",
  "Adobe Photoshop",
  "Adobe Premiere",
  "FL Studio",
  "Corel Draw"
];

export const education = [
  {
    title: "English Literature",
    school: "Universitas Terbuka",
    period: "Sep 2023 - Present"
  },
  {
    title: "Software Engineering",
    school: "SMKN 13 Bandung",
    period: "Sep 2017 - May 2020"
  }
];

export const languages = [
  "Indonesian - Native proficiency",
  "English - Full professional proficiency"
];

export const workExperiences: WorkExperience[] = [
  {
    role: "Mobile Developer",
    company: "Bank BJB",
    location: "Kota Bandung",
    period: "Nov 2024 - Present",
    summary:
      "Developing and maintaining mobile banking features for DIGI bank bjb using Flutter, Dart, API integration, WebSocket synchronization, and production release practices.",
    highlights: [
      "Developing and maintaining mobile applications using Flutter and Dart.",
      "Translating UI/UX designs into clean, functional, and responsive code.",
      "Integrating RESTful APIs and WebSocket connections for real-time data synchronization.",
      "Implementing scalable state management with GetX.",
      "Participating in SIT, UAT, and PROD deployment phases."
    ],
    tags: ["Flutter", "Dart", "GetX", "REST API", "WebSocket"]
  },
  {
    role: "Server",
    company: "Karnivor",
    location: "Kota Bandung",
    period: "Mar 2024 - Sep 2024",
    summary:
      "Handled customer-facing restaurant service with attention to order accuracy, presentation, communication, and table readiness.",
    highlights: [
      "Welcomed guests professionally upon arrival.",
      "Presented menus, daily specials, and recommended items.",
      "Took food and beverage orders accurately.",
      "Delivered orders while checking accuracy and presentation.",
      "Coordinated payment readiness and table cleanup."
    ],
    tags: ["Customer Service", "Communication", "Operations"]
  },
  {
    role: "English Translator and Public Relations Administration",
    company: "Pusat Bahasa dan Multibudaya Universitas Airlangga",
    location: "Kota Surabaya",
    period: "Aug 2023 - Dec 2023",
    summary:
      "Translated and proofread Indonesian-English materials while managing communication details and audience expectations.",
    highlights: [
      "Edited translations for fluency, grammar, and accuracy.",
      "Researched technical terminology and context.",
      "Communicated with clients about expectations, preferences, and style.",
      "Translated written texts with contextual understanding."
    ],
    tags: ["English", "Translation", "Proofreading", "Public Relations"]
  },
  {
    role: "Kitchen Staff",
    company: "Hachiya",
    location: "Kota Bandung",
    period: "Jan 2023 - Jun 2023",
    summary:
      "Supported fast-paced kitchen operations for Japanese-themed food service, focusing on preparation quality and timing.",
    highlights: [
      "Prepared ingredients and assisted quick stir-fry cooking.",
      "Maintained ingredient quality and cleanliness.",
      "Managed cooking time for timely service.",
      "Kept kitchen and equipment clean."
    ],
    tags: ["Food Preparation", "Operations", "Discipline"]
  },
  {
    role: "Server",
    company: "Makopi",
    location: "Kota Bandung",
    period: "Jan 2022 - Dec 2022",
    summary:
      "Delivered warm cafe service while coordinating orders and customer comfort during daily operations.",
    highlights: [
      "Delivered friendly and professional service.",
      "Took orders and served food and beverages promptly.",
      "Managed tables and customer comfort.",
      "Communicated with the kitchen team to keep orders accurate."
    ],
    tags: ["Service", "Cafe Operations", "Teamwork"]
  },
  {
    role: "Shopkeeper",
    company: "AR Komunika",
    location: "Kota Bandung",
    period: "Feb 2020 - Sep 2021",
    summary:
      "Assisted retail customers with mobile phones, accessories, SIM cards, repairs, inventory, and product recommendations.",
    highlights: [
      "Answered customer inquiries and recommended products.",
      "Sold mobile phones, accessories, SIM cards, and related devices.",
      "Processed phone repair intake and explained estimated repair timelines.",
      "Monitored stock availability and reported low inventory."
    ],
    tags: ["Retail", "Sales", "Inventory", "Repair Intake"]
  },
  {
    role: "Frontend Developer",
    company: "PT Sarana Insan Muda Selaras (Jabar Maya)",
    location: "Kota Bandung",
    period: "Jul 2019 - Sep 2019",
    summary:
      "Designed and implemented responsive web interface work for a broadband internet service provider.",
    highlights: [
      "Designed website layout, color schemes, typography, and graphics.",
      "Improved website navigation and usability.",
      "Ensured responsive display across desktop, tablet, and smartphone.",
      "Tested usability issues and fixed interface problems."
    ],
    tags: ["Frontend", "HTML", "CSS", "Responsive UI"]
  }
];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "donat-dankau-pos",
    title: "Development of Donat Dankau Point of Sale (POS) Application",
    period: "Jun 2026 - Jul 2026",
    description:
      "Developed an end-to-end mobile POS application for Donat Dankau to support sales transactions, product and inventory management, cashier shifts, operational expenses, and business reporting.",
    responsibilities: [
      "Developed a responsive POS application using React Native and Expo, optimized for smartphone and tablet layouts.",
      "Implemented product and inventory management features, including product CRUD, stock adjustments, minimum order quantities, and automatic stock deduction and restoration for sales and refunds.",
      "Built the cashier transaction flow, including product search, variants and toppings, customer and reseller pricing, shopping cart management, multiple payment methods, and invoice generation.",
      "Built and integrated REST APIs using FastAPI and PostgreSQL for authentication, role-based access, transactions, inventory, expenses, promotions, and sales reports.",
      "Added application security and reliability mechanisms, including JWT authentication, secure session storage, server-side price calculation, idempotent transactions, database migrations, and automated API testing."
    ],
    stack: ["React Native", "Expo", "FastAPI", "PostgreSQL", "REST API", "JWT"],
    liveUrl: "#",
    githubUrl: "#",
    previewLabel: "Mobile POS system"
  },
  {
    id: "referral-branch-code",
    title: "Referral Code and Branch Code for Tandamata Rencana",
    period: "Apr 2026 - May 2026",
    description:
      "Developed referral tracking and optional branch code input for the Tandamata Rencana account opening flow in DIGI bank bjb.",
    responsibilities: [
      "Developed the frontend flow for Referral Code and Branch Code fields.",
      "Added optional input fields into the account opening form.",
      "Integrated referral input behavior with the digital onboarding flow.",
      "Supported branch-based product management through Branch Code handling.",
      "Adjusted the mobile UI to keep the account opening process clear and consistent."
    ],
    stack: ["Flutter", "Dart", "GetX", "REST API", "Banking UI"],
    liveUrl: "#",
    githubUrl: "#",
    previewLabel: "DIGI onboarding"
  },
  {
    id: "esamsat-payment-code",
    title: "Generate Payment Code for West Java Vehicle Tax",
    period: "Jan 2026 - Mar 2026",
    description:
      "Built the E-Samsat WebView and native mobile payment code flow for easier digital vehicle tax payments.",
    responsibilities: [
      "Developed Generate Kode Bayar E-Samsat flow in DIGI bank bjb.",
      "Built native mobile UI/UX and supported web frontend side.",
      "Implemented input pages for vehicle plate color, police number, NIK, and chassis number.",
      "Created inquiry, payment summary, success, countdown, copy code, and Pay Now redirect states.",
      "Handled expired tax, DIGI Inbox display, and bjb Paylater transaction identification."
    ],
    stack: ["Flutter", "Dart", "WebView", "REST API", "Payment Flow"],
    liveUrl: "#",
    githubUrl: "#",
    previewLabel: "Vehicle tax payment"
  },
  {
    id: "bi-rtgs",
    title: "Transfer BI-RTGS Enhancement",
    period: "Nov 2025 - Dec 2025",
    description:
      "Developed a secure high-value interbank transfer experience for eligible bjb Prioritas customers.",
    responsibilities: [
      "Developed a new Transfer via RTGS menu.",
      "Configured access rules for eligible bjb Prioritas customers.",
      "Implemented validation for customer status, source account, transaction limit, operational hours, and fees.",
      "Supported transaction journal, narrative, email notification, and channel flagging requirements.",
      "Created confirmation, PIN validation, success page, receipt sharing, and receipt saving flows."
    ],
    stack: ["Flutter", "Dart", "GetX", "Validation", "Secure Flow"],
    liveUrl: "#",
    githubUrl: "#",
    previewLabel: "High-value transfer"
  },
  {
    id: "tandamata-rencana",
    title: "Tandamata Rencana Promotional Enhancement",
    period: "Sep 2025 - Oct 2025",
    description:
      "Enhanced promotional program behavior and account status logic within the Tandamata Rencana feature.",
    responsibilities: [
      "Aligned the promotional interface with UI/UX best practices.",
      "Implemented Program dropdown options for Qurban ASN and Non Program.",
      "Controlled Close Rencanaku and Postpone My Goals behavior for active program participants.",
      "Configured postponed account status logic.",
      "Supported branch continuation flow for postponed accounts."
    ],
    stack: ["Flutter", "Dart", "GetX", "UI Logic", "Form UX"],
    liveUrl: "#",
    githubUrl: "#",
    previewLabel: "Savings program UX"
  },
  {
    id: "other-savings-webview",
    title: "WebView Other Savings Info",
    period: "Jun 2025 - Jul 2025",
    description:
      "Improved user access to multiple savings accounts through a dynamic WebView and floating entry point.",
    responsibilities: [
      "Developed a floating Other Savings button in Financial Management.",
      "Integrated a dynamic WebView for categorized savings information.",
      "Displayed total balance, blocked amount, and withdrawable balance.",
      "Built tabbed mini statement and transaction history actions.",
      "Kept the floating entry point visible during scroll."
    ],
    stack: ["Flutter", "Dart", "WebView", "Tabbed UI", "Responsive UX"],
    liveUrl: "#",
    githubUrl: "#",
    previewLabel: "Savings WebView"
  },
  {
    id: "t-samsat",
    title: "T-Samsat Frontend Enhancement",
    period: "Mar 2025 - May 2025",
    description:
      "Enhanced the T-Samsat registration feature with flexible registration types and stronger data handling.",
    responsibilities: [
      "Added flexible Registration Type options.",
      "Enabled One-Time and Periodic registration modes.",
      "Implemented dynamic Block Period Type fields for Daily, Weekly, and Monthly options.",
      "Improved license plate input validation with automatic uppercase conversion.",
      "Added a receipt summary table with key details and total transaction amount."
    ],
    stack: ["Flutter", "Dart", "Dynamic Forms", "Validation", "Receipt UI"],
    liveUrl: "#",
    githubUrl: "#",
    previewLabel: "Registration UX"
  },
  {
    id: "qris-indomaret",
    title: "QRIS Indomaret Payment",
    period: "Dec 2024 - Mar 2025",
    description:
      "Designed and implemented an end-to-end QRIS Indomaret payment flow for DIGI bank bjb.",
    responsibilities: [
      "Designed the UI/UX from scratch using Figma.",
      "Implemented responsive and modular Flutter frontend code.",
      "Handled QR generation, scanning, and real-time transaction status updates.",
      "Integrated request-response flows with internal REST APIs.",
      "Collaborated with backend and QA teams through UAT, staging, and production releases.",
      "Aligned the feature with QRIS and internal bank security protocols."
    ],
    stack: ["Figma", "Flutter", "Dart", "REST API", "QRIS"],
    liveUrl: "#",
    githubUrl: "#",
    previewLabel: "Merchant payment"
  },
  {
    id: "ielts-nat-email",
    title: "IELTS and NAT-Test Marketing Email Documentation",
    period: "Nov 2023 - Dec 2023",
    description:
      "Created English marketing email documentation using linguistics, rhetoric, localization, and audience awareness.",
    responsibilities: [
      "Applied formal correspondence and rhetoric techniques.",
      "Used equivalence and adaptation to preserve intent and promotional value.",
      "Adjusted register, tone, and word choices for institutional stakeholders."
    ],
    stack: ["English Writing", "Localization", "Documentation", "Audience Strategy"],
    liveUrl: "#",
    githubUrl: "#",
    previewLabel: "Language project"
  }
];

export const portfolioSections: Record<SectionId, PortfolioSection> = {
  intro: {
    id: "intro",
    eyebrow: "Welcome",
    title: "Explore Afghany's room",
    description:
      "Hover the glowing objects, click one, and the camera will move through the workspace to reveal each portfolio section."
  },
  about: {
    id: "about",
    eyebrow: "About Me",
    title: "Software engineering foundation with practical product delivery experience.",
    description:
      "A five-year work journey across mobile development, frontend interfaces, translation, service, operations, and retail has shaped a developer who can communicate clearly and work under pressure."
  },
  skills: {
    id: "skills",
    eyebrow: "Skill Board",
    title: "Mobile, frontend, UI/UX, and delivery tools.",
    description:
      "The skill set combines Flutter and Dart mobile development, React and Next.js frontend fundamentals, UI/UX handoff, and production delivery tools."
  },
  projects: {
    id: "projects",
    eyebrow: "Project Terminal",
    title: "Mobile, banking, POS, and communication projects.",
    description:
      "Selected projects from point-of-sale operations, mobile banking, payment flows, account opening, savings features, QRIS payment, and English documentation."
  },
  experience: {
    id: "experience",
    eyebrow: "Experience",
    title: "Work history and certificate gallery.",
    description:
      "Professional experience from Bank BJB, Jabar Maya, Universitas Airlangga, hospitality operations, and retail, supported by the certificate assets in this project."
  },
  contact: {
    id: "contact",
    eyebrow: "Contact",
    title: "Available for frontend, mobile, and UI implementation work.",
    description:
      "Use the contact links to reach Afghany for frontend, mobile, product UI, and implementation roles."
  }
};

export const interactiveObjects: InteractiveObjectConfig[] = [
  {
    id: "poster",
    section: "about",
    label: "About frames",
    hint: "Open About Me",
    accent: "#9b5cff"
  },
  {
    id: "whiteboard",
    section: "skills",
    label: "Skill whiteboard",
    hint: "Open Skills",
    accent: "#4f8cff"
  },
  {
    id: "laptop",
    section: "projects",
    label: "Project laptop",
    hint: "Open Projects",
    accent: "#6ee7ff"
  },
  {
    id: "arcade",
    section: "experience",
    label: "Experience arcade",
    hint: "Open Experience",
    accent: "#ffb86b"
  },
  {
    id: "phone",
    section: "contact",
    label: "Rubik's Cube",
    hint: "Open Contact",
    accent: "#f6d34d"
  }
];

export const contactLinks = [
  {
    label: "Email",
    value: portfolioProfile.email,
    href: `mailto:${portfolioProfile.email}`
  },
  {
    label: "Phone",
    value: portfolioProfile.phone,
    href: `tel:${portfolioProfile.phone.replaceAll(" ", "").replaceAll("-", "")}`
  },
  {
    label: "GitHub",
    value: "github.com/Morr3r",
    href: portfolioProfile.social.github
  },
  {
    label: "Portfolio",
    value: "afghanyportofolio.vercel.app",
    href: "https://afghanyportofolio.vercel.app"
  }
];

export const profile = {
  name: portfolioProfile.name,
  headline: portfolioProfile.role,
  location: portfolioProfile.location,
  email: portfolioProfile.email,
  phone: portfolioProfile.phone,
  linkedin: portfolioProfile.social.linkedin,
  linkedinLabel: "afghanyportofolio.vercel.app",
  summary: portfolioProfile.intro,
  availability: portfolioSections.contact.description
};

export const metrics = [
  {
    value: "5+",
    label: "Years of work experience",
    detail: "Software, banking, service, language, hospitality, and retail experience."
  },
  {
    value: "9",
    label: "Selected projects",
    detail: "Mobile POS, DIGI bank bjb features, and English documentation work."
  },
  {
    value: "18",
    label: "Tools and skills",
    detail: "Mobile, frontend, UI/UX, delivery, and creative tools."
  },
  {
    value: "10",
    label: "Certificate images",
    detail: "All certificate assets from the local assets folder are included."
  }
];

export const experiences = workExperiences;

export const projects = portfolioProjects.map((project) => ({
  id: project.id,
  title: project.title,
  period: project.period,
  category: "Portfolio" as const,
  summary: project.description,
  role: "Frontend Mobile Developer",
  responsibilities: project.responsibilities,
  stack: project.stack,
  impact: project.previewLabel
}));

export const skillGroups = [
  {
    title: "Main Skills",
    description: "Primary mobile, frontend, UI/UX, and delivery tools from the resume.",
    skills: portfolioSkills.slice(0, 13)
  },
  {
    title: "Additional Skills",
    description: "Creative production tools listed in the resume.",
    skills: portfolioSkills.slice(13)
  }
];

export const portfolioContent = {
  en: {
    profile,
    metrics,
    experiences,
    projects,
    skillGroups,
    education,
    languages
  },
  id: {
    profile,
    metrics,
    experiences,
    projects,
    skillGroups,
    education,
    languages
  }
};
