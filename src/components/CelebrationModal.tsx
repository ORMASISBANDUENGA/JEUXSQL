import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, Sparkles, CheckCircle2, Trophy, X, ArrowRight } from 'lucide-react';
import { Badge } from '../types';
import { getRankForLevel } from '../game/ranks';
import { sound } from '../game/sound';

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  xpGained: number;
  pointsGained: number;
  leveledUp?: boolean;
  newLevel?: number;
  unlockedBadges?: Badge[];
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  xpGained,
  pointsGained,
  leveledUp,
  newLevel,
  unlockedBadges = []
}) => {
  useEffect(() => {
    if (isOpen) {
      if (leveledUp) {
        sound.playLevelUp();
      } else {
        sound.playSuccess();
      }

      // Trigger Confetti effect
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isOpen, leveledUp]);

  if (!isOpen) return null;

  const newRank = newLevel ? getRankForLevel(newLevel) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-gradient-to-b from-[#1c1f3d] to-[#121427] border-2 border-[#6C63FF] rounded-3xl p-6 max-w-md w-full shadow-[0_0_50px_rgba(108,99,255,0.4)] text-center relative overflow-hidden">
        
        {/* Glowing Background FX */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#6C63FF]/30 blur-3xl pointer-events-none rounded-full" />
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-[#25284e] text-slate-400 hover:text-white transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero Icon */}
        <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-[#6C63FF] to-[#00D4FF] flex items-center justify-center text-3xl shadow-lg border border-[#9a94ff]/50 animate-bounce">
          {leveledUp ? '👑' : '🎉'}
        </div>

        <h3 className="text-xl font-extrabold text-white mb-1">
          {leveledUp ? 'NIVEAU SUPÉRIEUR !' : title}
        </h3>
        {subtitle && <p className="text-xs text-slate-300 mb-4">{subtitle}</p>}

        {/* Level Up Announcement */}
        {leveledUp && newRank && (
          <div className="bg-[#23274e] border border-[#6C63FF] p-3.5 rounded-2xl mb-4 text-left flex items-center gap-3">
            <span className="text-3xl">{newRank.badge}</span>
            <div>
              <div className="text-xs font-bold text-[#00D4FF] uppercase tracking-wider">
                Nouveau Rang Atteint !
              </div>
              <div className="text-sm font-extrabold text-white">
                {newRank.title} (Niveau {newLevel})
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {newRank.description}
              </div>
            </div>
          </div>
        )}

        {/* Rewards Earned */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <div className="bg-[#171a33] border border-[#2b2f5b] p-2.5 rounded-xl">
            <div className="text-xs text-slate-400 flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#6C63FF]" /> Expérience
            </div>
            <div className="text-base font-extrabold text-[#6C63FF] mt-0.5">
              +{xpGained} XP
            </div>
          </div>

          <div className="bg-[#171a33] border border-[#2b2f5b] p-2.5 rounded-xl">
            <div className="text-xs text-slate-400 flex items-center justify-center gap-1">
              <Award className="w-3.5 h-3.5 text-[#00D4FF]" /> Points de Quête
            </div>
            <div className="text-base font-extrabold text-[#00D4FF] mt-0.5">
              +{pointsGained} Pts
            </div>
          </div>
        </div>

        {/* Newly Unlocked Badges */}
        {unlockedBadges.length > 0 && (
          <div className="mb-4 text-left">
            <div className="text-xs font-bold text-amber-300 mb-2 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-400" /> Trophée(s) Débloqué(s) !
            </div>
            <div className="space-y-1.5">
              {unlockedBadges.map(b => (
                <div key={b.id} className="bg-amber-950/40 border border-amber-500/40 p-2.5 rounded-xl flex items-center gap-2.5">
                  <span className="text-xl">🏆</span>
                  <div>
                    <div className="text-xs font-bold text-amber-200">{b.name}</div>
                    <div className="text-[11px] text-slate-300">{b.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] hover:from-[#7c74ff] hover:to-[#22dcff] shadow-[0_0_20px_rgba(108,99,255,0.4)] flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <span>Continuer l’Aventure</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
