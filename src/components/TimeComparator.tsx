import React, { useState, useEffect } from 'react';
import { TIME_COMPARISON_PAIRS } from '../data/items';
import { ItemVector } from './ItemVectorIcons';
import { MascotMimi } from './MascotMimi';
import { AlligatorComparisonCard } from './AlligatorComparisonCard';
import { playPopSound, playDingSound, playDropSound } from '../utils/audio';
import { Play, RotateCcw, Zap, Clock } from 'lucide-react';

export const TimeComparator: React.FC = () => {
  const [selectedPairIndex, setSelectedPairIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [progressA, setProgressA] = useState(0);
  const [progressB, setProgressB] = useState(0);

  const pair = TIME_COMPARISON_PAIRS[selectedPairIndex];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isSimulating) {
      interval = setInterval(() => {
        setProgressA((prev) => (prev >= 100 ? 100 : prev + 14));
        setProgressB((prev) => (prev >= 100 ? 100 : prev + 1.8));
      }, 150);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSimulating]);

  useEffect(() => {
    if (progressA >= 100 && isSimulating && progressB < 100) {
      playDingSound();
    }
  }, [progressA, isSimulating, progressB]);

  const startSimulation = () => {
    playDropSound();
    setProgressA(0);
    setProgressB(0);
    setIsSimulating(true);
  };

  const resetSimulation = () => {
    playPopSound();
    setIsSimulating(false);
    setProgressA(0);
    setProgressB(0);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-5">
      {/* 1. PERTANYAAN PEMANTIK MIMI (HOTS WARM-UP) */}
      <div className="bg-[#FFFDF5] border-3 border-[#2C3E50] rounded-3xl p-5 shadow-tactile flex flex-col sm:flex-row items-center gap-4">
        <MascotMimi size="sm" showDialogue={false} />
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-heading font-black text-xs uppercase bg-[#FFE66D] border border-[#2C3E50] text-[#2C3E50] px-2.5 py-0.5 rounded-full">
              Pertanyaan Pemantik HOTS
            </span>
            <span className="text-xs font-bold text-[#FF6B6B]">Pembandingan Waktu</span>
          </div>
          <p className="font-heading font-black text-base sm:text-lg text-[#2C3E50] leading-snug">
            "Manakah kegiatan yang membutuhkan waktu paling lama: berkedip satu detik, mencuci tangan 20 detik, atau tidur malam 8 jam?"
          </p>
          <span className="text-[11px] font-bold text-slate-500 block mt-1">
            Konsep Waktu: Satuan <b>detik & menit</b> berlangsung <i>singkat/cepat</i>, sedangkan <b>jam & hari</b> berlangsung <i>lama</i>!
          </span>
        </div>
      </div>

      {/* Visual Controls Banner */}
      <div className="bg-white border-2 border-[#2C3E50] rounded-3xl p-4 shadow-tactile-sm flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FFE66D] border-2 border-[#2C3E50] flex items-center justify-center shrink-0 shadow-tactile-sm">
            <Clock size={24} className="text-[#2C3E50]" />
          </div>
          <div>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-[#2C3E50]">
              Balapan Durasi Waktu
            </h3>
            <span className="text-xs font-bold text-slate-500">Cepat ⚡ vs Lama ⏳</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={startSimulation}
            disabled={isSimulating}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-heading font-black text-xs sm:text-sm border-2 border-[#2C3E50] transition-all cursor-pointer ${
              isSimulating
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-60'
                : 'bg-[#FF6B6B] text-white hover:bg-[#ff5252] shadow-tactile-sm active:translate-y-0.5'
            }`}
          >
            <Play size={16} fill="currentColor" />
            <span>Mulai</span>
          </button>

          <button
            type="button"
            onClick={resetSimulation}
            className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 border-2 border-[#2C3E50] text-[#2C3E50] cursor-pointer shadow-tactile-sm active:translate-y-0.5"
            title="Ulangi"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Race Stage Visual Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* CARD A: Singkat / Cepat */}
        <div className="bg-white border-3 border-[#2C3E50] rounded-3xl p-5 shadow-tactile flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-[#4ECDC4] border-2 border-[#2C3E50] flex items-center justify-center">
                <ItemVector type={pair.itemA.iconType} size={36} />
              </div>
              <div>
                <span className="font-heading font-black text-base text-[#2C3E50] block">
                  {pair.itemA.title}
                </span>
                <span className="text-xs font-bold text-[#4ECDC4]">
                  {pair.itemA.durationLabel}
                </span>
              </div>
            </div>

            <span className="bg-[#4ECDC4] text-white text-[10px] font-black px-2 py-0.5 rounded-full border border-[#2C3E50]">
              Singkat ⚡
            </span>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-xs font-bold mb-1">
              <span>Waktu:</span>
              <span className="text-[#4ECDC4]">{progressA >= 100 ? 'Selesai Lebih Dulu!' : 'Berjalan...'}</span>
            </div>
            <div className="w-full bg-slate-200 h-3.5 rounded-full overflow-hidden">
              <div
                className="bg-[#4ECDC4] h-full transition-all duration-150 rounded-full"
                style={{ width: `${progressA}%` }}
              />
            </div>
          </div>
        </div>

        {/* CARD B: Lama */}
        <div className="bg-white border-3 border-[#2C3E50] rounded-3xl p-5 shadow-tactile flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-[#FF6B6B] border-2 border-[#2C3E50] flex items-center justify-center">
                <ItemVector type={pair.itemB.iconType} size={36} />
              </div>
              <div>
                <span className="font-heading font-black text-base text-[#2C3E50] block">
                  {pair.itemB.title}
                </span>
                <span className="text-xs font-bold text-[#FF6B6B]">
                  {pair.itemB.durationLabel}
                </span>
              </div>
            </div>

            <span className="bg-[#FF6B6B] text-white text-[10px] font-black px-2 py-0.5 rounded-full border border-[#2C3E50]">
              Lama ⏳
            </span>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-xs font-bold mb-1">
              <span>Waktu:</span>
              <span className="text-[#FF6B6B]">{progressB >= 100 ? 'Selesai' : 'Berjalan Lambat...'}</span>
            </div>
            <div className="w-full bg-slate-200 h-3.5 rounded-full overflow-hidden">
              <div
                className="bg-[#FF6B6B] h-full transition-all duration-150 rounded-full"
                style={{ width: `${progressB}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Visualisasi Capit Buaya untuk Durasi Waktu */}
      <AlligatorComparisonCard
        valueA={pair.itemB.secondsApprox}
        valueB={pair.itemA.secondsApprox}
        unit="Detik"
        labelA={pair.itemB.title}
        labelB={pair.itemA.title}
      />

      {/* Quick Pair Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {TIME_COMPARISON_PAIRS.map((p, idx) => (
          <button
            key={p.id}
            type="button"
            onClick={() => {
              playPopSound();
              setSelectedPairIndex(idx);
              resetSimulation();
            }}
            className={`p-2.5 rounded-2xl border-2 font-heading font-bold text-xs transition-all cursor-pointer ${
              selectedPairIndex === idx
                ? 'bg-[#FFE66D] border-[#2C3E50] text-[#2C3E50] shadow-tactile-sm'
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            {p.itemA.title} vs {p.itemB.title}
          </button>
        ))}
      </div>
    </div>
  );
};
