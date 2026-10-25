import React from 'react';
import { Home, BookOpen, Gamepad2, HeartHandshake } from 'lucide-react';
import { playPopSound } from '../utils/audio';

export type TabKey = 'home' | 'materi' | 'game' | 'refleksi';

interface NavbarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'home' as TabKey,
      label: 'Menu Utama',
      icon: Home,
      color: '#FF6B6B',
    },
    {
      id: 'materi' as TabKey,
      label: 'Materi Belajar',
      icon: BookOpen,
      color: '#4ECDC4',
    },
    {
      id: 'game' as TabKey,
      label: 'Game Interaktif',
      icon: Gamepad2,
      color: '#FFE66D',
    },
    {
      id: 'refleksi' as TabKey,
      label: 'Refleksi Diri',
      icon: HeartHandshake,
      color: '#FF6B6B',
    },
  ];

  const handleTabClick = (tabId: TabKey) => {
    playPopSound();
    onTabChange(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FFFDF5]/95 backdrop-blur-md border-b-2 border-[#2C3E50]/15 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between gap-3 sm:gap-4">
        {/* Brand Zone */}
        <button
          type="button"
          onClick={() => handleTabClick('home')}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
        >
          <div className="w-11 h-11 rounded-2xl bg-[#FFE66D] border-2 border-[#2C3E50] flex items-center justify-center shadow-tactile-sm group-hover:rotate-6 transition-transform">
            <span className="font-heading font-black text-xl text-[#2C3E50]">M</span>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-base sm:text-lg text-[#2C3E50] leading-none whitespace-nowrap">
              Pengukuran Satuan
            </span>
            <span className="text-[11px] font-bold text-[#FF6B6B] mt-0.5 whitespace-nowrap">
              Matematika Kelas 2 SD
            </span>
          </div>
        </button>

        {/* 4 Navigation Tabs */}
        <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl font-heading font-bold text-xs sm:text-sm border-2 transition-all whitespace-nowrap shrink-0 min-h-[44px] cursor-pointer ${
                  isActive
                    ? 'bg-[#2C3E50] text-[#FFFDF5] border-[#2C3E50] shadow-tactile-sm scale-[1.02]'
                    : 'bg-white/80 text-[#2C3E50] border-transparent hover:border-[#2C3E50]/30 hover:bg-white'
                }`}
              >
                <Icon
                  size={18}
                  className={isActive ? 'text-[#FFE66D]' : 'text-slate-600'}
                />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
