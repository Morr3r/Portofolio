export type Metric = {
  value: string;
  label: string;
  detail: string;
};

export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
  tags: string[];
};

export type Project = {
  id: string;
  title: string;
  period: string;
  category: "Mobile Banking" | "Payments" | "Account Opening" | "Communication";
  summary: string;
  role: string;
  responsibilities: string[];
  stack: string[];
  impact: string;
};

export type SkillGroup = {
  title: string;
  description: string;
  skills: string[];
};

export const profile = {
  name: "Afghany Yogaswara",
  headline: "Frontend and Mobile Developer",
  location: "Bandung, Indonesia",
  email: "afghany.yogaswaraa@gmail.com",
  phone: "+62 895-3658-71245",
  linkedin: "https://linkedin.com/in/afghany-yogaswara",
  linkedinLabel: "linkedin.com/in/afghany-yogaswara",
  summary:
    "Software Engineering with five years of diverse work experience and a strong focus on frontend and mobile interfaces. Currently building banking features for DIGI bank bjb with Flutter, Dart, API integration, real-time flows, and production release discipline.",
  availability:
    "Open to frontend, mobile, and UI implementation roles that need product-minded execution."
};

export const metrics: Metric[] = [
  {
    value: "5+",
    label: "Years of work experience",
    detail: "Cross-functional experience from software, hospitality, language, and retail roles."
  },
  {
    value: "8",
    label: "Banking product features",
    detail: "DIGI bank bjb work across QRIS, E-Samsat, BI-RTGS, savings, and onboarding flows."
  },
  {
    value: "10+",
    label: "Frontend tools",
    detail: "Flutter, Dart, React Native, Next.js, React.js, JavaScript, HTML, CSS, Tailwind, and Figma."
  },
  {
    value: "2",
    label: "Professional languages",
    detail: "Native Indonesian and full professional English proficiency."
  }
];

export const experiences: Experience[] = [
  {
    role: "Mobile Developer",
    company: "Bank BJB",
    location: "Bandung",
    period: "Nov 2024 - Present",
    summary:
      "Building and maintaining mobile banking features for one of Indonesia's largest Regional Development Banks.",
    highlights: [
      "Developed responsive mobile application flows using Flutter and Dart.",
      "Translated UI/UX designs into clean, functional, and maintainable application code.",
      "Integrated RESTful APIs, WebSocket connections, and real-time data synchronization.",
      "Implemented scalable state management with GetX.",
      "Supported SIT, UAT, and production deployment phases."
    ],
    tags: ["Flutter", "Dart", "GetX", "REST API", "WebSocket", "SIT/UAT/PROD"]
  },
  {
    role: "Frontend Developer",
    company: "PT Sarana Insan Muda Selaras (Jabar Maya)",
    location: "Bandung",
    period: "Jul 2019 - Sep 2019",
    summary:
      "Designed and implemented web interfaces for a broadband internet service provider.",
    highlights: [
      "Designed website layouts, color systems, typography, and visual graphics.",
      "Improved navigation and usability across key pages.",
      "Ensured responsive presentation across desktop, tablet, and smartphone views.",
      "Tested usability issues and resolved interface problems."
    ],
    tags: ["Frontend", "Responsive UI", "HTML", "CSS", "Usability"]
  },
  {
    role: "English Translator and Public Relations Administration",
    company: "Pusat Bahasa dan Multibudaya Universitas Airlangga",
    location: "Surabaya",
    period: "Aug 2023 - Dec 2023",
    summary:
      "Translated and proofread English communication materials with professional tone, accuracy, and audience awareness.",
    highlights: [
      "Edited translations for fluency, grammar, and accuracy.",
      "Researched terminology to preserve domain-specific meaning.",
      "Communicated with clients to align expectations and writing style."
    ],
    tags: ["English", "Proofreading", "Research", "Client Communication"]
  },
  {
    role: "Server and Operations Roles",
    company: "Karnivor, Hachiya, Makopi, AR Komunika",
    location: "Bandung",
    period: "Feb 2020 - Sep 2024",
    summary:
      "Built service discipline, inventory awareness, customer communication, and pressure-tested operational habits.",
    highlights: [
      "Handled customer-facing service with accuracy and professionalism.",
      "Coordinated with kitchen, cashier, and management teams during active operations.",
      "Maintained stock awareness, product recommendations, and repair service intake."
    ],
    tags: ["Customer Service", "Operations", "Communication", "Pressure Handling"]
  }
];

export const projects: Project[] = [
  {
    id: "referral-branch",
    title: "Referral Code and Branch Code for Tandamata Rencana",
    period: "Apr 2026 - May 2026",
    category: "Account Opening",
    summary:
      "Added referral tracking and branch-based account opening support to the Tandamata Rencana flow in DIGI bank bjb.",
    role: "Frontend Mobile Developer",
    responsibilities: [
      "Developed the frontend flow for Referral Code and Branch Code fields.",
      "Added optional input fields into the Tandamata Rencana account opening form.",
      "Connected referral input behavior to the digital onboarding flow.",
      "Adjusted the UI so the process stayed clear and consistent for customers."
    ],
    stack: ["Flutter", "Dart", "GetX", "REST API", "Banking UI"],
    impact: "Improved referral tracking and branch-oriented account opening without adding friction."
  },
  {
    id: "esamsat-code",
    title: "Generate Payment Code for West Java Vehicle Tax",
    period: "Jan 2026 - Mar 2026",
    category: "Payments",
    summary:
      "Built an E-Samsat webview and native mobile payment code flow for easier vehicle tax payments.",
    role: "Frontend Mobile Developer",
    responsibilities: [
      "Developed Generate Kode Bayar E-Samsat flow in DIGI bank bjb.",
      "Built native mobile UI/UX and supported the web frontend side.",
      "Implemented input pages for vehicle data, NIK, and chassis number.",
      "Created inquiry, payment summary, success, countdown, copy code, and Pay Now redirect states.",
      "Handled five-year expired tax, DIGI Inbox, and bjb Paylater identification states."
    ],
    stack: ["Flutter", "Dart", "WebView", "REST API", "Payment Flow"],
    impact: "Reduced payment journey complexity for digital West Java vehicle tax transactions."
  },
  {
    id: "bi-rtgs",
    title: "Transfer BI-RTGS Enhancement",
    period: "Nov 2025 - Dec 2025",
    category: "Mobile Banking",
    summary:
      "Implemented a secure high-value interbank transfer experience for eligible bjb Prioritas customers.",
    role: "Frontend Mobile Developer",
    responsibilities: [
      "Developed a new Transfer via RTGS menu inside the DIGI bank bjb app.",
      "Configured access rules for eligible bjb Prioritas customers.",
      "Implemented validation for customer status, source account, limits, operational hours, and fees.",
      "Built confirmation, PIN validation, success, receipt sharing, and receipt saving flows."
    ],
    stack: ["Flutter", "Dart", "GetX", "Validation", "Secure Flow"],
    impact: "Delivered a controlled high-value transfer flow with clear eligibility and transaction states."
  },
  {
    id: "tandamata-rencana",
    title: "Tandamata Rencana Promotional Enhancement",
    period: "Sep 2025 - Oct 2025",
    category: "Account Opening",
    summary:
      "Enhanced promotional program handling and account status behavior inside the Tandamata Rencana feature.",
    role: "Frontend Mobile Developer",
    responsibilities: [
      "Aligned the promotional interface with UI/UX best practices.",
      "Implemented Program dropdown options for Qurban ASN and Non Program.",
      "Controlled Close Rencanaku and Postpone My Goals behavior for active program participants.",
      "Adjusted account status logic for postponed accounts."
    ],
    stack: ["Flutter", "Dart", "GetX", "UI Logic", "Form UX"],
    impact: "Made product rules easier to understand while preserving operational constraints."
  },
  {
    id: "other-savings",
    title: "Webview Other Savings Info",
    period: "Jun 2025 - Jul 2025",
    category: "Mobile Banking",
    summary:
      "Improved access to multiple savings accounts through a dynamic webview and floating entry point.",
    role: "Frontend Mobile Developer",
    responsibilities: [
      "Developed a floating Other Savings button inside the Financial Management section.",
      "Integrated a dynamic WebView for categorized savings information.",
      "Displayed total balance, blocked amount, and withdrawable balance.",
      "Built tabbed mini statement and transaction history actions.",
      "Kept the entry point visible during scroll to improve discoverability."
    ],
    stack: ["Flutter", "Dart", "WebView", "Tabbed UI", "Responsive UX"],
    impact: "Improved navigation and visibility for customers managing multiple savings products."
  },
  {
    id: "t-samsat",
    title: "T-Samsat Registration Enhancement",
    period: "Mar 2025 - May 2025",
    category: "Payments",
    summary:
      "Enhanced T-Samsat registration with flexible registration types and stronger data handling.",
    role: "Frontend Mobile Developer",
    responsibilities: [
      "Added One-Time and Periodic registration options.",
      "Implemented dynamic Block Period Type fields for Daily, Weekly, and Monthly choices.",
      "Improved license plate input validation with automatic uppercase formatting.",
      "Added a receipt summary table with key registration details and total transaction amount."
    ],
    stack: ["Flutter", "Dart", "Dynamic Forms", "Validation", "Receipt UI"],
    impact: "Made registration more flexible while improving validation consistency."
  },
  {
    id: "qris-indomaret",
    title: "QRIS Indomaret Payment",
    period: "Dec 2024 - Mar 2025",
    category: "Payments",
    summary:
      "Designed and built QRIS Indomaret payment flows for seamless QR code transactions in DIGI bank bjb.",
    role: "Frontend Mobile Developer",
    responsibilities: [
      "Designed the UI/UX from scratch in Figma.",
      "Implemented responsive and modular frontend code in Flutter.",
      "Handled QR generation, scanning, and real-time transaction status updates.",
      "Integrated secure request-response flows with internal REST APIs.",
      "Collaborated with backend and QA teams through UAT, staging, and production release."
    ],
    stack: ["Figma", "Flutter", "Dart", "REST API", "QRIS", "Real-time Status"],
    impact: "Delivered an end-to-end merchant payment feature aligned with QRIS and internal banking standards."
  },
  {
    id: "marketing-email",
    title: "IELTS and NAT-Test Marketing Email Documentation",
    period: "Nov 2023 - Dec 2023",
    category: "Communication",
    summary:
      "Created English documentation for institutional marketing email templates with clear, persuasive, and culturally appropriate language.",
    role: "English Documentation Contributor",
    responsibilities: [
      "Applied formal correspondence and rhetoric techniques.",
      "Used equivalence and adaptation to preserve intent and promotional value.",
      "Adjusted register, tone, and word choice for institutional stakeholders."
    ],
    stack: ["English Writing", "Localization", "Documentation", "Audience Strategy"],
    impact: "Improved clarity and professionalism for multilingual marketing communication."
  }
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend Engineering",
    description:
      "Interfaces that are responsive, maintainable, and easy to reason about from design to release.",
    skills: ["Next.js", "React.js", "React Native", "JavaScript", "HTML", "CSS", "Tailwind"]
  },
  {
    title: "Mobile Product",
    description:
      "Banking-grade mobile flows with structured state, validation, and real-time transaction awareness.",
    skills: ["Flutter", "Dart", "GetX", "WebView", "REST API", "WebSocket"]
  },
  {
    title: "Design Systems",
    description:
      "Strong UI judgment for layout, visual hierarchy, interaction states, and handoff quality.",
    skills: ["Figma", "UI/UX", "Responsive Design", "Prototyping", "Usability Testing"]
  },
  {
    title: "Delivery Tools",
    description:
      "Comfortable working with development pipelines, collaboration tooling, and production release phases.",
    skills: ["GitHub", "Jenkins", "Navicat", "SIT", "UAT", "Production Release"]
  },
  {
    title: "Creative Stack",
    description:
      "Visual and audio tooling that supports fast ideation, content production, and polished presentation.",
    skills: ["Canva", "Adobe Photoshop", "Adobe Premiere", "FL Studio", "Corel Draw"]
  }
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

export type LocaleCode = "id" | "en";

export type PortfolioContent = {
  profile: typeof profile;
  metrics: Metric[];
  experiences: Experience[];
  projects: Project[];
  skillGroups: SkillGroup[];
  education: typeof education;
  languages: string[];
};

export const portfolioContent: Record<LocaleCode, PortfolioContent> = {
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
    profile: {
      name: "Afghany Yogaswara",
      headline: "Pengembang Frontend dan Mobile",
      location: "Bandung, Indonesia",
      email: "afghany.yogaswaraa@gmail.com",
      phone: "+62 895-3658-71245",
      linkedin: "https://linkedin.com/in/afghany-yogaswara",
      linkedinLabel: "linkedin.com/in/afghany-yogaswara",
      summary:
        "Lulusan Rekayasa Perangkat Lunak dengan pengalaman kerja lintas bidang selama lima tahun dan fokus kuat pada antarmuka frontend serta mobile. Saat ini mengembangkan fitur perbankan untuk DIGI bank bjb menggunakan Flutter, Dart, integrasi API, alur real-time, dan disiplin rilis produksi.",
      availability:
        "Terbuka untuk peran frontend, mobile, dan implementasi UI yang membutuhkan eksekusi berorientasi produk."
    },
    metrics: [
      {
        value: "5+",
        label: "Tahun pengalaman kerja",
        detail:
          "Pengalaman lintas fungsi dari bidang perangkat lunak, hospitality, bahasa, dan retail."
      },
      {
        value: "8",
        label: "Fitur produk perbankan",
        detail:
          "Pengembangan DIGI bank bjb untuk QRIS, E-Samsat, BI-RTGS, tabungan, dan alur pembukaan rekening."
      },
      {
        value: "10+",
        label: "Tools frontend",
        detail:
          "Flutter, Dart, React Native, Next.js, React.js, JavaScript, HTML, CSS, Tailwind, dan Figma."
      },
      {
        value: "2",
        label: "Bahasa profesional",
        detail: "Bahasa Indonesia sebagai penutur asli dan Bahasa Inggris tingkat profesional penuh."
      }
    ],
    experiences: [
      {
        role: "Pengembang Mobile",
        company: "Bank BJB",
        location: "Bandung",
        period: "Nov 2024 - Sekarang",
        summary:
          "Membangun dan memelihara fitur mobile banking untuk salah satu Bank Pembangunan Daerah terbesar di Indonesia.",
        highlights: [
          "Mengembangkan alur aplikasi mobile yang responsif menggunakan Flutter dan Dart.",
          "Menerjemahkan desain UI/UX menjadi kode aplikasi yang bersih, fungsional, dan mudah dipelihara.",
          "Mengintegrasikan RESTful API, koneksi WebSocket, dan sinkronisasi data real-time.",
          "Menerapkan manajemen state yang skalabel dengan GetX.",
          "Mendukung fase SIT, UAT, dan deployment produksi."
        ],
        tags: ["Flutter", "Dart", "GetX", "REST API", "WebSocket", "SIT/UAT/PROD"]
      },
      {
        role: "Frontend Developer",
        company: "PT Sarana Insan Muda Selaras (Jabar Maya)",
        location: "Bandung",
        period: "Jul 2019 - Sep 2019",
        summary:
          "Merancang dan mengimplementasikan antarmuka web untuk penyedia layanan internet broadband.",
        highlights: [
          "Merancang layout website, sistem warna, tipografi, dan grafis visual.",
          "Meningkatkan navigasi dan usability pada halaman utama.",
          "Memastikan tampilan responsif di desktop, tablet, dan smartphone.",
          "Menguji masalah usability dan menyelesaikan kendala antarmuka."
        ],
        tags: ["Frontend", "Responsive UI", "HTML", "CSS", "Usability"]
      },
      {
        role: "Penerjemah Bahasa Inggris dan Administrasi Humas",
        company: "Pusat Bahasa dan Multibudaya Universitas Airlangga",
        location: "Surabaya",
        period: "Agu 2023 - Des 2023",
        summary:
          "Menerjemahkan dan menyunting materi komunikasi berbahasa Inggris dengan nada profesional, akurasi, dan pemahaman audiens.",
        highlights: [
          "Menyunting terjemahan agar lebih lancar, tepat secara tata bahasa, dan akurat.",
          "Melakukan riset terminologi untuk menjaga makna khusus sesuai bidangnya.",
          "Berkomunikasi dengan klien untuk menyelaraskan ekspektasi dan gaya penulisan."
        ],
        tags: ["Bahasa Inggris", "Proofreading", "Riset", "Komunikasi Klien"]
      },
      {
        role: "Staf Layanan dan Operasional",
        company: "Karnivor, Hachiya, Makopi, AR Komunika",
        location: "Bandung",
        period: "Feb 2020 - Sep 2024",
        summary:
          "Membangun disiplin layanan, kesadaran inventaris, komunikasi pelanggan, dan kebiasaan operasional yang teruji dalam tekanan.",
        highlights: [
          "Menangani layanan pelanggan secara akurat dan profesional.",
          "Berkoordinasi dengan tim dapur, kasir, dan manajemen saat operasional berlangsung.",
          "Menjaga kesadaran stok, rekomendasi produk, dan proses penerimaan layanan perbaikan."
        ],
        tags: ["Layanan Pelanggan", "Operasional", "Komunikasi", "Kerja di Bawah Tekanan"]
      }
    ],
    projects: [
      {
        id: "referral-branch",
        title: "Kode Referral dan Kode Cabang untuk Tandamata Rencana",
        period: "Apr 2026 - Mei 2026",
        category: "Account Opening",
        summary:
          "Menambahkan pelacakan referral dan dukungan pembukaan rekening berbasis cabang pada alur Tandamata Rencana di DIGI bank bjb.",
        role: "Frontend Developer Mobile",
        responsibilities: [
          "Mengembangkan alur frontend untuk field Kode Referral dan Kode Cabang.",
          "Menambahkan field input opsional ke formulir pembukaan rekening Tandamata Rencana.",
          "Menghubungkan perilaku input referral dengan alur digital onboarding.",
          "Menyesuaikan UI agar proses tetap jelas dan konsisten bagi nasabah."
        ],
        stack: ["Flutter", "Dart", "GetX", "REST API", "Banking UI"],
        impact:
          "Meningkatkan pelacakan referral dan pembukaan rekening berbasis cabang tanpa menambah friksi."
      },
      {
        id: "esamsat-code",
        title: "Pembuatan Kode Bayar Pajak Kendaraan Jawa Barat",
        period: "Jan 2026 - Mar 2026",
        category: "Payments",
        summary:
          "Membangun webview E-Samsat dan alur kode bayar native mobile untuk memudahkan pembayaran pajak kendaraan.",
        role: "Frontend Developer Mobile",
        responsibilities: [
          "Mengembangkan alur Generate Kode Bayar E-Samsat di DIGI bank bjb.",
          "Membangun UI/UX native mobile dan mendukung sisi frontend web.",
          "Mengimplementasikan halaman input untuk data kendaraan, NIK, dan nomor rangka.",
          "Membuat state inquiry, ringkasan pembayaran, sukses, hitung mundur, salin kode, dan redirect Pay Now.",
          "Menangani state pajak kedaluwarsa lima tahun, DIGI Inbox, dan identifikasi bjb Paylater."
        ],
        stack: ["Flutter", "Dart", "WebView", "REST API", "Payment Flow"],
        impact:
          "Mengurangi kompleksitas perjalanan pembayaran untuk transaksi pajak kendaraan Jawa Barat secara digital."
      },
      {
        id: "bi-rtgs",
        title: "Peningkatan Transfer BI-RTGS",
        period: "Nov 2025 - Des 2025",
        category: "Mobile Banking",
        summary:
          "Mengimplementasikan pengalaman transfer antarbank bernilai besar yang aman untuk nasabah bjb Prioritas yang memenuhi syarat.",
        role: "Frontend Developer Mobile",
        responsibilities: [
          "Mengembangkan menu baru Transfer via RTGS di dalam aplikasi DIGI bank bjb.",
          "Mengatur aturan akses untuk nasabah bjb Prioritas yang memenuhi syarat.",
          "Mengimplementasikan validasi status nasabah, rekening sumber, limit, jam operasional, dan biaya.",
          "Membangun alur konfirmasi, validasi PIN, sukses, berbagi resi, dan simpan resi."
        ],
        stack: ["Flutter", "Dart", "GetX", "Validation", "Secure Flow"],
        impact:
          "Menghadirkan alur transfer bernilai besar yang terkendali dengan status kelayakan dan transaksi yang jelas."
      },
      {
        id: "tandamata-rencana",
        title: "Peningkatan Promosi Tandamata Rencana",
        period: "Sep 2025 - Okt 2025",
        category: "Account Opening",
        summary:
          "Meningkatkan penanganan program promosi dan perilaku status rekening di dalam fitur Tandamata Rencana.",
        role: "Frontend Developer Mobile",
        responsibilities: [
          "Menyelaraskan antarmuka promosi dengan praktik terbaik UI/UX.",
          "Mengimplementasikan opsi dropdown Program untuk Qurban ASN dan Non Program.",
          "Mengendalikan perilaku Close Rencanaku dan Postpone My Goals untuk peserta program aktif.",
          "Menyesuaikan logika status rekening untuk rekening yang ditunda."
        ],
        stack: ["Flutter", "Dart", "GetX", "UI Logic", "Form UX"],
        impact:
          "Membuat aturan produk lebih mudah dipahami sambil tetap menjaga batasan operasional."
      },
      {
        id: "other-savings",
        title: "Webview Informasi Tabungan Lainnya",
        period: "Jun 2025 - Jul 2025",
        category: "Mobile Banking",
        summary:
          "Meningkatkan akses ke beberapa rekening tabungan melalui webview dinamis dan entry point mengambang.",
        role: "Frontend Developer Mobile",
        responsibilities: [
          "Mengembangkan tombol mengambang Other Savings di dalam bagian Financial Management.",
          "Mengintegrasikan WebView dinamis untuk informasi tabungan berkategori.",
          "Menampilkan total saldo, nominal terblokir, dan saldo yang dapat ditarik.",
          "Membangun aksi tab mini statement dan riwayat transaksi.",
          "Menjaga entry point tetap terlihat saat scroll untuk meningkatkan discoverability."
        ],
        stack: ["Flutter", "Dart", "WebView", "Tabbed UI", "Responsive UX"],
        impact:
          "Meningkatkan navigasi dan visibilitas bagi nasabah yang mengelola beberapa produk tabungan."
      },
      {
        id: "t-samsat",
        title: "Peningkatan Registrasi T-Samsat",
        period: "Mar 2025 - Mei 2025",
        category: "Payments",
        summary:
          "Meningkatkan registrasi T-Samsat dengan tipe registrasi yang fleksibel dan penanganan data yang lebih kuat.",
        role: "Frontend Developer Mobile",
        responsibilities: [
          "Menambahkan opsi registrasi One-Time dan Periodic.",
          "Mengimplementasikan field Block Period Type dinamis untuk pilihan Daily, Weekly, dan Monthly.",
          "Meningkatkan validasi input pelat nomor dengan format huruf besar otomatis.",
          "Menambahkan tabel ringkasan resi dengan detail registrasi utama dan total nominal transaksi."
        ],
        stack: ["Flutter", "Dart", "Dynamic Forms", "Validation", "Receipt UI"],
        impact:
          "Membuat registrasi lebih fleksibel sekaligus meningkatkan konsistensi validasi."
      },
      {
        id: "qris-indomaret",
        title: "Pembayaran QRIS Indomaret",
        period: "Des 2024 - Mar 2025",
        category: "Payments",
        summary:
          "Merancang dan membangun alur pembayaran QRIS Indomaret untuk transaksi QR code yang mulus di DIGI bank bjb.",
        role: "Frontend Developer Mobile",
        responsibilities: [
          "Merancang UI/UX dari awal di Figma.",
          "Mengimplementasikan kode frontend yang responsif dan modular di Flutter.",
          "Menangani pembuatan QR, pemindaian, dan pembaruan status transaksi secara real-time.",
          "Mengintegrasikan alur request-response yang aman dengan REST API internal.",
          "Berkolaborasi dengan tim backend dan QA melalui UAT, staging, dan rilis produksi."
        ],
        stack: ["Figma", "Flutter", "Dart", "REST API", "QRIS", "Real-time Status"],
        impact:
          "Menghadirkan fitur pembayaran merchant end-to-end yang selaras dengan QRIS dan standar perbankan internal."
      },
      {
        id: "marketing-email",
        title: "Dokumentasi Email Marketing IELTS dan NAT-Test",
        period: "Nov 2023 - Des 2023",
        category: "Communication",
        summary:
          "Membuat dokumentasi Bahasa Inggris untuk template email marketing institusional dengan bahasa yang jelas, persuasif, dan sesuai budaya.",
        role: "Kontributor Dokumentasi Bahasa Inggris",
        responsibilities: [
          "Menerapkan teknik korespondensi formal dan retorika.",
          "Menggunakan ekuivalensi dan adaptasi untuk menjaga maksud serta nilai promosi.",
          "Menyesuaikan register, nada, dan pilihan kata untuk pemangku kepentingan institusional."
        ],
        stack: ["English Writing", "Localization", "Documentation", "Audience Strategy"],
        impact:
          "Meningkatkan kejelasan dan profesionalisme komunikasi marketing multibahasa."
      }
    ],
    skillGroups: [
      {
        title: "Rekayasa Frontend",
        description:
          "Antarmuka yang responsif, mudah dipelihara, dan mudah dipahami sejak desain hingga rilis.",
        skills: ["Next.js", "React.js", "React Native", "JavaScript", "HTML", "CSS", "Tailwind"]
      },
      {
        title: "Produk Mobile",
        description:
          "Alur mobile berstandar perbankan dengan state terstruktur, validasi, dan kesadaran transaksi real-time.",
        skills: ["Flutter", "Dart", "GetX", "WebView", "REST API", "WebSocket"]
      },
      {
        title: "Sistem Desain",
        description:
          "Penilaian UI yang kuat untuk layout, hierarki visual, state interaksi, dan kualitas handoff.",
        skills: ["Figma", "UI/UX", "Responsive Design", "Prototyping", "Usability Testing"]
      },
      {
        title: "Tools Delivery",
        description:
          "Terbiasa bekerja dengan pipeline pengembangan, tools kolaborasi, dan fase rilis produksi.",
        skills: ["GitHub", "Jenkins", "Navicat", "SIT", "UAT", "Production Release"]
      },
      {
        title: "Creative Stack",
        description:
          "Tools visual dan audio yang mendukung ideasi cepat, produksi konten, dan presentasi yang rapi.",
        skills: ["Canva", "Adobe Photoshop", "Adobe Premiere", "FL Studio", "Corel Draw"]
      }
    ],
    education: [
      {
        title: "Sastra Inggris",
        school: "Universitas Terbuka",
        period: "Sep 2023 - Sekarang"
      },
      {
        title: "Rekayasa Perangkat Lunak",
        school: "SMKN 13 Bandung",
        period: "Sep 2017 - Mei 2020"
      }
    ],
    languages: [
      "Bahasa Indonesia - Penutur asli",
      "Bahasa Inggris - Kemampuan profesional penuh"
    ]
  }
};
