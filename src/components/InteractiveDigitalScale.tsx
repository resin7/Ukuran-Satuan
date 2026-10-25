import React, { useState } from 'react';
import { WEIGHT_ITEMS, WeightItem } from '../data/items';
import { ItemVector } from './ItemVectorIcons';
import { playDropSound, playPopSound, playDingSound } from '../utils/audio';
import { RotateCcw, Plus, Trash2, CheckCircle2, AlertCircle, Scale } from 'lucide-react';
import { MascotMimi } from './MascotMimi';
import { GestureTutorial } from './GestureTutorial';

export interface PlacedItem {
  instanceId: string;
  item: WeightItem;
}

interface InteractiveDigitalScaleProps {
  targetWeight?: number;
  onTargetMatched?: () => void;
  title?: string;
  instructionText?: string;
}

export const InteractiveDigitalScale: React.FC<InteractiveDigitalScaleProps> = ({
  targetWeight,
  onTargetMatched,
  title = 'Timbangan Digital',
  instructionText = 'Tarik Benda ke Timbangan',
}) => {
  const [itemsOnScale, setItemsOnScale] = useState<PlacedItem[]>([]);
  const [isPlateBouncing, setIsPlateBouncing] = useState(false);
  const [draggedItem, setDraggedItem] = useState<WeightItem | null>(null);
  const [isTargetAchieved, setIsTargetAchieved] = useState(false);

  const totalWeight = itemsOnScale.reduce((acc, curr) => acc + curr.item.weight, 0);

  const triggerPlateBounce = () => {
    setIsPlateBouncing(true);
    setTimeout(() => setIsPlateBouncing(false), 350);
  };

  const addItemToScale = (item: WeightItem) => {
    playDropSound();
    triggerPlateBounce();

    const newPlacedItem: PlacedItem = {
      instanceId: `${item.id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      item,
    };

    const newItems = [...itemsOnScale, newPlacedItem];
    setItemsOnScale(newItems);

    const newTotal = newItems.reduce((acc, curr) => acc + curr.item.weight, 0);
    if (targetWeight && newTotal === targetWeight && !isTargetAchieved) {
      setIsTargetAchieved(true);
      playDingSound();
      if (onTargetMatched) onTargetMatched();
    } else if (targetWeight && newTotal !== targetWeight) {
      setIsTargetAchieved(false);
    }
  };

  const removeItemFromScale = (instanceId: string) => {
    playPopSound();
    triggerPlateBounce();
    const newItems = itemsOnScale.filter((i) => i.instanceId !== instanceId);
    setItemsOnScale(newItems);

    const newTotal = newItems.reduce((acc, curr) => acc + curr.item.weight, 0);
    if (targetWeight && newTotal === targetWeight) {
      setIsTargetAchieved(true);
      playDingSound();
      if (onTargetMatched) onTargetMatched();
    } else {
      setIsTargetAchieved(false);
    }
  };

  const handleReset = () => {
    playPopSound();
    triggerPlateBounce();
    setItemsOnScale([]);
    setIsTargetAchieved(false);
  };

  const handleDragStart = (e: React.DragEvent, item: WeightItem) => {
    setDraggedItem(item);
    e.dataTransfer.setData('text/plain', item.id);
    playPopSound();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropOnScale = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem) {
      addItemToScale(draggedItem);
      setDraggedItem(null);
    }
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
            <span className="text-xs font-bold text-[#4ECDC4]">Pengukuran Berat</span>
          </div>
          <p className="font-heading font-black text-base sm:text-lg text-[#2C3E50] leading-snug">
            "Jika kita menaruh 10 buku tulis (masing-masing 100 gram), berapa kilogram total beratnya di layar timbangan?"
          </p>
          <span className="text-[11px] font-bold text-slate-500 block mt-1">
            Konsep Satuan: <b>1.000 Gram (g) = 1 Kilogram (kg)</b>. Semakin banyak benda, angka gram semakin besar!
          </span>
        </div>
      </div>

      {/* Visual Header Banner (Ultra Minimal Text) */}
      <div className="bg-white border-2 border-[#2C3E50] rounded-3xl p-4 shadow-tactile-sm flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FFE66D] border-2 border-[#2C3E50] flex items-center justify-center shrink-0 shadow-tactile-sm">
            <Scale size={24} className="text-[#2C3E50]" />
          </div>
          <div>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-[#2C3E50]">{title}</h3>
            <span className="text-xs font-bold text-slate-500">{instructionText}</span>
          </div>
        </div>

        {targetWeight && (
          <div className="flex items-center gap-2 bg-[#FFE66D]/40 border-2 border-[#2C3E50] px-3.5 py-1.5 rounded-2xl shrink-0">
            <div>
              <span className="text-[10px] font-extrabold text-slate-500 uppercase block">Target</span>
              <span className="text-lg font-heading font-black text-[#2C3E50]">
                {targetWeight} g
              </span>
            </div>
            {isTargetAchieved ? (
              <span className="bg-emerald-500 text-white text-xs font-black px-2.5 py-1 rounded-xl animate-bounce">
                PAS! ✨
              </span>
            ) : totalWeight > targetWeight ? (
              <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-xl">
                +{totalWeight - targetWeight}g
              </span>
            ) : (
              <span className="text-xs font-bold text-slate-600 bg-white px-2 py-0.5 rounded-lg">
                -{targetWeight - totalWeight}g
              </span>
            )}
          </div>
        )}
      </div>

      {/* Main Digital Scale Visual Stage */}
      <div className="bg-[#FFFDF5] border-2 border-[#2C3E50] rounded-3xl p-5 sm:p-7 shadow-tactile flex flex-col items-center relative overflow-hidden">
        <GestureTutorial actionText="Tarik Benda ke Piring Timbangan" durationMs={3500} type="drag" />
        {/* SCALE TOP PLATE (DROP ZONE) */}
        <div className="w-full max-w-md flex flex-col items-center">
          <div
            onDragOver={handleDragOver}
            onDrop={handleDropOnScale}
            className={`w-72 sm:w-96 min-h-[140px] rounded-3xl border-4 border-[#2C3E50] bg-gradient-to-b from-[#E2E8F0] to-[#CBD5E1] shadow-md flex flex-wrap items-center justify-center gap-2 p-3 relative transition-transform duration-200 cursor-pointer ${
              isPlateBouncing ? 'translate-y-2 scale-[0.98]' : 'translate-y-0'
            }`}
          >
            {/* Empty plate hint */}
            {itemsOnScale.length === 0 ? (
              <span className="text-xs font-bold text-slate-400 select-none">
                Taruh Benda di Sini
              </span>
            ) : (
              <div className="flex flex-wrap items-end justify-center gap-2 py-1">
                {itemsOnScale.map((placed) => (
                  <div
                    key={placed.instanceId}
                    onClick={() => removeItemFromScale(placed.instanceId)}
                    title={`Hapus ${placed.item.name}`}
                    className="group relative flex flex-col items-center cursor-pointer transform hover:scale-110 active:scale-95 transition-transform"
                  >
                    <div className="bg-white border-2 border-[#2C3E50] rounded-2xl p-1.5 shadow-tactile-sm">
                      <ItemVector type={placed.item.iconType} size={40} />
                    </div>
                    <span className="text-[10px] font-black bg-[#2C3E50] text-white px-1.5 py-0.5 rounded-full mt-0.5">
                      {placed.item.weight}g
                    </span>
                    <div className="absolute -top-1 -right-1 bg-[#FF6B6B] text-white rounded-full p-0.5 border border-[#2C3E50] opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={12} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Stem connector */}
          <div className="w-16 h-7 bg-slate-300 border-x-4 border-[#2C3E50] -mt-1 flex flex-col justify-around py-0.5 items-center">
            <div className="w-10 h-1 bg-slate-400 rounded-full" />
            <div className="w-10 h-1 bg-slate-400 rounded-full" />
          </div>

          {/* DIGITAL SCALE BASE BODY */}
          <div className="w-80 sm:w-96 bg-white border-4 border-[#2C3E50] rounded-3xl p-5 shadow-tactile flex flex-col items-center -mt-1">
            {/* BIG LED / LCD DISPLAY BOX */}
            <div className="w-full bg-[#FFE66D] border-4 border-[#2C3E50] rounded-2xl p-4 shadow-inner flex flex-col items-center justify-center">
              <div className="flex items-baseline gap-2">
                <span className="digital-lcd-font text-5xl sm:text-6xl font-black text-[#2C3E50] tracking-wider tabular-nums">
                  {totalWeight}
                </span>
                <span className="font-heading font-black text-2xl sm:text-3xl text-[#2C3E50] uppercase">
                  Gram
                </span>
              </div>
            </div>

            {/* Scale Control: 1 Big Reset Button */}
            <div className="flex items-center justify-between w-full mt-4 gap-3">
              <button
                type="button"
                onClick={handleReset}
                disabled={itemsOnScale.length === 0}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border-2 border-[#2C3E50] font-heading font-black text-sm transition-all min-h-[52px] cursor-pointer ${
                  itemsOnScale.length === 0
                    ? 'bg-slate-100 text-slate-400 border-slate-300 cursor-not-allowed opacity-60'
                    : 'bg-[#FF6B6B] text-white hover:bg-[#ff5252] shadow-tactile-sm active:translate-y-0.5'
                }`}
              >
                <RotateCcw size={18} />
                Kosongkan
              </button>

              <span className="font-heading font-bold text-sm text-[#2C3E50] bg-slate-100 px-3 py-2.5 rounded-xl border border-slate-300">
                {itemsOnScale.length} Benda
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* TRAY OF DRAGGABLE ITEMS (VISUAL-FIRST) */}
      <div className="bg-white border-2 border-[#2C3E50] rounded-3xl p-4 sm:p-5 shadow-tactile-sm">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="font-heading text-sm font-bold text-[#2C3E50]">Pilih Benda:</span>
          <span className="text-[11px] font-bold text-slate-400">Tarik atau Ketuk (+)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {WEIGHT_ITEMS.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              onClick={() => addItemToScale(item)}
              title={item.name}
              className="bg-[#FFFDF5] border-2 border-[#2C3E50] rounded-2xl p-2.5 flex flex-col items-center justify-between text-center cursor-grab active:cursor-grabbing hover:bg-white hover:border-[#4ECDC4] shadow-tactile-sm transition-all transform hover:-translate-y-1 min-h-[130px]"
            >
              <ItemVector type={item.iconType} size={44} />

              <div className="w-full my-1">
                <span className="font-bold text-xs text-[#2C3E50] block truncate">{item.name}</span>
                <span className="text-[11px] font-black text-[#FF6B6B] bg-[#FFE66D] px-2 py-0.5 rounded-md border border-[#2C3E50] inline-block mt-0.5">
                  {item.weight}g
                </span>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  addItemToScale(item);
                }}
                className="w-full flex items-center justify-center gap-1 bg-[#4ECDC4] text-white text-[11px] font-bold py-1 rounded-xl border border-[#2C3E50] hover:bg-[#3DB8AF] cursor-pointer"
              >
                <Plus size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
