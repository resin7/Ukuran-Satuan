import React, { useState, useEffect } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';
import { startBGM, stopBGM, getIsBgmPlaying, playPopSound } from '../utils/audio';

export const BgmFloatingControl: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Sync initial state
    setIsPlaying(getIsBgmPlaying());
    return () => {
      stopBGM();
    };
  }, []);

  const toggleBGM = () => {
    playPopSound();
    if (isPlaying) {
      stopBGM();
      setIsPlaying(false);
    } else {
      const success = startBGM(0.24);
      if (success) {
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-40 flex items-center">
      <button
        type="button"
        onClick={toggleBGM}
        title={isPlaying ? 'Jeda Musik Santai' : 'Putar Musik Santai (Lo-fi Belajar)'}
        aria-label="Kontrol Musik Latar Belakang"
        className={`group flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl border-2 border-[#2C3E50] font-heading font-bold text-xs sm:text-sm shadow-tactile transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer ${
          isPlaying
            ? 'bg-[#FFE66D] text-[#2C3E50]'
            : 'bg-white/95 text-slate-600 hover:text-[#2C3E50]'
        }`}
      >
        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <div className="flex items-center gap-0.5">
              <span className="w-1 h-3 bg-[#2C3E50] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1 h-4 bg-[#2C3E50] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1 h-2.5 bg-[#2C3E50] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          ) : (
            <Music size={18} className="text-slate-500 group-hover:text-[#2C3E50]" />
          )}
        </div>

        <span className="whitespace-nowrap hidden sm:inline">
          {isPlaying ? 'Musik: On' : 'Musik: Off'}
        </span>

        {isPlaying ? (
          <Volume2 size={16} className="text-[#2C3E50] shrink-0" />
        ) : (
          <VolumeX size={16} className="text-slate-400 group-hover:text-slate-600 shrink-0" />
        )}
      </button>
    </div>
  );
};
