import React, { useState } from 'react';
import { Terminal, Database, History, Download, Play, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { DATABASES } from '../../sql/databases';
import { SQLSandbox } from '../../sql/sandbox';
import { SqlEditor } from '../SqlEditor';
import { QueryResultTable } from '../QueryResultTable';
import { SchemaViewer } from '../SchemaViewer';
import { QueryResult, PlayerProfile } from '../../types';
import { sound } from '../../game/sound';

interface SandboxViewProps {
  profile: PlayerProfile;
  onRecordHistory: (query: string, success: boolean, dbId: string) => void;
}

export const SandboxView: React.FC<SandboxViewProps> = ({
  profile,
  onRecordHistory
}) => {
  const [selectedDb, setSelectedDb] = useState<string>('university');
  const [query, setQuery] = useState<string>('SELECT * FROM etudiants LIMIT 10;');
  const [result, setResult] = useState<QueryResult | null>(null);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [showSchema, setShowSchema] = useState<boolean>(false);

  const handleExecute = () => {
    setIsExecuting(true);
    try {
      const res = SQLSandbox.executeQuery(selectedDb, query);
      setResult(res);
      if (res.success) {
        sound.playSuccess();
      } else {
        sound.playError();
      }
      onRecordHistory(query, res.success, selectedDb);
    } catch (e: any) {
      console.error(e);
      sound.playError();
    } finally {
      setIsExecuting(false);
    }
  };

  const exportCSV = () => {
    sound.playClick();
    if (!result || !result.success || result.rows.length === 0) return;

    const headers = result.columns.join(',');
    const rows = result.rows.map(r => 
      result.columns.map(c => {
        const val = r[c];
        return typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : String(val ?? '');
      }).join(',')
    );

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sql_quest_${selectedDb}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportJSON = () => {
    sound.playClick();
    if (!result || !result.success) return;

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(result.rows, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute('download', `sql_quest_${selectedDb}_export.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Top Header / Database Selector Bar */}
      <div className="bg-[#121426] border border-[#272b52] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-[#1b1f3d] border border-[#2e3466] text-[#00D4FF]">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white">
              Bac à Sable SQL Libre
            </h2>
            <p className="text-xs text-slate-400">
              Exécute n’importe quelle requête SELECT, JOIN, GROUP BY ou DML sur nos bases relationnelles.
            </p>
          </div>
        </div>

        {/* Database Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-bold hidden sm:inline">
            Base active :
          </span>
          <select
            value={selectedDb}
            onChange={e => {
              sound.playClick();
              setSelectedDb(e.target.value);
              setResult(null);
            }}
            className="bg-[#181a33] text-slate-200 text-xs font-semibold px-3 py-2 rounded-xl border border-[#30376b] focus:outline-none focus:border-[#6C63FF] cursor-pointer"
          >
            {Object.values(DATABASES).map(db => (
              <option key={db.id} value={db.id}>
                {db.name} ({Object.keys(db.tables).length} tables)
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              sound.playClick();
              setShowSchema(!showSchema);
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#20254f] text-[#00D4FF] hover:bg-[#2a3169] border border-[#374082] transition-all"
          >
            <Database className="w-3.5 h-3.5" />
            <span>{showSchema ? 'Fermer Schéma' : 'Voir Schéma'}</span>
          </button>
        </div>
      </div>

      {/* Schema Modal/Drawer */}
      {showSchema && (
        <div className="animate-in fade-in duration-200">
          <SchemaViewer databaseId={selectedDb} onClose={() => setShowSchema(false)} />
        </div>
      )}

      {/* SQL Editor */}
      <SqlEditor
        value={query}
        onChange={setQuery}
        onExecute={handleExecute}
        onOpenSchema={() => setShowSchema(!showSchema)}
        isLoading={isExecuting}
        placeholder="Tape ta requête SQL ici (ex: SELECT * FROM ...)..."
      />

      {/* Result Section & Export Toolbar */}
      {result && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Résultats de la Requête :
            </span>

            {result.success && result.rows.length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={exportCSV}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#1a1d38] hover:bg-[#252a52] text-slate-300 border border-[#2e3463] transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-[#00D4FF]" />
                  <span>Exporter CSV</span>
                </button>

                <button
                  onClick={exportJSON}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#1a1d38] hover:bg-[#252a52] text-slate-300 border border-[#2e3463] transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Exporter JSON</span>
                </button>
              </div>
            )}
          </div>

          <QueryResultTable result={result} />
        </div>
      )}

      {/* History Log */}
      {profile.queryHistory && profile.queryHistory.length > 0 && (
        <div className="bg-[#121426] border border-[#272b52] rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <History className="w-4 h-4 text-[#00D4FF]" />
            <span>Historique Récent des Requêtes ({profile.queryHistory.length})</span>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto">
            {profile.queryHistory.slice(0, 10).map((h, idx) => (
              <div
                key={idx}
                onClick={() => {
                  sound.playClick();
                  setQuery(h.query);
                  setSelectedDb(h.databaseId);
                }}
                className="bg-[#0f1122] hover:bg-[#181a33] p-2.5 rounded-xl border border-[#23274d] flex items-center justify-between gap-3 text-xs font-mono cursor-pointer transition-colors"
                title="Cliquer pour recharger dans l'éditeur"
              >
                <div className="flex items-center gap-2 truncate">
                  {h.success ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  )}
                  <span className="text-slate-300 truncate">{h.query}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 shrink-0">
                  <span>{h.databaseId}</span>
                  <span>&bull;</span>
                  <span>{h.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
