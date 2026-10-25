/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar, TabKey } from './components/Navbar';
import { MascotMimi } from './components/MascotMimi';
import { BgmFloatingControl } from './components/BgmFloatingControl';
import { OrientationWarning } from './components/OrientationWarning';
import { LengthComparator } from './components/LengthComparator';
import { BalanceScale } from './components/BalanceScale';
import { InteractiveDigitalScale } from './components/InteractiveDigitalScale';
import { TimeComparator } from './components/TimeComparator';
import { GameHub } from './components/GameHub';
import { ReflectionEvaluation } from './components/ReflectionEvaluation';
import { playPopSound, startBGM, stopBGM, getIsBgmPlaying } from './utils/audio';
import {
  Ruler,
  Scale,
  Clock,
  ArrowRight,
  Music,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [materiSubTab, setMateriSubTab] = useState<'panjang' | 'berat' | 'waktu'>('panjang');
  const [beratScaleType, setBeratScaleType] = useState<'digital' | 'jungkitan'>('digital');
  const [bgmActive, setBgmActive] = useState(false);

  const handleStartLearning = (subTab?: 'panjang' | 'berat' | 'waktu') => {
    playPopSound();
    if (subTab) {
      setMateriSubTab(subTab);
    }
    setActiveTab('materi');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleBgmFromHero = () => {
    playPopSound();
    if (getIsBgmPlaying()) {
      stopBGM();
      setBgmActive(false);
    } else {
      startBGM(0.24);
      setBgmActive(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-[#2C3E50] flex flex-col font-sans selection:bg-[#FFE66D]">
      {/* Mobile Orientation Warning (Prompts landscape on portrait phones) */}
      <OrientationWarning />

      {/* Floating Chill Background Music (BGM) Control Button at Top-Right */}
      <BgmFloatingControl />

      {/* Sticky Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-5 sm:py-7">
        {/* ======================================================== */}
        {/* TAB 1: MENU UTAMA (VISUAL-FIRST LANDING PAGE)            */}
        {/* ======================================================== */}
        {activeTab === 'home' && (
          <div className="flex flex-col gap-6 sm:gap-8 animate-fade-in">
            {/* HERO BANNER: Large Mascot + Big "MULAI" Button */}
            <div className="bg-white border-3 border-[#2C3E50] rounded-3xl p-6 sm:p-10 shadow-tactile relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
              {/* Soft decorative background circles */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFE66D]/25 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4ECDC4]/20 rounded-full blur-2xl pointer-events-none" />

              {/* Left Column: Title & 1 Big Action Button */}
              <div className="flex-1 flex flex-col items-start z-10 text-left">
                <span className="font-heading font-extrabold text-xs uppercase bg-[#FFE66D] border border-[#2C3E50] text-[#2C3E50] px-3 py-1 rounded-full shadow-sm mb-3">
                  Kelas 2 SD · Belajar Visual KGA
                </span>

                <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-[#2C3E50] leading-none tracking-tight">
                  Pengukuran <br />
                  <span className="text-[#FF6B6B]">Satuan</span>
                </h1>

                {/* 1 Big "MULAI" CTA + Audio Toggle */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleStartLearning('panjang')}
                    className="flex items-center gap-3 bg-[#FF6B6B] hover:bg-[#ff5252] text-white border-3 border-[#2C3E50] px-8 sm:px-10 py-4 rounded-2xl font-heading font-black text-xl sm:text-2xl shadow-tactile transition-transform hover:-translate-y-1 active:translate-y-0.5 cursor-pointer min-h-[58px]"
                  >
                    MULAI
                    <ArrowRight size={26} strokeWidth={3} />
                  </button>

                  <button
                    type="button"
                    onClick={handleToggleBgmFromHero}
                    className="flex items-center gap-2 bg-[#FFE66D] hover:bg-[#ffe043] text-[#2C3E50] border-2 border-[#2C3E50] px-4 py-4 rounded-2xl font-heading font-bold text-sm shadow-tactile-sm transition-transform active:scale-95 cursor-pointer min-h-[58px]"
                  >
                    <Music size={20} />
                    <span>{bgmActive ? 'Jeda Musik' : 'Putar Musik'}</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Large Mascot Mimi */}
              <div className="w-full md:w-auto flex justify-center z-10">
                <div className="bg-[#FFFDF5] border-3 border-[#2C3E50] rounded-3xl p-6 shadow-tactile-sm flex flex-col items-center">
                  <MascotMimi size="lg" showDialogue={false} expression="happy" />
                  <span className="font-heading font-black text-xl text-[#2C3E50] mt-3">
                    Halo, Teman!
                  </span>
                </div>
              </div>
            </div>

            {/* 3 VISUAL CATEGORY CARDS (PANJANG, BERAT, WAKTU) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* CARD 1: PANJANG */}
              <div
                onClick={() => handleStartLearning('panjang')}
                className="bg-white border-3 border-[#2C3E50] rounded-3xl p-5 shadow-tactile hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1.5 cursor-pointer flex flex-col items-center text-center justify-between group min-h-[210px]"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#FFE66D] border-3 border-[#2C3E50] flex items-center justify-center shadow-tactile-sm group-hover:rotate-6 transition-transform">
                  <Ruler size={36} className="text-[#2C3E50]" />
                </div>
                <div className="mt-2">
                  <h3 className="font-heading text-xl font-black text-[#2C3E50]">
                    Panjang
                  </h3>
                  <span className="text-xs font-bold text-[#FF6B6B] block mt-0.5">
                    Garis Kisi Acuan (cm)
                  </span>
                </div>
                <span className="mt-2 text-xs font-bold bg-slate-100 px-3 py-1 rounded-full text-slate-600">
                  Buka Modul →
                </span>
              </div>

              {/* CARD 2: BERAT */}
              <div
                onClick={() => handleStartLearning('berat')}
                className="bg-white border-3 border-[#2C3E50] rounded-3xl p-5 shadow-tactile hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1.5 cursor-pointer flex flex-col items-center text-center justify-between group min-h-[210px]"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#4ECDC4] border-3 border-[#2C3E50] flex items-center justify-center shadow-tactile-sm group-hover:rotate-6 transition-transform">
                  <Scale size={36} className="text-white" />
                </div>
                <div className="mt-2">
                  <h3 className="font-heading text-xl font-black text-[#2C3E50]">
                    Berat
                  </h3>
                  <span className="text-xs font-bold text-[#4ECDC4] block mt-0.5">
                    Gram (g) & Kg
                  </span>
                </div>
                <span className="mt-2 text-xs font-bold bg-[#FFE66D]/40 px-3 py-1 rounded-full text-[#2C3E50]">
                  Buka Modul →
                </span>
              </div>

              {/* CARD 3: WAKTU */}
              <div
                onClick={() => handleStartLearning('waktu')}
                className="bg-white border-3 border-[#2C3E50] rounded-3xl p-5 shadow-tactile hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1.5 cursor-pointer flex flex-col items-center text-center justify-between group min-h-[210px]"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#FF6B6B] border-3 border-[#2C3E50] flex items-center justify-center shadow-tactile-sm group-hover:rotate-6 transition-transform">
                  <Clock size={36} className="text-white" />
                </div>
                <div className="mt-2">
                  <h3 className="font-heading text-xl font-black text-[#2C3E50]">
                    Waktu
                  </h3>
                  <span className="text-xs font-bold text-[#FF6B6B] block mt-0.5">
                    Singkat / Lama
                  </span>
                </div>
                <span className="mt-2 text-xs font-bold bg-slate-100 px-3 py-1 rounded-full text-slate-600">
                  Buka Modul →
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: MATERI BELAJAR (VISUAL-ONLY INTERACTIVE MODULES)  */}
        {/* ======================================================== */}
        {activeTab === 'materi' && (
          <div className="flex flex-col gap-6 animate-fade-in">
            {/* SUB-TABS NAVIGATION BAR: 3 MODUL LENGKAP */}
            <div className="bg-white border-2 border-[#2C3E50] rounded-3xl p-2 shadow-tactile-sm flex items-center justify-between gap-2 overflow-x-auto">
              <button
                type="button"
                onClick={() => {
                  playPopSound();
                  setMateriSubTab('panjang');
                }}
                className={`flex-1 py-3 px-3 sm:px-4 rounded-2xl font-heading font-black text-xs sm:text-sm border-2 transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap min-h-[50px] ${
                  materiSubTab === 'panjang'
                    ? 'bg-[#FFE66D] border-[#2C3E50] text-[#2C3E50] shadow-tactile-sm'
                    : 'bg-transparent border-transparent text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Ruler size={18} />
                Panjang
              </button>

              <button
                type="button"
                onClick={() => {
                  playPopSound();
                  setMateriSubTab('berat');
                }}
                className={`flex-1 py-3 px-3 sm:px-4 rounded-2xl font-heading font-black text-xs sm:text-sm border-2 transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap min-h-[50px] ${
                  materiSubTab === 'berat'
                    ? 'bg-[#4ECDC4] border-[#2C3E50] text-white shadow-tactile-sm'
                    : 'bg-transparent border-transparent text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Scale size={18} />
                Berat
              </button>

              <button
                type="button"
                onClick={() => {
                  playPopSound();
                  setMateriSubTab('waktu');
                }}
                className={`flex-1 py-3 px-3 sm:px-4 rounded-2xl font-heading font-black text-xs sm:text-sm border-2 transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap min-h-[50px] ${
                  materiSubTab === 'waktu'
                    ? 'bg-[#FF6B6B] border-[#2C3E50] text-white shadow-tactile-sm'
                    : 'bg-transparent border-transparent text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Clock size={18} />
                Waktu
              </button>
            </div>

            {/* SUB-MODUL 1: PANJANG */}
            {materiSubTab === 'panjang' && <LengthComparator />}

            {/* SUB-MODUL 2: BERAT */}
            {materiSubTab === 'berat' && (
              <div className="flex flex-col gap-5">
                {/* Secondary toggle for Scale Type */}
                <div className="bg-[#FFFDF5] border-2 border-[#2C3E50] rounded-2xl p-1.5 flex items-center justify-center gap-2 max-w-sm mx-auto w-full shadow-tactile-sm">
                  <button
                    type="button"
                    onClick={() => {
                      playPopSound();
                      setBeratScaleType('digital');
                    }}
                    className={`flex-1 py-2 px-3 rounded-xl font-heading font-bold text-xs border transition-all cursor-pointer ${
                      beratScaleType === 'digital'
                        ? 'bg-[#2C3E50] text-[#FFE66D] border-[#2C3E50] shadow-sm'
                        : 'text-slate-600 border-transparent hover:bg-white'
                    }`}
                  >
                    Timbangan Digital
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playPopSound();
                      setBeratScaleType('jungkitan');
                    }}
                    className={`flex-1 py-2 px-3 rounded-xl font-heading font-bold text-xs border transition-all cursor-pointer ${
                      beratScaleType === 'jungkitan'
                        ? 'bg-[#2C3E50] text-[#FFE66D] border-[#2C3E50] shadow-sm'
                        : 'text-slate-600 border-transparent hover:bg-white'
                    }`}
                  >
                    Timbangan Jungkitan
                  </button>
                </div>

                {beratScaleType === 'digital' ? (
                  <InteractiveDigitalScale />
                ) : (
                  <BalanceScale />
                )}
              </div>
            )}

            {/* SUB-MODUL 3: WAKTU */}
            {materiSubTab === 'waktu' && <TimeComparator />}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: GAME INTERAKTIF (5 QUICK MINI GAMES)              */}
        {/* ======================================================== */}
        {activeTab === 'game' && (
          <GameHub
            onGoToMateri={() => setActiveTab('materi')}
          />
        )}

        {/* ======================================================== */}
        {/* TAB 4: REFLEKSI (EMOTION BUTTONS, QUESTIONS & RAPOR)     */}
        {/* ======================================================== */}
        {activeTab === 'refleksi' && <ReflectionEvaluation />}
      </main>

      {/* QUIET CLEAN FOOTER */}
      <footer className="mt-auto border-t-2 border-[#2C3E50]/10 bg-white py-4 px-4 text-center text-xs font-bold text-slate-400 no-print">
        Pengukuran Satuan · Matematika SD Kelas 2
      </footer>
    </div>
  );
}
