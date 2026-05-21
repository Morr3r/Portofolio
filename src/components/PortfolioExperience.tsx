"use client";

import {
  type CSSProperties,
  type SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp,
  ArrowUpRight,
  Award,
  BadgeCheck,
  BriefcaseBusiness,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Code2,
  Eye,
  ExternalLink,
  Layers3,
  Mail,
  Maximize2,
  Menu,
  MessageSquareText,
  Moon,
  MousePointer2,
  PanelTop,
  Phone,
  RotateCcw,
  ScanLine,
  ShieldCheck,
  Sun,
  X,
  Zap
} from "lucide-react";
import clsx from "clsx";
import {
  portfolioContent,
  type LocaleCode
} from "@/lib/portfolio-data";
import brandPhoto from "@/assets/PasPhoto.jpg";
import pasPhoto from "@/assets/PasPhoto2-transparent.png";
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
import { ConnectionIndicator } from "@/components/ConnectionIndicator";
import { PortfolioLoadingScreen } from "@/components/PortfolioLoadingScreen";
import { SignalCanvas } from "@/components/SignalCanvas";

const navItems = [
  { label: { en: "Home", id: "Beranda" }, href: "#home" },
  { label: { en: "Projects", id: "Proyek" }, href: "#projects" },
  { label: { en: "Experience", id: "Pengalaman" }, href: "#experience" },
  { label: { en: "Skills", id: "Keahlian" }, href: "#skills" },
  { label: { en: "Certificates", id: "Sertifikat" }, href: "#certificates" },
  { label: { en: "Contact", id: "Kontak" }, href: "#contact" }
];

const projectCategories = [
  { value: "All", label: { en: "All", id: "Semua" } },
  { value: "Payments", label: { en: "Payments", id: "Pembayaran" } },
  { value: "Mobile Banking", label: { en: "Mobile Banking", id: "Mobile Banking" } },
  { value: "Account Opening", label: { en: "Account Opening", id: "Pembukaan Rekening" } },
  { value: "Communication", label: { en: "Communication", id: "Komunikasi" } }
] as const;

type ProjectFilter = (typeof projectCategories)[number]["value"];
type ThemeMode = "dark" | "light";
type CertificateImage = {
  label: string;
  src: StaticImageData;
};

type Certificate = {
  id: string;
  title: string;
  issuer: string;
  domain: string;
  credential: string;
  accent: string;
  images: CertificateImage[];
  tags: string[];
};

type OrbitSkill = {
  name: string;
  mode: string;
  signal: string;
  detail: string;
  related: string[];
};

const getInitialLanguage = (): LocaleCode => {
  return "en";
};

const uiText = {
  en: {
    languageToggleLabel: "Choose language",
    openProfilePhoto: "Open profile photo preview",
    primaryNavigation: "Primary navigation",
    mobileNavigation: "Mobile navigation",
    switchTheme: (nextTheme: ThemeMode) => `Switch to ${nextTheme} mode`,
    sendEmail: "Send email",
    toggleNavigation: "Toggle navigation menu",
    primaryActions: "Primary actions",
    hireMe: "Hire me",
    openLinkedIn: "Open LinkedIn profile",
    professionalPortrait: "professional portrait",
    professionalMetrics: "Professional metrics",
    capabilityEyebrow: "Product-minded frontend",
    capabilityTitle: "Interfaces that look sharp and survive real transaction rules.",
    capabilityDescription:
      "I combine UI implementation, mobile architecture, and customer-facing service experience to build flows that are usable under pressure.",
    capabilities: [
      {
        title: "Pixel-conscious UI",
        text: "Turns Figma intent into clear screens, states, forms, and responsive layouts."
      },
      {
        title: "Real-time flows",
        text: "Works with API responses, WebSocket updates, validation, and transaction status changes."
      },
      {
        title: "Banking complexity",
        text: "Comfortable with eligibility, fees, operational hours, receipts, and secure handoff states."
      },
      {
        title: "Usability instincts",
        text: "Uses service and communication background to keep interfaces direct and easy to operate."
      }
    ],
    selectedProjectsEyebrow: "Selected project systems",
    selectedProjectsTitle: "Banking features, payment journeys, and mobile product details.",
    projectFilters: "Project filters",
    projectList: "Project list",
    experienceTimeline: "Experience timeline",
    skillOrbit: "Interactive core technology orbit",
    relatedSkills: (skillName: string) => `${skillName} related skills`,
    skillsEyebrow: "Technical range",
    skillsTitle: "Frontend stack with mobile release awareness.",
    skillsDescription:
      "The skill set spans implementation, design handoff, stateful mobile flows, and production delivery tooling.",
    skillGroups: "Skill groups",
    certificatesEyebrow: "Certificates",
    certificateSummary: "Certificate summary",
    credentialSets: "Credential sets",
    documentPages: "Document pages",
    bjbTwoSided: "BJB two-sided",
    certificateFront: "certificate front",
    certificateBack: "certificate back",
    openCertificatePreview: (title: string) => `Open ${title} certificate preview`,
    inspect: "Inspect",
    certificatePages: "Certificate pages",
    backSide: "Back side",
    frontSide: "Front side",
    singlePage: "Single page",
    credentialGrid: "Credential grid",
    certificateGallery: "Certificate gallery",
    pagePlural: (count: number) => `${count} page${count > 1 ? "s" : ""}`,
    certificateGalleryPagination: "Certificate gallery pagination",
    previousCertificatePage: "Previous certificate page",
    nextCertificatePage: "Next certificate page",
    showCertificates: (start: number, end: number) => `Show certificates ${start} to ${end}`,
    page: "Page",
    educationEyebrow: "Education and languages",
    educationTitle: "Software foundation with English communication strength.",
    languages: "Languages",
    communication: "Communication",
    contactEyebrow: "Contact",
    contactTitle: "Ready for frontend, mobile, and UI implementation work.",
    phone: "Phone",
    backToTop: "Back to top",
    profilePhotoPreview: "Profile photo preview",
    closeProfilePhotoPreview: "Close profile photo preview",
    certificatePreview: (title: string) => `${title} certificate preview`,
    closeCertificatePreview: "Close certificate preview",
    certificatePreviewPages: "Certificate preview pages",
    scrollBackToTop: "Scroll back to top",
    certificatePageAlt: (title: string, label: string) =>
      `${title} ${label.toLowerCase()} certificate page`
  },
  id: {
    languageToggleLabel: "Pilih bahasa",
    openProfilePhoto: "Buka pratinjau foto profil",
    primaryNavigation: "Navigasi utama",
    mobileNavigation: "Navigasi mobile",
    switchTheme: (nextTheme: ThemeMode) =>
      `Ganti ke mode ${nextTheme === "dark" ? "gelap" : "terang"}`,
    sendEmail: "Kirim email",
    toggleNavigation: "Buka atau tutup menu navigasi",
    primaryActions: "Aksi utama",
    hireMe: "Hubungi saya",
    openLinkedIn: "Buka profil LinkedIn",
    professionalPortrait: "potret profesional",
    professionalMetrics: "Metrik profesional",
    capabilityEyebrow: "Frontend berorientasi produk",
    capabilityTitle: "Antarmuka yang tajam secara visual dan kuat menghadapi aturan transaksi nyata.",
    capabilityDescription:
      "Saya menggabungkan implementasi UI, arsitektur mobile, dan pengalaman layanan pelanggan untuk membangun alur yang tetap mudah digunakan dalam kondisi bertekanan.",
    capabilities: [
      {
        title: "UI presisi desain",
        text: "Menerjemahkan arahan Figma menjadi layar, state, form, dan layout responsif yang jelas."
      },
      {
        title: "Alur real-time",
        text: "Bekerja dengan respons API, pembaruan WebSocket, validasi, dan perubahan status transaksi."
      },
      {
        title: "Kompleksitas perbankan",
        text: "Terbiasa dengan kelayakan, biaya, jam operasional, resi, dan state handoff yang aman."
      },
      {
        title: "Kepekaan usability",
        text: "Menggunakan latar belakang layanan dan komunikasi agar antarmuka tetap langsung dan mudah dioperasikan."
      }
    ],
    selectedProjectsEyebrow: "Sistem proyek pilihan",
    selectedProjectsTitle: "Fitur perbankan, perjalanan pembayaran, dan detail produk mobile.",
    projectFilters: "Filter proyek",
    projectList: "Daftar proyek",
    experienceTimeline: "Linimasa pengalaman",
    skillOrbit: "Orbit teknologi inti interaktif",
    relatedSkills: (skillName: string) => `Keahlian terkait ${skillName}`,
    skillsEyebrow: "Jangkauan teknis",
    skillsTitle: "Stack frontend dengan pemahaman rilis mobile.",
    skillsDescription:
      "Kumpulan keahlian mencakup implementasi, handoff desain, alur mobile yang stateful, dan tools delivery produksi.",
    skillGroups: "Grup keahlian",
    certificatesEyebrow: "Sertifikat",
    certificateSummary: "Ringkasan sertifikat",
    credentialSets: "Set kredensial",
    documentPages: "Halaman dokumen",
    bjbTwoSided: "BJB dua sisi",
    certificateFront: "bagian depan sertifikat",
    certificateBack: "bagian belakang sertifikat",
    openCertificatePreview: (title: string) => `Buka pratinjau sertifikat ${title}`,
    inspect: "Lihat detail",
    certificatePages: "Halaman sertifikat",
    backSide: "Sisi belakang",
    frontSide: "Sisi depan",
    singlePage: "Satu halaman",
    credentialGrid: "Grid kredensial",
    certificateGallery: "Galeri sertifikat",
    pagePlural: (count: number) => `${count} halaman`,
    certificateGalleryPagination: "Paginasi galeri sertifikat",
    previousCertificatePage: "Halaman sertifikat sebelumnya",
    nextCertificatePage: "Halaman sertifikat berikutnya",
    showCertificates: (start: number, end: number) =>
      `Tampilkan sertifikat ${start} sampai ${end}`,
    page: "Halaman",
    educationEyebrow: "Pendidikan dan bahasa",
    educationTitle: "Fondasi perangkat lunak dengan kekuatan komunikasi Bahasa Inggris.",
    languages: "Bahasa",
    communication: "Komunikasi",
    contactEyebrow: "Kontak",
    contactTitle: "Siap untuk pekerjaan frontend, mobile, dan implementasi UI.",
    phone: "Telepon",
    backToTop: "Kembali ke atas",
    profilePhotoPreview: "Pratinjau foto profil",
    closeProfilePhotoPreview: "Tutup pratinjau foto profil",
    certificatePreview: (title: string) => `Pratinjau sertifikat ${title}`,
    closeCertificatePreview: "Tutup pratinjau sertifikat",
    certificatePreviewPages: "Halaman pratinjau sertifikat",
    scrollBackToTop: "Gulir kembali ke atas",
    certificatePageAlt: (title: string, label: string) =>
      `Halaman sertifikat ${title} ${label.toLowerCase()}`
  }
} as const;

const orbitSkillTranslationsId: Record<
  string,
  Pick<OrbitSkill, "mode" | "signal" | "detail">
> = {
  Flutter: {
    mode: "UI Mobile",
    signal: "Layar perbankan",
    detail:
      "Membangun alur DIGI bank bjb yang responsif, state transaksi, dan UI mobile yang dapat digunakan kembali."
  },
  Dart: {
    mode: "Logika Aplikasi",
    signal: "Kontrol alur bertipe",
    detail:
      "Menjaga logika form, validasi, dan perilaku transaksi async tetap terprediksi di Flutter."
  },
  "Next.js": {
    mode: "Frontend Web",
    signal: "Integrasi webview",
    detail:
      "Mendukung halaman React yang terstruktur, aset yang optimal, dan antarmuka web siap produksi."
  },
  "React.js": {
    mode: "State Antarmuka",
    signal: "Logika komponen",
    detail:
      "Mengubah bagian UI menjadi komponen stateful yang mudah dipelihara dengan batas interaksi yang jelas."
  },
  Figma: {
    mode: "Handoff Desain",
    signal: "Intensi visual",
    detail:
      "Membantu membingkai keputusan layout, state interaksi, dan hierarki visual sebelum implementasi."
  },
  GetX: {
    mode: "Lapisan State",
    signal: "State mobile",
    detail:
      "Mengkoordinasikan state layar, controller, dan pembaruan reaktif dalam alur mobile banking."
  },
  "REST API": {
    mode: "Integrasi",
    signal: "Request response",
    detail:
      "Menghubungkan UI ke data inquiry, pembayaran, validasi, dan resi dari layanan backend."
  },
  WebSocket: {
    mode: "Real Time",
    signal: "Status langsung",
    detail: "Menangani perubahan status real-time untuk perjalanan pembayaran dan transaksi."
  }
};

const baseOrbitSkills: OrbitSkill[] = [
  {
    name: "Flutter",
    mode: "Mobile UI",
    signal: "Banking screens",
    detail: "Builds responsive DIGI bank bjb flows, transaction states, and reusable mobile UI.",
    related: ["Dart", "GetX", "REST API"]
  },
  {
    name: "Dart",
    mode: "App Logic",
    signal: "Typed flow control",
    detail: "Keeps form logic, validation, and async transaction behavior predictable in Flutter.",
    related: ["Flutter", "Validation", "State"]
  },
  {
    name: "Next.js",
    mode: "Web Frontend",
    signal: "Webview integration",
    detail: "Supports structured React pages, optimized assets, and production-ready web interfaces.",
    related: ["React.js", "Routing", "Assets"]
  },
  {
    name: "React.js",
    mode: "Interface State",
    signal: "Component logic",
    detail: "Turns UI sections into stateful, maintainable components with clear interaction boundaries.",
    related: ["Next.js", "Hooks", "UI state"]
  },
  {
    name: "Figma",
    mode: "Design Handoff",
    signal: "Pixel intent",
    detail: "Frames layout decisions, interaction states, and visual hierarchy before implementation.",
    related: ["UI/UX", "Prototype", "Responsive"]
  },
  {
    name: "GetX",
    mode: "State Layer",
    signal: "Mobile state",
    detail: "Coordinates screen state, controllers, and reactive updates in mobile banking flows.",
    related: ["Flutter", "Dart", "Controllers"]
  },
  {
    name: "REST API",
    mode: "Integration",
    signal: "Request response",
    detail: "Connects UI to inquiry, payment, validation, and receipt data from backend services.",
    related: ["JSON", "Validation", "Receipts"]
  },
  {
    name: "WebSocket",
    mode: "Real Time",
    signal: "Live status",
    detail: "Handles real-time status changes for payment and transaction journeys.",
    related: ["Events", "Status", "Sync"]
  }
];

const baseCertificates: Certificate[] = [
  {
    id: "bjb-it-security",
    title: "IT Security - Security Awareness Batch 1",
    issuer: "bank bjb",
    domain: "Security awareness",
    credential: "Two-sided certificate",
    accent: "#65f2c2",
    images: [
      { label: "Front", src: certificateItSecurityFront },
      { label: "Back", src: certificateItSecurityBack }
    ],
    tags: ["BJB", "IT Security", "Awareness"]
  },
  {
    id: "bjb-strategic-project",
    title: "Strategic Project Management for Banking Digital Transformation",
    issuer: "bank bjb",
    domain: "Digital transformation",
    credential: "Two-sided certificate",
    accent: "#58d7ff",
    images: [
      { label: "Front", src: certificateStrategicProjectFront },
      { label: "Back", src: certificateStrategicProjectBack }
    ],
    tags: ["BJB", "Project", "Banking"]
  },
  {
    id: "bjb-apuppt",
    title: "APU PPT",
    issuer: "bank bjb",
    domain: "Compliance learning",
    credential: "Two-sided certificate",
    accent: "#f8c15d",
    images: [
      { label: "Front", src: certificateApupptFront },
      { label: "Back", src: certificateApupptBack }
    ],
    tags: ["BJB", "Compliance", "Risk"]
  },
  {
    id: "bjb-gratifikasi",
    title: "Gratifikasi",
    issuer: "bank bjb",
    domain: "Ethics and compliance",
    credential: "Two-sided certificate",
    accent: "#ff6f61",
    images: [
      { label: "Front", src: certificateGratifikasiFront },
      { label: "Back", src: certificateGratifikasiBack }
    ],
    tags: ["BJB", "Ethics", "Governance"]
  },
  {
    id: "jabarmaya",
    title: "Frontend Developer Internship",
    issuer: "PT Sarana Insan Muda Selaras (Jabar Maya)",
    domain: "Web interface implementation",
    credential: "Single-page certificate",
    accent: "#b89bff",
    images: [{ label: "Certificate", src: certificateJabarmaya }],
    tags: ["Frontend", "Jabar Maya", "Internship"]
  },
  {
    id: "pusat-bahasa",
    title: "English Translator and Public Relations Administration",
    issuer: "Pusat Bahasa dan Multibudaya Universitas Airlangga",
    domain: "Language and communication",
    credential: "Single-page certificate",
    accent: "#65f2c2",
    images: [{ label: "Certificate", src: certificatePusatBahasa }],
    tags: ["English", "Translation", "Administration"]
  }
];

const certificateTranslationsId: Record<
  string,
  Pick<Certificate, "title" | "domain" | "credential" | "tags"> & { imageLabels: string[] }
> = {
  "bjb-it-security": {
    title: "IT Security - Security Awareness Batch 1",
    domain: "Kesadaran keamanan",
    credential: "Sertifikat dua sisi",
    imageLabels: ["Depan", "Belakang"],
    tags: ["BJB", "Keamanan TI", "Awareness"]
  },
  "bjb-strategic-project": {
    title: "Manajemen Proyek Strategis untuk Transformasi Digital Perbankan",
    domain: "Transformasi digital",
    credential: "Sertifikat dua sisi",
    imageLabels: ["Depan", "Belakang"],
    tags: ["BJB", "Proyek", "Perbankan"]
  },
  "bjb-apuppt": {
    title: "APU PPT",
    domain: "Pembelajaran kepatuhan",
    credential: "Sertifikat dua sisi",
    imageLabels: ["Depan", "Belakang"],
    tags: ["BJB", "Kepatuhan", "Risiko"]
  },
  "bjb-gratifikasi": {
    title: "Gratifikasi",
    domain: "Etika dan kepatuhan",
    credential: "Sertifikat dua sisi",
    imageLabels: ["Depan", "Belakang"],
    tags: ["BJB", "Etika", "Tata Kelola"]
  },
  jabarmaya: {
    title: "Magang Frontend Developer",
    domain: "Implementasi antarmuka web",
    credential: "Sertifikat satu halaman",
    imageLabels: ["Sertifikat"],
    tags: ["Frontend", "Jabar Maya", "Magang"]
  },
  "pusat-bahasa": {
    title: "Penerjemah Bahasa Inggris dan Administrasi Humas",
    domain: "Bahasa dan komunikasi",
    credential: "Sertifikat satu halaman",
    imageLabels: ["Sertifikat"],
    tags: ["Bahasa Inggris", "Terjemahan", "Administrasi"]
  }
};

const certificatePageCount = baseCertificates.reduce(
  (total, certificate) => total + certificate.images.length,
  0
);
const certificatesPerGalleryPage = 3;
const certificateGalleryPageCount = Math.ceil(baseCertificates.length / certificatesPerGalleryPage);
const bjbTwoSidedCertificateCount = baseCertificates.filter(
  (certificate) => certificate.issuer === "bank bjb" && certificate.images.length > 1
).length;

const preventProtectedPhotoAction = (event: SyntheticEvent) => {
  event.preventDefault();
};

export function PortfolioExperience() {
  const [isBooting, setIsBooting] = useState(true);
  const [language, setLanguage] = useState<LocaleCode>(getInitialLanguage);
  const text = uiText[language];
  const { profile, metrics, experiences, projects, skillGroups, education, languages } =
    portfolioContent[language];
  const certificates = useMemo(
    () =>
      baseCertificates.map((certificate) => {
        if (language === "en") {
          return certificate;
        }

        const translation = certificateTranslationsId[certificate.id];

        if (!translation) {
          return certificate;
        }

        return {
          ...certificate,
          ...translation,
          images: certificate.images.map((image, index) => ({
            ...image,
            label: translation?.imageLabels[index] ?? image.label
          }))
        };
      }),
    [language]
  );
  const orbitSkills = useMemo(
    () =>
      baseOrbitSkills.map((skill) => {
        if (language === "en") {
          return skill;
        }

        return {
          ...skill,
          ...orbitSkillTranslationsId[skill.name]
        };
      }),
    [language]
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>("All");
  const [activeProjectId, setActiveProjectId] = useState(projects[0].id);
  const [activeSkillGroup, setActiveSkillGroup] = useState(0);
  const [activeOrbitSkill, setActiveOrbitSkill] = useState(0);
  const [activeExperience, setActiveExperience] = useState(0);
  const [activeCertificateId, setActiveCertificateId] = useState(baseCertificates[0].id);
  const [activeCertificateSide, setActiveCertificateSide] = useState(0);
  const [certificateGalleryPage, setCertificateGalleryPage] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    let animationFrame = 0;
    const storedLanguage = window.localStorage.getItem("portfolio-language");

    if (storedLanguage === "en" || storedLanguage === "id") {
      animationFrame = window.requestAnimationFrame(() => {
        setLanguage(storedLanguage);
      });
    }

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("portfolio-language", language);
  }, [language]);

  useEffect(() => {
    let animationFrame = 0;
    const storedTheme = window.localStorage.getItem("portfolio-theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
    const initialTheme =
      storedTheme === "light" || storedTheme === "dark" ? storedTheme : systemTheme;

    document.documentElement.dataset.theme = initialTheme;
    document.documentElement.style.colorScheme = initialTheme;

    animationFrame = window.requestAnimationFrame(() => {
      setTheme(initialTheme);
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    let isVisible = false;
    let animationFrame = 0;

    const updateScrollButton = () => {
      if (animationFrame) {
        return;
      }

      animationFrame = window.requestAnimationFrame(() => {
        const experienceSection = document.getElementById("experience");
        const experienceStart = experienceSection?.offsetTop ?? 420;
        const shouldShow = window.scrollY >= experienceStart - 120;

        if (shouldShow !== isVisible) {
          isVisible = shouldShow;
          setShowScrollTop(shouldShow);
        }

        animationFrame = 0;
      });
    };

    window.addEventListener("scroll", updateScrollButton, { passive: true });
    updateScrollButton();

    return () => {
      window.removeEventListener("scroll", updateScrollButton);

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  useEffect(() => {
    let currentSection = "home";
    let animationFrame = 0;

    const updateActiveSection = () => {
      if (animationFrame) {
        return;
      }

      animationFrame = window.requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + 140;
        const sectionIds = navItems.map((item) => item.href.slice(1));
        const scrollBottom = window.scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const isNearPageBottom = scrollBottom >= documentHeight - 8;
        const nextSection =
          isNearPageBottom
            ? "contact"
            : sectionIds.findLast((sectionId) => {
                const section = document.getElementById(sectionId);

                return section ? section.offsetTop <= scrollPosition : false;
              }) ?? "home";

        if (nextSection !== currentSection) {
          currentSection = nextSection;
          setActiveSection(nextSection);
        }

        animationFrame = 0;
      });
    };

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    updateActiveSection();

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  useEffect(() => {
    if (!photoModalOpen && !certificateModalOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPhotoModalOpen(false);
        setCertificateModalOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [photoModalOpen, certificateModalOpen]);

  const filteredProjects = useMemo(() => {
    if (projectFilter === "All") {
      return projects;
    }

    return projects.filter((project) => project.category === projectFilter);
  }, [projectFilter, projects]);

  const activeProject =
    filteredProjects.find((project) => project.id === activeProjectId) ?? filteredProjects[0];
  const activeOrbit = orbitSkills[activeOrbitSkill];
  const activeCertificate =
    certificates.find((certificate) => certificate.id === activeCertificateId) ?? certificates[0];
  const activeCertificateSideIndex = Math.min(
    activeCertificateSide,
    activeCertificate.images.length - 1
  );
  const activeCertificateImage = activeCertificate.images[activeCertificateSideIndex];
  const hasMultipleCertificateSides = activeCertificate.images.length > 1;
  const certificateGalleryStart = certificateGalleryPage * certificatesPerGalleryPage;
  const certificateGalleryEnd = Math.min(
    certificateGalleryStart + certificatesPerGalleryPage,
    certificates.length
  );
  const visibleCertificates = certificates.slice(certificateGalleryStart, certificateGalleryEnd);
  const getProjectCategoryLabel = (category: ProjectFilter) =>
    projectCategories.find((item) => item.value === category)?.label[language] ?? category;

  const handleBootComplete = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setActiveSection("home");
    setShowScrollTop(false);
    setIsBooting(false);
  }, []);

  const handleLanguageChange = (nextLanguage: LocaleCode) => {
    setLanguage(nextLanguage);
  };

  const handleFilterChange = (category: ProjectFilter) => {
    setProjectFilter(category);
    const firstMatch =
      category === "All" ? projects[0] : projects.find((project) => project.category === category);
    setActiveProjectId(firstMatch?.id ?? projects[0].id);
  };

  const handleOrbitSkillChange = (index: number, syncSkillGroup = false) => {
    setActiveOrbitSkill(index);

    if (!syncSkillGroup) {
      return;
    }

    const relatedSkillGroup = skillGroups.findIndex((group) =>
      group.skills.includes(orbitSkills[index].name)
    );

    if (relatedSkillGroup >= 0) {
      setActiveSkillGroup(relatedSkillGroup);
    }
  };

  const handleCertificateSelect = (certificateId: string) => {
    const selectedCertificateIndex = certificates.findIndex(
      (certificate) => certificate.id === certificateId
    );

    setActiveCertificateId(certificateId);
    setActiveCertificateSide(0);

    if (selectedCertificateIndex >= 0) {
      setCertificateGalleryPage(Math.floor(selectedCertificateIndex / certificatesPerGalleryPage));
    }
  };

  const handleCertificateGalleryPageChange = (page: number) => {
    const nextPage = Math.min(Math.max(page, 0), certificateGalleryPageCount - 1);
    const nextCertificate = certificates[nextPage * certificatesPerGalleryPage];

    setCertificateGalleryPage(nextPage);

    if (nextCertificate) {
      setActiveCertificateId(nextCertificate.id);
      setActiveCertificateSide(0);
    }
  };

  const handleCertificateFlip = () => {
    setActiveCertificateSide((currentSide) =>
      activeCertificate.images.length > 1 ? (currentSide + 1) % activeCertificate.images.length : 0
    );
  };

  const handleScrollToTop = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });
  };

  const handleThemeToggle = () => {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === "dark" ? "light" : "dark";

      document.documentElement.dataset.theme = nextTheme;
      document.documentElement.style.colorScheme = nextTheme;
      window.localStorage.setItem("portfolio-theme", nextTheme);

      return nextTheme;
    });
  };

  return (
    <main className="site-shell">
      <AnimatePresence mode="wait">
        {isBooting ? (
          <PortfolioLoadingScreen
            key="portfolio-loading-screen"
            language={language}
            onComplete={handleBootComplete}
          />
        ) : null}
      </AnimatePresence>

      <header className="topbar">
        <button
          className="brand-mark protected-photo"
          type="button"
          aria-label={text.openProfilePhoto}
          aria-expanded={photoModalOpen}
          onContextMenu={preventProtectedPhotoAction}
          onDragStart={preventProtectedPhotoAction}
          onClick={() => setPhotoModalOpen(true)}
        >
          <Image
            src={brandPhoto}
            alt=""
            fill
            priority
            draggable={false}
            onContextMenu={preventProtectedPhotoAction}
            onDragStart={preventProtectedPhotoAction}
            sizes="42px"
            className="brand-image"
          />
        </button>

        <nav className="desktop-nav" aria-label={text.primaryNavigation}>
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);

            return (
              <a
                className={clsx(isActive && "active")}
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label[language]}
              </a>
            );
          })}
        </nav>

        <div className="topbar-actions">
          <div className="language-toggle" role="group" aria-label={text.languageToggleLabel}>
            {(["id", "en"] as const).map((languageOption) => (
              <button
                className={clsx(language === languageOption && "active")}
                type="button"
                key={languageOption}
                aria-pressed={language === languageOption}
                onClick={() => handleLanguageChange(languageOption)}
              >
                {languageOption.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            className="icon-button theme-toggle"
            type="button"
            onClick={handleThemeToggle}
            aria-label={text.switchTheme(theme === "dark" ? "light" : "dark")}
            aria-pressed={theme === "light"}
            title={text.switchTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a className="icon-button" href={`mailto:${profile.email}`} aria-label={text.sendEmail}>
            <Mail size={18} />
          </a>
          <button
            className="icon-button mobile-menu-button"
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={text.toggleNavigation}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.nav
              className="mobile-nav"
              aria-label={text.mobileNavigation}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);

                return (
                  <a
                    className={clsx(isActive && "active")}
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label[language]}
                  </a>
                );
              })}
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </header>

      <section id="home" className="hero-section">
        <SignalCanvas />
        <div className="hero-overlay" />
        <div className="hero-content section-inner">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="eyebrow">
              <ScanLine size={16} />
              {profile.location}
            </span>
            <h1>{profile.name}</h1>
            <p className="hero-lede">{profile.headline}</p>
            <p className="hero-summary">{profile.summary}</p>

            <div className="hero-actions" aria-label={text.primaryActions}>
              <a className="secondary-button" href={`mailto:${profile.email}`}>
                <Mail size={18} />
                {text.hireMe}
              </a>
              <a
                className="icon-button"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label={text.openLinkedIn}
              >
                <ExternalLink size={18} />
              </a>
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, y: 30, rotateX: -8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          >
            <motion.div
              className="portrait-card"
              whileHover={{ y: -8, rotateY: -3 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
            >
              <div
                className="portrait-frame protected-photo"
                onContextMenu={preventProtectedPhotoAction}
                onDragStart={preventProtectedPhotoAction}
              >
                <Image
                  src={pasPhoto}
                  alt={`${profile.name} ${text.professionalPortrait}`}
                  fill
                  priority
                  draggable={false}
                  onContextMenu={preventProtectedPhotoAction}
                  onDragStart={preventProtectedPhotoAction}
                  sizes="(max-width: 620px) 86vw, (max-width: 1050px) 420px, 360px"
                  className="portrait-image"
                />
                <span className="portrait-scanline" aria-hidden="true" />
              </div>
              <div className="portrait-caption">
                <small>Afghany Yogaswara</small>
                <strong>{profile.headline}</strong>
              </div>
            </motion.div>


          </motion.div>
        </div>
      </section>

      <section className="metrics-band" aria-label={text.professionalMetrics}>
        <div className="metrics-grid section-inner">
          {metrics.map((metric) => (
            <motion.article
              className="metric-card"
              key={metric.label}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 240, damping: 18 }}
            >
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
              <p>{metric.detail}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="capability-section">
        <div className="section-inner split-layout">
          <div className="section-heading">
            <span className="eyebrow">
              {text.capabilityEyebrow}
            </span>
            <h2>{text.capabilityTitle}</h2>
            <p>{text.capabilityDescription}</p>
          </div>

          <div className="capability-grid">
            {[
              {
                icon: <PanelTop size={22} />,
                ...text.capabilities[0]
              },
              {
                icon: <Zap size={22} />,
                ...text.capabilities[1]
              },
              {
                icon: <Layers3 size={22} />,
                ...text.capabilities[2]
              },
              {
                icon: <MousePointer2 size={22} />,
                ...text.capabilities[3]
              }
            ].map((item) => (
              <motion.article
                className="capability-card"
                key={item.title}
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
              >
                <span>{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="projects-section">
        <div className="section-inner">
          <div className="section-heading wide-heading">
            <span className="eyebrow">
              <BriefcaseBusiness size={16} />
              {text.selectedProjectsEyebrow}
            </span>
            <h2>{text.selectedProjectsTitle}</h2>
          </div>

          <div className="filter-row" aria-label={text.projectFilters}>
            {projectCategories.map((category) => (
              <button
                className={clsx("filter-button", projectFilter === category.value && "active")}
                key={category.value}
                type="button"
                onClick={() => handleFilterChange(category.value)}
              >
                {category.label[language]}
              </button>
            ))}
          </div>

          <div className="project-workbench">
            <div className="project-list" aria-label={text.projectList}>
              {filteredProjects.map((project) => (
                <button
                  type="button"
                  className={clsx("project-row", activeProject?.id === project.id && "active")}
                  key={project.id}
                  onClick={() => setActiveProjectId(project.id)}
                >
                  <span>
                    <strong>{project.title}</strong>
                    <small>{project.period}</small>
                  </span>
                  <ArrowUpRight size={18} />
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeProject ? (
                <motion.article
                  className="project-detail"
                  key={activeProject.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.24 }}
                >
                  <div className="project-detail-header">
                    <span>{getProjectCategoryLabel(activeProject.category)}</span>
                    <small>{activeProject.period}</small>
                  </div>
                  <h3>{activeProject.title}</h3>
                  <p>{activeProject.summary}</p>

                  <div className="project-impact">
                    <BadgeCheck size={20} />
                    <span>{activeProject.impact}</span>
                  </div>

                  <div className="responsibility-grid">
                    {activeProject.responsibilities.map((responsibility) => (
                      <div className="responsibility-item" key={responsibility}>
                        <CircleDot size={14} />
                        <span>{responsibility}</span>
                      </div>
                    ))}
                  </div>

                  <div className="stack-row">
                    {activeProject.stack.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </motion.article>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section id="experience" className="experience-section">
        <div className="section-inner split-layout reverse-on-mobile">
          <div className="timeline-panel">
            {experiences.map((experience, index) => (
              <button
                className={clsx("timeline-item", activeExperience === index && "active")}
                key={`${experience.company}-${experience.role}`}
                type="button"
                onClick={() => setActiveExperience(index)}
              >
                <span className="timeline-dot" />
                <span>
                  <strong>{experience.role}</strong>
                  <small>{experience.company}</small>
                </span>
                <ChevronDown size={18} />
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.article
              className="experience-detail"
              key={experiences[activeExperience].company}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.24 }}
            >
              <div className="section-heading compact-heading">
                <span className="eyebrow">
                  <Code2 size={16} />
                  {text.experienceTimeline}
                </span>
                <h2>{experiences[activeExperience].role}</h2>
                <p>{experiences[activeExperience].summary}</p>
              </div>

              <div className="experience-meta">
                <span>{experiences[activeExperience].company}</span>
                <span>{experiences[activeExperience].period}</span>
                <span>{experiences[activeExperience].location}</span>
              </div>

              <div className="experience-highlights">
                {experiences[activeExperience].highlights.map((highlight) => (
                  <div className="highlight-line" key={highlight}>
                    <BadgeCheck size={16} />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              <div className="stack-row">
                {experiences[activeExperience].tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </section>

      <section id="skills" className="skills-section">
        <div className="section-inner split-layout">
          <div className="skill-orbit-shell">
            <div
              className="skill-orbit"
              aria-label={text.skillOrbit}
              role="group"
            >
              <span
                className="orbit-indicator"
                aria-hidden="true"
                style={
                  {
                    "--active-index": activeOrbitSkill,
                    "--total": orbitSkills.length
                  } as CSSProperties
                }
              />
              <AnimatePresence mode="wait">
                <motion.div
                  className="orbit-center"
                  key={activeOrbit.name}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.18 }}
                  aria-live="polite"
                >
                  <small>{activeOrbit.mode}</small>
                  <strong>{activeOrbit.name}</strong>
                  <span>{activeOrbit.signal}</span>
                </motion.div>
              </AnimatePresence>

              {orbitSkills.map((skill, index) => {
                const isActive = activeOrbitSkill === index;

                return (
                  <button
                    className={clsx("orbit-chip", isActive && "active")}
                    key={skill.name}
                    type="button"
                    aria-pressed={isActive}
                    onMouseEnter={() => handleOrbitSkillChange(index)}
                    onFocus={() => handleOrbitSkillChange(index)}
                    onClick={() => handleOrbitSkillChange(index, true)}
                    style={{ "--index": index, "--total": orbitSkills.length } as CSSProperties}
                  >
                    {skill.name}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                className="orbit-inspector"
                key={activeOrbit.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
              >
                <div className="orbit-inspector-header">
                  <span>{activeOrbit.mode}</span>
                  <strong>{activeOrbit.name}</strong>
                </div>
                <p>{activeOrbit.detail}</p>
                <div className="orbit-inspector-tags" aria-label={text.relatedSkills(activeOrbit.name)}>
                  {activeOrbit.related.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="skills-content">
            <div className="section-heading compact-heading">
              <span className="eyebrow">
                {text.skillsEyebrow}
              </span>
              <h2>{text.skillsTitle}</h2>
              <p>{text.skillsDescription}</p>
            </div>

            <div className="skill-tabs" aria-label={text.skillGroups}>
              {skillGroups.map((group, index) => (
                <button
                  className={clsx("skill-tab", activeSkillGroup === index && "active")}
                  type="button"
                  key={group.title}
                  onClick={() => setActiveSkillGroup(index)}
                >
                  {group.title}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                className="skill-detail"
                key={skillGroups[activeSkillGroup].title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.2 }}
              >
                <h3>{skillGroups[activeSkillGroup].title}</h3>
                <p>{skillGroups[activeSkillGroup].description}</p>
                <div className="stack-row">
                  {skillGroups[activeSkillGroup].skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section id="certificates" className="certificates-section">
        <div className="section-inner certificates-layout">
          <div className="certificates-header">
            <div className="section-heading wide-heading">
              <span className="eyebrow">
                <Award size={16} />
                {text.certificatesEyebrow}
              </span>
              {/* <h2>Verified learning signals with a polished document cockpit.</h2>
              <p>
                A curated certificate wall for banking, security, compliance, frontend work, and
                professional communication credentials.
              </p> */}
            </div>

            <div className="certificate-metrics-panel" aria-label={text.certificateSummary}>
              <div>
                <strong>{certificates.length}</strong>
                <span>{text.credentialSets}</span>
              </div>
              <div>
                <strong>{certificatePageCount}</strong>
                <span>{text.documentPages}</span>
              </div>
              <div>
                <strong>{bjbTwoSidedCertificateCount}</strong>
                <span>{text.bjbTwoSided}</span>
              </div>
            </div>
          </div>

          <div className="certificate-console">
            <motion.div
              className="certificate-viewer"
              style={{ "--certificate-accent": activeCertificate.accent } as CSSProperties}
              layout
            >
              <div className="certificate-viewer-header">
                <div>
                  <span>{activeCertificate.domain}</span>
                  <h3>{activeCertificate.title}</h3>
                  <p>{activeCertificate.issuer}</p>
                </div>
                <ShieldCheck size={28} />
              </div>

              <div className="certificate-stage">
                <AnimatePresence mode="wait">
                  <motion.div
                    className="certificate-stage-card-shell"
                    key={activeCertificate.id}
                    initial={{ opacity: 0, rotateX: -4, y: 18 }}
                    animate={{ opacity: 1, rotateX: 0, y: 0 }}
                    exit={{ opacity: 0, rotateX: 4, y: -18 }}
                    transition={{ duration: 0.24, ease: "easeOut" }}
                  >
                    <div
                      className={clsx(
                        "certificate-stage-card",
                        activeCertificateSideIndex === 1 && "flipped"
                      )}
                    >
                      <div className="certificate-face certificate-front">
                        <Image
                          src={activeCertificate.images[0].src}
                          alt={`${activeCertificate.title} ${text.certificateFront}`}
                          fill
                          sizes="(max-width: 1050px) calc(100vw - 56px), 760px"
                          className="certificate-image"
                        />
                      </div>
                      {activeCertificate.images[1] ? (
                        <div className="certificate-face certificate-back">
                          <Image
                            src={activeCertificate.images[1].src}
                            alt={`${activeCertificate.title} ${text.certificateBack}`}
                            fill
                            sizes="(max-width: 1050px) calc(100vw - 56px), 760px"
                            className="certificate-image"
                          />
                        </div>
                      ) : null}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <button
                  className="certificate-stage-action"
                  type="button"
                  onClick={() => setCertificateModalOpen(true)}
                  aria-label={text.openCertificatePreview(activeCertificate.title)}
                >
                  <Maximize2 size={17} />
                  <span>{text.inspect}</span>
                </button>
              </div>

              <div className="certificate-toolbar">
                <div className="certificate-side-strip" aria-label={text.certificatePages}>
                  {activeCertificate.images.map((image, index) => {
                    const isActiveSide = activeCertificateSideIndex === index;

                    return (
                      <button
                        className={clsx("certificate-side-button", isActiveSide && "active")}
                        type="button"
                        key={image.label}
                        onClick={() => setActiveCertificateSide(index)}
                        aria-pressed={isActiveSide}
                      >
                        <span>{image.label}</span>
                        <Image
                          src={image.src}
                          alt=""
                          fill
                          sizes="96px"
                          className="certificate-side-image"
                        />
                      </button>
                    );
                  })}
                </div>

                <div className="certificate-actions">
                  {hasMultipleCertificateSides ? (
                    <button
                      className="secondary-button certificate-flip-button"
                      type="button"
                      onClick={handleCertificateFlip}
                    >
                      <RotateCcw size={17} />
                      {activeCertificateSideIndex === 0 ? text.backSide : text.frontSide}
                    </button>
                  ) : (
                    <span className="certificate-single-badge">
                      <Eye size={16} />
                      {text.singlePage}
                    </span>
                  )}
                  <span className="certificate-credential">{activeCertificate.credential}</span>
                </div>
              </div>
            </motion.div>

            <div className="certificate-gallery-panel">
              <div className="certificate-gallery-header">
                <span>{text.credentialGrid}</span>
                <strong>
                  {certificateGalleryStart + 1}-{certificateGalleryEnd} / {certificates.length}
                </strong>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  className="certificate-gallery"
                  key={certificateGalleryPage}
                  aria-label={text.certificateGallery}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {visibleCertificates.map((certificate, index) => {
                    const isActive = certificate.id === activeCertificate.id;
                    const certificateNumber = certificateGalleryStart + index + 1;

                    return (
                      <button
                        className={clsx("certificate-card", isActive && "active")}
                        type="button"
                        key={certificate.id}
                        onClick={() => handleCertificateSelect(certificate.id)}
                        aria-pressed={isActive}
                        style={{ "--certificate-accent": certificate.accent } as CSSProperties}
                      >
                        <span className="certificate-card-number">
                          {String(certificateNumber).padStart(2, "0")}
                        </span>
                        <span className="certificate-card-thumb">
                          <Image
                            src={certificate.images[0].src}
                            alt=""
                            fill
                            sizes="128px"
                            className="certificate-card-image"
                          />
                          <span>{text.pagePlural(certificate.images.length)}</span>
                        </span>
                        <span className="certificate-card-copy">
                          <small>{certificate.domain}</small>
                          <strong>{certificate.title}</strong>
                          <em>{certificate.issuer}</em>
                          <span className="certificate-card-tags">
                            {certificate.tags.map((tag) => (
                              <span key={tag}>{tag}</span>
                            ))}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </motion.div>
              </AnimatePresence>

              <div className="certificate-pagination" aria-label={text.certificateGalleryPagination}>
                <button
                  className="certificate-pagination-arrow"
                  type="button"
                  onClick={() => handleCertificateGalleryPageChange(certificateGalleryPage - 1)}
                  disabled={certificateGalleryPage === 0}
                  aria-label={text.previousCertificatePage}
                >
                  <ChevronLeft size={18} />
                </button>

                <div className="certificate-pagination-pages">
                  {Array.from({ length: certificateGalleryPageCount }, (_, index) => {
                    const isActivePage = certificateGalleryPage === index;
                    const pageStart = index * certificatesPerGalleryPage + 1;
                    const pageEnd = Math.min(pageStart + certificatesPerGalleryPage - 1, certificates.length);

                    return (
                      <button
                        className={clsx("certificate-pagination-page", isActivePage && "active")}
                        type="button"
                        key={index}
                        onClick={() => handleCertificateGalleryPageChange(index)}
                        aria-label={text.showCertificates(pageStart, pageEnd)}
                        aria-current={isActivePage ? "page" : undefined}
                      >
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <small>{pageStart}-{pageEnd}</small>
                      </button>
                    );
                  })}
                </div>

                <button
                  className="certificate-pagination-arrow"
                  type="button"
                  onClick={() => handleCertificateGalleryPageChange(certificateGalleryPage + 1)}
                  disabled={certificateGalleryPage === certificateGalleryPageCount - 1}
                  aria-label={text.nextCertificatePage}
                >
                  <ChevronRight size={18} />
                </button>

                <div className="certificate-pagination-status" aria-live="polite">
                  <span>{text.page}</span>
                  <strong>{certificateGalleryPage + 1} / {certificateGalleryPageCount}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="education-section">
        <div className="section-inner education-grid">
          <div className="section-heading compact-heading">
            <span className="eyebrow">
              <Layers3 size={16} />
              {text.educationEyebrow}
            </span>
            <h2>{text.educationTitle}</h2>
          </div>

          <div className="education-list">
            {education.map((item) => (
              <article className="education-card" key={`${item.school}-${item.title}`}>
                <span>{item.period}</span>
                <h3>{item.title}</h3>
                <p>{item.school}</p>
              </article>
            ))}
            <article className="education-card">
              <span>{text.languages}</span>
              <h3>{text.communication}</h3>
              {languages.map((language) => (
                <p key={language}>{language}</p>
              ))}
            </article>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="section-inner contact-layout">
          <div className="section-heading">
            <span className="eyebrow">
              <MessageSquareText size={16} />
              {text.contactEyebrow}
            </span>
            <h2>{text.contactTitle}</h2>
            <p>{profile.availability}</p>
          </div>

          <div className="contact-actions">
            <a href={`mailto:${profile.email}`} className="contact-link">
              <Mail size={20} />
              <span>
                <small>Email</small>
                {profile.email}
              </span>
            </a>
            <a href={`tel:${profile.phone.replaceAll(" ", "")}`} className="contact-link">
              <Phone size={20} />
              <span>
                <small>{text.phone}</small>
                {profile.phone}
              </span>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="contact-link"
            >
              <ExternalLink size={20} />
              <span>
                <small>LinkedIn</small>
                {profile.linkedinLabel}
              </span>
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="section-inner footer-inner">
          <span>Afghany Yogaswara</span>
          <div>
            <a href="#home" aria-label={text.backToTop}>
              <ArrowUpRight size={18} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <ExternalLink size={18} />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {photoModalOpen ? (
          <motion.div
            className="photo-modal-backdrop"
            role="presentation"
            onClick={() => setPhotoModalOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <motion.div
              className="photo-modal"
              role="dialog"
              aria-modal="true"
              aria-label={text.profilePhotoPreview}
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, y: 26, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 26, scale: 0.96 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <button
                className="photo-modal-close icon-button"
                type="button"
                aria-label={text.closeProfilePhotoPreview}
                onClick={() => setPhotoModalOpen(false)}
              >
                <X size={20} />
              </button>

              <div
                className="photo-modal-image-frame protected-photo"
                onContextMenu={preventProtectedPhotoAction}
                onDragStart={preventProtectedPhotoAction}
              >
                <Image
                  src={brandPhoto}
                  alt={`${profile.name} ${text.professionalPortrait}`}
                  fill
                  draggable={false}
                  onContextMenu={preventProtectedPhotoAction}
                  onDragStart={preventProtectedPhotoAction}
                  sizes="(max-width: 720px) 88vw, 520px"
                  className="photo-modal-image"
                />
              </div>

              <div className="photo-modal-caption">
                <strong>{profile.name}</strong>
                <span>{profile.headline}</span>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {certificateModalOpen ? (
          <motion.div
            className="certificate-modal-backdrop"
            role="presentation"
            onClick={() => setCertificateModalOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <motion.div
              className="certificate-modal"
              role="dialog"
              aria-modal="true"
              aria-label={text.certificatePreview(activeCertificate.title)}
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              style={{ "--certificate-accent": activeCertificate.accent } as CSSProperties}
            >
              <button
                className="photo-modal-close icon-button"
                type="button"
                aria-label={text.closeCertificatePreview}
                onClick={() => setCertificateModalOpen(false)}
              >
                <X size={20} />
              </button>

              <div className="certificate-modal-header">
                <span>{activeCertificate.domain}</span>
                <strong>{activeCertificate.title}</strong>
                <p>{activeCertificate.issuer}</p>
              </div>

              <div className="certificate-modal-image-frame">
                <AnimatePresence mode="wait">
                  <motion.div
                    className="certificate-modal-image-layer"
                    key={`${activeCertificate.id}-${activeCertificateSideIndex}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Image
                      src={activeCertificateImage.src}
                      alt={text.certificatePageAlt(
                        activeCertificate.title,
                        activeCertificateImage.label
                      )}
                      fill
                      sizes="(max-width: 920px) 92vw, 1040px"
                      className="certificate-modal-image"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="certificate-modal-actions">
                <div className="certificate-side-strip" aria-label={text.certificatePreviewPages}>
                  {activeCertificate.images.map((image, index) => {
                    const isActiveSide = activeCertificateSideIndex === index;

                    return (
                      <button
                        className={clsx("certificate-side-button", isActiveSide && "active")}
                        type="button"
                        key={image.label}
                        onClick={() => setActiveCertificateSide(index)}
                        aria-pressed={isActiveSide}
                      >
                        <span>{image.label}</span>
                        <Image
                          src={image.src}
                          alt=""
                          fill
                          sizes="96px"
                          className="certificate-side-image"
                        />
                      </button>
                    );
                  })}
                </div>

                {hasMultipleCertificateSides ? (
                  <button
                    className="secondary-button certificate-flip-button"
                    type="button"
                    onClick={handleCertificateFlip}
                  >
                    <RotateCcw size={17} />
                    {activeCertificateSideIndex === 0 ? text.backSide : text.frontSide}
                  </button>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {showScrollTop ? (
          <motion.button
            className="scroll-top-button"
            type="button"
            aria-label={text.scrollBackToTop}
            onClick={handleScrollToTop}
            initial={{ opacity: 0, y: 18, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.92 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUp size={20} />
          </motion.button>
        ) : null}
      </AnimatePresence>

      <ConnectionIndicator language={language} />
    </main>
  );
}
