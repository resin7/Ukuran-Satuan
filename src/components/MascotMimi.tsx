import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { playPopSound, playDingSound } from '../utils/audio';

interface MascotMimiProps {
  dialogue?: string;
  size?: 'sm' | 'md' | 'lg';
  showDialogue?: boolean;
  className?: string;
  expression?: 'happy' | 'thinking' | 'celebrate';
}

const CHEER_WORDS = ['Kuk-kuk! ✨', 'Semangat! 🦉', 'Kamu Pintar! ⭐', 'Ayo Belajar! 🎉'];

export const MascotMimi: React.FC<MascotMimiProps> = ({
  dialogue,
  size = 'md',
  showDialogue = true,
  className = '',
  expression = 'happy',
}) => {
  const [isExcited, setIsExcited] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [cheerBubble, setCheerBubble] = useState<string | null>(null);

  const handleMascotClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExcited(true);
    playPopSound();
    playDingSound();

    const randomWord = CHEER_WORDS[Math.floor(Math.random() * CHEER_WORDS.length)];
    setCheerBubble(randomWord);

    // Mini playful confetti burst around Mimi
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 25,
      spread: 45,
      origin: { x, y },
      colors: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A86F44'],
      scalar: 0.8,
    });

    setTimeout(() => {
      setIsExcited(false);
      setCheerBubble(null);
    }, 900);
  };

  const dimensions = {
    sm: { width: 68, height: 68, imgSize: 'w-16 h-16' },
    md: { width: 108, height: 108, imgSize: 'w-24 h-24 sm:w-28 sm:h-28' },
    lg: { width: 148, height: 148, imgSize: 'w-32 h-32 sm:w-36 sm:h-36' },
  };

  return (
    <div className={`flex flex-col sm:flex-row items-center gap-3 sm:gap-4 ${className}`}>
      {/* Mimi Owl Character */}
      <div
        onClick={handleMascotClick}
        title="Klik Mimi si Burung Hantu!"
        className="cursor-pointer relative transform transition-transform duration-150 hover:scale-105 active:scale-90 active:-rotate-6 group shrink-0 select-none"
      >
        {/* Floating cheer speech pop-up when clicked */}
        {cheerBubble && (
          <div className="absolute -top-7 inset-x-0 mx-auto w-max z-30 bg-[#FFE66D] border-2 border-[#2C3E50] text-[#2C3E50] text-[11px] font-heading font-black px-2.5 py-0.5 rounded-full shadow-tactile-sm animate-bounce whitespace-nowrap">
            {cheerBubble}
          </div>
        )}

        {/* Visual Reference Mascot or Fallback Vector */}
        {!imgError ? (
          <div
            className={`relative rounded-3xl overflow-hidden bg-amber-50 border-3 border-[#2C3E50] shadow-tactile-sm flex items-center justify-center p-1 transition-all duration-300 ${
              dimensions[size].imgSize
            } ${
              isExcited
                ? 'animate-mascot-cheer ring-4 ring-[#FFE66D] shadow-xl'
                : 'hover:border-[#FF6B6B]'
            }`}
          >
            <img
              src="/assets/aistudio/11_219e3d89.jpg"
              alt="Mimi si Burung Hantu Berkacamata"
              onError={() => setImgError(true)}
              className={`w-full h-full object-contain select-none transition-transform duration-300 ${
                isExcited ? 'animate-mascot-cheer scale-110' : 'group-hover:scale-105'
              }`}
              draggable={false}
            />
          </div>
        ) : (
          /* High-Fidelity SVG Fallback matching the reference owl */
          <svg
            width={dimensions[size].width}
            height={dimensions[size].height}
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-md select-none"
          >
            {/* Owl Feathery Side Tufts (Owl Tuft, not cat ears) */}
            <path
              d="M32 46 C20 40 18 24 34 26 C28 32 30 38 42 42 Z"
              fill="#9C6644"
              stroke="#2C3E50"
              strokeWidth="3"
            />
            <path
              d="M128 46 C140 40 142 24 126 26 C132 32 130 38 118 42 Z"
              fill="#9C6644"
              stroke="#2C3E50"
              strokeWidth="3"
            />

            {/* Owl Body - Caramel Brown */}
            <ellipse cx="80" cy="94" rx="56" ry="52" fill="#A86F44" stroke="#2C3E50" strokeWidth="4" />

            {/* Scalloped Beige Belly */}
            <ellipse cx="80" cy="106" rx="36" ry="32" fill="#EAD7C3" stroke="#2C3E50" strokeWidth="3" />
            <path d="M68 96 Q80 104 92 96" stroke="#CBB399" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M66 108 Q80 116 94 108" stroke="#CBB399" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M72 120 Q80 126 88 120" stroke="#CBB399" strokeWidth="3" strokeLinecap="round" fill="none" />

            {/* Wings folded on sides */}
            <ellipse
              cx="26"
              cy="95"
              rx="12"
              ry="28"
              fill="#8C5833"
              stroke="#2C3E50"
              strokeWidth="3.5"
              transform="rotate(10 26 95)"
            />
            <ellipse
              cx="134"
              cy="95"
              rx="12"
              ry="28"
              fill="#8C5833"
              stroke="#2C3E50"
              strokeWidth="3.5"
              transform="rotate(-10 134 95)"
            />

            {/* Orange Feet */}
            <ellipse cx="64" cy="146" rx="10" ry="6" fill="#F77F00" stroke="#2C3E50" strokeWidth="3" />
            <ellipse cx="96" cy="146" rx="10" ry="6" fill="#F77F00" stroke="#2C3E50" strokeWidth="3" />

            {/* Big Round Glasses (Black Rims) */}
            <circle cx="56" cy="68" r="24" fill="#FFFFFF" stroke="#2C3E50" strokeWidth="5" />
            <circle cx="104" cy="68" r="24" fill="#FFFFFF" stroke="#2C3E50" strokeWidth="5" />
            {/* Glasses Bridge */}
            <line x1="78" y1="68" x2="82" y2="68" stroke="#2C3E50" strokeWidth="5" strokeLinecap="round" />

            {/* Eyes */}
            {isExcited ? (
              <>
                <path d="M44 70 Q56 56 68 70" stroke="#2C3E50" strokeWidth="5" strokeLinecap="round" fill="none" />
                <path d="M92 70 Q104 56 116 70" stroke="#2C3E50" strokeWidth="5" strokeLinecap="round" fill="none" />
              </>
            ) : expression === 'celebrate' ? (
              <>
                <path d="M46 70 Q56 58 66 70" stroke="#2C3E50" strokeWidth="5" strokeLinecap="round" fill="none" />
                <path d="M94 70 Q104 58 114 70" stroke="#2C3E50" strokeWidth="5" strokeLinecap="round" fill="none" />
              </>
            ) : (
              <>
                {/* Big cute pupils with double light catchers */}
                <circle cx="56" cy="68" r="12" fill="#2C3E50" />
                <circle cx="52" cy="64" r="4.5" fill="#FFFFFF" />
                <circle cx="61" cy="73" r="2" fill="#FFFFFF" />

                <circle cx="104" cy="68" r="12" fill="#2C3E50" />
                <circle cx="100" cy="64" r="4.5" fill="#FFFFFF" />
                <circle cx="109" cy="73" r="2" fill="#FFFFFF" />
              </>
            )}

            {/* Cute Orange Beak */}
            <polygon points="80,74 72,88 88,88" fill="#F77F00" stroke="#2C3E50" strokeWidth="3" strokeLinejoin="round" />
          </svg>
        )}

        {/* Small floating spark/heart badge */}
        <div className="absolute -top-1.5 -right-1.5 bg-[#FFE66D] border-2 border-[#2C3E50] rounded-full p-1 shadow-sm group-hover:rotate-12 transition-transform">
          {isExcited ? (
            <Heart size={14} className="text-[#FF6B6B] fill-[#FF6B6B]" />
          ) : (
            <Sparkles size={14} className="text-[#2C3E50]" />
          )}
        </div>
      </div>

      {/* Dialogue Speech Bubble (Visual-First, Clean, No TTS button) */}
      {showDialogue && dialogue && (
        <div className="relative bg-white border-2 border-[#2C3E50] rounded-3xl p-4 shadow-tactile-sm max-w-md text-left flex items-start gap-3">
          {/* Speech bubble pointer */}
          <div className="hidden sm:block absolute top-6 -left-3 w-4 h-4 bg-white border-l-2 border-b-2 border-[#2C3E50] transform rotate-45" />

          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="font-heading text-sm font-bold text-[#FF6B6B]">Mimi</span>
              <span className="text-[11px] bg-[#FFE66D] text-[#2C3E50] font-black px-2 py-0.5 rounded-full border border-[#2C3E50]/20">
                Teman Belajar
              </span>
            </div>
            <p className="text-sm font-bold text-[#2C3E50] leading-snug">
              {dialogue}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
