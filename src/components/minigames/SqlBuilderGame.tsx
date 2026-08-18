import React, { useState } from 'react';
import { 
  Puzzle, Play, CheckCircle2, AlertCircle, Sparkles, 
  RotateCcw, HelpCircle, ArrowRight, Layers, Eye, Trophy, Check
} from 'lucide-react';
import { BUILDER_PUZZLES } from '../../game/builderPuzzles';
import { BuilderPuzzle, SQLBlock, QueryResult } from '../../types';
import { SQLSandbox } from '../../sql/sandbox';
import { QueryResultTable } from '../QueryResultTable';
import { sound } from '../../game/sound';

interface SqlBuilderGameProps {
  onReward: (xp: number, points: number) => void;
}

export const SqlBuilderGame: React.FC<SqlBuilderGameProps> = ({ onReward }) => {
  const [currentLevelIdx, setCurrentLevelIdx] = useState<number>(0);
  const puzzle = BUILDER_PUZZLES[currentLevelIdx];

  const [selectedBlocks, setSelectedBlocks] = useState<SQLBlock[]>([]);
  const [availableBlocks, setAvailableBlocks] = useState<SQLBlock[]>(puzzle.availableBlocks);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<QueryResult | null>(null);
  const [validationState, setValidationState] = useState<'idle' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [completedLevels, setCompletedLevels] = useState<string[]>([]);

  // When changing level, reset state
  const handleSelectLevel = (idx: number) => {
    sound.playClick();
    setCurrentLevelIdx(idx);
    const target = BUILDER_PUZZLES[idx];
    setSelectedBlocks([]);
    setAvailableBlocks([...target.availableBlocks].sort(() => Math.random() - 0.5));
    setShowHint(false);
    setTestResult(null);
    setValidationState('idle');
    setFeedbackMessage('');
  };

  // Add block to construction line
  const handleAddBlock = (block: SQLBlock) => {
    sound.playClick();
    setSelectedBlocks(prev => [...prev, block]);
    setAvailableBlocks(prev => prev.filter(b => b.id !== block.id));
    setValidationState('idle');
  };

  // Remove block from construction line
  const handleRemoveBlock = (block: SQLBlock, index: number) => {
    sound.playClick();
    setSelectedBlocks(prev => prev.filter((_, i) => i !== index));
    setAvailableBlocks(prev => [...prev, block]);
    setValidationState('idle');
  };

  // Reset current puzzle
  const handleReset = () => {
    sound.playClick();
    setSelectedBlocks([]);
    setAvailableBlocks([...puzzle.availableBlocks].sort(() => Math.random() - 0.5));
    setValidationState('idle');
    setTestResult(null);
    setFeedbackMessage('');
  };

  // Build the SQL string from chosen blocks
  const constructedQuery = selectedBlocks.map(b => b.text).join(' ').trim();

  // Validate and Execute
  const handleTestConstruction = () => {
    if (selectedBlocks.length === 0) {
      setValidationState('error');
      setFeedbackMessage('Ajoute des blocs pour construire ta requête.');
      sound.playError();
      return;
    }

    try {
      // Execute constructed query in sandbox
      const res = SQLSandbox.executeQuery(puzzle.databaseId, constructedQuery);
      setTestResult(res);

      if (!res.success) {
        setValidationState('error');
        setFeedbackMessage(res.error || 'Erreur de syntaxe SQL dans l\'assemblage.');
        sound.playError();
        return;
      }

      // Check validation against expected query
      const validation = SQLSandbox.validateChallenge(puzzle.databaseId, constructedQuery, puzzle.expectedQuery);

      if (validation.isCorrect) {
        sound.playSuccess();
        setValidationState('success');
        setFeedbackMessage('Assemblage parfait ! La requête retourne exactement les données attendues.');
        
        if (!completedLevels.includes(puzzle.id)) {
          setCompletedLevels(prev => [...prev, puzzle.id]);
          onReward(50, 100);
        }
      } else {
        sound.playError();
        setValidationState('error');
        setFeedbackMessage(validation.message || 'La requête est syntaxiquement valide mais ne produit pas le résultat attendu.');
      }
    } catch (e: any) {
      setValidationState('error');
      setFeedbackMessage(e?.message || 'Erreur inattendue.');
      sound.playError();
    }
  };

  // Block style helper
  const getBlockColorClass = (type: SQLBlock['type']) => {
    switch (type) {
      case 'keyword':
        return 'bg-purple-950/80 border-purple-500/60 text-purple-200 hover:border-purple-400';
      case 'clause':
        return 'bg-indigo-950/80 border-indigo-500/60 text-indigo-200 hover:border-indigo-400';
      case 'column':
        return 'bg-cyan-950/80 border-cyan-500/60 text-cyan-200 hover:border-cyan-400';
      case 'table':
        return 'bg-amber-950/80 border-amber-500/60 text-amber-200 hover:border-amber-400';
      case 'operator':
        return 'bg-emerald-950/80 border-emerald-500/60 text-emerald-200 hover:border-emerald-400';
      case 'function':
        return 'bg-rose-950/80 border-rose-500/60 text-rose-200 hover:border-rose-400';
      case 'value':
        return 'bg-blue-950/80 border-blue-500/60 text-blue-200 hover:border-blue-400';
      default:
        return 'bg-slate-800 border-slate-600 text-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Level Selector Strip */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {BUILDER_PUZZLES.map((p, idx) => {
          const isCurrent = idx === currentLevelIdx;
          const isDone = completedLevels.includes(p.id);

          return (
            <button
              key={p.id}
              onClick={() => handleSelectLevel(idx)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                isCurrent
                  ? 'bg-[#6C63FF] text-white shadow-[0_0_12px_rgba(108,99,255,0.4)] border border-[#8b84ff]'
                  : isDone
                  ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
                  : 'bg-[#15182e] border border-[#272d54] text-slate-400 hover:text-slate-200'
              }`}
            >
              {isDone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Puzzle className="w-3.5 h-3.5" />}
              <span>{p.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Puzzle Arena */}
      <div className="bg-[#121426] border border-[#272b52] rounded-3xl p-5 sm:p-7 space-y-6 shadow-2xl">
        
        {/* Objective & Category Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#252a50] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#20254f] text-[#00D4FF] border border-[#384185]">
                {puzzle.category} &bull; {puzzle.difficulty}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Base : {puzzle.databaseId}
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-white">
              {puzzle.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              {puzzle.objective}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                setShowHint(!showHint);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#1a1d3a] hover:bg-[#252a50] text-amber-300 border border-amber-500/30 transition-all"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showHint ? 'Masquer Indice' : 'Indice'}</span>
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#1a1d3a] hover:bg-[#252a50] text-slate-400 hover:text-white border border-[#2a2f58] transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Réinitialiser</span>
            </button>
          </div>
        </div>

        {/* Hints Box */}
        {showHint && (
          <div className="bg-amber-950/30 border border-amber-500/30 p-3.5 rounded-2xl text-xs space-y-1.5 text-amber-200 animate-in fade-in">
            <div className="font-bold flex items-center gap-1.5 text-amber-400">
              <HelpCircle className="w-4 h-4" />
              <span>Conseil d'assemblage de l'Architecte SQL</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              {puzzle.hints.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Drop Zone / Construction Line */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#00D4FF]" />
              <span>Zone d'Assemblage de la Requête (Clique pour retirer un bloc)</span>
            </span>
            <span className="text-[11px] font-mono text-slate-500">
              {selectedBlocks.length} bloc(s) posé(s)
            </span>
          </div>

          <div className="min-h-[90px] p-4 bg-[#0a0b16] rounded-2xl border-2 border-dashed border-[#2e3463] flex flex-wrap items-center gap-2 content-start transition-all">
            {selectedBlocks.length === 0 ? (
              <div className="text-slate-500 text-xs italic mx-auto text-center py-4 flex items-center gap-2">
                <span>Clique sur les blocs ci-dessous pour assembler ta requête dans le bon ordre...</span>
              </div>
            ) : (
              selectedBlocks.map((block, idx) => (
                <button
                  key={`${block.id}-${idx}`}
                  onClick={() => handleRemoveBlock(block, idx)}
                  className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold border shadow-md transition-all transform hover:scale-105 active:scale-95 cursor-pointer select-none ${getBlockColorClass(block.type)}`}
                  title="Cliquer pour retirer ce bloc"
                >
                  {block.text}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Live SQL Preview Box */}
        <div className="bg-[#0e1022] border border-[#202549] rounded-xl p-3 flex items-center justify-between gap-3 text-xs font-mono">
          <span className="text-slate-500 uppercase tracking-wider font-bold text-[10px] shrink-0">
            Requête SQL Résultante :
          </span>
          <span className="text-emerald-300 truncate font-semibold">
            {constructedQuery || '(requête vide)'}
          </span>
        </div>

        {/* Available Blocks Rack */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Puzzle className="w-3.5 h-3.5 text-[#6C63FF]" />
            <span>Pièces de Construction Disponibles :</span>
          </div>

          <div className="p-4 bg-[#161933] rounded-2xl border border-[#272b52] flex flex-wrap items-center gap-2.5 min-h-[70px]">
            {availableBlocks.length === 0 ? (
              <span className="text-slate-500 text-xs italic mx-auto">
                Tous les blocs ont été placés dans la zone d'assemblage !
              </span>
            ) : (
              availableBlocks.map(block => (
                <button
                  key={block.id}
                  onClick={() => handleAddBlock(block)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold border shadow-md transition-all transform hover:scale-105 hover:shadow-lg active:scale-95 cursor-pointer select-none ${getBlockColorClass(block.type)}`}
                >
                  {block.text}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Action Button & Validation Feedback */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={handleTestConstruction}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl font-extrabold text-sm text-white bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] hover:from-[#7b73ff] hover:to-[#22dcff] shadow-[0_0_20px_rgba(108,99,255,0.4)] flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Tester la Construction SQL</span>
          </button>

          {currentLevelIdx + 1 < BUILDER_PUZZLES.length && validationState === 'success' && (
            <button
              onClick={() => handleSelectLevel(currentLevelIdx + 1)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-2xl font-extrabold text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-md flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Niveau Suivant</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Validation Status Message */}
        {validationState !== 'idle' && (
          <div className={`p-4 rounded-2xl border transition-all animate-in fade-in ${
            validationState === 'success'
              ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200'
              : 'bg-rose-950/50 border-rose-500/50 text-rose-200'
          }`}>
            <div className="flex items-start gap-3">
              {validationState === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <h4 className="text-sm font-bold">
                  {validationState === 'success' ? 'Bravo ! Assemblage Valide 🎉 (+50 XP)' : 'Erreur dans la Construction'}
                </h4>
                <p className="text-xs leading-relaxed opacity-90">{feedbackMessage}</p>
                {validationState === 'success' && puzzle.explanation && (
                  <p className="text-xs text-emerald-300/80 pt-1 font-mono italic">
                    💡 {puzzle.explanation}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Test Result Data Table */}
        {testResult && testResult.success && (
          <div className="space-y-2 pt-2 animate-in fade-in">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Données Renvoyées par la Requête Assemblée :
            </span>
            <QueryResultTable result={testResult} />
          </div>
        )}

      </div>
    </div>
  );
};
