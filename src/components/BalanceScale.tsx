import React, { useState } from 'react';
import { WEIGHT_ITEMS, WeightItem } from '../data/items';
import { ItemVector } from './ItemVectorIcons';
import { playDropSound, playPopSound, playDingSound } from '../utils/audio';
import { RotateCcw, Plus, Scale } from 'lucide-react';
import { MascotMimi } from './MascotMimi';
import { AlligatorComparisonCard } from './AlligatorComparisonCard';

export const BalanceScale: React.FC = () => {
  const [leftItems, setLeftItems] = useState<{ id: string; item: WeightItem }[]>([]);
  const [rightItems, setRightItems] = useState<{ id: string; item: WeightItem }[]>([]);
  const [selectedTargetPan, setSelectedTargetPan] = useState<'left' | 'right'>('left');

  const leftWeight = leftItems.reduce((acc, curr) => acc + curr.item.weight, 0);
  const rightWeight = rightItems.reduce((acc, curr) => acc + curr.item.weight, 0);

  const diff = rightWeight - leftWeight;
  let tiltAngle = 0;
  if (diff > 0) {
    tiltAngle = Math.min(16, Math.max(4, Math.round(diff / 25) * 3));
  } else if (diff < 0) {
    tiltAngle = Math.max(-16, Math.min(-4, Math.round(diff / 25) * 3));
  }

  const addItemToPan = (item: WeightItem, pan: 'left' | 'right') => {
    playDropSound();
    const entry = { id: `${item.id}-${Date.now()}-${Math.random()}`, item };
    if (pan === 'left') {
      const next = [...leftItems, entry];
      setLeftItems(next);
      if (next.reduce((a, c) => a + c.item.weight, 0) === rightWeight) {
        playDingSound();
      }
    } else {
      const next = [...rightItems, entry];
      setRightItems(next);
      if (leftWeight === next.reduce((a, c) => a + c.item.weight, 0)) {
        playDingSound();
      }
    }
  };

  const removeItem = (id: string, pan: 'left' | 'right') => {
    playPopSound();
    if (pan === 'left') {
      setLeftItems(leftItems.filter((i) => i.id !== id));
    } else {
      setRightItems(rightItems.filter((i) => i.id !== id));
    }
  };

  const handleReset = () => {
    playPopSound();
    setLeftItems([]);
    setRightItems([]);
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
            <span className="text-xs font-bold text-[#FF6B6B]">Timbangan Jungkitan</span>
          </div>
          <p className="font-heading font-black text-base sm:text-lg text-[#2C3E50] leading-snug">
            "Jika piringan timbangan sebelah kiri turun ke bawah dan sisi kanan naik ke atas, benda di sisi manakah yang lebih berat?"
          </p>
          <span className="text-[11px] font-bold text-slate-500 block mt-1">
            Prinsip: Sisi yang <b>turun ke bawah</b> adalah sisi yang <b>lebih berat</b> karena ditarik gravitasi bumi!
          </span>
        </div>
      </div>

      {/* Visual Header */}
      <div className="bg-white border-2 border-[#2C3E50] rounded-3xl p-4 shadow-tactile-sm flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FFE66D] border-2 border-[#2C3E50] flex items-center justify-center shrink-0 shadow-tactile-sm">
            <Scale size={24} className="text-[#2C3E50]" />
          </div>
          <div>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-[#2C3E50]">
              Timbangan Jungkitan
            </h3>
            <span className="text-xs font-bold text-slate-500">Benda berat turun ke bawah</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          disabled={leftItems.length === 0 && rightItems.length === 0}
          className="flex items-center gap-2 bg-[#FFE66D] hover:bg-[#ffe043] text-[#2C3E50] border-2 border-[#2C3E50] px-4 py-2 rounded-2xl font-black text-xs shadow-tactile-sm cursor-pointer disabled:opacity-50"
        >
          <RotateCcw size={15} />
          Reset
        </button>
      </div>

      {/* Visual Balance Stage */}
      <div className="bg-[#FFFDF5] border-2 border-[#2C3E50] rounded-3xl p-6 shadow-tactile flex flex-col items-center min-h-[340px]">
        {/* Dynamic Status Badge */}
        <div
          className={`px-5 py-2 rounded-2xl border-2 font-heading font-black text-sm shadow-tactile-sm ${
            leftWeight === 0 && rightWeight === 0
              ? 'bg-white text-slate-500 border-slate-300'
              : leftWeight === rightWeight
              ? 'bg-emerald-500 text-white border-[#2C3E50] animate-bounce'
              : leftWeight > rightWeight
              ? 'bg-[#4ECDC4] text-white border-[#2C3E50]'
              : 'bg-[#FFE66D] text-[#2C3E50] border-[#2C3E50]'
          }`}
        >
          {leftWeight === 0 && rightWeight === 0
            ? 'Timbangan Kosong'
            : leftWeight === rightWeight
            ? 'SEIMBANG (SAMA BERAT)! ✨'
            : leftWeight > rightWeight
            ? 'SISI KIRI LEBIH BERAT ➔'
            : 'SISI KANAN LEBIH BERAT ➔'}
        </div>

        {/* Seesaw Assembly */}
        <div className="w-full max-w-lg flex flex-col items-center mt-6">
          <div
            className="w-full relative transition-transform duration-500 ease-out flex justify-between items-center"
            style={{ transform: `rotate(${tiltAngle}deg)`, transformOrigin: 'center center' }}
          >
            <div className="absolute inset-x-0 h-4 bg-[#E0A96D] border-2 border-[#2C3E50] rounded-full shadow-sm" />

            {/* Left Pan */}
            <div
              className="relative -top-2 flex flex-col items-center transition-transform duration-500"
              style={{ transform: `rotate(${-tiltAngle}deg)` }}
            >
              <div className="w-14 h-10 flex justify-between px-2">
                <div className="w-0.5 h-full bg-[#2C3E50]" />
                <div className="w-0.5 h-full bg-[#2C3E50]" />
              </div>
              <div
                onClick={() => setSelectedTargetPan('left')}
                className={`w-32 min-h-[75px] bg-[#4ECDC4] border-3 border-[#2C3E50] rounded-2xl p-2 flex flex-wrap items-center justify-center gap-1 cursor-pointer transition-all ${
                  selectedTargetPan === 'left' ? 'ring-4 ring-[#FF6B6B]' : ''
                }`}
              >
                {leftItems.length === 0 ? (
                  <span className="text-[10px] font-black text-white">KIRI (0g)</span>
                ) : (
                  leftItems.map((entry) => (
                    <div
                      key={entry.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeItem(entry.id, 'left');
                      }}
                      className="bg-white border border-[#2C3E50] rounded-lg p-0.5"
                    >
                      <ItemVector type={entry.item.iconType} size={24} />
                    </div>
                  ))
                )}
              </div>
              <span className="mt-1 text-xs font-black bg-[#2C3E50] text-white px-2 py-0.5 rounded-full">
                {leftWeight}g
              </span>
            </div>

            {/* Center pointer */}
            <div className="absolute left-1/2 -top-8 -translate-x-1/2 flex flex-col items-center pointer-events-none">
              <div className="w-1.5 h-8 bg-[#FF6B6B] border border-[#2C3E50] rounded-full" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#FFE66D] border-2 border-[#2C3E50] -mt-1" />
            </div>

            {/* Right Pan */}
            <div
              className="relative -top-2 flex flex-col items-center transition-transform duration-500"
              style={{ transform: `rotate(${-tiltAngle}deg)` }}
            >
              <div className="w-14 h-10 flex justify-between px-2">
                <div className="w-0.5 h-full bg-[#2C3E50]" />
                <div className="w-0.5 h-full bg-[#2C3E50]" />
              </div>
              <div
                onClick={() => setSelectedTargetPan('right')}
                className={`w-32 min-h-[75px] bg-[#FFE66D] border-3 border-[#2C3E50] rounded-2xl p-2 flex flex-wrap items-center justify-center gap-1 cursor-pointer transition-all ${
                  selectedTargetPan === 'right' ? 'ring-4 ring-[#FF6B6B]' : ''
                }`}
              >
                {rightItems.length === 0 ? (
                  <span className="text-[10px] font-black text-[#2C3E50]">KANAN (0g)</span>
                ) : (
                  rightItems.map((entry) => (
                    <div
                      key={entry.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeItem(entry.id, 'right');
                      }}
                      className="bg-white border border-[#2C3E50] rounded-lg p-0.5"
                    >
                      <ItemVector type={entry.item.iconType} size={24} />
                    </div>
                  ))
                )}
              </div>
              <span className="mt-1 text-xs font-black bg-[#2C3E50] text-white px-2 py-0.5 rounded-full">
                {rightWeight}g
              </span>
            </div>
          </div>

          {/* Stand */}
          <div className="relative -mt-2 flex flex-col items-center pointer-events-none">
            <div className="w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[45px] border-b-[#2C3E50]" />
            <div className="w-40 h-5 bg-[#E2E8F0] border-2 border-[#2C3E50] rounded-xl shadow-md -mt-1" />
          </div>
        </div>
      </div>

      {/* Visualisasi Capit Buaya untuk Berat Kiri vs Kanan */}
      {(leftWeight > 0 || rightWeight > 0) && (
        <AlligatorComparisonCard
          valueA={leftWeight}
          valueB={rightWeight}
          unit="g"
          labelA="Piringan Kiri"
          labelB="Piringan Kanan"
        />
      )}

      {/* Target Pan Selector & Item Shelf */}
      <div className="bg-white border-2 border-[#2C3E50] rounded-3xl p-4 shadow-tactile-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-500">Pilih Piringan:</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setSelectedTargetPan('left')}
              className={`px-3 py-1 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                selectedTargetPan === 'left'
                  ? 'bg-[#4ECDC4] text-white border-[#2C3E50]'
                  : 'bg-slate-100 text-slate-600 border-transparent'
              }`}
            >
              Kiri
            </button>
            <button
              type="button"
              onClick={() => setSelectedTargetPan('right')}
              className={`px-3 py-1 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                selectedTargetPan === 'right'
                  ? 'bg-[#FFE66D] text-[#2C3E50] border-[#2C3E50]'
                  : 'bg-slate-100 text-slate-600 border-transparent'
              }`}
            >
              Kanan
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {WEIGHT_ITEMS.filter((w) => w.weight < 500).map((item) => (
            <div
              key={item.id}
              onClick={() => addItemToPan(item, selectedTargetPan)}
              className="bg-[#FFFDF5] border-2 border-[#2C3E50] rounded-2xl p-2 flex flex-col items-center justify-between text-center cursor-pointer hover:border-[#4ECDC4] shadow-sm transition-transform active:scale-95"
            >
              <ItemVector type={item.iconType} size={36} />
              <span className="text-[10px] font-bold text-[#2C3E50] truncate w-full mt-1">
                {item.name}
              </span>
              <span className="text-[10px] font-black text-[#FF6B6B]">{item.weight}g</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
