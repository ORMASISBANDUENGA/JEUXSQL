import React, { useRef } from 'react';
import { Play, Sparkles, Trash2, Copy, Check, Database } from 'lucide-react';
import { sound } from '../game/sound';

interface SqlEditorProps {
  value: string;
  onChange: (val: string) => void;
  onExecute: () => void;
  onOpenSchema?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

const COMMON_SQL_KEYWORDS = [
  'SELECT',
  'FROM',
  'WHERE',
  'JOIN',
  'ON',
  'GROUP BY',
  'HAVING',
  'ORDER BY',
  'DESC',
  'LIMIT',
  'AND',
  'OR',
  '*',
  'COUNT(*)',
  'AVG()',
  'SUM()',
  'MAX()',
  'MIN()'
];

export const SqlEditor: React.FC<SqlEditorProps> = ({
  value,
  onChange,
  onExecute,
  onOpenSchema,
  isLoading = false,
  disabled = false,
  placeholder = "Écris ta requête SQL ici (ex: SELECT * FROM etudiants;)..."
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copied, setCopied] = React.useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onExecute();
    }
    // Allow Tab key inside editor
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  const insertKeyword = (kw: string) => {
    sound.playClick();
    if (!textareaRef.current) {
      onChange(value ? `${value} ${kw}` : kw);
      return;
    }
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    let insertion = kw;
    if (kw.endsWith('()')) {
      insertion = kw.slice(0, -1);
    }

    const needsSpaceBefore = start > 0 && !/\s$/.test(value.substring(0, start));
    const needsSpaceAfter = end < value.length && !/^\s/.test(value.substring(end));
    const prefix = needsSpaceBefore ? ' ' : '';
    const suffix = needsSpaceAfter ? ' ' : '';

    const textToInsert = `${prefix}${insertion}${suffix}`;
    const newValue = value.substring(0, start) + textToInsert + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      if (textareaRef.current) {
        const cursorPosition = start + textToInsert.length - (kw.endsWith('()') ? (suffix.length + 1) : 0);
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(cursorPosition, cursorPosition);
      }
    }, 0);
  };

  const formatQuery = () => {
    sound.playClick();
    if (!value.trim()) return;

    let formatted = value;
    const keywords = [
      'SELECT', 'FROM', 'WHERE', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'JOIN',
      'ON', 'GROUP BY', 'HAVING', 'ORDER BY', 'ASC', 'DESC', 'LIMIT', 'OFFSET',
      'AND', 'OR', 'NOT', 'IN', 'BETWEEN', 'LIKE', 'AS', 'COUNT', 'AVG', 'SUM',
      'MIN', 'MAX', 'DISTINCT', 'UNION', 'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE'
    ];

    keywords.forEach(kw => {
      const regex = new RegExp(`\\b${kw}\\b`, 'gi');
      formatted = formatted.replace(regex, kw);
    });

    onChange(formatted);
  };

  const copyQuery = () => {
    sound.playClick();
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearQuery = () => {
    sound.playClick();
    onChange('');
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="bg-[#14162b] border border-[#2b2f5b] rounded-2xl overflow-hidden shadow-xl flex flex-col">
      {/* Top Toolbar */}
      <div className="bg-[#1a1d36] px-4 py-2.5 border-b border-[#2b2f5b] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs font-bold text-slate-300 ml-2 tracking-wide uppercase">
            Console SQL Interactive
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5">
          {onOpenSchema && (
            <button
              onClick={onOpenSchema}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#22264c] hover:bg-[#2e3466] text-[#00D4FF] border border-[#3e4585] transition-all"
              title="Inspecter les tables et colonnes"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Schéma</span>
            </button>
          )}

          <button
            onClick={formatQuery}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#22264c] hover:bg-[#2e3466] text-slate-300 border border-[#303666] transition-all"
            title="Formater les mots-clés en majuscules"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Formater</span>
          </button>

          <button
            onClick={copyQuery}
            className="p-1.5 rounded-lg text-xs font-medium bg-[#22264c] hover:bg-[#2e3466] text-slate-300 border border-[#303666] transition-all"
            title="Copier la requête"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={clearQuery}
            className="p-1.5 rounded-lg text-xs font-medium bg-[#22264c] hover:bg-rose-950 text-slate-400 hover:text-rose-300 border border-[#303666] transition-all"
            title="Effacer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Textarea Area */}
      <div className="relative p-3 bg-[#0f1021]">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          rows={5}
          spellCheck={false}
          className="w-full bg-transparent font-mono text-sm sm:text-base text-emerald-300 placeholder-slate-600 focus:outline-none resize-y leading-relaxed tracking-wide selection:bg-[#6C63FF]/40"
        />
      </div>

      {/* Quick Insert SQL Keyword Chips */}
      <div className="bg-[#161933] border-t border-[#25294e] px-3 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
          Mots-clés :
        </span>
        {COMMON_SQL_KEYWORDS.map(kw => (
          <button
            key={kw}
            onClick={() => insertKeyword(kw)}
            className="px-2 py-0.5 rounded-md text-xs font-mono font-medium bg-[#202449] hover:bg-[#6C63FF] text-slate-200 hover:text-white border border-[#343a6d] hover:border-[#6C63FF] transition-all shrink-0 active:scale-95"
          >
            {kw}
          </button>
        ))}
      </div>

      {/* Bottom Run Bar */}
      <div className="bg-[#121428] px-4 py-2.5 border-t border-[#25294e] flex items-center justify-between">
        <span className="text-xs text-slate-500 hidden sm:inline">
          Astuce : Appuie sur <kbd className="px-1.5 py-0.5 rounded bg-[#1e2247] text-slate-300 font-mono text-[11px]">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-[#1e2247] text-slate-300 font-mono text-[11px]">Entrée</kbd> pour exécuter
        </span>

        <button
          onClick={() => {
            sound.playClick();
            onExecute();
          }}
          disabled={isLoading || disabled || !value.trim()}
          className={`ml-auto flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold text-white shadow-lg transition-all ${
            isLoading || disabled || !value.trim()
              ? 'bg-[#282c54] text-slate-500 cursor-not-allowed border border-[#343a6d]'
              : 'bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] hover:from-[#7d75ff] hover:to-[#22deff] border border-[#857eff] active:scale-95 shadow-[0_0_15px_rgba(108,99,255,0.4)] cursor-pointer'
          }`}
        >
          <Play className="w-4 h-4 fill-white" />
          <span>{isLoading ? 'Exécution...' : 'Exécuter la Requête'}</span>
        </button>
      </div>
    </div>
  );
};
