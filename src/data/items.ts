export interface WeightItem {
  id: string;
  name: string;
  weight: number; // in grams
  color: string;
  category: string;
  description: string;
  iconType: 'buku' | 'botol' | 'penghapus' | 'kotakPensil' | 'apel' | 'rautan' | 'semangka';
}

export interface LengthItem {
  id: string;
  name: string;
  defaultLengthCm: number;
  minCm: number;
  maxCm: number;
  color: string;
  category: string;
  iconType: 'pensil' | 'krayon' | 'penggaris' | 'sapu' | 'penghapusKecil' | 'pita';
}

export interface TimeActivity {
  id: string;
  title: string;
  durationLabel: string;
  type: 'singkat' | 'lama';
  secondsApprox: number;
  description: string;
  iconType:
    | 'cuciTangan'
    | 'mandi'
    | 'berkedip'
    | 'membaca'
    | 'menyanyi'
    | 'sekolah'
    | 'taliSepatu'
    | 'tidur'
    | 'sikatGigi'
    | 'upacara';
}

export const WEIGHT_ITEMS: WeightItem[] = [
  {
    id: 'buku-tulis',
    name: 'Buku Tulis',
    weight: 100,
    color: '#4ECDC4',
    category: 'Alat Tulis',
    description: 'Buku bergaris untuk mencatat tugas sekolah.',
    iconType: 'buku',
  },
  {
    id: 'botol-minum',
    name: 'Botol Minum',
    weight: 250,
    color: '#3DB8AF',
    category: 'Perlengkapan',
    description: 'Botol minum bekal ke sekolah berisi air.',
    iconType: 'botol',
  },
  {
    id: 'penghapus',
    name: 'Penghapus Karet',
    weight: 20,
    color: '#FF6B6B',
    category: 'Alat Tulis',
    description: 'Penghapus pensil warna merah putih.',
    iconType: 'penghapus',
  },
  {
    id: 'kotak-pensil',
    name: 'Kotak Pensil',
    weight: 150,
    color: '#FFE66D',
    category: 'Alat Tulis',
    description: 'Kotak pensil kaleng berisi alat tulis lengkap.',
    iconType: 'kotakPensil',
  },
  {
    id: 'apel-merah',
    name: 'Apel Merah',
    weight: 120,
    color: '#FF6B6B',
    category: 'Makanan Sehat',
    description: 'Buah apel segar untuk bekal makan siang.',
    iconType: 'apel',
  },
  {
    id: 'rautan-pensil',
    name: 'Rautan Pensil',
    weight: 30,
    color: '#4ECDC4',
    category: 'Alat Tulis',
    description: 'Rautan putar kecil berwadah mika.',
    iconType: 'rautan',
  },
  {
    id: 'semangka',
    name: 'Semangka Utuh',
    weight: 1000,
    color: '#4ECDC4',
    category: 'Buah Besar',
    description: 'Semangka besar manis seberat 1 Kilogram (1000g).',
    iconType: 'semangka',
  },
];

export const LENGTH_ITEMS: LengthItem[] = [
  {
    id: 'pensil-2b',
    name: 'Pensil 2B',
    defaultLengthCm: 15,
    minCm: 6,
    maxCm: 22,
    color: '#FFE66D',
    category: 'Alat Tulis',
    iconType: 'pensil',
  },
  {
    id: 'krayon',
    name: 'Krayon Warna',
    defaultLengthCm: 8,
    minCm: 4,
    maxCm: 12,
    color: '#FF6B6B',
    category: 'Alat Mewarnai',
    iconType: 'krayon',
  },
  {
    id: 'penggaris-kayu',
    name: 'Penggaris Kayu',
    defaultLengthCm: 30,
    minCm: 15,
    maxCm: 40,
    color: '#E0A96D',
    category: 'Alat Ukur',
    iconType: 'penggaris',
  },
  {
    id: 'sapu-ijuk',
    name: 'Sapu Ijuk Kelas',
    defaultLengthCm: 90,
    minCm: 60,
    maxCm: 110,
    color: '#2C3E50',
    category: 'Alat Kebersihan',
    iconType: 'sapu',
  },
  {
    id: 'penghapus-panjang',
    name: 'Penghapus Papan',
    defaultLengthCm: 12,
    minCm: 8,
    maxCm: 18,
    color: '#4ECDC4',
    category: 'Alat Kelas',
    iconType: 'penghapusKecil',
  },
  {
    id: 'pita-merah-putih',
    name: 'Pita Merah Putih',
    defaultLengthCm: 50,
    minCm: 25,
    maxCm: 80,
    color: '#FF6B6B',
    category: 'Kesenian',
    iconType: 'pita',
  },
];

export const ALL_ACTIVITIES: TimeActivity[] = [
  {
    id: 'berkedip',
    title: 'Mengedipkan Mata',
    durationLabel: '1 Detik',
    type: 'singkat',
    secondsApprox: 1,
    description: 'Sangat singkat, hanya dalam sekejap mata.',
    iconType: 'berkedip',
  },
  {
    id: 'cuci-tangan',
    title: 'Mencuci Tangan',
    durationLabel: '20 Detik',
    type: 'singkat',
    secondsApprox: 20,
    description: 'Mencuci tangan dengan sabun hingga bersih.',
    iconType: 'cuciTangan',
  },
  {
    id: 'sikat-gigi',
    title: 'Menggosok Gigi',
    durationLabel: '2 Menit',
    type: 'singkat',
    secondsApprox: 120,
    description: 'Membersihkan gigi pagi dan sebelum tidur.',
    iconType: 'sikatGigi',
  },
  {
    id: 'tali-sepatu',
    title: 'Mengikat Tali Sepatu',
    durationLabel: '15 Detik',
    type: 'singkat',
    secondsApprox: 15,
    description: 'Mengikat simpul sepatu agar rapi.',
    iconType: 'taliSepatu',
  },
  {
    id: 'mandi',
    title: 'Mandi Pagi',
    durationLabel: '15 Menit',
    type: 'lama',
    secondsApprox: 900,
    description: 'Mandi membersihkan seluruh tubuh sebelum sekolah.',
    iconType: 'mandi',
  },
  {
    id: 'upacara',
    title: 'Upacara Bendera',
    durationLabel: '45 Menit',
    type: 'lama',
    secondsApprox: 2700,
    description: 'Upacara bendera bersama di lapangan sekolah.',
    iconType: 'upacara',
  },
  {
    id: 'sekolah',
    title: 'Belajar di Kelas',
    durationLabel: '5 Jam',
    type: 'lama',
    secondsApprox: 18000,
    description: 'Belajar berbagai pelajaran bersama guru dan teman.',
    iconType: 'sekolah',
  },
  {
    id: 'tidur',
    title: 'Tidur Malam',
    durationLabel: '8 Jam',
    type: 'lama',
    secondsApprox: 28800,
    description: 'Istirahat malam panjang agar tubuh sehat dan segar.',
    iconType: 'tidur',
  },
];

export const TIME_COMPARISON_PAIRS = [
  {
    id: 'pair-1',
    category: 'Kebersihan Diri',
    itemA: ALL_ACTIVITIES[1], // cuci tangan
    itemB: ALL_ACTIVITIES[4], // mandi
  },
  {
    id: 'pair-2',
    category: 'Aktivitas Belajar',
    itemA: ALL_ACTIVITIES[0], // berkedip
    itemB: {
      id: 'membaca',
      title: 'Membaca Buku Cerita',
      durationLabel: '30 Menit',
      type: 'lama' as const,
      secondsApprox: 1800,
      description: 'Menikmati petualangan dongeng seru.',
      iconType: 'membaca' as const,
    },
  },
  {
    id: 'pair-3',
    category: 'Rutinitas Sekolah',
    itemA: ALL_ACTIVITIES[2], // sikat gigi
    itemB: ALL_ACTIVITIES[6], // belajar di kelas
  },
  {
    id: 'pair-4',
    category: 'Kegiatan Sehari-hari',
    itemA: ALL_ACTIVITIES[3], // tali sepatu
    itemB: ALL_ACTIVITIES[7], // tidur malam
  },
];
