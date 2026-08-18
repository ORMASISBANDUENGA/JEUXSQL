import React, { useState } from 'react';
import { 
  Gamepad2, Puzzle, PenTool, Sparkles, Trophy, Flame, Layers
} from 'lucide-react';
import { MiniGameMode } from '../../types';
import { SqlBuilderGame } from '../minigames/SqlBuilderGame';
import { FillBlanksGame } from '../minigames/FillBlanksGame';
import { WordplayGame } from '../minigames/WordplayGame';
import { sound } from '../../game/sound';

interface MiniGamesViewProps {
  onReward: (xp: number, points: number) => void;
}

export const MiniGamesView: React.FC<MiniGamesViewProps> = ({ onReward }) => {
  const [activeGame, setActiveGame] = useState<MiniGameMode>('builder');

  const gameTabs = [
    {
      id: 'builder' as MiniGameMode,
      title: 'Jeu de Construction',
      subtitle: 'Assemble les blocs de requêtes',
      icon: Puzzle,
      color: 'from-purple-500 to-indigo-600',
      tag: 'Blocs SQL'
    },
    {
      id: 'fill_blanks' as MiniGameMode,
      title: 'Compléter la Phrase',
      subtitle: 'Trouve les mots-clés manquants',
      icon: PenTool,
      color: 'from-cyan-500 to-blue-600',
      tag: 'Texte à Trous'
    },
    {
      id: 'wordplay' as MiniGameMode,
      title: 'Jeux de Mots & Énigmes',
      subtitle: 'Anagrammes & devinettes SQL',
      icon: Sparkles,
      color: 'from-emerald-500 to-teal-600',
      tag: 'Énigmes'
    }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#171a38] via-[#1f2452] to-[#171a38] border border-[#2d346b] p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6C63FF]/20 border border-[#6C63FF]/40 text-[#00D4FF] text-xs font-bold">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Zone Arcade & Mini-Jeux SQL</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Apprends le SQL par le Jeu
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Construis des requêtes bloc par bloc, complète des instructions à trous ou résous des énigmes et anagrammes pour booster ton XP !
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#0d0e1c]/80 border border-[#272c57] p-3 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Trophy className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <span className="text-slate-400 block font-medium">Récompenses Arcade</span>
            <span className="text-amber-300 font-extrabold font-mono">+25 à +50 XP / défi</span>
          </div>
        </div>
      </div>

      {/* Mode Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {gameTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeGame === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playClick();
                setActiveGame(tab.id);
              }}
              className={`p-4 sm:p-5 rounded-2xl border text-left transition-all relative overflow-hidden group cursor-pointer ${
                isActive
                  ? 'bg-[#181b3b] border-[#6C63FF] shadow-[0_0_20px_rgba(108,99,255,0.3)] ring-1 ring-[#6C63FF]'
                  : 'bg-[#121426] border-[#252849] hover:border-[#3a3f6e] hover:bg-[#161933]'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${tab.color} shadow-md`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#202549] text-slate-300 border border-[#303666]">
                  {tab.tag}
                </span>
              </div>

              <h4 className="text-sm font-extrabold text-white group-hover:text-[#00D4FF] transition-colors">
                {tab.title}
              </h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                {tab.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Game Section */}
      <div className="pt-2">
        {activeGame === 'builder' && <SqlBuilderGame onReward={onReward} />}
        {activeGame === 'fill_blanks' && <FillBlanksGame onReward={onReward} />}
        {activeGame === 'wordplay' && <WordplayGame onReward={onReward} />}
      </div>
    </div>
  );
};
