import React from 'react';
import { BarChart2, Flame, Award, CheckCircle2, Zap, BrainCircuit, Target, Sparkles, TrendingUp } from 'lucide-react';
import { PlayerProfile } from '../../types';
import { StatsManager } from '../../game/stats';
import { getRankForLevel } from '../../game/ranks';

interface StatsViewProps {
  profile: PlayerProfile;
}

export const StatsView: React.FC<StatsViewProps> = ({ profile }) => {
  const masteryStats = StatsManager.getMasteryStats(profile);
  const globalProgress = StatsManager.getGlobalProgress(profile);
  const adaptiveRec = StatsManager.getAdaptiveRecommendation(profile);
  const currentRank = getRankForLevel(profile.level);

  return (
    <div className="space-y-6 pb-10">
      
      {/* Top Hero Stats Bento */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-[#14172c] border border-[#2b3058] p-4 rounded-2xl space-y-1 shadow-md">
          <div className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-[#00D4FF]" /> Défis Résolus
          </div>
          <div className="text-2xl font-extrabold text-white">
            {globalProgress.completedCount} <span className="text-xs text-slate-500 font-normal">/ {globalProgress.totalChallenges}</span>
          </div>
          <div className="text-[11px] text-emerald-400 font-medium">
            {globalProgress.completionPercentage}% du jeu terminé
          </div>
        </div>

        <div className="bg-[#14172c] border border-[#2b3058] p-4 rounded-2xl space-y-1 shadow-md">
          <div className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-400" /> Série de Victoires
          </div>
          <div className="text-2xl font-extrabold text-amber-300">
            {profile.streak} 🔥
          </div>
          <div className="text-[11px] text-slate-400 font-medium">
            Record : {profile.bestStreak} consécutifs
          </div>
        </div>

        <div className="bg-[#14172c] border border-[#2b3058] p-4 rounded-2xl space-y-1 shadow-md">
          <div className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#6C63FF]" /> Points Totaux
          </div>
          <div className="text-2xl font-extrabold text-[#6C63FF]">
            {profile.totalPoints.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 font-medium">
            Rang : {currentRank.title}
          </div>
        </div>

        <div className="bg-[#14172c] border border-[#2b3058] p-4 rounded-2xl space-y-1 shadow-md">
          <div className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Taux de Précision
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">
            {globalProgress.accuracyRate}%
          </div>
          <div className="text-[11px] text-slate-400 font-medium">
            {profile.queryHistory.length} requêtes tracées
          </div>
        </div>
      </div>

      {/* Adaptive Learning Advice Card */}
      <div className="bg-gradient-to-r from-[#1d1736] via-[#16172e] to-[#0f1124] border border-[#3e3573] rounded-3xl p-6 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00D4FF]">
          <BrainCircuit className="w-4 h-4 text-[#00D4FF]" />
          <span>Moteur d'Apprentissage Adaptatif & Recommandation</span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-extrabold text-white">
              Niveau Conseillé : <span className="text-[#6C63FF]">{adaptiveRec.difficulty}</span> &bull; Focus : <span className="text-[#00D4FF]">{adaptiveRec.recommendedCategory}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              {adaptiveRec.advice}
            </p>
          </div>

          <span className="px-4 py-2 rounded-xl bg-[#20254f] border border-[#394285] text-xs font-mono font-bold text-[#00D4FF] shrink-0">
            Algorithme SQL Quest v1.0
          </span>
        </div>
      </div>

      {/* Category Mastery Progress Bars */}
      <div className="bg-[#121426] border border-[#272b52] rounded-3xl p-6 space-y-5 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-[#6C63FF]" />
              <span>Maîtrise par Compétence SQL</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Analyse détaillée de tes taux de réussite par thématique technique.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {masteryStats.map(stat => (
            <div
              key={stat.category}
              className="bg-[#161933] border border-[#292f58] p-4 rounded-2xl space-y-2"
            >
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-white flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: stat.color }} />
                  {stat.label}
                </span>
                <span className="text-slate-400 font-mono">
                  {stat.completedChallenges} / {stat.totalChallenges} ({stat.percentage}%)
                </span>
              </div>

              <div className="w-full bg-[#0e1022] h-2.5 rounded-full overflow-hidden border border-[#202547]">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${stat.percentage}%`,
                    backgroundColor: stat.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
