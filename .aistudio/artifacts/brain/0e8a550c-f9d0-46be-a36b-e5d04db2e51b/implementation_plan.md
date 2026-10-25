# Rencana Penghapusan Fitur Kantin (Kembali ke 3 Modul Pengukuran Utama)

Rencana kerja untuk menghapus seluruh komponen, navigasi, kuis, dan indikator laporan yang terkait dengan **Kantin / Literasi Finansial**, serta mengembalikan struktur media pembelajaran ke **3 Modul Pengukuran Utama**: **Panjang**, **Berat**, dan **Waktu** sesuai kurikulum matematika kelas 2 SD.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> Ringkasan tindakan yang akan dieksekusi setelah persetujuan:
> - **Penghapusan Modul Kantin**: Menghapus kartu menu utama "Kantin", tombol sub-tab "Kantin", dan komponen `FinancialLiteracyCanteen.tsx`.
> - **Penyelarasan Kuis Diagnostik**: Mengembalikan kuis refleksi formatif menjadi 3 soal diagnostik terfokus (Panjang, Berat, dan Waktu).
> - **Penyelarasan Laporan Hasil Belajar (Rapor)**: Menghapus baris ke-4 (Kantin) dari tabel capaian kompetensi, menyisakan 3 indikator inti CP (Pengukuran Panjang, Pengukuran Berat, dan Durasi Waktu).
> - **Fitur KGA & Pemantik Tetap Aktif**: Pendekatan Konkret-Gambar-Abstrak (garis kisi acuan, timbangan digital & jungkitan, jam balapan, kartu capit buaya `>`, `<`, `=`) dan pertanyaan pemantik HOTS tetap dipertahankan pada 3 modul pengukuran.

---

## 1. Overview & Core Concept

- **Fokus Materi Pembelajaran**:
  1. **Pengukuran Panjang**: Benda nyata sekolah, garis acuan sejajar cm, capit buaya perbandingan panjang.
  2. **Pengukuran Berat**: Timbangan Jungkitan dua piringan, Timbangan Digital interaktif (gram & kilogram: 1.000 g = 1 kg), capit buaya perbandingan berat.
  3. **Durasi Waktu**: Balapan waktu kejadian nyata sehari-hari (detik, menit, jam), capit buaya durasi.
- **Asesmen & Refleksi**:
  - Kuis Diagnostik Formatif 3 topik dengan umpan balik langsung.
  - Jurnal Emosi Belajar (Paham Banget, Cukup Bisa, Bingung).
  - Laporan Capaian Belajar Siswa (Printable PDF ready) dengan 3 indikator CP.

---

## 2. User Experience & Layout Changes

- **Menu Utama (Tab 1)**:
  - Grid kategori kembali menampilkan **3 Kartu Besar Seimbang** (Panjang, Berat, Waktu).
- **Materi Belajar (Tab 2)**:
  - Bilah sub-tab menampilkan **3 Tombol Pengukuran** (Panjang, Berat, Waktu).
- **Refleksi & Asesmen (Tab 4)**:
  - Kuis formatif terdiri dari 3 pertanyaan dengan umpan balik langsung dan petunjuk bertahap.
  - Tabel Capaian Kompetensi mencakup 3 indikator CP murni pengukuran satuan.

---

## 3. Technical Architecture & Modifications

```
┌────────────────────────────────────────────────────────┐
│                        App.tsx                         │
│  - State: materiSubTab ('panjang' | 'berat' | 'waktu') │
│  - 3 Category Cards di Menu Utama                      │
│  - 3 Sub-tabs di Materi Belajar                        │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                  Materi Belajar (KGA)                  │
├────────────────────────────────────────────────────────┤
│ 1. LengthComparator.tsx (Panjang & Kisi Acuan cm)      │
│ 2. InteractiveDigitalScale.tsx (Berat Digital g & kg) │
│    & BalanceScale.tsx (Timbangan Jungkitan)            │
│ 3. TimeComparator.tsx (Balapan Waktu Detik/Jam)        │
│ 4. AlligatorComparisonCard.tsx (Simbol >, <, =)        │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│      ReflectionEvaluation.tsx (Refleksi & Asesmen)     │
│ - 3 Soal Diagnostik Formatif                           │
│ - 3 Indikator Capaian Pembelajaran (CP)                │
│ - Jurnal Emosi & Cetak PDF                             │
└────────────────────────────────────────────────────────┘
```

### Rincian File yang Akan Dimodifikasi:
1. `src/App.tsx`:
   - Hapus impor `FinancialLiteracyCanteen` dan icon `Store`.
   - Ubah tipe `materiSubTab` kembali ke `'panjang' | 'berat' | 'waktu'`.
   - Hapus kartu ke-4 "Kantin" dari halaman Menu Utama.
   - Hapus tombol sub-tab ke-4 "Kantin" dari halaman Materi Belajar.
2. `src/components/ReflectionEvaluation.tsx`:
   - Hapus soal diagnostik nomor 4 (terkait kantin kacang).
   - Hapus baris indikator ke-4 dari tabel Capaian Belajar Siswa.
3. `src/components/FinancialLiteracyCanteen.tsx`:
   - Hapus file komponen kantin ini dari proyek.
4. `metadata.json` & `index.html`:
   - Sesuaikan deskripsi agar terfokus pada pengukuran panjang, berat, dan waktu.
