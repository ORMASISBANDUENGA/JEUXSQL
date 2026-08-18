import React, { useState } from 'react';
import { Sparkles, Flame, Heart, Volume2, VolumeX, Shield, Award, Sun, Moon, Globe, Download, PlayCircle, QrCode } from 'lucide-react';
import { PlayerProfile, Language, ThemeMode } from '../types';
import { getRankForLevel, getXpRequiredForLevel } from '../game/ranks';
import { sound } from '../game/sound';
import { TRANSLATIONS } from '../i18n/translations';

interface NavbarProps {
  profile: PlayerProfile;
  language: Language;
  themeMode: ThemeMode;
  onToggleSound: () => void;
  onRefillLives: () => void;
  onResetProgress: () => void;
  onOpenProfile: () => void;
  onToggleTheme: () => void;
  onChangeLanguage: (lang: Language) => void;
  onOpenInstallModal: () => void;
  onOpenQrModal?: () => void;
  onReplaySplash: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  language,
  themeMode,
  onToggleSound,
  onRefillLives,
  onOpenProfile,
  onToggleTheme,
  onChangeLanguage,
  onOpenInstallModal,
  onOpenQrModal,
  onReplaySplash
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.fr;
  const currentRank = getRankForLevel(profile.level);
  const xpNeeded = getXpRequiredForLevel(profile.level);
  const xpPercent = Math.min(100, Math.round((profile.xp / xpNeeded) * 100));
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const languages: Array<{ code: Language; label: string; flag: string }> = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ln', label: 'Lingála', flag: '🇨🇩' },
    { code: 'sw', label: 'Kiswahili', flag: '🇹🇿' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0f1020]/95 dark:bg-[#0f1020]/95 light:bg-white/95 backdrop-blur-md border-b border-[#252849] dark:border-[#252849] light:border-slate-200 px-3 sm:px-4 py-2.5 shadow-lg transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
        
        {/* Brand & Rank */}
        <div className="flex items-center gap-2.5 cursor-pointer select-none" onClick={onOpenProfile}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6C63FF] to-[#00D4FF] flex items-center justify-center text-xl shadow-md border border-[#837dff]/40">
            {profile.avatar}
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-black text-base sm:text-lg tracking-wider text-white dark:text-white light:text-slate-900">
                SQL<span className="text-[#00D4FF]">QUEST</span>
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full font-bold bg-[#212547] text-[#00D4FF] border border-[#373c73] hidden xs:inline-block">
                {currentRank.badge} {currentRank.title}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              {profile.username} &bull; {t.level} {profile.level}
            </div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="flex-1 min-w-[160px] max-w-xs hidden md:block">
          <div className="flex items-center justify-between text-xs font-semibold mb-1 text-slate-300">
            <span className="flex items-center gap-1 text-[#6C63FF]">
              <Sparkles className="w-3.5 h-3.5 text-[#6C63FF]" /> {t.level} {profile.level}
            </span>
            <span className="text-slate-400 text-[11px]">
              {profile.xp} / {xpNeeded} XP ({xpPercent}%)
            </span>
          </div>
          <div className="w-full bg-[#181a33] h-2.5 rounded-full overflow-hidden border border-[#2b2f5b] relative">
            <div
              className="h-full bg-gradient-to-r from-[#6C63FF] via-[#00D4FF] to-[#00E676] transition-all duration-500 rounded-full"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>

        {/* Player Stats Chips & Quick Action Toggles */}
        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
          
          {/* Streak Flame */}
          <div 
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border transition-all ${
              profile.streak > 0 
                ? 'bg-amber-950/40 border-amber-500/50 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.2)]' 
                : 'bg-[#181a33] border-[#2b2f5b] text-slate-400'
            }`}
            title={`${t.streakDesc} : ${profile.streak}`}
          >
            <Flame className={`w-3.5 h-3.5 ${profile.streak > 0 ? 'text-amber-400 animate-pulse' : 'text-slate-500'}`} />
            <span>{profile.streak}</span>
          </div>

          {/* Lives / Hearts */}
          <div
            onClick={() => {
              if (profile.lives < profile.maxLives) {
                onRefillLives();
              }
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border cursor-pointer select-none transition-all ${
              profile.lives > 0 
                ? 'bg-rose-950/40 border-rose-500/40 text-rose-300 hover:border-rose-400' 
                : 'bg-rose-900/80 border-rose-400 text-white animate-bounce'
            }`}
            title={profile.lives < profile.maxLives ? t.refillLives : "Vies pleines"}
          >
            <Heart className={`w-3.5 h-3.5 fill-rose-500 text-rose-500 ${profile.lives === 0 ? 'animate-ping' : ''}`} />
            <span>{profile.lives}/{profile.maxLives}</span>
          </div>

          {/* Points */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold bg-[#181a33] border border-[#2b2f5b] text-[#00D4FF]">
            <Award className="w-3.5 h-3.5 text-[#00D4FF]" />
            <span>{profile.totalPoints.toLocaleString()}</span>
          </div>

          {/* QR Code Quick Scanner Button */}
          {onOpenQrModal && (
            <button
              id="navbar-qr-code-btn"
              onClick={() => {
                onOpenQrModal();
                sound.playClick();
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#181d3f] hover:bg-[#232a5a] border border-[#2e3770] text-[#00D4FF] hover:text-white text-xs font-bold transition-all transform hover:scale-105 active:scale-95 shadow-sm"
              title="Scanner le code QR (Google Lens & Mobile)"
            >
              <QrCode className="w-3.5 h-3.5 text-[#00D4FF]" />
              <span className="hidden md:inline">Code QR</span>
            </button>
          )}

          {/* PWA Install Button */}
          <button
            id="navbar-install-pwa-btn"
            onClick={onOpenInstallModal}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-gradient-to-r from-emerald-600/30 to-[#00D4FF]/30 hover:from-emerald-600/50 hover:to-[#00D4FF]/50 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all transform hover:scale-105 active:scale-95 shadow-sm"
            title={t.installApp}
          >
            <Download className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
            <span className="hidden sm:inline">{t.installApp}</span>
          </button>

          {/* Theme Mode Toggle */}
          <button
            id="navbar-theme-toggle-btn"
            onClick={() => {
              onToggleTheme();
              sound.playClick();
            }}
            className="p-1.5 sm:p-2 rounded-xl bg-[#181a33] hover:bg-[#202447] border border-[#2b2f5b] text-amber-300 transition-all"
            title={themeMode === 'dark' ? t.themeLight : t.themeDark}
            aria-label="Changer le thème"
          >
            {themeMode === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-300" />}
          </button>

          {/* Language Switcher Dropdown */}
          <div className="relative">
            <button
              id="navbar-lang-menu-btn"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-[#181a33] hover:bg-[#202447] border border-[#2b2f5b] text-xs font-bold text-slate-200 transition-all"
              title={t.languageSelect}
              aria-label="Changer la langue"
            >
              <Globe className="w-3.5 h-3.5 text-[#00D4FF]" />
              <span className="uppercase">{language}</span>
            </button>

            {langMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-36 bg-[#10132b] border border-[#2c3570] rounded-2xl shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                onClick={() => setLangMenuOpen(false)}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onChangeLanguage(lang.code);
                      sound.playClick();
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                      language === lang.code
                        ? 'bg-[#252c60] text-[#00D4FF] font-bold'
                        : 'text-slate-300 hover:bg-[#191e45]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </span>
                    {language === lang.code && <span className="text-[#00E676] text-xs">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              sound.playClick();
            }}
            className={`p-1.5 sm:p-2 rounded-xl border transition-all ${
              profile.soundEnabled
                ? 'bg-[#202447] border-[#3e4480] text-[#00D4FF] hover:bg-[#282d5a]'
                : 'bg-[#181a33] border-[#2b2f5b] text-slate-500 hover:text-slate-300'
            }`}
            title={profile.soundEnabled ? t.soundOff : t.soundOn}
            aria-label="Toggle sound"
          >
            {profile.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

        </div>
      </div>
    </header>
  );
};
