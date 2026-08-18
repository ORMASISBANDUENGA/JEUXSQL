import React, { useState, useEffect } from 'react';
import { Sparkles, Database, Play, ChevronRight, Terminal, Award, Shield, CheckCircle2, Zap } from 'lucide-react';
import { TRANSLATIONS } from '../i18n/translations';
import { Language } from '../types';
import { sound } from '../game/sound';

interface SplashScreenProps {
  language: Language;
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ language, onFinish }) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.fr;
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const loadingSteps = [
    'Chargement du moteur relationnel SQL...',
    'Initialisation des bases E-Commerce, Université & Aventure...',
    'Génération des défis, mini-jeux et Boss légendaires...',
    'Optimisation PWA & Cache local...',
    'Arène SQL prête pour l\'exploration !'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 4;
        const currentNext = next > 100 ? 100 : next;
        
        // Update step text based on progress
        const step = Math.min(
          loadingSteps.length - 1,
          Math.floor((currentNext / 100) * loadingSteps.length)
        );
        setStepIndex(step);

        return currentNext;
      });
    }, 90);

    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    sound.playLevelUp();
    onFinish();
  };

  return (
    <div
      id="splash-screen-container"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070814] text-white overflow-hidden p-4 select-none"
    >
      {/* Background Animated Grid & Glow Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#15193d_1px,transparent_1px),linear-gradient(to_bottom,#15193d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

      {/* Radiant Background Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#6C63FF]/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#00D4FF]/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Main Container */}
      <div className="relative z-10 max-w-xl w-full flex flex-col items-center text-center">
        
        {/* Creator Badge Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121633] border border-[#2f3875] shadow-lg mb-6 transform transition-all hover:scale-105">
          <Sparkles className="w-3.5 h-3.5 text-[#00D4FF]" />
          <span className="text-[11px] font-medium text-slate-300 tracking-wider">
            Présenté par <strong className="text-white font-extrabold tracking-widest text-[#00D4FF]">OROMASIS BANDUENGA</strong>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </div>

        {/* Hero Logo Emblem */}
        <div className="relative mb-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-[#6C63FF] via-[#00D4FF] to-[#00E676] p-1 shadow-[0_0_50px_rgba(108,99,255,0.4)] animate-bounce duration-1000">
            <div className="w-full h-full bg-[#0b0e24] rounded-[22px] flex items-center justify-center">
              <Database className="w-12 h-12 sm:w-14 sm:h-14 text-[#00D4FF]" />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center text-xs shadow-md border-2 border-[#0b0e24]">
            ⚡
          </div>
        </div>

        {/* Title & Tagline */}
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-2">
          SQL <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#6C63FF] to-[#00E676]">QUEST</span> ARENA
        </h1>
        
        <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed mb-6 font-medium">
          {t.splashTagline}
        </p>

        {/* Key Features Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full max-w-lg mb-8 text-left">
          <div className="p-2.5 rounded-xl bg-[#11142e] border border-[#262c5b] flex items-center gap-2.5">
            <Terminal className="w-4 h-4 text-[#00D4FF] shrink-0" />
            <span className="text-[11px] text-slate-300 font-medium">SQL 100% Interactif</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#11142e] border border-[#262c5b] flex items-center gap-2.5">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-[11px] text-slate-300 font-medium">Hors-ligne & PWA</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#11142e] border border-[#262c5b] flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-[#00E676] shrink-0" />
            <span className="text-[11px] text-slate-300 font-medium">XP, Niveaux & Boss</span>
          </div>
        </div>

        {/* Loading Progress or Start Button */}
        <div className="w-full max-w-md">
          {!isReady ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="truncate max-w-[280px] text-left text-slate-300">
                  {loadingSteps[stepIndex]}
                </span>
                <span className="text-[#00D4FF] font-bold">{progress}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-[#171b3d] border border-[#2c3570] overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#6C63FF] via-[#00D4FF] to-[#00E676] transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                id="splash-enter-btn"
                onClick={handleStart}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#6C63FF] via-[#00D4FF] to-[#00E676] hover:brightness-110 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,212,255,0.4)] transition-all transform hover:scale-105 active:scale-95"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{t.splashEnter}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Quick Skip Link */}
          <div className="mt-4">
            <button
              onClick={handleStart}
              className="text-xs text-slate-400 hover:text-slate-200 transition-colors underline-offset-4 hover:underline"
            >
              {t.splashSkip}
            </button>
          </div>
        </div>

        {/* Creator Signature in Splash */}
        <div className="mt-8 text-center text-[11px] text-slate-400 font-mono">
          © {new Date().getFullYear()} SQL QUEST &bull; Réalisé avec passion par <span className="text-slate-300 font-semibold">OROMASIS BANDUENGA</span>
        </div>

      </div>
    </div>
  );
};
