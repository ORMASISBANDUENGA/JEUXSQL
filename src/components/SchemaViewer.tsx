import React, { useState } from 'react';
import { Database, Table, Key, Eye, X, ChevronRight, Hash, Type, Calendar, ToggleLeft } from 'lucide-react';
import { DATABASES } from '../sql/databases';
import { sound } from '../game/sound';

interface SchemaViewerProps {
  databaseId: string;
  onClose?: () => void;
}

export const SchemaViewer: React.FC<SchemaViewerProps> = ({ databaseId, onClose }) => {
  const currentDb = DATABASES[databaseId] || DATABASES.university;
  const tableNames = Object.keys(currentDb.tables);
  const [selectedTable, setSelectedTable] = useState<string>(tableNames[0] || '');
  const [showSampleData, setShowSampleData] = useState<boolean>(false);

  const activeTable = currentDb.tables[selectedTable];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'INTEGER':
        return <Hash className="w-3.5 h-3.5 text-amber-400" />;
      case 'REAL':
        return <Hash className="w-3.5 h-3.5 text-orange-400" />;
      case 'TEXT':
        return <Type className="w-3.5 h-3.5 text-[#00D4FF]" />;
      case 'DATE':
        return <Calendar className="w-3.5 h-3.5 text-purple-400" />;
      case 'BOOLEAN':
        return <ToggleLeft className="w-3.5 h-3.5 text-emerald-400" />;
      default:
        return <Type className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="bg-[#121426] border border-[#2b2f5b] rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      {/* Header */}
      <div className="bg-[#191c38] px-4 py-3 border-b border-[#2b2f5b] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-[#00D4FF]" />
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>{currentDb.name}</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#242850] text-[#00D4FF] font-mono border border-[#3b417d]">
                {tableNames.length} table(s)
              </span>
            </h3>
            <p className="text-xs text-slate-400">{currentDb.description}</p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-[#242850] hover:bg-rose-950 text-slate-400 hover:text-rose-300 border border-[#3b417d] transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main Content: Split List and Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 min-h-[280px]">
        {/* Table selector list */}
        <div className="bg-[#0f1122] border-r border-[#25294e] p-3 space-y-1.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-1">
            Tables Relationnelles
          </span>
          {tableNames.map(tName => {
            const isSelected = selectedTable === tName;
            const t = currentDb.tables[tName];
            return (
              <button
                key={tName}
                onClick={() => {
                  sound.playClick();
                  setSelectedTable(tName);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#6C63FF]/30 to-[#00D4FF]/20 text-white border border-[#6C63FF] shadow-sm'
                    : 'text-slate-300 hover:bg-[#181b36] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <Table className={`w-3.5 h-3.5 ${isSelected ? 'text-[#00D4FF]' : 'text-slate-400'}`} />
                  <span className="font-mono">{tName}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-[#1e2247]">
                  {t.data.length} lg.
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Table details and columns */}
        <div className="md:col-span-2 p-4 flex flex-col justify-between bg-[#14162a]">
          {activeTable ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                    <Table className="w-4 h-4 text-[#6C63FF]" /> {activeTable.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">{activeTable.description}</p>
                </div>

                <button
                  onClick={() => {
                    sound.playClick();
                    setShowSampleData(!showSampleData);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    showSampleData
                      ? 'bg-[#6C63FF] text-white border-[#6C63FF]'
                      : 'bg-[#202447] text-[#00D4FF] border-[#373d75] hover:bg-[#282d5a]'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{showSampleData ? 'Voir Colonnes' : 'Aperçu Données'}</span>
                </button>
              </div>

              {!showSampleData ? (
                /* Column Structure Table */
                <div className="overflow-x-auto border border-[#2b2f5b] rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#1b1f3d] text-slate-300 font-semibold border-b border-[#2b2f5b]">
                      <tr>
                        <th className="px-3 py-2">Colonne</th>
                        <th className="px-3 py-2">Type</th>
                        <th className="px-3 py-2">Clé / Relation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#23274d] font-mono text-slate-300">
                      {activeTable.columns.map(col => (
                        <tr key={col.name} className="hover:bg-[#1c2042]">
                          <td className="px-3 py-2 font-bold text-white flex items-center gap-1.5">
                            {col.primaryKey && <Key className="w-3.5 h-3.5 text-amber-400" />}
                            <span>{col.name}</span>
                          </td>
                          <td className="px-3 py-2">
                            <span className="flex items-center gap-1 text-slate-300">
                              {getTypeIcon(col.type)} {col.type}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-[11px]">
                            {col.primaryKey ? (
                              <span className="px-1.5 py-0.5 rounded bg-amber-950/60 text-amber-400 border border-amber-500/30">
                                Clé Primaire (PK)
                              </span>
                            ) : col.foreignKey ? (
                              <span className="px-1.5 py-0.5 rounded bg-cyan-950/60 text-[#00D4FF] border border-cyan-500/30">
                                FK &rarr; {col.foreignKey.table}.{col.foreignKey.column}
                              </span>
                            ) : (
                              <span className="text-slate-500">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                /* Sample Data Preview Table */
                <div className="overflow-x-auto border border-[#2b2f5b] rounded-xl max-h-56">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#1b1f3d] text-slate-300 font-semibold border-b border-[#2b2f5b] sticky top-0">
                      <tr>
                        {activeTable.columns.map(col => (
                          <th key={col.name} className="px-3 py-2 font-mono whitespace-nowrap">
                            {col.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#23274d] font-mono text-slate-300">
                      {activeTable.data.slice(0, 5).map((row, idx) => (
                        <tr key={idx} className="hover:bg-[#1c2042]">
                          {activeTable.columns.map(col => (
                            <td key={col.name} className="px-3 py-1.5 whitespace-nowrap">
                              {row[col.name] !== null && row[col.name] !== undefined ? String(row[col.name]) : 'NULL'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-10 text-slate-500 text-xs">
              Sélectionne une table pour inspecter sa structure.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
