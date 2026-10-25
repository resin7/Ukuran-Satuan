import React, { useState, useEffect } from 'react';
import { Hand } from 'lucide-react';

interface GestureTutorialProps {
  actionText?: string;
  durationMs?: number;
  type?: 'drag' | 'tap';
}

export const GestureTutorial: React.FC<GestureTutorialProps> = ({
  actionText = 'Sentuh & Tarik Benda',
  durationMs = 4000,
  type = 'drag',
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, durationMs);

    return () => clearTimeout(timer);
  }, [durationMs]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-3 flex justify-center z-30 transition-opacity duration-700 animate-fade-in"
    >
      <div className="bg-[#2C3E50]/90 text-[#FFFDF5] backdrop-blur-sm border-2 border-[#FFE66D] px-4 py-2 rounded-full shadow-tactile-sm flex items-center gap-2.5">
        <div
          className={
            type === 'drag'
              ? 'animate-pulse text-[#FFE66D] transform -rotate-12 translate-x-1'
              : 'animate-bounce text-[#FFE66D]'
          }
        >
          <Hand size={18} className="text-[#FFE66D]" />
        </div>
        <span className="font-heading font-black text-xs text-[#FFFDF5] tracking-wide">
          {actionText}
        </span>
      </div>
    </div>
  );
};
