import React, { useState } from 'react';
import { Trophy, CheckCircle2, Lock, Sparkles, Award, Star } from 'lucide-react';
import { ALL_BADGES } from '../../game/badges';
import { PlayerProfile } from '../../types';
import { sound } from '../../game/sound';

interface BadgesViewProps {
  profile: PlayerProfile;
}

export const BadgesView: React.FC<BadgesViewProps> = ({ profile }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const unlockedCount = ALL_BADGES.filter(b => profile.badges[b.id]?.unlocked).length;
  const percentage = Math.round((unlockedCount / ALL_BADGES.length) * 100);

  const categories = ['ALL', 'SELECT', 'WHERE', 'JOIN', 'AGGREGATE', 'GROUP_BY', 'SPEED', 'BOSS', 'GLOBAL'];

  const filteredBadges = ALL_BADGES.filter(b => {
    if (selectedFilter !== 'ALL' && b.category !== selectedFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-10">
      {/* Trophy Hall Hero Banner */}
      <div className="bg-gradient-to-r from-[#1b1736] via-[#16142e] to-[#0f1124] border border-[#2e3466] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-bold">
            <Trophy className="w-3.5 h-3.5" />
            <span>Salle des Trophées & Hauts Faits</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Collection des Badges SQL
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Accomplis des exploits techniques, maintiens tes séries de victoires et élimine les Boss pour garnir ton armoire à trophées.
          </p>
        </div>

        {/* Global Trophy Progress Circle / Metric */}
        <div className="bg-[#181a33] border border-[#2b305c] p-4 rounded-2xl text-center min-w-[150px] shadow-lg shrink-0">
          <div className="text-3xl font-extrabold text-amber-400">
            {unlockedCount} / {ALL_BADGES.length}
          </div>
          <div className="text-xs text-slate-400 font-semibold mt-0.5">
            Badges Débloqués ({percentage}%)
          </div>
          <div className="w-full bg-[#111324] h-2 rounded-full mt-2 overflow-hidden border border-[#23274d]">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {categories.map(cat => {
          const isSelected = selectedFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setSelectedFilter(cat);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] text-white shadow-md'
                  : 'bg-[#14172c] text-slate-400 hover:text-slate-200 border border-[#282d54]'
              }`}
            >
              {cat === 'ALL' ? 'Tous les Badges' : cat}
            </button>
          );
        })}
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBadges.map(badge => {
          const badgeState = profile.badges[badge.id] || { unlocked: false, progress: 0 };
          const isUnlocked = badgeState.unlocked;
          const progress = badgeState.progress || 0;
          const maxProg = badge.maxProgress;
          const progressPercent = Math.min(100, Math.round((progress / maxProg) * 100));

          return (
            <div
              key={badge.id}
              className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                isUnlocked
                  ? 'bg-gradient-to-br from-[#1a1c36] to-[#121426] border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                  : 'bg-[#121424] border-[#25284a] opacity-80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border ${
                    isUnlocked
                      ? 'bg-amber-950/80 border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                      : 'bg-[#1a1d38] border-[#2e3363] text-slate-600'
                  }`}>
                    {isUnlocked ? '🏆' : '🔒'}
                  </div>

                  {isUnlocked ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Débloqué
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Verrouillé
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-extrabold text-white mb-1">
                  {badge.name}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  {badge.description}
                </p>
              </div>

              {/* Progress & Unlock Date */}
              <div className="space-y-1.5 pt-2 border-t border-[#232647]">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                  <span>Progression</span>
                  <span>{progress} / {maxProg}</span>
                </div>
                <div className="w-full bg-[#0d0e1c] h-2 rounded-full overflow-hidden border border-[#202342]">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isUnlocked
                        ? 'bg-gradient-to-r from-amber-400 to-emerald-400'
                        : 'bg-[#6C63FF]'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {isUnlocked && badgeState.unlockedAt && (
                  <div className="text-[10px] text-slate-500 font-mono pt-1 text-right">
                    Obtenu le {new Date(badgeState.unlockedAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
