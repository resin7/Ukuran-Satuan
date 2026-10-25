import React from 'react';

interface AlligatorComparisonCardProps {
  valueA: number;
  valueB: number;
  unit?: string;
  labelA?: string;
  labelB?: string;
  className?: string;
}

export const AlligatorComparisonCard: React.FC<AlligatorComparisonCardProps> = ({
  valueA,
  valueB,
  unit = '',
  labelA = 'Benda A',
  labelB = 'Benda B',
  className = '',
}) => {
  const isGreater = valueA > valueB;
  const isLess = valueA < valueB;
  const isEqual = valueA === valueB;

  const symbol = isGreater ? '>' : isLess ? '<' : '=';
  const explanation = isGreater
    ? `${labelA} Lebih Besar dari ${labelB}`
    : isLess
    ? `${labelA} Lebih Kecil dari ${labelB}`
    : `${labelA} Sama Dengan ${labelB}`;

  return (
    <div
      className={`bg-white border-2 border-[#2C3E50] rounded-2xl p-3 shadow-tactile-sm flex flex-col items-center gap-2 ${className}`}
    >
      <div className="flex items-center justify-center gap-3 sm:gap-6 w-full">
        {/* Value A Badge */}
        <div className="flex flex-col items-center bg-[#FFFDF5] border-2 border-[#2C3E50] rounded-xl px-3 py-1.5 min-w-[70px]">
          <span className="text-[10px] font-bold text-slate-500 truncate max-w-[80px]">
            {labelA}
          </span>
          <span className="font-heading font-black text-base text-[#2C3E50]">
            {valueA} {unit}
          </span>
        </div>

        {/* Alligator Symbol Visual Box */}
        <div className="flex flex-col items-center">
          <div className="relative w-14 h-12 bg-[#FFE66D] border-2 border-[#2C3E50] rounded-xl flex items-center justify-center shadow-sm">
            {/* Friendly Alligator SVG */}
            <svg width="44" height="34" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              {isGreater ? (
                /* Alligator mouth opens to LEFT (A is bigger, so >) */
                <g>
                  {/* Green head */}
                  <path
                    d="M10 8 L48 20 L10 32 Z"
                    fill="#4ECDC4"
                    stroke="#2C3E50"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  {/* Cute teeth */}
                  <polygon points="14,10 18,16 22,12 26,17 30,14" fill="#FFFDF5" stroke="#2C3E50" strokeWidth="1.5" />
                  <polygon points="14,30 18,24 22,28 26,23 30,26" fill="#FFFDF5" stroke="#2C3E50" strokeWidth="1.5" />
                  {/* Eye with black pupil */}
                  <circle cx="42" cy="14" r="5" fill="#FFFDF5" stroke="#2C3E50" strokeWidth="2" />
                  <circle cx="43" cy="14" r="2.5" fill="#2C3E50" />
                </g>
              ) : isLess ? (
                /* Alligator mouth opens to RIGHT (B is bigger, so <) */
                <g>
                  {/* Green head */}
                  <path
                    d="M50 8 L12 20 L50 32 Z"
                    fill="#4ECDC4"
                    stroke="#2C3E50"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  {/* Cute teeth */}
                  <polygon points="46,10 42,16 38,12 34,17 30,14" fill="#FFFDF5" stroke="#2C3E50" strokeWidth="1.5" />
                  <polygon points="46,30 42,24 38,28 34,23 30,26" fill="#FFFDF5" stroke="#2C3E50" strokeWidth="1.5" />
                  {/* Eye with black pupil */}
                  <circle cx="18" cy="14" r="5" fill="#FFFDF5" stroke="#2C3E50" strokeWidth="2" />
                  <circle cx="17" cy="14" r="2.5" fill="#2C3E50" />
                </g>
              ) : (
                /* Equal (=) Alligator Jaws Parallel */
                <g>
                  <rect x="8" y="10" width="44" height="7" rx="3" fill="#4ECDC4" stroke="#2C3E50" strokeWidth="2" />
                  <rect x="8" y="23" width="44" height="7" rx="3" fill="#4ECDC4" stroke="#2C3E50" strokeWidth="2" />
                  {/* Eyes */}
                  <circle cx="44" cy="8" r="4" fill="#FFFDF5" stroke="#2C3E50" strokeWidth="1.5" />
                  <circle cx="45" cy="8" r="2" fill="#2C3E50" />
                </g>
              )}
            </svg>
          </div>
          <span className="font-heading font-black text-sm text-[#FF6B6B] mt-0.5">
            Simbol: {symbol}
          </span>
        </div>

        {/* Value B Badge */}
        <div className="flex flex-col items-center bg-[#FFFDF5] border-2 border-[#2C3E50] rounded-xl px-3 py-1.5 min-w-[70px]">
          <span className="text-[10px] font-bold text-slate-500 truncate max-w-[80px]">
            {labelB}
          </span>
          <span className="font-heading font-black text-base text-[#2C3E50]">
            {valueB} {unit}
          </span>
        </div>
      </div>

      <div className="bg-[#FFFDF5] border border-[#2C3E50]/20 px-3 py-1 rounded-full text-center">
        <span className="font-bold text-[11px] text-[#2C3E50]">
          {explanation} (Capit Buaya Memakan Nilai Besar!)
        </span>
      </div>
    </div>
  );
};
