import React, { useState } from 'react';
import { Search, Filter, CheckCircle2, Clock, Skull, Zap, Target, Sparkles, Layers } from 'lucide-react';
import { Challenge, PlayerProfile, Difficulty, SQLCategory } from '../../types';
import { CHALLENGES } from '../../game/challenges';
import { QuestCard } from '../QuestCard';
import { sound } from '../../game/sound';

interface ChallengesViewProps {
  profile: PlayerProfile;
  onSelectChallenge: (c: Challenge) => void;
}

export const ChallengesView: React.FC<ChallengesViewProps> = ({
  profile,
  onSelectChallenge
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<'ALL' | 'COMPLETED' | 'PENDING'>('ALL');

  const categories = [
    { id: 'ALL', label: 'Tous les Types' },
    { id: 'SELECT', label: 'SELECT' },
    { id: 'WHERE', label: 'WHERE' },
    { id: 'ORDER_BY', label: 'ORDER BY' },
    { id: 'AGGREGATE', label: 'Agrégats' },
    { id: 'GROUP_BY', label: 'GROUP BY' },
    { id: 'JOIN', label: 'Jointures' },
    { id: 'SUBQUERY', label: 'Sous-Requêtes' },
    { id: 'TIMED', label: '⏱️ Chrono' },
    { id: 'FIND_ERROR', label: '⚡ Débogage' },
    { id: 'BOSS', label: '👑 Boss' }
  ];

  const filteredChallenges = CHALLENGES.filter(c => {
    // Search match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = c.title.toLowerCase().includes(q);
      const matchDesc = c.description.toLowerCase().includes(q);
      const matchCat = c.category.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchCat) return false;
    }

    // Category filter
    if (selectedCategory !== 'ALL') {
      if (selectedCategory === 'TIMED' && c.type !== 'TIMED') return false;
      if (selectedCategory === 'FIND_ERROR' && c.type !== 'FIND_ERROR') return false;
      if (selectedCategory === 'BOSS' && c.type !== 'BOSS') return false;
      if (!['TIMED', 'FIND_ERROR', 'BOSS'].includes(selectedCategory) && c.category !== selectedCategory) return false;
    }

    // Difficulty filter
    if (selectedDifficulty !== 'ALL' && c.difficulty !== selectedDifficulty) {
      return false;
    }

    // Status filter
    const isDone = profile.completedChallenges.includes(c.id);
    if (selectedStatus === 'COMPLETED' && !isDone) return false;
    if (selectedStatus === 'PENDING' && isDone) return false;

    return true;
  });

  return (
    <div className="space-y-6 pb-10">
      {/* Top Search & Filter Bar */}
      <div className="bg-[#121426] border border-[#272b52] rounded-2xl p-4 space-y-3 shadow-lg">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative w-full flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Rechercher un défi (ex: moyenne, film, join, stock)..."
              className="w-full bg-[#0f1122] border border-[#282d57] rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#6C63FF]"
            />
          </div>

          {/* Status Filter Toggle */}
          <div className="flex items-center gap-1 bg-[#0f1122] p-1 rounded-xl border border-[#282d57] w-full sm:w-auto shrink-0">
            {(['ALL', 'PENDING', 'COMPLETED'] as const).map(st => (
              <button
                key={st}
                onClick={() => {
                  sound.playClick();
                  setSelectedStatus(st);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold flex-1 sm:flex-none transition-all ${
                  selectedStatus === st
                    ? 'bg-[#6C63FF] text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {st === 'ALL' ? 'Tous' : st === 'PENDING' ? 'À faire' : 'Terminés'}
              </button>
            ))}
          </div>
        </div>

        {/* Category Scrollable Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {categories.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] text-white shadow-md'
                    : 'bg-[#181a33] text-slate-400 hover:text-slate-200 hover:bg-[#202447] border border-[#2b3058]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Challenge Count & Feedback */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-1">
        <span>{filteredChallenges.length} défi(s) disponible(s)</span>
        <span>
          {profile.completedChallenges.length} / {CHALLENGES.length} validé(s) ({Math.round((profile.completedChallenges.length / CHALLENGES.length) * 100)}%)
        </span>
      </div>

      {/* Challenge Cards Grid */}
      {filteredChallenges.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredChallenges.map(challenge => (
            <QuestCard
              key={challenge.id}
              challenge={challenge}
              isCompleted={profile.completedChallenges.includes(challenge.id)}
              onStart={onSelectChallenge}
            />
          ))}
        </div>
      ) : (
        <div className="bg-[#121426] border border-[#272b52] rounded-2xl p-12 text-center text-slate-500 space-y-2">
          <Target className="w-10 h-10 mx-auto text-slate-600 opacity-60" />
          <p className="text-sm font-semibold">Aucun défi ne correspond à tes filtres de recherche.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('ALL');
              setSelectedStatus('ALL');
            }}
            className="text-xs text-[#00D4FF] underline font-medium"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
};
