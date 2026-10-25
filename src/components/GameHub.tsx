import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { InteractiveDigitalScale } from './InteractiveDigitalScale';
import { ItemVector } from './ItemVectorIcons';
import { GestureTutorial } from './GestureTutorial';
import { WEIGHT_ITEMS, WeightItem } from '../data/items';
import {
  playSuccessFanfare,
  playGentleBoing,
  playPopSound,
  playDingSound,
  playDropSound,
} from '../utils/audio';
import {
  Star,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Ruler,
  Clock,
  Layers,
  Scale,
  ChefHat,
  MoveHorizontal,
  HelpCircle,
  GraduationCap,
} from 'lucide-react';

interface GameHubProps {
  onGoToMateri: () => void;
}

type MiniGameType = 'koki' | 'detektif' | 'keranjang' | 'urutkan' | 'keseimbangan';

export const GameHub: React.FC<GameHubProps> = () => {
  const [activeGame, setActiveGame] = useState<MiniGameType>('koki');

  /* -------------------------------------------------------------------------- */
  /* GAME 1: TARGET TIMBANGAN DIGITAL                                           */
  /* -------------------------------------------------------------------------- */
  const RECIPES = [
    { id: 1, target: 350, title: 'Target: 350 Gram' },
    { id: 2, target: 270, title: 'Target: 270 Gram' },
    { id: 3, target: 170, title: 'Target: 170 Gram' },
  ];
  const [recipeIdx, setRecipeIdx] = useState(0);
  const [recipeSolved, setRecipeSolved] = useState(false);

  const currentRecipe = RECIPES[recipeIdx];

  const handleRecipeMatched = () => {
    setRecipeSolved(true);
    playSuccessFanfare();
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
  };

  const handleNextRecipe = () => {
    playPopSound();
    if (recipeIdx < RECIPES.length - 1) {
      setRecipeIdx((prev) => prev + 1);
      setRecipeSolved(false);
    } else {
      setRecipeIdx(0);
      setRecipeSolved(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /* GAME 2: DETEKTIF PENGGARIS + PROGRESSIVE HINT                              */
  /* -------------------------------------------------------------------------- */
  const DETECTIVE_CASES = [
    {
      id: 1,
      itemA: { name: 'Pensil Kayu', lengthCm: 14, startPosCm: 5, icon: 'pensil' },
      itemB: { name: 'Krayon', lengthCm: 9, startPosCm: 8, icon: 'krayon' },
      prompt: 'Mana yang Lebih Panjang?',
      correctItem: 'A' as const,
    },
    {
      id: 2,
      itemA: { name: 'Penghapus Papan', lengthCm: 11, startPosCm: 3, icon: 'penghapusKecil' },
      itemB: { name: 'Penggaris', lengthCm: 20, startPosCm: 7, icon: 'penggaris' },
      prompt: 'Mana yang Lebih Panjang?',
      correctItem: 'B' as const,
    },
  ];
  const [detectiveIdx, setDetectiveIdx] = useState(0);
  const [rulerOffsetCm, setRulerOffsetCm] = useState(0);
  const [selectedDetectiveAnswer, setSelectedDetectiveAnswer] = useState<'A' | 'B' | null>(null);
  const [detectiveWrongTries, setDetectiveWrongTries] = useState(0);

  const detectiveCase = DETECTIVE_CASES[detectiveIdx];
  const showDetectiveHint = detectiveWrongTries >= 2;

  const handleDetectiveAnswer = (choice: 'A' | 'B') => {
    if (selectedDetectiveAnswer !== null) return;
    if (choice === detectiveCase.correctItem) {
      setSelectedDetectiveAnswer(choice);
      playDingSound();
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } else {
      playGentleBoing();
      setDetectiveWrongTries((prev) => prev + 1);
    }
  };

  const handleNextDetective = () => {
    playPopSound();
    setDetectiveWrongTries(0);
    setSelectedDetectiveAnswer(null);
    setRulerOffsetCm(0);
    if (detectiveIdx < DETECTIVE_CASES.length - 1) {
      setDetectiveIdx((prev) => prev + 1);
    } else {
      setDetectiveIdx(0);
    }
  };

  /* -------------------------------------------------------------------------- */
  /* GAME 3: KERANJANG WAKTU + PROGRESSIVE HINT                                 */
  /* -------------------------------------------------------------------------- */
  const [basketItems, setBasketItems] = useState([
    { id: '1', title: 'Berkedip', duration: '1 Detik', type: 'singkat' as const, iconType: 'berkedip', placed: 'pool' as 'pool' | 'singkat' | 'lama' },
    { id: '2', title: 'Cuci Tangan', duration: '20 Detik', type: 'singkat' as const, iconType: 'cuciTangan', placed: 'pool' as 'pool' | 'singkat' | 'lama' },
    { id: '3', title: 'Tidur Malam', duration: '8 Jam', type: 'lama' as const, iconType: 'tidur', placed: 'pool' as 'pool' | 'singkat' | 'lama' },
    { id: '4', title: 'Belajar di Kelas', duration: '5 Jam', type: 'lama' as const, iconType: 'sekolah', placed: 'pool' as 'pool' | 'singkat' | 'lama' },
  ]);
  const [draggedBasketCardId, setDraggedBasketCardId] = useState<string | null>(null);
  const [basketWrongCount, setBasketWrongCount] = useState(0);

  const moveBasketItem = (cardId: string, destination: 'singkat' | 'lama') => {
    const item = basketItems.find((i) => i.id === cardId);
    if (!item) return;

    if (item.type === destination) {
      playDingSound();
      setBasketItems((prev) =>
        prev.map((i) => (i.id === cardId ? { ...i, placed: destination } : i))
      );
    } else {
      playGentleBoing();
      setBasketWrongCount((prev) => prev + 1);
    }
  };

  const poolBasketItems = basketItems.filter((i) => i.placed === 'pool');
  const singkatBasketItems = basketItems.filter((i) => i.placed === 'singkat');
  const lamaBasketItems = basketItems.filter((i) => i.placed === 'lama');

  const resetBasketGame = () => {
    playPopSound();
    setBasketItems((prev) => prev.map((i) => ({ ...i, placed: 'pool' })));
    setBasketWrongCount(0);
  };

  /* -------------------------------------------------------------------------- */
  /* GAME 4: URUTKAN BENDA + PROGRESSIVE HINT                                   */
  /* -------------------------------------------------------------------------- */
  const ORDER_ITEMS_POOL: WeightItem[] = [
    WEIGHT_ITEMS.find((w) => w.id === 'penghapus')!,     // 20g
    WEIGHT_ITEMS.find((w) => w.id === 'buku-tulis')!,   // 100g
    WEIGHT_ITEMS.find((w) => w.id === 'kotak-pensil')!, // 150g
    WEIGHT_ITEMS.find((w) => w.id === 'botol-minum')!,  // 250g
  ];

  const [orderSlots, setOrderSlots] = useState<(WeightItem | null)[]>([null, null, null, null]);
  const [availableOrderItems, setAvailableOrderItems] = useState<WeightItem[]>([
    ORDER_ITEMS_POOL[2],
    ORDER_ITEMS_POOL[0],
    ORDER_ITEMS_POOL[3],
    ORDER_ITEMS_POOL[1],
  ]);
  const [orderStatus, setOrderStatus] = useState<string | null>(null);
  const [orderFailCount, setOrderFailCount] = useState(0);

  const placeItemInSlot = (item: WeightItem, slotIdx: number) => {
    playDropSound();
    const newSlots = [...orderSlots];
    const prev = newSlots[slotIdx];
    newSlots[slotIdx] = item;
    setOrderSlots(newSlots);

    let updated = availableOrderItems.filter((i) => i.id !== item.id);
    if (prev) updated.push(prev);
    setAvailableOrderItems(updated);
    setOrderStatus(null);
  };

  const removeItemFromSlot = (slotIdx: number) => {
    const item = orderSlots[slotIdx];
    if (!item) return;
    playPopSound();

    const newSlots = [...orderSlots];
    newSlots[slotIdx] = null;
    setOrderSlots(newSlots);
    setAvailableOrderItems([...availableOrderItems, item]);
    setOrderStatus(null);
  };

  const checkOrdering = () => {
    playPopSound();
    if (orderSlots.some((s) => s === null)) {
      setOrderStatus('Isi Semua Kotak Terlebih Dahulu');
      return;
    }
    const weights = orderSlots.map((s) => s!.weight);
    const ok = weights[0] <= weights[1] && weights[1] <= weights[2] && weights[2] <= weights[3];
    if (ok) {
      playSuccessFanfare();
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      setOrderStatus('Hebat! Urutan Sangat Tepat! 🎉');
    } else {
      playGentleBoing();
      setOrderFailCount((prev) => prev + 1);
      setOrderStatus('Belum Pas, Coba Urutkan Lagi! 💡');
    }
  };

  const resetOrdering = () => {
    playPopSound();
    setOrderSlots([null, null, null, null]);
    setAvailableOrderItems([
      ORDER_ITEMS_POOL[2],
      ORDER_ITEMS_POOL[0],
      ORDER_ITEMS_POOL[3],
      ORDER_ITEMS_POOL[1],
    ]);
    setOrderStatus(null);
    setOrderFailCount(0);
  };

  /* -------------------------------------------------------------------------- */
  /* GAME 5: TIMBANGAN JUNGKITAN KESEIMBANGAN                                   */
  /* -------------------------------------------------------------------------- */
  const PUZZLE_LEVELS = [
    {
      id: 1,
      targetLeftWeight: 270,
      leftItems: [
        WEIGHT_ITEMS.find((w) => w.id === 'botol-minum')!,
        WEIGHT_ITEMS.find((w) => w.id === 'penghapus')!,
      ],
      title: 'Target: 270g',
    },
    {
      id: 2,
      targetLeftWeight: 250,
      leftItems: [
        WEIGHT_ITEMS.find((w) => w.id === 'botol-minum')!,
      ],
      title: 'Target: 250g',
    },
  ];

  const [puzzleLevelIdx, setPuzzleLevelIdx] = useState(0);
  const currentPuzzle = PUZZLE_LEVELS[puzzleLevelIdx];
  const [puzzleRightItems, setPuzzleRightItems] = useState<{ id: string; item: WeightItem }[]>([]);
  const puzzleRightWeight = puzzleRightItems.reduce((acc, curr) => acc + curr.item.weight, 0);

  const puzzleDiff = puzzleRightWeight - currentPuzzle.targetLeftWeight;
  let puzzleTilt = 0;
  if (puzzleDiff > 0) puzzleTilt = Math.min(15, 6);
  if (puzzleDiff < 0) puzzleTilt = Math.max(-15, -6);
  const isPuzzleBalanced = puzzleDiff === 0 && puzzleRightItems.length > 0;

  const addPuzzleItemRight = (item: WeightItem) => {
    playDropSound();
    const entry = { id: `${item.id}-${Date.now()}`, item };
    const next = [...puzzleRightItems, entry];
    setPuzzleRightItems(next);
    if (next.reduce((a, c) => a + c.item.weight, 0) === currentPuzzle.targetLeftWeight) {
      playSuccessFanfare();
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    }
  };

  const removePuzzleItemRight = (id: string) => {
    playPopSound();
    setPuzzleRightItems(puzzleRightItems.filter((i) => i.id !== id));
  };

  const resetPuzzle = () => {
    playPopSound();
    setPuzzleRightItems([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-5">
      {/* 5 MINI-GAMES SELECTOR (ICON & SHORT TITLE) */}
      <div className="bg-white border-2 border-[#2C3E50] rounded-3xl p-2 shadow-tactile-sm">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
          <button
            type="button"
            onClick={() => {
              playPopSound();
              setActiveGame('koki');
            }}
            className={`p-2.5 rounded-2xl font-heading font-black text-xs border-2 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer min-h-[58px] ${
              activeGame === 'koki'
                ? 'bg-[#FF6B6B] text-white border-[#2C3E50] shadow-tactile-sm'
                : 'bg-[#FFFDF5] text-[#2C3E50] border-transparent hover:border-slate-300'
            }`}
          >
            <ChefHat size={20} />
            <span>1. Timbangan</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playPopSound();
              setActiveGame('detektif');
            }}
            className={`p-2.5 rounded-2xl font-heading font-black text-xs border-2 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer min-h-[58px] ${
              activeGame === 'detektif'
                ? 'bg-[#4ECDC4] text-white border-[#2C3E50] shadow-tactile-sm'
                : 'bg-[#FFFDF5] text-[#2C3E50] border-transparent hover:border-slate-300'
            }`}
          >
            <Ruler size={20} />
            <span>2. Penggaris</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playPopSound();
              setActiveGame('keranjang');
            }}
            className={`p-2.5 rounded-2xl font-heading font-black text-xs border-2 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer min-h-[58px] ${
              activeGame === 'keranjang'
                ? 'bg-[#FFE66D] text-[#2C3E50] border-[#2C3E50] shadow-tactile-sm'
                : 'bg-[#FFFDF5] text-[#2C3E50] border-transparent hover:border-slate-300'
            }`}
          >
            <Clock size={20} />
            <span>3. Keranjang</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playPopSound();
              setActiveGame('urutkan');
            }}
            className={`p-2.5 rounded-2xl font-heading font-black text-xs border-2 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer min-h-[58px] ${
              activeGame === 'urutkan'
                ? 'bg-[#2C3E50] text-[#FFE66D] border-[#2C3E50] shadow-tactile-sm'
                : 'bg-[#FFFDF5] text-[#2C3E50] border-transparent hover:border-slate-300'
            }`}
          >
            <Layers size={20} />
            <span>4. Urutkan</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playPopSound();
              setActiveGame('keseimbangan');
            }}
            className={`p-2.5 rounded-2xl font-heading font-black text-xs border-2 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer min-h-[58px] col-span-2 sm:col-span-1 ${
              activeGame === 'keseimbangan'
                ? 'bg-[#FF6B6B] text-white border-[#2C3E50] shadow-tactile-sm'
                : 'bg-[#FFFDF5] text-[#2C3E50] border-transparent hover:border-slate-300'
            }`}
          >
            <Scale size={20} />
            <span>5. Jungkitan</span>
          </button>
        </div>
      </div>

      {/* 1. TIMBANGAN DIGITAL TARGET */}
      {activeGame === 'koki' && (
        <div className="flex flex-col gap-4 animate-fade-in relative">
          <GestureTutorial actionText="Tarik Benda Pas dengan Target" durationMs={3500} type="drag" />
          {recipeSolved && (
            <div className="bg-[#4ECDC4] text-white p-3 rounded-2xl border-2 border-[#2C3E50] flex items-center justify-between font-heading font-black text-sm">
              <span>Hebat! Target Pas! 🎉</span>
              <button
                type="button"
                onClick={handleNextRecipe}
                className="bg-[#FFE66D] text-[#2C3E50] px-3.5 py-1.5 rounded-xl cursor-pointer font-bold"
              >
                Lanjut →
              </button>
            </div>
          )}
          <InteractiveDigitalScale
            key={`koki-${currentRecipe.id}`}
            targetWeight={currentRecipe.target}
            onTargetMatched={handleRecipeMatched}
            title={currentRecipe.title}
            instructionText="Tarik benda sampai pas!"
          />
        </div>
      )}

      {/* 2. PENGGARIS + PROGRESSIVE HINT */}
      {activeGame === 'detektif' && (
        <div className="flex flex-col gap-4 animate-fade-in relative">
          <GestureTutorial actionText="Geser Penggaris & Tentukan Pilihan" durationMs={3500} type="drag" />
          <div className="bg-white border-2 border-[#2C3E50] rounded-3xl p-4 shadow-tactile-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-heading text-lg font-black text-[#2C3E50]">
                {detectiveCase.prompt}
              </h3>
              {showDetectiveHint && (
                <span className="text-[10px] font-black bg-[#FFE66D] text-[#2C3E50] border border-[#2C3E50] px-2 py-0.5 rounded-full animate-pulse flex items-center gap-1">
                  <HelpCircle size={12} />
                  Petunjuk Nyala
                </span>
              )}
            </div>

            {selectedDetectiveAnswer && (
              <button
                type="button"
                onClick={handleNextDetective}
                className="bg-[#FF6B6B] text-white px-4 py-1.5 rounded-xl font-heading font-bold text-xs cursor-pointer shadow-sm"
              >
                Lanjut →
              </button>
            )}
          </div>

          <div className="bg-white border-3 border-[#2C3E50] rounded-3xl p-5 shadow-tactile flex flex-col gap-4 overflow-x-auto min-w-[360px]">
            {/* Object A */}
            <div className="flex items-center gap-3">
              <span className="w-16 text-right font-black text-xs">Benda A</span>
              <div className="flex-1 relative h-12 bg-slate-50 rounded-xl border border-slate-200">
                <div
                  style={{
                    left: `${detectiveCase.itemA.startPosCm * 16}px`,
                    width: `${detectiveCase.itemA.lengthCm * 16}px`,
                  }}
                  className="absolute top-1 bottom-1 bg-[#FFE66D] border-2 border-[#2C3E50] rounded-xl flex items-center justify-between px-2"
                >
                  <ItemVector type={detectiveCase.itemA.icon} size={28} />
                </div>
              </div>
            </div>

            {/* Object B */}
            <div className="flex items-center gap-3">
              <span className="w-16 text-right font-black text-xs">Benda B</span>
              <div className="flex-1 relative h-12 bg-slate-50 rounded-xl border border-slate-200">
                <div
                  style={{
                    left: `${detectiveCase.itemB.startPosCm * 16}px`,
                    width: `${detectiveCase.itemB.lengthCm * 16}px`,
                  }}
                  className="absolute top-1 bottom-1 bg-[#4ECDC4] border-2 border-[#2C3E50] rounded-xl flex items-center justify-between px-2"
                >
                  <ItemVector type={detectiveCase.itemB.icon} size={28} />
                </div>
              </div>
            </div>

            {/* Virtual Ruler */}
            <div className="flex items-center gap-3 pt-2 border-t border-slate-200">
              <span className="w-16 text-right text-xs font-bold text-[#FF6B6B]">Penggaris:</span>
              <div className="flex-1 relative h-12 bg-amber-50 rounded-xl border-2 border-[#2C3E50] overflow-hidden">
                <div
                  style={{ transform: `translateX(${rulerOffsetCm * 16}px)` }}
                  className="absolute inset-y-0 flex items-center"
                >
                  {Array.from({ length: 28 }).map((_, i) => (
                    <div
                      key={i}
                      style={{ width: '16px' }}
                      className="h-full border-r border-[#2C3E50] flex flex-col justify-between p-0.5 text-[8px] font-bold select-none"
                    >
                      <span>{i}</span>
                      <div className="w-0.5 h-2 bg-[#2C3E50] mx-auto" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Slider */}
            <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-xl border">
              <MoveHorizontal size={18} className="text-[#FF6B6B]" />
              <input
                type="range"
                min="-6"
                max="16"
                value={rulerOffsetCm}
                onChange={(e) => setRulerOffsetCm(Number(e.target.value))}
                className="w-full accent-[#FF6B6B] cursor-pointer"
              />
            </div>

            {/* 2 Buttons with Progressive Visual Hint */}
            <div className="grid grid-cols-2 gap-3 mt-1">
              <button
                type="button"
                onClick={() => handleDetectiveAnswer('A')}
                className={`p-3 bg-[#FFE66D] border-2 border-[#2C3E50] rounded-2xl font-heading font-black text-sm cursor-pointer shadow-tactile-sm transition-all ${
                  showDetectiveHint && detectiveCase.correctItem === 'A'
                    ? 'ring-4 ring-amber-400 animate-pulse scale-[1.02]'
                    : ''
                }`}
              >
                Pilih Benda A
              </button>
              <button
                type="button"
                onClick={() => handleDetectiveAnswer('B')}
                className={`p-3 bg-[#4ECDC4] text-white border-2 border-[#2C3E50] rounded-2xl font-heading font-black text-sm cursor-pointer shadow-tactile-sm transition-all ${
                  showDetectiveHint && detectiveCase.correctItem === 'B'
                    ? 'ring-4 ring-[#FFE66D] animate-pulse scale-[1.02]'
                    : ''
                }`}
              >
                Pilih Benda B
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. KERANJANG WAKTU + PROGRESSIVE HINT */}
      {activeGame === 'keranjang' && (
        <div className="flex flex-col gap-4 animate-fade-in relative">
          <GestureTutorial actionText="Pilah Kartu ke Keranjang" durationMs={3500} type="drag" />
          <div className="flex justify-between items-center bg-white p-3 rounded-2xl border-2 border-[#2C3E50]">
            <span className="font-heading font-black text-sm">Pilah Kartu Waktu:</span>
            <button
              type="button"
              onClick={resetBasketGame}
              className="text-xs font-bold bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-xl cursor-pointer"
            >
              Reset
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Basket Singkat */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (draggedBasketCardId) moveBasketItem(draggedBasketCardId, 'singkat');
              }}
              className={`bg-white border-3 border-[#4ECDC4] rounded-3xl p-4 shadow-tactile min-h-[160px] flex flex-col transition-all ${
                basketWrongCount >= 2 ? 'ring-4 ring-[#4ECDC4]/50' : ''
              }`}
            >
              <span className="font-heading font-black text-xs uppercase bg-[#4ECDC4] text-white px-2 py-0.5 rounded-full text-center">
                Cepat ⚡ (Detik / Menit)
              </span>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {singkatBasketItems.map((item) => (
                  <span key={item.id} className="text-xs font-black bg-[#FFFDF5] border border-[#2C3E50] px-2 py-1 rounded-xl">
                    {item.title}
                  </span>
                ))}
              </div>
            </div>

            {/* Basket Lama */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (draggedBasketCardId) moveBasketItem(draggedBasketCardId, 'lama');
              }}
              className={`bg-white border-3 border-[#FF6B6B] rounded-3xl p-4 shadow-tactile min-h-[160px] flex flex-col transition-all ${
                basketWrongCount >= 2 ? 'ring-4 ring-[#FF6B6B]/50' : ''
              }`}
            >
              <span className="font-heading font-black text-xs uppercase bg-[#FF6B6B] text-white px-2 py-0.5 rounded-full text-center">
                Lama ⏳ (Jam / Hari)
              </span>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {lamaBasketItems.map((item) => (
                  <span key={item.id} className="text-xs font-black bg-[#FFFDF5] border border-[#2C3E50] px-2 py-1 rounded-xl">
                    {item.title}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Unsorted Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {poolBasketItems.map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={() => setDraggedBasketCardId(item.id)}
                className="bg-white border-2 border-[#2C3E50] rounded-2xl p-2.5 flex flex-col items-center justify-between text-center shadow-tactile-sm"
              >
                <ItemVector type={item.iconType} size={36} />
                <span className="font-heading font-black text-xs mt-1">{item.title}</span>
                <div className="flex gap-1 w-full mt-2">
                  <button
                    type="button"
                    onClick={() => moveBasketItem(item.id, 'singkat')}
                    className="flex-1 bg-[#4ECDC4] text-white text-[10px] font-black py-1 rounded-lg cursor-pointer"
                  >
                    Cepat
                  </button>
                  <button
                    type="button"
                    onClick={() => moveBasketItem(item.id, 'lama')}
                    className="flex-1 bg-[#FF6B6B] text-white text-[10px] font-black py-1 rounded-lg cursor-pointer"
                  >
                    Lama
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. URUTKAN BENDA + PROGRESSIVE HINT */}
      {activeGame === 'urutkan' && (
        <div className="flex flex-col gap-4 animate-fade-in relative">
          <GestureTutorial actionText="Ketuk Nomor Slot untuk Mengurutkan" durationMs={3500} type="tap" />
          <div className="flex justify-between items-center bg-white p-3 rounded-2xl border-2 border-[#2C3E50]">
            <span className="font-heading font-black text-sm">Urutkan: Terringan ➔ Terberat</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={checkOrdering}
                className="bg-[#4ECDC4] text-white text-xs font-black px-3 py-1 rounded-xl cursor-pointer"
              >
                Periksa
              </button>
              <button
                type="button"
                onClick={resetOrdering}
                className="bg-slate-100 text-xs font-bold px-3 py-1 rounded-xl cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>

          {/* 4 Slots */}
          <div className="grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((slotIdx) => {
              const item = orderSlots[slotIdx];
              const isHintSlot = orderFailCount >= 2 && slotIdx === 0 && !item;

              return (
                <div
                  key={slotIdx}
                  onClick={() => item && removeItemFromSlot(slotIdx)}
                  className={`min-h-[120px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-2 cursor-pointer transition-all ${
                    item
                      ? 'bg-white border-[#2C3E50]'
                      : isHintSlot
                      ? 'bg-amber-50 border-amber-400 ring-4 ring-[#FFE66D] animate-pulse'
                      : 'bg-slate-50 border-slate-300'
                  }`}
                >
                  <span className="text-[10px] font-black text-slate-400">#{slotIdx + 1}</span>
                  {item ? (
                    <>
                      <ItemVector type={item.iconType} size={32} />
                      <span className="text-[10px] font-black text-[#FF6B6B] mt-1">{item.weight}g</span>
                    </>
                  ) : (
                    <span className="text-[10px] text-slate-300 font-bold">
                      {isHintSlot ? 'Mulai di Sini' : 'Kosong'}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {orderStatus && (
            <div className="p-2.5 bg-white border border-[#2C3E50] rounded-xl text-center font-black text-xs text-[#2C3E50]">
              {orderStatus}
            </div>
          )}

          {/* Available Items */}
          <div className="grid grid-cols-4 gap-2">
            {availableOrderItems.map((item) => {
              const isLightestHint = orderFailCount >= 2 && item.weight === 20;

              return (
                <div
                  key={item.id}
                  className={`bg-white border-2 border-[#2C3E50] rounded-2xl p-2 flex flex-col items-center shadow-sm transition-all ${
                    isLightestHint ? 'ring-4 ring-[#FFE66D] animate-pulse' : ''
                  }`}
                >
                  <ItemVector type={item.iconType} size={32} />
                  <span className="text-[10px] font-bold text-[#FF6B6B] my-0.5">{item.weight}g</span>
                  <div className="flex gap-1 w-full mt-1">
                    {[0, 1, 2, 3].map((slotIdx) => (
                      <button
                        key={slotIdx}
                        type="button"
                        onClick={() => placeItemInSlot(item, slotIdx)}
                        className="flex-1 bg-[#FFE66D] text-[9px] font-black py-0.5 rounded cursor-pointer border"
                      >
                        #{slotIdx + 1}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. TIMBANGAN JUNGKITAN */}
      {activeGame === 'keseimbangan' && (
        <div className="flex flex-col gap-4 animate-fade-in relative">
          <GestureTutorial actionText="Ketuk Benda untuk Mengimbangi Timbangan" durationMs={3500} type="tap" />
          <div className="flex justify-between items-center bg-white p-3 rounded-2xl border-2 border-[#2C3E50]">
            <span className="font-heading font-black text-sm">
              {isPuzzleBalanced ? 'Seimbang! ⭐' : 'Buat Timbangan Seimbang'}
            </span>
            <button
              type="button"
              onClick={resetPuzzle}
              className="text-xs font-bold bg-slate-100 px-3 py-1 rounded-xl cursor-pointer"
            >
              Reset
            </button>
          </div>

          <div className="bg-[#FFFDF5] border-2 border-[#2C3E50] rounded-3xl p-5 shadow-tactile flex flex-col items-center">
            {/* Seesaw */}
            <div
              className="w-full max-w-sm relative transition-transform duration-500 flex justify-between items-center my-4"
              style={{ transform: `rotate(${puzzleTilt}deg)` }}
            >
              <div className="absolute inset-x-0 h-3 bg-[#E0A96D] border border-[#2C3E50] rounded-full" />

              {/* Left Pan */}
              <div className="relative -top-2 flex flex-col items-center">
                <div className="w-28 min-h-[60px] bg-[#4ECDC4] border-2 border-[#2C3E50] rounded-2xl p-1.5 flex flex-wrap items-center justify-center gap-1">
                  {currentPuzzle.leftItems.map((item, idx) => (
                    <div key={idx} className="bg-white border rounded-lg p-0.5">
                      <ItemVector type={item.iconType} size={22} />
                    </div>
                  ))}
                </div>
                <span className="text-[10px] font-black bg-[#2C3E50] text-white px-2 py-0.5 rounded-full mt-1">
                  {currentPuzzle.targetLeftWeight}g
                </span>
              </div>

              {/* Right Pan */}
              <div className="relative -top-2 flex flex-col items-center">
                <div className="w-28 min-h-[60px] bg-[#FFE66D] border-2 border-[#2C3E50] rounded-2xl p-1.5 flex flex-wrap items-center justify-center gap-1">
                  {puzzleRightItems.map((entry) => (
                    <div
                      key={entry.id}
                      onClick={() => removePuzzleItemRight(entry.id)}
                      className="bg-white border rounded-lg p-0.5 cursor-pointer"
                    >
                      <ItemVector type={entry.item.iconType} size={22} />
                    </div>
                  ))}
                </div>
                <span className="text-[10px] font-black bg-[#2C3E50] text-white px-2 py-0.5 rounded-full mt-1">
                  {puzzleRightWeight}g
                </span>
              </div>
            </div>

            {/* Fulcrum */}
            <div className="w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[32px] border-b-[#2C3E50]" />
          </div>

          {/* Add items to right */}
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {WEIGHT_ITEMS.filter((w) => w.weight < 500).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => addPuzzleItemRight(item)}
                className="bg-white border-2 border-[#2C3E50] rounded-2xl p-2 flex flex-col items-center cursor-pointer shadow-sm active:scale-95"
              >
                <ItemVector type={item.iconType} size={30} />
                <span className="text-[10px] font-black text-[#FF6B6B] mt-0.5">{item.weight}g</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
