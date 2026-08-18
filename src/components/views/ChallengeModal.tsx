import React, { useState, useEffect, useRef } from 'react';
import { 
  X, HelpCircle, Database, CheckCircle2, AlertCircle, 
  Clock, Skull, Zap, ChevronDown, ChevronUp, Play, 
  Sparkles, Award, ShieldAlert, Heart, Eye
} from 'lucide-react';
import { Challenge, PlayerProfile, QueryResult, ValidationResult } from '../../types';
import { SQLSandbox } from '../../sql/sandbox';
import { SqlEditor } from '../SqlEditor';
import { QueryResultTable } from '../QueryResultTable';
import { SchemaViewer } from '../SchemaViewer';
import { sound } from '../../game/sound';
import { DATABASES } from '../../sql/databases';

interface ChallengeModalProps {
  challenge: Challenge;
  profile: PlayerProfile;
  onClose: () => void;
  onSuccess: (xp: number, points: number, bonusXp?: number) => void;
  onFail: () => void;
}

export const ChallengeModal: React.FC<ChallengeModalProps> = ({
  challenge,
  profile,
  onClose,
  onSuccess,
  onFail
}) => {
  // State
  const [userQuery, setUserQuery] = useState<string>(
    challenge.type === 'FIND_ERROR' && challenge.queryWithError 
      ? challenge.queryWithError 
      : ''
  );
  const [currentSubTaskIdx, setCurrentSubTaskIdx] = useState<number>(0);
  const [bossHp, setBossHp] = useState<number>(challenge.bossHp || 3);
  const [showSchema, setShowSchema] = useState<boolean>(false);
  const [showHints, setShowHints] = useState<boolean>(false);
  const [unlockedHintIndex, setUnlockedHintIndex] = useState<number>(0);
  
  // Execution & Validation results
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [expectedResult, setExpectedResult] = useState<QueryResult | null>(null);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  // Timed challenge state
  const [timeLeft, setTimeLeft] = useState<number>(challenge.timeLimitSeconds || 60);
  const [timerActive, setTimerActive] = useState<boolean>(challenge.type === 'TIMED');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeSubTask = challenge.subTasks ? challenge.subTasks[currentSubTaskIdx] : null;
  const currentExpectedQuery = activeSubTask 
    ? activeSubTask.expectedQuery 
    : (challenge.correctQuery || challenge.expectedQuery || '');

  // Initialize and clean up timer
  useEffect(() => {
    if (challenge.type === 'TIMED') {
      setTimeLeft(challenge.timeLimitSeconds || 60);
      setTimerActive(true);
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setTimerActive(false);
            sound.playError();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    if (challenge.type === 'BOSS') {
      sound.playBoss();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [challenge]);

  // Execute and Validate Query
  const handleExecuteAndValidate = () => {
    setIsExecuting(true);
    setValidationResult(null);

    try {
      // 1. Run validation against current target query
      const validation = SQLSandbox.validateChallenge(
        challenge.databaseId,
        userQuery,
        currentExpectedQuery
      );

      setQueryResult(validation.actualResult || null);
      setExpectedResult(validation.expectedResult || null);
      setValidationResult(validation);

      if (validation.isCorrect) {
        sound.playSuccess();

        // Handle Boss Sub-tasks
        if (challenge.type === 'BOSS' && challenge.subTasks) {
          const nextHp = bossHp - 1;
          setBossHp(nextHp);

          if (currentSubTaskIdx + 1 < challenge.subTasks.length) {
            // Move to next boss phase
            setTimeout(() => {
              setCurrentSubTaskIdx(prev => prev + 1);
              setUserQuery('');
              setValidationResult(null);
            }, 1200);
            return;
          }
        }

        // Calculate bonuses
        let bonusXp = 0;
        let bonusPoints = 0;
        if (challenge.type === 'TIMED' && timeLeft > 0) {
          bonusXp = Math.round(timeLeft * 1.5);
          bonusPoints = timeLeft * 3;
          if (timerRef.current) clearInterval(timerRef.current);
        }

        setTimeout(() => {
          onSuccess(
            challenge.xpReward + bonusXp,
            challenge.pointsReward + bonusPoints,
            bonusXp
          );
        }, 1000);

      } else {
        sound.playError();
        onFail();
      }
    } catch (err: any) {
      console.error(err);
      sound.playError();
    } finally {
      setIsExecuting(false);
    }
  };

  const currentDb = DATABASES[challenge.databaseId] || DATABASES.university;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#121426] border border-[#2b2f5b] rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className={`px-5 py-3.5 border-b flex items-center justify-between gap-3 ${
          challenge.type === 'BOSS'
            ? 'bg-gradient-to-r from-rose-950/80 via-[#1c142b] to-[#121426] border-rose-500/40'
            : challenge.type === 'TIMED'
            ? 'bg-gradient-to-r from-amber-950/80 via-[#211b15] to-[#121426] border-amber-500/40'
            : 'bg-[#181b38] border-[#2b2f5b]'
        }`}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-[#23274e] border border-[#3b417e] text-xl">
              {challenge.type === 'BOSS' ? (challenge.bossAvatar || '👾') : challenge.type === 'TIMED' ? '⏱️' : challenge.type === 'FIND_ERROR' ? '⚡' : '📜'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#20254b] text-[#00D4FF] border border-[#343b75]">
                  {challenge.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  DB : {currentDb.name}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-white">
                {challenge.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Timed countdown widget */}
            {challenge.type === 'TIMED' && (
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-mono font-bold text-sm border ${
                timeLeft <= 15
                  ? 'bg-rose-950/80 border-rose-500 text-rose-300 animate-ping'
                  : 'bg-amber-950/60 border-amber-500/50 text-amber-300'
              }`}>
                <Clock className="w-4 h-4" />
                <span>{timeLeft}s</span>
              </div>
            )}

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-2 rounded-xl bg-[#202447] text-slate-400 hover:text-white hover:bg-[#2c325e] border border-[#313768] transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body with scrollable content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          
          {/* Boss Encounter Header */}
          {challenge.type === 'BOSS' && (
            <div className="bg-gradient-to-r from-rose-950/50 via-[#1f162e] to-[#141224] border border-rose-500/40 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-extrabold text-rose-300">
                  <Skull className="w-4 h-4 text-rose-400" />
                  <span>{challenge.bossName || 'Boss Suprême'}</span>
                </div>
                <div className="text-xs font-bold text-slate-400">
                  Phase {currentSubTaskIdx + 1} / {challenge.subTasks?.length || 3}
                </div>
              </div>

              {/* Boss HP Bar */}
              <div className="w-full bg-[#1b1220] h-3 rounded-full overflow-hidden border border-rose-900/60 relative">
                <div
                  className="h-full bg-gradient-to-r from-rose-600 to-amber-500 transition-all duration-500"
                  style={{
                    width: `${(bossHp / (challenge.bossHp || 3)) * 100}%`
                  }}
                />
              </div>

              {challenge.story && (
                <p className="text-xs text-rose-200/90 italic">
                  "{challenge.story}"
                </p>
              )}
            </div>
          )}

          {/* Quest Objectives Description */}
          <div className="bg-[#161933] border border-[#2b305c] rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00D4FF] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Objectif de la Quête
              </span>
              <button
                onClick={() => setShowSchema(!showSchema)}
                className="text-xs font-semibold text-slate-300 hover:text-[#00D4FF] flex items-center gap-1 bg-[#202447] px-2.5 py-1 rounded-lg border border-[#353b70] transition-all"
              >
                <Database className="w-3.5 h-3.5 text-[#00D4FF]" />
                <span>{showSchema ? 'Masquer Schéma' : 'Inspecter Tables'}</span>
              </button>
            </div>

            <p className="text-sm font-medium text-slate-200 leading-relaxed">
              {activeSubTask ? activeSubTask.instruction : challenge.description}
            </p>

            {/* If FIND_ERROR challenge: show error context */}
            {challenge.type === 'FIND_ERROR' && challenge.errorDescription && (
              <div className="bg-amber-950/40 border border-amber-500/40 p-3 rounded-xl text-xs space-y-1">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <span>Rapport de Bug</span>
                </div>
                <p className="text-slate-300">{challenge.errorDescription}</p>
              </div>
            )}
          </div>

          {/* Database Schema Drawer (collapsible) */}
          {showSchema && (
            <div className="animate-in fade-in duration-200">
              <SchemaViewer databaseId={challenge.databaseId} onClose={() => setShowSchema(false)} />
            </div>
          )}

          {/* SQL Editor Area */}
          <SqlEditor
            value={userQuery}
            onChange={setUserQuery}
            onExecute={handleExecuteAndValidate}
            onOpenSchema={() => setShowSchema(!showSchema)}
            isLoading={isExecuting}
            disabled={challenge.type === 'TIMED' && timeLeft === 0}
            placeholder="Écris ta requête pour accomplir cet objectif..."
          />

          {/* Validation Feedback Banner */}
          {validationResult && (
            <div className={`p-4 rounded-2xl border transition-all animate-in fade-in ${
              validationResult.isCorrect
                ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200'
                : 'bg-rose-950/50 border-rose-500/50 text-rose-200'
            }`}>
              <div className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  {validationResult.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-400" />
                  )}
                </div>
                <div className="space-y-1 flex-1">
                  <h4 className="text-sm font-extrabold">
                    {validationResult.isCorrect ? 'Succès Épique ! 🎉' : 'Résultat Non Conforme'}
                  </h4>
                  <p className="text-xs leading-relaxed opacity-90">
                    {validationResult.message}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Query Results & Tabular Comparison */}
          {queryResult && (
            <QueryResultTable
              result={queryResult}
              expectedResult={expectedResult}
              showComparison={!validationResult?.isCorrect}
            />
          )}

          {/* Hints Accordion */}
          {challenge.hints && challenge.hints.length > 0 && (
            <div className="bg-[#14172e] border border-[#272c54] rounded-2xl p-3.5">
              <button
                onClick={() => {
                  sound.playClick();
                  setShowHints(!showHints);
                }}
                className="w-full flex items-center justify-between text-xs font-bold text-amber-300"
              >
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                  <span>Besoin d'aide ? ({challenge.hints.length} indice(s) de l'Oracle)</span>
                </div>
                {showHints ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showHints && (
                <div className="mt-3 space-y-2 pt-2 border-t border-[#252a50]">
                  {challenge.hints.map((hint, idx) => (
                    <div key={idx} className="text-xs text-slate-300 bg-[#101224] p-2.5 rounded-xl border border-[#2b3058] flex items-start gap-2">
                      <span className="text-amber-400 font-bold font-mono">#{idx + 1}</span>
                      <span>{hint}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
