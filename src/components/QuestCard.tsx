import React from 'react';
import { Target, CheckCircle2, Clock, Skull, Zap, Sparkles, Award, ArrowRight } from 'lucide-react';
import { Challenge } from '../types';
import { sound } from '../game/sound';

interface QuestCardProps {
  challenge: Challenge;
  isCompleted: boolean;
  onStart: (challenge: Challenge) => void;
}

export const QuestCard: React.FC<QuestCardProps> = ({
  challenge,
  isCompleted,
  onStart
}) => {
  const getDifficultyBadge = () => {
    switch (challenge.difficulty) {
      case 'BEGINNER':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-950 text-emerald-400 border border-emerald-500/30">DÉBUTANT</span>;
      case 'INTERMEDIATE':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-950 text-[#00D4FF] border border-cyan-500/30">INTERMÉDIAIRE</span>;
      case 'ADVANCED':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-950 text-purple-300 border border-purple-500/30">AVANCÉ</span>;
      case 'EXPERT':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-950 text-amber-400 border border-amber-500/30">EXPERT</span>;
      case 'BOSS':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-950 text-rose-400 border border-rose-500/40 animate-pulse">BOSS FINAL</span>;
      default:
        return null;
    }
  };

  const getTypeIcon = () => {
    switch (challenge.type) {
      case 'BOSS':
        return <Skull className="w-5 h-5 text-rose-400" />;
      case 'TIMED':
        return <Clock className="w-5 h-5 text-amber-400" />;
      case 'FIND_ERROR':
        return <Zap className="w-5 h-5 text-purple-400" />;
      default:
        return <Target className="w-5 h-5 text-[#00D4FF]" />;
    }
  };

  return (
    <div
      onClick={() => {
        sound.playClick();
        onStart(challenge);
      }}
      className={`group relative rounded-2xl p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between border ${
        isCompleted
          ? 'bg-[#121526]/80 border-emerald-500/30 hover:border-emerald-400/60 shadow-sm'
          : challenge.type === 'BOSS'
          ? 'bg-gradient-to-br from-[#1d142b] to-[#141224] border-rose-500/40 hover:border-rose-400 shadow-[0_0_15px_rgba(244,67,54,0.15)] hover:shadow-[0_0_25px_rgba(244,67,54,0.3)]'
          : 'bg-[#14172c] border-[#2b3058] hover:border-[#6C63FF] hover:shadow-[0_0_15px_rgba(108,99,255,0.2)]'
      }`}
    >
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#1b1f3d] border border-[#2e3466]">
              {getTypeIcon()}
            </div>
            {getDifficultyBadge()}
          </div>

          {isCompleted && (
            <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Complété</span>
            </div>
          )}
        </div>

        {/* Title & Description */}
        <h4 className="text-sm font-extrabold text-white group-hover:text-[#00D4FF] transition-colors line-clamp-1 mb-1">
          {challenge.title}
        </h4>
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
          {challenge.description}
        </p>
      </div>

      {/* Footer Info */}
      <div className="pt-2 border-t border-[#23274d] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[#6C63FF] font-bold">
            <Sparkles className="w-3.5 h-3.5" /> +{challenge.xpReward} XP
          </span>
          <span className="text-slate-500">&bull;</span>
          <span className="flex items-center gap-1 text-[#00D4FF] font-bold">
            <Award className="w-3.5 h-3.5" /> {challenge.pointsReward} pts
          </span>
        </div>

        <span className="text-xs font-bold text-slate-400 group-hover:text-white flex items-center gap-1 transition-transform group-hover:translate-x-1">
          <span>Défier</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
