/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { NavigationTabs } from './components/NavigationTabs';
import { QuestsMapView } from './components/views/QuestsMapView';
import { ChallengesView } from './components/views/ChallengesView';
import { LearnView } from './components/views/LearnView';
import { SandboxView } from './components/views/SandboxView';
import { BadgesView } from './components/views/BadgesView';
import { StatsView } from './components/views/StatsView';
import { ProfileView } from './components/views/ProfileView';
import { MiniGamesView } from './components/views/MiniGamesView';
import { ChallengeModal } from './components/views/ChallengeModal';
import { CelebrationModal } from './components/CelebrationModal';
import { SplashScreen } from './components/SplashScreen';
import { PwaInstallModal } from './components/PwaInstallModal';
import { QrCodeModal } from './components/QrCodeModal';
import { Footer } from './components/Footer';
import { StorageService } from './game/storage';
import { SQLSandbox } from './sql/sandbox';
import { sound } from './game/sound';
import { Challenge, PlayerProfile, ViewTab, Badge, Language } from './types';
import { ALL_BADGES } from './game/badges';

export default function App() {
  const [profile, setProfile] = useState<PlayerProfile>(() => StorageService.loadProfile());
  const [currentTab, setCurrentTab] = useState<ViewTab>('quests');
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);

  // Language state (defaults to French 'fr')
  const [language, setLanguage] = useState<Language>(() => profile.language || 'fr');

  // Startup splash screen animation state
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    // Show splash on new session
    return !sessionStorage.getItem('sql_quest_splash_seen');
  });

  // PWA installation prompt state
  const [pwaModalOpen, setPwaModalOpen] = useState<boolean>(false);
  const [qrCodeModalOpen, setQrCodeModalOpen] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Celebration modal state
  const [celebrationState, setCelebrationState] = useState<{
    isOpen: boolean;
    title: string;
    subtitle?: string;
    xpGained: number;
    pointsGained: number;
    leveledUp?: boolean;
    newLevel?: number;
    unlockedBadges?: Badge[];
  }>({
    isOpen: false,
    title: '',
    xpGained: 0,
    pointsGained: 0
  });

  // Pre-initialize sandbox databases on first mount and setup PWA listener
  useEffect(() => {
    SQLSandbox.initializeDatabase('university');
    SQLSandbox.initializeDatabase('shop');
    SQLSandbox.initializeDatabase('cinema');
    SQLSandbox.initializeDatabase('hospital');
    sound.setEnabled(profile.soundEnabled);

    // Ensure dark mode class is set permanently
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');

    // Listen for PWA beforeinstallprompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  // Sync language with document html lang
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const handleFinishSplash = () => {
    setShowSplash(false);
    sessionStorage.setItem('sql_quest_splash_seen', 'true');
  };

  const handleReplaySplash = () => {
    sound.playClick();
    setShowSplash(true);
  };

  const handleChangeLanguage = (newLang: Language) => {
    setLanguage(newLang);
    const updated = { ...profile, language: newLang };
    setProfile(updated);
    StorageService.saveProfile(updated);
  };

  const handleTriggerNativeInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  };

  const handleToggleSound = () => {
    const nextVal = !profile.soundEnabled;
    sound.setEnabled(nextVal);
    const updated = { ...profile, soundEnabled: nextVal };
    setProfile(updated);
    StorageService.saveProfile(updated);
  };

  const handleRefillLives = () => {
    sound.playSuccess();
    const updated = StorageService.refillLives(profile);
    setProfile(updated);
  };

  const handleUpdateProfile = (partial: Partial<PlayerProfile>) => {
    const updated = { ...profile, ...partial };
    setProfile(updated);
    StorageService.saveProfile(updated);
  };

  const handleResetProgress = () => {
    const fresh = StorageService.resetProgress();
    setProfile(fresh);
    SQLSandbox.resetAllDatabases();
    sound.playSuccess();
  };

  const handleChallengeSuccess = (xpReward: number, pointsReward: number, bonusXp: number = 0) => {
    if (!activeChallenge) return;

    const result = StorageService.addXpAndPoints(
      profile,
      xpReward,
      pointsReward,
      activeChallenge.id
    );

    setProfile(result.updatedProfile);
    setActiveChallenge(null);

    // Trigger celebratory popup
    setCelebrationState({
      isOpen: true,
      title: activeChallenge.type === 'BOSS' ? 'VICTOIRE SUR LE BOSS ! 👑' : 'QUÊTE ACCOMPLIE ! 🎉',
      subtitle: bonusXp > 0 ? `Bonus de rapidité inclus : +${bonusXp} XP !` : `Félicitations pour ta maîtrise de la requête !`,
      xpGained: xpReward,
      pointsGained: pointsReward,
      leveledUp: result.leveledUp,
      newLevel: result.newLevel,
      unlockedBadges: result.newlyUnlockedBadges
    });
  };

  const handleChallengeFail = () => {
    const updated = StorageService.loseLife(profile);
    setProfile(updated);
  };

  const handleRecordSandboxHistory = (query: string, success: boolean, dbId: string) => {
    const updated = StorageService.recordQueryHistory(profile, query, success, dbId);
    setProfile(updated);
  };

  const handleMiniGameReward = (xpReward: number, pointsReward: number) => {
    const result = StorageService.addXpAndPoints(profile, xpReward, pointsReward);
    setProfile(result.updatedProfile);
    if (result.leveledUp) {
      sound.playLevelUp();
      setCelebrationState({
        isOpen: true,
        title: 'Nouveau Niveau Débloqué !',
        subtitle: `Tu as franchi le niveau ${result.newLevel} grâce à tes exploits dans les mini-jeux SQL !`,
        xpGained: xpReward,
        pointsGained: pointsReward,
        leveledUp: true,
        newLevel: result.newLevel,
        unlockedBadges: result.newlyUnlockedBadges
      });
    }
  };

  const unlockedBadgeCount = ALL_BADGES.filter(b => profile.badges[b.id]?.unlocked).length;

  return (
    <div className="min-h-screen bg-[#0b0d1b] dark:bg-[#0b0d1b] light:bg-[#f8fafc] text-slate-100 dark:text-slate-100 light:text-slate-800 flex flex-col selection:bg-[#6C63FF]/30 transition-colors">
      
      {/* Startup Splash Screen Animation (OROMASIS BANDUENGA) */}
      {showSplash && (
        <SplashScreen
          language={language}
          onFinish={handleFinishSplash}
        />
      )}

      {/* Top RPG Header Bar with Sound, Lang & PWA Controls */}
      <Navbar
        profile={profile}
        language={language}
        onToggleSound={handleToggleSound}
        onRefillLives={handleRefillLives}
        onResetProgress={handleResetProgress}
        onOpenProfile={() => setCurrentTab('profile')}
        onChangeLanguage={handleChangeLanguage}
        onOpenInstallModal={() => setPwaModalOpen(true)}
        onOpenQrModal={() => setQrCodeModalOpen(true)}
        onReplaySplash={handleReplaySplash}
      />

      {/* Main View Switcher Tabs with Multi-language labels */}
      <NavigationTabs
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        unlockedBadgeCount={unlockedBadgeCount}
        language={language}
      />

      {/* Primary Main Content Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8">
        {currentTab === 'quests' && (
          <QuestsMapView
            profile={profile}
            onSelectChallenge={c => setActiveChallenge(c)}
          />
        )}

        {currentTab === 'challenges' && (
          <ChallengesView
            profile={profile}
            onSelectChallenge={c => setActiveChallenge(c)}
          />
        )}

        {currentTab === 'minigames' && (
          <MiniGamesView onReward={handleMiniGameReward} />
        )}

        {currentTab === 'learn' && <LearnView language={language} />}

        {currentTab === 'sandbox' && (
          <SandboxView
            profile={profile}
            language={language}
            onRecordHistory={handleRecordSandboxHistory}
          />
        )}

        {currentTab === 'badges' && <BadgesView profile={profile} />}

        {currentTab === 'stats' && <StatsView profile={profile} />}

        {currentTab === 'profile' && (
          <ProfileView
            profile={profile}
            language={language}
            onUpdateProfile={handleUpdateProfile}
            onResetProgress={handleResetProgress}
            onChangeLanguage={handleChangeLanguage}
            onOpenInstallModal={() => setPwaModalOpen(true)}
            onOpenQrModal={() => setQrCodeModalOpen(true)}
            onReplaySplash={handleReplaySplash}
          />
        )}
      </main>

      {/* Application Footer with OROMASIS BANDUENGA & WhatsApp Contact */}
      <Footer
        language={language}
        onOpenInstallModal={() => setPwaModalOpen(true)}
        onOpenQrModal={() => setQrCodeModalOpen(true)}
        onReplaySplash={handleReplaySplash}
      />

      {/* QR Code Scanner & Download Modal */}
      <QrCodeModal
        isOpen={qrCodeModalOpen}
        onClose={() => setQrCodeModalOpen(false)}
        language={language}
        onOpenInstallModal={() => setPwaModalOpen(true)}
      />

      {/* PWA Installation Modal Guide */}
      <PwaInstallModal
        isOpen={pwaModalOpen}
        onClose={() => setPwaModalOpen(false)}
        language={language}
        canPromptNative={!!deferredPrompt}
        onTriggerNativePrompt={handleTriggerNativeInstall}
        onOpenQrModal={() => setQrCodeModalOpen(true)}
      />

      {/* Active Challenge Execution Modal */}
      {activeChallenge && (
        <ChallengeModal
          challenge={activeChallenge}
          profile={profile}
          onClose={() => setActiveChallenge(null)}
          onSuccess={handleChallengeSuccess}
          onFail={handleChallengeFail}
        />
      )}

      {/* Celebration Level-Up & Badge Modal */}
      <CelebrationModal
        isOpen={celebrationState.isOpen}
        onClose={() => setCelebrationState(prev => ({ ...prev, isOpen: false }))}
        title={celebrationState.title}
        subtitle={celebrationState.subtitle}
        xpGained={celebrationState.xpGained}
        pointsGained={celebrationState.pointsGained}
        leveledUp={celebrationState.leveledUp}
        newLevel={celebrationState.newLevel}
        unlockedBadges={celebrationState.unlockedBadges}
      />
    </div>
  );
}
