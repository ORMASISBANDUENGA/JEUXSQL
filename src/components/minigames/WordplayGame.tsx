import React, { useState } from 'react';
import { 
  Sparkles, HelpCircle, Shuffle, CheckCircle2, AlertCircle, 
  ArrowRight, Search, Lightbulb, Trophy, Check, RotateCcw
} from 'lucide-react';
import { SQL_ANAGRAMS, SQL_RIDDLES, SQL_WORD_SEARCH_GRID } from '../../game/wordplay';
import { WordAnagram, WordRiddle } from '../../types';
import { sound } from '../../game/sound';

interface WordplayGameProps {
  onReward: (xp: number, points: number) => void;
}

export const WordplayGame: React.FC<WordplayGameProps> = ({ onReward }) => {
  const [subMode, setSubMode] = useState<'anagrams' | 'riddles' | 'wordsearch'>('anagrams');

  // --- Anagram state ---
  const [anaIdx, setAnaIdx] = useState<number>(0);
  const currentAna = SQL_ANAGRAMS[anaIdx];
  const [typedLetters, setTypedLetters] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<Array<{ id: number; char: string }>>(
    () => currentAna.scrambled.split(' ').map((char, i) => ({ id: i, char }))
  );
  const [anaState, setAnaState] = useState<'idle' | 'success' | 'error'>('idle');
  const [completedAna, setCompletedAna] = useState<string[]>([]);

  // --- Riddles state ---
  const [riddleIdx, setRiddleIdx] = useState<number>(0);
  const currentRiddle = SQL_RIDDLES[riddleIdx];
  const [userGuess, setUserGuess] = useState<string>('');
  const [showRiddleHint, setShowRiddleHint] = useState<boolean>(false);
  const [riddleState, setRiddleState] = useState<'idle' | 'success' | 'error'>('idle');
  const [completedRiddles, setCompletedRiddles] = useState<string[]>([]);

  // --- Word Search state ---
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectedWordInput, setSelectedWordInput] = useState<string>('');
  const [searchFeedback, setSearchFeedback] = useState<string>('');

  // Anagram Handlers
  const handleSelectAnagram = (idx: number) => {
    sound.playClick();
    setAnaIdx(idx);
    const target = SQL_ANAGRAMS[idx];
    setTypedLetters([]);
    setAvailableLetters(
      target.scrambled.split(' ').map((char, i) => ({ id: i, char }))
    );
    setAnaState('idle');
  };

  const handleAddLetter = (item: { id: number; char: string }) => {
    sound.playClick();
    setTypedLetters(prev => [...prev, item.char]);
    setAvailableLetters(prev => prev.filter(l => l.id !== item.id));
    setAnaState('idle');
  };

  const handleRemoveLetter = (index: number) => {
    sound.playClick();
    const removedChar = typedLetters[index];
    setTypedLetters(prev => prev.filter((_, i) => i !== index));
    setAvailableLetters(prev => [...prev, { id: Date.now() + Math.random(), char: removedChar }]);
    setAnaState('idle');
  };

  const handleValidateAnagram = () => {
    const word = typedLetters.join('');
    if (word.toUpperCase() === currentAna.targetWord.replace(/\s+/g, '').toUpperCase()) {
      sound.playSuccess();
      setAnaState('success');
      if (!completedAna.includes(currentAna.id)) {
        setCompletedAna(prev => [...prev, currentAna.id]);
        onReward(30, 60);
      }
    } else {
      sound.playError();
      setAnaState('error');
    }
  };

  // Riddle Handlers
  const handleSelectRiddle = (idx: number) => {
    sound.playClick();
    setRiddleIdx(idx);
    setUserGuess('');
    setShowRiddleHint(false);
    setRiddleState('idle');
  };

  const handleValidateRiddle = () => {
    const cleanGuess = userGuess.trim().toUpperCase();
    const cleanAnswer = currentRiddle.answer.trim().toUpperCase();

    if (cleanGuess === cleanAnswer) {
      sound.playSuccess();
      setRiddleState('success');
      if (!completedRiddles.includes(currentRiddle.id)) {
        setCompletedRiddles(prev => [...prev, currentRiddle.id]);
        onReward(45, 90);
      }
    } else {
      sound.playError();
      setRiddleState('error');
    }
  };

  // Word Search Handlers
  const handleCheckWordSearch = () => {
    const clean = selectedWordInput.trim().toUpperCase();
    if (!clean) return;

    if (SQL_WORD_SEARCH_GRID.words.includes(clean)) {
      if (!foundWords.includes(clean)) {
        sound.playSuccess();
        setFoundWords(prev => [...prev, clean]);
        setSearchFeedback(`Bravo ! "${clean}" a été découvert dans la grille (+25 XP)`);
        onReward(25, 50);
      } else {
        setSearchFeedback(`"${clean}" a déjà été trouvé !`);
      }
    } else {
      sound.playError();
      setSearchFeedback(`"${clean}" n'est pas un mot-clé présent dans la liste secrète.`);
    }
    setSelectedWordInput('');
  };

  return (
    <div className="space-y-6">
      {/* Sub-mode Selector Bar */}
      <div className="flex items-center justify-center gap-2 p-1.5 bg-[#121426] border border-[#252849] rounded-2xl max-w-xl mx-auto">
        <button
          onClick={() => {
            sound.playClick();
            setSubMode('anagrams');
          }}
          className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
            subMode === 'anagrams'
              ? 'bg-[#6C63FF] text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-[#1a1d3a]'
          }`}
        >
          <Shuffle className="w-4 h-4" />
          <span>Anagrammes SQL</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setSubMode('riddles');
          }}
          className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
            subMode === 'riddles'
              ? 'bg-[#00D4FF] text-[#0d1022] shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-[#1a1d3a]'
          }`}
        >
          <Lightbulb className="w-4 h-4" />
          <span>Devinettes de Requêtes</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setSubMode('wordsearch');
          }}
          className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
            subMode === 'wordsearch'
              ? 'bg-emerald-500 text-[#0d1022] shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-[#1a1d3a]'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Mots Mêlés SQL</span>
        </button>
      </div>

      {/* SUB-MODE 1: ANAGRAMS */}
      {subMode === 'anagrams' && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {SQL_ANAGRAMS.map((a, idx) => {
              const isCurrent = idx === anaIdx;
              const isDone = completedAna.includes(a.id);
              return (
                <button
                  key={a.id}
                  onClick={() => handleSelectAnagram(idx)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                    isCurrent
                      ? 'bg-[#6C63FF] text-white border border-[#8982ff]'
                      : isDone
                      ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
                      : 'bg-[#15182e] border border-[#272d54] text-slate-400'
                  }`}
                >
                  {isDone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Shuffle className="w-3.5 h-3.5" />}
                  <span>{a.category} #{idx + 1}</span>
                </button>
              );
            })}
          </div>

          <div className="bg-[#121426] border border-[#272b52] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#20254f] text-[#00D4FF] border border-[#384185]">
                Catégorie : {currentAna.category}
              </span>
              <h3 className="text-lg font-extrabold text-white pt-1">
                Remets les lettres dans le bon ordre
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                🔍 {currentAna.clue}
              </p>
            </div>

            {/* Answer Display Zone */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Mot Reconstitué :
              </span>
              <div className="min-h-[70px] p-3 bg-[#0a0b16] rounded-2xl border-2 border-dashed border-[#2e3463] flex items-center justify-center gap-2">
                {typedLetters.length === 0 ? (
                  <span className="text-xs text-slate-500 italic">
                    Clique sur les lettres mélangées ci-dessous...
                  </span>
                ) : (
                  typedLetters.map((char, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleRemoveLetter(idx)}
                      className="w-10 h-11 rounded-xl bg-[#6C63FF] text-white font-mono font-extrabold text-lg flex items-center justify-center shadow-md transform hover:scale-105 active:scale-95 transition-all"
                    >
                      {char}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Scrambled Letters Rack */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Lettres Disponibles :
              </span>
              <div className="p-4 bg-[#161933] rounded-2xl border border-[#272b52] flex items-center justify-center gap-2.5 min-h-[65px]">
                {availableLetters.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleAddLetter(item)}
                    className="w-10 h-11 rounded-xl bg-[#20264d] hover:bg-[#2c3468] text-[#00D4FF] border border-[#3b4587] font-mono font-extrabold text-lg flex items-center justify-center shadow-md transform hover:scale-105 active:scale-95 transition-all"
                  >
                    {item.char}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={handleValidateAnagram}
                className="px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-[#6C63FF] hover:bg-[#7e76ff] text-white shadow-lg flex items-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Valider le Mot SQL</span>
              </button>

              {anaIdx + 1 < SQL_ANAGRAMS.length && anaState === 'success' && (
                <button
                  onClick={() => handleSelectAnagram(anaIdx + 1)}
                  className="px-5 py-2 rounded-2xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5"
                >
                  <span>Suivant</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Validation Feedback */}
            {anaState !== 'idle' && (
              <div className={`p-4 rounded-2xl border ${
                anaState === 'success'
                  ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200'
                  : 'bg-rose-950/50 border-rose-500/50 text-rose-200'
              }`}>
                {anaState === 'success' ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-bold text-emerald-400 text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Trouvé ! Le mot est bien {currentAna.targetWord} (+30 XP)</span>
                    </div>
                    <p className="text-xs font-mono text-slate-300">
                      Exemple d'utilisation : <span className="text-emerald-300">{currentAna.usageExample}</span>
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 font-bold text-rose-400 text-xs">
                    <AlertCircle className="w-4 h-4" />
                    <span>Ce n'est pas tout à fait le mot recherché. Réessaie !</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-MODE 2: RIDDLES */}
      {subMode === 'riddles' && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {SQL_RIDDLES.map((r, idx) => {
              const isCurrent = idx === riddleIdx;
              const isDone = completedRiddles.includes(r.id);
              return (
                <button
                  key={r.id}
                  onClick={() => handleSelectRiddle(idx)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                    isCurrent
                      ? 'bg-[#00D4FF] text-[#0a0d1f] font-bold shadow-md'
                      : isDone
                      ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
                      : 'bg-[#15182e] border border-[#272d54] text-slate-400'
                  }`}
                >
                  {isDone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Lightbulb className="w-3.5 h-3.5" />}
                  <span>{r.title}</span>
                </button>
              );
            })}
          </div>

          <div className="bg-[#121426] border border-[#272b52] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-[#00D4FF] border border-cyan-500/40">
                Énigme #{riddleIdx + 1}
              </span>
              <h3 className="text-xl font-extrabold text-white">
                {currentRiddle.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-200 italic leading-relaxed bg-[#0e1022] p-4 rounded-2xl border border-[#252a50]">
                « {currentRiddle.riddle} »
              </p>
            </div>

            {/* Hint toggler */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  sound.playClick();
                  setShowRiddleHint(!showRiddleHint);
                }}
                className="text-xs text-amber-300 hover:text-amber-200 font-semibold flex items-center gap-1.5"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showRiddleHint ? 'Masquer l\'indice secret' : 'Afficher l\'indice secret'}</span>
              </button>
            </div>

            {showRiddleHint && (
              <div className="bg-amber-950/30 border border-amber-500/30 p-3 rounded-xl text-xs text-amber-200 animate-in fade-in">
                <strong>Indice :</strong> {currentRiddle.hint}
              </div>
            )}

            {/* Guess Input */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Ta Réponse (Mot-Clé ou Clause SQL) :
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userGuess}
                  onChange={e => {
                    setUserGuess(e.target.value);
                    setRiddleState('idle');
                  }}
                  onKeyDown={e => e.key === 'Enter' && handleValidateRiddle()}
                  placeholder="Ex: ORDER BY, JOIN, NULL..."
                  className="flex-1 px-4 py-3 rounded-2xl bg-[#0a0b16] border border-[#2c325f] text-white font-mono text-sm uppercase focus:outline-none focus:border-[#00D4FF]"
                />
                <button
                  onClick={handleValidateRiddle}
                  className="px-6 py-3 rounded-2xl font-extrabold text-xs sm:text-sm bg-gradient-to-r from-[#00D4FF] to-[#6C63FF] text-slate-900 font-bold shadow-lg hover:opacity-95 transition-all"
                >
                  <span className="text-white">Proposer</span>
                </button>
              </div>
            </div>

            {/* Riddle Feedback */}
            {riddleState !== 'idle' && (
              <div className={`p-4 rounded-2xl border ${
                riddleState === 'success'
                  ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200'
                  : 'bg-rose-950/50 border-rose-500/50 text-rose-200'
              }`}>
                {riddleState === 'success' ? (
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-emerald-400 text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Exact ! La réponse est bien {currentRiddle.answer} 🎉 (+45 XP)</span>
                    </div>
                    <p className="text-xs text-slate-300">{currentRiddle.explanation}</p>
                    <p className="text-xs font-mono text-emerald-300 bg-[#090b17] p-2 rounded-xl border border-emerald-500/30">
                      {currentRiddle.associatedQuery}
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 font-bold text-rose-400 text-xs">
                    <AlertCircle className="w-4 h-4" />
                    <span>Ce n'est pas la bonne réponse. Relis bien l'énigme !</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-MODE 3: WORD SEARCH GRID */}
      {subMode === 'wordsearch' && (
        <div className="bg-[#121426] border border-[#272b52] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40">
              Grille Mystère SQL
            </span>
            <h3 className="text-lg font-extrabold text-white pt-1">
              Trouve les mots-clés SQL dissimulés dans la grille
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Tape les mots-clés repérés (SELECT, WHERE, JOIN, GROUP, HAVING, LIKE, LIMIT, ORDER, UNION, etc.)
            </p>
          </div>

          {/* Letter Grid */}
          <div className="p-4 bg-[#0a0b16] rounded-2xl border border-[#2a305d] flex justify-center overflow-x-auto">
            <div className="grid grid-cols-12 gap-1.5 sm:gap-2">
              {SQL_WORD_SEARCH_GRID.grid.map((row, rIdx) =>
                row.map((letter, cIdx) => (
                  <div
                    key={`${rIdx}-${cIdx}`}
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-[#141731] border border-[#252b57] text-slate-200 font-mono font-extrabold text-xs sm:text-sm flex items-center justify-center shadow-inner hover:bg-[#202754] hover:text-[#00D4FF] transition-all cursor-default select-none"
                  >
                    {letter}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Submit Word Box */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={selectedWordInput}
                onChange={e => setSelectedWordInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleCheckWordSearch()}
                placeholder="Tape le mot-clé repéré dans la grille..."
                className="flex-1 px-4 py-2.5 rounded-2xl bg-[#0a0b16] border border-[#2c325f] text-white font-mono text-xs sm:text-sm uppercase focus:outline-none focus:border-emerald-400"
              />
              <button
                onClick={handleCheckWordSearch}
                className="px-5 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-md transition-all cursor-pointer"
              >
                Vérifier
              </button>
            </div>
            {searchFeedback && (
              <p className="text-xs text-[#00D4FF] font-medium pt-1 animate-in fade-in">
                {searchFeedback}
              </p>
            )}
          </div>

          {/* Words Found Checklist */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span>Mots Clés Découverts ({foundWords.length} / {SQL_WORD_SEARCH_GRID.words.length})</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SQL_WORD_SEARCH_GRID.words.map(w => {
                const isFound = foundWords.includes(w);
                return (
                  <span
                    key={w}
                    className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold border transition-all ${
                      isFound
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300 line-through opacity-80'
                        : 'bg-[#181b36] border-[#292f5c] text-slate-400'
                    }`}
                  >
                    {w}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
