import { WordAnagram, WordRiddle } from '../types';

export const SQL_ANAGRAMS: WordAnagram[] = [
  {
    id: 'ana-1',
    scrambled: 'T E L E C S',
    targetWord: 'SELECT',
    clue: 'Le mot-clé le plus fondamental en SQL pour extraire et projeter des données.',
    category: 'Projection',
    usageExample: 'SELECT nom, age FROM etudiants;'
  },
  {
    id: 'ana-2',
    scrambled: 'R E H E W',
    targetWord: 'WHERE',
    clue: 'Clause indispensable pour filtrer les lignes avant tout traitement ou agrégat.',
    category: 'Filtrage',
    usageExample: 'WHERE note >= 10'
  },
  {
    id: 'ana-3',
    scrambled: 'G I N V A H',
    targetWord: 'HAVING',
    clue: 'Filtre appliqué après le regroupement pour trier selon les résultats d\'agrégats.',
    category: 'Regroupement',
    usageExample: 'GROUP BY filiere HAVING AVG(moyenne) > 14'
  },
  {
    id: 'ana-4',
    scrambled: 'D I T C N I S T',
    targetWord: 'DISTINCT',
    clue: 'Élimine impitoyablement tous les doublons dans les résultats renvoyés.',
    category: 'Projection',
    usageExample: 'SELECT DISTINCT ville FROM clients;'
  },
  {
    id: 'ana-5',
    scrambled: 'O I J N',
    targetWord: 'JOIN',
    clue: 'Permet d\'unir et relier des tables différentes par des clés communes.',
    category: 'Relationnel',
    usageExample: 'INNER JOIN cours ON ...'
  },
  {
    id: 'ana-6',
    scrambled: 'T E N W E E B',
    targetWord: 'BETWEEN',
    clue: 'Vérifie si une valeur se situe dans un intervalle inclusif donné.',
    category: 'Opérateur',
    usageExample: 'WHERE age BETWEEN 18 AND 25'
  },
  {
    id: 'ana-7',
    scrambled: 'E G A T E R G A G',
    targetWord: 'AGGREGATE',
    clue: 'Famille de fonctions qui réduisent plusieurs lignes en un résultat unique (COUNT, SUM, AVG).',
    category: 'Calcul',
    usageExample: 'COUNT(*), AVG(prix), SUM(stock)'
  },
  {
    id: 'ana-8',
    scrambled: 'T E D A P U',
    targetWord: 'UPDATE',
    clue: 'Instruction DML permettant de modifier des enregistrements déjà existants.',
    category: 'DML',
    usageExample: 'UPDATE produits SET prix = 99;'
  }
];

export const SQL_RIDDLES: WordRiddle[] = [
  {
    id: 'rid-1',
    title: 'L\'Oracle du Tri',
    riddle: 'Je range le désordre, du plus grand géant au plus petit nain. Sans moi, tes résultats arrivent dans un chaos absolu. Qui suis-je ?',
    hint: 'Deux mots : je commence par O et finis par Y.',
    answer: 'ORDER BY',
    associatedQuery: 'SELECT * FROM films ORDER BY note_presse DESC;',
    explanation: 'ORDER BY classe les enregistrements par ordre croissant (ASC) ou décroissant (DESC).'
  },
  {
    id: 'rid-2',
    title: 'Le Gardien du Vide',
    riddle: 'Je ne suis ni zéro, ni une chaîne vide. Si tu me compares avec "=", je te renverrai l\'inconnu. Tu dois dire "IS" pour me trouver. Qui suis-je ?',
    hint: 'Quatre lettres : N _ _ _',
    answer: 'NULL',
    associatedQuery: 'SELECT * FROM patients WHERE telephone IS NULL;',
    explanation: 'NULL représente l\'absence de valeur. On le teste toujours avec "IS NULL" ou "IS NOT NULL".'
  },
  {
    id: 'rid-3',
    title: 'Le Pont entre Deux Mondes',
    riddle: 'Je réunis deux tables séparées à la naissance à condition qu\'elles partagent une clé d\'or dans la clause ON. Qui suis-je ?',
    hint: 'J _ _ _',
    answer: 'JOIN',
    associatedQuery: 'SELECT * FROM commandes c INNER JOIN clients cl ON c.client_id = cl.id;',
    explanation: 'La clause JOIN (INNER, LEFT, RIGHT, FULL) associe les enregistrements de tables relationnelles.'
  },
  {
    id: 'rid-4',
    title: 'Le Grand Rassembleur',
    riddle: 'Je transforme une foule d\'étudiants éparpillés en petits comités par filière pour que COUNT ou AVG puissent faire leurs calculs. Qui suis-je ?',
    hint: 'Deux mots commençant par G.',
    answer: 'GROUP BY',
    associatedQuery: 'SELECT filiere, COUNT(*) FROM etudiants GROUP BY filiere;',
    explanation: 'GROUP BY partitionne les enregistrements en groupes selon des critères spécifiques.'
  },
  {
    id: 'rid-5',
    title: 'L\'Espion Imbriqué',
    riddle: 'Je vis enfermé entre parenthèses à l\'intérieur d\'une autre requête. Mon résultat secret alimente les conditions du monde extérieur. Qui suis-je ?',
    hint: 'Une requête dans une requête...',
    answer: 'SUBQUERY',
    associatedQuery: 'SELECT * FROM etudiants WHERE moyenne > (SELECT AVG(moyenne) FROM etudiants);',
    explanation: 'Une sous-requête (SUBQUERY) est une requête SQL imbriquée dans une requête parente.'
  }
];

export const SQL_WORD_SEARCH_GRID = {
  grid: [
    ['S', 'E', 'L', 'E', 'C', 'T', 'X', 'W', 'H', 'E', 'R', 'E'],
    ['U', 'H', 'A', 'V', 'I', 'N', 'G', 'F', 'R', 'O', 'M', 'O'],
    ['B', 'O', 'U', 'N', 'I', 'O', 'N', 'G', 'R', 'O', 'U', 'P'],
    ['Q', 'R', 'D', 'I', 'S', 'T', 'I', 'N', 'C', 'T', 'O', 'O'],
    ['U', 'D', 'L', 'I', 'M', 'I', 'T', 'L', 'I', 'K', 'E', 'R'],
    ['E', 'E', 'J', 'O', 'I', 'N', 'B', 'E', 'T', 'W', 'E', 'D'],
    ['R', 'R', 'C', 'O', 'U', 'N', 'T', 'N', 'U', 'L', 'L', 'E'],
    ['Y', 'S', 'U', 'M', 'I', 'N', 'S', 'E', 'R', 'T', 'E', 'R']
  ],
  words: [
    'SELECT', 'WHERE', 'HAVING', 'FROM', 'UNION', 'GROUP', 
    'DISTINCT', 'LIMIT', 'LIKE', 'JOIN', 'COUNT', 'NULL', 'SUM', 'INSERT', 'SUBQUERY', 'ORDER'
  ]
};
