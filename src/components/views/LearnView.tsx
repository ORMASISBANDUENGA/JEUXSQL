import React, { useState, useMemo } from 'react';
import { BookOpen, Search, Play, Code2, Check, Copy, Lightbulb, Layers, Sparkles, Filter } from 'lucide-react';
import { LESSONS, LessonSection } from '../../game/lessons';
import { SQLSandbox } from '../../sql/sandbox';
import { QueryResultTable } from '../QueryResultTable';
import { sound } from '../../game/sound';
import { QueryResult, Language } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';

interface LearnViewProps {
  language?: Language;
}

export const LearnView: React.FC<LearnViewProps> = ({ language = 'fr' }) => {
  const [selectedLessonId, setSelectedLessonId] = useState<string>(LESSONS[0].id);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [testResult, setTestResult] = useState<QueryResult | null>(null);
  const [copiedQuery, setCopiedQuery] = useState<boolean>(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.fr;

  const categories = useMemo(() => {
    const set = new Set<string>();
    LESSONS.forEach(l => set.add(l.category));
    return ['ALL', ...Array.from(set)];
  }, []);

  const filteredLessons = useMemo(() => {
    return LESSONS.filter(lesson => {
      const matchesCategory = selectedCategory === 'ALL' || lesson.category === selectedCategory;
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch = !term || 
        lesson.title.toLowerCase().includes(term) ||
        lesson.summary.toLowerCase().includes(term) ||
        lesson.syntax.toLowerCase().includes(term) ||
        lesson.category.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const activeLesson = useMemo(() => {
    const found = LESSONS.find(l => l.id === selectedLessonId);
    return found || filteredLessons[0] || LESSONS[0];
  }, [selectedLessonId, filteredLessons]);

  const runExample = (query: string, dbId: string) => {
    sound.playClick();
    const res = SQLSandbox.executeQuery(dbId, query);
    setTestResult(res);
    if (res.success) {
      sound.playSuccess();
    } else {
      sound.playError();
    }
  };

  const copyCode = (code: string) => {
    sound.playClick();
    navigator.clipboard.writeText(code);
    setCopiedQuery(true);
    setTimeout(() => setCopiedQuery(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
      
      {/* Left Sidebar: Lessons Index & Search Filter */}
      <div className="lg:col-span-4 space-y-3">
        <div className="app-card border rounded-2xl p-4 shadow-lg space-y-3">
          
          {/* Header Title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#00D4FF]">
              <BookOpen className="w-4 h-4" />
              <span>{t.learnModules}</span>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#6C63FF]/20 text-[#6C63FF]">
              {filteredLessons.length} / {LESSONS.length}
            </span>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder={t.learnSearchPlaceholder}
              className="w-full pl-8 pr-3 py-2 text-xs rounded-xl app-subcard border text-slate-200 focus:outline-none focus:border-[#6C63FF] transition-all"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto py-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  sound.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#6C63FF] text-white shadow-sm'
                    : 'app-subcard text-slate-400 hover:text-white border'
                }`}
              >
                {cat === 'ALL' ? t.allCategories : cat}
              </button>
            ))}
          </div>

          {/* Lessons List */}
          <div className="space-y-1.5 max-h-[520px] overflow-y-auto pr-1">
            {filteredLessons.length === 0 ? (
              <p className="text-xs text-center py-6 text-slate-400">
                {t.noLessonsFound}
              </p>
            ) : (
              filteredLessons.map(lesson => {
                const isSelected = activeLesson.id === lesson.id;
                return (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedLessonId(lesson.id);
                      setTestResult(null);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#6C63FF]/30 to-[#00D4FF]/20 text-white border border-[#6C63FF] shadow-sm'
                        : 'text-slate-300 hover:bg-[#181a33]/60 dark:hover:bg-[#181a33]/60 light:hover:bg-slate-100 border border-transparent'
                    }`}
                  >
                    <span className="truncate pr-2">{lesson.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#1b1e3d] text-[#00D4FF] shrink-0">
                      {lesson.category}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Right Content Stage: Selected Lesson Detail */}
      <div className="lg:col-span-8 space-y-6">
        <div className="app-card border rounded-2xl p-6 space-y-5 shadow-xl">
          
          {/* Top Badges */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#20254f] text-[#00D4FF] border border-[#384185]">
                {activeLesson.category}
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                {t.difficultyLabel} {activeLesson.difficulty}
              </span>
            </div>
            
            <span className="text-xs text-slate-400 font-mono">
              {t.databaseTarget} <strong className="text-white uppercase">{activeLesson.databaseId}</strong>
            </span>
          </div>

          {/* Lesson Title & Summary */}
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {activeLesson.title}
            </h2>
            <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed font-medium">
              {activeLesson.summary}
            </p>
          </div>

          {/* Formal Syntax Box */}
          <div className="bg-[#070914] dark:bg-[#070914] light:bg-slate-900 border border-[#23274d] rounded-xl p-4 space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {t.formalSyntax}
            </span>
            <code className="text-xs sm:text-sm font-mono text-[#00D4FF] block overflow-x-auto">
              {activeLesson.syntax}
            </code>
          </div>

          {/* Explanation Points */}
          <div className="space-y-2.5 pt-1">
            <span className="text-xs font-bold uppercase tracking-wider block">
              {t.detailedExplanation}
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
              {activeLesson.explanation.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-[#6C63FF] font-bold text-base leading-none">&bull;</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Live Executable Example Query */}
          <div className="app-subcard border rounded-2xl p-4 sm:p-5 space-y-3 shadow-inner">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-amber-400" />
                <span>{t.runExampleQuery}</span>
              </span>
              
              <button
                onClick={() => copyCode(activeLesson.exampleQuery)}
                className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 app-card px-3 py-1 rounded-lg border transition-all cursor-pointer"
              >
                {copiedQuery ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedQuery ? t.codeCopied : t.copyCode}</span>
              </button>
            </div>

            <div className="bg-[#070914] dark:bg-[#070914] light:bg-slate-950 p-3.5 rounded-xl font-mono text-xs sm:text-sm text-emerald-300 border border-[#23274d] overflow-x-auto shadow-inner">
              {activeLesson.exampleQuery}
            </div>

            <button
              onClick={() => runExample(activeLesson.exampleQuery, activeLesson.databaseId)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] hover:from-[#7c74ff] hover:to-[#22dcff] shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>{t.runInteractiveTest} ({activeLesson.databaseId})</span>
            </button>
          </div>

          {/* Live Result Output */}
          {testResult && (
            <div className="pt-2 animate-in fade-in space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                <span>{t.queryResults}</span>
                {testResult.success && (
                  <span className="text-emerald-400 font-mono lowercase">
                    {testResult.rowCount} {t.rowsReturned} ({testResult.executionTimeMs}ms)
                  </span>
                )}
              </div>
              <QueryResultTable result={testResult} />
            </div>
          )}

          {/* Cheat Sheet Table */}
          {activeLesson.cheatSheet && activeLesson.cheatSheet.length > 0 && (
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider block">
                {t.quickCheatSheet}
              </span>
              <div className="overflow-x-auto border rounded-xl app-card">
                <table className="w-full text-left text-xs">
                  <thead className="app-subcard text-slate-300 dark:text-slate-300 light:text-slate-700 border-b">
                    <tr>
                      <th className="px-3.5 py-2.5">Mot-clé</th>
                      <th className="px-3.5 py-2.5">Description</th>
                      <th className="px-3.5 py-2.5">Exemple de Code</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#212447] text-slate-300 dark:text-slate-300 light:text-slate-700 font-mono">
                    {activeLesson.cheatSheet.map((item, idx) => (
                      <tr key={idx} className="hover:bg-[#181b36]/50 dark:hover:bg-[#181b36]/50 light:hover:bg-slate-100">
                        <td className="px-3.5 py-2 text-[#00D4FF] font-bold">{item.keyword}</td>
                        <td className="px-3.5 py-2 font-sans">{item.description}</td>
                        <td className="px-3.5 py-2 text-amber-300 text-[11px] font-mono">{item.syntax}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tips and Best Practices */}
          {activeLesson.tips.length > 0 && (
            <div className="bg-amber-950/20 dark:bg-amber-950/20 light:bg-amber-50 border border-amber-500/30 p-4 rounded-2xl space-y-2 text-xs text-amber-200 dark:text-amber-200 light:text-amber-900">
              <div className="font-bold flex items-center gap-1.5 text-amber-400">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>{t.tipsAndBestPractices}</span>
              </div>
              <ul className="space-y-1.5 list-disc list-inside text-slate-300 dark:text-slate-300 light:text-slate-700">
                {activeLesson.tips.map((tip, idx) => (
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
