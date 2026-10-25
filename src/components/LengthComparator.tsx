import React, { useState } from 'react';
import { LENGTH_ITEMS, LengthItem } from '../data/items';
import { ItemVector } from './ItemVectorIcons';
import { MascotMimi } from './MascotMimi';
import { AlligatorComparisonCard } from './AlligatorComparisonCard';
import { playPopSound } from '../utils/audio';
import { Ruler } from 'lucide-react';
import { GestureTutorial } from './GestureTutorial';

export const LengthComparator: React.FC = () => {
  const [itemA, setItemA] = useState<LengthItem>(LENGTH_ITEMS[0]); // Pensil 2B
  const [itemB, setItemB] = useState<LengthItem>(LENGTH_ITEMS[1]); // Krayon
  const [lengthA, setLengthA] = useState<number>(itemA.defaultLengthCm);
  const [lengthB, setLengthB] = useState<number>(itemB.defaultLengthCm);

  const handleSelectA = (item: LengthItem) => {
    playPopSound();
    setItemA(item);
    setLengthA(item.defaultLengthCm);
  };

  const handleSelectB = (item: LengthItem) => {
    playPopSound();
    setItemB(item);
    setLengthB(item.defaultLengthCm);
  };

  const pxA = Math.min(380, Math.max(70, lengthA * 12));
  const pxB = Math.min(380, Math.max(70, lengthB * 12));

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
            <span className="text-xs font-bold text-[#FF6B6B]">Pengukuran Panjang</span>
          </div>
          <p className="font-heading font-black text-base sm:text-lg text-[#2C3E50] leading-snug">
            "Jika ujung kedua pensil tidak ditaruh sejajar pada garis mulai yang sama, apakah kita bisa tahu mana yang lebih panjang?"
          </p>
          <span className="text-[11px] font-bold text-slate-500 block mt-1">
            Prinsip: Selalu luruskan pangkal benda di <b>Garis Acuan Sejajar</b> agar perbandingan adil dan akurat!
          </span>
        </div>
      </div>

      {/* Visual Dynamic Result Banner (Big Color Coded Tag) */}
      <div className="flex justify-center">
        {lengthA > lengthB ? (
          <div className="bg-emerald-500 text-white border-3 border-[#2C3E50] px-6 py-3 rounded-2xl font-heading font-black text-xl shadow-tactile animate-bounce">
            {itemA.name} LEBIH PANJANG! ✨
          </div>
        ) : lengthA < lengthB ? (
          <div className="bg-amber-400 text-[#2C3E50] border-3 border-[#2C3E50] px-6 py-3 rounded-2xl font-heading font-black text-xl shadow-tactile animate-bounce">
            {itemA.name} LEBIH PENDEK!
          </div>
        ) : (
          <div className="bg-[#4ECDC4] text-white border-3 border-[#2C3E50] px-6 py-3 rounded-2xl font-heading font-black text-xl shadow-tactile">
            KEDUA BENDA SAMA PANJANG!
          </div>
        )}
      </div>

      {/* 2. Visual Comparison Stage with Shared Baseline & Centimeter Grid */}
      <div className="bg-white border-3 border-[#2C3E50] rounded-3xl p-6 shadow-tactile relative flex flex-col gap-6 overflow-x-auto min-h-[240px] justify-center">
        <GestureTutorial actionText="Geser Panjang Benda & Bandingkan" durationMs={3500} type="drag" />

        {/* Centimeter Grid Background */}
        <div className="absolute inset-0 left-24 sm:left-32 pointer-events-none flex opacity-15 overflow-hidden">
          {Array.from({ length: 32 }).map((_, i) => (
            <div key={i} className="w-[12px] h-full border-r border-[#2C3E50] shrink-0" />
          ))}
        </div>

        {/* Red Starting Baseline Line */}
        <div className="absolute top-3 bottom-3 left-24 sm:left-32 w-1.5 bg-[#FF6B6B] rounded-full z-20 flex flex-col items-center shadow-sm">
          <span className="absolute -top-3 bg-[#FF6B6B] text-white text-[10px] font-black px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm border border-[#2C3E50]">
            Garis Pangkal Acuan
          </span>
        </div>

        {/* OBJECT A ROW */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-20 sm:w-28 text-right pr-2 shrink-0">
            <span className="font-heading font-bold text-xs sm:text-sm text-[#2C3E50] truncate block">
              {itemA.name}
            </span>
            <span className="text-xs font-black text-[#FF6B6B]">{lengthA} cm</span>
          </div>

          <div
            style={{ width: `${pxA}px` }}
            className="h-14 bg-[#FFE66D] border-3 border-[#2C3E50] rounded-r-2xl rounded-l-md shadow-tactile-sm flex items-center justify-between px-3 transition-all"
          >
            <ItemVector type={itemA.iconType} size={36} />
            <span className="font-heading font-black text-sm text-[#2C3E50]">{lengthA} cm</span>
          </div>
        </div>

        {/* OBJECT B ROW */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-20 sm:w-28 text-right pr-2 shrink-0">
            <span className="font-heading font-bold text-xs sm:text-sm text-[#2C3E50] truncate block">
              {itemB.name}
            </span>
            <span className="text-xs font-black text-[#4ECDC4]">{lengthB} cm</span>
          </div>

          <div
            style={{ width: `${pxB}px` }}
            className="h-14 bg-[#4ECDC4] border-3 border-[#2C3E50] rounded-r-2xl rounded-l-md shadow-tactile-sm flex items-center justify-between px-3 transition-all"
          >
            <ItemVector type={itemB.iconType} size={36} />
            <span className="font-heading font-black text-sm text-white">{lengthB} cm</span>
          </div>
        </div>
      </div>

      {/* 3. VISUALISASI CAPIT BUAYA (SIMBOL ABSTRAK >, <, =) */}
      <AlligatorComparisonCard
        valueA={lengthA}
        valueB={lengthB}
        unit="cm"
        labelA={itemA.name}
        labelB={itemB.name}
      />

      {/* Sliders to stretch objects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white border-2 border-[#2C3E50] rounded-2xl p-4 shadow-tactile-sm">
          <div className="flex justify-between text-xs font-bold text-[#2C3E50] mb-2">
            <span>Ubah Panjang {itemA.name}:</span>
            <span className="bg-[#FFE66D] px-2 py-0.5 rounded-lg border border-[#2C3E50] font-black">
              {lengthA} cm
            </span>
          </div>
          <input
            type="range"
            min={itemA.minCm}
            max={itemA.maxCm}
            value={lengthA}
            onChange={(e) => setLengthA(Number(e.target.value))}
            className="w-full accent-[#FF6B6B] cursor-pointer h-2 bg-slate-200 rounded-lg"
          />
        </div>

        <div className="bg-white border-2 border-[#2C3E50] rounded-2xl p-4 shadow-tactile-sm">
          <div className="flex justify-between text-xs font-bold text-[#2C3E50] mb-2">
            <span>Ubah Panjang {itemB.name}:</span>
            <span className="bg-[#4ECDC4] text-white px-2 py-0.5 rounded-lg border border-[#2C3E50] font-black">
              {lengthB} cm
            </span>
          </div>
          <input
            type="range"
            min={itemB.minCm}
            max={itemB.maxCm}
            value={lengthB}
            onChange={(e) => setLengthB(Number(e.target.value))}
            className="w-full accent-[#4ECDC4] cursor-pointer h-2 bg-slate-200 rounded-lg"
          />
        </div>
      </div>

      {/* Quick Object Pickers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white border-2 border-[#2C3E50] rounded-3xl p-4 shadow-tactile-sm">
          <span className="text-xs font-bold text-slate-500 block mb-2">Pilih Benda Atas:</span>
          <div className="grid grid-cols-3 gap-2">
            {LENGTH_ITEMS.map((item) => (
              <button
                key={`a-${item.id}`}
                type="button"
                onClick={() => handleSelectA(item)}
                className={`p-2 rounded-2xl border-2 flex flex-col items-center gap-1 cursor-pointer transition-all ${
                  itemA.id === item.id
                    ? 'border-[#FF6B6B] bg-[#FFE66D]/30 shadow-tactile-sm scale-[1.03]'
                    : 'border-slate-200 hover:border-slate-300 bg-[#FFFDF5]'
                }`}
              >
                <ItemVector type={item.iconType} size={30} />
                <span className="text-[10px] font-bold text-[#2C3E50] truncate w-full text-center">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border-2 border-[#2C3E50] rounded-3xl p-4 shadow-tactile-sm">
          <span className="text-xs font-bold text-slate-500 block mb-2">Pilih Benda Bawah:</span>
          <div className="grid grid-cols-3 gap-2">
            {LENGTH_ITEMS.map((item) => (
              <button
                key={`b-${item.id}`}
                type="button"
                onClick={() => handleSelectB(item)}
                className={`p-2 rounded-2xl border-2 flex flex-col items-center gap-1 cursor-pointer transition-all ${
                  itemB.id === item.id
                    ? 'border-[#4ECDC4] bg-[#4ECDC4]/20 shadow-tactile-sm scale-[1.03]'
                    : 'border-slate-200 hover:border-slate-300 bg-[#FFFDF5]'
                }`}
              >
                <ItemVector type={item.iconType} size={30} />
                <span className="text-[10px] font-bold text-[#2C3E50] truncate w-full text-center">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
