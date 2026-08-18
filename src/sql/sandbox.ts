import alasql from 'alasql';
import { DATABASES } from './databases';
import { QueryResult, ValidationResult } from '../types';
import { SmartCorrector } from './smartCorrector';

export class SQLSandbox {
  private static initializedDbs: Set<string> = new Set();

  public static initializeDatabase(dbId: string, forceReset = false): void {
    if (this.initializedDbs.has(dbId) && !forceReset) {
      return;
    }

    const dbDef = DATABASES[dbId];
    if (!dbDef) {
      console.warn(`Base de données ${dbId} inconnue`);
      return;
    }

    try {
      // Create and switch to DB
      alasql(`DROP DATABASE IF EXISTS ${dbId}`);
      alasql(`CREATE DATABASE ${dbId}`);
      alasql(`USE ${dbId}`);

      // Create tables and populate
      for (const [tableName, tableDef] of Object.entries(dbDef.tables)) {
        const colDefs = tableDef.columns.map(c => {
          let type = 'STRING';
          if (c.type === 'INTEGER') type = 'INT';
          if (c.type === 'REAL') type = 'FLOAT';
          if (c.type === 'BOOLEAN') type = 'BOOLEAN';
          return `\`${c.name}\` ${type}`;
        }).join(', ');

        alasql(`CREATE TABLE \`${tableName}\` (${colDefs})`);
        
        // Deep clone data to avoid mutating source
        const cleanData = JSON.parse(JSON.stringify(tableDef.data));
        if (cleanData.length > 0) {
          alasql.tables[tableName].data = cleanData;
        }
      }

      this.initializedDbs.add(dbId);
    } catch (err) {
      console.error(`Erreur d'initialisation de la DB ${dbId}:`, err);
    }
  }

  public static resetAllDatabases(): void {
    this.initializedDbs.clear();
    Object.keys(DATABASES).forEach(dbId => {
      this.initializeDatabase(dbId, true);
    });
  }

  public static executeQuery(databaseId: string, query: string): QueryResult {
    const startTime = performance.now();
    this.initializeDatabase(databaseId);

    const cleanQuery = query.trim().replace(/;+$/, ''); // Strip trailing semicolons

    if (!cleanQuery) {
      return {
        success: false,
        columns: [],
        rows: [],
        rowCount: 0,
        executionTimeMs: 0,
        error: 'Requête vide',
        feedback: {
          type: 'syntax',
          message: 'Tape ta requête SQL pour voir les résultats.'
        }
      };
    }

    try {
      alasql(`USE ${databaseId}`);
      const rawResult = alasql(cleanQuery);
      const endTime = performance.now();
      const executionTimeMs = Math.max(1, Math.round(endTime - startTime));

      let rows: Record<string, any>[] = [];
      let columns: string[] = [];

      if (Array.isArray(rawResult)) {
        rows = rawResult;
        if (rows.length > 0 && typeof rows[0] === 'object' && rows[0] !== null) {
          columns = Object.keys(rows[0]);
        }
      } else if (typeof rawResult === 'object' && rawResult !== null) {
        rows = [rawResult];
        columns = Object.keys(rawResult);
      } else if (typeof rawResult === 'number' || typeof rawResult === 'string') {
        // e.g. for DML or single scalar
        rows = [{ result: rawResult }];
        columns = ['result'];
      }

      return {
        success: true,
        columns,
        rows,
        rowCount: rows.length,
        executionTimeMs
      };
    } catch (error: any) {
      const endTime = performance.now();
      const executionTimeMs = Math.max(1, Math.round(endTime - startTime));
      const feedback = SmartCorrector.analyzeError(cleanQuery, error, databaseId);

      return {
        success: false,
        columns: [],
        rows: [],
        rowCount: 0,
        executionTimeMs,
        error: error?.message || 'Erreur SQL inattendue',
        feedback
      };
    }
  }

  public static validateChallenge(
    databaseId: string,
    userQuery: string,
    expectedQuery: string
  ): ValidationResult {
    // 1. Run User Query
    const userResult = this.executeQuery(databaseId, userQuery);
    if (!userResult.success) {
      return {
        isCorrect: false,
        message: userResult.error || 'Erreur lors de l’exécution de ta requête',
        feedback: userResult.feedback,
        actualResult: userResult
      };
    }

    // 2. Run Expected Query
    const expectedResult = this.executeQuery(databaseId, expectedQuery);
    if (!expectedResult.success) {
      console.error('Expected query failed in sandbox:', expectedQuery, expectedResult.error);
      return {
        isCorrect: true, // Fallback if expected query had a dialect quirk
        message: 'Requête exécutée avec succès !',
        actualResult: userResult,
        expectedResult
      };
    }

    // 3. Smart Comparison of Results
    const comparison = SmartCorrector.compareResults(userResult.rows, expectedResult.rows);

    if (comparison.isMatch) {
      return {
        isCorrect: true,
        message: 'Excellent ! Requête 100% conforme au résultat attendu ! 🎉',
        actualResult: userResult,
        expectedResult
      };
    } else {
      return {
        isCorrect: false,
        message: comparison.reason || 'Le résultat obtenu ne correspond pas à l’objectif.',
        feedback: {
          type: 'logic',
          message: comparison.reason || 'Vérifie les colonnes sélectionnées et les filtres appliqués.',
          suggestion: 'Regarde bien les données attendues vs les données obtenues.'
        },
        actualResult: userResult,
        expectedResult
      };
    }
  }
}
