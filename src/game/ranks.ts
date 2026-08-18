import { RankInfo, RankTitle } from '../types';

export const RANKS: RankInfo[] = [
  {
    minLevel: 1,
    title: 'SQL Novice',
    badge: '🌱',
    color: '#00D4FF',
    description: 'Fait ses premiers pas dans l’univers des tables et des requêtes SELECT simples.'
  },
  {
    minLevel: 5,
    title: 'Query Fighter',
    badge: '⚔️',
    color: '#6C63FF',
    description: 'Maîtrise les filtres WHERE, les tris ORDER BY et les agrégations de base.'
  },
  {
    minLevel: 10,
    title: 'JOIN Hunter',
    badge: '🏹',
    color: '#FFD740',
    description: 'Traque et assemble les relations complexes via INNER, LEFT et multiples jointures.'
  },
  {
    minLevel: 20,
    title: 'Database Warrior',
    badge: '🛡️',
    color: '#FF5252',
    description: 'Dompte les sous-requêtes, les clauses GROUP BY / HAVING et optimise les requêtes.'
  },
  {
    minLevel: 30,
    title: 'SQL Master',
    badge: '👑',
    color: '#00E676',
    description: 'Grand architecte des données, capable de résoudre les défis les plus ardus et vaincre les Boss.'
  }
];

export function getRankForLevel(level: number): RankInfo {
  let activeRank = RANKS[0];
  for (const rank of RANKS) {
    if (level >= rank.minLevel) {
      activeRank = rank;
    }
  }
  return activeRank;
}

export function getXpRequiredForLevel(level: number): number {
  // Level progression curve: 100, 220, 360, 520, ...
  return Math.round(100 * Math.pow(1.18, level - 1));
}
