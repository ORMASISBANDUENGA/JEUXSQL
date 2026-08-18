import React, { useState } from 'react';
import { 
  PenTool, CheckCircle2, AlertCircle, Play, HelpCircle, 
  RotateCcw, ArrowRight, Sparkles, Award, Check
} from 'lucide-react';
import { FILL_BLANK_QUESTIONS } from '../../game/fillBlanks';
import { FillBlankQuestion, QueryResult } from '../../types';
import { SQLSandbox } from '../../sql/sandbox';
import { QueryResultTable } from '../QueryResultTable';
import { sound } from '../../game/sound';

interface FillBlanksGameProps {
  onReward: (xp: number, points: number) => void;
}

export const FillBlanksGame: React.FC<FillBlanksGameProps> = ({ onReward }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const question = FILL_BLANK_QUESTIONS[currentIdx];

  // Map of blankIndex -> selected option string
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showHint, setShowHint] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<QueryResult | null>(null);
  const [validationState, setValidationState] = useState<'idle' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState<string>('');
  const [completedQuestions, setCompletedQuestions] = useState<string[]>([]);

  const handleSelectLevel = (idx: number) => {
    sound.playClick();
    setCurrentIdx(idx);
    setSelectedAnswers({});
    setShowHint(false);
    setTestResult(null);
    setValidationState('idle');
    setFeedback('');
  };

  const handleChooseOption = (blankIndex: number, option: string) => {
    sound.playClick();
    setSelectedAnswers(prev => ({
      ...prev,
      [blankIndex]: option
    }));
    setValidationState('idle');
  };

  const handleReset = () => {
    sound.playClick();
    setSelectedAnswers({});
    setShowHint(false);
    setTestResult(null);
    setValidationState('idle');
    setFeedback('');
  };

  // Construct current query with chosen values
  const constructedQuery = question.templateSegments
    .map(seg => {
      if (seg.blankIndex !== undefined) {
        return selectedAnswers[seg.blankIndex] || `[ ? ]`;
      }
      return seg.text;
    })
    .join('');

  const allFilled = question.blanks.every(b => !!selectedAnswers[b.id]);

  const handleValidate = () => {
    if (!allFilled) {
      sound.playError();
      setValidationState('error');
      setFeedback('Veuillez remplir tous les trous de la requête avant de valider.');
      return;
    }

    // Check if every answer matches
    const isAllCorrect = question.blanks.every(
      b => selectedAnswers[b.id] === b.correctAnswer
    );

    if (isAllCorrect) {
      sound.playSuccess();
      setValidationState('success');
      setFeedback('Excellent ! Tous les termes ont été correctement insérés.');

      // Run in sandbox to show live result table
      const res = SQLSandbox.executeQuery(question.databaseId, question.expectedFullQuery);
      setTestResult(res);

      if (!completedQuestions.includes(question.id)) {
        setCompletedQuestions(prev => [...prev, question.id]);
        onReward(40, 80);
      }
    } else {
      sound.playError();
      setValidationState('error');
      setFeedback('Certains choix ne sont pas corrects. Relis la consigne et consulte les indices si besoin.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Level Selector */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {FILL_BLANK_QUESTIONS.map((q, idx) => {
          const isCurrent = idx === currentIdx;
          const isDone = completedQuestions.includes(q.id);

          return (
            <button
              key={q.id}
              onClick={() => handleSelectLevel(idx)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                isCurrent
                  ? 'bg-[#00D4FF] text-[#0f1020] font-bold shadow-[0_0_12px_rgba(0,212,255,0.4)]'
                  : isDone
                  ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
                  : 'bg-[#15182e] border border-[#272d54] text-slate-400 hover:text-slate-200'
              }`}
            >
              {isDone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <PenTool className="w-3.5 h-3.5" />}
              <span>{q.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Fill Blanks Card */}
      <div className="bg-[#121426] border border-[#272b52] rounded-3xl p-5 sm:p-7 space-y-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#252a50] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#20254f] text-[#00D4FF] border border-[#384185]">
                {question.category} &bull; {question.difficulty}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Base : {question.databaseId}
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-white">
              {question.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              {question.objective}
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
              <span>Effacer</span>
            </button>
          </div>
        </div>

        {/* Hint Box */}
        {showHint && (
          <div className="bg-amber-950/30 border border-amber-500/30 p-3.5 rounded-2xl text-xs space-y-1.5 text-amber-200 animate-in fade-in">
            <div className="font-bold flex items-center gap-1.5 text-amber-400">
              <HelpCircle className="w-4 h-4" />
              <span>Indices pour les mots manquants :</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              {question.blanks.map(b => (
                <li key={b.id}>
                  <strong className="text-amber-300">Trou #{b.id + 1} :</strong> {b.hint}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* The Fill-in Sentence Display */}
        <div className="p-6 bg-[#0a0b16] rounded-2xl border border-[#2a305d] space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            Phrase SQL à Compléter :
          </span>

          <div className="font-mono text-sm sm:text-base leading-loose text-slate-200 flex flex-wrap items-center gap-1.5">
            {question.templateSegments.map((seg, idx) => {
              if (seg.blankIndex !== undefined) {
                const blankId = seg.blankIndex;
                const chosen = selectedAnswers[blankId];
                return (
                  <span
                    key={idx}
                    className={`inline-flex items-center px-3 py-1 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                      chosen
                        ? 'bg-[#6C63FF]/30 border-[#6C63FF] text-[#00D4FF] shadow-sm'
                        : 'bg-[#181b38] border-dashed border-[#444c8a] text-slate-500'
                    }`}
                  >
                    {chosen || `[ Trou #${blankId + 1} ]`}
                  </span>
                );
              }
              return <span key={idx}>{seg.text}</span>;
            })}
          </div>
        </div>

        {/* Choice Options for each Blank */}
        <div className="space-y-4">
          {question.blanks.map(blank => {
            const currentSelected = selectedAnswers[blank.id];

            return (
              <div key={blank.id} className="bg-[#161933] border border-[#272b52] p-4 rounded-2xl space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#00D4FF]">
                    Sélectionne le terme pour le Trou #{blank.id + 1} :
                  </span>
                  <span className="text-slate-400 text-[11px] font-mono italic">
                    {blank.hint}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {blank.options.map(opt => {
                    const isSelected = currentSelected === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => handleChooseOption(blank.id, opt)}
                        className={`p-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold border transition-all cursor-pointer select-none ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] text-white border-white shadow-md'
                            : 'bg-[#0f1122] hover:bg-[#1a1e3d] text-slate-300 border-[#2b3058]'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button & Validation Feedback */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={handleValidate}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl font-extrabold text-sm text-white bg-gradient-to-r from-[#00D4FF] to-[#6C63FF] hover:from-[#35deff] hover:to-[#7e76ff] shadow-[0_0_20px_rgba(0,212,255,0.4)] flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer text-[#0b0d1b] font-bold"
          >
            <Play className="w-4 h-4 fill-[#0b0d1b]" />
            <span className="text-white font-extrabold">Valider la Requête</span>
          </button>

          {currentIdx + 1 < FILL_BLANK_QUESTIONS.length && validationState === 'success' && (
            <button
              onClick={() => handleSelectLevel(currentIdx + 1)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-2xl font-extrabold text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-md flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Question Suivante</span>
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
                  {validationState === 'success' ? 'Bravo ! Phrase Complétée 🎉 (+40 XP)' : 'Correction Requise'}
                </h4>
                <p className="text-xs leading-relaxed opacity-90">{feedback}</p>
                {validationState === 'success' && question.explanation && (
                  <p className="text-xs text-emerald-300/80 pt-1 font-mono italic">
                    💡 {question.explanation}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Sandbox Live Table Preview */}
        {testResult && testResult.success && (
          <div className="space-y-2 pt-2 animate-in fade-in">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Résultat d'Exécution de la Requête Validée :
            </span>
            <QueryResultTable result={testResult} />
          </div>
        )}

      </div>
    </div>
  );
};
