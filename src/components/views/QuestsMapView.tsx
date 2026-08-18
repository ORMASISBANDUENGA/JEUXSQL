import React from 'react';
import { Sparkles, Skull, CheckCircle2, Lock, ArrowRight, Award, Compass, Play } from 'lucide-react';
import { Challenge, PlayerProfile } from '../../types';
import { CHALLENGES } from '../../game/challenges';
import { sound } from '../../game/sound';

interface QuestsMapViewProps {
  profile: PlayerProfile;
  onSelectChallenge: (c: Challenge) => void;
}

export const QuestsMapView: React.FC<QuestsMapViewProps> = ({
  profile,
  onSelectChallenge
}) => {
  // Group challenges into 4 adventure Chapters / Worlds:
  // Chapter 1: Les Rives du SELECT (Beginner)
  // Chapter 2: Les Forêts du Filtrage & Tri (WHERE, ORDER BY)
  // Chapter 3: Le Labyrinthe des Relations (JOIN, GROUP BY)
  // Chapter 4: La Citadelle des Boss & Sous-Requêtes (Advanced & Boss)

  const chapters = [
    {
      id: 1,
      title: 'Chapitre I : Les Rives du SELECT',
      description: 'Découvre les fondations du langage SQL, la projection et l’extraction de données brutes.',
      themeColor: '#00D4FF',
      icon: '🌱',
      challenges: CHALLENGES.filter(c => c.category === 'SELECT')
    },
    {
      id: 2,
      title: 'Chapitre II : La Forêt des Filtres & Tris',
      description: 'Dompte les conditions WHERE, les tris ORDER BY et les fonctions d’agrégation arithmétiques.',
      themeColor: '#6C63FF',
      icon: '🏹',
      challenges: CHALLENGES.filter(c => ['WHERE', 'ORDER_BY', 'AGGREGATE'].includes(c.category) && c.type !== 'BOSS')
    },
    {
      id: 3,
      title: 'Chapitre III : Le Labyrinthe des Relations',
      description: 'Maîtrise les jointures INNER / LEFT, les regroupements GROUP BY et filtres HAVING.',
      themeColor: '#4CAF50',
      icon: '⚔️',
      challenges: CHALLENGES.filter(c => ['JOIN', 'GROUP_BY', 'HAVING'].includes(c.category) && c.type !== 'BOSS')
    },
    {
      id: 4,
      title: 'Chapitre IV : La Citadelle des Boss Suprêmes',
      description: 'Affronte les sous-requêtes imbriquées, le débogage critique et les Boss SQL épiques.',
      themeColor: '#FF5252',
      icon: '👑',
      challenges: CHALLENGES.filter(c => c.type === 'BOSS' || c.category === 'SUBQUERY' || c.type === 'TIMED')
    }
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* World Map Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#171a38] via-[#1b1736] to-[#0f1124] border border-[#2e3466] p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#6C63FF]/20 via-[#00D4FF]/10 to-transparent blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20254f] border border-[#373f82] text-xs font-bold text-[#00D4FF]">
            <Compass className="w-3.5 h-3.5" />
            <span>Carte du Monde &bull; Progression des Quêtes</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            L’Épopée des Terres Relationnelles
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Avance de sanctuaire en sanctuaire, accomplis chaque quête SQL, amasse de l'expérience et débloque les portes de la Citadelle pour vaincre les Boss suprêmes !
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" /> {profile.completedChallenges.length} / {CHALLENGES.length} Défis complétés
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5 text-[#00D4FF]">
              <Award className="w-4 h-4" /> {profile.totalPoints} points cumulés
            </span>
          </div>
        </div>
      </div>

      {/* Chapters Journey */}
      <div className="space-y-8">
        {chapters.map((chap, chapIdx) => {
          const completedInChap = chap.challenges.filter(c => profile.completedChallenges.includes(c.id)).length;
          const isChapComplete = chap.challenges.length > 0 && completedInChap === chap.challenges.length;

          return (
            <div key={chap.id} className="space-y-4">
              {/* Chapter Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#25284a] pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2 rounded-2xl bg-[#181a33] border border-[#2b2f5b] shadow-sm">
                    {chap.icon}
                  </span>
                  <div>
                    <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                      <span>{chap.title}</span>
                      {isChapComplete && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-semibold">
                          Terminé 🎉
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-400">{chap.description}</p>
                  </div>
                </div>

                <div className="text-xs font-mono font-bold text-slate-400">
                  {completedInChap} / {chap.challenges.length} validé(s)
                </div>
              </div>

              {/* Quest Nodes Grid / Stepper */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {chap.challenges.map((challenge, nodeIdx) => {
                  const isDone = profile.completedChallenges.includes(challenge.id);
                  const isBoss = challenge.type === 'BOSS';

                  return (
                    <div
                      key={challenge.id}
                      onClick={() => {
                        sound.playClick();
                        onSelectChallenge(challenge);
                      }}
                      className={`relative p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                        isDone
                          ? 'bg-[#121526]/80 border-emerald-500/40 hover:border-emerald-400'
                          : isBoss
                          ? 'bg-gradient-to-br from-[#20142b] to-[#141224] border-rose-500/40 hover:border-rose-400 shadow-[0_0_20px_rgba(244,67,54,0.2)]'
                          : 'bg-[#15182e] border-[#292f58] hover:border-[#6C63FF] hover:shadow-[0_0_15px_rgba(108,99,255,0.2)]'
                      }`}
                    >
                      {/* Node Header */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-[#202447] text-[#00D4FF] border border-[#30376d]">
                              Quête #{chapIdx + 1}.{nodeIdx + 1}
                            </span>
                            {isBoss && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-950 text-rose-300 border border-rose-500/50 animate-pulse">
                                BOSS
                              </span>
                            )}
                          </div>

                          {isDone ? (
                            <span className="text-emerald-400 flex items-center gap-1 text-xs font-bold">
                              <CheckCircle2 className="w-4 h-4" />
                            </span>
                          ) : (
                            <span className="w-7 h-7 rounded-xl bg-[#20254b] flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-[#6C63FF] transition-all">
                              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm font-bold text-white group-hover:text-[#00D4FF] transition-colors mb-1 line-clamp-1">
                          {challenge.title}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                          {challenge.description}
                        </p>
                      </div>

                      {/* Node Rewards */}
                      <div className="pt-2 border-t border-[#242952] flex items-center justify-between text-xs">
                        <span className="text-[#6C63FF] font-bold flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" /> +{challenge.xpReward} XP
                        </span>
                        <span className="text-slate-400 font-mono text-[11px]">
                          {challenge.databaseId}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
