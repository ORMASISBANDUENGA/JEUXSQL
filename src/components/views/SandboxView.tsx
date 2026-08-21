import React, { useState } from 'react';
import { Terminal, Database, History, Download, Play, CheckCircle2, AlertCircle, Sparkles, BookMarked } from 'lucide-react';
import { DATABASES } from '../../sql/databases';
import { SQLSandbox } from '../../sql/sandbox';
import { SqlEditor } from '../SqlEditor';
import { QueryResultTable } from '../QueryResultTable';
import { SchemaViewer } from '../SchemaViewer';
import { QueryResult, PlayerProfile, Language } from '../../types';
import { sound } from '../../game/sound';
import { TRANSLATIONS } from '../../i18n/translations';

interface SandboxViewProps {
  profile: PlayerProfile;
  language?: Language;
  onRecordHistory: (query: string, success: boolean, dbId: string) => void;
}

interface QueryPreset {
  label: string;
  category: string;
  databaseId: string;
  query: string;
}

const PRESET_QUERIES: QueryPreset[] = [
  // University
  { label: 'Tous les Étudiants', category: 'SELECT', databaseId: 'university', query: 'SELECT * FROM etudiants LIMIT 10;' },
  { label: 'Majors en Informatique', category: 'WHERE', databaseId: 'university', query: "SELECT nom, prenom, moyenne FROM etudiants WHERE filiere = 'Informatique' AND moyenne >= 15.0 ORDER BY moyenne DESC;" },
  { label: 'Moyenne & Effectif par Filière', category: 'GROUP BY', databaseId: 'university', query: 'SELECT filiere, COUNT(*) AS effectif, AVG(moyenne) AS moyenne_filiere FROM etudiants GROUP BY filiere ORDER BY effectif DESC;' },
  { label: 'Notes avec Titres de Cours (JOIN)', category: 'JOIN', databaseId: 'university', query: 'SELECT etudiants.nom, etudiants.prenom, cours.intitule, notes.note FROM notes JOIN etudiants ON notes.etudiant_id = etudiants.id JOIN cours ON notes.cours_id = cours.id ORDER BY notes.note DESC;' },
  { label: 'Masse Salariale par Département', category: 'AGGREGATE', databaseId: 'university', query: 'SELECT departement, COUNT(*) AS nb_profs, SUM(salaire) AS masse_salariale, AVG(salaire) AS salaire_moyen FROM professeurs GROUP BY departement;' },
  { label: 'Étudiants au-dessus de la Moyenne', category: 'SUBQUERY', databaseId: 'university', query: 'SELECT nom, prenom, moyenne FROM etudiants WHERE moyenne > (SELECT AVG(moyenne) FROM etudiants) ORDER BY moyenne DESC;' },

  // Shop / E-Commerce
  { label: 'Catalogue Produits & Stocks', category: 'SELECT', databaseId: 'shop', query: 'SELECT nom, prix, stock, categorie_id FROM produits ORDER BY prix DESC;' },
  { label: 'Clients VIP (>500 points)', category: 'WHERE', databaseId: 'shop', query: 'SELECT nom, prenom, email, fidelite_points FROM clients WHERE fidelite_points >= 500 ORDER BY fidelite_points DESC;' },
  { label: 'Ventes Totales par Client (JOIN & SUM)', category: 'GROUP BY', databaseId: 'shop', query: 'SELECT clients.nom, clients.prenom, COUNT(commandes.id) AS nb_commandes, SUM(commandes.montant_total) AS total_achats FROM clients JOIN commandes ON clients.id = commandes.client_id GROUP BY clients.nom, clients.prenom ORDER BY total_achats DESC;' },
  { label: 'Détail des Articles Commandés', category: 'JOIN', databaseId: 'shop', query: 'SELECT commande_articles.commande_id, produits.nom, commande_articles.quantite, commande_articles.prix_unitaire, (commande_articles.quantite * commande_articles.prix_unitaire) AS total_ligne FROM commande_articles JOIN produits ON commande_articles.produit_id = produits.id LIMIT 10;' },
  { label: 'Clients Sans Commande (LEFT JOIN)', category: 'LEFT JOIN', databaseId: 'shop', query: 'SELECT clients.nom, clients.prenom, clients.email FROM clients LEFT JOIN commandes ON clients.id = commandes.client_id WHERE commandes.id IS NULL;' },
  { label: 'Statut Fidélité (CASE WHEN)', category: 'CONDITIONAL', databaseId: 'shop', query: "SELECT nom, prenom, fidelite_points, CASE WHEN fidelite_points > 1000 THEN 'VIP Or' WHEN fidelite_points > 500 THEN 'Argent' ELSE 'Bronze' END AS statut_client FROM clients;" },

  // Cinema
  { label: 'Top 5 Films les Mieux Notés', category: 'ORDER BY', databaseId: 'cinema', query: 'SELECT titre, annee_sortie, genre, note_imdb FROM films ORDER BY note_imdb DESC LIMIT 5;' },
  { label: 'Films de Science-Fiction Récents', category: 'WHERE', databaseId: 'cinema', query: "SELECT titre, annee_sortie, note_imdb FROM films WHERE genre = 'Science-Fiction' AND annee_sortie >= 2010 ORDER BY annee_sortie DESC;" },
  { label: 'Casting & Rôles des Acteurs (JOIN 3)', category: 'JOIN', databaseId: 'cinema', query: 'SELECT films.titre, acteurs.nom, acteurs.prenom, casting.role FROM casting JOIN films ON casting.film_id = films.id JOIN acteurs ON casting.acteur_id = acteurs.id ORDER BY films.titre;' },
  { label: 'Statistiques par Genre Cinéma', category: 'GROUP BY', databaseId: 'cinema', query: 'SELECT genre, COUNT(*) AS total_films, AVG(note_imdb) AS note_moyenne, AVG(duree_minutes) AS duree_moyenne FROM films GROUP BY genre HAVING COUNT(*) >= 1;' },

  // Hospital
  { label: 'Annuaire Médical & Spécialités', category: 'SELECT', databaseId: 'hospital', query: 'SELECT nom, prenom, specialite, telephone FROM medecins ORDER BY specialite, nom;' },
  { label: 'Patients Âgés de 50+ ans', category: 'WHERE', databaseId: 'hospital', query: 'SELECT nom, prenom, age, telephone FROM patients WHERE age >= 50 ORDER BY age DESC;' },
  { label: 'Consultations avec Médecins & Diagnostics', category: 'JOIN', databaseId: 'hospital', query: 'SELECT patients.nom AS patient, medecins.nom AS medecin, medecins.specialite, consultations.date_consultation, consultations.diagnostic FROM consultations JOIN patients ON consultations.patient_id = patients.id JOIN medecins ON consultations.medecin_id = medecins.id ORDER BY consultations.date_consultation DESC;' },
  { label: 'Consultations par Spécialité', category: 'GROUP BY', databaseId: 'hospital', query: 'SELECT medecins.specialite, COUNT(consultations.id) AS nb_consultations FROM medecins LEFT JOIN consultations ON medecins.id = consultations.medecin_id GROUP BY medecins.specialite ORDER BY nb_consultations DESC;' }
];

export const SandboxView: React.FC<SandboxViewProps> = ({
  profile,
  language = 'fr',
  onRecordHistory
}) => {
  const [selectedDb, setSelectedDb] = useState<string>('university');
  const [query, setQuery] = useState<string>('SELECT * FROM etudiants LIMIT 10;');
  const [result, setResult] = useState<QueryResult | null>(null);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [showSchema, setShowSchema] = useState<boolean>(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.fr;

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

  const handleApplyPreset = (preset: QueryPreset) => {
    sound.playClick();
    setSelectedDb(preset.databaseId);
    setQuery(preset.query);
    setShowSchema(false);
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

  const currentDbPresets = PRESET_QUERIES.filter(p => p.databaseId === selectedDb);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header / Database Selector Bar */}
      <div className="app-card border rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl app-subcard border text-[#00D4FF]">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold">
              Bac à Sable SQL Interactif
            </h2>
            <p className="text-xs text-slate-400">
              Exécute toutes tes requêtes relationnelles en direct sur le moteur Sandbox.
            </p>
          </div>
        </div>

        {/* Database Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-bold hidden sm:inline">
            {t.databaseTarget}
          </span>
          <select
            value={selectedDb}
            onChange={e => {
              sound.playClick();
              setSelectedDb(e.target.value);
              setResult(null);
            }}
            className="app-subcard text-slate-200 text-xs font-semibold px-3 py-2 rounded-xl border focus:outline-none focus:border-[#6C63FF] cursor-pointer"
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
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#20254f] text-[#00D4FF] hover:bg-[#2a3169] border border-[#374082] transition-all cursor-pointer"
          >
            <Database className="w-3.5 h-3.5" />
            <span>{showSchema ? 'Masquer Schéma' : 'Voir Schéma'}</span>
          </button>
        </div>
      </div>

      {/* Preset Queries Quick Bar */}
      <div className="app-subcard border rounded-2xl p-3.5 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <BookMarked className="w-4 h-4 text-amber-400" />
          <span>Requêtes Pré-configurées Rapides ({currentDbPresets.length}) :</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {currentDbPresets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(preset)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium app-card border hover:border-[#6C63FF] transition-all cursor-pointer group"
            >
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#6C63FF]/20 text-[#6C63FF] font-bold">
                {preset.category}
              </span>
              <span className="text-slate-300 group-hover:text-white">{preset.label}</span>
            </button>
          ))}
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
        <div className="space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t.queryResults}
            </span>

            {result.success && result.rows.length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={exportCSV}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium app-card hover:border-[#00D4FF] transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#00D4FF]" />
                  <span>Exporter CSV</span>
                </button>

                <button
                  onClick={exportJSON}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium app-card hover:border-emerald-400 transition-all cursor-pointer"
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
        <div className="app-card border rounded-2xl p-4 space-y-3">
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
                className="app-subcard hover:border-[#6C63FF] p-2.5 rounded-xl border flex items-center justify-between gap-3 text-xs font-mono cursor-pointer transition-colors"
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
                  <span className="uppercase">{h.databaseId}</span>
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
