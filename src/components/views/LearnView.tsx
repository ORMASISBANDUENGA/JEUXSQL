import React, { useState } from 'react';
import { BookOpen, Sparkles, Play, Code2, Check, Copy, HelpCircle, Layers, Lightbulb } from 'lucide-react';
import { LESSONS, LessonSection } from '../../game/lessons';
import { SQLSandbox } from '../../sql/sandbox';
import { QueryResultTable } from '../QueryResultTable';
import { sound } from '../../game/sound';
import { QueryResult } from '../../types';

export const LearnView: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<LessonSection>(LESSONS[0]);
  const [testResult, setTestResult] = useState<QueryResult | null>(null);
  const [copiedQuery, setCopiedQuery] = useState<boolean>(false);

  const runExample = (query: string, dbId: string) => {
    sound.playClick();
    const res = SQLSandbox.executeQuery(dbId, query);
    setTestResult(res);
    if (res.success) {
      sound.playSuccess();
    }
  };

  const copyCode = (code: string) => {
    sound.playClick();
    navigator.clipboard.writeText(code);
    setCopiedQuery(true);
    setTimeout(() => setCopiedQuery(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-10">
      
      {/* Left Sidebar: Lesson Navigation List */}
      <div className="lg:col-span-4 space-y-3">
        <div className="bg-[#121426] border border-[#272b52] rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-[#00D4FF]">
            <BookOpen className="w-4 h-4" />
            <span>Modules d'Apprentissage</span>
          </div>

          <div className="space-y-1.5">
            {LESSONS.map(lesson => {
              const isSelected = selectedLesson.id === lesson.id;
              return (
                <button
                  key={lesson.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedLesson(lesson);
                    setTestResult(null);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#6C63FF]/30 to-[#00D4FF]/20 text-white border border-[#6C63FF] shadow-sm'
                      : 'text-slate-300 hover:bg-[#181a33] border border-transparent'
                  }`}
                >
                  <span className="truncate">{lesson.title}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#1b1e3d] text-[#00D4FF] shrink-0">
                    {lesson.category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Area: Selected Lesson Content */}
      <div className="lg:col-span-8 space-y-6">
        {/* Lesson Header Card */}
        <div className="bg-[#121426] border border-[#272b52] rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#20254f] text-[#00D4FF] border border-[#384185]">
              {selectedLesson.category} &bull; {selectedLesson.difficulty}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Base : {selectedLesson.databaseId}
            </span>
          </div>

          <h2 className="text-xl font-extrabold text-white">
            {selectedLesson.title}
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed font-medium">
            {selectedLesson.summary}
          </p>

          {/* Syntax Highlight Box */}
          <div className="bg-[#0b0c18] border border-[#23274d] rounded-xl p-3.5 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Syntaxe Formelle :
            </span>
            <code className="text-xs sm:text-sm font-mono text-[#00D4FF] block">
              {selectedLesson.syntax}
            </code>
          </div>

          {/* Explanation Points */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Explications & Règles Clés :
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedLesson.explanation.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#6C63FF] font-bold">&bull;</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Live Executable Example Query */}
          <div className="bg-[#161833] border border-[#2c315e] rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-amber-400" /> Exemple Interactif
              </span>
              
              <button
                onClick={() => copyCode(selectedLesson.exampleQuery)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-[#202447] px-2.5 py-1 rounded-lg border border-[#353b70]"
              >
                {copiedQuery ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copier</span>
              </button>
            </div>

            <div className="bg-[#0b0c18] p-3 rounded-xl font-mono text-xs text-emerald-300 border border-[#23274d] overflow-x-auto">
              {selectedLesson.exampleQuery}
            </div>

            <button
              onClick={() => runExample(selectedLesson.exampleQuery, selectedLesson.databaseId)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] hover:from-[#7c74ff] hover:to-[#22dcff] shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Tester cette requête en direct</span>
            </button>
          </div>

          {/* Result Output if example was tested */}
          {testResult && (
            <div className="pt-2 animate-in fade-in">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Résultat de l'Exécution Sandbox :
              </span>
              <QueryResultTable result={testResult} />
            </div>
          )}

          {/* Cheat Sheet Table */}
          {selectedLesson.cheatSheet && (
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider block">
                Aide-Mémoire Rapide :
              </span>
              <div className="overflow-x-auto border border-[#272b52] rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#181a33] text-slate-300 border-b border-[#272b52]">
                    <tr>
                      <th className="px-3 py-2">Mot-clé</th>
                      <th className="px-3 py-2">Description</th>
                      <th className="px-3 py-2">Exemple</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#212447] text-slate-300 font-mono">
                    {selectedLesson.cheatSheet.map((item, idx) => (
                      <tr key={idx} className="hover:bg-[#181b36]">
                        <td className="px-3 py-2 text-[#00D4FF] font-bold">{item.keyword}</td>
                        <td className="px-3 py-2 font-sans">{item.description}</td>
                        <td className="px-3 py-2 text-amber-300 text-[11px]">{item.syntax}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pro Tips Box */}
          {selectedLesson.tips.length > 0 && (
            <div className="bg-[#1a172e] border border-amber-500/30 p-4 rounded-2xl space-y-1.5 text-xs text-amber-200">
              <div className="font-bold flex items-center gap-1.5 text-amber-300">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Conseils de Pro & Bonnes Pratiques</span>
              </div>
              <ul className="space-y-1 list-disc list-inside text-slate-300">
                {selectedLesson.tips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
