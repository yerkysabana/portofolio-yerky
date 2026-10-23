import { Project, Experience, MetricCard, ProfileInfo } from '../types';

export const profileData: ProfileInfo = {
  name: 'Yerky Syabana',
  title: 'Frontend Developer & Informatics Engineer',
  experienceYears: '1+',
  projectsCompleted: '6+',
  availability: 'Tersedia untuk Peluang & Proyek',
  location: 'Salatiga, Jawa Tengah (WIB)',
  email: 'yerkysabana1994@gmail.com',
  bio: 'Mahasiswa S1 Teknik Informatika UKSW yang berfokus pada Frontend Engineering & antarmuka responsif. Berpengalaman membangun UI modern dengan React, Next.js, dan arsitektur mobile terintegrasi REST API dengan performa tinggi.',
  secondaryBio: 'Berpengalaman menangani implementasi frontend proyek riil mulai dari platform enterprise Trafix, ekosistem absensi digital YukAbsen, hingga portal Mobile Parking. Terbiasa memadukan antarmuka yang bersih dengan keandalan integrasi backend secara sistematis.',
};

export const projectsData: Project[] = [
  {
    id: 'fe-trafix',
    title: 'Trafix — Sistem Monitoring & Operasional Enterprise',
    category: 'web',
    categoryLabel: 'Enterprise Monorepo',
    badge: 'Turborepo Multi-App',
    summary: 'Monorepo antarmuka web enterprise untuk manajemen operasional, monitoring trafik, portal admin/teknisi, keuangan, hingga tampilan digital signage.',
    description: 'Arsitektur frontend modular berbasis Turborepo yang mencakup 4 sub-aplikasi mandiri: Admin Teknisi, Finance, Operator, dan Signage. Dioptimasi untuk pengelolaan tiket perbaikan perangkat, pelacakan status operasional real-time, dan pelaporan keuangan terpadu.',
    tags: ['Turborepo', 'React', 'TypeScript', 'Tailwind CSS', 'REST API'],
    metrics: [
      { label: 'Sub-aplikasi', value: '4 Portal (Admin, Finance, Operator, Signage)' },
      { label: 'Arsitektur', value: 'Turborepo Monorepo' },
      { label: 'Integrasi', value: 'REST API & Real-time' },
    ],
    features: [
      'Slicing UI kompleks untuk portal admin teknisi dan operator',
      'Monitoring status perangkat operasional dan tiket keluhan secara real-time',
      'Dashboard laporan analitik dan audit transaksi finance',
      'Display digital signage terpisah untuk kebutuhan informasi publik',
    ],
    colSpan: 2,
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 'yukabsen',
    title: 'YukAbsen — Platform Absensi Digital & Geofencing',
    category: 'mobile',
    categoryLabel: 'Mobile App & Web Admin',
    badge: 'Expo + Next.js 16',
    summary: 'Ekosistem absensi digital mobile berbasis Expo/React Native dengan geolokasi/peta dan dashboard monitoring admin Next.js 16.',
    description: 'Membangun aplikasi mobile absensi karyawan menggunakan Expo (React Native), NativeWind, TanStack Query, dan React Native Maps untuk validasi radius kehadiran (geofencing). Dilengkapi dashboard web admin interaktif Next.js 16, Leaflet, dan visualisasi Recharts.',
    tags: ['React Native', 'Expo', 'Next.js 16', 'TanStack Query', 'Leaflet'],
    metrics: [
      { label: 'Platform', value: 'Android & Web Admin' },
      { label: 'Geofencing', value: 'Radius GPS Presisi' },
      { label: 'State Management', value: 'Zustand & React Query' },
    ],
    features: [
      'Presensi berbasis radius lokasi (GPS/Maps) & verifikasi foto selfie',
      'Dashboard web admin dengan visualisasi pemetaan interaktif Leaflet',
      'Manajemen jadwal kerja, shift karyawan, dan riwayat absensi',
      'Pengambilan data responsif dengan caching TanStack Query',
    ],
    colSpan: 1,
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 'mobile-parking',
    title: 'MobileParking — Sistem Parkir Cerdas & Otomasi',
    category: 'web',
    categoryLabel: 'Smart Mobility System',
    badge: 'Next.js 16 + Flutter',
    summary: 'Portal monitoring parkir cerdas berbasis Next.js 16 dan aplikasi mobile Flutter untuk tracking slot ketersediaan dan transaksi parkir.',
    description: 'Mengembangkan website monitoring ketersediaan area parkir dan transaksi secara real-time menggunakan Next.js dan Tailwind CSS, terhubung dengan integrasi REST API backend serta aplikasi pendukung mobile.',
    tags: ['Next.js 16', 'React 19', 'Tailwind CSS', 'Recharts', 'Flutter'],
    metrics: [
      { label: 'Monitoring Slot', value: 'Real-time Status' },
      { label: 'Tampilan', value: 'Responsif Mobile & Web' },
      { label: 'Visualisasi', value: 'Recharts Analitik' },
    ],
    features: [
      'Pemantauan status kuota dan ketersediaan lot parkir secara live',
      'Visualisasi grafik statistik pendapatan & volume kendaraan harian',
      'Integrasi REST API untuk pencatatan tiket dan durasi parkir',
      'Antarmuka ramah pengguna bagi operator lapangan dan pengendara',
    ],
    colSpan: 1,
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 'academic-projects',
    title: 'Concert Ticket Booking & CV Color Detection',
    category: 'web',
    categoryLabel: 'Fullstack & Computer Vision',
    badge: 'Web & Python AI',
    summary: 'Sistem reservasi tiket konser interaktif berbasis PHP/MySQL serta deteksi objek warna real-time via webcam dengan Python OpenCV.',
    description: 'Proyek pengembangan sistem pemesanan tiket konser lengkap dengan otentikasi akun, manajemen kuota tiket, dan operasi CRUD menggunakan PHP dan MySQL, didukung riset terapan pengolahan citra digital untuk deteksi warna berbasis HSV menggunakan Python dan OpenCV.',
    tags: ['PHP', 'MySQL', 'Python', 'OpenCV', 'JavaScript'],
    metrics: [
      { label: 'Teknologi', value: 'Fullstack Web + AI' },
      { label: 'Otentikasi', value: 'Role-based Access' },
      { label: 'Computer Vision', value: 'Real-time HSV Filter' },
    ],
    features: [
      'Alur pemesanan tiket konser interaktif dengan pemilihan kategori tiket',
      'Manajemen basis data relasional MySQL terstruktur',
      'Deteksi warna dinamis melalui umpan kamera webcam (OpenCV)',
      'Penerapan logika matematika filter ruang warna HSV pada frame video',
    ],
    colSpan: 2,
    liveUrl: '#',
    repoUrl: '#',
  },
];

export const experiencesData: Experience[] = [
  {
    period: 'AGUSTUS 2026 — SEKARANG',
    location: 'Indonesia (Hybrid)',
    role: 'Frontend Developer Intern',
    company: 'PT Kreasi X',
    description: 'Membangun antarmuka web dan mobile untuk ekosistem absensi digital (YukAbsen), website sistem parkir otomatis (Mobile Parking), dan platform monitoring enterprise. Bertanggung jawab atas slicing UI berstandar tinggi, integrasi REST API ke backend, serta optimasi performa antarmuka.',
  },
  {
    period: 'AGUSTUS 2023 — SEKARANG',
    location: 'Salatiga, Jawa Tengah',
    role: 'S1 Informatics Engineering (IPK 3.52)',
    company: 'Universitas Kristen Satya Wacana (UKSW)',
    description: 'Mendalami Rekayasa Perangkat Lunak, Struktur Data & Algoritma, Pemrograman Web, Basis Data Relasional, serta Komputer Grafis & Vision. Aktif mengasah keterampilan problem-solving sistematis dalam proyek mandiri dan kolaborasi tim.',
  },
];

export const metricsData: MetricCard[] = [
  {
    label: 'Akademik',
    value: '3.52',
    sublabel: 'IPK Teknik Informatika UKSW',
    description: 'Komitmen kuat pada pemahaman konsep rekayasa perangkat lunak dan keunggulan akademis.',
  },
  {
    label: 'Pengalaman Riil',
    value: 'Intern',
    sublabel: 'Frontend Dev di PT Kreasi X',
    description: 'Terbiasa berkontribusi pada codebase proyek komersial dan kolaborasi tim pengembangan.',
    highlight: true,
  },
  {
    label: 'Proyek Portofolio',
    value: '6+',
    sublabel: 'Web & Mobile Aplikasi',
    description: 'Dari platform monorepo enterprise, absensi geofencing, hingga website smart parking.',
  },
  {
    label: 'Fokus Inti',
    value: 'Clean & Fast',
    sublabel: 'UI Slicing & API Integration',
    description: 'Mengutamakan antarmuka yang responsif, rapi, cepat dimuat, dan mudah dirawat.',
  },
];

export const tickerSkills: string[] = [
  'REACT JS & NEXT.JS',
  'TYPESCRIPT & JAVASCRIPT',
  'TAILWIND CSS',
  'REST API INTEGRATION',
  'REACT NATIVE & EXPO',
  'TURBOREPO & MONOREPO',
  'PHP & MYSQL',
  'PYTHON & OPENCV',
  'RESPONSIVE WEB & MOBILE SLICING',
];
