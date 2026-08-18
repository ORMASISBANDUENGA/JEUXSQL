import { DATABASES } from './databases';

export interface SmartFeedback {
  type: 'syntax' | 'column' | 'table' | 'logic' | 'aggregate' | 'join' | 'info';
  message: string;
  suggestion?: string;
}

export class SmartCorrector {
  static analyzeError(
    query: string, 
    error: any, 
    databaseId: string, 
    expectedQuery?: string
  ): SmartFeedback {
    const errorMsg = String(error?.message || error || '').toLowerCase();
    const cleanQuery = query.trim();
    const upperQuery = cleanQuery.toUpperCase();

    // 1. Basic empty check
    if (!cleanQuery) {
      return {
        type: 'syntax',
        message: 'Ta requête est vide ! Écris une commande SQL comme "SELECT ... FROM ..."',
        suggestion: 'Commence par SELECT suivi des colonnes souhaitées ou *'
      };
    }

    // 2. Missing SELECT or FROM
    if (!upperQuery.startsWith('SELECT') && !upperQuery.startsWith('INSERT') && !upperQuery.startsWith('UPDATE') && !upperQuery.startsWith('DELETE') && !upperQuery.startsWith('CREATE')) {
      return {
        type: 'syntax',
        message: 'Une requête de lecture doit commencer par le mot-clé SELECT.',
        suggestion: 'Exemple : SELECT * FROM nom_table;'
      };
    }

    if (upperQuery.includes('SELECT') && !upperQuery.includes('FROM')) {
      return {
        type: 'syntax',
        message: 'Il manque la clause FROM pour indiquer la table source.',
        suggestion: 'Ajoute FROM nom_table après la liste des colonnes.'
      };
    }

    // 3. Table not found
    const db = DATABASES[databaseId];
    if (db) {
      const knownTables = Object.keys(db.tables);
      
      // Check if table name is misspelled
      if (errorMsg.includes('table') || errorMsg.includes('does not exist') || errorMsg.includes('unknown table')) {
        return {
          type: 'table',
          message: `Table introuvable dans la base "${db.name}".`,
          suggestion: `Tables disponibles : ${knownTables.join(', ')}`
        };
      }

      // Check column names
      for (const tableName of knownTables) {
        const table = db.tables[tableName];
        if (upperQuery.includes(tableName.toUpperCase())) {
          const validColNames = table.columns.map(c => c.name);
          
          if (errorMsg.includes('column') || errorMsg.includes('not found') || errorMsg.includes('undefined')) {
            return {
              type: 'column',
              message: `Une colonne spécifiée n'existe pas dans la table "${tableName}".`,
              suggestion: `Colonnes existantes : ${validColNames.join(', ')}`
            };
          }
        }
      }
    }

    // 4. GROUP BY / Aggregate issues
    const hasAgg = /\b(COUNT|SUM|AVG|MIN|MAX)\s*\(/i.test(cleanQuery);
    if (hasAgg && !upperQuery.includes('GROUP BY')) {
      const selectMatch = cleanQuery.match(/SELECT\s+(.*?)\s+FROM/i);
      if (selectMatch && selectMatch[1]) {
        const selectedFields = selectMatch[1].split(',').map(s => s.trim());
        const nonAggFields = selectedFields.filter(f => !/\b(COUNT|SUM|AVG|MIN|MAX)\s*\(/i.test(f) && f !== '*');
        if (nonAggFields.length > 0) {
          return {
            type: 'aggregate',
            message: `Attention : Tu sélectionnes des colonnes non-agrégées (${nonAggFields.join(', ')}) avec des fonctions d'agrégation.`,
            suggestion: `Pense à ajouter GROUP BY ${nonAggFields.join(', ')} à la fin de ta requête.`
          };
        }
      }
    }

    // 5. JOIN without ON
    if (upperQuery.includes('JOIN') && !upperQuery.includes('ON') && !upperQuery.includes('USING')) {
      return {
        type: 'join',
        message: 'Un JOIN requiert une condition de liaison (clause ON table1.id = table2.id).',
        suggestion: 'Sans la clause ON, tu risques de générer un produit cartésien non désiré.'
      };
    }

    // 6. Generic syntax parsing issues
    if (errorMsg.includes('parse') || errorMsg.includes('syntax') || errorMsg.includes('near')) {
      return {
        type: 'syntax',
        message: `Erreur de syntaxe SQL : ${errorMsg}`,
        suggestion: 'Vérifie les virgules entre les colonnes, les guillemets simples pour les chaînes de texte, et l\'ordre des clauses (SELECT > FROM > WHERE > GROUP BY > HAVING > ORDER BY > LIMIT).'
      };
    }

    return {
      type: 'info',
      message: `Erreur d'exécution : ${error?.message || 'Requête invalide'}.`,
      suggestion: 'Vérifie l\'orthographe des mots-clés et des tables.'
    };
  }

  static compareResults(actualRows: any[], expectedRows: any[]): { isMatch: boolean; reason?: string } {
    if (!actualRows || !expectedRows) {
      return { isMatch: false, reason: 'Résultat manquant' };
    }

    if (actualRows.length !== expectedRows.length) {
      return { 
        isMatch: false, 
        reason: `Nombre de lignes différent : ${actualRows.length} ligne(s) retournée(s), attendu : ${expectedRows.length} ligne(s).` 
      };
    }

    if (expectedRows.length === 0 && actualRows.length === 0) {
      return { isMatch: true };
    }

    const actualCols = Object.keys(actualRows[0] || {}).map(c => c.toLowerCase());
    const expectedCols = Object.keys(expectedRows[0] || {}).map(c => c.toLowerCase());

    // Check column count match
    if (actualCols.length !== expectedCols.length) {
      return {
        isMatch: false,
        reason: `Nombre de colonnes différent : ${actualCols.length} colonne(s) retournée(s), attendu : ${expectedCols.length}.`
      };
    }

    // Deep compare rows values (loose comparison for numbers and string trims)
    for (let i = 0; i < expectedRows.length; i++) {
      const expRow = expectedRows[i];
      const actRow = actualRows[i];
      
      const expKeys = Object.keys(expRow);
      const actKeys = Object.keys(actRow);

      for (let j = 0; j < expKeys.length; j++) {
        const expVal = expRow[expKeys[j]];
        const actVal = actRow[actKeys[j]];

        const normalizedExp = typeof expVal === 'number' ? Math.round(expVal * 100) / 100 : String(expVal ?? '').trim().toLowerCase();
        const normalizedAct = typeof actVal === 'number' ? Math.round(actVal * 100) / 100 : String(actVal ?? '').trim().toLowerCase();

        if (normalizedExp !== normalizedAct) {
          return {
            isMatch: false,
            reason: `À la ligne ${i + 1}, valeur "${actVal}" au lieu de "${expVal}".`
          };
        }
      }
    }

    return { isMatch: true };
  }
}
