import React, { useState, useEffect } from 'react';
import { Smartphone, RotateCw, X } from 'lucide-react';
import { playPopSound } from '../utils/audio';

export const OrientationWarning: React.FC = () => {
  const [isPortraitMobile, setIsPortraitMobile] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      // Check if mobile/tablet screen and portrait
      const isMobileWidth = window.innerWidth <= 768;
      const isPortrait = window.innerHeight > window.innerWidth;
      setIsPortraitMobile(isMobileWidth && isPortrait);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  if (!isPortraitMobile || dismissed) {
    return null;
  }

  return (
    <aside
      aria-label="Saran Rotasi Layar"
      className="fixed bottom-4 left-4 right-4 z-50 sm:hidden animate-bounce-subtle pointer-events-auto"
    >
      <div className="bg-[#2C3E50] text-[#FFFDF5] border-2 border-[#FFE66D] rounded-2xl p-3.5 shadow-tactile flex items-center justify-between gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#FFE66D] text-[#2C3E50] flex items-center justify-center shrink-0">
          <RotateCw size={22} className="animate-spin-slow" />
        </div>

        <div className="flex-1 text-left">
          <p className="font-heading font-black text-xs text-[#FFE66D]">
            Putar Layar ke Mendatar (Landscape)
          </p>
          <p className="text-[11px] text-slate-200 mt-0.5">
            Timbangan & penggaris lebih lega dan nyaman dimainkan!
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            playPopSound();
            setDismissed(true);
          }}
          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors shrink-0"
          title="Tutup saran"
          aria-label="Tutup saran rotasi layar"
        >
          <X size={16} />
        </button>
      </div>
    </aside>
  );
};
