import React from 'react';
import { Map, Target, Gamepad2, BookOpen, Terminal, Trophy, BarChart2, User } from 'lucide-react';
import { ViewTab, Language } from '../types';
import { sound } from '../game/sound';
import { TRANSLATIONS } from '../i18n/translations';

interface NavigationTabsProps {
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  unlockedBadgeCount: number;
  language: Language;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  currentTab,
  onSelectTab,
  unlockedBadgeCount,
  language
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.fr;

  const tabs = [
    { id: 'quests' as ViewTab, label: t.tabQuests, icon: Map },
    { id: 'challenges' as ViewTab, label: t.tabChallenges, icon: Target },
    { id: 'minigames' as ViewTab, label: t.tabMinigames, icon: Gamepad2 },
    { id: 'learn' as ViewTab, label: t.tabLearn, icon: BookOpen },
    { id: 'sandbox' as ViewTab, label: t.tabSandbox, icon: Terminal },
    { id: 'badges' as ViewTab, label: t.tabBadges, icon: Trophy, badgeCount: unlockedBadgeCount },
    { id: 'stats' as ViewTab, label: t.tabStats, icon: BarChart2 },
    { id: 'profile' as ViewTab, label: t.tabProfile, icon: User }
  ];

  return (
    <nav className="bg-[#121426] dark:bg-[#121426] light:bg-slate-100 border-b border-[#252849] dark:border-[#252849] light:border-slate-300 px-2 sm:px-4 py-2 sticky top-[57px] z-30 shadow-md transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playClick();
                onSelectTab(tab.id);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all select-none relative ${
                isActive
                  ? 'bg-gradient-to-r from-[#6C63FF]/30 to-[#00D4FF]/20 text-white dark:text-white light:text-slate-900 border border-[#6C63FF] shadow-[0_0_12px_rgba(108,99,255,0.3)]'
                  : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-slate-200 dark:hover:text-slate-200 light:hover:text-slate-900 hover:bg-[#1c1f3b] dark:hover:bg-[#1c1f3b] light:hover:bg-slate-200 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#00D4FF]' : 'text-slate-400 dark:text-slate-400 light:text-slate-500'}`} />
              <span>{tab.label}</span>
              {tab.badgeCount !== undefined && tab.badgeCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#6C63FF] text-white">
                  {tab.badgeCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
