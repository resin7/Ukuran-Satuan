import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const BukuTulisIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="10" y="8" width="44" height="48" rx="5" fill="#4ECDC4" stroke="#2C3E50" strokeWidth="3" />
    <rect x="10" y="8" width="10" height="48" rx="2" fill="#3DB8AF" stroke="#2C3E50" strokeWidth="3" />
    <line x1="26" y1="20" x2="48" y2="20" stroke="#FFFDF5" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="26" y1="28" x2="48" y2="28" stroke="#FFFDF5" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="26" y1="36" x2="44" y2="36" stroke="#FFFDF5" strokeWidth="2.5" strokeLinecap="round" />
    <rect x="25" y="42" width="22" height="8" rx="2" fill="#FFFDF5" stroke="#2C3E50" strokeWidth="1.5" />
    <circle x="15" y="18" r="2" fill="#FFFDF5" />
    <circle x="15" y="32" r="2" fill="#FFFDF5" />
    <circle x="15" y="46" r="2" fill="#FFFDF5" />
  </svg>
);

export const BotolMinumIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="24" y="6" width="16" height="8" rx="3" fill="#FF6B6B" stroke="#2C3E50" strokeWidth="3" />
    <path d="M22 14 Q22 20 20 24 L20 54 Q20 58 24 58 L40 58 Q44 58 44 54 L44 24 Q42 20 42 14 Z" fill="#4ECDC4" stroke="#2C3E50" strokeWidth="3" />
    <path d="M20 34 Q32 38 44 34 L44 54 Q44 58 40 58 L24 58 Q20 58 20 54 Z" fill="#3DB8AF" />
    <line x1="24" y1="28" x2="28" y2="28" stroke="#FFFDF5" strokeWidth="2" strokeLinecap="round" />
    <line x1="24" y1="38" x2="30" y2="38" stroke="#FFFDF5" strokeWidth="2" strokeLinecap="round" />
    <line x1="24" y1="48" x2="28" y2="48" stroke="#FFFDF5" strokeWidth="2" strokeLinecap="round" />
    <path d="M22 20 Q12 28 16 38" stroke="#FFE66D" strokeWidth="3" strokeLinecap="round" fill="none" />
  </svg>
);

export const PenghapusIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g transform="rotate(-15 32 32)">
      <path d="M12 24 L32 14 L32 38 L12 48 Z" fill="#4ECDC4" stroke="#2C3E50" strokeWidth="3" strokeLinejoin="round" />
      <path d="M32 14 L52 24 L52 48 L32 38 Z" fill="#FF6B6B" stroke="#2C3E50" strokeWidth="3" strokeLinejoin="round" />
      <polygon points="12,24 32,14 52,24 32,34" fill="#FFE66D" stroke="#2C3E50" strokeWidth="2" />
      <line x1="36" y1="28" x2="48" y2="34" stroke="#FFFDF5" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);

export const KotakPensilIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="8" y="20" width="48" height="26" rx="6" fill="#FFE66D" stroke="#2C3E50" strokeWidth="3" />
    <line x1="8" y1="30" x2="56" y2="30" stroke="#2C3E50" strokeWidth="2.5" />
    <rect x="28" y="27" width="8" height="6" rx="2" fill="#FF6B6B" stroke="#2C3E50" strokeWidth="2" />
    <circle cx="18" cy="25" r="2" fill="#FF6B6B" />
    <circle cx="46" cy="25" r="2" fill="#4ECDC4" />
    <line x1="16" y1="38" x2="48" y2="38" stroke="#E0A96D" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ApelIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M32 18 Q34 10 38 8" stroke="#2C3E50" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M34 13 Q44 11 44 18 Q36 20 34 13 Z" fill="#4ECDC4" stroke="#2C3E50" strokeWidth="2" />
    <path
      d="M32 20 C22 14 12 24 14 38 C16 48 24 56 32 54 C40 56 48 48 50 38 C52 24 42 14 32 20 Z"
      fill="#FF6B6B"
      stroke="#2C3E50"
      strokeWidth="3"
    />
    <path d="M22 26 Q18 32 20 40" stroke="#FFFDF5" strokeWidth="3" strokeLinecap="round" fill="none" />
  </svg>
);

export const RautanIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="14" y="14" width="36" height="36" rx="6" fill="#4ECDC4" stroke="#2C3E50" strokeWidth="3" />
    <circle cx="32" cy="32" r="12" fill="#FFFDF5" stroke="#2C3E50" strokeWidth="2.5" />
    <rect x="26" y="24" width="12" height="16" fill="#E2E8F0" stroke="#2C3E50" strokeWidth="1.5" />
    <circle cx="32" cy="32" r="2" fill="#2C3E50" />
    <line x1="32" y1="20" x2="32" y2="24" stroke="#2C3E50" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const SemangkaIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Outer Green Rind */}
    <circle cx="32" cy="32" r="26" fill="#4ECDC4" stroke="#2C3E50" strokeWidth="3" />
    {/* Dark Green Stripes */}
    <path d="M32 6 Q20 32 32 58" stroke="#2C3E50" strokeWidth="2.5" fill="none" />
    <path d="M18 12 Q28 32 18 52" stroke="#2C3E50" strokeWidth="2.5" fill="none" />
    <path d="M46 12 Q36 32 46 52" stroke="#2C3E50" strokeWidth="2.5" fill="none" />
    {/* Slice accent on side */}
    <path d="M32 20 A12 12 0 0 1 44 32 L32 32 Z" fill="#FF6B6B" stroke="#2C3E50" strokeWidth="2" />
    <circle cx="36" cy="27" r="1" fill="#2C3E50" />
    <circle cx="40" cy="30" r="1" fill="#2C3E50" />
  </svg>
);

export const Pensil2BIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g transform="rotate(-30 32 32)">
      <rect x="26" y="6" width="12" height="10" rx="3" fill="#FF6B6B" stroke="#2C3E50" strokeWidth="2.5" />
      <rect x="25" y="14" width="14" height="5" fill="#E2E8F0" stroke="#2C3E50" strokeWidth="2" />
      <rect x="26" y="19" width="12" height="30" fill="#FFE66D" stroke="#2C3E50" strokeWidth="2.5" />
      <line x1="30" y1="19" x2="30" y2="49" stroke="#E0A96D" strokeWidth="1.5" />
      <polygon points="26,49 38,49 32,59" fill="#FFFDF5" stroke="#2C3E50" strokeWidth="2" />
      <polygon points="30,55 34,55 32,60" fill="#2C3E50" />
    </g>
  </svg>
);

export const KrayonIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g transform="rotate(25 32 32)">
      <rect x="26" y="14" width="12" height="38" rx="2" fill="#FF6B6B" stroke="#2C3E50" strokeWidth="2.5" />
      <rect x="25" y="22" width="14" height="22" fill="#FFFDF5" stroke="#2C3E50" strokeWidth="2" />
      <line x1="25" y1="28" x2="39" y2="28" stroke="#FF6B6B" strokeWidth="2" />
      <line x1="25" y1="36" x2="39" y2="36" stroke="#4ECDC4" strokeWidth="2" />
      <polygon points="26,14 38,14 32,6" fill="#FF6B6B" stroke="#2C3E50" strokeWidth="2.5" />
    </g>
  </svg>
);

export const PenggarisIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="6" y="24" width="52" height="16" rx="3" fill="#E0A96D" stroke="#2C3E50" strokeWidth="2.5" />
    {[12, 18, 24, 30, 36, 42, 48].map((x, idx) => (
      <line
        key={idx}
        x1={x}
        y1={24}
        x2={x}
        y2={idx % 2 === 0 ? 32 : 28}
        stroke="#2C3E50"
        strokeWidth={idx % 2 === 0 ? 2 : 1.5}
      />
    ))}
    <circle cx="10" cy="32" r="2" fill="#2C3E50" />
  </svg>
);

export const SapuIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g transform="rotate(-20 32 32)">
      <rect x="30" y="4" width="4" height="38" rx="2" fill="#E0A96D" stroke="#2C3E50" strokeWidth="2" />
      <rect x="25" y="40" width="14" height="6" rx="2" fill="#FF6B6B" stroke="#2C3E50" strokeWidth="2" />
      <polygon points="23,46 41,46 46,60 18,60" fill="#FFE66D" stroke="#2C3E50" strokeWidth="2.5" />
      <line x1="24" y1="46" x2="22" y2="60" stroke="#2C3E50" strokeWidth="1.5" />
      <line x1="32" y1="46" x2="32" y2="60" stroke="#2C3E50" strokeWidth="1.5" />
      <line x1="40" y1="46" x2="42" y2="60" stroke="#2C3E50" strokeWidth="1.5" />
    </g>
  </svg>
);

export const PitaIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10 32 Q22 18 32 32 T54 32" stroke="#FF6B6B" strokeWidth="8" strokeLinecap="round" fill="none" />
    <path d="M10 32 Q22 18 32 32 T54 32" stroke="#FFFDF5" strokeWidth="3" strokeLinecap="round" fill="none" />
  </svg>
);

export const CuciTanganIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="32" cy="32" r="26" fill="#4ECDC4" opacity="0.2" />
    <path d="M32 10 Q38 18 32 24 Q26 18 32 10 Z" fill="#4ECDC4" stroke="#2C3E50" strokeWidth="2" />
    <circle cx="44" cy="20" r="3" fill="#3DB8AF" />
    <circle cx="20" cy="22" r="3" fill="#3DB8AF" />
    <rect x="22" y="28" width="20" height="24" rx="6" fill="#FFFDF5" stroke="#2C3E50" strokeWidth="2.5" />
    <circle cx="30" cy="34" r="4" fill="#FFE66D" stroke="#2C3E50" strokeWidth="1.5" />
    <circle cx="36" cy="38" r="3" fill="#FFFDF5" stroke="#2C3E50" strokeWidth="1.5" />
  </svg>
);

export const SikatGigiIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g transform="rotate(45 32 32)">
      {/* Handle */}
      <rect x="29" y="8" width="6" height="38" rx="3" fill="#4ECDC4" stroke="#2C3E50" strokeWidth="2.5" />
      {/* Bristles base */}
      <rect x="27" y="42" width="10" height="14" rx="2" fill="#FFE66D" stroke="#2C3E50" strokeWidth="2" />
      {/* Toothpaste blob */}
      <circle cx="32" cy="46" r="3" fill="#FF6B6B" />
    </g>
  </svg>
);

export const UpacaraBenderaIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Flagpole */}
    <line x1="16" y1="8" x2="16" y2="56" stroke="#2C3E50" strokeWidth="3" strokeLinecap="round" />
    <circle cx="16" cy="8" r="2.5" fill="#FFE66D" />
    {/* Indonesian Flag: Red top, White bottom */}
    <path d="M18 10 L48 10 Q42 16 48 22 L18 22 Z" fill="#FF6B6B" stroke="#2C3E50" strokeWidth="2" />
    <path d="M18 22 L48 22 Q42 28 48 34 L18 34 Z" fill="#FFFDF5" stroke="#2C3E50" strokeWidth="2" />
    {/* Pedestal */}
    <rect x="10" y="54" width="12" height="4" rx="2" fill="#2C3E50" />
  </svg>
);

export const MandiIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M14 16 L28 16 Q36 16 36 24 L36 30" stroke="#2C3E50" strokeWidth="3" fill="none" strokeLinecap="round" />
    <ellipse cx="36" cy="30" rx="14" ry="4" fill="#FFE66D" stroke="#2C3E50" strokeWidth="2.5" />
    <line x1="28" y1="34" x2="24" y2="52" stroke="#4ECDC4" strokeWidth="2.5" strokeDasharray="3 3" />
    <line x1="33" y1="34" x2="32" y2="54" stroke="#4ECDC4" strokeWidth="2.5" strokeDasharray="3 3" />
    <line x1="39" y1="34" x2="40" y2="54" stroke="#4ECDC4" strokeWidth="2.5" strokeDasharray="3 3" />
    <line x1="44" y1="34" x2="48" y2="52" stroke="#4ECDC4" strokeWidth="2.5" strokeDasharray="3 3" />
    <rect x="16" y="44" width="14" height="8" rx="4" fill="#FF6B6B" stroke="#2C3E50" strokeWidth="2" />
  </svg>
);

export const BerkedipIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="32" cy="32" r="26" fill="#FFE66D" opacity="0.25" />
    <path d="M16 34 Q32 46 48 34" stroke="#2C3E50" strokeWidth="4" strokeLinecap="round" fill="none" />
    <line x1="22" y1="38" x2="18" y2="44" stroke="#2C3E50" strokeWidth="3" strokeLinecap="round" />
    <line x1="32" y1="40" x2="32" y2="48" stroke="#2C3E50" strokeWidth="3" strokeLinecap="round" />
    <line x1="42" y1="38" x2="46" y2="44" stroke="#2C3E50" strokeWidth="3" strokeLinecap="round" />
    <path d="M48 20 L56 16" stroke="#FF6B6B" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M52 26 L58 28" stroke="#FF6B6B" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const MembacaIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M32 46 C24 42 16 44 8 46 L8 22 C16 20 24 22 32 26 C40 22 48 20 56 22 L56 46 C48 44 40 42 32 46 Z" fill="#FFFDF5" stroke="#2C3E50" strokeWidth="3" />
    <line x1="32" y1="26" x2="32" y2="46" stroke="#2C3E50" strokeWidth="3" />
    <line x1="14" y1="28" x2="26" y2="30" stroke="#4ECDC4" strokeWidth="2" strokeLinecap="round" />
    <line x1="14" y1="34" x2="24" y2="36" stroke="#4ECDC4" strokeWidth="2" strokeLinecap="round" />
    <line x1="38" y1="30" x2="50" y2="28" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" />
    <line x1="40" y1="36" x2="50" y2="34" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const MenyanyiIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="26" y="12" width="12" height="20" rx="6" fill="#FF6B6B" stroke="#2C3E50" strokeWidth="2.5" />
    <path d="M20 24 Q20 38 32 38 Q44 38 44 24" stroke="#2C3E50" strokeWidth="3" fill="none" strokeLinecap="round" />
    <line x1="32" y1="38" x2="32" y2="50" stroke="#2C3E50" strokeWidth="3" />
    <line x1="24" y1="50" x2="40" y2="50" stroke="#2C3E50" strokeWidth="3" strokeLinecap="round" />
    <circle cx="50" cy="18" r="3" fill="#FFE66D" stroke="#2C3E50" strokeWidth="1.5" />
    <line x1="53" y1="18" x2="53" y2="8" stroke="#2C3E50" strokeWidth="2" />
    <line x1="53" y1="8" x2="58" y2="10" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const SekolahIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <polygon points="32,10 6,26 58,26" fill="#FF6B6B" stroke="#2C3E50" strokeWidth="3" strokeLinejoin="round" />
    <rect x="12" y="26" width="40" height="28" fill="#FFFDF5" stroke="#2C3E50" strokeWidth="3" />
    <rect x="27" y="38" width="10" height="16" rx="2" fill="#4ECDC4" stroke="#2C3E50" strokeWidth="2" />
    <rect x="16" y="32" width="6" height="8" rx="1" fill="#FFE66D" stroke="#2C3E50" strokeWidth="1.5" />
    <rect x="42" y="32" width="6" height="8" rx="1" fill="#FFE66D" stroke="#2C3E50" strokeWidth="1.5" />
    <line x1="32" y1="10" x2="32" y2="4" stroke="#2C3E50" strokeWidth="2" />
    <polygon points="32,4 40,7 32,10" fill="#FF6B6B" />
  </svg>
);

export const TaliSepatuIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10 44 L16 30 Q24 28 32 30 L44 34 Q54 36 56 46 L10 46 Z" fill="#4ECDC4" stroke="#2C3E50" strokeWidth="2.5" />
    <rect x="8" y="46" width="50" height="8" rx="3" fill="#FFFDF5" stroke="#2C3E50" strokeWidth="2.5" />
    <line x1="24" y1="30" x2="32" y2="36" stroke="#FFE66D" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="32" y1="30" x2="24" y2="36" stroke="#FFE66D" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="28" cy="26" r="3" fill="#FF6B6B" stroke="#2C3E50" strokeWidth="1.5" />
  </svg>
);

export const TidurIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="8" y="34" width="48" height="20" rx="4" fill="#4ECDC4" stroke="#2C3E50" strokeWidth="2.5" />
    <rect x="10" y="24" width="16" height="12" rx="4" fill="#FFFDF5" stroke="#2C3E50" strokeWidth="2" />
    <rect x="22" y="30" width="34" height="20" rx="3" fill="#FFE66D" stroke="#2C3E50" strokeWidth="2" />
    <path d="M46 10 A6 6 0 0 0 54 18 A7 7 0 1 1 46 10 Z" fill="#FFE66D" stroke="#2C3E50" strokeWidth="1.5" />
    <text x="36" y="16" fill="#2C3E50" fontSize="12" fontWeight="bold">z</text>
    <text x="40" y="10" fill="#2C3E50" fontSize="10" fontWeight="bold">z</text>
  </svg>
);

export const ItemVector: React.FC<{ type: string; size?: number; className?: string }> = ({
  type,
  size = 48,
  className = '',
}) => {
  switch (type) {
    case 'buku':
      return <BukuTulisIcon size={size} className={className} />;
    case 'botol':
      return <BotolMinumIcon size={size} className={className} />;
    case 'penghapus':
      return <PenghapusIcon size={size} className={className} />;
    case 'kotakPensil':
      return <KotakPensilIcon size={size} className={className} />;
    case 'apel':
      return <ApelIcon size={size} className={className} />;
    case 'rautan':
      return <RautanIcon size={size} className={className} />;
    case 'semangka':
      return <SemangkaIcon size={size} className={className} />;
    case 'pensil':
      return <Pensil2BIcon size={size} className={className} />;
    case 'krayon':
      return <KrayonIcon size={size} className={className} />;
    case 'penggaris':
      return <PenggarisIcon size={size} className={className} />;
    case 'sapu':
      return <SapuIcon size={size} className={className} />;
    case 'penghapusKecil':
      return <PenghapusIcon size={size} className={className} />;
    case 'pita':
      return <PitaIcon size={size} className={className} />;
    case 'cuciTangan':
      return <CuciTanganIcon size={size} className={className} />;
    case 'sikatGigi':
      return <SikatGigiIcon size={size} className={className} />;
    case 'upacara':
      return <UpacaraBenderaIcon size={size} className={className} />;
    case 'mandi':
      return <MandiIcon size={size} className={className} />;
    case 'berkedip':
      return <BerkedipIcon size={size} className={className} />;
    case 'membaca':
      return <MembacaIcon size={size} className={className} />;
    case 'menyanyi':
      return <MenyanyiIcon size={size} className={className} />;
    case 'sekolah':
      return <SekolahIcon size={size} className={className} />;
    case 'taliSepatu':
      return <TaliSepatuIcon size={size} className={className} />;
    case 'tidur':
      return <TidurIcon size={size} className={className} />;
    default:
      return <BukuTulisIcon size={size} className={className} />;
  }
};
