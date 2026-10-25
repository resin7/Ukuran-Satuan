import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ItemVector } from './ItemVectorIcons';
import {
  playSuccessFanfare,
  playDingSound,
  playGentleBoing,
  playPopSound,
} from '../utils/audio';
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  Smile,
  Meh,
  Frown,
  Printer,
  FileCheck,
  Award,
  HelpCircle,
} from 'lucide-react';

interface DiagnosticQuestion {
  id: number;
  prompt: string;
  topic: 'panjang' | 'berat' | 'waktu';
  topicLabel: string;
  options: {
    id: string;
    label: string;
    iconType?: string;
    isCorrect: boolean;
  }[];
}

const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 1,
    topic: 'panjang',
    topicLabel: 'Pengukuran Panjang',
    prompt: 'Mana yang Lebih Panjang?',
    options: [
      { id: 'p-a', label: 'Pensil (12 cm)', iconType: 'pensil', isCorrect: false },
      { id: 'p-b', label: 'Pensil (18 cm)', iconType: 'pensil', isCorrect: true },
      { id: 'p-c', label: 'Krayon (8 cm)', iconType: 'krayon', isCorrect: false },
    ],
  },
  {
    id: 2,
    topic: 'berat',
    topicLabel: 'Pengukuran Berat',
    prompt: 'Timbangan Kiri Turun. Mana yang Lebih Berat?',
    options: [
      { id: 'w-a', label: 'Buku di Kiri', iconType: 'buku', isCorrect: true },
      { id: 'w-b', label: 'Penghapus di Kanan', iconType: 'penghapus', isCorrect: false },
    ],
  },
  {
    id: 3,
    topic: 'waktu',
    topicLabel: 'Durasi Waktu',
    prompt: 'Mana yang Paling Cepat / Singkat?',
    options: [
      { id: 't-a', label: 'Tidur Malam (8 Jam)', iconType: 'tidur', isCorrect: false },
      { id: 't-b', label: 'Mandi (15 Menit)', iconType: 'mandi', isCorrect: false },
      { id: 't-c', label: 'Berkedip (1 Detik)', iconType: 'berkedip', isCorrect: true },
    ],
  },
];

export const ReflectionEvaluation: React.FC = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<'bingung' | 'cukup' | 'paham' | null>(
    null
  );
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [failedAttempts, setFailedAttempts] = useState<Record<number, number>>({});
  const [studentName, setStudentName] = useState<string>('');
  const [studentClass, setStudentClass] = useState<string>('Kelas 2 SD');

  const handleEmotionSelect = (emotion: 'bingung' | 'cukup' | 'paham') => {
    playPopSound();
    setSelectedEmotion(emotion);

    if (emotion === 'bingung') {
      playGentleBoing();
    } else if (emotion === 'cukup') {
      playDingSound();
    } else {
      playSuccessFanfare();
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  const handleSelectAnswer = (questionId: number, optionId: string, isCorrect: boolean) => {
    if (answers[questionId]) return;
    playPopSound();

    if (isCorrect) {
      setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
      playDingSound();
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
    } else {
      // Wrong attempt
      playGentleBoing();
      setFailedAttempts((prev) => {
        const count = (prev[questionId] || 0) + 1;
        return { ...prev, [questionId]: count };
      });
    }
  };

  const handlePrintReport = () => {
    playPopSound();
    window.print();
  };

  const totalAnswered = Object.keys(answers).length;
  const correctCount = DIAGNOSTIC_QUESTIONS.filter((q) => {
    const chosenId = answers[q.id];
    const chosenOpt = q.options.find((o) => o.id === chosenId);
    return chosenOpt?.isCorrect;
  }).length;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
      {/* 1. ASESMEN EMOSI (3 BIG BUTTONS) */}
      <div className="bg-white border-2 border-[#2C3E50] rounded-3xl p-5 shadow-tactile flex flex-col gap-4 no-print">
        <h3 className="font-heading text-lg font-black text-[#2C3E50] text-center">
          Bagaimana Perasaanmu Setelah Belajar?
        </h3>

        <div className="grid grid-cols-3 gap-3">
          {/* Bingung */}
          <button
            type="button"
            onClick={() => handleEmotionSelect('bingung')}
            className={`p-4 rounded-3xl border-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 ${
              selectedEmotion === 'bingung'
                ? 'bg-amber-100 border-[#FF6B6B] ring-3 ring-[#FF6B6B]/30'
                : 'bg-[#FFFDF5] border-[#2C3E50] hover:border-slate-400'
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-200 border-2 border-[#2C3E50] flex items-center justify-center text-amber-800">
              <Frown size={32} />
            </div>
            <span className="font-heading font-black text-xs sm:text-sm text-[#2C3E50]">
              Bingung
            </span>
          </button>

          {/* Cukup Bisa */}
          <button
            type="button"
            onClick={() => handleEmotionSelect('cukup')}
            className={`p-4 rounded-3xl border-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 ${
              selectedEmotion === 'cukup'
                ? 'bg-teal-100 border-[#4ECDC4] ring-3 ring-[#4ECDC4]/30'
                : 'bg-[#FFFDF5] border-[#2C3E50] hover:border-slate-400'
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-teal-200 border-2 border-[#2C3E50] flex items-center justify-center text-teal-800">
              <Meh size={32} />
            </div>
            <span className="font-heading font-black text-xs sm:text-sm text-[#2C3E50]">
              Cukup Bisa
            </span>
          </button>

          {/* Paham Banget */}
          <button
            type="button"
            onClick={() => handleEmotionSelect('paham')}
            className={`p-4 rounded-3xl border-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 ${
              selectedEmotion === 'paham'
                ? 'bg-rose-100 border-[#FF6B6B] ring-3 ring-[#FF6B6B]/30'
                : 'bg-[#FFFDF5] border-[#2C3E50] hover:border-slate-400'
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-rose-200 border-2 border-[#2C3E50] flex items-center justify-center text-rose-800">
              <Smile size={32} />
            </div>
            <span className="font-heading font-black text-xs sm:text-sm text-[#2C3E50]">
              Paham Banget! ⭐
            </span>
          </button>
        </div>
      </div>

      {/* 2. DIAGNOSTIK FORMATIF: 4 SOAL DENGAN UMPAN BALIK LANGSUNG */}
      <div className="bg-white border-2 border-[#2C3E50] rounded-3xl p-5 shadow-tactile flex flex-col gap-4 no-print">
        <div className="flex justify-between items-center pb-2 border-b">
          <div className="flex items-center gap-2">
            <span className="font-heading font-black text-base text-[#2C3E50]">
              Kuis Diagnostik Formatif (4 Modul):
            </span>
          </div>
          <span className="text-xs font-bold bg-[#FFE66D] border border-[#2C3E50] px-2.5 py-0.5 rounded-lg">
            {totalAnswered} / {DIAGNOSTIC_QUESTIONS.length} Selesai
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {DIAGNOSTIC_QUESTIONS.map((q, idx) => {
            const chosenId = answers[q.id];
            const isAnswered = Boolean(chosenId);
            const wrongs = failedAttempts[q.id] || 0;
            const showHint = wrongs >= 2 && !isAnswered;

            return (
              <div
                key={q.id}
                className="bg-[#FFFDF5] border-2 border-[#2C3E50] rounded-2xl p-3.5 flex flex-col gap-2.5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-black text-sm text-[#2C3E50]">
                      #{idx + 1}. {q.prompt}
                    </span>
                    <span className="text-[10px] font-bold bg-slate-200 px-2 py-0.5 rounded-full text-slate-700">
                      {q.topicLabel}
                    </span>
                  </div>

                  {showHint && (
                    <span className="text-[10px] font-black bg-[#FFE66D] text-[#2C3E50] border border-[#2C3E50] px-2 py-0.5 rounded-full animate-pulse flex items-center gap-1">
                      <HelpCircle size={12} />
                      Petunjuk Aktif
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {q.options.map((opt) => {
                    const isSelected = chosenId === opt.id;
                    const isHintTarget = showHint && opt.isCorrect;

                    let style = 'bg-white border-[#2C3E50] hover:border-[#4ECDC4]';

                    if (isAnswered) {
                      if (opt.isCorrect) {
                        style = 'bg-emerald-100 border-emerald-500 ring-2 ring-emerald-400';
                      } else {
                        style = 'bg-white/60 border-slate-200 opacity-60';
                      }
                    } else if (isHintTarget) {
                      style = 'bg-amber-100 border-amber-400 ring-4 ring-[#FFE66D] animate-pulse';
                    }

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelectAnswer(q.id, opt.id, opt.isCorrect)}
                        disabled={isAnswered}
                        className={`p-2.5 rounded-xl border-2 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer min-h-[90px] ${style}`}
                      >
                        {opt.iconType && <ItemVector type={opt.iconType} size={32} />}
                        <span className="font-heading font-bold text-xs text-[#2C3E50]">
                          {opt.label}
                        </span>

                        {isAnswered && opt.isCorrect && (
                          <div className="mt-0.5">
                            <CheckCircle2 size={16} className="text-emerald-600" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. LAPORAN HASIL BELAJAR SISWA (PRINTABLE REPORT CARD) */}
      <div className="printable-report bg-white border-3 border-[#2C3E50] rounded-3xl p-6 sm:p-8 shadow-tactile flex flex-col gap-5">
        {/* Report Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-[#2C3E50]/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FFE66D] border-2 border-[#2C3E50] flex items-center justify-center shadow-tactile-sm">
              <Award size={28} className="text-[#2C3E50]" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-black text-[#2C3E50]">
                Laporan Capaian Belajar Siswa
              </h3>
              <p className="text-xs font-bold text-slate-500">
                Pengukuran Satuan (Kurikulum Merdeka Kelas 2 SD)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handlePrintReport}
            className="no-print flex items-center gap-2 bg-[#4ECDC4] hover:bg-[#3DB8AF] text-white border-2 border-[#2C3E50] px-4 py-2.5 rounded-2xl font-heading font-black text-xs shadow-tactile-sm cursor-pointer transition-transform active:scale-95 shrink-0"
          >
            <Printer size={16} />
            <span>Cetak / Simpan PDF</span>
          </button>
        </div>

        {/* Student Bio Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#FFFDF5] border-2 border-[#2C3E50] rounded-2xl p-4">
          <div>
            <label className="text-[11px] font-black text-slate-600 uppercase block mb-1">
              Nama Siswa
            </label>
            <input
              type="text"
              placeholder="Ketik nama siswa..."
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full bg-white border-2 border-[#2C3E50] rounded-xl px-3 py-1.5 text-xs font-bold text-[#2C3E50] focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]"
            />
          </div>

          <div>
            <label className="text-[11px] font-black text-slate-600 uppercase block mb-1">
              Kelas / Semester
            </label>
            <input
              type="text"
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              className="w-full bg-white border-2 border-[#2C3E50] rounded-xl px-3 py-1.5 text-xs font-bold text-[#2C3E50] focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] font-black text-slate-600 uppercase block mb-1">
              Refleksi Emosi
            </label>
            <div className="bg-white border-2 border-[#2C3E50] rounded-xl px-3 py-1.5 text-xs font-black text-[#2C3E50] flex items-center gap-1.5">
              {selectedEmotion === 'paham' && <span>⭐ Paham Banget & Mandiri</span>}
              {selectedEmotion === 'cukup' && <span>👍 Cukup Bisa</span>}
              {selectedEmotion === 'bingung' && <span>💡 Perlu Pendampingan</span>}
              {!selectedEmotion && <span className="text-slate-400 font-normal">Belum memilih</span>}
            </div>
          </div>
        </div>

        {/* CP Learning Objectives Evaluation Table (3 Indikator Utama) */}
        <div className="flex flex-col gap-3">
          <span className="font-heading font-black text-sm text-[#2C3E50]">
            Hasil Capaian Kompetensi (CP 3 Modul):
          </span>

          <div className="border-2 border-[#2C3E50] rounded-2xl overflow-hidden text-xs">
            {/* Row 1: Panjang */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 bg-white border-b border-slate-200 gap-2">
              <div className="flex-1">
                <span className="font-black text-[#FF6B6B] block">1. Pengukuran Panjang Benda</span>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Siswa mampu membandingkan panjang benda secara visual dengan garis kisi acuan sejajar (cm).
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full font-heading font-black text-[11px] border ${
                  answers[1]
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-400'
                    : 'bg-slate-100 text-slate-500 border-slate-300'
                }`}
              >
                {answers[1] ? 'Tercapai ⭐' : 'Belum Selesai'}
              </span>
            </div>

            {/* Row 2: Berat */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 bg-[#FFFDF5] border-b border-slate-200 gap-2">
              <div className="flex-1">
                <span className="font-black text-[#4ECDC4] block">2. Pengukuran Berat Benda</span>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Siswa memahami konsep berat/ringan pada timbangan jungkitan & timbangan digital (satuan g & kg).
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full font-heading font-black text-[11px] border ${
                  answers[2]
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-400'
                    : 'bg-slate-100 text-slate-500 border-slate-300'
                }`}
              >
                {answers[2] ? 'Tercapai ⭐' : 'Belum Selesai'}
              </span>
            </div>

            {/* Row 3: Waktu */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 bg-white gap-2">
              <div className="flex-1">
                <span className="font-black text-amber-700 block">3. Durasi Waktu Kejadian</span>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Siswa mampu membedakan durasi kejadian yang berlangsung singkat (detik) dan lama (jam).
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full font-heading font-black text-[11px] border ${
                  answers[3]
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-400'
                    : 'bg-slate-100 text-slate-500 border-slate-300'
                }`}
              >
                {answers[3] ? 'Tercapai ⭐' : 'Belum Selesai'}
              </span>
            </div>
          </div>
        </div>

        {/* Teacher / Parent Signature Box for Print */}
        <div className="pt-4 border-t-2 border-dashed border-[#2C3E50]/20 flex justify-between items-end text-xs text-slate-600">
          <div>
            <p className="font-bold">Catatan Guru / Pembimbing:</p>
            <p className="text-[11px] italic text-slate-500 mt-1">
              "Pendekatan KGA (Konkret-Gambar-Abstrak) menumbuhkan pemahaman konsep pengukuran panjang, berat, dan waktu secara nyata dan menyenangkan."
            </p>
          </div>

          <div className="text-center min-w-[140px]">
            <p className="text-[11px] text-slate-400 mb-8">Tanda Tangan Guru</p>
            <div className="border-b-2 border-[#2C3E50] w-full" />
            <p className="text-[10px] font-bold text-slate-500 mt-1">Guru Kelas 2 SD</p>
          </div>
        </div>
      </div>
    </div>
  );
};
