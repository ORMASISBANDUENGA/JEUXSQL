import React, { useState } from 'react';
import { Clock, CheckCircle2, AlertTriangle, HelpCircle, Columns, ListFilter, ArrowRight } from 'lucide-react';
import { QueryResult } from '../types';

interface QueryResultTableProps {
  result: QueryResult | null;
  expectedResult?: QueryResult | null;
  showComparison?: boolean;
}

export const QueryResultTable: React.FC<QueryResultTableProps> = ({
  result,
  expectedResult,
  showComparison = false
}) => {
  const [activeTab, setActiveTab] = useState<'actual' | 'expected'>('actual');

  if (!result) {
    return (
      <div className="bg-[#121426] border border-[#25294e] rounded-2xl p-8 text-center text-slate-500">
        <Columns className="w-8 h-8 mx-auto mb-2 text-slate-600 opacity-60" />
        <p className="text-sm">Exécute une requête pour visualiser les données retournées.</p>
      </div>
    );
  }

  // Error feedback view
  if (!result.success) {
    return (
      <div className="bg-[#161224] border border-rose-500/40 rounded-2xl p-4 shadow-xl space-y-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-400 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-rose-300">Erreur lors de l'exécution SQL</h4>
              <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {result.executionTimeMs}ms
              </span>
            </div>
            <p className="text-xs font-mono text-rose-200 bg-rose-950/40 p-2.5 rounded-lg border border-rose-900/50">
              {result.error}
            </p>
          </div>
        </div>

        {/* Smart Corrector Feedback & Advice */}
        {result.feedback && (
          <div className="bg-[#1b1936] border border-[#3e3975] p-3.5 rounded-xl space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-[#00D4FF] font-bold">
              <HelpCircle className="w-4 h-4" />
              <span>Analyse & Conseil de l'Oracle SQL</span>
            </div>
            <p className="text-slate-300 leading-relaxed">{result.feedback.message}</p>
            {result.feedback.suggestion && (
              <div className="text-emerald-300 font-mono text-[11px] bg-[#111326] p-2 rounded border border-[#2d3361]">
                💡 Indice : {result.feedback.suggestion}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Display Table Rows
  const displayedResult = activeTab === 'expected' && expectedResult ? expectedResult : result;
  const isViewingExpected = activeTab === 'expected' && expectedResult;

  return (
    <div className="bg-[#121426] border border-[#2b2f5b] rounded-2xl overflow-hidden shadow-xl flex flex-col">
      {/* Header Info Bar */}
      <div className="bg-[#181b38] px-4 py-2.5 border-b border-[#2b2f5b] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{displayedResult.rowCount} résultat(s)</span>
          </div>

          <div className="flex items-center gap-1 text-slate-400 text-xs font-mono">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{displayedResult.executionTimeMs} ms</span>
          </div>
        </div>

        {/* Tab switch for actual vs expected if comparison is on */}
        {showComparison && expectedResult && (
          <div className="flex items-center gap-1 bg-[#101224] p-1 rounded-xl border border-[#272b54]">
            <button
              onClick={() => setActiveTab('actual')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'actual'
                  ? 'bg-[#6C63FF] text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Ton Résultat ({result.rowCount})
            </button>
            <button
              onClick={() => setActiveTab('expected')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'expected'
                  ? 'bg-[#00D4FF] text-[#0f1020]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Résultat Attendu ({expectedResult.rowCount})
            </button>
          </div>
        )}
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto max-h-80 overflow-y-auto">
        {displayedResult.rowCount > 0 ? (
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#1a1e3e] text-slate-300 font-mono font-bold sticky top-0 z-10 border-b border-[#2e3363]">
              <tr>
                <th className="px-3 py-2.5 text-slate-500 text-center w-10">#</th>
                {displayedResult.columns.map(col => (
                  <th key={col} className="px-3 py-2.5 tracking-wider whitespace-nowrap text-slate-200">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#21254d] font-mono text-slate-300">
              {displayedResult.rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#1a1e3d] transition-colors">
                  <td className="px-3 py-2 text-slate-500 text-center text-[10px] select-none font-mono">
                    {idx + 1}
                  </td>
                  {displayedResult.columns.map(col => {
                    const cellVal = row[col];
                    const isNull = cellVal === null || cellVal === undefined;
                    return (
                      <td key={col} className="px-3 py-2 whitespace-nowrap">
                        {isNull ? (
                          <span className="text-slate-600 italic">NULL</span>
                        ) : typeof cellVal === 'number' ? (
                          <span className="text-[#00D4FF]">{cellVal}</span>
                        ) : (
                          <span>{String(cellVal)}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-8 text-center text-slate-500 text-xs font-mono">
            (0 ligne retournée - ensemble vide)
          </div>
        )}
      </div>
    </div>
  );
};
