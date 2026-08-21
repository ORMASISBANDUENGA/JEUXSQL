import React, { useState } from 'react';
import { User, Shield, Volume2, VolumeX, RotateCcw, Award, Check, Sparkles, Globe, Download, PlayCircle, MessageCircle, Smartphone, Monitor, QrCode } from 'lucide-react';
import { PlayerProfile, Language } from '../../types';
import { RANKS, getRankForLevel } from '../../game/ranks';
import { sound } from '../../game/sound';
import { TRANSLATIONS } from '../../i18n/translations';

interface ProfileViewProps {
  profile: PlayerProfile;
  language: Language;
  onUpdateProfile: (updated: Partial<PlayerProfile>) => void;
  onResetProgress: () => void;
  onChangeLanguage: (lang: Language) => void;
  onOpenInstallModal: () => void;
  onOpenQrModal: () => void;
  onReplaySplash: () => void;
}

const AVAILABLE_AVATARS = ['🛡️', '⚔️', '🧙‍♂️', '🧝‍♀️', '🤖', '👾', '🦁', '🐉', '🔮', '⚡'];

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  language,
  onUpdateProfile,
  onResetProgress,
  onChangeLanguage,
  onOpenInstallModal,
  onOpenQrModal,
  onReplaySplash
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.fr;
  const [username, setUsername] = useState<string>(profile.username);
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  const currentRank = getRankForLevel(profile.level);

  const handleSaveName = () => {
    sound.playClick();
    if (username.trim()) {
      onUpdateProfile({ username: username.trim() });
    }
    setIsEditingName(false);
  };

  const languagesList: Array<{ code: Language; label: string; flag: string }> = [
    { code: 'fr', label: 'Français (Défaut)', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ln', label: 'Lingála', flag: '🇨🇩' },
    { code: 'sw', label: 'Kiswahili', flag: '🇹🇿' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Player Identity Hero Card */}
      <div className="bg-[#121426] dark:bg-[#121426] light:bg-white border border-[#272b52] dark:border-[#272b52] light:border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 transition-colors">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Avatar Preview */}
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#6C63FF] via-[#00D4FF] to-[#00E676] p-1 shadow-2xl flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-[#121426] rounded-[22px] flex items-center justify-center text-4xl">
              {profile.avatar}
            </div>
          </div>

          {/* Player Name and Title */}
          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="bg-[#181a33] text-white text-base font-bold px-3 py-1.5 rounded-xl border border-[#6C63FF] focus:outline-none"
                    maxLength={20}
                  />
                  <button
                    onClick={handleSaveName}
                    className="p-2 rounded-xl bg-[#6C63FF] text-white text-xs font-bold"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-extrabold text-white dark:text-white light:text-slate-900">
                    {profile.username}
                  </h2>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="text-xs text-slate-400 hover:text-[#00D4FF] underline font-medium"
                  >
                    Modifier
                  </button>
                </div>
              )}

              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#20254f] text-[#00D4FF] border border-[#394285]">
                {currentRank.badge} {currentRank.title}
              </span>
            </div>

            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-lg leading-relaxed">
              {currentRank.description}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1 text-xs font-mono text-slate-300 dark:text-slate-300 light:text-slate-700">
              <span>{t.level} {profile.level}</span>
              <span>&bull;</span>
              <span>{profile.totalPoints.toLocaleString()} {t.points}</span>
              <span>&bull;</span>
              <span>{profile.completedChallenges.length} quêtes validées</span>
            </div>
          </div>
        </div>

        {/* Avatar Chooser */}
        <div className="pt-4 border-t border-[#23274d] dark:border-[#23274d] light:border-slate-200 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Choisir un Avatar :
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            {AVAILABLE_AVATARS.map(av => (
              <button
                key={av}
                onClick={() => {
                  sound.playClick();
                  onUpdateProfile({ avatar: av });
                }}
                className={`w-11 h-11 rounded-2xl text-xl flex items-center justify-center transition-all ${
                  profile.avatar === av
                    ? 'bg-[#6C63FF] border-2 border-white scale-110 shadow-lg'
                    : 'bg-[#181a33] hover:bg-[#202447] border border-[#2e3363]'
                }`}
              >
                {av}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Language and Preferences Settings */}
      <div className="bg-[#121426] dark:bg-[#121426] light:bg-white border border-[#272b52] dark:border-[#272b52] light:border-slate-200 rounded-3xl p-6 space-y-5 shadow-xl transition-colors">
        <h3 className="text-base font-extrabold text-white dark:text-white light:text-slate-900 flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#00D4FF]" />
          <span>{t.languageSelect}</span>
        </h3>

        {/* Language Chooser Buttons */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Sélectionner la Langue de l'Interface :
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {languagesList.map(lang => (
              <button
                key={lang.code}
                onClick={() => {
                  onChangeLanguage(lang.code);
                  sound.playSuccess();
                }}
                className={`p-3 rounded-2xl border text-left flex flex-col gap-1 transition-all ${
                  language === lang.code
                    ? 'bg-gradient-to-br from-[#6C63FF]/30 to-[#00D4FF]/20 border-[#6C63FF] text-white shadow-md'
                    : 'bg-[#181a33] dark:bg-[#181a33] light:bg-slate-100 border-[#2b305e] dark:border-[#2b305e] light:border-slate-300 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-[#20254f]'
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="text-xs font-bold">{lang.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Replay Splash Intro card */}
        <div className="pt-2">
          <div className="p-4 rounded-2xl bg-[#161833] dark:bg-[#161833] light:bg-slate-100 border border-[#272c54] dark:border-[#272c54] light:border-slate-300 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-white dark:text-white light:text-slate-900">Intro & Splash OROMASIS</h4>
              <p className="text-[11px] text-slate-400">Revoir l'animation cinématographique de démarrage</p>
            </div>
            <button
              onClick={onReplaySplash}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] text-white font-bold text-xs shadow-sm hover:brightness-110 transition-all cursor-pointer"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Lancer l'Intro</span>
            </button>
          </div>
        </div>
      </div>

      {/* PWA Installation Card (Computer & Mobile) */}
      <div className="bg-gradient-to-r from-[#12163b] via-[#101433] to-[#12163b] border border-[#2c377a] rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shrink-0">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <span>{t.installApp} (Ordinateur & Mobile)</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  PWA Ready
                </span>
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Installe SQL Quest comme une véritable application native sur Windows, Mac, Linux, Android et iPhone.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
            <button
              id="profile-open-qr-btn"
              onClick={onOpenQrModal}
              className="px-4 py-3 rounded-2xl bg-[#1c2250] hover:bg-[#27306e] border border-[#394285] text-[#00D4FF] font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95"
            >
              <QrCode className="w-4 h-4" />
              <span>{t.qrCodeBtn}</span>
            </button>

            <button
              id="profile-open-install-btn"
              onClick={onOpenInstallModal}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-[#00D4FF] hover:brightness-110 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Ouvrir le Guide d'Installation</span>
            </button>
          </div>
        </div>
      </div>

      {/* Ranks Milestones Overview */}
      <div className="bg-[#121426] dark:bg-[#121426] light:bg-white border border-[#272b52] dark:border-[#272b52] light:border-slate-200 rounded-3xl p-6 space-y-4 shadow-xl transition-colors">
        <h3 className="text-base font-extrabold text-white dark:text-white light:text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          <span>Échelle des Rangs SQL</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {RANKS.map(rank => {
            const isReached = profile.level >= rank.minLevel;
            const isCurrent = currentRank.title === rank.title;

            return (
              <div
                key={rank.title}
                className={`p-4 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'bg-[#1c1f3d] border-[#6C63FF] shadow-[0_0_15px_rgba(108,99,255,0.2)]'
                    : isReached
                    ? 'bg-[#14172c] border-emerald-500/30'
                    : 'bg-[#0f1122] border-[#202445] opacity-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{rank.badge}</span>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#1b1e3d] text-slate-300">
                    {t.level} {rank.minLevel}+
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">{rank.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {rank.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Creator Credits & Contact */}
      <div className="bg-[#121426] dark:bg-[#121426] light:bg-white border border-[#272b52] dark:border-[#272b52] light:border-slate-200 rounded-3xl p-6 space-y-4 shadow-xl transition-colors">
        <h3 className="text-base font-extrabold text-white dark:text-white light:text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#00D4FF]" />
          <span>Crédits de Création</span>
        </h3>

        <div className="p-4 rounded-2xl bg-[#161833] dark:bg-[#161833] light:bg-slate-100 border border-[#272c54] dark:border-[#272c54] light:border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-extrabold text-white dark:text-white light:text-slate-900">
                OROMASIS BANDUENGA
              </h4>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#262c5b] text-[#00D4FF]">
                Lead Architect
              </span>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mt-1">
              Concepteur & Développeur de SQL Quest Arena. Disponible pour collaborations et projets.
            </p>
          </div>

          <a
            href={`https://wa.me/243896082244?text=${encodeURIComponent('Bonjour OROMASIS BANDUENGA, je vous contacte depuis SQL Quest !')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 hover:text-white border border-emerald-500/40 text-xs font-bold transition-all whitespace-nowrap shadow-md"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp : +243 89 60 82 244</span>
          </a>
        </div>
      </div>

      {/* App Settings and Progression Reset */}
      <div className="bg-[#121426] dark:bg-[#121426] light:bg-white border border-[#272b52] dark:border-[#272b52] light:border-slate-200 rounded-3xl p-6 space-y-4 shadow-xl transition-colors">
        <h3 className="text-base font-extrabold text-white dark:text-white light:text-slate-900">
          Paramètres & Gestion de la Sauvegarde
        </h3>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#161833] dark:bg-[#161833] light:bg-slate-100 border border-[#272c54] dark:border-[#272c54] light:border-slate-300">
          <div>
            <h4 className="text-sm font-bold text-white dark:text-white light:text-slate-900">Effets Sonores Synthétisés</h4>
            <p className="text-xs text-slate-400">Activer les fanfares de victoire et sons rétro.</p>
          </div>

          <button
            onClick={() => {
              const next = !profile.soundEnabled;
              sound.setEnabled(next);
              if (next) sound.playSuccess();
              onUpdateProfile({ soundEnabled: next });
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
              profile.soundEnabled
                ? 'bg-[#6C63FF] text-white border-[#6C63FF]'
                : 'bg-[#181a33] text-slate-400 border-[#2c315e]'
            }`}
          >
            {profile.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span>{profile.soundEnabled ? 'Sons Activés' : 'Sons Coupés'}</span>
          </button>
        </div>

        {/* Reset Progress Section */}
        <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-rose-300">Réinitialiser toute la progression</h4>
              <p className="text-xs text-slate-400">Efface les niveaux, points, séries et trophées pour repartir de zéro.</p>
            </div>

            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-500/50 transition-all shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Réinitialiser</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    sound.playClick();
                    onResetProgress();
                    setShowResetConfirm(false);
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-md"
                >
                  Confirmer la suppression
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#1e2247] text-slate-300 hover:bg-[#282e5e]"
                >
                  Annuler
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
